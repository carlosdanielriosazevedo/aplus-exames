// Sessões a meio de Matemática A em dois espaços independentes (decisão do
// product owner, 2026-11-22): qualquer sessão pode ficar a meio, mas nunca se
// misturam.
// - estudo («study»): diagnóstico, Missão e treino — guardado por sessionDraft.js,
//   que continua intacto (protegido pela auditoria de recuperação #385);
// - provas («exam»): Mini-exame — guardado numa chave própria, com as mesmas
//   garantias: dentro do mesmo espaço uma tentativa nunca substitui outra, um erro
//   de leitura nunca autoriza apagar dados e nada é apagado antes de ser copiado.
import {
  saveSessionDraft as saveStudyDraft,
  loadSessionDraftStatus as loadStudyStatus,
  clearSessionDraft as clearStudyDraft,
  draftScreen
} from "./sessionDraft.js";
import {readStorageRows,removeStorageKey,writeStorageFallback} from "./browserStorage.js";

export {draftScreen};
export const EXAM_SESSION_KEY="a25-active-exam-session-v1";
const FRIENDS_EXAM_SESSION_KEY="a25-friends-active-exam-session-v1";

export function sessionLane(kind){return kind==="mini_exam"?"exam":"study"}
function examKey(mode){return mode==="friends_beta"?FRIENDS_EXAM_SESSION_KEY:EXAM_SESSION_KEY}

function readExam(mode){
  const {rows,readable}=readStorageRows(examKey(mode));
  if(!readable)return {draft:null,error:true};
  const parsed=[];
  for(const [,raw] of rows)try{
    const draft=JSON.parse(raw);
    if(!draft||typeof draft!=="object"||draft.kind!=="mini_exam")return {draft:null,error:true};
    parsed.push(draft);
  }catch{return {draft:null,error:true}}
  if(!parsed.length)return {draft:null,error:false};
  parsed.sort((a,b)=>(b.savedAt||0)-(a.savedAt||0));
  return {draft:parsed[0],error:false};
}

function attemptId(draft){return draft?.sessionId||draft?.session?.sessionId||null}
function sameAttempt(a,b){return !!a&&!!b&&a.kind===b.kind&&attemptId(a)===attemptId(b)}

// Até 2026-11-22 o Mini-exame ficava no espaço do estudo. Move-o para o espaço das
// provas: copia, confirma por releitura e só depois apaga a cópia antiga. Se algo
// falhar, fica onde estava (e continua a ser lido como prova).
export function migrateLegacyExamDraft(mode="internal"){
  const study=loadStudyStatus(mode);
  if(study.error||study.draft?.kind!=="mini_exam")return false;
  const exam=readExam(mode);
  if(exam.error)return false;
  if(exam.draft&&!sameAttempt(exam.draft,study.draft))return false;
  if(!exam.draft){
    try{if(!writeStorageFallback(examKey(mode),JSON.stringify(study.draft)))return false}catch{return false}
    if(!sameAttempt(readExam(mode).draft,study.draft))return false;
  }
  return clearStudyDraft(mode);
}

export function saveLaneDraft(draft){
  if(!draft)return clearLaneDraft("internal","study");
  if(!draft.kind)return saveStudyDraft(draft);
  const mode=draft.betaMode||"internal";
  migrateLegacyExamDraft(mode);
  if(sessionLane(draft.kind)==="study")return saveStudyDraft(draft);
  const pending=readExam(mode);
  if(pending.error)return false;
  if(pending.draft&&!sameAttempt(pending.draft,draft))return false;
  const legacy=loadStudyStatus(mode);
  if(legacy.error||(legacy.draft?.kind==="mini_exam"&&!sameAttempt(legacy.draft,draft)))return false;
  try{
    if(!writeStorageFallback(examKey(mode),JSON.stringify({...draft,savedAt:Date.now()})))return false;
  }catch{return false}
  // Cópia antiga da mesma tentativa (migração interrompida): já não é precisa.
  if(legacy.draft?.kind==="mini_exam")clearStudyDraft(mode);
  return true;
}

export function loadLaneDraftStatus(mode="internal",lane="study"){
  migrateLegacyExamDraft(mode);
  const study=loadStudyStatus(mode);
  if(lane==="exam"){
    const exam=readExam(mode);
    if(exam.error||exam.draft)return exam;
    if(study.error)return {draft:null,error:true};
    return {draft:study.draft?.kind==="mini_exam"?study.draft:null,error:false};
  }
  if(study.error)return study;
  return {draft:study.draft?.kind==="mini_exam"?null:study.draft,error:false};
}

export function loadLaneDraft(mode="internal",lane="study"){return loadLaneDraftStatus(mode,lane).draft}

// Todas as sessões a meio (estudo e provas), a mais recente primeiro.
export function loadAllSessionDrafts(mode="internal"){
  const study=loadLaneDraftStatus(mode,"study"),exam=loadLaneDraftStatus(mode,"exam");
  const drafts=[study.draft,exam.draft].filter(Boolean).sort((a,b)=>(b.savedAt||0)-(a.savedAt||0));
  return {drafts,error:!!(study.error||exam.error)};
}

export function clearLaneDraft(mode="internal",lane="study"){
  const study=loadStudyStatus(mode);
  if(lane==="exam"){
    const ok=removeStorageKey(examKey(mode));
    if(study.draft?.kind==="mini_exam")return clearStudyDraft(mode)&&ok;
    return ok;
  }
  // Nunca apagar, por engano, um Mini-exame antigo que ainda não foi movido.
  if(study.draft?.kind==="mini_exam")return true;
  return clearStudyDraft(mode);
}

export function clearAllLaneDrafts(mode="internal"){
  const a=clearStudyDraft(mode),b=removeStorageKey(examKey(mode));
  return a&&b;
}
