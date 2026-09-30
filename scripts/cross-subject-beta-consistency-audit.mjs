import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const hub=readFileSync(new URL("../app/components/StudyModeHub.js",import.meta.url),"utf8");
const copy=readFileSync(new URL("../app/lib/studyModeCopy.js",import.meta.url),"utf8");
const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(hub,/<b>Exames<\/b>/u,"o hub comum deve chamar Exames ao destino que inclui Mini-exames e Exame Completo.");
assert.doesNotMatch(hub,/<b>Mini-exame<\/b>/u,"o acesso comum não deve sugerir que a área contém apenas Mini-exames.");
assert.match(copy,/Faz Mini-exames ou um Exame Completo/u,"a descrição comum deve abranger os dois formatos.");

for(const [label,source,code] of [
  ["Matemática A",math,"Matemática A · 635"],
  ["Português",portuguese,"Português · 639"],
  ["FQ A",fqa,"Física e Química A · 715"]
]){
  assert.match(source,/EXAMES/u,label+": deve identificar a área como Exames.");
  assert.ok(source.includes(code),label+": deve mostrar disciplina e código da prova.");
  assert.match(source,/examHub/u,label+": deve usar a superfície visual comum de exames.");
}
assert.match(math,/window\.history\.pushState/u,"a navegação transversal deve usar histórico nativo do browser.");
for(const [label,source] of [["Português",portuguese],["FQ A",fqa]])assert.doesNotMatch(source,/className="back"[^>]*>← Voltar/u,label+": não deve duplicar o retroceder nativo em ecrãs normais.");

for(const [label,source] of [["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/StudyModeHub/u,label+": deve reutilizar o hub comum.");
  assert.match(source,/Atualizar matéria dada/u,label+": Progresso deve permitir atualizar a matéria lecionada.");
  assert.match(source,/Ano e percurso escolar/u,label+": Progresso deve permitir rever ano e percurso escolar.");
}
assert.match(math,/Atualizar matéria dada/u,"Matemática A deve manter a mesma ação curricular no Progresso.");
assert.match(math,/Ano e percurso escolar/u,"Matemática A deve manter a mesma ação de perfil no Progresso.");

for(const [label,source] of [["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/1\. Ano/u,label+": Praticar deve começar pela seleção do ano.");
  assert.match(source,/2\. Tema/u,label+": Praticar deve usar Tema como em Matemática A.");
  assert.match(source,/3\. Em que queres focar-te\?/u,label+": Praticar deve ter a etapa de foco como em Matemática A.");
  assert.match(source,/4\. Nível/u,label+": Praticar deve ter seleção de nível como em Matemática A.");
  assert.match(source,/Adaptado ao meu nível/u,label+": Praticar deve oferecer nível adaptativo.");
  assert.match(source,/Básico/u,label+": Praticar deve oferecer nível Básico.");
  assert.match(source,/Intermédio/u,label+": Praticar deve oferecer nível Intermédio.");
  assert.match(source,/Avançado/u,label+": Praticar deve oferecer nível Avançado.");
  assert.match(source,/Desafio/u,label+": Praticar deve oferecer nível Desafio.");
}
assert.match(fqa,/answerOptionState/u,"FQ A deve usar os mesmos estados visuais de resposta correta/incorreta das restantes disciplinas.");
assert.doesNotMatch(portuguese,/respostas por grelha/u,"Português não deve expor linguagem interna de correção ao aluno.");

assert.match(math,/const \[selected,setSelected\]=useState\(\[\]\)/u,"o onboarding inicial não deve pré-selecionar qualquer disciplina.");
assert.match(math,/Nenhuma disciplina selecionada/u,"o resumo deve explicar claramente o estado inicial sem disciplinas.");
assert.match(math,/Disciplina selecionada/u,"o singular deve começar por maiúscula.");
assert.match(math,/Atualmente disponíveis: Matemática A, Português e Física e Química A/u,"a disponibilidade das três disciplinas deve aparecer como nota secundária.");

assert.match(fqa,/adaptivePath/u,"FQ A deve usar a mesma estrutura principal de Aprender das restantes disciplinas.");
assert.match(fqa,/examDrafts\.length>0/u,"uma prova FQ A em pausa deve tornar disponível a ação de repor progresso.");

console.log("✓ consistência transversal: Treinar → Exames, hubs 635/639/715, ações de Progresso e retoma alinhadas");
