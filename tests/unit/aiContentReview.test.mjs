import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {PORTUGUESE_ITEMS} from "../../app/data/portugueseContent.js";
import {PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS} from "../../app/data/portuguesePassagePrototype.js";
import {RUNTIME_QUESTION_BANK} from "../../app/lib/engine.js";
import {aiReviewFingerprint,aiReviewStatus} from "../../app/lib/aiContentReview.js";

// Decisão do product owner (2026-11-17): sem professores, a IA revê cada pergunta.
// Uma pergunta alterada depois da revisão deixa de contar como revista.
const registry=file=>JSON.parse(readFileSync(`content/reviews/ai/${file}`,"utf8"));

function portugueseActiveItems(){
  const ids=new Set(PORTUGUESE_ITEMS.map(item=>item.id));
  const passage=new Map();
  for(const exam of Object.values(PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS))for(const item of exam.items)if(!ids.has(item.id)&&!passage.has(item.id))passage.set(item.id,item);
  return [...PORTUGUESE_ITEMS,...passage.values()];
}

describe("revisão integral por IA",()=>{
  it("Física e Química A: todas as perguntas ativas revistas na versão atual",()=>{
    const status=aiReviewStatus(PHYSICS_CHEMISTRY_A_ITEMS,registry("physics-chemistry-a.json"));
    expect(status.stale,"alteradas depois da revisão — rever e atualizar o registo").toEqual([]);
    expect(status.missing,"sem revisão").toEqual([]);
  });
  it("Português: todas as perguntas ativas e de mini-exame revistas na versão atual",()=>{
    const status=aiReviewStatus(portugueseActiveItems(),registry("portuguese.json"));
    expect(status.stale,"alteradas depois da revisão — rever e atualizar o registo").toEqual([]);
    expect(status.missing,"sem revisão").toEqual([]);
  });
  it("Matemática A: todas as perguntas ativas revistas na versão atual",()=>{
    const mathRegistry=registry("matematica-a.json");
    const status=aiReviewStatus(RUNTIME_QUESTION_BANK,mathRegistry);
    expect(status.stale,"alteradas depois da revisão — rever e atualizar o registo").toEqual([]);
    expect(status.missing,"sem revisão").toEqual([]);
    expect(Object.keys(mathRegistry.items).sort()).toEqual(RUNTIME_QUESTION_BANK.map(item=>item.id).sort());
  });
  it("a impressão digital muda quando o conteúdo muda",()=>{
    const item={id:"X",prompt:"P",options:["a","b"],answerIndex:0};
    expect(aiReviewFingerprint(item)).not.toBe(aiReviewFingerprint({...item,answerIndex:1}));
    expect(aiReviewFingerprint(item)).toBe(aiReviewFingerprint({...item,year:"10.º"}));
    expect(aiReviewFingerprint({...item,passageText:"A"})).not.toBe(aiReviewFingerprint({...item,passageText:"B"}));
  });
  it("a impressão digital de Matemática inclui enunciado, opções, chave, resolução e passos",()=>{
    const item={id:"MAT",q:"P",o:["1","2"],a:0,sol:"S",response:{type:"stepwise",steps:[{expected:"1"}]}};
    for(const change of [{q:"Q"},{o:["1","3"]},{a:1},{sol:"T"},{response:{type:"stepwise",steps:[{expected:"2"}]}}]){
      expect(aiReviewFingerprint({...item,...change})).not.toBe(aiReviewFingerprint(item));
    }
  });
});

// As opções são reordenadas por pergunta (optionOrder.js): uma explicação que diga
// «a primeira opção» ou «opção B» aponta para a opção errada.
const POSITIONAL=/\b(primeir|segund|terceir|quart|últim)[oa] (opção|alternativa|versão|formulação|reformulação|hipótese|resposta|afirmação|argumento)\b|\bop[çc][ãa]o \(?[A-D]\)?(?=[\s.,;:)]|$)|\balínea \(?[a-d]\)/iu;

describe("explicações sem referência à posição da opção",()=>{
  const banks={
    "Matemática A":RUNTIME_QUESTION_BANK,
    "Física e Química A":PHYSICS_CHEMISTRY_A_ITEMS,
    "Português":portugueseActiveItems()
  };
  for(const [subject,items] of Object.entries(banks))it(subject,()=>{
    const offenders=items
      .filter(item=>Array.isArray(item.options??item.o)&&POSITIONAL.test(item.explanation??item.sol??""))
      .map(item=>`${item.id}: ${item.explanation??item.sol}`);
    expect(offenders).toEqual([]);
  });
});
