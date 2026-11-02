// Trusted server-only storage for synthetic preview pilot.
// This module never accepts an auth_user_id, assessment key, or grade from HTTP.
import {PILOT_KEY,publicPilotSession} from "./preview-verified-pilot.js";

export async function readPreviewPilot(sql,subject){
  const rows=await sql`
    SELECT session_id,answers,completed_at
    FROM public.preview_verified_math_sessions
    WHERE auth_user_id=${subject} AND assessment_key=${PILOT_KEY}
    LIMIT 1
  `;
  return rows[0]||null;
}

export async function startPreviewPilot(sql,subject){
  await sql`
    INSERT INTO public.preview_verified_math_sessions(auth_user_id,assessment_key)
    VALUES(${subject},${PILOT_KEY})
    ON CONFLICT(auth_user_id,assessment_key) DO NOTHING
  `;
  return publicPilotSession(await readPreviewPilot(sql,subject));
}

export async function recordPreviewAnswer(sql,subject,questionId,choiceIndex){
  const rows=await sql`
    UPDATE public.preview_verified_math_sessions
    SET answers=jsonb_set(answers,ARRAY[${questionId}]::text[],
      to_jsonb(${choiceIndex}::integer),true)
    WHERE auth_user_id=${subject}
      AND assessment_key=${PILOT_KEY}
      AND completed_at IS NULL
      AND NOT(answers ? ${questionId})
    RETURNING session_id,answers,completed_at
  `;
  const row=rows[0]||await readPreviewPilot(sql,subject);
  return {accepted:Boolean(rows.length),...publicPilotSession(row)};
}

export async function finishPreviewPilot(sql,subject){
  const rows=await sql`
    SELECT session_id,completed_at,verified_xp
    FROM public.finish_preview_verified_math(${subject})
  `;
  if(rows.length!==1)throw Error("Pilot completion invariant not met");
  const row=await readPreviewPilot(sql,subject);
  return {...publicPilotSession(row),verifiedXp:Number(rows[0].verified_xp),
    authority:"synthetic-preview-only"};
}
