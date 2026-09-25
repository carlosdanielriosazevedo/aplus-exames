import portuguesePassageDocument from "../../content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import portuguesePassageDocument2 from "../../content/vnext/portuguese/portuguese-639-passage-prototypes-2.json";
import portugueseFullExamDocument from "../../content/vnext/portuguese/portuguese-639-full-exam-supplement.json";
import {buildPortuguesePassagePrototypeExam} from "../lib/portuguesePassages";

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM=buildPortuguesePassagePrototypeExam(portuguesePassageDocument);
export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2=buildPortuguesePassagePrototypeExam(portuguesePassageDocument2);
const fullExamBase=buildPortuguesePassagePrototypeExam(portugueseFullExamDocument);
export const PORTUGUESE_FULL_PRACTICE_EXAM={
  ...fullExamBase,
  id:"full-1",
  kind:"practice-exam",
  title:"Simulado completo · Modelo 1",
  durationMinutes:120,
  toleranceMinutes:30,
  maxPoints:200,
  availablePoints:fullExamBase.maxPoints,
  scoringPolicy:{
    mandatoryCount:10,
    optionalCount:5,
    optionalBestCount:3,
    itemPoints:13,
    writingPoints:44
  },
  description:"Simulado original APProva+ alinhado estruturalmente com a Prova 639 de 2026: 15 itens, 10 obrigatórios e os 3 melhores de 5 opcionais. Duração: 120 minutos + 30 minutos de tolerância. Não é uma prova oficial do IAVE."
};

export function classifyPortugueseFullExamResults(results=[]){
  const exam=PORTUGUESE_FULL_PRACTICE_EXAM;
  const resultById=new Map(results.map(result=>[result.id||result.itemId,result]));
  const mandatory=exam.items.filter(item=>item.classificationMode==="mandatory");
  const optional=exam.items.filter(item=>item.classificationMode==="best-of-five");
  const rankedOptional=optional.map((item,index)=>{
    const result=resultById.get(item.id)||{};
    const points=Number.isFinite(result.points)?result.points:0;
    return {item,index,points,result};
  }).sort((a,b)=>b.points-a.points||a.index-b.index);
  const selectedOptional=rankedOptional.slice(0,exam.scoringPolicy.optionalBestCount);
  const selectedIds=new Set(selectedOptional.map(row=>row.item.id));
  const selectedItems=[...mandatory,...selectedOptional.map(row=>row.item)];
  const knownPoints=selectedItems.reduce((sum,item)=>{
    const result=resultById.get(item.id)||{};
    return sum+(Number.isFinite(result.points)?result.points:0);
  },0);
  const pendingItems=selectedItems.filter(item=>!Number.isFinite((resultById.get(item.id)||{}).points));
  return {
    mandatoryItemIds:mandatory.map(item=>item.id),
    optionalItemIds:optional.map(item=>item.id),
    selectedOptionalItemIds:optional.filter(item=>selectedIds.has(item.id)).map(item=>item.id),
    excludedOptionalItemIds:optional.filter(item=>!selectedIds.has(item.id)).map(item=>item.id),
    knownPoints,
    pendingItemIds:pendingItems.map(item=>item.id),
    maxPoints:exam.maxPoints
  };
}

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS={
  "mini-1":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM,
  "mini-2":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2,
  "full-1":PORTUGUESE_FULL_PRACTICE_EXAM
};

export function portuguesePassagePrototypeExam(id){
  return PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS[id]||PORTUGUESE_PASSAGE_PROTOTYPE_EXAM;
}
