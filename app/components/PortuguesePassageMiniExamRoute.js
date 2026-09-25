"use client";
import {useCallback} from "react";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {portuguesePassagePrototypeExam} from "../data/portuguesePassagePrototype";
import {recordSubjectSession} from "../lib/subjectProgress";
import {clearPortugueseMiniExamDraft,normalizePortugueseMiniExamDraft,savePortugueseMiniExamDraft} from "../lib/portugueseMiniExamDraft";

export default function PortuguesePassageMiniExamRoute({s,setS,onExit}){
  const examId=s?.subjectSettings?.portuguese?.selectedMiniExamId||"mini-1";
  const exam=portuguesePassagePrototypeExam(examId);
  const label=examId==="mini-2"?"Mini-exame de Português 2":"Mini-exame de Português 1";
  const itemIds=exam.items.map(item=>item.id);
  const draft=normalizePortugueseMiniExamDraft(s?.subjectSettings?.portuguese?.miniExamDraft,{examId,itemIds});
  const saveDraft=useCallback(nextDraft=>setS(prev=>savePortugueseMiniExamDraft(prev,nextDraft)),[setS]);
  const complete=useCallback(({items,results,sessionId})=>setS(prev=>recordSubjectSession(clearPortugueseMiniExamDraft(prev),{subjectId:"portuguese",kind:"mini_exam",label,items,results,sessionId})),[label,setS]);
  return <PortuguesePassageMiniExam exam={exam} examId={examId} initialDraft={draft} onDraftChange={saveDraft} onExit={onExit} onComplete={complete}/>;
}
