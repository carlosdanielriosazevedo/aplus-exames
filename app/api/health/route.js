import {NextResponse} from "next/server";
import {databaseHealth} from "../../lib/server/db";

export const runtime="nodejs";

export async function GET(){
  const db=await databaseHealth();
  return NextResponse.json({
    ok:true,
    app:"A+ Exames",
    version:"2.3.0",
    persistence:"local-first",
    backendConfigured:db.configured,
    backendReachable:db.reachable,
    provider:db.provider,
    database:db
  });
}
