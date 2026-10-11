import {NextResponse} from "next/server";
import {authErrorResponse,ensureAppIdentity,requireSession} from "../../../../lib/server/identity";
import {sameOriginRequest} from "../../../../lib/server/csrf";
import {getSql} from "../../../../lib/server/db";

export const runtime="nodejs";
export const dynamic="force-dynamic";

const noStore={"Cache-Control":"no-store"};
const previewOnly=()=>process.env.VERCEL_ENV==="preview";

async function identityOrResponse(){
  try{
    const authenticated=await requireSession();
    const identity=await ensureAppIdentity(authenticated);
    return {authenticated,identity,response:null};
  }catch(error){
    const failure=authErrorResponse(error);
    return {authenticated:null,identity:null,response:NextResponse.json(failure.body,{status:failure.status,headers:noStore})};
  }
}

export async function POST(request){
  if(!previewOnly())return NextResponse.json({ok:false,error:"NOT_FOUND"},{status:404,headers:noStore});
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers:noStore});

  const resolved=await identityOrResponse();
  if(resolved.response)return resolved.response;
  const appUserId=resolved.identity.appUser.id;

  try{
    const sql=getSql();
    await sql`
      insert into pilot_test_accounts(student_user_id,label)
      values (${appUserId},'post-deploy-smoke')
      on conflict (student_user_id) do update set label=excluded.label
    `;
    return NextResponse.json({ok:true,appUserId},{headers:noStore});
  }catch(error){
    console.error("APProva+ preview smoke bootstrap failed",error);
    return NextResponse.json({ok:false,error:"SMOKE_BOOTSTRAP_FAILED"},{status:500,headers:noStore});
  }
}

export async function GET(){
  if(!previewOnly())return NextResponse.json({ok:false,error:"NOT_FOUND"},{status:404,headers:noStore});

  const resolved=await identityOrResponse();
  if(resolved.response)return resolved.response;
  const appUserId=resolved.identity.appUser.id;
  const authUserId=resolved.authenticated.authUserId;

  try{
    const sql=getSql();
    const aggregates=await sql`
      select period_date,event_type,subject,total_count,total_seconds,is_test
      from pilot_event_aggregates
      where student_user_id=${appUserId}
      order by period_date desc,event_type,subject
      limit 50
    `;
    const counts=await sql`
      select
        (select count(*)::int from pilot_event_aggregates where student_user_id=${appUserId} and is_test=true) as aggregates,
        (select count(*)::int from pilot_item_results where student_user_id=${appUserId} and is_test=true) as item_results,
        (select count(*)::int from pilot_feedback where student_user_id=${appUserId} and is_test=true) as feedback,
        (select count(*)::int from pilot_event_aggregates where student_user_id=${appUserId} and is_test=false) as metric_aggregates,
        (select count(*)::int from pilot_item_results where student_user_id=${appUserId} and is_test=false) as metric_item_results,
        (select count(*)::int from pilot_feedback where student_user_id=${appUserId} and is_test=false) as metric_feedback,
        (select count(*)::int from consent_records where student_user_id=${appUserId} and consent_type='pilot_self' and revoked_at is not null) as revoked_consents,
        exists(select 1 from pilot_test_accounts where student_user_id=${appUserId}) as marked_test_account
    `;
    const cloud=await sql`
      select state_json,revision,last_device_id
      from student_cloud_state
      where auth_user_id=${authUserId}
      limit 1
    `;
    return NextResponse.json({
      ok:true,
      appUserId,
      aggregates,
      counts:counts[0]||{},
      cloud:cloud[0]||null
    },{headers:noStore});
  }catch(error){
    console.error("APProva+ preview smoke read failed",error);
    return NextResponse.json({ok:false,error:"SMOKE_READ_FAILED"},{status:500,headers:noStore});
  }
}
