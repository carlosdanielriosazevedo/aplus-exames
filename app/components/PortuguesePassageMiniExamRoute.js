"use client";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {PORTUGUESE_PASSAGE_PROTOTYPE_EXAM} from "../data/portuguesePassagePrototype";

export default function PortuguesePassageMiniExamRoute({onExit}){
  return <PortuguesePassageMiniExam exam={PORTUGUESE_PASSAGE_PROTOTYPE_EXAM} onExit={onExit}/>;
}
