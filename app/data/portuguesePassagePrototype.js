import portuguesePassageDocument from "../../content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import portuguesePassageDocument2 from "../../content/vnext/portuguese/portuguese-639-passage-prototypes-2.json";
import portugueseFullExamSupplement from "../../content/vnext/portuguese/portuguese-639-full-exam-supplement.json";
import {buildPortuguesePassagePrototypeExam} from "../lib/portuguesePassages";

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM=buildPortuguesePassagePrototypeExam(portuguesePassageDocument);
export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2=buildPortuguesePassagePrototypeExam(portuguesePassageDocument2);
const fullExamDocument={
  ...portuguesePassageDocument,
  version:1,
  passages:[...portuguesePassageDocument.passages,...portuguesePassageDocument2.passages,...portugueseFullExamSupplement.passages]
};
export const PORTUGUESE_FULL_PRACTICE_EXAM={
  ...buildPortuguesePassagePrototypeExam(fullExamDocument),
  id:"full-1",
  kind:"practice-exam",
  title:"Simulado completo · Modelo 1",
  durationMinutes:150,
  description:"Simulado original de 200 pontos, criado pela APProva+ para treino. Não é uma prova oficial do IAVE."
};

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS={
  "mini-1":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM,
  "mini-2":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2,
  "full-1":PORTUGUESE_FULL_PRACTICE_EXAM
};

export function portuguesePassagePrototypeExam(id){
  return PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS[id]||PORTUGUESE_PASSAGE_PROTOTYPE_EXAM;
}
