import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");
const main=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");
const account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");
const publicCopy=ranking+"\n"+main+"\n"+account;
assert.doesNotMatch(publicCopy,/Certeza da app/u,"copy deve usar a personagem: Certeza do Apronso");
assert.doesNotMatch(ranking,/tester simulado|menos farming|Em produção, cada liga|experiência deverá/u,"Ranking não deve expor copy de protótipo/técnica");
assert.match(ranking,/participante simulado/u,"modo de demonstração continua transparente");
assert.match(ranking,/Certeza/u,"Ranking mantém a fronteira entre atividade e conhecimento");
assert.match(main,/Certeza do Apronso/u,"métrica pedagógica usa vocabulário consistente");
assert.doesNotMatch(account,/Nome da escola/u,"Conta não deve permitir escola em texto livre");
console.log("✓ final public RC copy/polish audit passed");
