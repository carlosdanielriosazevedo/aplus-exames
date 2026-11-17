import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {authBaseUrl} from "../../../lib/server/auth";
import {validateDeletionRequest,verifyAccountPassword,deleteAccountData,NEON_AUTH_COOKIES} from "../../../lib/server/account-deletion";

// Eliminação da conta e de todos os dados associados, pedida pelo próprio aluno.
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const MAX_BYTES=1_000;

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return json({ok:false,code:csrf.code},403);
  let session;
  try{session=await requireSession()}
  catch(error){const failure=authErrorResponse(error);return json(failure.body,failure.status)}
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);
  let raw;
  try{raw=await request.text()}catch{return json({ok:false,code:"INVALID_BODY"},400)}
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);
  let parsed;
  try{parsed=JSON.parse(raw)}catch{return json({ok:false,code:"INVALID_JSON"},400)}
  const valid=validateDeletionRequest(parsed);
  if(!valid.ok)return json({ok:false,code:valid.code},400);

  // Reautenticação: só quem sabe a palavra-passe pode eliminar a conta.
  const password=await verifyAccountPassword({
    baseUrl:authBaseUrl(),
    email:session.user?.email,
    password:valid.password,
    origin:request.headers.get("origin")||new URL(request.url).origin
  });
  if(!password.ok){
    const status=password.code==="INVALID_PASSWORD"?401:password.code==="TOO_MANY_ATTEMPTS"?429:503;
    return json({ok:false,code:password.code},status);
  }

  let result;
  try{
    result=await deleteAccountData(getSql(),session.authUserId);
  }catch{
    // Transação: nada foi apagado.
    return json({ok:false,code:"ACCOUNT_DELETE_FAILED"},503);
  }
  if(!result.ok)return json({ok:false,code:result.code},503);

  const response=json({ok:true,deleted:true});
  for(const name of NEON_AUTH_COOKIES){
    response.cookies.set(name,"",{path:"/",maxAge:0,secure:true,httpOnly:true,sameSite:"lax"});
  }
  return response;
}
