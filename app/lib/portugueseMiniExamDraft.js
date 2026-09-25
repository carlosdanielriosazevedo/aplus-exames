const DRAFT_VERSION=2;
const SUPPORTED_DRAFT_VERSIONS=new Set([1,2]);

function objectOrEmpty(value){
  return value&&typeof value==="object"&&!Array.isArray(value)?value:{};
}

export function normalizePortugueseMiniExamDraft(draft,{examId,itemIds}){
  if(!draft||draft.examId!==examId||!SUPPORTED_DRAFT_VERSIONS.has(draft.version))return null;
  const allowed=new Set(itemIds);
  const filterByItem=source=>Object.fromEntries(Object.entries(objectOrEmpty(source)).filter(([id])=>allowed.has(id)));
  const index=Math.max(0,Math.min(itemIds.length-1,Number.isInteger(draft.index)?draft.index:0));
  return {
    version:DRAFT_VERSION,
    examId,
    itemIds:[...itemIds],
    index,
    review:!!draft.review,
    answers:filterByItem(draft.answers),
    selfAssessment:filterByItem(draft.selfAssessment),
    revisionDrafts:filterByItem(draft.revisionDrafts),
    revisions:filterByItem(draft.revisions),
    dismissedWritingFocus:filterByItem(draft.dismissedWritingFocus),
    attemptId:typeof draft.attemptId==="string"&&draft.attemptId?draft.attemptId:null,
    startedAt:Number.isFinite(draft.startedAt)?draft.startedAt:(Number.isFinite(draft.updatedAt)?draft.updatedAt:null),
    updatedAt:Number.isFinite(draft.updatedAt)?draft.updatedAt:null
  };
}

export function portugueseMiniExamDraftSnapshot({examId,itemIds,index,review,answers,selfAssessment,revisionDrafts,revisions,dismissedWritingFocus,attemptId,startedAt,updatedAt=Date.now()}){
  return normalizePortugueseMiniExamDraft({
    version:DRAFT_VERSION,examId,itemIds,index,review,answers,selfAssessment,revisionDrafts,revisions,dismissedWritingFocus,attemptId,startedAt,updatedAt
  },{examId,itemIds});
}

export function savePortugueseMiniExamDraft(state,draft){
  return {...state,subjectSettings:{...(state.subjectSettings||{}),portuguese:{...(state.subjectSettings?.portuguese||{}),miniExamDraft:draft}}};
}

export function clearPortugueseMiniExamDraft(state){
  const portuguese={...(state.subjectSettings?.portuguese||{})};
  delete portuguese.miniExamDraft;
  return {...state,subjectSettings:{...(state.subjectSettings||{}),portuguese}};
}
