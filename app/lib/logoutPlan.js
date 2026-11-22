// O que acontece ao terminar sessão (decisão do product owner, 2026-11-20).
//
// A conta é a fonte de verdade; o dispositivo é só uma cópia temporária.
// - Progresso confirmado na conta e nada a meio → apagar deste dispositivo, sem perguntar.
// - Trabalho curto a meio (missão, diagnóstico, treino) → aviso de uma linha: recomeça.
// - Trabalho longo a meio (mini-exame, exame de FQ A, texto de Português) → aviso forte,
//   com "Voltar e terminar" em destaque: só existe neste dispositivo.
// - Sem confirmação da conta (sem rede) → o aluno fica, ou sai mantendo os dados
//   neste dispositivo (arquivo local da conta, como antes).
import {loadAllSessionDrafts} from "./sessionLanes.js";
import {pendingPhysicsChemistryExam} from "./physicsChemistryExamDraft.js";

export const PORTUGUESE_PROTOTYPE_DRAFT_KEY="applus:portuguese-prototype-draft:v1";

const SHORT_LABELS={mission:"uma missão",diagnostic:"o diagnóstico",training:"um treino"};

// Trabalho a meio que ainda não está na conta. Os detetores podem ser injetados (testes).
export function detectUnsavedWork(state,{
  sessionDraft=()=>loadAllSessionDrafts(state?.betaMode||"internal"),
  fqaExam=()=>pendingPhysicsChemistryExam(),
  storage=globalThis.localStorage
}={}){
  const long=[],short=[];
  // Matemática A pode ter, ao mesmo tempo, uma sessão de estudo e um Mini-exame a meio.
  let drafts=[];
  try{const found=sessionDraft();drafts=found?.drafts||(found?.draft?[found.draft]:[])}catch{}
  for(const draft of drafts){
    if(draft?.kind==="mini_exam")long.push("um mini-exame");
    else if(draft?.kind)short.push(SHORT_LABELS[draft.kind]||"uma sessão");
  }
  if(state?.subjectSettings?.portuguese?.miniExamDraft)long.push("um mini-exame de Português");
  let fqa=null;
  try{fqa=fqaExam()}catch{}
  if(fqa&&!fqa.error)long.push("um exame de FQ A");
  let ptDraft=null;
  try{ptDraft=storage?.getItem(PORTUGUESE_PROTOTYPE_DRAFT_KEY)}catch{}
  if(ptDraft)long.push("um texto de Português");
  if(!drafts.some(draft=>draft?.kind&&draft.kind!=="mini_exam")&&!short.length&&Object.values(state?.subjectProgress||{}).some(row=>row?.lastPosition))short.push("uma sessão");
  return {long,short};
}

// `flushStatus`: resultado da última gravação ("saved" = confirmado na conta).
// `confirmed`: o tipo de aviso que o aluno já aceitou neste clique.
export function logoutPlan({flushStatus,work={long:[],short:[]},confirmed=null}){
  if(flushStatus!=="saved"){
    return confirmed==="offline"?{kind:"keep_local"}:{kind:"offline"};
  }
  if(work.long.length&&confirmed!=="long")return {kind:"long",items:work.long};
  if(!work.long.length&&work.short.length&&confirmed!=="short")return {kind:"short",items:work.short};
  return {kind:"purge"};
}

const join=items=>items.length<=1?items[0]||"":`${items.slice(0,-1).join(", ")} e ${items.at(-1)}`;

// Texto e botões do aviso (o primeiro botão é o destacado).
export function logoutPromptCopy(plan){
  if(plan.kind==="offline")return {
    tone:"warn",
    text:"Sem ligação: o teu progresso mais recente ainda não está guardado na conta.",
    stay:"Ficar e tentar outra vez",
    leave:"Sair e guardar só neste dispositivo"
  };
  if(plan.kind==="long")return {
    tone:"danger",
    text:`Tens ${join(plan.items)} a meio que só está guardado neste dispositivo. Se saíres agora, perde-se.`,
    stay:"Voltar e terminar",
    leave:"Sair e apagar"
  };
  if(plan.kind==="short")return {
    tone:"info",
    text:`Tens ${join(plan.items)} a meio. Se saíres agora, recomeça na próxima vez.`,
    stay:"Cancelar",
    leave:"Sair"
  };
  return null;
}
