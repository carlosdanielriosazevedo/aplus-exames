import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {authBaseUrl} from "../../../lib/server/auth";
import {validateDeletionRequest,verifyAccountPassword,deleteAccountData,deletionMethod,sessionCreatedAt,isRecentLogin,RECENT_LOGIN_MAX_AGE_MS,NEON_AUTH_COOKIES,ACCOUNT_DELETED_COOKIE} from "../../../lib/server/account-deletion";

// Eliminação da conta e de todos os dados associados, pedida pelo próprio aluno.
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const MAX_BYTES=1_000;

async function confirmationRequirements(session){
  const sql=getSql();
  const {method,providers}=await deletionMethod(sql,session.authUserId);
  const createdAt=method==="recent-login"?await sessionCreatedAt(sql,session):null;
  return {method,providers,recentLogin:method==="recent-login"&&isRecentLogin(createdAt)};
}

// Diz ao ecrã de conta como confirmar a eliminação, sem expor dados da conta:
// palavra-passe, ou voltar a entrar com o fornecedor (contas só Google/Microsoft).
export async function GET(){
  let session;
  try{session=await requireSession()}
  catch(error){const failure=authErrorResponse(error);return json(failure.body,failure.status)}
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);
  try{
    const {method,providers,recentLogin}=await confirmationRequirements(session);
    const provider=providers.find(id=>id==="google"||id==="microsoft")||null;
    return json({ok:true,method,provider,recentLogin,recentLoginMinutes:Math.round(RECENT_LOGIN_MAX_AGE_MS/60000)});
  }catch{
    return json({ok:false,code:"DELETION_METHOD_UNAVAILABLE"},503);
  }
}

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
  let requirements;
  try{requirements=await confirmationRequirements(session)}
  catch{return json({ok:false,code:"DELETION_METHOD_UNAVAILABLE"},503)}
  const valid=validateDeletionRequest(parsed,{requirePassword:requirements.method==="password"});
  if(!valid.ok)return json({ok:false,code:valid.code},400);

  if(requirements.method==="password"){
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
  }else if(!requirements.recentLogin){
    // Conta só Google/Microsoft: tem de ter entrado há poucos minutos.
    return json({ok:false,code:"RECENT_LOGIN_REQUIRED"},401);
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
  // Comprovativo de curta duração para a página pública de conclusão: sem ele, o
  // endereço /eliminar-conta?concluido=1 não afirma que algo foi apagado.
  response.cookies.set(ACCOUNT_DELETED_COOKIE,"1",{path:"/eliminar-conta",maxAge:600,secure:true,httpOnly:true,sameSite:"lax"});
  for(const name of NEON_AUTH_COOKIES){
    response.cookies.set(name,"",{path:"/",maxAge:0,secure:true,httpOnly:true,sameSite:"lax"});
  }
  return response;
}
