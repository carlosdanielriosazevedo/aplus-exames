// NO-GO #462 — gate de mutação das correções P1-A v2. Cada mutante reintroduz um
// defeito da auditoria (ou retira uma guarda nova) numa cópia temporária e tem de
// ser detetado pelos testes unitários P1-A v2. Não altera o repositório.
// Uso: node tests/scripts/p1-v2-mutation-gate.mjs   (exit 1 se algum mutante sobreviver)
import {mkdtempSync,cpSync,readFileSync,writeFileSync,symlinkSync,rmSync} from "node:fs";
import {join,resolve} from "node:path";
import {tmpdir} from "node:os";
import {spawnSync} from "node:child_process";

const root=resolve(".");
const TESTS=["tests/unit/p1V2NoGoRegressions.test.mjs","tests/unit/p1V2CanonicalWorkspace.test.mjs","tests/unit/p1V2RestoreInterruption.test.mjs",
  "tests/unit/p1AuditCrossTabWriter.test.mjs","tests/unit/p1AuditStoragePropagation.test.mjs","tests/unit/p1RecoveryAuthorization.test.mjs","tests/unit/p1V2RollbackR2Lab.test.mjs"];
const M=[
  ["M2  restauro concluído não apaga o diário","app/lib/stateRecovery.js",'if(!clearRestoreJournal(scope,store)){\n    releaseAfterIncompleteRestore({reload});\n    return {ok:false,reason:"journal_not_cleared",backup','if(false){\n    releaseAfterIncompleteRestore({reload});\n    return {ok:false,reason:"journal_not_cleared",backup'],
  ["M4  leitura falhada aceite em confirmAcademicWrite","app/lib/stateWriter.js","let current=null;try{current=store.getItem(full)}catch{return false}","let current=null;try{current=store.getItem(full)}catch{return true}"],
  ["M5  resolução nunca repõe a segurança","app/lib/recoveryCopies.js",'[[target,"completed_forward"],[backup,"rolled_back"]]','[[target,"completed_forward"]]'],
  ["M10 canónico global sem dono não assinalado","app/lib/accountWorkspace.js",'    if(LEGACY_WORKSPACE_KEYS.some(key=>present(canonicalKey(key,"global"))))return true;\n',''],
  ["M13 aviso de versão anterior não fica pendente","app/lib/stateWriter.js","lastChangeAt:Date.now(),noticePending:true}","lastChangeAt:Date.now()}"],
  ["M15 importação sem verificação por releitura","app/lib/stateWriter.js",'      if((store.getItem(full)??null)!==raw)throw new Error("import");\n',''],
  ["N1  resolução ignora a falha ao apagar o diário","app/lib/recoveryCopies.js",'const finish=status=>clearRestoreJournal(scope,store)?{status,journal}:{status:"blocked",reason:"journal_not_cleared",resolved:status,journal};','const finish=status=>{clearRestoreJournal(scope,store);return {status,journal};};'],
  ["N2  diário antigo substitui progresso mais recente","app/lib/recoveryCopies.js",'  if(foreign.length)return {status:"blocked",reason:"stale_journal",foreign,journal};\n',''],
  ["N3  gravação académica com diário presente","app/lib/stateWriter.js",'  if(journal.state!=="none"){if(status.mode==="writer")haltForPendingRestore(journal);return false;}\n',''],
  ["N4  apagar cópia necessária ao diário","app/lib/stateRecovery.js",'  if(copyInUse(scope,id,store))return {ok:false,reason:"copy_in_use"};\n',''],
  ["N5  substituir cópia necessária ao diário","app/lib/recoveryCopies.js",'  if(id&&copyInUse(scope,recoveryPrefix(scope)+id))return null;\n',''],
  ["N6  cópia v1 parcial restaurável (mistura)","app/lib/stateRecovery.js",'  if(copy.partial)return {ok:false,reason:"partial_copy"};\n',''],
  ["N7  recibos D3 órfãos aceites","app/lib/stateRecovery.js",'  if(!d3.ok)return d3;\n',''],
  ["N8  chave fora da linha de base aceite","app/lib/stateWriter.js","  if(!lastKnown.has(full))return false;","  if(!lastKnown.has(full))return true;"],
  ["N9  conjunto misto reescrito sem cópia do encontrado","app/lib/recoveryCopies.js",'  if(!keep||!keep.durable)return {status:"blocked",reason:"no_space_for_found_copy",journal};\n',''],
  ["N10 escrita exclusiva sem Web Locks","app/lib/stateWriter.js",'if(!api)return {ok:false,deferred:false,reason:"no_web_locks"};','if(!api)return {ok:true,deferred:false,value:write()};'],
  ["N11 restauro reutiliza a cópia escolhida como alvo","app/lib/stateRecovery.js",'reason:"restore_target",keys:target,tab:writer.tabId,extra','reason:"restore_target",keys:target,tab:writer.tabId,dedupe:true,extra'],
];
const dir=mkdtempSync(join(tmpdir(),"p1v2-mutation-"));
let survived=0;
try{
  for(const p of ["app","tests","vitest.config.mjs","package.json"])cpSync(join(root,p),join(dir,p),{recursive:true});
  symlinkSync(join(root,"node_modules"),join(dir,"node_modules"));
  const run=()=>spawnSync(process.execPath,[join(root,"node_modules/vitest/vitest.mjs"),"run",...TESTS],{cwd:dir,encoding:"utf8"});
  const base=run();
  if(base.status!==0){console.log("BASE VERMELHA: os testes falham sem mutantes");console.log(base.stdout.slice(-2000));process.exit(1);}
  for(const [name,file,from,to] of M){
    const path=join(dir,file),src=readFileSync(path,"utf8");
    if(src.split(from).length!==2){console.log(`ERRO     ${name}: padrão não encontrado uma única vez`);survived++;continue;}
    writeFileSync(path,src.replace(from,to));
    const r=run();writeFileSync(path,src);
    const tests=(r.stdout.match(/Tests\s+[^\n]+/)||[""])[0].trim();
    if(r.status===0){survived++;console.log(`VIVO     ${name} | ${tests}`);}
    else console.log(`DETETADO ${name} | ${tests}`);
  }
}finally{rmSync(dir,{recursive:true,force:true});}
console.log(survived?`${survived} mutante(s) sobreviveram`:"todos os mutantes detetados");
process.exit(survived?1:0);
