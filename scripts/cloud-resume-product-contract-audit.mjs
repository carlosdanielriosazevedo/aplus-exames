import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");
const cloud=readFileSync(new URL("../app/lib/cloud.js",import.meta.url),"utf8");
const drafts=readFileSync(new URL("../app/lib/sessionDraft.js",import.meta.url),"utf8");

// Sessões inacabadas continuam deliberadamente locais nesta fase.
assert.match(drafts,/localStorage\.setItem\(key,JSON\.stringify/u,"rascunhos de sessão devem continuar persistidos localmente");
assert.match(drafts,/const MAX_AGE_MS=1000\*60\*60\*24/u,"rascunhos transitórios devem manter expiração local explícita");
assert.doesNotMatch(cloud,/sessionDraft|active-session/u,"a cloud de progresso não deve começar a transportar rascunhos de sessão sem um protocolo próprio de conflitos");

// Logout nunca deve apagar o estudo local.
assert.match(account,/Sessão terminada\. O progresso local continua neste dispositivo\./u,"logout deve informar e preservar o progresso local");
assert.doesNotMatch(account,/async function signout\(\)[\s\S]{0,700}clearLocalState/u,"logout não pode limpar silenciosamente o estado local");

// Carregar cloud é uma ação explícita e cria rede de segurança antes de aplicar estado remoto.
assert.match(account,/saveLocalSnapshot\(s,\{label:"Antes de carregar da cloud"\}\);[\s\S]*mergeStudentCloudState\(s,row\.state_json\)/u,"carregar cloud deve criar snapshot antes de aplicar o estado remoto");
assert.match(account,/Carregar cloud com snapshot/u,"a ação de carga deve comunicar a existência do snapshot");

// Uma revisão remota mais recente bloqueia a escrita e exige decisão consciente.
assert.match(account,/A cloud tem uma versão mais recente\. Não substituímos nada automaticamente\./u,"conflitos devem bloquear sobrescritas automáticas");
assert.match(account,/Conflito detetado — nada foi sobrescrito/u,"a UI deve explicar claramente o bloqueio por conflito");
for(const label of ["Manter cloud","Combinar atividade","Manter este dispositivo"]){
  assert.ok(account.includes(label),`resolução de conflito em falta: ${label}`);
}
assert.match(account,/safeCloudMerge\(s,conflictRemote\.state_json\)/u,"a opção combinar deve usar o merge seguro");

// Falha de rede não pode perder o progresso nem descartar a tentativa de sync.
assert.match(account,/queueCloudSave\(s,\{reason:"save_failed"/u,"falha ao guardar deve criar uma tentativa local pendente");
assert.match(account,/Falhou anteriormente sem apagar o progresso local\./u,"a fila pendente deve comunicar preservação do progresso local");
assert.match(account,/Tentar novamente/u,"deve existir retry explícito da gravação pendente");

// Escrita cloud continua protegida por revisão otimista/CAS.
assert.match(cloud,/\.eq\("revision",Number\(expectedRevision\)\|\|0\)/u,"gravações cloud devem manter compare-and-swap por revisão");
assert.match(cloud,/return \{ok:false,conflict:true,remote/u,"avanço remoto deve regressar como conflito e não ser sobrescrito");

console.log("✓ cloud resume product contract: progresso concluído sincronizável · sessão inacabada local · logout seguro · snapshots · conflitos explícitos · retry offline · CAS por revisão");
