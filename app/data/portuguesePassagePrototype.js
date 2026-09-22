import portuguesePassageDocument from "../../content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import portuguesePassageDocument2 from "../../content/vnext/portuguese/portuguese-639-passage-prototypes-2.json";
import {buildPortuguesePassagePrototypeExam} from "../lib/portuguesePassages";

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM=buildPortuguesePassagePrototypeExam(portuguesePassageDocument);
export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2=buildPortuguesePassagePrototypeExam(portuguesePassageDocument2);

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS={
  "mini-1":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM,
  "mini-2":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2
};

export function portuguesePassagePrototypeExam(id){
  return PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS[id]||PORTUGUESE_PASSAGE_PROTOTYPE_EXAM;
}
