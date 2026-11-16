import {describe,expect,it} from "vitest";
import {balanceOptionOrder,hasOrderedNumericOptions,legacyOptionIndex,OPTION_ORDER_VERSION} from "../../app/lib/optionOrder.js";
import {RUNTIME_QUESTION_BANK} from "../../app/lib/engine.js";
import {PORTUGUESE_ITEMS} from "../../app/data/portugueseContent.js";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS} from "../../app/data/portuguesePassagePrototype.js";
import {markPortugueseDraftOrder,portugueseDraftInCurrentOrder,PORTUGUESE_DRAFT_ORDER_FIELD} from "../../app/lib/optionOrderDrafts.js";
import {restoredSubjectAnswer} from "../../app/lib/subjectProgress.js";

// A letra da resposta certa não pode seguir um padrão aprendível
// (ex.: A,B,C,D,A,B… no piloto, ou "nunca a mesma duas vezes seguidas").
function positions(items,{answerKey}){
  return items.filter(item=>Number.isInteger(item[answerKey])).map(item=>item[answerKey]);
}
function profile(answers){
  const repeats=answers.slice(1).filter((value,index)=>value===answers[index]).length/(answers.length-1);
  const counts=[0,1,2,3].map(position=>answers.filter(value=>value===position).length);
  return {repeats,maxShare:Math.max(...counts)/answers.length,minShare:Math.min(...counts)/answers.length};
}

const mathVnext=RUNTIME_QUESTION_BANK.filter(item=>/^(DG|MS|EX)-/.test(item.id)||item.pilotStatus);
const ptChoice=PORTUGUESE_ITEMS.filter(item=>item.responseType==="multiple-choice");
const fqChoice=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.responseType==="multiple-choice");
const ptPassage=Object.values(PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS).flatMap(exam=>exam.items.filter(item=>item.passageId&&item.responseType==="multiple-choice"));

describe("posição da resposta certa",()=>{
  it.each([
    ["Matemática (piloto, diagnóstico, missões, exames)",mathVnext,"a"],
    ["Português",ptChoice,"answerIndex"],
    ["Física e Química A",fqChoice,"answerIndex"]
  ])("%s: sem padrão entre perguntas seguidas e letras equilibradas",(label,items,answerKey)=>{
    const {repeats,maxShare,minShare}=profile(positions(items,{answerKey}));
    // Ao acaso, com 4 opções, a letra repete-se ~25% das vezes.
    expect(repeats).toBeGreaterThan(0.17);
    expect(repeats).toBeLessThan(0.33);
    expect(maxShare).toBeLessThan(0.32);
    expect(minShare).toBeGreaterThan(0.18);
  });

  it("os mini-exames de Português também deixam de alternar sempre a letra",()=>{
    const answers=positions(ptPassage,{answerKey:"answerIndex"});
    expect(answers.slice(1).some((value,index)=>value===answers[index])).toBe(true);
  });

  it("mantém a resposta certa e as opções, e regista a ordem de origem",()=>{
    const item={id:"T-1",o:["w","x","y","z"],a:0};
    const balanced=balanceOptionOrder(item);
    expect(balanced.o[balanced.a]).toBe("w");
    expect([...balanced.o].sort()).toEqual(["w","x","y","z"]);
    expect(balanced.optionOrderVersion).toBe(OPTION_ORDER_VERSION);
    if(balanced.optionOrderSource)expect(balanced.optionOrderSource.map(index=>item.o[index])).toEqual(balanced.o);
    expect(balanceOptionOrder(balanced).o[balanceOptionOrder(balanced).a]).toBe("w");
  });

  it("não mexe em opções numéricas ordenadas (mover uma denunciaria a certa)",()=>{
    expect(hasOrderedNumericOptions(["1","2,5","4","10"])).toBe(true);
    const item={id:"T-NUM",o:["1","2","3","4"],a:3};
    expect(balanceOptionOrder(item)).toBe(item);
  });

  it("converte índices guardados na ordem antiga para a ordem atual",()=>{
    const original={id:"PT-X",responseType:"multiple-choice",options:["a","b","c","d"],answerIndex:1};
    let balanced=null;
    for(let n=0;n<40&&!balanced?.optionOrderSource;n++)balanced=balanceOptionOrder({...original,id:`PT-X-${n}`},{optionsKey:"options",answerKey:"answerIndex"});
    for(let old=0;old<4;old++){
      const current=legacyOptionIndex(balanced,old);
      expect(balanced.options[current]).toBe(original.options[old]);
    }
    // Sessão de disciplina guardada antes da regra.
    expect(balanced.options[restoredSubjectAnswer({currentAnswer:2},balanced)]).toBe("c");
    // Sessão já guardada com a regra atual: sem segunda conversão.
    expect(restoredSubjectAnswer({currentAnswer:2,optionOrder:OPTION_ORDER_VERSION},balanced)).toBe(2);
    // Rascunho de mini-exame de Português antigo e atual.
    const draft={examId:"m",itemIds:[balanced.id],answers:{[balanced.id]:3}};
    const legacy=portugueseDraftInCurrentOrder(draft,{},[balanced]);
    expect(balanced.options[legacy.answers[balanced.id]]).toBe("d");
    const current=portugueseDraftInCurrentOrder(draft,{[PORTUGUESE_DRAFT_ORDER_FIELD]:OPTION_ORDER_VERSION},[balanced]);
    expect(current.answers[balanced.id]).toBe(3);
    // Guardar marca o rascunho; sem rascunho não se marca nada.
    const marked=markPortugueseDraftOrder({subjectSettings:{portuguese:{miniExamDraft:draft}}});
    expect(marked.subjectSettings.portuguese[PORTUGUESE_DRAFT_ORDER_FIELD]).toBe(OPTION_ORDER_VERSION);
    const empty={subjectSettings:{portuguese:{}}};
    expect(markPortugueseDraftOrder(empty)).toBe(empty);
  });
});
