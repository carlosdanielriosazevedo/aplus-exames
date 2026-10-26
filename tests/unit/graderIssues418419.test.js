import {test,expect} from "vitest";
import {PORTUGUESE_ITEMS} from "../../app/data/portugueseContent.js";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../../app/data/physicsChemistryConstructed.js";
import {gradePortugueseResponse} from "../../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {isPortugueseClosedShortAnswer,portugueseShortAnswerReviewRequired} from "../../app/lib/portugueseShortAnswerPolicy.js";

const itemById=(list,id)=>{const item=list.find(row=>row.id===id);expect(item,`Missing item ${id}`);return item;};

test("79 foundation short answers partition into 41 deterministic and 38 human review",()=>{
  const items=PORTUGUESE_ITEMS.filter(item=>/^PT639-FND-/u.test(item.id)&&item.responseType==="short-answer");
  expect(items).toHaveLength(79);
  expect(items.filter(isPortugueseClosedShortAnswer)).toHaveLength(41);
  expect(items.filter(portugueseShortAnswerReviewRequired)).toHaveLength(38);
});

test("free thesis accepts justified and opposed positions without inventing a score",()=>{
  const item=itemById(PORTUGUESE_ITEMS,"PT639-FND-126");
  for(const response of [
    "As escolas devem reservar diariamente um período sem telemóveis.",
    "As escolas devem reservar diariamente um período sem telemóveis porque isso melhora a concentração.",
    "As escolas não devem reservar diariamente um período sem telemóveis porque os equipamentos podem apoiar a aprendizagem."
  ]){
    const result=gradePortugueseResponse(item,response);
    expect(result).toMatchObject({status:"human-review-required",final:false,points:null,correct:null,provisionalPoints:null,humanReviewRequired:true,requiresReview:true,rubricCompleted:true});
    expect(result.responseText).toBe(response);
  }
});

test("closed grammatical answer stays deterministic; editing prompt or accepted answers revokes permission",()=>{
  const item=itemById(PORTUGUESE_ITEMS,"PT639-FND-008");
  const answer=item.acceptedAnswers[0];
  expect(gradePortugueseResponse(item,answer)).toMatchObject({final:true,correct:true,points:item.maxPoints});
  for(const modified of [
    {...item,prompt:item.prompt+" (novo contexto)"},
    {...item,stimulus:(item.stimulus||"")+" (novo contexto que altera a resposta)"},
    {...item,acceptedAnswers:[...item.acceptedAnswers,"outra possibilidade"]},
    {...item,maxPoints:item.maxPoints+1}
  ]){
    expect(isPortugueseClosedShortAnswer(modified)).toBe(false);
    expect(gradePortugueseResponse(modified,answer)).toMatchObject({final:false,points:null,humanReviewRequired:true});
  }
});

test("spectral rubric gives no provisional credit to generic filler",()=>{
  const item=itemById(PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS,"FQA-R-ELEM-01");
  const result=gradePhysicsChemistryResponse(item,"Apresento uma ideia inicial, mas ainda não consigo justificar todos os elementos pedidos na questão.");
  expect(result.final).toBe(false);
  expect(result.requiresReview).toBe(true);
  expect(result.provisionalPoints).toBe(0);
  expect(result.criteria.every(row=>row.scoreRatio===0)).toBe(true);
  expect(result.scoreExplainability.rows).toHaveLength(2);
  for(const row of result.scoreExplainability.rows){
    expect(Number.isFinite(row.maxPoints)).toBe(true);
    expect(Number.isFinite(row.lostPoints)).toBe(true);
  }
});

test("correct and paraphrased science keep deserved credit; unrelated response cannot pass",()=>{
  const item=itemById(PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS,"FQA-R-ELEM-01");
  for(const response of [
    "As riscas resultam de transições entre níveis eletrónicos, com emissão de fotões de energias específicas; o padrão de riscas é característico de cada elemento.",
    "Os eletrões saltam entre níveis de energia próprios do elemento e libertam luz com frequências características, como uma assinatura."
  ]){
    const result=gradePhysicsChemistryResponse(item,response);
    expect(result.final).toBe(false);
    expect(result.provisionalPoints).toBeGreaterThan(0);
  }
  const unrelated=gradePhysicsChemistryResponse(item,"Acho que a escola é um bom local para aprender e melhorar as explicações.");
  expect(unrelated.provisionalPoints).toBe(0);
});
