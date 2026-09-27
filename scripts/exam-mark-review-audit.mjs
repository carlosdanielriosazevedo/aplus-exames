import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const fqaFull=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const fqaMini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const fqaDraft=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const portugueseDraft=readFileSync(new URL("../app/lib/portugueseMiniExamDraft.js",import.meta.url),"utf8");
const checkpoint=readFileSync(new URL("../app/components/ExamSubmissionCheck.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

for(const [label,source] of [["Matemática A",math],["FQ A Mini-exame",fqaMini],["FQ A Exame Completo",fqaFull],["Português",portuguese]]){
  assert.match(source,/Marcar para rever/u,label+": deve permitir marcar uma questão durante a prova.");
  assert.match(source,/Marcada para rever/u,label+": deve mostrar o estado marcado.");
}
assert.match(math,/markedForReview:\[\]/u,"novos Mini-exames de Matemática devem iniciar sem questões marcadas.");
assert.match(math,/session\.markedForReview/u,"a marcação de Matemática deve viver no estado persistido da sessão.");
assert.match(math,/answerMap[\s\S]*markedForReview/u,"o checkpoint de Matemática deve mostrar as questões marcadas.");

for(const [label,source] of [["FQ A Mini-exame",fqaMini],["FQ A Exame Completo",fqaFull]]){
  assert.match(source,/initialDraft\?\.markedForReview\|\|\[\]/u,label+": deve recuperar questões marcadas.");
  assert.match(source,/markedIds=\{markedForReview\}/u,label+": o checkpoint deve receber as marcações.");
  assert.match(source,/markedForReview\.includes/u,label+": a navegação deve assinalar as questões marcadas.");
}
assert.match(fqaDraft,/markedForReview:Array\.from\(new Set\(markedForReview\)\)/u,"FQ A deve persistir marcações sem duplicados.");

assert.match(portuguese,/initialDraft\?\.markedForReview\|\|\[\]/u,"Português deve recuperar questões marcadas.");
assert.match(portuguese,/markedIds=\{markedForReview\}/u,"o checkpoint de Português deve receber as marcações.");
assert.match(portuguese,/is-marked/u,"a navegação de Português deve assinalar questões marcadas.");
assert.match(portugueseDraft,/markedForReview:Array\.isArray/u,"o rascunho de Português deve validar e filtrar marcações.");

assert.match(checkpoint,/MARCADAS PARA REVER/u,"o checkpoint comum deve contar as questões marcadas.");
assert.match(checkpoint,/row\.marked\?"Marcada para rever"/u,"o mapa pré-entrega deve priorizar o estado marcado.");
assert.match(css,/\.examMarkButton\{/u,"a ação de marcação deve ter estilo partilhado.");
assert.match(css,/\.fqaExamDots button\.marked/u,"FQ A deve ter sinal visual no mapa.");
assert.match(css,/\.ptx-question-nav button\.is-marked/u,"Português deve ter sinal visual no mapa.");
assert.match(css,/\.answerMap button\.marked/u,"Matemática deve ter sinal visual no mapa.");

console.log("✓ marcar para rever: Matemática A, Português e FQ A partilham estado, persistência e sinalização antes da entrega");
