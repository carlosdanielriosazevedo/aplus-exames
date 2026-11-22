import {afterEach,beforeEach,describe,expect,it} from "vitest";
import {detectUnsavedWork,logoutPlan,logoutPromptCopy,PORTUGUESE_PROTOTYPE_DRAFT_KEY} from "../../app/lib/logoutPlan.js";
import {archiveActiveAccount,purgeAccountFromDevice,setAsideAnonymousProgress,restoreAnonymousProgress,switchDeviceToAccount,hasAcademicData,activeStateAccount,setAsideDeviceProgressForNewStudent} from "../../app/lib/accountDeviceStorage.js";

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
  it("o Bruno estudou sem conta; a Ana entra e diz «Não é meu» → nada do Bruno entra na conta dela, e volta quando ela sai",()=>{
    localStorage.setItem("a25",st(40,null));
    expect(setAsideAnonymousProgress()).toEqual({ok:true,archived:1});
    expect(hasAcademicData()).toBe(false); // a Ana começa limpa: a app carrega o progresso da conta dela
    localStorage.setItem("a25",st(300,"ana")); // progresso da Ana vindo da conta
    purgeAccountFromDevice("ana");
    expect(restoreAnonymousProgress()).toEqual({ok:true,restored:1});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(40);
    expect(activeStateAccount()).toBeNull();
  });
  it("«Não é meu» nunca põe à parte progresso que já pertence a uma conta",()=>{
    localStorage.setItem("a25",st(300,"ana"));
    expect(setAsideAnonymousProgress()).toEqual({ok:false,code:"NOT_ANONYMOUS"});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(300);
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

describe("aluno novo num dispositivo com progresso de outra pessoa (2026-11-22)",()=>{
  const st=(xp,account)=>JSON.stringify({xp,...(account?{cloudSync:{accountId:account}}:{})});
  it("progresso anónimo: fica à parte (não é apagado) e volta quando o aluno novo sair",()=>{
    localStorage.setItem("a25",st(40,null));
    expect(setAsideDeviceProgressForNewStudent()).toEqual({ok:true,archived:1});
    expect(hasAcademicData()).toBe(false);
    localStorage.setItem("a25",st(5,"novo"));
    purgeAccountFromDevice("novo");
    expect(restoreAnonymousProgress()).toEqual({ok:true,restored:1});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(40);
  });
  it("progresso de uma conta que ficou no dispositivo: vai para o arquivo dessa conta e volta quando ela entrar",()=>{
    localStorage.setItem("a25",st(300,"ana"));
    expect(setAsideDeviceProgressForNewStudent().ok).toBe(true);
    expect(hasAcademicData()).toBe(false);
    expect(switchDeviceToAccount("ana")).toEqual({ok:true,reload:true});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(300);
  });
  it("nunca substitui um arquivo que já exista",()=>{
    localStorage.setItem("a25",st(40,null));
    expect(setAsideDeviceProgressForNewStudent().ok).toBe(true);
    localStorage.setItem("a25",st(7,null));
    expect(setAsideDeviceProgressForNewStudent()).toEqual({ok:false,code:"ARCHIVE_EXISTS"});
    expect(JSON.parse(localStorage.getItem("a25")).xp).toBe(7);
  });
});
