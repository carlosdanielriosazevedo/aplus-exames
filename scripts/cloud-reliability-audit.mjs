import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {
  stateFingerprint,migrateCloudSync,markCloudLoaded,markCloudSaved,
  cloudConflict,conflictReason,createLocalSnapshot,mergeByStableId,safeCloudMerge
} from "../app/lib/cloudReliability.js";

const evidence=(itemId,at,source="mission")=>({itemId,at,source,signature:`sig-${itemId}`,cognitive:"procedure"});
const base={goal:17,profile:{schoolYear:"12.º"},xp:120,scores:{t1:{domain:50,conf:30,evidence:[evidence("q1",1000)]}},missionHistory:[{completionId:"m1",at:1000,themeId:"t1"}],examHistory:[],freeTrainingSignals:[],learningHypotheses:[],cloudSync:{version:1,deviceId:"device-A",baseRevision:2,baseFingerprint:null,lastRemoteRevision:2,lastRemoteDeviceId:"device-A",lastSyncedAt:1000,lastConflict:null,pendingCount:0}};

assert.equal(stateFingerprint({a:1,b:{c:2,d:3}}),stateFingerprint({b:{d:3,c:2},a:1}));
const migrated=migrateCloudSync(base);
assert.equal(migrated.cloudSync.baseRevision,2);
assert.equal(migrated.cloudSync.deviceId,"device-A");
assert.equal(migrated.cloudSyncModelVersion,1);
const saved=markCloudSaved(base,{revision:3,deviceId:"device-A",savedState:base,at:2000});
assert.equal(saved.cloudSync.baseRevision,3);
assert.equal(saved.cloudSync.lastRemoteRevision,3);
assert.equal(saved.cloudSync.lastRemoteDeviceId,"device-A");
assert.ok(saved.cloudSync.baseFingerprint);
const remotePayload={schema:"aplus-student-state-v8",xp:180};
const loaded=markCloudLoaded(base,{revision:5,remoteDeviceId:"device-B",remoteState:remotePayload,at:3000});
assert.equal(loaded.cloudSync.baseRevision,5);
assert.equal(loaded.cloudSync.lastRemoteDeviceId,"device-B");
const reason=conflictReason(base,{revision:4});
assert.equal(reason.conflict,true);
assert.equal(reason.reason,"remote_advanced");
const conflicted=cloudConflict(base,{remoteRevision:4,remoteDeviceId:"device-B",remoteUpdatedAt:"2026-08-23T20:00:00Z",remoteState:remotePayload,at:4000});
assert.equal(conflicted.cloudSync.lastConflict.remoteRevision,4);
assert.equal(conflicted.cloudSync.lastConflict.localBaseRevision,2);
const snap=createLocalSnapshot(base,{label:"before conflict",at:5000});
assert.equal(snap.label,"before conflict");
assert.ok(snap.fingerprint.startsWith("sf1-"));
assert.deepEqual(snap.state,base);
const rows=mergeByStableId([{id:"x",at:10,v:"local-new"},{id:"y",at:5}],[{id:"x",at:1,v:"remote-old"},{id:"z",at:6}],x=>x.id);
assert.equal(rows.length,3);
assert.equal(rows.find(x=>x.id==="x").v,"local-new");
const local={...base,xp:200,scores:{t1:{domain:55,conf:40,evidence:[evidence("q1",1000),evidence("q2",2000)]}},missionHistory:[{completionId:"m1",at:1000,themeId:"t1"}],examHistory:[{completionId:"e-local",id:"e-local",at:2500}],dailyMission:{deviceLocal:true},identity:{mode:"authenticated",authUserId:"u1"},cloudMeta:{local:true}};
const remote={schema:"aplus-student-state-v8",goal:15,profile:{schoolYear:"11.º"},xp:180,scores:{t1:{domain:70,conf:70,evidence:[evidence("q1",1000),evidence("q3",3000)]},t2:{domain:60,conf:50,evidence:[evidence("q4",3500)]}},missionHistory:[{completionId:"m2",at:3000,themeId:"t2"}],examHistory:[{completionId:"e-remote",id:"e-remote",at:3200}],freeTrainingSignals:[],learningHypotheses:[{key:"h1",lastAt:3100}]};
const combined=safeCloudMerge(local,remote);
assert.equal(combined.xp,200);
assert.equal(combined.goal,17);
assert.equal(combined.profile.schoolYear,"12.º");
assert.equal(combined.scores.t1.evidence.length,3);
assert.equal(combined.scores.t2.evidence.length,1);
assert.equal(combined.scores.t1.domain,null);
assert.equal(combined.missionHistory.length,2);
assert.equal(combined.examHistory.length,2);
assert.deepEqual(combined.identity,local.identity);
assert.deepEqual(combined.dailyMission,local.dailyMission);
assert.equal(combined.scores.t1.conf,0);

const cloudSource=readFileSync("app/lib/cloud.js","utf8");
assert.ok(cloudSource.includes('.eq("revision",Number(expectedRevision)||0)'),"Save cloud perdeu compare-and-swap por revisão.");
assert.ok(cloudSource.includes("knownRemote"),"Revision 0 deixou de distinguir primeira gravação de base remota conhecida.");
assert.ok(cloudSource.includes("CLOUD_SCHEMA_OUTDATED"),"Cloud deixou de bloquear sync quando a migration de revisões não está aplicada.");
assert.ok(cloudSource.includes('fetch("/api/auth/token"'),"Data API deixou de obter o JWT pela sessão da app.");
assert.ok(cloudSource.includes('credentials:"include"'),"Pedido do token deixou de enviar a sessão autenticada.");
assert.ok(cloudSource.includes("getToken:currentDataApiJwt"),"Data API deixou de exigir o JWT atual.");
assert.ok(cloudSource.includes("auth_user_id:session.user.id"),"Escrita cloud deixou de fixar auth_user_id ao utilizador autenticado.");
assert.ok(cloudSource.includes('.eq("auth_user_id",session.user.id)'),"Leitura/escrita cloud perdeu o filtro pelo utilizador autenticado.");
assert.ok(cloudSource.includes("currentRemoteRow(client,session.user.id)"),"Verificação de revisão remota deixou de usar o utilizador autenticado.");
assert.ok(!/auth_user_id\s*:\s*s(?:\.|\[)/.test(cloudSource),"auth_user_id passou a poder vir do estado controlado pelo cliente.");
const payloadStart=cloudSource.indexOf("export function studentStateForCloud");
const payloadEnd=cloudSource.indexOf("export function mergeStudentCloudState");
assert.ok(payloadStart>=0&&payloadEnd>payloadStart,"Não foi possível localizar a allowlist do estado cloud.");
const payloadSource=cloudSource.slice(payloadStart,payloadEnd);
for(const forbidden of ["password","identity","cloudMeta","cloudSync","authUserId"]){
  assert.ok(!payloadSource.includes(forbidden),`Payload cloud passou a incluir campo proibido: ${forbidden}.`);
}
assert.ok(payloadSource.includes('schema:"aplus-student-state-v8"'),"Payload cloud perdeu a versão explícita de schema.");
assert.ok((cloudSource.match(/\.from\("student_cloud_state"\)/g)||[]).length>=4,"Cobertura esperada das operações de student_cloud_state diminuiu inesperadamente.");
assert.ok(!cloudSource.includes('.from("student_cloud_state").delete('),"DELETE direto de progresso exige revisão explícita de segurança.");

const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(new URL(`${entry.name}/`,dir)):[new URL(entry.name,dir)]);

// Estado FINAL das migrations: CREATE adiciona; DROP remove. A ordem do nome do ficheiro é o contrato.
const migrationUrls=walk(new URL("../db/migrations/",import.meta.url)).filter(url=>url.pathname.endsWith(".sql")).sort((a,b)=>a.pathname.localeCompare(b.pathname));
const finalTables=new Set();
const ddlRe=/\b(create|drop)\s+table\s+(?:if\s+(?:not\s+)?exists\s+)?(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?/giu;
for(const url of migrationUrls){
  const sql=readFileSync(url,"utf8");
  for(const match of sql.matchAll(ddlRe)){
    const table=match[2].toLowerCase();
    if(match[1].toLowerCase()==="create")finalTables.add(table);else finalTables.delete(table);
  }
}

// Só nomes de CTE conhecidos podem parecer tabelas sem existir fisicamente.
const CTE_ALLOWLIST=new Set(["target_user","revoked","deleted_aggregates","deleted_items","deleted_feedback","deleted_consents"]);
const serverUrls=walk(new URL("../app/lib/server/",import.meta.url)).filter(url=>/\.(?:js|jsx|ts|tsx)$/u.test(url.pathname));
const sqlRefRe=/\b(?:insert\s+into|delete\s+from|from|join)\s+(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?|\bupdate\s+(?!set\b)(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?/giu;
const missing=[];
for(const url of serverUrls){
  const source=readFileSync(url,"utf8");
  for(const tagged of source.matchAll(/sql`([\s\S]*?)`/gu)){
    for(const match of tagged[1].matchAll(sqlRefRe)){
      const table=(match[1]||match[2]).toLowerCase();
      if(!finalTables.has(table)&&!CTE_ALLOWLIST.has(table))missing.push(`${table} ← ${fileURLToPath(url)}`);
    }
  }
}
assert.deepEqual([...new Set(missing)],[],`Tabelas server-side sem migration ativa:\n${[...new Set(missing)].join("\n")}`);

const migration=readFileSync(new URL("../db/migrations/008_pilot_telemetry_consent.sql",import.meta.url),"utf8");
const ingest=readFileSync(new URL("../app/lib/server/pilot-ingest.js",import.meta.url),"utf8");
const dataRoute=readFileSync(new URL("../app/api/pilot/data/route.js",import.meta.url),"utf8");
const syncRoute=readFileSync(new URL("../app/api/pilot/sync/route.js",import.meta.url),"utf8");
const pilotTables=["consent_records","pilot_event_aggregates","pilot_item_results","pilot_feedback","pilot_test_accounts","pilot_sync_rate_limits","app_schema_meta"];
for(const table of pilotTables){
  assert.match(migration,new RegExp(`alter table ${table} enable row level security`,"u"),`${table}: RLS obrigatório.`);
  assert.match(migration,new RegExp(`revoke all on table ${table} from anonymous`,"u"),`${table}: anonymous tem de ficar revogado.`);
}
assert.match(migration,/subject text not null default 'all'/u,"subject dos agregados tem de ser NOT NULL com default all.");
assert.match(migration,/consent_type in \('pilot_self','pilot_minor'\)/u,"Schema tem de manter pilot_self e pilot_minor configuráveis.");
assert.match(migration,/unique index[\s\S]*consent_records\(student_user_id,consent_type\)[\s\S]*where revoked_at is null/u,"Consentimento ativo precisa de índice único parcial.");
assert.match(migration,/references app_users\(id\) on delete cascade/u,"Dados do piloto têm de acompanhar apagamento do utilizador.");
assert.match(migration,/where is_test=false/u,"Métricas agregadas têm de excluir linhas de teste por filtro.");
assert.match(migration,/create table if not exists pilot_sync_rate_limits/u,"Rate limit deve ser persistente.");
assert.match(migration,/update consent_records[\s\S]*set revoked_at=coalesce\(revoked_at,now\(\)\)/u,"Apagamento do piloto deve revogar, não apagar, o consentimento.");
assert.doesNotMatch(migration,/delete from consent_records/iu,"Apagamento do piloto não pode destruir o histórico de consentimento.");
assert.match(migration,/psql -v ON_ERROR_STOP=1 -f/u,"Workaround do $$ tem de ficar documentado na própria migration.");
assert.match(ingest,/MAX_SECONDS_PER_DAY=86_400/u,"Segundos diários precisam de teto.");
assert.match(ingest,/EVENT_COUNT_LIMITS/u,"Eventos precisam de limites por tipo.");
assert.match(ingest,/ALLOWED_SUBJECTS/u,"Disciplinas precisam de enum fechado.");
assert.match(ingest,/ITEM_ID_RE/u,"itemId precisa de formato validado.");
assert.match(ingest,/dateNearServer/u,"Datas precisam de janela ±1 dia.");
assert.match(ingest,/enforcePilotRateLimit/u,"Sync precisa de rate limit por utilizador.");
assert.match(ingest,/const isTest=Boolean\(user\.is_test_account\)/u,"Conta de teste deve escrever marcada.");
assert.doesNotMatch(ingest,/if\(user\.is_test_account\)return/u,"Conta de teste não pode saltar o ingest.");
assert.match(ingest,/greatest\(pilot_event_aggregates\.total_count,excluded\.total_count\)/u,"Agregados devem usar totais absolutos com GREATEST.");
assert.match(syncRoute,/sameOriginRequest\(request\)/u,"Pilot sync precisa de proteção CSRF por origem.");
assert.match(dataRoute,/sameOriginRequest\(request\)/u,"Apagamento precisa de proteção CSRF por origem.");

console.log("✓ cloud reliability/security: revisions, JWT auth, final migration-state coverage, CTE allowlist, pilot RLS, consent retention, marked test writes, validation and CSRF validated");
