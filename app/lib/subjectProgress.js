const MODEL_VERSION=1;
const MAX_SESSIONS=100;

export function emptySubjectProgress(subjectId){
  return {subjectId,version:MODEL_VERSION,diagnosticDone:false,diagnosticCompletedAt:null,sessions:[],missionHistory:[],competence:{},lastPosition:null,lastActivityAt:null};
}

function normalizeProgress(progress,subjectId){
  const empty=emptySubjectProgress(subjectId);
  return {...empty,...(progress||{}),subjectId,version:MODEL_VERSION,sessions:Array.isArray(progress?.sessions)?progress.sessions.slice(-MAX_SESSIONS):[],missionHistory:Array.isArray(progress?.missionHistory)?progress.missionHistory.slice(-MAX_SESSIONS):[],competence:progress?.competence&&typeof progress.competence==="object"?progress.competence:{},lastPosition:progress?.lastPosition||null};
}

export function migrateSubjectProgress(state){
  const rows=state?.subjectProgress&&typeof state.subjectProgress==="object"?state.subjectProgress:{};
  return {...state,subjectProgress:Object.fromEntries(Object.entries(rows).map(([id,progress])=>[id,normalizeProgress(progress,id)])),subjectProgressModelVersion:MODEL_VERSION};
}

export function subjectProgressFor(state,subjectId){return normalizeProgress(state?.subjectProgress?.[subjectId],subjectId)}

function putProgress(state,subjectId,progress){
  return {...state,subjectProgress:{...(state.subjectProgress||{}),[subjectId]:normalizeProgress(progress,subjectId)},subjectProgressModelVersion:MODEL_VERSION};
}

function compactResult(result){
  if(!result)return null;
  const compact={status:result.status,final:!!result.final,correct:result.correct??null,points:Number.isFinite(result.points)?result.points:null,maxPoints:Number.isFinite(result.maxPoints)?result.maxPoints:null,gradingMode:result.gradingMode||null,responseText:result.responseText||""};
  if(result.final)return compact;
  return {...compact,rubricId:result.rubricId||null,rubricCompleted:!!result.rubricCompleted,rubricEvidence:(result.criteria||[]).map(criterion=>({criterionId:criterion.id,evidence:criterion.status||"pending"})),rubricObservationEvidence:(result.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,evidence:observation.status||"pending",studentEvidence:Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})))};
}

export function beginSubjectSession(state,{subjectId,kind,label,domain=null,items,startedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  return putProgress(state,subjectId,{...progress,lastPosition:{kind,label,domain,itemIds:items.map(item=>item.id),current:0,results:[],startedAt,updatedAt:startedAt},lastActivityAt:startedAt});
}

export function advanceSubjectSession(state,subjectId,{current,results,currentResult=null,updatedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  if(!progress.lastPosition)return state;
  return putProgress(state,subjectId,{...progress,lastPosition:{...progress.lastPosition,current,results:results.map(compactResult),currentResult:compactResult(currentResult),updatedAt},lastActivityAt:updatedAt});
}

export function recordSubjectSession(state,{subjectId,kind,label,domain=null,items,results,completedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  const competence={...progress.competence};
  items.forEach((item,index)=>{
    const result=results[index];
    if(!result||result.status==="unanswered")return;
    const id=item.competencyId||`${item.domain}:general`;
    const previous=competence[id]||{attempts:0,correct:0,deterministicAttempts:0,points:0,maxPoints:0,pendingRubrics:0,lastAnsweredAt:null};
    competence[id]=result.final
      ?{...previous,attempts:previous.attempts+1,correct:previous.correct+(result.correct?1:0),deterministicAttempts:previous.deterministicAttempts+1,points:previous.points+(Number.isFinite(result.points)?result.points:0),maxPoints:previous.maxPoints+(Number.isFinite(result.maxPoints)?result.maxPoints:0),lastAnsweredAt:completedAt}
      :{...previous,attempts:previous.attempts+1,pendingRubrics:previous.pendingRubrics+1,lastAnsweredAt:completedAt};
  });
  const session={kind,label,domain,itemIds:items.map(item=>item.id),results:results.map(compactResult),completedAt};
  return putProgress(state,subjectId,{...progress,diagnosticDone:progress.diagnosticDone||kind==="diagnostic",diagnosticCompletedAt:kind==="diagnostic"?completedAt:progress.diagnosticCompletedAt,sessions:[...progress.sessions,session].slice(-MAX_SESSIONS),missionHistory:kind==="mission"?[...progress.missionHistory,session].slice(-MAX_SESSIONS):progress.missionHistory,competence,lastPosition:null,lastActivityAt:completedAt});
}

export function resetSubjectProgress(state,subjectId){
  const subjectProgress={...(state.subjectProgress||{})};
  delete subjectProgress[subjectId];
  return {...state,subjectProgress,subjectProgressModelVersion:MODEL_VERSION};
}
