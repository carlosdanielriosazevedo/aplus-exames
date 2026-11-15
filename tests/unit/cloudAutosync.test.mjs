import {describe,expect,it} from "vitest";
import {decideSync,markAutosynced,bindCloudAccount,hasMeaningfulProgress,isDirty,retryDelayMs,syncMeta} from "../../app/lib/cloudAutosync.js";
import {markCloudSaved,markCloudLoaded} from "../../app/lib/cloudReliability.js";

const payloadOf=state=>({schema:"aplus-student-state-v8",xp:state.xp||0,subjectProgress:state.subjectProgress||{}});
const empty={xp:0,subjectProgress:{}};
const studied={xp:40,subjectProgress:{"math-a":{sessions:[{id:"s1"}]}}};
const synced=(state,account="A",revision=3)=>markAutosynced(state,{accountId:account,revision,payload:payloadOf(state)});
const decide=(state,extra={})=>decideSync({state,payload:payloadOf(state),accountId:"A",...extra});

describe("sincronização automática: isolamento entre contas",()=>{
  it("sem sessão não faz nada",()=>{
    expect(decideSync({state:studied,payload:payloadOf(studied),accountId:null}).action).toBe("signed_out");
  });
  it("progresso ligado a outra conta bloqueia leitura e escrita",()=>{
    const ownedByB=synced(studied,"B");
    expect(decide(ownedByB).action).toBe("blocked_other_account");
    expect(decide(ownedByB,{remote:{revision:9,state_json:{}}}).action).toBe("blocked_other_account");
    expect(decide(ownedByB,{remote:null}).action).toBe("blocked_other_account");
  });
  it("progresso anónimo exige confirmação antes de ir para a conta",()=>{
    expect(decide(studied).action).toBe("needs_adoption");
    expect(decide(studied,{remote:null}).action).toBe("needs_adoption");
    expect(decide(studied,{remote:null,adoptionConfirmed:true}).action).toBe("push");
  });
  it("dispositivo novo sem progresso recebe o progresso da conta",()=>{
    expect(decide(empty).action).toBe("fetch_remote");
    expect(decide(empty,{remote:{revision:5,state_json:{}}})).toEqual({action:"apply_remote",bind:true});
    expect(decide(empty,{remote:null}).action).toBe("push");
  });
  it("a ligação à conta sobrevive às ações manuais de guardar/carregar",()=>{
    const bound=synced(studied,"A",3);
    expect(syncMeta(markCloudSaved(bound,{revision:4,deviceId:"d"})).accountId).toBe("A");
    expect(syncMeta(markCloudLoaded(bound,{revision:5})).accountId).toBe("A");
  });
});

describe("sincronização automática: nunca substitui trabalho por guardar",()=>{
  it("sem alterações e na mesma revisão: não grava",()=>{
    expect(decide(synced(studied)).action).toBe("idle");
    expect(decide(synced(studied),{remote:{revision:3}}).action).toBe("idle");
  });
  it("alteração local grava com a revisão conhecida (CAS)",()=>{
    const changed={...synced(studied),xp:55};
    expect(isDirty(changed,payloadOf(changed))).toBe(true);
    expect(decide(changed)).toEqual({action:"push",operation:"update",expectedRevision:3});
  });
  it("online avançou e o local está limpo: aplica o online",()=>{
    expect(decide(synced(studied),{remote:{revision:7}})).toEqual({action:"apply_remote",bind:false});
  });
  it("online avançou e o local tem alterações: conflito explícito, nada é substituído",()=>{
    const changed={...synced(studied),xp:55};
    expect(decide(changed,{remote:{revision:7}}).action).toBe("conflict");
  });
  it("conta com progresso online + progresso anónimo adotado: conflito, não substituição",()=>{
    const adopted=bindCloudAccount(studied,"A");
    expect(decide(adopted,{remote:{revision:2}}).action).toBe("conflict");
  });
  it("avaliação em curso: o online espera, não é aplicado",()=>{
    expect(decide(synced(studied),{remote:{revision:7},pendingAssessment:true}).action).toBe("wait_assessment");
  });
});

describe("sincronização automática: utilitários",()=>{
  it("deteta progresso significativo",()=>{
    expect(hasMeaningfulProgress(empty)).toBe(false);
    expect(hasMeaningfulProgress(studied)).toBe(true);
    expect(hasMeaningfulProgress({diagnosticDone:true})).toBe(true);
  });
  it("backoff crescente e limitado",()=>{
    expect([0,1,2,3,9].map(retryDelayMs)).toEqual([5000,15000,30000,60000,60000]);
  });
});
