// Contrato do CAS de /api/cloud/state contra PostgreSQL real e descartável.
// Uso: PG_URL=postgres://... PG_NODE_MODULES=/caminho/node_modules node tests/scripts/cloud-state-postgres-contract.mjs
// Nunca apontar para uma base com dados reais: o script cria e apaga a tabela.
import assert from "node:assert/strict";
import {createRequire} from "node:module";
import path from "node:path";
import {readCloudRow,writeCloudRow} from "../../app/lib/server/cloud-state-store.js";

const url=process.env.PG_URL;
if(!url||!/localhost|127\.0\.0\.1|\/tmp/.test(url))throw new Error("PG_URL tem de apontar para um PostgreSQL local descartável.");
const require=createRequire(path.join(process.env.PG_NODE_MODULES||".","noop.js"));
const {Pool}=require("pg");
const pool=new Pool({connectionString:url,max:12});

// Adaptador mínimo com a mesma interface do driver Neon: sql`...` → rows.
const sql=(strings,...values)=>pool.query(
  strings.reduce((text,part,i)=>text+(i?`$${i}`:"")+part,""),values
).then(result=>result.rows);

const state=xp=>({schema:"aplus-student-state-v8",xp,subjectProgress:{}});
const write=(user,operation,expectedRevision,xp)=>writeCloudRow(sql,user,{operation,expectedRevision,state:state(xp),deviceId:"contract"});

await pool.query("drop table if exists public.student_cloud_state");
// Forma observada em produção (APProva+ EU/main, schema 8): colunas de revisão, sem trigger de histórico.
await pool.query(`create table public.student_cloud_state(
  auth_user_id text primary key,
  state_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  revision integer not null default 0,
  last_device_id text)`);

const results=[];
async function check(name,fn){await fn();results.push(name);console.log("✓",name);}

await check("P1 primeira gravação cria revisão 1",async()=>{
  const r=await write("A","insert",0,10);
  assert.equal(r.ok,true);assert.equal(r.data.revision,1);
});
await check("P2 segundo insert não substitui o snapshot existente",async()=>{
  const r=await write("A","insert",0,999);
  assert.equal(r.conflict,true);assert.equal(r.remote.state_json.xp,10);
});
await check("P3 update com a revisão certa avança para 2",async()=>{
  const r=await write("A","update",1,20);
  assert.equal(r.ok,true);assert.equal(r.data.revision,2);
});
await check("P4 update com revisão antiga é recusado sem alterar dados",async()=>{
  const r=await write("A","update",1,500);
  assert.equal(r.conflict,true);
  const row=await readCloudRow(sql,"A");
  assert.equal(row.revision,2);assert.equal(row.state_json.xp,20);
});
await check("P5 dez updates concorrentes na mesma revisão: exatamente um vence",async()=>{
  const all=await Promise.all(Array.from({length:10},(_,i)=>write("A","update",2,100+i)));
  assert.equal(all.filter(r=>r.ok).length,1);
  assert.equal(all.filter(r=>r.conflict).length,9);
  const row=await readCloudRow(sql,"A");
  assert.equal(row.revision,3);
});
await check("P6 repetir o mesmo pedido (replay) não duplica XP nem revisão",async()=>{
  const before=await readCloudRow(sql,"A");
  const r=await write("A","update",2,before.state_json.xp+50);
  assert.equal(r.conflict,true);
  const after=await readCloudRow(sql,"A");
  assert.deepEqual(after.state_json,before.state_json);assert.equal(after.revision,before.revision);
});
await check("P7 conta B nunca lê nem altera a linha de A",async()=>{
  const before=await readCloudRow(sql,"A");
  assert.equal(await readCloudRow(sql,"B"),null);
  const ins=await write("B","insert",0,1);assert.equal(ins.ok,true);
  const upd=await write("B","update",before.revision,7777);
  assert.equal(upd.conflict,true);assert.equal(upd.remote.state_json.xp,1);
  const after=await readCloudRow(sql,"A");
  assert.deepEqual(after.state_json,before.state_json);
});

await pool.query("drop table public.student_cloud_state");
await pool.end();
console.log(`cloud-state postgres contract: ${results.length}/7`);
