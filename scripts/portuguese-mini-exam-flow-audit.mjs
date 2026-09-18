import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const component=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const subjects=readFileSync(new URL("../app/data/subjects.js",import.meta.url),"utf8");
const prototypeModule=readFileSync(new URL("../app/data/portuguesePassagePrototype.js",import.meta.url),"utf8");

assert.match(page,/import PortuguesePassageMiniExam from "\.\/components\/PortuguesePassageMiniExam"/u,"o fluxo principal deve importar a experiência dedicada de Português");
assert.match(page,/PORTUGUESE_PASSAGE_PROTOTYPE_EXAM/u,"o router deve consumir o protótipo através da camada de dados da app");
assert.doesNotMatch(page,/content\/vnext/u,"o router principal não deve depender diretamente de fontes editoriais vNext");
assert.match(prototypeModule,/portuguese-639-passage-prototypes\.json/u,"a camada de dados deve consumir o documento canónico de textos partilhados");
assert.match(prototypeModule,/buildPortuguesePassagePrototypeExam/u,"a camada de dados deve construir o mini-exame com o builder canónico");
assert.match(page,/screen==="portugueseMiniExam"/u,"deve existir um ecrã interno dedicado ao mini-exame de Português");
assert.match(page,/onExit=\{\(\)=>go\("portugueseLab"\)\}/u,"o mini-exame interno deve regressar ao laboratório de Português");
assert.match(page,/Testar mini-exame com texto partilhado/u,"o laboratório interno deve dar acesso explícito ao mini-exame");
assert.match(page,/s\.activeSubjectId==="portuguese"/u,"a área normal de exames deve estar preparada para encaminhar Português pelo fluxo próprio");
assert.match(page,/go\("portugueseMiniExam"\)/u,"a área de exames deve encaminhar Português para o mini-exame integrado");
assert.match(page,/Os 120 itens permitem testar os fluxos/u,"a UI interna não pode continuar a declarar a contagem antiga de 60 itens");

assert.match(component,/PortuguesePassageMiniExam\(\{exam,onExit=null\}\)/u,"o componente deve aceitar saída opcional para integração no fluxo principal");
assert.match(component,/Sair do mini-exame/u,"a revisão deve permitir sair do fluxo integrado");
assert.match(component,/>Sair<\/button>/u,"a execução deve permitir sair do fluxo integrado");
assert.match(component,/não recebe classificação automática final/u,"a integração não pode transformar resposta aberta em nota automática");

const portugueseRow=subjects.match(/\{id:"portuguese"[^\n]+\}/u)?.[0]||"";
assert.ok(portugueseRow,"Português deve continuar no catálogo de disciplinas");
assert.match(portugueseRow,/releaseStage:"foundation"/u,"Português deve continuar marcado como foundation");
assert.doesNotMatch(portugueseRow,/available:true/u,"esta integração interna não pode desbloquear Português para alunos");

console.log("✓ fluxo Mini-exame Português: integrado no router interno · fonte editorial isolada na camada de dados · acesso pelo laboratório · área Exames preparada por disciplina · Português continua bloqueado em foundation · respostas abertas sem nota automática");
