import {describe,expect,it} from "vitest";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../../app/data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../../app/data/vnextMission.js";
import {VNEXT_EXAM_QUESTIONS} from "../../app/data/vnextExam.js";
import {PORTUGUESE_QUESTION_BANK} from "../../app/data/portugueseQuestionBank.js";
import {PHYSICS_CHEMISTRY_QUESTION_BANK} from "../../app/data/physicsChemistryQuestionBank.js";

const VISIBLE_KEYS=new Set(["q","o","sol","prompt","options","explanation","title","subtitle","label","feedback","hint","text","statement","instruction"]);
const BAD_VISIBLE_PATTERNS=[
  ["expressao/expressoes",/\bexpressao(?:es)?\b/iu],
  ["obtem-se",/\bobtem-se\b/iu],
  ["funcao/funcoes",/\bfuncao(?:es)?\b/iu],
  ["taxa media de variacao",/\btaxa media de variacao\b/iu],
  ["nao",/\bnao\b/iu],
  ["situacao/situacoes",/\bsituacao(?:es)?\b/iu],
  ["posicao/posicoes",/\bposicao(?:es)?\b/iu],
  ["grafico/graficos",/\bgrafico(?:s)?\b/iu],
  ["equacao/equacoes",/\bequacao(?:es)?\b/iu],
  ["Qual e",/\bQual e\b/u],
  ["area e",/\barea e\b/iu]
];

function visibleStrings(value,key=null,out=[]){
  if(typeof value==="string"){
    if(key&&VISIBLE_KEYS.has(key))out.push(value);
    return out;
  }
  if(Array.isArray(value)){
    if(key&&VISIBLE_KEYS.has(key))for(const item of value)if(typeof item==="string")out.push(item);
    for(const item of value)if(item&&typeof item==="object")visibleStrings(item,null,out);
    return out;
  }
  if(value&&typeof value==="object")for(const [childKey,child] of Object.entries(value))visibleStrings(child,childKey,out);
  return out;
}

function expectAccented(label,rows){
  const strings=visibleStrings(rows);
  const failures=[];
  strings.forEach((text,index)=>{
    BAD_VISIBLE_PATTERNS.forEach(([target,pattern])=>{
      if(pattern.test(text))failures.push(`${label}[${index}] ${target}: ${text}`);
    });
  });
  expect(failures,failures.slice(0,20).join("\n")).toEqual([]);
}

describe("texto visível · acentuação pt-PT",()=>{
  it("protege Matemática A",()=>{
    expectAccented("math-diagnostic",VNEXT_DIAGNOSTIC_QUESTIONS);
    expectAccented("math-mission",VNEXT_MISSION_QUESTIONS);
    expectAccented("math-exam",VNEXT_EXAM_QUESTIONS);
  });

  it("protege Português",()=>expectAccented("portuguese",PORTUGUESE_QUESTION_BANK));
  it("protege Física e Química A",()=>expectAccented("fqa",PHYSICS_CHEMISTRY_QUESTION_BANK));
});
