import {describe,expect,it} from "vitest";
import {decideSync,markAutosynced,bindCloudAccount,hasMeaningfulProgress,isDirty,retryDelayMs,syncMeta,profilesDiffer} from "../../app/lib/cloudAutosync.js";
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
  it("online avançou e o local tem alterações (mesmo perfil): junta, nada é substituído",()=>{
    const changed={...synced(studied),xp:55};
    expect(decide(changed,{remote:{revision:7}})).toEqual({action:"merge_remote",expectedRevision:7});
    const y11={schoolYear:"11.º"};
    expect(decide({...changed,profile:y11},{remote:{revision:7,state_json:{profile:{...y11}}}}).action).toBe("merge_remote");
  });
  it("perfis escolares diferentes: conflito explícito, o aluno escolhe",()=>{
    const changed={...synced(studied),xp:55,profile:{schoolYear:"11.º"}};
    expect(decide(changed,{remote:{revision:7,state_json:{profile:{schoolYear:"10.º"}}}})).toEqual({action:"conflict",reason:"profile"});
    expect(profilesDiffer({profile:{schoolYear:"11.º",taughtSubtopicIds:[]}},{profile:{schoolYear:"11.º"}})).toBe(false);
  });
  it("progresso anónimo nunca é juntado sem confirmação",()=>{
    expect(decide(studied,{remote:{revision:2}}).action).toBe("needs_adoption");
  });
  it("progresso anónimo confirmado como do aluno é juntado ao da conta, sem segundo pedido",()=>{
    const adopted=bindCloudAccount(studied,"A",{adopted:true});
    expect(syncMeta(adopted).adoptionPending).toBe(true);
    expect(decide(adopted,{remote:{revision:4}})).toEqual({action:"merge_remote",expectedRevision:4});
    expect(decide(adopted,{remote:{revision:4},pendingAssessment:true}).action).toBe("wait_assessment");
    // Conta ainda sem progresso online: grava diretamente.
    expect(decide(adopted,{remote:null}).action).toBe("push");
  });
  it("depois de juntar, a adoção fica concluída e volta ao fluxo normal",()=>{
    const adopted=bindCloudAccount(studied,"A",{adopted:true});
    const done=markAutosynced(adopted,{accountId:"A",revision:5,payload:payloadOf(adopted)});
    expect(syncMeta(done).adoptionPending).toBe(false);
    // Outro dispositivo avança mais tarde: aplica se o local estiver limpo.
    expect(decide(done,{remote:{revision:6}}).action).toBe("apply_remote");
  });
  it("resolver um conflito manualmente também conclui a adoção",()=>{
    const adopted=bindCloudAccount(studied,"A",{adopted:true});
    expect(syncMeta(markCloudSaved(adopted,{revision:7,deviceId:"d"})).adoptionPending).toBe(false);
    expect(syncMeta(markCloudLoaded(adopted,{revision:7})).adoptionPending).toBe(false);
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
