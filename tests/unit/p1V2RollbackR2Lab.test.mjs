// P1-A v2 — Laboratório da candidata R2 (consulta e exportação). Dados sintéticos.
// Prova: num dispositivo com legado (main), v2 global, v2 por conta, cópias v1/v2 e
// um diário pendente, a R2 mostra o progresso v2 certo e exporta os bytes exatos,
// sem nenhuma escrita (armazenamento congelado que falha em qualquer escrita).
// Contraste r3: o main lê só a chave bruta "a25" e mostraria o progresso antigo.
import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";
import {r2Inventory,r2AreaView,r2Export,R2_EXPORT_FORMAT} from "../../app/lib/rollbackR2.js";
import {ACADEMIC_KEYS,fingerprint} from "../../app/lib/academicKeys.js";

function frozenStore(entries){
  const data=new Map(entries);const attempts=[];
  return {attempts,data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,
    setItem:(k)=>{attempts.push(["setItem",k]);throw new Error("R2: escrita proibida")},
    removeItem:(k)=>{attempts.push(["removeItem",k]);throw new Error("R2: escrita proibida")},
    clear:()=>{attempts.push(["clear"]);throw new Error("R2: escrita proibida")}};
}
const st=(xp,ids)=>JSON.stringify({_stateVersion:31,xp,missionHistory:ids.map(id=>({id,completionId:id})),examHistory:[]});
const rc=ids=>JSON.stringify(ids.map(id=>({id,status:"committed",at:1})));
const legacy=st(1234,["m-legado"]);
const v2=st(7777,["m-legado","m-v2a","m-v2b"]);
const A=st(4242,["a-1"]);
const fpAll=set=>Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,fingerprint(set[k]??null)]));
function device(){
  const legacySet={a25:legacy,"a25-completed-sessions-v1":rc(["m-legado"])};
  return [
    ["a25",legacy],["a25-completed-sessions-v1",rc(["m-legado"])],
    ["a25-ws-v2:global:a25",v2],["a25-ws-v2:global:a25-completed-sessions-v1",rc(["m-legado","m-v2a","m-v2b"])],
    ["a25-ws-v2:global:a25-active-session-v1",JSON.stringify({kind:"mission",sessionId:"d-v2",responses:[{answer:"resposta sintética"}]})],
    ["a25-ws-v2:global:applus:fqa-exam-draft:v1:fqa-mini-1",JSON.stringify({answers:{q1:"fqa sintético"}})],
    ["a25-ws-v2:global:approva.portuguese-writing-memory.v1",JSON.stringify([{attemptId:"pt-1",status:"weak"}])],
    ["a25-ws-v2:global:~legacy-import",JSON.stringify({status:"done",at:1,fp:fpAll(legacySet)})],
    ["a25-ws-v2:global:~writer-seal",JSON.stringify({tab:"t",epoch:"e",seq:1,final:true})],
    ["a25-ws-v2:global:~recovery:k1",JSON.stringify({format:"aplus-state-recovery-copy-v2",reason:"before_restore",at:1,keys:{a25:st(10,[])}})],
    ["a25-account-v1:synthetic-A:a25",st(4000,["a-0"])],
    ["a25-ws-v2:acct:synthetic-A:a25",A],
    ["a25-ws-v2:acct:synthetic-A:~legacy-import",JSON.stringify({status:"done",at:1,fp:{}})],
    ["a25-ws-v2:acct:synthetic-A:~restore-journal",JSON.stringify({id:"j",target:"x",backup:"y"})],
    ["a25-account-v1:synthetic-A:a25-state-conflict-v1:old:1:ab",JSON.stringify({format:"aplus-state-conflict-copy-v1",state:{xp:3}})],
    ["a25-device-id-v1","dev-sintético"]
  ];
}
const allBytes=store=>JSON.stringify([...store.data.entries()].sort());

describe("R2 (laboratório) · consulta e exportação sem alterar bytes",()=>{
  it("mostra o progresso v2 (não o legado), assinala diário pendente e não escreve nada",()=>{
    const store=frozenStore(device());const before=allBytes(store);
    const g=r2AreaView(store,"global");
    expect(g.source).toBe("v2");expect(g.current.xp).toBe(7777);expect(g.current.completed).toBe(3);
    expect(g.legacy.xp).toBe(1234);expect(g.legacyChangedSinceImport).toBe(false);
    const a=r2AreaView(store,"acct:synthetic-A");
    expect(a.source).toBe("v2");expect(a.current.xp).toBe(4242);expect(a.journalPending).toBe(true);expect(a.copies).toBe(1);
    expect(store.attempts).toEqual([]);expect(allBytes(store)).toBe(before);
  });

  it("exporta os bytes exatos das 9 chaves, do legado, das cópias e das chaves internas",()=>{
    const store=frozenStore(device());const before=allBytes(store);
    const out=JSON.parse(r2Export(store,"global",{now:0}));
    expect(out.format).toBe(R2_EXPORT_FORMAT);
    for(const k of ACADEMIC_KEYS)expect(out.canonical[k],k).toBe(store.data.get(`a25-ws-v2:global:${k}`)??null);
    expect(out.legacy.a25).toBe(legacy);
    expect(out.fingerprints.canonical.a25).toBe(fingerprint(v2));
    expect(Object.keys(out.copies)).toEqual(["a25-ws-v2:global:~recovery:k1"]);
    expect(out.workspace["legacy-import"]).toBe(store.data.get("a25-ws-v2:global:~legacy-import"));
    const acct=JSON.parse(r2Export(store,"acct:synthetic-A",{now:0}));
    expect(acct.canonical.a25).toBe(A);expect(acct.legacy.a25).toBe(st(4000,["a-0"]));
    expect(Object.keys(acct.v1Copies)).toHaveLength(1);
    expect(acct.workspace["restore-journal"]).toBeTruthy();
    // Isolamento: a exportação de uma área não contém bytes de outra.
    expect(JSON.stringify(out)).not.toContain("4242");expect(JSON.stringify(acct)).not.toContain("7777");
    expect(store.attempts).toEqual([]);expect(allBytes(store)).toBe(before);
  });

  it("r3 (contraste): o main lê só a chave bruta e mostraria 1234; a R2 mostra 7777",()=>{
    const store=frozenStore(device());
    const mainView=JSON.parse(store.getItem("a25")).xp; // comportamento do main 118021d (só "a25")
    expect(mainView).toBe(1234);
    expect(r2AreaView(store,"global").current.xp).toBe(7777);
  });

  it("dispositivo só com legado (nunca abriu o v2): R2 mostra o legado e continua sem escrever",()=>{
    const store=frozenStore([["a25",legacy],["a25-device-id-v1","d"]]);
    const g=r2AreaView(store,"global");
    expect(g.source).toBe("legacy");expect(g.current.xp).toBe(1234);
    expect(r2Inventory(store).other).toEqual(["a25-device-id-v1"]);
    expect(store.attempts).toEqual([]);
  });

  it("estático: o módulo não escreve armazenamento nem usa IndexedDB, Web Locks ou o escritor",()=>{
    const src=readFileSync(new URL("../../app/lib/rollbackR2.js",import.meta.url),"utf8").replace(/\/\/.*$/gm,"");
    for(const forbidden of ["setItem","removeItem",".clear(","indexedDB","navigator.locks","BroadcastChannel","stateWriter","localStorage","sessionStorage"])
      expect(src.includes(forbidden),forbidden).toBe(false);
  });
});
