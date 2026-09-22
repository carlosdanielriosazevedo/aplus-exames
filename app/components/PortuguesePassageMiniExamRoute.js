"use client";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {PORTUGUESE_PASSAGE_PROTOTYPE_EXAM} from "../data/portuguesePassagePrototype";
import {recordSubjectSession} from "../lib/subjectProgress";

export default function PortuguesePassageMiniExamRoute({setS,onExit}){
  return <PortuguesePassageMiniExam exam={PORTUGUESE_PASSAGE_PROTOTYPE_EXAM} onExit={onExit} onComplete={({items,results})=>setS(prev=>recordSubjectSession(prev,{subjectId:"portuguese",kind:"mini_exam",label:"Mini-exame de Português",items,results}))}/>;
}
