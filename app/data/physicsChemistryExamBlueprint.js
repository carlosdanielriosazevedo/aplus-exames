import {PHYSICS_CHEMISTRY_A_ITEMS} from "./physicsChemistryFoundation.js";

const itemById=id=>PHYSICS_CHEMISTRY_A_ITEMS.find(item=>item.id===id);

const mandatory=[
  ["FQA-AUTH-ELEM-G1",10],["FQA-C-ELEM-01",12],["FQA-AUTH-MAT-D1",10],["FQA-R-MAT-01",14],
  ["FQA-AUTH-ENE-G1",10],["FQA-C-ENE-01",10],["FQA-DATA-ENE-01",10],
  ["FQA-AUTH-MEC-D1",10],["FQA-C-MEC-01",10],["FQA-AUTH-WAV-G1",10],["FQA-R-WAV-01",14],
  ["FQA-AUTH-EQ-G1",10],["FQA-C-EQ-01",10],["FQA-AUTH-AQ-D1",10],["FQA-R-AQ-01",10]
];

const optional=[
  ["FQA-AUTH-ELEM-D1",10],["FQA-AUTH-MAT-G1",10],["FQA-AUTH-ENE-D1",10],["FQA-AUTH-MEC-G1",10],
  ["FQA-AUTH-WAV-D1",10],["FQA-AUTH-EQ-D1",10],["FQA-AUTH-AQ-G1",10],["FQA-AQ-04",10]
];

function buildRows(source,kind){
  return source.map(([id,examPoints],index)=>{
    const item=itemById(id);
    if(!item)throw new Error("FQ A exam blueprint references missing item: "+id);
    return {...item,examPoints,examSection:kind,examOrder:index+1};
  });
}

export const PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT={
  id:"fqa-715-sim-1",
  label:"Simulado completo · Modelo 1",
  status:"editorial-prototype",
  officialStructureReference:"Prova 715 · 2026",
  durationMinutes:120,
  toleranceMinutes:30,
  totalPoints:200,
  mandatoryItems:buildRows(mandatory,"mandatory"),
  optionalItems:buildRows(optional,"optional"),
  optionalCounted:4,
  scoringNote:"São considerados os 15 itens obrigatórios e, dos 8 itens opcionais, os 4 com melhor pontuação.",
  originality:"Conteúdo original APProva+; estrutura inspirada na Prova 715 de 2026, sem reprodução de itens oficiais."
};

export function physicsChemistryExamScore({mandatoryResults=[],optionalResults=[]}={}){
  const mandatoryScore=mandatoryResults.reduce((sum,row)=>sum+Math.max(0,Number(row?.points)||0),0);
  const optionalScores=optionalResults.map(row=>Math.max(0,Number(row?.points)||0)).sort((a,b)=>b-a);
  const optionalScore=optionalScores.slice(0,PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalCounted).reduce((sum,value)=>sum+value,0);
  return {
    mandatoryScore,
    optionalScore,
    total:Math.min(200,mandatoryScore+optionalScore),
    optionalScores,
    countedOptionalScores:optionalScores.slice(0,4)
  };
}
