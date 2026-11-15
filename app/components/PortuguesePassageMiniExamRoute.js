"use client";
import {useCallback} from "react";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {portugueseMiniExamMeta,portugueseMiniExamsForYear,portuguesePassagePrototypeExam} from "../data/portuguesePassagePrototype";
import {recordSubjectSession} from "../lib/subjectProgress";
import {clearPortugueseMiniExamDraft,normalizePortugueseMiniExamDraft,savePortugueseMiniExamDraft} from "../lib/portugueseMiniExamDraft";
import {saveLocalStateDurably,durabilityFailureReason,lastStateIntegrityBlock} from "../lib/stateIntegrity";
import {markCompletionBlocked} from "../lib/reliability";

export default function PortuguesePassageMiniExamRoute({s,setS,go,onExit}){
  const currentYear=["10.º","11.º","12.º"].includes(s?.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const pending=s?.subjectSettings?.portuguese?.miniExamDraft;
  const savedExamId=pending?.examId||s?.subjectSettings?.portuguese?.selectedMiniExamId||null;
  const savedMeta=portugueseMiniExamMeta(savedExamId);
  const savedAllowed=savedExamId==="full-1"?currentYear==="12.º":savedMeta?.year===currentYear;
  const examId=(pending||savedAllowed?savedExamId:null)||portugueseMiniExamsForYear(currentYear)[0]?.id||"mini-1";
  const exam=portuguesePassagePrototypeExam(examId);
  const label=examId==="full-1"?"Simulado completo de Português":(portugueseMiniExamMeta(examId)?.title||"Mini-exame de Português");
  const itemIds=exam.items.map(item=>item.id);
  const draft=normalizePortugueseMiniExamDraft(s?.subjectSettings?.portuguese?.miniExamDraft,{examId,itemIds});
  const saveDraft=useCallback(nextDraft=>setS(prev=>savePortugueseMiniExamDraft(prev,nextDraft)),[setS]);
  // A conclusão só substitui o rascunho depois de uma gravação durável.
  // Se falhar, o rascunho e as respostas ficam e o aluno pode voltar a entregar.
  const complete=useCallback(({items,results,sessionId})=>{
    const pendingAttempt=s?.subjectSettings?.portuguese?.miniExamDraft?.attemptId;
    if(pendingAttempt&&pendingAttempt!==sessionId)return true;
    const next=recordSubjectSession(clearPortugueseMiniExamDraft(s),{subjectId:"portuguese",kind:examId==="full-1"?"practice_exam":"mini_exam",label,items,results,sessionId});
    const durable=saveLocalStateDurably(next);
    if(!durable.ok){
      markCompletionBlocked(sessionId||null,durabilityFailureReason(durable.tier));
      go?.(lastStateIntegrityBlock()?"storageRecoveryError":"completionBlocked");
      return false;
    }
    setS(next);
    return true;
  },[examId,label,s,setS,go]);
  if(pending&&!draft)return <div role="alert">Não foi possível recuperar esta prova. As respostas guardadas foram conservadas.</div>;
  return <PortuguesePassageMiniExam exam={exam} examId={examId} initialDraft={draft} onDraftChange={saveDraft} onExit={onExit} onComplete={complete}/>;
}
