-- Fresh disposable PostgreSQL 16 only. No Neon connection or real identities.
-- Each workflow matrix entry gets its own service and applies 009 exactly once.
\set ON_ERROR_STOP on
\ir neon_rls_synthetic_bootstrap.sql
SELECT set_config('app.synthetic_snapshot_case', :'scenario', false);
SET ROLE neondb_owner;

-- Retain old rows byte-for-byte while repairing the policy/trigger definition.
INSERT INTO public.student_cloud_state_history
  (auth_user_id,revision,state_json,device_id,saved_at)
VALUES
  ('synthetic-student-a',40,'{"existing":"a"}', 'original-a','2000-01-01T00:00:00Z'),
  ('synthetic-student-b',41,'{"existing":"b"}', 'original-b','2000-01-02T00:00:00Z');
CREATE TEMP TABLE expected_existing_history AS
  SELECT * FROM public.student_cloud_state_history;

CREATE FUNCTION public.synthetic_wrong_snapshot()
RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RETURN NEW; END; $$;

DO $corrupt_schema$
DECLARE scenario text := current_setting('app.synthetic_snapshot_case');
BEGIN
  CASE scenario
    WHEN 'permissive-policy' THEN
      ALTER POLICY student_cloud_history_select_own
        ON public.student_cloud_state_history USING (true);
    WHEN 'wrong-function' THEN
      DROP TRIGGER trg_student_cloud_state_snapshot ON public.student_cloud_state;
      CREATE TRIGGER trg_student_cloud_state_snapshot
        BEFORE UPDATE ON public.student_cloud_state FOR EACH ROW
        EXECUTE FUNCTION public.synthetic_wrong_snapshot();
    WHEN 'after-statement' THEN
      DROP TRIGGER trg_student_cloud_state_snapshot ON public.student_cloud_state;
      CREATE TRIGGER trg_student_cloud_state_snapshot
        AFTER UPDATE ON public.student_cloud_state FOR EACH STATEMENT
        EXECUTE FUNCTION public.snapshot_student_cloud_state();
    WHEN 'filtered-update' THEN
      DROP TRIGGER trg_student_cloud_state_snapshot ON public.student_cloud_state;
      CREATE TRIGGER trg_student_cloud_state_snapshot
        BEFORE UPDATE OF last_device_id ON public.student_cloud_state
        FOR EACH ROW WHEN (false)
        EXECUTE FUNCTION public.snapshot_student_cloud_state();
    WHEN 'disabled' THEN
      ALTER TABLE public.student_cloud_state
        DISABLE TRIGGER trg_student_cloud_state_snapshot;
    WHEN 'missing' THEN
      DROP TRIGGER trg_student_cloud_state_snapshot ON public.student_cloud_state;
    ELSE
      RAISE EXCEPTION 'Unknown disposable regression scenario: %',scenario;
  END CASE;
END;
$corrupt_schema$;

RESET ROLE;
SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE authenticated;
DO $negative_control$
DECLARE visible_b integer;
BEGIN
  SELECT count(*) INTO visible_b FROM public.student_cloud_state_history
    WHERE auth_user_id='synthetic-student-b';
  IF current_setting('app.synthetic_snapshot_case')='permissive-policy' THEN
    IF visible_b<>1 THEN RAISE EXCEPTION 'Permissive fixture did not reproduce cross-user exposure'; END IF;
  ELSIF visible_b<>0 THEN
    RAISE EXCEPTION 'Non-policy fixture unexpectedly exposes another user';
  END IF;
END;
$negative_control$;
RESET ROLE;

SET ROLE neondb_owner;
\ir ../../db/migrations/009_v5_8_neon_rls_history_hardening.sql

DO $trigger_contract$
BEGIN
  IF NOT EXISTS(
    SELECT 1 FROM pg_trigger
    WHERE tgrelid='public.student_cloud_state'::regclass
      AND tgname='trg_student_cloud_state_snapshot'
      AND tgfoid='public.snapshot_student_cloud_state()'::regprocedure
      AND tgtype=19 AND tgenabled='O' AND NOT tgisinternal
      AND tgnargs=0 AND tgqual IS NULL AND tgattr=''::int2vector
  ) THEN RAISE EXCEPTION 'Adulterated snapshot trigger was not fully repaired'; END IF;
END;
$trigger_contract$;

-- Updates that do not touch last_device_id must still capture every OLD row.
UPDATE public.student_cloud_state
SET revision=revision+1,state_json='{"test":"new-a"}'
WHERE auth_user_id='synthetic-student-a' AND revision=0;
UPDATE public.student_cloud_state
SET revision=revision+1,state_json='{"test":"new-b"}'
WHERE auth_user_id='synthetic-student-b' AND revision=0;

DO $history_integrity$
BEGIN
  IF EXISTS(
    SELECT * FROM expected_existing_history
    EXCEPT SELECT * FROM public.student_cloud_state_history
  ) THEN RAISE EXCEPTION 'Repair changed or removed existing history'; END IF;
  IF (SELECT count(*) FROM public.student_cloud_state_history)<>4
    OR NOT EXISTS(SELECT 1 FROM public.student_cloud_state_history
      WHERE auth_user_id='synthetic-student-a' AND revision=0
        AND state_json='{"test":"a"}'::jsonb AND device_id='device-a')
    OR NOT EXISTS(SELECT 1 FROM public.student_cloud_state_history
      WHERE auth_user_id='synthetic-student-b' AND revision=0
        AND state_json='{"test":"b"}'::jsonb AND device_id='device-b')
  THEN RAISE EXCEPTION 'Repair did not preserve OLD snapshots for both users'; END IF;
END;
$history_integrity$;
RESET ROLE;

-- Negative isolation checks in both directions after migration COMMIT.
SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE authenticated;
DO $isolate_a$
BEGIN
  IF (SELECT count(*) FROM public.student_cloud_state_history)<>2
    OR EXISTS(SELECT 1 FROM public.student_cloud_state_history
      WHERE auth_user_id<>'synthetic-student-a')
  THEN RAISE EXCEPTION 'A can read foreign history after repair'; END IF;
  BEGIN
    INSERT INTO public.student_cloud_state_history(auth_user_id,revision,state_json)
      VALUES('synthetic-student-a',99,'{}');
    RAISE EXCEPTION 'A can forge history after repair';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END;
$isolate_a$;
SELECT set_config('request.jwt.claim.sub','synthetic-student-b',false);
DO $isolate_b$
BEGIN
  IF (SELECT count(*) FROM public.student_cloud_state_history)<>2
    OR EXISTS(SELECT 1 FROM public.student_cloud_state_history
      WHERE auth_user_id<>'synthetic-student-b')
  THEN RAISE EXCEPTION 'B can read foreign history after repair'; END IF;
END;
$isolate_b$;
SELECT set_config('request.jwt.claim.sub','',false);
DO $no_subject$
BEGIN
  IF EXISTS(SELECT 1 FROM public.student_cloud_state_history)
  THEN RAISE EXCEPTION 'Missing subject can read history'; END IF;
END;
$no_subject$;
RESET ROLE;
\echo 'PASS: adulterated schema repaired; A/B isolation, existing history and OLD snapshots preserved'
