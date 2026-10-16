import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/components/MathReviewMatter.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseLearnPanel.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistryLearnPanel.js",import.meta.url),"utf8");

for(const [label,source] of [["Matemática A",math],["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/REVER MATÉRIA/u,label+": deve identificar claramente o modo Rever matéria.");
  assert.match(source,/Aqui não há perguntas, pontuação nem avaliação/u,label+": Rever matéria deve continuar passivo.");
  assert.match(source,/Modo de estudo/u,label+": deve explicar a diferença entre rever e praticar.");
  assert.match(source,/“Praticar”/u,label+": deve indicar como regressar ao treino ativo.");
  assert.match(source,/ReviewMatterNavigator/u,label+": deve usar o navegador partilhado de Rever matéria.");
  assert.match(source,/selectedYear=\{year\}/u,label+": deve manter o ano selecionado explícito.");
  assert.match(source,/onYearChange=/u,label+": deve permitir mudar de ano dentro de Rever matéria.");
}

assert.match(math,/const SCHOOL_YEARS=\["10.º","11.º","12.º"\]/u,"Matemática A deve manter os três anos curriculares disponíveis.");
assert.match(math,/years=\{SCHOOL_YEARS\}/u,"Matemática A deve entregar os três anos ao navegador partilhado.");

assert.match(portuguese,/const SCHOOL_YEARS=\["10.º","11.º","12.º"\]/u,"Português deve manter os três anos curriculares disponíveis.");
assert.match(portuguese,/const navigationYears=years\.map/u,"Português deve enriquecer os anos com o respetivo período curricular.");
assert.match(portuguese,/years=\{navigationYears\}/u,"Português deve entregar os anos enriquecidos ao navegador partilhado.");

assert.match(fqa,/value:"10.º"[\s\S]{0,180}value:"11.º"/u,"FQ A deve manter 10.º e 11.º anos disponíveis.");
assert.match(fqa,/years=\{navigationYears\}/u,"FQ A deve entregar os dois anos da disciplina ao navegador partilhado.");
assert.doesNotMatch(fqa,/value:"12.º"/u,"FQ A não deve inventar um 12.º ano curricular para a disciplina.");

assert.match(fqa,/const \[domainId,setDomainId\]=useState/u,"FQ A deve permitir abrir um domínio específico.");
assert.match(fqa,/1 · VISÃO GLOBAL/u,"FQ A deve ter uma visão global por domínio.");
assert.match(fqa,/2 · MAPA DA MATÉRIA/u,"FQ A deve mostrar conteúdos nucleares organizados.");
assert.match(fqa,/3 · RELAÇÕES E GRANDEZAS/u,"FQ A deve orientar o uso de relações e unidades.");
assert.match(fqa,/4 · TRABALHO PRÁTICO/u,"FQ A deve integrar explicitamente a dimensão experimental.");
assert.match(fqa,/5 · ARMADILHAS/u,"FQ A deve tornar visíveis erros de abordagem frequentes.");
assert.match(fqa,/6 · PLANO DE REVISÃO/u,"FQ A deve terminar com um método de estudo acionável.");
assert.match(fqa,/physicsChemistryPracticalActivitiesForDomain/u,"as atividades práticas devem continuar a vir da camada de dados da disciplina.");
assert.match(fqa,/Não uses uma fórmula só por reconheceres símbolos parecidos/u,"o painel deve reforçar escolha de modelo antes da substituição numérica.");

console.log("✓ Rever matéria: Matemática A, Português e FQ A partilham modo passivo, navegação por ano e estrutura de estudo acionável");
