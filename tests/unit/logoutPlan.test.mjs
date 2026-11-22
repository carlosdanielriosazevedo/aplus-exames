import {afterEach,beforeEach,describe,expect,it} from "vitest";
import {detectUnsavedWork,logoutPlan,logoutPromptCopy,PORTUGUESE_PROTOTYPE_DRAFT_KEY} from "../../app/lib/logoutPlan.js";
import {archiveActiveAccount,purgeAccountFromDevice,switchDeviceToAccount,hasAcademicData,activeStateAccount,discardUnsavedDeviceProgress,discardAnonymousArchive,ANONYMOUS_ARCHIVE_ID,archiveKey} from "../../app/lib/accountDeviceStorage.js";

function memoryStore(){
  const m=new Map();
  return {get length(){return m.size},key:i=>[...m.keys()][i]??null,getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
}
let saved;
beforeEach(()=>{saved={l:globalThis.localStorage,s:globalThis.sessionStorage};globalThis.localStorage=memoryStore();globalThis.sessionStorage=memoryStore()});
afterEach(()=>{globalThis.localStorage=saved.l;globalThis.sessionStorage=saved.s});

const none={sessionDraft:()=>({draft:null}),fqaExam:()=>null};
const work=(over={})=>detectUnsavedWork({},{...none,storage:memoryStore(),...over});

describe("terminar sessão: o que fica no dispositivo",()=>{
  it("caso normal: guardado na conta e nada a meio → apaga sem perguntar",()=>{
    expect(logoutPlan({flushStatus:"saved",work:work()})).toEqual({kind:"purge"});
  });
  it("missão ou diagnóstico a meio → aviso curto; depois de aceitar, apaga",()=>{
    const w=work({sessionDraft:()=>({draft:{kind:"mission"}})});
    expect(w).toEqual({long:[],short:["uma missão"]});
    const plan=logoutPlan({flushStatus:"saved",work:w});
    expect(plan.kind).toBe("short");
    expect(logoutPromptCopy(plan).text).toBe("Tens uma missão a meio. Se saíres agora, recomeça na próxima vez.");
    expect(logoutPlan({flushStatus:"saved",work:w,confirmed:"short"})).toEqual({kind:"purge"});
    expect(work({sessionDraft:()=>({draft:{kind:"diagnostic"}})}).short).toEqual(["o diagnóstico"]);
  });
  it("mini-exame, exame de FQ A ou texto de Português a meio → aviso forte com «Voltar e terminar» em destaque",()=>{
    const storage=memoryStore();storage.setItem(PORTUGUESE_PROTOTYPE_DRAFT_KEY,'{"text":"..."}');
    const w=detectUnsavedWork({subjectSettings:{portuguese:{miniExamDraft:{id:"x"}}}},{sessionDraft:()=>({draft:{kind:"mini_exam"}}),fqaExam:()=>({examId:"fqa-mini-1"}),storage});
    expect(w.long).toEqual(["um mini-exame","um mini-exame de Português","um exame de FQ A","um texto de Português"]);
    const plan=logoutPlan({flushStatus:"saved",work:w});
    const copy=logoutPromptCopy(plan);
    expect(plan.kind).toBe("long");expect(copy.tone).toBe("danger");
    expect(copy.stay).toBe("Voltar e terminar");expect(copy.leave).toBe("Sair e apagar");
    expect(copy.text).toMatch(/só está guardado neste dispositivo\. Se saíres agora, perde-se\./);
    expect(logoutPlan({flushStatus:"saved",work:w,confirmed:"long"})).toEqual({kind:"purge"});
  });
  it("sem rede (ou sessão expirada) → nunca apaga; o aluno fica ou sai guardando só neste dispositivo",()=>{
    for(const status of ["error","offline","signed_out","inactive",undefined]){
      expect(logoutPlan({flushStatus:status,work:work()}).kind).toBe("offline");
      expect(logoutPlan({flushStatus:status,work:work(),confirmed:"offline"}).kind).toBe("keep_local");
    }
    const copy=logoutPromptCopy({kind:"offline"});
    expect(copy.stay).toBe("Ficar e tentar outra vez");expect(copy.leave).toBe("Sair e guardar só neste dispositivo");
  });
  it("aceitar o aviso curto não serve para saltar o aviso forte",()=>{
    const storage=memoryStore();storage.setItem(PORTUGUESE_PROTOTYPE_DRAFT_KEY,"x");
    const w=detectUnsavedWork({},{...none,storage});
    expect(logoutPlan({flushStatus:"saved",work:w,confirmed:"short"}).kind).toBe("long");
  });
});

describe("dois irmãos no mesmo dispositivo",()=>{
  const st=(xp,account)=>JSON.stringify({xp,...(account?{cloudSync:{accountId:account}}:{})});
  it("a Ana sai: o dispositivo fica limpo e o Bruno não vê nada dela",()=>{
    localStorage.setItem("a25",st(300,"ana"));
    localStorage.setItem("a25-active-session-v1",'{"kind":"mission"}');
    purgeAccountFromDevice("ana");
    expect(hasAcademicData()).toBe(false);
    expect(JSON.stringify([...Array(localStorage.length)].map((_,i)=>localStorage.getItem(localStorage.key(i))))).not.toContain("300");
  });
  it("sem rede: a Ana sai guardando no dispositivo; o Bruno entra e não vê o progresso dela; a Ana volta e recupera-o",()=>{
    localStorage.setItem("a25",st(300,"ana"));
    expect(archiveActiveAccount("ana").ok).toBe(true);
    expect(hasAcademicData()).toBe(false);
    expect(switchDeviceToAccount("bruno")).toEqual({ok:true,reload:false});
    expect(localStorage.getItem("a25")).toBeNull();
    localStorage.setItem("a25",st(10,"bruno"));
    expect(switchDeviceToAccount("ana")).toEqual({ok:true,reload:true});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(300);
  });
});

describe("sem progresso escondido no dispositivo (decisão do product owner, 2026-11-22)",()=>{
  const st=(xp,account)=>JSON.stringify({xp,...(account?{cloudSync:{accountId:account}}:{})});
  it("«Começar de novo»: o estudo feito sem conta é apagado e o dispositivo fica limpo",()=>{
    localStorage.setItem("a25",st(40,null));
    localStorage.setItem("a25-active-session-v1",'{"kind":"diagnostic"}');
    expect(discardUnsavedDeviceProgress().ok).toBe(true);
    expect(hasAcademicData()).toBe(false);
    expect(localStorage.getItem(archiveKey(ANONYMOUS_ARCHIVE_ID))).toBeNull();
  });
  it("«Começar de novo» nunca apaga progresso de uma conta: vai para o arquivo dessa conta",()=>{
    localStorage.setItem("a25",st(300,"ana"));
    expect(discardUnsavedDeviceProgress().ok).toBe(true);
    expect(hasAcademicData()).toBe(false);
    expect(switchDeviceToAccount("ana")).toEqual({ok:true,reload:true});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(300);
  });
  it("arquivos anónimos antigos («Não é meu») são removidos e nunca voltam ao sair",()=>{
    localStorage.setItem(archiveKey(ANONYMOUS_ARCHIVE_ID),'{"format":"approva-account-archive-v1","accountId":"anonimo-neste-dispositivo","entries":{"localStorage":{"a25":"{}"}}}');
    localStorage.setItem("a25",st(300,"ana"));
    purgeAccountFromDevice("ana");
    discardAnonymousArchive();
    expect(hasAcademicData()).toBe(false);
    expect(localStorage.getItem(archiveKey(ANONYMOUS_ARCHIVE_ID))).toBeNull();
  });
});
