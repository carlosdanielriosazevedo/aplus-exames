// Server-only validation for cloud snapshots. Input is never trusted just because
// the request has a valid Neon Auth session.
export const MAX_CLOUD_POST_BYTES=2_000_000;
const MAX_REVISION=2_147_483_646;
const FORBIDDEN_RESPONSE_FIELDS=new Set([
  "answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"
]);
const CLIENT_CLOUD_FIELDS=new Set([
  "schema","goal","profile","scores","xp","streak","engagement",
  "engagementModelVersion","competition","competitionModelVersion",
  "dailyMission","dailyMissionModelVersion","diagnosticDone",
  "diagnosticAnswers","missionHistory","freeTrainingSignals","examHistory",
  "lastMission","lastExam","betaParticipant","learningHypotheses",
  "subjectProgress","subjectProgressModelVersion","evidenceModelVersion",
  "pedagogicalIdVersion","pedagogicalMemoryVersion"
]);
// Keep server-issued identity/authority data out of any client snapshot,
// including nested payloads intended to masquerade as official ranking data.
const RESERVED_SERVER_FIELDS=new Set([
  "verifiedXp","verifiedRewards","verifiedCompletionReceipts","officialXp",
  "officialRankingXp","rewardReceipt","rewardReceipts","serverVerifiedXp",
  "rewardAuthority","verifiedReceiptCount"
]);

export function validateCloudWrite(payload){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))
    return {ok:false,code:"INVALID_CLOUD_PAYLOAD"};
  const {operation,expectedRevision,state,deviceId=null}=payload;
  if(operation!=="insert"&&operation!=="update")
    return {ok:false,code:"INVALID_OPERATION"};
  if(!Number.isInteger(expectedRevision)||expectedRevision<0||expectedRevision>MAX_REVISION
    ||(operation==="insert"&&expectedRevision!==0))
    return {ok:false,code:"INVALID_REVISION"};
  if(deviceId!==null&&(typeof deviceId!=="string"
    ||deviceId.length>128||/[\u0000-\u001f\u007f]/u.test(deviceId)))
    return {ok:false,code:"INVALID_DEVICE_ID"};
  if(!state||typeof state!=="object"||Array.isArray(state)
    ||state.schema!=="aplus-student-state-v8")
    return {ok:false,code:"INVALID_STATE"};
  if(Object.keys(state).some(key=>!CLIENT_CLOUD_FIELDS.has(key)))
    return {ok:false,code:"UNKNOWN_CLOUD_FIELD"};

  // The browser's own answer-text stripping is not a security boundary.
  // Reject snapshots containing response texts anywhere in nested JSON.
  const stack=[{value:state,depth:0}];
  let visited=0;
  while(stack.length){
    const {value,depth}=stack.pop();
    if(++visited>25_000||depth>40)return {ok:false,code:"STATE_TOO_COMPLEX"};
    if(!value||typeof value!=="object")continue;
    for(const [key,child] of Object.entries(value)){
      if(FORBIDDEN_RESPONSE_FIELDS.has(key))return {ok:false,code:"RESPONSE_TEXT_NOT_ALLOWED"};
      if(RESERVED_SERVER_FIELDS.has(key))return {ok:false,code:"FORGED_REWARD_AUTHORITY"};
      if(child&&typeof child==="object")stack.push({value:child,depth:depth+1});
    }
  }
  return {ok:true,operation,expectedRevision,state,deviceId};
}
