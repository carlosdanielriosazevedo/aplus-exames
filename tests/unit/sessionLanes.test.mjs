import {afterEach,beforeEach,describe,expect,it} from "vitest";
import {saveLaneDraft,loadLaneDraft,loadLaneDraftStatus,loadAllSessionDrafts,clearLaneDraft,clearAllLaneDrafts,EXAM_SESSION_KEY} from "../../app/lib/sessionLanes.js";

// Decisão do product owner (2026-11-22): qualquer sessão pode ficar a meio, mas
// nunca se misturam. Estudo (diagnóstico, Missão, treino) e provas (Mini-exame)
// têm espaços independentes; dentro de cada espaço, uma tentativa nunca substitui outra.
const STUDY="a25-active-session-v1";
function memoryStore({failGet=()=>false}={}){
  const m=new Map();
  return {map:m,get length(){return m.size},key:i=>[...m.keys()][i]??null,getItem:k=>{if(failGet(k))throw new Error("blocked");return m.has(k)?m.get(k):null},setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)};
}
let saved,local;
beforeEach(()=>{saved={l:globalThis.localStorage,s:globalThis.sessionStorage};local=memoryStore();globalThis.localStorage=local;globalThis.sessionStorage=memoryStore()});
afterEach(()=>{globalThis.localStorage=saved.l;globalThis.sessionStorage=saved.s});

const mission={kind:"mission",betaMode:"internal",sessionId:"m1",current:{id:"Q-MISSION"}};
const exam={kind:"mini_exam",betaMode:"internal",screen:"miniExamRun",session:{sessionId:"e1",questions:[{id:"Q-EXAM"}],current:0,answers:[null]}};

describe("sessões a meio em dois espaços",()=>{
  it("uma Missão e um Mini-exame a meio convivem e não se misturam",()=>{
    expect(saveLaneDraft(mission)).toBe(true);
    expect(saveLaneDraft(exam)).toBe(true);
    expect(loadLaneDraft("internal","study").sessionId).toBe("m1");
    expect(loadLaneDraft("internal","exam").session.sessionId).toBe("e1");
    expect(loadAllSessionDrafts("internal").drafts.map(d=>d.kind).sort()).toEqual(["mini_exam","mission"]);
    // Gravar progresso de uma não toca na outra.
    expect(saveLaneDraft({...mission,sel:2})).toBe(true);
    expect(loadLaneDraft("internal","exam").session.answers).toEqual([null]);
  });
  it("dentro do mesmo espaço, uma tentativa nunca substitui outra",()=>{
    saveLaneDraft(mission);saveLaneDraft(exam);
    expect(saveLaneDraft({kind:"training",betaMode:"internal",sessionId:"t1"})).toBe(false);
    expect(saveLaneDraft({...exam,session:{...exam.session,sessionId:"e2"}})).toBe(false);
    expect(loadLaneDraft("internal","study").sessionId).toBe("m1");
    expect(loadLaneDraft("internal","exam").session.sessionId).toBe("e1");
  });
  it("terminar uma limpa só o seu espaço",()=>{
    saveLaneDraft(mission);saveLaneDraft(exam);
    expect(clearLaneDraft("internal","exam")).toBe(true);
    expect(loadLaneDraft("internal","exam")).toBeNull();
    expect(loadLaneDraft("internal","study").sessionId).toBe("m1");
    saveLaneDraft(exam);
    expect(clearLaneDraft("internal","study")).toBe(true);
    expect(loadLaneDraft("internal","exam").session.sessionId).toBe("e1");
    expect(clearAllLaneDrafts("internal")).toBe(true);
    expect(loadAllSessionDrafts("internal").drafts).toEqual([]);
  });
  it("Mini-exame guardado antes da mudança passa para o espaço das provas, sem se perder",()=>{
    local.setItem(STUDY,JSON.stringify({...exam,savedAt:1}));
    expect(loadLaneDraft("internal","study")).toBeNull();
    expect(loadLaneDraft("internal","exam").session.sessionId).toBe("e1");
    expect(local.getItem(STUDY)).toBeNull();
    expect(JSON.parse(local.getItem(EXAM_SESSION_KEY)).session.sessionId).toBe("e1");
    // E a seguir já pode haver uma Missão.
    expect(saveLaneDraft(mission)).toBe(true);
  });
  it("se a mudança não for possível, o Mini-exame antigo fica onde está e nunca é apagado por engano",()=>{
    local.setItem(STUDY,JSON.stringify({...exam,savedAt:1}));
    local.setItem(EXAM_SESSION_KEY,JSON.stringify({...exam,session:{...exam.session,sessionId:"outro"}}));
    expect(loadLaneDraft("internal","study")).toBeNull();
    expect(clearLaneDraft("internal","study")).toBe(true);
    expect(JSON.parse(local.getItem(STUDY)).session.sessionId).toBe("e1");
    expect(saveLaneDraft(mission)).toBe(false);
  });
  it("dados ilegíveis bloqueiam a recuperação e nunca autorizam apagar",()=>{
    local.setItem(EXAM_SESSION_KEY,"{partido");
    expect(loadLaneDraftStatus("internal","exam").error).toBe(true);
    expect(loadAllSessionDrafts("internal").error).toBe(true);
    expect(saveLaneDraft(exam)).toBe(false);
    expect(local.getItem(EXAM_SESSION_KEY)).toBe("{partido");
  });
});
