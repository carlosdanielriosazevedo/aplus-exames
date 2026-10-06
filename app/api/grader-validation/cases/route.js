import {NextResponse} from "next/server";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {
  deterministicValidationSplit,graderValidationCaseFingerprint,GRADER_VALIDATION_DATASET_SCHEMA
} from "../../../lib/graderValidationDataset";
import {GRADER_VALIDATION_CONSENT_VERSION} from "../../../lib/graderValidationConsent";

const clean=(value,max)=>String(value??"").slice(0,max);

function validate(body){
  if(body?.schema!=="aplus-grader-validation-capture-v1")return {ok:false,code:"INVALID_SCHEMA"};
  if(body?.consent!==true||body?.consentVersion!==GRADER_VALIDATION_CONSENT_VERSION)return {ok:false,code:"VALIDATION_CONSENT_REQUIRED"};
  const row=body?.case;
  if(row?.schema!==GRADER_VALIDATION_DATASET_SCHEMA)return {ok:false,code:"INVALID_DATASET_SCHEMA"};
  if(row?.source!=="closed_beta_real")return {ok:false,code:"REAL_BETA_SOURCE_REQUIRED"};
  if(!row?.participant_id||!row?.subject||!row?.item_id||!row?.case_id)return {ok:false,code:"VALIDATION_CASE_IDENTITY_REQUIRED"};
  if(row.consent_version!==body.consentVersion)return {ok:false,code:"VALIDATION_CONSENT_VERSION_MISMATCH"};
  const expectedSplit=deterministicValidationSplit({participantId:row.participant_id,subject:row.subject,itemId:row.item_id,response:row.student_response});
  if(row.split!==expectedSplit)return {ok:false,code:"VALIDATION_SPLIT_TAMPERED"};
  if(row.case_fingerprint!==graderValidationCaseFingerprint(row))return {ok:false,code:"VALIDATION_FINGERPRINT_INVALID"};
  return {ok:true,row};
}

export async function POST(request){
  let body;
  try{body=await request.json()}catch{return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400})}
  const valid=validate(body);
  if(!valid.ok)return NextResponse.json(valid,{status:400});
  if(!databaseConfigured())return NextResponse.json({ok:false,code:"DATABASE_NOT_CONFIGURED"},{status:503});

  const row=valid.row;
  const sql=getSql();
  const participantCode=`grader:${clean(row.participant_id,80)}`;
  const participants=await sql`
    insert into beta_participants (code,cohort,updated_at)
    values (${participantCode},'grader-validation',now())
    on conflict (code) do update set updated_at=now()
    returning id
  `;
  const participantId=participants[0].id;
  const payload={
    schema:row.schema,case_id:row.case_id,source:row.source,split:row.split,
    subject:clean(row.subject,80),response_family:clean(row.response_family,80),item_id:clean(row.item_id,180),
    question:clean(row.question,12000),student_response:clean(row.student_response,12000),max_points:Number(row.max_points)||100,
    occurred_at:row.occurred_at,consent_version:row.consent_version,grader_snapshot:row.grader_snapshot||null,
    case_fingerprint:row.case_fingerprint
  };
  await sql`
    insert into beta_results (external_key,participant_id,result_kind,occurred_at,payload)
    values (${`grader-validation:${row.case_id}`},${participantId},'grader_validation_case',${row.occurred_at||new Date().toISOString()},${JSON.stringify(payload)}::jsonb)
    on conflict (external_key) do update set payload=excluded.payload
  `;
  return NextResponse.json({ok:true,provider:"neon-postgres",caseId:row.case_id,split:row.split});
}
