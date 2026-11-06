// Com o armazenamento bloqueado, aceder a localStorage/sessionStorage lança
// SecurityError — incluindo `typeof localStorage`. Este teste impede o regresso
// de acessos que rebentem o arranque da app.
import {describe,expect,it,afterEach,vi} from "vitest";
import {readdirSync,readFileSync,statSync} from "node:fs";
import {join} from "node:path";

function files(dir){
  return readdirSync(dir).flatMap(name=>{
    const path=join(dir,name);
    return statSync(path).isDirectory()?files(path):/\.(m?js|jsx)$/.test(name)?[path]:[];
  });
}
const SOURCES=files("app").map(path=>[path,readFileSync(path,"utf8")]);
// Ficheiros com acesso direto verificado: sempre dentro de try/catch
// (ou congelados pelo contrato #385, que já o fazem).
const DIRECT_ACCESS_ALLOWED=new Set([
  "app/lib/safeStorage.js",
  "app/lib/browserStorage.js",
  "app/lib/pilotConsentClient.js",
  "app/lib/physicsChemistryExamDraft.js",
  "app/lib/stateIntegrity.js",
  "app/lib/reliability.js",
  "app/components/PersistentPortuguesePrototype.js",
  "app/page.js",
  "app/clientApp.js"
]);

describe("acesso seguro ao armazenamento",()=>{
  it("nenhum `typeof localStorage/sessionStorage` (lança com armazenamento bloqueado)",()=>{
    const offenders=SOURCES.filter(([path,src])=>path!=="app/lib/safeStorage.js"&&/typeof\s+(localStorage|sessionStorage)\b/.test(src)).map(([p])=>p);
    expect(offenders).toEqual([]);
  });

  it("nenhum parâmetro por omissão ou ternário que leia window.localStorage/sessionStorage",()=>{
    const offenders=SOURCES.filter(([,src])=>/[?=]\s*window\.(localStorage|sessionStorage)\s*[:),]/.test(src)).map(([p])=>p);
    expect(offenders).toEqual([]);
  });

  it("acesso direto só em ficheiros verificados",()=>{
    const offenders=SOURCES.filter(([path,src])=>!DIRECT_ACCESS_ALLOWED.has(path)&&/(^|[^\w.])(window\.|globalThis\.)?(localStorage|sessionStorage)\.(getItem|setItem|removeItem|clear|key)\b/m.test(src)).map(([p])=>p);
    expect(offenders).toEqual([]);
  });
});

describe("módulos que antes rebentavam com armazenamento bloqueado",()=>{
  afterEach(()=>vi.unstubAllGlobals());
  function blockStorage(){
    for(const name of ["localStorage","sessionStorage"])Object.defineProperty(globalThis,name,{configurable:true,get(){throw Object.assign(new Error("synthetic"),{name:"SecurityError"})}});
  }
  function unblock(){for(const name of ["localStorage","sessionStorage"])delete globalThis[name]}

  it("cloudReliability, validação e escrita de Português não lançam",async()=>{
    vi.resetModules();
    blockStorage();
    try{
      const cloud=await import("../../app/lib/cloudReliability.js");
      const dataset=await import("../../app/lib/graderValidationDataset.js");
      const capture=await import("../../app/lib/graderValidationCapture.js");
      const writing=await import("../../app/lib/portugueseWritingMemory.js");
      const safe=await import("../../app/lib/safeStorage.js");
      expect(safe.safeLocalStorage()).toBe(null);
      expect(safe.safeSessionStorage()).toBe(null);
      expect(()=>cloud.getOrCreateDeviceId()).not.toThrow();
      expect(cloud.listLocalSnapshots()).toEqual([]);
      expect(cloud.listPendingCloudSaves()).toEqual([]);
      // F7/P1: remover exige conta verificada; o que não pode acontecer é SecurityError do armazenamento.
      let removeError=null;try{cloud.removePendingCloudSave("x")}catch(error){removeError=error}
      expect(removeError?.name).not.toBe("SecurityError");
      expect(dataset.loadLocalValidationDataset()).toEqual([]);
      expect(dataset.clearLocalValidationDataset()).toBe(false);
      expect(capture.graderValidationConsent()).toBe(false);
      expect(capture.setGraderValidationConsent(true)).toBe(false);
      expect(writing.loadPortugueseWritingMemory()).toEqual([]);
      expect(writing.savePortugueseWritingMemory([])).toBe(false);
    }finally{unblock()}
  });

  it("quota cheia na validação de Português não lança",async()=>{
    vi.resetModules();
    const map=new Map();
    vi.stubGlobal("localStorage",{getItem:k=>map.get(k)??null,setItem(){throw Object.assign(new Error("quota"),{name:"QuotaExceededError"})},removeItem:k=>map.delete(k)});
    const capture=await import("../../app/lib/graderValidationCapture.js");
    const dataset=await import("../../app/lib/graderValidationDataset.js");
    expect(capture.setGraderValidationConsent(true)).toBe(false);
    expect(dataset.appendClosedBetaValidationCase({source:"closed_beta_real",case_id:"synthetic"},{consent:true}).ok).toBe(false);
  });
});
