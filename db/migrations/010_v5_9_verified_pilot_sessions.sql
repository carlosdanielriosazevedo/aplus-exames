-- APProva+ 010 -- PREVIEW-ONLY EXPERIMENT, NOT AUTHORIZED FOR NEON.
-- Server-authoritative, immutable 7-question SYNTHETIC Math pilot.
-- Never use to reward real examinations, ranking or Premium accounts.
BEGIN;

DO $preflight$
BEGIN
  IF current_database()<>'neondb' OR current_user<>'neondb_owner'
  THEN RAISE EXCEPTION 'Preview pilot requires approved owner and database'; END IF;
  IF NOT EXISTS(
    SELECT 1 FROM public.app_schema_meta
    WHERE singleton=true AND schema_version=9
  ) THEN RAISE EXCEPTION 'Pilot requires schema 9 exactly'; END IF;
  IF to_regclass('public.verified_completion_receipts') IS NULL
    OR to_regclass('public.app_users') IS NULL
  THEN RAISE EXCEPTION 'Trusted reward foundation missing'; END IF;
END;
$preflight$;

CREATE TABLE public.preview_verified_math_sessions (
  session_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id text NOT NULL
    REFERENCES public.app_users(auth_user_id) ON DELETE CASCADE,
  assessment_key text NOT NULL DEFAULT 'synthetic-math-seven-v1'
    CHECK(assessment_key='synthetic-math-seven-v1'),
  answers jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK(jsonb_typeof(answers)='object'),
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(auth_user_id,assessment_key)
);
ALTER TABLE public.preview_verified_math_sessions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.preview_verified_math_sessions
  FROM authenticated,anonymous,PUBLIC;
-- No policy: browser may not read, create, update or reset sessions.
-- Only the server owner can access these records.

CREATE FUNCTION public.finish_preview_verified_math(p_auth_user_id text)
RETURNS TABLE(session_id uuid,completed_at timestamptz,verified_xp integer)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path=pg_catalog,pg_temp
AS $finish$
DECLARE
  saved jsonb;
  credited integer;
  actual_id uuid;
  actual_completed timestamptz;
BEGIN
  -- One row-level lock, one atomic transition; no API-client grades are used.
  UPDATE public.preview_verified_math_sessions AS s
  SET completed_at=now()
  WHERE s.auth_user_id=p_auth_user_id
    AND s.assessment_key='synthetic-math-seven-v1'
    AND s.completed_at IS NULL
    AND s.answers ?& ARRAY['q1','q2','q3','q4','q5','q6','q7']
  RETURNING s.answers INTO saved;

  IF FOUND THEN
    credited=5*(
      CASE WHEN saved->>'q1'='1' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q2'='0' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q3'='2' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q4'='0' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q5'='2' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q6'='1' THEN 1 ELSE 0 END+
      CASE WHEN saved->>'q7'='0' THEN 1 ELSE 0 END
    );

    INSERT INTO public.verified_completion_receipts
      (auth_user_id,completion_id,kind,verified_xp,grading_version,evidence_sha256)
    VALUES
      (p_auth_user_id,'synthetic-math-seven-v1','training',credited,
       'synthetic-preview-math-v1',
       encode(sha256(convert_to(
         'synthetic-math-seven-v1:'||saved::text,'UTF8')),'hex'))
    ON CONFLICT(auth_user_id,completion_id) DO NOTHING;

    -- If a receipt already exists unexpectedly, fail the entire statement,
    -- rolling back completion too. A retry may never forge a new award.
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Verified receipt already exists for incomplete pilot';
    END IF;
  END IF;

  SELECT s.session_id,s.completed_at
  INTO actual_id,actual_completed
  FROM public.preview_verified_math_sessions AS s
  WHERE s.auth_user_id=p_auth_user_id
    AND s.assessment_key='synthetic-math-seven-v1';

  IF actual_id IS NULL THEN RAISE EXCEPTION 'Pilot not started'; END IF;
  IF actual_completed IS NULL THEN RAISE EXCEPTION 'Pilot incomplete'; END IF;

  RETURN QUERY
    SELECT actual_id,actual_completed,r.verified_xp
    FROM public.verified_completion_receipts AS r
    WHERE r.auth_user_id=p_auth_user_id
      AND r.completion_id='synthetic-math-seven-v1'
      AND r.grading_version='synthetic-preview-math-v1';
  IF NOT FOUND THEN RAISE EXCEPTION 'Completed pilot has no trusted receipt'; END IF;
END;
$finish$;
REVOKE ALL ON FUNCTION public.finish_preview_verified_math(text)
  FROM PUBLIC,authenticated,anonymous;

DO $postflight$
BEGIN
  IF (SELECT count(*) FROM pg_policies
      WHERE schemaname='public' AND tablename='preview_verified_math_sessions')<>0
    OR has_table_privilege('authenticated','public.preview_verified_math_sessions','SELECT')
    OR has_table_privilege('authenticated','public.preview_verified_math_sessions','INSERT')
    OR has_table_privilege('authenticated','public.preview_verified_math_sessions','UPDATE')
    OR has_table_privilege('authenticated','public.preview_verified_math_sessions','DELETE')
    OR has_table_privilege('anonymous','public.preview_verified_math_sessions','SELECT')
    OR has_function_privilege('authenticated','public.finish_preview_verified_math(text)','EXECUTE')
    OR has_function_privilege('anonymous','public.finish_preview_verified_math(text)','EXECUTE')
  THEN RAISE EXCEPTION 'Preview pilot session/finisher exposed to client'; END IF;
END;
$postflight$;

UPDATE public.app_schema_meta
SET schema_version=10,migration_name='010_v5_9_verified_pilot_sessions',updated_at=now()
WHERE singleton=true AND schema_version=9;
DO $version$
BEGIN
  IF NOT EXISTS(SELECT 1 FROM public.app_schema_meta
                WHERE singleton=true AND schema_version=10)
  THEN RAISE EXCEPTION 'Pilot schema marker failed'; END IF;
END;
$version$;
COMMIT;
