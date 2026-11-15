import {afterEach,beforeEach,describe,expect,it} from "vitest";
import {archiveActiveAccount,restoreAccountArchive,switchDeviceToAccount,hasAcademicData,archiveKey,activeStateAccount} from "../../app/lib/accountDeviceStorage.js";

function memoryStore({failWritesFor=null}={}){
  const m=new Map();
  return {
    _m:m,
    get length(){return m.size},
    key:i=>[...m.keys()][i]??null,
    getItem:k=>m.has(k)?m.get(k):null,
    setItem:(k,v)=>{if(failWritesFor&&failWritesFor(k))throw new Error("QuotaExceededError");m.set(k,String(v))},
    removeItem:k=>m.delete(k)
  };
}
const stateOf=(account,xp)=>JSON.stringify({xp,cloudSync:{accountId:account}});
let saved;
beforeEach(()=>{saved={l:globalThis.localStorage,s:globalThis.sessionStorage};globalThis.localStorage=memoryStore();globalThis.sessionStorage=memoryStore()});
afterEach(()=>{globalThis.localStorage=saved.l;globalThis.sessionStorage=saved.s});

function seedA(){
  localStorage.setItem("a25",stateOf("A",120));
  localStorage.setItem("a25-active-session-v1",'{"kind":"mission","answers":[1]}');
  localStorage.setItem("applus:fqa-exam-draft:v1:fqa-mini-1",'{"version":1}');
  sessionStorage.setItem("a25-completed-sessions-v1",'["s1"]');
  localStorage.setItem("a25-device-id-v1","device-x");
  localStorage.setItem("aplus-grader-validation-consent-v1","accepted");
}

describe("separação por conta no mesmo dispositivo",()=>{
  it("arquiva todas as chaves académicas (local e sessão) e limpa a área ativa",()=>{
    seedA();
    const result=archiveActiveAccount("A");
    expect(result).toEqual({ok:true,archived:4});
    expect(hasAcademicData()).toBe(false);
    expect(localStorage.getItem("a25")).toBeNull();
    expect(sessionStorage.getItem("a25-completed-sessions-v1")).toBeNull();
    expect(localStorage.getItem("a25-device-id-v1")).toBe("device-x");
    expect(localStorage.getItem("aplus-grader-validation-consent-v1")).toBe("accepted");
    expect(localStorage.getItem(archiveKey("A"))).toContain('"accountId":"A"');
  });
  it("repõe exatamente os bytes da conta, incluindo a tentativa em curso",()=>{
    seedA();
    const before={a25:localStorage.getItem("a25"),draft:localStorage.getItem("a25-active-session-v1"),done:sessionStorage.getItem("a25-completed-sessions-v1")};
    archiveActiveAccount("A");
    expect(restoreAccountArchive("A")).toEqual({ok:true,restored:4});
    expect(localStorage.getItem("a25")).toBe(before.a25);
    expect(localStorage.getItem("a25-active-session-v1")).toBe(before.draft);
    expect(sessionStorage.getItem("a25-completed-sessions-v1")).toBe(before.done);
    expect(localStorage.getItem(archiveKey("A"))).toBeNull();
  });
  it("o aluno B nunca vê o progresso de A; A recupera-o ao voltar",()=>{
    seedA();
    expect(switchDeviceToAccount("B")).toEqual({ok:true,reload:true});
    expect(hasAcademicData()).toBe(false);
    expect(activeStateAccount()).toBeNull();
    localStorage.setItem("a25",stateOf("B",7));
    expect(switchDeviceToAccount("A")).toEqual({ok:true,reload:true});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(120);
    expect(JSON.parse(JSON.parse(localStorage.getItem(archiveKey("B"))).entries.localStorage.a25).xp).toBe(7);
  });
  it("mesma conta: nada muda e não recarrega",()=>{
    seedA();
    expect(switchDeviceToAccount("A")).toEqual({ok:true,reload:false});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(120);
  });
  it("progresso sem dono (anónimo) não é arquivado nem atribuído a ninguém",()=>{
    localStorage.setItem("a25",JSON.stringify({xp:30}));
    expect(switchDeviceToAccount("B")).toEqual({ok:true,reload:false});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(30);
  });
  it("sem espaço para o arquivo: nada é apagado e a troca é recusada",()=>{
    globalThis.localStorage=memoryStore({failWritesFor:k=>k.startsWith("approva-account-archive-v1:")});
    seedA();
    expect(switchDeviceToAccount("B")).toEqual({ok:false,code:"ARCHIVE_WRITE_FAILED",reload:false});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(120);
    expect(localStorage.getItem("a25-active-session-v1")).not.toBeNull();
  });
  it("reposição falhada a meio é desfeita e o arquivo mantém-se",()=>{
    seedA();archiveActiveAccount("A");
    const archived=localStorage.getItem(archiveKey("A"));
    const failing=memoryStore({failWritesFor:k=>k==="a25-active-session-v1"});
    failing.setItem(archiveKey("A"),archived);
    globalThis.localStorage=failing;
    expect(restoreAccountArchive("A").ok).toBe(false);
    expect(localStorage.getItem("a25")).toBeNull();
    expect(localStorage.getItem(archiveKey("A"))).toBe(archived);
  });
  it("não repõe por cima de dados ativos de outra pessoa",()=>{
    seedA();archiveActiveAccount("A");
    localStorage.setItem("a25",JSON.stringify({xp:1}));
    expect(restoreAccountArchive("A")).toEqual({ok:false,code:"ACTIVE_AREA_NOT_EMPTY"});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(1);
  });
});
