"use client";
import {recurringErrorNudge} from "../lib/recurringErrorMemory";

export default function RecurringErrorNudge({patterns,item,result}){
  if(!result)return null;
  const nudge=recurringErrorNudge(patterns,item,result);
  if(!nudge)return null;
  return <div className="notice warning recurringErrorNudge">
    <b>O Apronso reconheceu um padrão</b>
    <span><strong>{nudge.label}:</strong> {nudge.message}</span>
    <small>Já apareceu em {nudge.occurrences} respostas{nudge.distinctItems>1?` · ${nudge.distinctItems} perguntas diferentes`:""}. Não é uma conclusão definitiva: o padrão deixa de ser destacado quando mostrares recuperação consistente.</small>
  </div>;
}
