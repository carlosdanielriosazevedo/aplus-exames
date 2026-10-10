import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {
  stateFingerprint,cloudSyncMeta,migrateCloudSync,markCloudLoaded,markCloudSaved,
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
assert.equal(snap.at,5000);
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
assert.ok(!JSON.stringify(combined).toLowerCase().includes("password"));
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
for(const forbidden of ["password","identity","cloudMeta","cloudSync","authUserId"])assert.ok(!payloadSource.includes(forbidden),`Payload cloud passou a incluir campo proibido: ${forbidden}.`);
assert.ok(payloadSource.includes('schema:"aplus-student-state-v8"'),"Payload cloud perdeu a versão explícita de schema.");
const tableUses=(cloudSource.match(/\.from\("student_cloud_state"\)/g)||[]).length;
assert.ok(tableUses>=4,"Cobertura esperada das operações de student_cloud_state diminuiu inesperadamente.");
assert.ok(!cloudSource.includes('.from("student_cloud_state").delete('),"DELETE direto de progresso exige revisão explícita de segurança.");

// Contrato schema↔server: todas as tabelas SQL referidas por app/lib/server/** têm de existir
// no ESTADO FINAL das migrations, depois de CREATE e DROP processados por ordem.
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(new URL(`${entry.name}/`,dir)):[new URL(entry.name,dir)]);
const migrationUrls=walk(new URL("../db/migrations/",import.meta.url)).filter(url=>url.pathname.endsWith(".sql")).sort((a,b)=>a.pathname.localeCompare(b.pathname));
const finalTables=new Set();
const ddlRe=/\b(create|drop)\s+table\s+(?:if\s+(?:not\s+)?exists\s+)?(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?/giu;
for(const url of migrationUrls){
  const sql=readFileSync(url,"utf8");
  for(const match of sql.matchAll(ddlRe)){
    const table=match[2].toLowerCase();
    if(match[1].toLowerCase()==="create")finalTables.add(table); else finalTables.delete(table);
  }
}

const CTE_ALLOWLIST=new Set(["target_user","deleted_aggregates","deleted_items","deleted_feedback","deleted_consents"]);
const serverUrls=walk(new URL("../app/lib/server/",import.meta.url)).filter(url=>/\.(?:js|jsx|ts|tsx)$/u.test(url.pathname));
const missing=[];
const sqlRefRe=/\b(?:insert\s+into|delete\s+from|from|join)\s+(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?|\bupdate\s+(?!set\b)(?:public\.)?"?([a-zA-Z_][a-zA-Z0-9_]*)"?/giu;
for(const url of serverUrls){
  const source=readFileSync(url,"utf8");
  const taggedBlocks=[...source.matchAll(/sql`([\s\S]*?)`/gu)].map(match=>match[1]);
  for(const block of taggedBlocks){
    for(const match of block.matchAll(sqlRefRe)){
      const table=(match[1]||match[2]).toLowerCase();
      if(!finalTables.has(table)&&!CTE_ALLOWLIST.has(table))missing.push(`${table} ← ${fileURLToPath(url)}`);
    }
  }
}
assert.deepEqual([...new Set(missing)],[],`Tabelas server-side sem migration ativa:\n${[...new Set(missing)].join("\n")}`);

// Migration 008: prova estática das fronteiras RLS e dos invariantes do piloto.
const pilotMigration=readFileSync(new URL("../db/migrations/008_pilot_telemetry_consent.sql",import.meta.url),"utf8");
const pilotIngest=readFileSync(new URL("../app/lib/server/pilot-ingest.js",import.meta.url),"utf8");
const pilotTables=["consent_records","pilot_event_aggregates","pilot_item_results","pilot_feedback","app_schema_meta"];
for(const table of pilotTables){
  assert.match(pilotMigration,new RegExp(`alter table ${table} enable row level security`,"u"),`${table}: RLS obrigatório.`);
  assert.match(pilotMigration,new RegExp(`revoke all on table ${table} from anonymous`,"u"),`${table}: anonymous tem de ficar revogado.`);
}
assert.match(pilotMigration,/subject text not null default 'all'/u,"subject dos agregados tem de ser NOT NULL com default all.");
assert.match(pilotMigration,/unique index[\s\S]*consent_records\(student_user_id,consent_type\)[\s\S]*where revoked_at is null/u,"Consentimento ativo precisa de índice único parcial.");
assert.match(pilotMigration,/consent_type in \('pilot_self','pilot_minor'\)/u,"Schema tem de suportar pilot_self e pilot_minor sem decidir qual se aplica.");
assert.match(pilotMigration,/references app_users\(id\) on delete cascade/u,"Dados do piloto têm de acompanhar apagamento do utilizador.");
assert.match(pilotMigration,/is_test_account boolean not null default false/u,"Contas de smoke têm de ser marcáveis.");
assert.match(pilotIngest,/greatest\(pilot_event_aggregates\.total_count,excluded\.total_count\)/u,"Agregados têm de aceitar totais absolutos com GREATEST, nunca deltas.");
assert.match(pilotIngest,/greatest\(pilot_event_aggregates\.total_seconds,excluded\.total_seconds\)/u,"Tempo agregado tem de usar GREATEST.");
assert.match(pilotIngest,/if\(user\.is_test_account\)return/u,"Contas de teste têm de ser excluídas das métricas.");
assert.doesNotMatch(pilotIngest,/answer|response_text|student_answer/iu,"Telemetria por item não pode persistir texto de resposta.");

console.log("✓ cloud reliability/security: revisions, conflicts, JWT auth, final migration table coverage, pilot RLS and minimal telemetry validated");
