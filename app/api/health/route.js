import {NextResponse} from "next/server";
import {databaseHealth,getSql} from "../../lib/server/db";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(){
  const db=await databaseHealth();
  let schemaVersion=null;
  let schemaMigration=null;
  if(db.configured&&db.reachable){
    try{
      const rows=await getSql()`
        select schema_version,migration_name
        from app_schema_meta
        where singleton=true
        limit 1
      `;
      schemaVersion=rows[0]?.schema_version??null;
      schemaMigration=rows[0]?.migration_name??null;
    }catch{
      // Base pré-008: health continua disponível, mas expõe explicitamente schema desconhecido.
    }
  }
  return NextResponse.json({
    ok:true,
    app:"APProva+ Exames",
    version:"5.5.0",
    persistence:"local-first",
    region:process.env.VERCEL_REGION||null,
    backendConfigured:db.configured,
    backendReachable:db.reachable,
    provider:db.provider,
    schemaVersion,
    schemaMigration,
    database:db
  },{headers:{"Cache-Control":"no-store"}});
}
