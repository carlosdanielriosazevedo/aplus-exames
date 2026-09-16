import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";
import {applyMiniExam,emptyScores} from "../app/lib/engine.js";

const answerFor=question=>({steps:Object.fromEntries(question.response.steps.map(row=>[
  row.id,
  row.type==="numeric"?String(row.value)
    :row.type==="fraction"?`${row.numerator}/${row.denominator}`
    :row.type==="expression"?(row.accepted?.[0]||row.expected)
    :row.expected
]))});

const baseState={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{schoolYear:"12.º",optionalTopics:[],taughtSubtopicIds:[]}
};
const alternative="Apresentei uma resolução matemática alternativa que o corretor automático ainda não reconhece.";
let checked=0;

assert.equal(CONSTRUCTED_RESPONSE_BANK.length,27,"A matriz adversarial deve cobrir as 27 respostas construídas reais.");

for(const question of CONSTRUCTED_RESPONSE_BANK){
  const reference=answerFor(question);
  const complete=gradeResponse(question,reference);
  assert.equal(complete.correct,true,`${question.id}: a resposta de referência deve continuar correta.`);
  assert.equal(complete.points,question.points);
  assert.equal(complete.reviewRequired,false);
  checked++;

  const unanswered=gradeResponse(question,{steps:{}});
  assert.equal(unanswered.status,"unanswered",`${question.id}: uma resposta vazia deve permanecer sem resposta.`);
  assert.equal(unanswered.points,0);
  checked++;

  const finalOnly=gradeResponse(question,question.response.steps.at(-1).expected);
  assert.equal(finalOnly.points,0,`${question.id}: o resultado final isolado não pode receber cotação num item por etapas.`);
  assert.equal(finalOnly.reason,"final_result_only");
  assert.equal(finalOnly.reviewRequired,false);
  checked++;

  const first=question.response.steps[0];
  const firstOnly=gradeResponse(question,{steps:{[first.id]:reference.steps[first.id]}});
  assert.equal(firstOnly.points,first.points,`${question.id}: uma primeira etapa confirmada deve receber apenas a sua cotação.`);
  assert.equal(firstOnly.correct,false);
  checked++;

  const junk=gradeResponse(question,"§§§ †††");
  assert.equal(junk.points,0,`${question.id}: símbolos aleatórios não podem gerar pontos.`);
  assert.equal(junk.correct,false);
  checked++;

  const uncertain=gradeResponse(question,alternative);
  assert.equal(uncertain.status,"needs_review",`${question.id}: um processo plausível não reconhecido deve ficar por verificar.`);
  assert.equal(uncertain.reviewRequired,true);
  assert.equal(uncertain.pendingPoints,question.points);
  const after=applyMiniExam(baseState,question?[question]:[],[alternative],60);
  assert.deepEqual(after.scores,baseState.scores,`${question.id}: incerteza automática não pode alterar Domínio/Certeza.`);
  assert.equal(after.lastExam.reviewRequired,true);
  checked++;
}

let conflicts=0;
for(const question of CONSTRUCTED_RESPONSE_BANK){
  for(const row of question.response.steps){
    if(!["numeric","fraction"].includes(row.type)||!String(row.expected).includes("="))continue;
    const prefix=String(row.expected).split("=")[0];
    const correct=row.type==="numeric"?String(row.value):`${row.numerator}/${row.denominator}`;
    const wrong=row.type==="numeric"?String(Number(row.value)+1):`${row.numerator+1}/${row.denominator}`;
    const result=gradeResponse(question,`${prefix}=${correct}\n${prefix}=${wrong}`);
    const stepResult=result.stepResults.find(candidate=>candidate.stepId===row.id);
    assert.equal(stepResult?.reason,"conflicting_results",`${question.id}/${row.id}: resultados contraditórios não podem ser escolhidos silenciosamente.`);
    assert.equal(stepResult?.points,0);
    assert.equal(result.reviewRequired,true);
    conflicts++;
  }
}
assert.ok(conflicts>=20,`A matriz deve cobrir pelo menos 20 conflitos explícitos; cobriu ${conflicts}.`);

console.log(`✓ adversarial constructed responses: ${checked} cenários base + ${conflicts} contradições explícitas cobrem 27/27 perguntas sem pontuação indevida nem contaminação de Domínio/Certeza`);
