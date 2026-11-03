// Shared structural contract. No coercion, mutation, defaulting or truncation.
export const CLOUD_FIELDS=new Set([
  "schema","goal","profile","scores","xp","streak","engagement","engagementModelVersion",
  "competition","competitionModelVersion","dailyMission","dailyMissionModelVersion",
  "diagnosticDone","diagnosticAnswers","missionHistory","freeTrainingSignals","examHistory",
  "lastMission","lastExam","betaParticipant","learningHypotheses","subjectProgress",
  "subjectProgressModelVersion","evidenceModelVersion","pedagogicalIdVersion","pedagogicalMemoryVersion"
]);
export const SNAPSHOT_LIMITS=Object.freeze({nodes:25000,depth:40,array:10000,keys:2000,string:65536,bytes:2_000_000});
const PRIVATE_FIELDS=new Set(["answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"]);
const AUTHORITY_FIELDS=new Set(["verifiedXp","verifiedRewards","verifiedCompletionReceipts","officialXp","officialRankingXp","rewardReceipt","rewardReceipts","serverVerifiedXp","rewardAuthority","verifiedReceiptCount"]);
const POISON_KEYS=new Set(["__proto__","prototype","constructor","toString","valueOf"]);
const object=x=>!!x&&typeof x==="object"&&!Array.isArray(x)&&(Object.getPrototypeOf(x)===Object.prototype||Object.getPrototypeOf(x)===null);
const number=x=>typeof x==="number"&&Number.isFinite(x)&&Math.abs(x)<=Number.MAX_SAFE_INTEGER;
const count=x=>number(x)&&x>=0;
const integer=x=>count(x)&&Number.isInteger(x);
const text=x=>typeof x==="string";
const boolean=x=>typeof x==="boolean";
const nullable=check=>x=>x===null||check(x);
const list=(check)=>x=>Array.isArray(x)&&x.every(check);
const dictionary=check=>x=>object(x)&&Object.values(x).every(check);
const fields=shape=>x=>object(x)&&Object.entries(shape).every(([key,check])=>x[key]===undefined||check(x[key]));
const version=max=>x=>integer(x)&&x>=1&&x<=max;
const strings=list(text);
const numericMap=dictionary(count);
const stamp=nullable(x=>count(x)&&x<=8_640_000_000_000_000);
const common={};
const row=x=>fields(common)(x);
const rows=list(row);
Object.assign(common,{
  id:nullable(text),sessionId:nullable(text),completionId:nullable(text),itemId:nullable(text),
  themeId:nullable(text),subjectId:nullable(text),source:nullable(text),kind:nullable(text),
  label:nullable(text),key:nullable(text),status:nullable(text),scope:nullable(text),
  message:nullable(text),signature:nullable(text),focus:nullable(text),
  reason:nullable(text),detail:nullable(text),planReason:nullable(text),
  stopTitle:nullable(text),stopDetail:nullable(text),stopCode:nullable(text),decisionSource:nullable(text),
  alternatives:rows,unlocks:rows,detour:nullable(x=>row(x)),answers:nullable(x=>Array.isArray(x)||object(x)),
  totalCount:integer,interactionCount:integer,targetCount:integer,estimatedSeconds:count,
  ratio:x=>count(x)&&x<=1,decisionUtility:nullable(number),
  at:stamp,updatedAt:stamp,startedAt:stamp,completedAt:stamp,firstAt:stamp,lastAt:stamp,lastAnsweredAt:stamp,resolvedAt:stamp,staleAt:stamp,openedAt:stamp,
  total:count,answered:count,points:nullable(count),maxPoints:nullable(count),
  provisionalPoints:nullable(count),current:integer,index:integer,revision:integer,
  itemIds:strings,completedSessionIds:strings,activityIds:strings,
  currentResult:nullable(x=>resultRow(x)),results:list(x=>x===null||resultRow(x)),itemResults:list(x=>resultRow(x)),steps:rows,criteria:rows,observations:rows,
  changes:rows,questionIds:strings,before:x=>scoreSummary(x),after:x=>scoreSummary(x),
  rubricEvidence:rows,rubricObservationEvidence:rows,revisionHistory:rows,
  final:boolean,requiresReview:boolean,rubricCompleted:boolean,markedForReview:strings,
  correct:x=>boolean(x)||count(x),outcome:x=>text(x)||number(x),
  type:nullable(text),title:nullable(text),description:nullable(text),code:nullable(text),
  microcompetencyId:nullable(text),subtopicId:nullable(text),competencyId:nullable(text),
  criterionId:nullable(text),observationId:nullable(text),gradingMode:nullable(text),responseType:nullable(text),
  elapsedSeconds:count,correctCount:count,earnedPoints:count,pendingPoints:count,
  score20:nullable(x=>count(x)&&x<=20),score20Upper:nullable(x=>count(x)&&x<=20),reviewRequired:boolean,
  responseText:text,previousResponseText:text,
  signal:nullable(row),strength:x=>count(x)&&x<=1,weight:count,
  reasons:list(x=>text(x)||row(x))
});
const scoreSummary=fields({domain:nullable(x=>count(x)&&x<=100),conf:x=>count(x)&&x<=100,evidenceCount:integer});
const resultRow=fields({...common,correct:nullable(boolean)});
const evidenceRow=fields({...common,correct:nullable(boolean),signal:x=>count(x)&&x<=100});
const score=fields({domain:nullable(x=>count(x)&&x<=100),conf:x=>count(x)&&x<=100,evidence:list(evidenceRow),diagnostics:object});
const competence=fields({domainId:nullable(text),label:nullable(text),attempts:count,correct:count,points:count,maxPoints:count,
  deterministicAttempts:count,structuredAttempts:count,structuredScoredAttempts:count,
  structuredNormalizedEarned:count,structuredNeedsReview:count,structuredType1:count,structuredType2:count,
  pendingRubrics:count,rubricReviews:count,rubricNeedsReview:count,rubricObserved:count,
  rubricEvidenceByObservation:dictionary(row),lastAnsweredAt:stamp});
const errors=fields({...common,count:count,recoveryEvidence:count,itemIds:strings});
const progress=fields({subjectId:text,version:version(4),diagnosticDone:boolean,diagnosticCompletedAt:stamp,
  sessions:rows,missionHistory:rows,interruptedTechnicalSessions:rows,completedSessionIds:strings,
  competence:dictionary(competence),errorPatterns:dictionary(errors),errorMemoryVersion:version(1),
  lastPosition:nullable(row),lastActivityAt:stamp});
const profile=fields({schoolYear:nullable(text),year:x=>text(x)||integer(x),school:nullable(text),
  examTiming:nullable(text),syllabus:nullable(text),selectedThemeIds:strings,taughtThemeIds:strings,
  taughtSubtopicIds:strings,optionalTopics:strings,recentGrade:x=>x===null||number(x)||text(x)});
const engagement=fields({version:version(1),dailyGoalXp:count,streak:integer,longestStreak:integer,
  activeDays:integer,goalDays:integer,lastActiveDay:nullable(text),
  days:dictionary(fields({xp:count,activities:numericMap,activityIds:strings,firstAt:stamp,lastAt:stamp,goalComplete:boolean}))});
const competition=fields({version:version(1),division:text,highestDivision:text,
  profile:fields({nickname:nullable(text),region:nullable(text),school:nullable(text),schoolId:nullable(text),schoolOptIn:boolean,districtOptIn:boolean}),history:rows,
  weeks:dictionary(fields({activities:rows,activityIds:strings,xp:count}))});
const daily=fields({version:version(1),assignment:nullable(fields({day:text,assignedAt:stamp,plan:row})),
  prompt:fields({lastShownDay:nullable(text),lastDismissedDay:nullable(text),lastStartedDay:nullable(text)})});
const hypothesis=fields({...common,observations:count,history:rows,
  targetThemeId:nullable(text),targetFocus:nullable(text),targetMicrocompetencyId:nullable(text),
  prerequisiteThemeId:nullable(text),prerequisiteFocus:nullable(text),prerequisiteMicrocompetencyId:nullable(text),
  lifecycleStatus:text,supportsPrerequisite:count,supportsTarget:count,recentPrerequisite:count,recentTarget:count,
  recentObservations:count,reopenCount:integer,openedAt:stamp,lastTransitionAt:stamp,resolvedAt:stamp,staleAt:stamp});
const archive=x=>fields({version:v=>v===1,entries:rows})(x)&&x.version===1&&Array.isArray(x.entries);
const root={cloudRecoveryArchive:archive,goal:x=>count(x)&&x<=20,profile:nullable(profile),scores:dictionary(score),
  xp:integer,streak:integer,diagnosticDone:boolean,diagnosticAnswers:integer,
  missionHistory:rows,examHistory:rows,freeTrainingSignals:rows,learningHypotheses:list(hypothesis),
  lastMission:nullable(row),lastExam:nullable(row),betaParticipant:nullable(fields({code:nullable(text),cohort:nullable(text),joinedAt:stamp})),
  subjectProgress:dictionary(progress),engagement:nullable(engagement),competition:nullable(competition),dailyMission:nullable(daily),
  engagementModelVersion:version(1),competitionModelVersion:version(1),dailyMissionModelVersion:version(1),
  subjectProgressModelVersion:version(4),evidenceModelVersion:version(2),pedagogicalIdVersion:version(1),pedagogicalMemoryVersion:version(2)};

export function validateCloudSnapshot(input,{legacy=false,local=false,privateFields=!local}={}){
  const fail=code=>({ok:false,code});
  try{
    if(!object(input))return fail("INVALID_STATE");
    const state=local?Object.fromEntries(Object.entries(input).filter(([key])=>CLOUD_FIELDS.has(key)||key==="cloudRecoveryArchive")):input;
    if(local&&state.schema!==undefined&&!/^aplus-student-state-v[1-8]$/.test(state.schema))return fail("INVALID_STATE");
    if(!local&&!new RegExp(legacy?"^aplus-student-state-v[1-8]$":"^aplus-student-state-v8$").test(state.schema||""))return fail("INVALID_STATE");
    if(!local&&Object.keys(state).some(key=>!CLOUD_FIELDS.has(key)))return fail("UNKNOWN_CLOUD_FIELD");
    const active=new WeakSet(),stack=[{value:state,depth:0}],limit=SNAPSHOT_LIMITS;
    let nodes=0;
    while(stack.length){
      const {value,depth,exit}=stack.pop();
      if(exit){active.delete(value);continue;}
      if(++nodes>limit.nodes||depth>limit.depth)return fail("STATE_TOO_COMPLEX");
      if(value===undefined)continue; // absent optional local object properties
      if(value===null||typeof value==="boolean")continue;
      if(typeof value==="string"){if(value.length>limit.string)return fail("STATE_TOO_COMPLEX");continue;}
      if(typeof value==="number"){if(!number(value))return fail("INVALID_STATE_VALUE");continue;}
      if(typeof value!=="object"||(!Array.isArray(value)&&!object(value))||active.has(value))return fail("INVALID_STATE_VALUE");
      if(Array.isArray(value)&&value.length>limit.array)return fail("STATE_TOO_COMPLEX");
      const entries=Object.entries(value);
      if(Array.isArray(value)&&(entries.length!==value.length||entries.some(([key],i)=>key!==String(i))))return fail("INVALID_STATE_STRUCTURE");
      if(!Array.isArray(value)&&entries.length>limit.keys)return fail("STATE_TOO_COMPLEX");
      active.add(value);stack.push({value,exit:true});
      for(const [key,child] of entries){
        if(POISON_KEYS.has(key))return fail("INVALID_STATE_VALUE");
        if(privateFields&&PRIVATE_FIELDS.has(key))return fail("RESPONSE_TEXT_NOT_ALLOWED");
        if(AUTHORITY_FIELDS.has(key))return fail("FORGED_REWARD_AUTHORITY");
        if(key.length>1024)return fail("STATE_TOO_COMPLEX");
        stack.push({value:child,depth:depth+1});
      }
    }
    if(!fields(root)(state))return fail("INVALID_STATE_STRUCTURE");
    // Bound primitive strings/keys as well as objects, and UTF-8 bytes, not just
    // JS code units. This is also applied to already stored snapshots on read.
    if(new TextEncoder().encode(JSON.stringify(state)).length>limit.bytes)return fail("STATE_TOO_COMPLEX");
    return {ok:true};
  }catch{return fail("INVALID_STATE_STRUCTURE");}
}

export function snapshotError(code="CLOUD_SNAPSHOT_RECOVERY_REQUIRED"){
  return Object.assign(new Error("Este progresso precisa de revisão. Os dados originais foram preservados; exporta uma cópia antes de recuperar."),{code});
}
export function assertCloudSnapshot(state,options){
  const result=validateCloudSnapshot(state,options);
  if(!result.ok)throw snapshotError();
  return state;
}
