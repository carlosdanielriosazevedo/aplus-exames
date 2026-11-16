// Motor de decisão da sincronização automática do progresso (sem React, sem rede).
//
// Contrato:
// - o progresso local fica ligado a UMA conta (cloudSync.accountId). Outra conta
//   no mesmo dispositivo nunca recebe nem envia esse progresso;
// - progresso anónimo só é associado a uma conta com confirmação explícita;
// - o progresso online só substitui o local quando o local não tem alterações por
//   guardar e não há avaliação em curso;
// - quando os dois lados mudaram, o estudo é JUNTADO automaticamente (união por
//   identificadores estáveis, nada é descartado). Só se pede uma decisão quando o
//   perfil escolar (ano/matéria dada) é diferente, porque isso muda o que é medido;
// - a escrita usa sempre a revisão conhecida (CAS no servidor);
// - progresso anónimo que o aluno confirmou ser seu é JUNTADO ao que a conta já
//   tinha online (união por identificadores estáveis), em vez de abrir um segundo
//   pedido de decisão logo a seguir ao "Sim, é meu".
import {cloudSyncMeta,stateFingerprint} from "./cloudReliability.js";
import {academicScopeKey} from "./curriculumScope.js";

export {CLOUD_ACCOUNT_HINT_KEY,AUTH_CHANGED_EVENT,rememberCloudSession,cloudSessionHinted} from "./cloudSessionHint.js";

export function hasMeaningfulProgress(state){
  if(!state)return false;
  if((Number(state.xp)||0)>0||state.diagnosticDone)return true;
  if((state.missionHistory||[]).length||(state.examHistory||[]).length)return true;
  return Object.values(state.subjectProgress||{}).some(row=>
    (row?.sessions||[]).length>0||(row?.completedSessionIds||[]).length>0||row?.diagnosticDone||row?.lastPosition);
}

export function payloadFingerprint(payload){
  return stateFingerprint(payload);
}

export function syncMeta(state){
  const raw=state?.cloudSync||{};
  return {
    ...cloudSyncMeta(state),
    accountId:typeof raw.accountId==="string"&&raw.accountId?raw.accountId:null,
    payloadFingerprint:typeof raw.payloadFingerprint==="string"?raw.payloadFingerprint:null,
    adoptionPending:raw.adoptionPending===true
  };
}

export function isDirty(state,payload){
  return payloadFingerprint(payload)!==syncMeta(state).payloadFingerprint;
}

// Decide a próxima ação. `remote` é undefined quando não foi consultado neste
// ciclo, null quando a conta ainda não tem progresso online.
export function decideSync({state,payload,accountId,remote,pendingAssessment=false,adoptionConfirmed=false}){
  if(!accountId)return {action:"signed_out"};
  const meta=syncMeta(state);
  if(meta.accountId&&meta.accountId!==accountId)return {action:"blocked_other_account"};
  const bound=meta.accountId===accountId;
  if(!bound&&hasMeaningfulProgress(state)&&!adoptionConfirmed)return {action:"needs_adoption"};
  const dirty=isDirty(state,payload);

  if(remote===undefined){
    if(!bound)return {action:"fetch_remote"};
    return dirty?{action:"push",operation:meta.baseRevision>0?"update":"insert",expectedRevision:meta.baseRevision}:{action:"idle"};
  }
  if(remote===null){
    // Conta sem progresso online: a primeira gravação cria a linha (revisão 0).
    return {action:"push",operation:"insert",expectedRevision:0,bind:true};
  }
  const remoteRevision=Number(remote.revision)||0;
  if(bound&&remoteRevision===meta.baseRevision){
    return dirty?{action:"push",operation:"update",expectedRevision:remoteRevision}:{action:"idle"};
  }
  // O online avançou (ou este dispositivo nunca sincronizou esta conta).
  const fresh=!bound&&!hasMeaningfulProgress(state);
  if(pendingAssessment)return {action:"wait_assessment"};
  if(fresh||(bound&&!dirty))return {action:"apply_remote",bind:!bound};
  if(!bound)return {action:"conflict"}; // sem confirmação de adoção nunca se junta
  if(profilesDiffer(state,remote.state_json))return {action:"conflict",reason:"profile"};
  return {action:"merge_remote",expectedRevision:remoteRevision};
}

export function profilesDiffer(local,remote){
  if(!remote?.profile||!local?.profile)return false;
  return academicScopeKey(local.profile)!==academicScopeKey(remote.profile);
}

export function markAutosynced(state,{accountId,revision,payload,deviceId=null,at=Date.now()}){
  const current=syncMeta(state);
  return {
    ...state,
    cloudSync:{
      ...(state?.cloudSync||{}),
      deviceId:deviceId||current.deviceId,
      accountId,
      baseRevision:revision,
      lastRemoteRevision:revision,
      payloadFingerprint:payloadFingerprint(payload),
      lastSyncedAt:at,
      lastConflict:null,
      adoptionPending:false
    }
  };
}

// `adopted`: o aluno confirmou que o progresso anónimo deste dispositivo é seu.
export function bindCloudAccount(state,accountId,{adopted=false}={}){
  return {...state,cloudSync:{...(state?.cloudSync||{}),accountId,...(adopted?{adoptionPending:true}:{})}};
}

export function retryDelayMs(attempt){
  return [5_000,15_000,30_000,60_000][Math.min(Math.max(attempt,0),3)];
}

// Registo do sincronizador ativo, para que "Terminar sessão" possa pedir uma
// última gravação antes de sair, sem acoplar componentes.
let activeFlush=null;
export function registerCloudFlush(fn){activeFlush=fn;return ()=>{if(activeFlush===fn)activeFlush=null}}
export async function flushCloudNow(){
  if(!activeFlush)return {status:"inactive"};
  try{return await activeFlush();}catch{return {status:"error"}}
}
