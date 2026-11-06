// P1-A v2 — Inventário das chaves de armazenamento (guarda estático).
// Qualquer literal de chave novo em app/ falha este teste até ser classificado:
// uma chave académica nova não pode ficar fora das 9 chaves canónicas por omissão.
import {describe,expect,it} from "vitest";
import {readFileSync,readdirSync,statSync} from "node:fs";
import {join} from "node:path";
import {ACADEMIC_KEYS} from "../../app/lib/academicKeys.js";

const ROOT=new URL("../../app/",import.meta.url).pathname;
function files(dir){return readdirSync(dir).flatMap(name=>{const p=join(dir,name);return statSync(p).isDirectory()?files(p):p.endsWith(".js")?[p]:[];});}
const sources=files(ROOT).map(p=>[p,readFileSync(p,"utf8")]);
const literals=new Set(sources.flatMap(([,s])=>[...s.matchAll(/["'`](a25[-a-z0-9:.]*|applus:[-a-z0-9:.]*|approva[.:][-a-z0-9.:]*|aplus-[-a-z0-9.:]*)["'`$]/g)].map(m=>m[1])));

// Classificação (docs/security/p1a-v2-key-inventory.md).
const CLASSIFIED={
  academic:new Set(ACADEMIC_KEYS),
  academicPrefix:new Set(["applus:fqa-exam-draft:v1:"]),                       // rascunhos FQ A: só os 3 ids abaixo
  outsideAcademic:new Set([
    "a25-completed-sessions-v1-quarantine-",                                  // D1: cópia de recibos ilegíveis (só acrescenta)
    "a25-cloud-auth-epoch-v1","a25-cloud-pending-v1","a25-cloud-pending-v2:",  // cloud (servidor com CAS)
    "a25-cloud-recovery-v1:","a25-cloud-recovery-v2:","a25-cloud-snapshot-v2:","a25-cloud-snapshots-v1",
    "applus:portuguese-prototype-draft:v1","applus:portuguese-prototype-draft:v2", // protótipo PT: escrita bloqueada (P1-B)
    "a25-device-id-v1","a25-onboarding-entry","a25-daily-mission-resume:","a25-completion-owner-v1", // técnicos / separador
  ]),
  namespaces:new Set(["a25-account-v1:","a25-ws-v2:","a25-state-conflict-v1:","a25-state-tabcopy-v1:"]),
  events:new Set(["approva:durable-storage","approva:state-integrity-blocked","approva:state-writer","approva:storage-tier","approva:volatile-storage"]),
  // aplus-*: chaves reais e, sobretudo, esquemas/nomes de ficheiro (não são armazenamento)
  aplusStorage:new Set(["aplus-grader-validation-local-v1","aplus-grader-validation-consent-v1","aplus-pilot-consent-active-v1"]),
};
const isAplusFormat=l=>l.startsWith("aplus-")&&!CLASSIFIED.aplusStorage.has(l);

describe("P1-A v2 · inventário de chaves",()=>{
  it("todos os literais de chave em app/ estão classificados",()=>{
    const unknown=[...literals].filter(l=>!Object.values(CLASSIFIED).some(set=>set.has(l))&&!isAplusFormat(l));
    expect(unknown,"chave nova sem classificação").toEqual([]);
  });
  it("cada exame de FQ A existente tem o rascunho dentro das 9 chaves canónicas",()=>{
    const ids=new Set(sources.flatMap(([,s])=>[...s.matchAll(/\bfqa-(?:mini|full)-[0-9a-z]+\b/g)].map(m=>m[0])));
    expect(ids.size).toBeGreaterThan(0);
    for(const id of ids)expect(ACADEMIC_KEYS,"rascunho FQ A fora do canónico: "+id).toContain(`applus:fqa-exam-draft:v1:${id}`);
  });
  it("as escritas diretas ao localStorage bruto (sem guarda de escritor) são só as conhecidas",()=>{
    // Fora de accountWorkspace/stateWriter/recovery: globalThis.localStorage/sessionStorage usados para escrever.
    const raw=sources.filter(([p,s])=>/(globalThis|window)\.(localStorage|sessionStorage)\??\.setItem|for\(const store of stores\(\)\)/.test(s)).map(([p])=>p.slice(ROOT.length)).sort();
    expect(raw).toEqual(["clientApp.js","lib/cloudAccountSession.js","lib/cloudReliability.js","lib/reliability.js","page.js"]);
  });
});
