import assert from "node:assert/strict";
import {
  CONSTRUCTED_RESPONSE_BANK,
  COMPLETION_RESPONSE_BANK,
  gradeResponse,
  miniExamPointSummary
} from "../app/lib/constructedResponse.js";
import {applyMiniExam,emptyScores} from "../app/lib/engine.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id===id);
  assert.ok(question,`Pergunta ${id} tem de existir`);
  return question;
};

// 1) Resolução corrida, como um aluno escreveria numa única caixa.
const derivative=byId("CRV2-11CD-STEPS-1");
const derivativeWork="f'(x)=3x²-2\nf'(2)=3×2²-2=10";
const derivativeGrade=gradeResponse(derivative,derivativeWork);
assert.equal(derivativeGrade.correct,true,"Uma resolução correta em duas linhas deve valer a cotação total.");
assert.equal(derivativeGrade.points,35);

// 2) Cálculos corretos, mas sem a justificação pedida: crédito parcial, não crédito total.
const slope=byId("CRV2-10GA-STEPS-1");
const slopeWork="Δy=4−2=2\nΔx=5−1=4\nm=2/4=0,5";
const slopeGrade=gradeResponse(slope,slopeWork);
assert.equal(slopeGrade.points,28,"Os cálculos devem pontuar sem inventar a justificação em falta.");
assert.equal(slopeGrade.correct,false);
assert.equal(slopeGrade.reviewRequired,true,"A justificação livre não confirmada deve ficar explicitamente por verificar.");

// 3) Resultados contraditórios para a mesma grandeza nunca podem ser escolhidos silenciosamente.
const conflict=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=10\nf'(2)=11");
const valueStep=conflict.stepResults.find(row=>row.stepId==="value");
assert.equal(valueStep?.points,0);
assert.equal(valueStep?.reason,"conflicting_results");
assert.equal(conflict.reviewRequired,true);

// 4) Um valor certo para a grandeza errada não recebe pontos.
const wrongQuantity=gradeResponse(derivative,"f(2)=10");
assert.equal(wrongQuantity.points,0);
assert.equal(wrongQuantity.correct,false);
assert.equal(wrongQuantity.reviewRequired,true);

// 5) Um número solto não pode ser reutilizado para várias etapas com o mesmo valor.
const statistics=byId("CRV2-10EST-STEPS-1");
const bareFour=gradeResponse(statistics,"4");
assert.equal(bareFour.points,8,"O valor 4 isolado só pode preencher uma etapa não identificada.");
assert.equal(bareFour.stepResults.filter(row=>row.correct).length,1);

// 6) Texto/símbolos aleatórios não podem gerar pontuação acidental.
const junk=gradeResponse(slope,"−†×−³");
assert.equal(junk.points,0);
assert.equal(junk.correct,false);

// 7) Raciocínio matemático correto + conclusão escrita de forma livre: conserva o crédito confirmado e não adivinha prosa.
const zero=byId("CRV2-10FUN-STEPS-1");
const naturalZero=gradeResponse(zero,"3x−12=0\nx=4\nLogo, quatro é a raiz da função.");
assert.equal(naturalZero.points,25,"Equação e valor devem ser confirmados; a paráfrase livre fica por verificar.");
assert.equal(naturalZero.reviewRequired,true);
assert.equal(naturalZero.pendingPoints,10);

// 8) Completamento parcialmente preenchido recebe apenas a fração correspondente da cotação.
const completion=COMPLETION_RESPONSE_BANK[0];
const partialCompletion=gradeResponse(completion,{a:1,b:0});
assert.equal(partialCompletion.status,"partial");
assert.equal(partialCompletion.points,2.5);

// 9) A incerteza automática nunca deve contaminar o Domínio do aluno.
const state={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{schoolYear:"12.º",optionalTopics:[],taughtSubtopicIds:["11-cd-derivada-ponto"]}
};
const uncertain=applyMiniExam(state,[derivative],["f(2)=10"],60);
assert.equal(uncertain.lastExam.reviewRequired,true);
assert.deepEqual(uncertain.scores,state.scores,"Respostas não verificadas não podem alterar Domínio/Certeza.");

// 10) O resumo do exame deve separar pontos confirmados de pontos pendentes.
const summary=miniExamPointSummary([zero],["3x−12=0\nx=4\nLogo, quatro é a raiz da função."]);
assert.equal(summary.earnedPoints,25);
assert.equal(summary.pendingPoints,10);
assert.equal(summary.reviewRequired,true);
assert.ok(summary.score20Upper>summary.score20);

console.log("✓ real-world constructed-response audit: partial credit, contradictions, wrong quantities, free prose and conservative mastery updates validated");
