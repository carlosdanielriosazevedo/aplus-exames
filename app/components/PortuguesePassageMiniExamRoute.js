"use client";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {portuguesePassagePrototypeExam} from "../data/portuguesePassagePrototype";
import {recordSubjectSession} from "../lib/subjectProgress";

export default function PortuguesePassageMiniExamRoute({s,setS,onExit}){
  const examId=s?.subjectSettings?.portuguese?.selectedMiniExamId||"mini-1";
  const exam=portuguesePassagePrototypeExam(examId);
  const label=examId==="mini-2"?"Mini-exame de Português 2":"Mini-exame de Português 1";
  return <PortuguesePassageMiniExam exam={exam} onExit={onExit} onComplete={({items,results})=>setS(prev=>recordSubjectSession(prev,{subjectId:"portuguese",kind:"mini_exam",label,items,results}))}/>;
}
