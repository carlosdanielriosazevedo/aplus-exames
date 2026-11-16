// Conversão dos rascunhos de provas guardados antes da regra atual de ordem das
// opções (lib/optionOrder.js). Os módulos de armazenamento dos rascunhos estão
// congelados (guarda de recuperação #385), por isso a marca de versão vive ao lado
// do rascunho e a conversão é feita aqui, por quem conhece as perguntas da prova.
import {OPTION_ORDER_VERSION,legacyOptionIndex} from "./optionOrder.js";

export function currentOrderAnswers(answers,items){
  if(!answers||typeof answers!=="object"||Array.isArray(answers)||!Array.isArray(items))return answers;
  const byId=new Map(items.map(item=>[item.id,item]));
  return Object.fromEntries(Object.entries(answers).map(([id,value])=>{
    const item=byId.get(id);
    return [id,item?.responseType==="multiple-choice"?legacyOptionIndex(item,value):value];
  }));
}

// Português: o rascunho vive em subjectSettings.portuguese.miniExamDraft.
export const PORTUGUESE_DRAFT_ORDER_FIELD="miniExamDraftOptionOrder";

export function portugueseDraftInCurrentOrder(draft,portugueseSettings,items){
  if(!draft||portugueseSettings?.[PORTUGUESE_DRAFT_ORDER_FIELD]===OPTION_ORDER_VERSION)return draft;
  return {...draft,answers:currentOrderAnswers(draft.answers,items)};
}

export function markPortugueseDraftOrder(state){
  const portuguese=state?.subjectSettings?.portuguese;
  if(!portuguese?.miniExamDraft||portuguese[PORTUGUESE_DRAFT_ORDER_FIELD]===OPTION_ORDER_VERSION)return state;
  return {...state,subjectSettings:{...state.subjectSettings,portuguese:{...portuguese,[PORTUGUESE_DRAFT_ORDER_FIELD]:OPTION_ORDER_VERSION}}};
}

// Rascunhos em localStorage (provas de FQ A e protótipo de Português).
export const physicsChemistryDraftKey=examId=>`applus:fqa-exam-draft:v1:${examId}`;
const markerKey=key=>`${key}:option-order`;
function storage(){try{return typeof window==="undefined"?null:window.localStorage}catch{return null}}

export function storedDraftInCurrentOrder(storageKey,draft,items){
  if(!draft)return draft;
  try{if(storage()?.getItem(markerKey(storageKey))===String(OPTION_ORDER_VERSION))return draft}catch{}
  return {...draft,answers:currentOrderAnswers(draft.answers,items)};
}

export function markStoredDraftOrder(storageKey){
  try{storage()?.setItem(markerKey(storageKey),String(OPTION_ORDER_VERSION))}catch{}
}
