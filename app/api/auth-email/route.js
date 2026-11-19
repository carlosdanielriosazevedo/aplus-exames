import {NextResponse} from "next/server";
import {verifyNeonWebhook,buildAuthEmail,sendAuthEmail,authEmailConfigured} from "../../lib/server/auth-email";

// Webhook do Neon Auth (eventos send.otp e send.magic_link). Quando está ativo
// na consola do Neon, o Neon deixa de enviar o email dele (em inglês) e chama
// este endereço; nós enviamos o email em português pelo Resend.
//
// Códigos de resposta: 2xx = enviado; 4xx = pedido inválido (o Neon não repete);
// 5xx = falha temporária (o Neon repete até 3 vezes em 15 segundos).
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const MAX_BYTES=16_000;

export async function POST(request){
  if(!authEmailConfigured())return json({ok:false,code:"EMAIL_NOT_CONFIGURED"},503);
  let raw;
  try{raw=await request.text()}catch{return json({ok:false,code:"INVALID_BODY"},400)}
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);
  let payload;
  try{payload=await verifyNeonWebhook(raw,request.headers)}
  catch(error){
    if(error?.retryable)return json({ok:false,code:error.code||"VERIFY_UNAVAILABLE"},503);
    return json({ok:false,code:error?.code||"INVALID_SIGNATURE"},401);
  }
  const to=String(payload?.user?.email||"");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)||to.length>254)return json({ok:false,code:"INVALID_RECIPIENT"},422);
  const email=buildAuthEmail(payload);
  if(!email)return json({ok:false,code:"UNSUPPORTED_EVENT"},422);
  try{
    await sendAuthEmail({to,...email,eventId:payload.event_id||request.headers.get("x-neon-event-id")});
    return json({ok:true});
  }catch(error){
    // Nunca devolver o email do aluno nem detalhes do fornecedor.
    return json({ok:false,code:"EMAIL_SEND_FAILED"},error?.retryable?503:424);
  }
}
