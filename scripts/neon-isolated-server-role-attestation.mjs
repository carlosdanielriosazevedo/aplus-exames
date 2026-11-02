#!/usr/bin/env node
// Read-only diagnostic for the approved ISOLATED Neon database only.
// Never prints DATABASE_URL, passwords, tokens, user records or connection details.
// Do not run under a production deployment; use preview synthetic sandbox with approval.
import {neon} from "@neondatabase/serverless";

async function main(){
  if(process.env.CONFIRM_SYNTHETIC_NEON_READONLY!=="YES")
    throw Error("Explicit synthetic-only read-only approval required");
  const raw=process.env.DATABASE_URL;
  if(!raw)throw Error("DATABASE_URL missing (value not printed)");
  let url;
  try{url=new URL(raw)}catch{throw Error("Invalid DATABASE_URL (value not printed)")}
  const hosts=new Set([
    "ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech",
    "ep-holy-term-b93irruj-pooler.c-7.eu-central-1.aws.neon.tech"
  ]);
  if(!["postgres:","postgresql:"].includes(url.protocol)
      || !hosts.has(url.hostname)
      || url.pathname!=="/neondb")
    throw Error("Refusing non-isolated Neon database host or database name");
  const sql=neon(raw);
  const rows=await sql`
    SELECT current_user::text AS role_name,
           current_database()::text AS db_name,
           r.rolbypassrls AS bypasses_rls,
           r.rolsuper AS superuser
    FROM pg_roles r WHERE r.rolname=current_user
  `;
  if(rows.length!==1||rows[0].db_name!=="neondb")
    throw Error("Unexpected database role attestation result");
  const role=rows[0].role_name;
  if(!["neondb_owner","authenticator"].includes(role))
    throw Error("Unexpected runtime DB role: "+role);
  console.log(JSON.stringify({
    target:"isolated-preview",
    database:"neondb",
    role,
    bypassesRls:Boolean(rows[0].bypasses_rls),
    isSuperuser:Boolean(rows[0].superuser),
    advisory:"Role attestation only. Does not test JWT, API authorization, or production DB target."
  }));
}
main().catch(error=>{
  console.error("FAIL: "+String(error.message||error));
  process.exitCode=1;
});
