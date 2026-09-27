import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const shared=readFileSync(new URL("../app/components/ExamSubmissionCheck.js",import.meta.url),"utf8");
const fqaFull=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const fqaMini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(shared,/REVER ANTES DE ENTREGAR/u,"o checkpoint deve usar linguagem clara antes da entrega.");
assert.match(shared,/OBRIGATÓRIAS EM BRANCO/u,"o aluno deve ver quantas questões obrigatórias ficaram em branco.");
assert.match(shared,/OPCIONAIS RESPONDIDAS/u,"o componente deve distinguir itens opcionais quando existirem.");
assert.match(shared,/onJump/u,"o mapa deve permitir voltar diretamente a uma questão.");
assert.match(shared,/Confirmar entrega e rever/u,"a correção só deve começar após confirmação explícita.");

for(const [label,source] of [["Mini-exame FQ A",fqaMini],["Exame Completo FQ A",fqaFull],["Português",portuguese]]){
  assert.match(source,/ExamSubmissionCheck/u,label+": deve usar o checkpoint partilhado.");
  assert.match(source,/submitCheck/u,label+": deve separar execução, confirmação e revisão.");
}
assert.match(fqaFull,/row=>row.examSection==="mandatory"/u,"FQ A deve distinguir obrigatórios de opcionais no Exame Completo.");
assert.match(portuguese,/row=>!isFullExam||row.classificationMode!=="best-of-five"/u,"Português deve distinguir obrigatórios de opcionais no Exame Completo.");
assert.match(fqaFull,/finish\(\{force:true\}\)/u,"quando o tempo termina, FQ A deve entrar na revisão sem permitir continuar a responder.");
assert.match(fqaMini,/finish\(\{force:true\}\)/u,"quando o tempo termina, o Mini-exame FQ A deve entrar na revisão sem permitir continuar a responder.");
assert.match(portuguese,/if\(examTimeExpired&&!review\)setReview\(true\)/u,"quando o tempo termina, Português deve entrar diretamente na revisão.");
assert.match(math,/REVER ANTES DE ENTREGAR/u,"Matemática A deve manter o checkpoint já existente antes da entrega.");
assert.match(math,/Confirma as tuas respostas/u,"Matemática A deve continuar a permitir rever respostas antes de entregar.");
assert.match(css,/\.examSubmitCheck\{/u,"o checkpoint partilhado deve ter layout próprio.");
assert.match(css,/@media\(max-width:620px\)[\s\S]*\.examSubmitMap/u,"o mapa de respostas deve adaptar-se ao mobile.");

console.log("✓ checkpoint pré-entrega: Matemática A, Português e FQ A permitem rever antes de entregar; opcionais tratados separadamente");
