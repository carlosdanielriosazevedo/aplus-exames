#!/usr/bin/env node
// This file is deployed ONLY in a self-contained, single-purpose PREVIEW build.
// It has no HTTP endpoint. Build output never contains credentials or SQL results.
// Required context: Vercel Preview, isolated project, authorized Neon host/database.
import {mkdirSync,writeFileSync} from "node:fs";

const ISOLATED_PROJECT="prj_8n5XwTMF651SAfsykIDji93oZp3r";
const ALLOWED_HOSTS=new Set([
  "ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech",
  "ep-holy-term-b93irruj-pooler.c-7.eu-central-1.aws.neon.tech"
]);

function blocked(code){
  console.error("ATTESTATION_BLOCKED "+code);
  process.exitCode=2;
}
async function main(){
  if(process.env.VERCEL_ENV!=="preview")
    return blocked("NOT_PREVIEW");
  if(process.env.VERCEL_TARGET_ENV && process.env.VERCEL_TARGET_ENV!=="preview")
    return blocked("WRONG_TARGET");
  if(process.env.VERCEL_PROJECT_ID && process.env.VERCEL_PROJECT_ID!==ISOLATED_PROJECT)
    return blocked("WRONG_PROJECT");
  const connection=process.env.DATABASE_URL;
  if(typeof connection!=="string" || !connection)
    return blocked("PREVIEW_SECRET_UNAVAILABLE");
  let url;
  try{url=new URL(connection)}catch{return blocked("MALFORMED_SECRET")}
  if(!["postgres:","postgresql:"].includes(url.protocol) ||
     !ALLOWED_HOSTS.has(url.hostname) ||
     url.pathname!=="/neondb" ||
     (url.port!=="" && url.port!=="5432") ||
     !url.username || !url.password)
    return blocked("WRONG_DATABASE_TARGET");

  // No library import or database/network operation occurs until all checks pass.
  const {neon}=await import("@neondatabase/serverless");
  const query=neon(connection);
  const results=await query`
    SELECT current_user::text AS effective_role,
           current_database()::text AS database_name,
           r.rolbypassrls AS bypass_rls,
           r.rolsuper AS super_user,
           has_table_privilege(current_user,'public.app_users','INSERT') AS can_insert_app_users,
           has_table_privilege(current_user,'public.app_users','UPDATE') AS can_update_app_users
    FROM pg_catalog.pg_roles AS r
    WHERE r.rolname=current_user
  `;
  if(results.length!==1 || results[0].database_name!=="neondb")
    return blocked("INVALID_CATALOG_RESULT");

  // Role names are catalog identifiers, NOT a connection string or credential.
  const role=results[0].effective_role;
  if(typeof role!=="string" || role.length>64 || !/^[a-zA-Z0-9_]+$/.test(role))
    return blocked("INVALID_ROLE_NAME");
  const safe={
    project:"isolated-preview",
    database:"neondb",
    role,
    bypassRls:results[0].bypass_rls===true,
    superuser:results[0].super_user===true,
    insertAppUsers:results[0].can_insert_app_users===true,
    updateAppUsers:results[0].can_update_app_users===true
  };
  console.log("ATTESTATION_RESULT "+JSON.stringify(safe));
  // The only deployable artifact has no personal or diagnostic data.
  mkdirSync("public",{recursive:true});
  writeFileSync("public/index.html",
    "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><title>Restricted diagnostic</title><body>Restricted Preview diagnostic completed.</body></html>\n",
    {mode:0o644});
}

main().catch(()=>{
  // Never print driver errors, environment values, URL, SQL trace or stack.
  blocked("QUERY_OR_BUILD_FAILURE_REDACTED");
});
