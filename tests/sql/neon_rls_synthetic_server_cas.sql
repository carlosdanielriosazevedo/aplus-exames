-- Trusted server route contract on a disposable PostgreSQL database ONLY.
-- Validates exact one-statement INSERT and UPDATE semantics independently
-- of normal browser RLS checks and without any real account or credentials.
SET ROLE neondb_owner;
DO $server_cas$
DECLARE
  changed integer;
  saved_revision integer;
  saved_json jsonb;
BEGIN
  INSERT INTO public.student_cloud_state
    (auth_user_id,state_json,revision,last_device_id,updated_at)
  VALUES
    ('synthetic-cas-account','{"xp":1}'::jsonb,1,'dev1',now())
  ON CONFLICT (auth_user_id) DO NOTHING;
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>1 THEN RAISE EXCEPTION 'Initial server insert failed'; END IF;

  -- A replayed initial INSERT must not replace the saved state.
  INSERT INTO public.student_cloud_state
    (auth_user_id,state_json,revision,last_device_id,updated_at)
  VALUES
    ('synthetic-cas-account','{"xp":999}'::jsonb,1,'forged',now())
  ON CONFLICT (auth_user_id) DO NOTHING;
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>0 THEN RAISE EXCEPTION 'Duplicate initial insert overwrote account'; END IF;
  SELECT revision,state_json INTO saved_revision,saved_json
  FROM public.student_cloud_state WHERE auth_user_id='synthetic-cas-account';
  IF saved_revision<>1 OR saved_json<>'{"xp":1}'::jsonb
    THEN RAISE EXCEPTION 'Replay mutated the initial snapshot'; END IF;

  -- Atomic compare-and-swap succeeds once and stores OLD snapshot.
  UPDATE public.student_cloud_state
  SET state_json='{"xp":2}'::jsonb,revision=revision+1,
      last_device_id='dev2',updated_at=now()
  WHERE auth_user_id='synthetic-cas-account' AND revision=1;
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>1 THEN RAISE EXCEPTION 'Expected CAS update not applied'; END IF;
  IF NOT EXISTS(
    SELECT 1 FROM public.student_cloud_state_history
    WHERE auth_user_id='synthetic-cas-account' AND revision=1
      AND state_json='{"xp":1}'::jsonb
  ) THEN RAISE EXCEPTION 'CAS failed to preserve previous snapshot'; END IF;

  -- Old expected revision cannot overwrite newer progress.
  UPDATE public.student_cloud_state
  SET state_json='{"xp":0}'::jsonb,revision=revision+1,updated_at=now()
  WHERE auth_user_id='synthetic-cas-account' AND revision=1;
  GET DIAGNOSTICS changed=ROW_COUNT;
  IF changed<>0 THEN RAISE EXCEPTION 'Stale overwrite accepted'; END IF;
  SELECT revision,state_json INTO saved_revision,saved_json
  FROM public.student_cloud_state WHERE auth_user_id='synthetic-cas-account';
  IF saved_revision<>2 OR saved_json<>'{"xp":2}'::jsonb
    THEN RAISE EXCEPTION 'Stale CAS mutated saved progress'; END IF;
  IF (SELECT count(*) FROM public.student_cloud_state_history
      WHERE auth_user_id='synthetic-cas-account')<>1
    THEN RAISE EXCEPTION 'Stale CAS created unwanted history'; END IF;

  RAISE NOTICE 'PASS: server INSERT replay, atomic CAS, stale conflict and OLD-state snapshot';
END;
$server_cas$;
RESET ROLE;
