import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {loadSessionDraftStatus,saveSessionDraft} from "../app/lib/sessionDraft.js";

const account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");
const cloud=readFileSync(new URL("../app/lib/cloud.js",import.meta.url),"utf8");
const drafts=readFileSync(new URL("../app/lib/sessionDraft.js",import.meta.url),"utf8");
const browserStorage=readFileSync(new URL("../app/lib/browserStorage.js",import.meta.url),"utf8");

// Sessões inacabadas continuam deliberadamente locais nesta fase. Se o
// localStorage do browser estiver indisponível, sessionStorage é uma rede de
// segurança local — nunca uma sincronização cloud implícita.
assert.match(drafts,/writeStorageFallback\(key,JSON\.stringify/u,"rascunhos de sessão devem usar persistência local resiliente");
assert.match(browserStorage,/\["localStorage","sessionStorage"\]/u,"a persistência deve tentar localStorage antes do fallback de sessão");
assert.match(browserStorage,/export function writeStorageFallback/u,"o fallback local deve permanecer centralizado e testável");
// Uma ausência longa não autoriza descartar ou substituir uma avaliação pendente.
// Exercitar o armazenamento real, em vez de exigir uma constante de expiração.
const previousStorage=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
const entries=new Map();
Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,String(value)),removeItem:key=>entries.delete(key)}});
try{
  for(const kind of ["diagnostic","mission","training","mini_exam"]){
    entries.clear();
    const key="a25-active-session-v1";
    const original={kind,sessionId:"original-"+kind,answers:[0,1],savedAt:Date.now()-30*864e5};
    const raw=JSON.stringify(original);entries.set(key,raw);
    assert.deepEqual(loadSessionDraftStatus().draft,original,"a tentativa deve sobreviver a 30 dias sem uso");
    assert.equal(saveSessionDraft({...original,sessionId:"replacement"}),false,"outra tentativa não pode substituir o draft");
    assert.equal(entries.get(key),raw,"a tentativa original e as respostas devem manter-se intactas");
  }
  entries.set("a25-active-session-v1","{invalid");
  assert.equal(loadSessionDraftStatus().error,true,"um draft inválido deve bloquear a recuperação");
  assert.equal(entries.get("a25-active-session-v1"),"{invalid","um erro de leitura não autoriza apagar dados");
}finally{
  if(previousStorage)Object.defineProperty(globalThis,"localStorage",previousStorage);else delete globalThis.localStorage;
}
assert.doesNotMatch(cloud,/sessionDraft|active-session/u,"a cloud de progresso não deve começar a transportar rascunhos de sessão sem um protocolo próprio de conflitos");

// Nenhuma das ações de carga pode substituir a tentativa local ou o seu baseline.
for(const handler of ["loadCloud","resolveKeepRemote","resolveMerge"]){
  assert.ok(account.includes(`async function ${handler}(){\n    if(hasPendingAssessment(s))`),`${handler} deve bloquear a carga durante uma avaliação`);
}
assert.ok((account.match(/setS\(prev=>preservePendingAssessment\(prev,/gu)||[]).length>=3,"a aplicação tardia de uma resposta cloud também deve respeitar a tentativa atual");

// Logout nunca deve apagar o estudo local.
assert.match(account,/Sessão terminada\. O progresso local continua neste dispositivo\./u,"logout deve informar e preservar o progresso local");
assert.doesNotMatch(account,/async function signout\(\)[\s\S]{0,700}clearLocalState/u,"logout não pode limpar silenciosamente o estado local");

// Carregar cloud é uma ação explícita e cria rede de segurança antes de aplicar estado remoto.
assert.match(account,/saveLocalSnapshot\(s,\{label:"Antes de carregar da cloud"\}\);[\s\S]*mergeStudentCloudState\(s,row\.state_json\)/u,"carregar cloud deve criar snapshot antes de aplicar estado remoto");
assert.match(account,/Carregar progresso online/u,"a ação de carga deve usar linguagem clara para o aluno");
assert.match(account,/Detalhes e cópias de segurança/u,"a UI deve manter acesso aos detalhes de segurança sem os impor como linguagem principal");

// Uma revisão remota mais recente bloqueia a escrita e exige decisão consciente.
assert.match(account,/Existe progresso online mais recente\. Não substituímos nada automaticamente\./u,"conflitos devem bloquear sobrescritas automáticas");
assert.match(account,/Encontrámos progresso mais recente noutro dispositivo/u,"a UI deve explicar o conflito em linguagem não técnica");
for(const label of ["Usar progresso online","Combinar progresso","Manter este dispositivo"]){
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

console.log("✓ cloud resume product contract: progresso concluído sincronizável · sessão inacabada local com fallback seguro · logout seguro · snapshots · conflitos explícitos · retry offline · CAS por revisão");
