import {validateCloudSnapshot} from "../cloudSnapshotValidation.js";
// Input is never trusted just because the request has a valid Neon Auth session.
export const MAX_CLOUD_POST_BYTES=2_000_000;
const MAX_REVISION=2_147_483_646;

export function validateCloudWrite(payload){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))
    return {ok:false,code:"INVALID_CLOUD_PAYLOAD"};
  const {operation,expectedRevision,state,deviceId=null,recovery=null}=payload;
  if(operation!=="insert"&&operation!=="update")
    return {ok:false,code:"INVALID_OPERATION"};
  if(!Number.isInteger(expectedRevision)||expectedRevision<0||expectedRevision>MAX_REVISION
    ||(operation==="insert"&&expectedRevision!==0))
    return {ok:false,code:"INVALID_REVISION"};
  if(deviceId!==null&&(typeof deviceId!=="string"
    ||deviceId.length>128||/[\u0000-\u001f\u007f]/u.test(deviceId)))
    return {ok:false,code:"INVALID_DEVICE_ID"};
  if(recovery!==null&&(!recovery||typeof recovery!=="object"||Array.isArray(recovery)
    ||recovery.confirmed!==true||recovery.revision!==expectedRevision
    ||typeof recovery.accountId!=="string"||!recovery.accountId||recovery.accountId.length>256
    ||typeof recovery.digest!=="string"||!/^[a-f0-9]{64}$/.test(recovery.digest)))
    return {ok:false,code:"INVALID_RECOVERY_CONFIRMATION"};
  const checked=validateCloudSnapshot(state);
  if(!checked.ok)return checked;
  return {ok:true,operation,expectedRevision,state,deviceId,...(recovery?{recovery}:{})};
}
