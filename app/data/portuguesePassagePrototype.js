import portuguesePassageDocument from "../../content/vnext/portuguese/portuguese-639-passage-prototypes.json";
import portuguesePassageDocument2 from "../../content/vnext/portuguese/portuguese-639-passage-prototypes-2.json";
import portuguesePassageDocument3 from "../../content/vnext/portuguese/portuguese-639-passage-prototypes-3.json";
import portugueseMini10Document from "../../content/vnext/portuguese/portuguese-639-mini-10-1.json";
import portugueseMini11Document from "../../content/vnext/portuguese/portuguese-639-mini-11-1.json";
import portugueseMini10Document2 from "../../content/vnext/portuguese/portuguese-639-mini-10-2.json";
import portugueseMini11Document2 from "../../content/vnext/portuguese/portuguese-639-mini-11-2.json";
import portugueseFullExamDocument from "../../content/vnext/portuguese/portuguese-639-full-exam-supplement.json";
import {buildPortugueseExamBlocks,buildPortuguesePassagePrototypeExam,portugueseExamReadingLoad} from "../lib/portuguesePassages";
import {PORTUGUESE_ITEMS} from "./portugueseContent";
import {PORTUGUESE_MINI_EXAM_QUESTIONS} from "../lib/sessionPolicy";

function expandPortugueseMiniExam(base,year,offset=0){
  const domains=["gramatica","escrita"];
  const supplements=domains.flatMap((domain,domainIndex)=>{
    const pool=PORTUGUESE_ITEMS.filter(item=>
      item.year===year&&item.domain===domain&&item.responseType!=="extended-writing"&&
      String(item.stimulus||"").trim()&&!base.items.some(baseItem=>baseItem.id===item.id)
    );
    if(pool.length<2)throw new Error(`Cobertura insuficiente para expandir mini-exame de ${year}: ${domain}.`);
    const start=(offset+domainIndex*2)%pool.length;
    return [pool[start],pool[(start+1)%pool.length]].map(item=>({
      ...item,
      passageTitle:domain==="gramatica"?"Gramática":"Escrita"
    }));
  });
  const items=[...base.items,...supplements].slice(0,PORTUGUESE_MINI_EXAM_QUESTIONS);
  const blocks=buildPortugueseExamBlocks(items);
  const responseTypes=items.reduce((counts,item)=>({...counts,[item.responseType]:(counts[item.responseType]||0)+1}),{});
  return {
    ...base,
    items,
    blocks,
    itemCount:items.length,
    maxPoints:items.reduce((sum,item)=>sum+(Number(item.maxPoints)||0),0),
    readingWords:portugueseExamReadingLoad(items),
    responseTypes,
    durationMinutes:45,
    miniExamDomains:[...new Set(items.map(item=>item.domain))]
  };
}

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portuguesePassageDocument),"12.º",0);
export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portuguesePassageDocument2),"12.º",4);
export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_3=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portuguesePassageDocument3),"12.º",8);
export const PORTUGUESE_MINI_EXAM_10_1=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portugueseMini10Document),"10.º",0);
export const PORTUGUESE_MINI_EXAM_11_1=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portugueseMini11Document),"11.º",0);
export const PORTUGUESE_MINI_EXAM_10_2=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portugueseMini10Document2),"10.º",4);
export const PORTUGUESE_MINI_EXAM_11_2=expandPortugueseMiniExam(buildPortuguesePassagePrototypeExam(portugueseMini11Document2),"11.º",4);
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
  const answeredOptionalCount=optional.filter(item=>(resultById.get(item.id)||{}).status!=="unanswered").length;
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
    answeredOptionalCount,
    knownPoints,
    pendingItemIds:pendingItems.map(item=>item.id),
    maxPoints:exam.maxPoints
  };
}

export const PORTUGUESE_MINI_EXAM_CATALOG=[
  {id:"mini-10-1",year:"10.º",title:"Mini-exame · 10.º ano · Modelo 1",shortTitle:"Mapas e presença",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_MINI_EXAM_10_1},
  {id:"mini-10-2",year:"10.º",title:"Mini-exame · 10.º ano · Modelo 2",shortTitle:"Espaço e expectativa",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_MINI_EXAM_10_2},
  {id:"mini-11-1",year:"11.º",title:"Mini-exame · 11.º ano · Modelo 1",shortTitle:"Discordância e memória",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_MINI_EXAM_11_1},
  {id:"mini-11-2",year:"11.º",title:"Mini-exame · 11.º ano · Modelo 2",shortTitle:"Indicadores e passado",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_MINI_EXAM_11_2},
  {id:"mini-1",year:"12.º",title:"Mini-exame 1 · Espaço e memória",shortTitle:"Espaço e memória",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_PASSAGE_PROTOTYPE_EXAM},
  {id:"mini-2",year:"12.º",title:"Mini-exame 2 · Escolha e despedida",shortTitle:"Escolha e despedida",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2},
  {id:"mini-3",year:"12.º",title:"Mini-exame 3 · Atenção e memória",shortTitle:"Atenção e memória",description:"10 itens · 4 domínios · ~45 min",exam:PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_3}
];

export function portugueseMiniExamsForYear(year){
  return PORTUGUESE_MINI_EXAM_CATALOG.filter(row=>row.year===year);
}

export function portugueseMiniExamMeta(id){
  return PORTUGUESE_MINI_EXAM_CATALOG.find(row=>row.id===id)||null;
}

export const PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS={
  "mini-10-1":PORTUGUESE_MINI_EXAM_10_1,
  "mini-10-2":PORTUGUESE_MINI_EXAM_10_2,
  "mini-11-1":PORTUGUESE_MINI_EXAM_11_1,
  "mini-11-2":PORTUGUESE_MINI_EXAM_11_2,
  "mini-1":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM,
  "mini-2":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2,
  "mini-3":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_3,
  "full-1":PORTUGUESE_FULL_PRACTICE_EXAM
};

export function portuguesePassagePrototypeExam(id){
  return PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS[id]||PORTUGUESE_PASSAGE_PROTOTYPE_EXAM;
}
