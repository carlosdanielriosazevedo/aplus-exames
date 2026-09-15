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

// 11) Ordem das linhas: uma resolução correta continua válida mesmo quando o aluno escreve a conclusão antes da derivação.
const reorderedDerivative=gradeResponse(derivative,"f'(2)=10\nf'(x)=-2+3*x*x\n3*2^2-2");
assert.equal(reorderedDerivative.correct,true,"A ordem física das linhas não deve anular matemática correta e identificável.");
assert.equal(reorderedDerivative.points,35);

// 12) Expressões polinomiais equivalentes devem ser aceites, não apenas a grafia da solução-modelo.
const equivalentDerivative=gradeResponse(derivative,"f'(x)=-2+3*x*x\n3*2^2-2\nf'(2)=10");
assert.equal(equivalentDerivative.correct,true,"Formas polinomiais equivalentes devem valer o mesmo.");
assert.equal(equivalentDerivative.points,35);

// 13) Separador decimal português e tolerância de arredondamento.
const numeric={id:"realworld-num",points:10,response:{type:"numeric",value:2.5,tolerance:.01}};
assert.equal(gradeResponse(numeric,"2,50").correct,true);
assert.equal(gradeResponse(numeric,"2,509").correct,true,"Um arredondamento dentro da tolerância deve ser aceite.");
assert.equal(gradeResponse(numeric,"2,52").correct,false,"Um valor fora da tolerância não deve ser aceite.");

// 14) Frações equivalentes, incluindo sinais, devem ser reconhecidas matematicamente.
const fraction={id:"realworld-frac",points:10,response:{type:"fraction",numerator:1,denominator:2}};
assert.equal(gradeResponse(fraction,"2/4").correct,true);
assert.equal(gradeResponse(fraction,"-2/-4").correct,true);
assert.equal(gradeResponse(fraction,"1/0").correct,false);

// 15) Valores iguais em etapas distintas só contam duas vezes se estiverem explicitamente identificados.
const labelledRepeated=gradeResponse(statistics,"n=4\nmédia=4");
assert.equal(labelledRepeated.points,25);
assert.equal(labelledRepeated.stepResults.filter(row=>row.correct).length,2);

// 16) Uma cadeia de cálculo correta e explicitamente identificada deve ser validada até ao resultado final.
const chained=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3*2²-2=10");
assert.equal(chained.correct,true);
assert.equal(chained.points,35);

console.log("✓ real-world constructed-response audit: partial credit, contradictions, equivalence, rounding, fractions, reordered work and conservative mastery updates validated");
