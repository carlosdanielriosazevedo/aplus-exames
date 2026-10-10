import {getSql,databaseConfigured} from "./db";
import {pilotRetentionUntil,resolvePilotUser} from "./pilot-ingest";

export function pilotPolicyVersion(){
  return process.env.PILOT_POLICY_VERSION||process.env.NEXT_PUBLIC_PILOT_POLICY_VERSION||null;
}

export async function pilotConsentStatus(authUserId){
  if(!databaseConfigured())return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  const user=await resolvePilotUser(authUserId);
  if(!user)return {ok:true,active:false};
  const sql=getSql();
  const rows=await sql`
    select consent_type,policy_version,granted_at,revoked_at,retention_until
    from consent_records
    where student_user_id=${user.id} and consent_type='pilot_self'
    order by granted_at desc
    limit 1
  `;
  const row=rows[0]||null;
  return {
    ok:true,
    active:Boolean(row&&!row.revoked_at&&new Date(row.retention_until).getTime()>Date.now()),
    consent:row?{
      type:row.consent_type,
      policyVersion:row.policy_version,
      grantedAt:row.granted_at,
      revokedAt:row.revoked_at,
      retentionUntil:row.retention_until
    }:null
  };
}

export async function grantPilotSelfConsent(authUserId,{ageConfirmed=false,accepted=false}={}){
  if(!databaseConfigured())return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  if(ageConfirmed!==true||accepted!==true)return {ok:false,code:"CONFIRMATIONS_REQUIRED"};
  const policyVersion=pilotPolicyVersion();
  const retentionUntil=pilotRetentionUntil();
  if(!policyVersion)return {ok:false,code:"PILOT_POLICY_VERSION_NOT_CONFIGURED"};
  if(!retentionUntil)return {ok:false,code:"PILOT_RETENTION_NOT_CONFIGURED"};
  const user=await resolvePilotUser(authUserId);
  if(!user)return {ok:false,code:"APP_USER_REQUIRED"};
  const sql=getSql();

  const inserted=await sql`
    with revoked as (
      update consent_records
      set revoked_at=now()
      where student_user_id=${user.id}
        and consent_type='pilot_self'
        and revoked_at is null
        and policy_version<>${policyVersion}
      returning id
    )
    insert into consent_records
      (student_user_id,guardian_user_id,consent_type,policy_version,granted_at,retention_until,is_test)
    select ${user.id},null,'pilot_self',${policyVersion},now(),${retentionUntil},${Boolean(user.is_test_account)}
    where not exists (
      select 1 from consent_records
      where student_user_id=${user.id}
        and consent_type='pilot_self'
        and revoked_at is null
        and policy_version=${policyVersion}
    )
    returning consent_type,policy_version,granted_at,retention_until
  `;
  if(inserted[0])return {ok:true,active:true,consent:{type:inserted[0].consent_type,policyVersion:inserted[0].policy_version,grantedAt:inserted[0].granted_at,retentionUntil:inserted[0].retention_until}};
  return pilotConsentStatus(authUserId);
}

export async function revokePilotSelfConsent(authUserId){
  if(!databaseConfigured())return {ok:false,code:"DATABASE_NOT_CONFIGURED"};
  const user=await resolvePilotUser(authUserId);
  if(!user)return {ok:true,revoked:0};
  const sql=getSql();
  const rows=await sql`
    update consent_records
    set revoked_at=coalesce(revoked_at,now())
    where student_user_id=${user.id}
      and consent_type='pilot_self'
      and revoked_at is null
    returning id
  `;
  return {ok:true,revoked:rows.length};
}
