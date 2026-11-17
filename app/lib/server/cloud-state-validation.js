import {validateCloudSnapshot} from "../cloudSnapshotValidation.js";

// Portado de #453 (codex/neon-rls-history-hardening@2c42b66) sem o percurso de
// recuperação explícita. Uma sessão válida não torna o corpo do pedido confiável.
export const MAX_CLOUD_POST_BYTES=2_000_000;
const MAX_REVISION=2_147_483_646;
const ALLOWED_KEYS=new Set(["operation","expectedRevision","state","deviceId","expectedOwner"]);

export function validateCloudWrite(payload){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))
    return {ok:false,code:"INVALID_CLOUD_PAYLOAD"};
  // O dono da linha vem SEMPRE da sessão. Qualquer campo extra (auth_user_id,
  // accountId, recovery, ...) é recusado em vez de ignorado em silêncio.
  if(Object.keys(payload).some(key=>!ALLOWED_KEYS.has(key)))
    return {ok:false,code:"UNKNOWN_CLOUD_PAYLOAD_FIELD"};
  const {operation,expectedRevision,state,deviceId=null,expectedOwner=null}=payload;
  // Não define o dono (vem sempre da sessão): só confirma que a sessão ainda é a
  // da conta para que o browser preparou esta gravação.
  if(expectedOwner!==null&&(typeof expectedOwner!=="string"||!expectedOwner||expectedOwner.length>200))
    return {ok:false,code:"INVALID_EXPECTED_OWNER"};
  if(operation!=="insert"&&operation!=="update")
    return {ok:false,code:"INVALID_OPERATION"};
  if(!Number.isInteger(expectedRevision)||expectedRevision<0||expectedRevision>MAX_REVISION
    ||(operation==="insert"&&expectedRevision!==0))
    return {ok:false,code:"INVALID_REVISION"};
  if(deviceId!==null&&(typeof deviceId!=="string"
    ||deviceId.length>128||/[\u0000-\u001f\u007f]/u.test(deviceId)))
    return {ok:false,code:"INVALID_DEVICE_ID"};
  const checked=validateCloudSnapshot(state);
  if(!checked.ok)return checked;
  return {ok:true,operation,expectedRevision,state,deviceId,expectedOwner};
}
