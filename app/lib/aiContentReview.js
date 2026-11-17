// Revisão integral do conteúdo por IA (decisão do product owner de 2026-11-17:
// sem revisão docente; revisão pergunta a pergunta pela IA + segunda IA por amostragem).
// Cada pergunta revista guarda a impressão digital do conteúdo revisto. Se a pergunta
// mudar depois, deixa de contar como revista até nova passagem (AGENTS.md: um item
// alterado perde automaticamente a aprovação anterior).
import {validationHash} from "./validationFingerprint.js";

const REVIEWED_FIELDS=["prompt","stimulus","options","answerIndex","explanation","steps","criteria","acceptedAnswers","referenceAnswer","rubric","wordLimit"];

export function aiReviewFingerprint(item){
  const payload={id:item?.id||null};
  for(const field of REVIEWED_FIELDS)if(item?.[field]!==undefined)payload[field]=item[field];
  return `ai1-${validationHash(JSON.stringify(payload))}`;
}

// Estado de cada pergunta face ao registo: revista, alterada depois da revisão ou por rever.
export function aiReviewStatus(items,registry){
  const entries=registry?.items||{};
  const reviewed=[],stale=[],missing=[];
  for(const item of items){
    const entry=entries[item.id];
    if(!entry)missing.push(item.id);
    else if(entry.fingerprint!==aiReviewFingerprint(item))stale.push(item.id);
    else reviewed.push(item.id);
  }
  return {reviewed,stale,missing};
}
