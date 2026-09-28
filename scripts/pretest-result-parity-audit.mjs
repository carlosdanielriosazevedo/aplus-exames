import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(math,/TREINO CONCLUÍDO/u,"Matemática A deve mostrar um ecrã de resultado após o Treino Livre.");
assert.match(math,/Treinar outra coisa/u,"Matemática A deve oferecer continuação após o resultado.");
assert.match(portuguese,/Sessão concluída/u,"Português deve mostrar um ecrã de resultado após a sessão.");
assert.match(portuguese,/Treinar outra coisa/u,"Português deve oferecer continuação após o resultado.");

assert.match(fqa,/if\(session\?\.finished\)/u,"FQ A deve separar execução e resultado da sessão.");
assert.match(fqa,/Treino concluído/u,"FQ A deve mostrar resultado explícito depois do Treino Livre.");
assert.match(fqa,/Missão concluída/u,"FQ A deve mostrar resultado explícito depois da Missão.");
assert.match(fqa,/Diagnóstico concluído/u,"FQ A deve mostrar resultado explícito depois do Diagnóstico.");
assert.match(fqa,/Resultado académico incompleto/u,"FQ A deve manter respostas abertas separadas de uma nota automática.");
assert.match(fqa,/Treinar outra coisa/u,"o resultado de treino FQ A deve permitir continuar a praticar.");
assert.match(fqa,/Ver progresso detalhado/u,"o resultado da Missão FQ A deve permitir abrir Progresso.");
assert.match(fqa,/Ver resultado/u,"a última pergunta deve conduzir ao resultado, não saltar diretamente para Home.");
assert.match(fqa,/const finalResults=feedback\?\[\.\.\.results\.slice\(0,-1\),feedback\]:results/u,"FQ A deve congelar também o último feedback antes de gravar a sessão.");
assert.doesNotMatch(fqa,/setSession\(null\);setAnswer\(null\);setFeedback\(null\);setResults\(\[\]\);setRubricAssessment\(\{\}\);\s*go\(kind==="diagnostic"\?"progress":"home"\)/u,"FQ A não deve apagar a sessão antes de mostrar o resultado.");

for(const [label,source] of [["Matemática A",math],["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/Voltar à Home/u,label+": o resultado deve permitir regressar à Home.");
}

console.log("✓ pós-sessão: Matemática A, Português e FQ A mostram resultado antes do próximo passo");
