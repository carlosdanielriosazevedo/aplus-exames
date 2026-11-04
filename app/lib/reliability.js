
// Registo local de conclusões (recibos de sessão).
//
// D1 — Um registo ilegível nunca é tratado como vazio: os bytes ficam intactos
//      e qualquer conclusão fica bloqueada até reparação explícita.
// D3 — A conclusão é feita em duas fases verificáveis:
//        1. reserveSessionCompletion → recibo "pending" (com dono e prazo);
//        2. a avaliação é persistida no estado académico;
//        3. commitSessionCompletion → recibo "committed";
//        4. só depois o rascunho da sessão pode ser apagado.
//      Uma interrupção em qualquer ponto deixa o rascunho e o recibo pendente.
//      A prova de que a avaliação já foi gravada é o próprio estado académico
//      (isRecorded), por isso retomar nunca duplica XP nem conclusões.
const COMPLETED_KEY="a25-completed-sessions-v1";
export const COMPLETION_REGISTRY_KEY=COMPLETED_KEY;
export const COMPLETION_QUARANTINE_PREFIX="a25-completed-sessions-v1-quarantine-";
// Um recibo pendente de outro separador é respeitado durante este prazo.
export const COMPLETION_PENDING_LEASE_MS=15_000;

let lastCompletionBlock=null;
let tabOwner=null;

const OWNER_KEY="a25-completion-owner-v1";
// Identificador do separador. Fica em sessionStorage para sobreviver a um
// recarregamento do mesmo separador (retoma imediata após interrupção) e ser
// diferente noutro separador.
function owner(){
  if(tabOwner)return tabOwner;
  try{
    const saved=globalThis.sessionStorage?.getItem(OWNER_KEY);
    if(saved&&/^tab-[a-z0-9-]{6,64}$/.test(saved))return tabOwner=saved;
  }catch{}
  tabOwner=`tab-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
  try{globalThis.sessionStorage?.setItem(OWNER_KEY,tabOwner)}catch{}
  return tabOwner;
}

// Ponto único de acesso ao armazenamento do registo (adaptável ao isolamento
// por conta da F5 sem alterar o protocolo).
function registryStore(){
  try{return globalThis.localStorage||null}catch{return null}
}

const validRow=row=>!!row&&typeof row==="object"&&!Array.isArray(row)
  &&typeof row.id==="string"&&row.id.length>0
  &&(row.at===undefined||(typeof row.at==="number"&&Number.isFinite(row.at)))
  &&(row.status===undefined||row.status==="pending"||row.status==="committed")
  &&(row.owner===undefined||typeof row.owner==="string");

function readRegistry(){
  const store=registryStore();
  if(!store)return {ok:false,reason:"registry_unavailable",raw:null};
  let raw;
  try{raw=store.getItem(COMPLETED_KEY)}catch{return {ok:false,reason:"registry_unavailable",raw:null}}
  if(raw===null||raw===undefined)return {ok:true,rows:[],raw:null};
  let rows;
  try{rows=JSON.parse(raw)}catch{return {ok:false,reason:"registry_corrupt",raw}}
  if(!Array.isArray(rows)||!rows.every(validRow))return {ok:false,reason:"registry_corrupt",raw};
  return {ok:true,rows,raw};
}

// Escrita condicional: só escreve se ninguém alterou o registo desde a leitura
// e confirma por releitura que os bytes gravados são os esperados.
function writeRegistry(rows,expectedRaw){
  const store=registryStore();
  if(!store)return "registry_unavailable";
  try{
    const current=store.getItem(COMPLETED_KEY);
    if((current??null)!==(expectedRaw??null))return "registry_conflict";
    const payload=JSON.stringify(rows);
    store.setItem(COMPLETED_KEY,payload);
    if(store.getItem(COMPLETED_KEY)!==payload)return "registry_write_failed";
    return "ok";
  }catch{return "registry_write_failed"}
}

function block(sessionId,reason){
  lastCompletionBlock={sessionId:sessionId||null,reason,at:Date.now()};
  return {status:"blocked",reason};
}

export function lastCompletionBlockReason(){return lastCompletionBlock}
export function clearCompletionBlock(){lastCompletionBlock=null}

export function completionRegistryStatus(){
  const read=readRegistry();
  return read.ok?{ok:true,count:read.rows.length}:{ok:false,reason:read.reason};
}

/**
 * Reserva a conclusão de uma sessão.
 * @returns {{status:"reserved"|"already_completed"|"blocked",reason?:string}}
 * "already_completed" só é devolvido quando a conclusão está comprovada
 * (recibo confirmado ou avaliação já presente no estado académico).
 */
export function reserveSessionCompletion(sessionId,options={}){
  const {now=Date.now()}=options;
  const proofProvided=typeof options.isRecorded==="function";
  const isRecorded=proofProvided?options.isRecorded:()=>false;
  // Sem ID não tentamos inventar idempotência: mantemos compatibilidade com sessões antigas.
  if(!sessionId)return {status:"reserved",reason:"no_session_id"};
  const read=readRegistry();
  if(!read.ok)return block(sessionId,read.reason);
  const rows=read.rows.slice();
  const index=rows.findIndex(row=>row.id===sessionId);
  const row=index>=0?rows[index]:null;
  let recorded=false;
  try{recorded=isRecorded()===true}catch{recorded=false}
  if(recorded){
    // A avaliação já está no estado: confirmar o recibo (melhor esforço) e nunca reaplicar.
    if(row?.status!=="committed"){
      const committed={id:sessionId,at:row?.at??now,status:"committed"};
      if(index>=0)rows[index]=committed;else rows.push(committed);
      writeRegistry(rows,read.raw);
    }
    return {status:"already_completed",reason:"recorded_in_state"};
  }
  if(row?.status==="committed")return {status:"already_completed",reason:"committed_receipt"};
  // Recibo no formato antigo: só pode ser retomado quando quem chama consegue
  // provar, pelo estado académico, que a avaliação nunca foi gravada.
  if(row&&row.status===undefined&&!proofProvided)return {status:"already_completed",reason:"legacy_receipt"};
  if(row?.status==="pending"&&row.owner!==owner()&&now-(row.at||0)<COMPLETION_PENDING_LEASE_MS){
    return block(sessionId,"completion_in_progress");
  }
  // Sem recibo, recibo pendente expirado/do próprio separador, ou recibo antigo
  // (formato anterior) sem avaliação gravada: a conclusão nunca chegou ao estado
  // e pode ser retomada com segurança.
  const pending={id:sessionId,at:now,status:"pending",owner:owner()};
  if(index>=0)rows[index]=pending;else rows.push(pending);
  const result=writeRegistry(rows,read.raw);
  if(result!=="ok")return block(sessionId,result);
  const reason=row?(row.status==="pending"?(row.owner===owner()?"own_pending":"stale_pending"):"legacy_unrecorded_receipt"):"new";
  return {status:"reserved",reason};
}

export function commitSessionCompletion(sessionId,{now=Date.now()}={}){
  if(!sessionId)return true;
  const read=readRegistry();
  if(!read.ok)return false;
  const rows=read.rows.slice();
  const index=rows.findIndex(row=>row.id===sessionId);
  const committed={id:sessionId,at:index>=0?(rows[index].at??now):now,status:"committed"};
  if(index>=0)rows[index]=committed;else rows.push(committed);
  return writeRegistry(rows,read.raw)==="ok";
}

// Desfaz apenas uma reserva pendente deste separador (ex.: a avaliação não
// pôde ser gravada). Nunca remove recibos confirmados nem de outros separadores.
export function abandonSessionReservation(sessionId){
  if(!sessionId)return true;
  const read=readRegistry();
  if(!read.ok)return false;
  const row=read.rows.find(x=>x.id===sessionId);
  if(!row||row.status!=="pending"||row.owner!==owner())return false;
  return writeRegistry(read.rows.filter(x=>x!==row),read.raw)==="ok";
}

// Compatibilidade (uma fase): só aceita se reservar e confirmar com sucesso.
export function claimSessionCompletion(sessionId){
  if(!sessionId)return true;
  const reservation=reserveSessionCompletion(sessionId);
  if(reservation.status!=="reserved")return false;
  return commitSessionCompletion(sessionId);
}

export function releaseSessionCompletion(sessionId){
  if(!sessionId)return;
  const read=readRegistry();
  if(!read.ok)return;
  writeRegistry(read.rows.filter(x=>x.id!==sessionId),read.raw);
}

export function wasSessionCompleted(sessionId){
  if(!sessionId)return false;
  const read=readRegistry();
  if(!read.ok)return false;
  return read.rows.some(x=>x.id===sessionId&&x.status!=="pending");
}

// Copia os bytes exatos do registo ilegível para uma chave de quarentena e
// confirma a cópia. O original não é alterado.
export function quarantineCompletionRegistry({now=Date.now()}={}){
  const store=registryStore();
  if(!store)return {ok:false,reason:"registry_unavailable"};
  let raw;
  try{raw=store.getItem(COMPLETED_KEY)}catch{return {ok:false,reason:"registry_unavailable"}}
  if(raw===null||raw===undefined)return {ok:true,key:null};
  const key=`${COMPLETION_QUARANTINE_PREFIX}${now}`;
  try{
    if(store.getItem(key)!==null)return {ok:false,reason:"quarantine_exists"};
    store.setItem(key,raw);
    if(store.getItem(key)!==raw)return {ok:false,reason:"quarantine_write_failed"};
  }catch{return {ok:false,reason:"quarantine_write_failed"}}
  return {ok:true,key};
}

// IDs de conclusão comprovados pelo estado académico.
export function recordedCompletionIds(state){
  const ids=new Set();
  const add=value=>{if(typeof value==="string"&&value)ids.add(value)};
  for(const row of state?.missionHistory||[])add(row?.completionId);
  for(const row of state?.examHistory||[])add(row?.completionId);
  add(state?.lastExam?.completionId);
  for(const progress of Object.values(state?.subjectProgress||{})){
    for(const id of progress?.completedSessionIds||[])add(id);
    for(const row of progress?.sessions||[])add(row?.sessionId);
  }
  for(const day of Object.values(state?.engagement?.days||{}))for(const id of day?.activityIds||[])add(id);
  for(const week of Object.values(state?.competition?.weeks||{}))for(const id of week?.activityIds||[])add(id);
  return ids;
}

export function stateRecordsCompletion(state,sessionId){
  return !!sessionId&&recordedCompletionIds(state).has(sessionId);
}

// Reparação explícita de um registo ilegível: 1) guarda cópia exata em
// quarentena; 2) reconstrói o registo só com conclusões comprovadas pelo estado.
export function repairCompletionRegistry(state,{now=Date.now()}={}){
  const read=readRegistry();
  if(read.ok)return {ok:true,repaired:false};
  if(read.reason!=="registry_corrupt")return {ok:false,reason:read.reason};
  const quarantine=quarantineCompletionRegistry({now});
  if(!quarantine.ok)return {ok:false,reason:quarantine.reason};
  const rows=[...recordedCompletionIds(state)].map(id=>({id,at:now,status:"committed"}));
  const result=writeRegistry(rows,read.raw);
  if(result!=="ok")return {ok:false,reason:result,quarantineKey:quarantine.key};
  clearCompletionBlock();
  return {ok:true,repaired:true,quarantineKey:quarantine.key,rebuilt:rows.length};
}

// Reinício total pedido pelo aluno. Um registo ilegível é primeiro copiado
// para quarentena; se a cópia falhar, nada é apagado.
export function clearCompletionRegistry(){
  const read=readRegistry();
  if(!read.ok&&read.reason==="registry_corrupt"){
    const quarantine=quarantineCompletionRegistry();
    if(!quarantine.ok)return false;
  }
  try{registryStore()?.removeItem(COMPLETED_KEY);return true}catch{return false}
}

export function latestOpenSessionId(state,kind){
  const rows=[...(state?.betaSessions||[])];
  for(let i=rows.length-1;i>=0;i--){
    if(rows[i]?.kind===kind && !rows[i]?.finishedAt)return rows[i].id||null;
  }
  return null;
}

function duplicateValues(rows,getKey){
  const seen=new Set(),dups=new Set();
  rows.forEach(x=>{
    const k=getKey(x);
    if(!k)return;
    if(seen.has(k))dups.add(k);
    seen.add(k);
  });
  return [...dups];
}

export function dataIntegrityAudit(state){
  const sessions=state?.betaSessions||[];
  const events=state?.betaEvents||[];
  const missions=state?.missionHistory||[];
  const exams=state?.examHistory||[];

  const duplicateSessionIds=duplicateValues(sessions,x=>x.id);
  const duplicateEventIds=duplicateValues(events,x=>x.id);
  const duplicateMissionCompletionIds=duplicateValues(missions,x=>x.completionId);
  const duplicateExamCompletionIds=duplicateValues(exams,x=>x.completionId);

  const openByKind=sessions.filter(x=>!x.finishedAt).reduce((a,x)=>{
    a[x.kind]=(a[x.kind]||0)+1;return a;
  },{});
  const multipleOpen=Object.entries(openByKind).filter(([,n])=>n>1);

  const finishEvents=events.filter(e=>e.type?.endsWith("_finished"));
  const startEvents=events.filter(e=>e.type?.endsWith("_started"));
  const impossibleCompletionRate=finishEvents.length>startEvents.length;

  const issues=[];
  if(duplicateSessionIds.length)issues.push({code:"duplicate_sessions",severity:"high",title:"IDs de sessão duplicados",detail:`${duplicateSessionIds.length} IDs repetidos.`});
  if(duplicateEventIds.length)issues.push({code:"duplicate_events",severity:"high",title:"Eventos duplicados",detail:`${duplicateEventIds.length} IDs repetidos.`});
  if(duplicateMissionCompletionIds.length)issues.push({code:"duplicate_mission_completion",severity:"high",title:"Missões contabilizadas mais do que uma vez",detail:`${duplicateMissionCompletionIds.length} conclusões repetidas.`});
  if(duplicateExamCompletionIds.length)issues.push({code:"duplicate_exam_completion",severity:"high",title:"Mini-exames contabilizados mais do que uma vez",detail:`${duplicateExamCompletionIds.length} conclusões repetidas.`});
  if(multipleOpen.length)issues.push({code:"multiple_open",severity:"medium",title:"Sessões abertas em paralelo",detail:multipleOpen.map(([k,n])=>`${k}: ${n}`).join(" · ")});
  if(impossibleCompletionRate)issues.push({code:"finish_without_start",severity:"medium",title:"Mais conclusões do que inícios",detail:"A telemetria tem mais eventos de fim do que de início."});

  return {
    status:issues.some(x=>x.severity==="high")?"attention":issues.length?"watch":"healthy",
    duplicateSessionIds:duplicateSessionIds.length,
    duplicateEventIds:duplicateEventIds.length,
    duplicateCompletions:duplicateMissionCompletionIds.length+duplicateExamCompletionIds.length,
    openSessions:sessions.filter(x=>!x.finishedAt).length,
    issues
  };
}
