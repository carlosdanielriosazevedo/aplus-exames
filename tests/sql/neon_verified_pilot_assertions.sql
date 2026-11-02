-- Entirely synthetic, ephemeral Postgres 16 only. No real JWTs/accounts.
SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE authenticated;
DO $denied$
BEGIN
  IF has_table_privilege('authenticated','public.preview_verified_math_sessions','SELECT')
     OR has_table_privilege('authenticated','public.preview_verified_math_sessions','INSERT')
     OR has_table_privilege('authenticated','public.preview_verified_math_sessions','UPDATE')
     OR has_table_privilege('authenticated','public.preview_verified_math_sessions','DELETE')
     OR has_function_privilege('authenticated','public.finish_preview_verified_math(text)','EXECUTE')
  THEN RAISE EXCEPTION 'Data API role can manipulate synthetic pilot'; END IF;
  BEGIN
    PERFORM count(*) FROM public.preview_verified_math_sessions;
    RAISE EXCEPTION 'Data API can enumerate pilot attempts';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    INSERT INTO public.preview_verified_math_sessions(auth_user_id)
    VALUES('synthetic-student-a');
    RAISE EXCEPTION 'Data API can create verified pilot session';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
  BEGIN
    PERFORM * FROM public.finish_preview_verified_math('synthetic-student-a');
    RAISE EXCEPTION 'Data API can finalize synthetic pilot directly';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END;
$denied$;
RESET ROLE;

SET ROLE neondb_owner;
DO $pilot$
DECLARE
  n integer;
  rec record;
BEGIN
  INSERT INTO public.preview_verified_math_sessions(auth_user_id)
  VALUES('synthetic-student-a');
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>1 THEN RAISE EXCEPTION 'Pilot start failed'; END IF;

  INSERT INTO public.preview_verified_math_sessions(auth_user_id)
  VALUES('synthetic-student-a')
  ON CONFLICT(auth_user_id,assessment_key) DO NOTHING;
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>0 THEN RAISE EXCEPTION 'Pilot restarted'; END IF;

  BEGIN
    PERFORM * FROM public.finish_preview_verified_math('synthetic-student-a');
    RAISE EXCEPTION 'Incomplete pilot yielded a reward';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM<>'Pilot incomplete' THEN RAISE; END IF;
  END;

  -- Atomic first answer; replay must not overwrite it.
  UPDATE public.preview_verified_math_sessions
  SET answers=jsonb_set(answers,'{q1}','1'::jsonb,true)
  WHERE auth_user_id='synthetic-student-a'
    AND completed_at IS NULL AND NOT(answers ? 'q1');
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>1 THEN RAISE EXCEPTION 'Initial answer not recorded'; END IF;
  UPDATE public.preview_verified_math_sessions
  SET answers=jsonb_set(answers,'{q1}','0'::jsonb,true)
  WHERE auth_user_id='synthetic-student-a'
    AND completed_at IS NULL AND NOT(answers ? 'q1');
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>0 THEN RAISE EXCEPTION 'Already answered question changed'; END IF;

  UPDATE public.preview_verified_math_sessions
  SET answers=answers||'{"q2":0,"q3":2,"q4":0,"q5":2,"q6":1,"q7":0}'::jsonb
  WHERE auth_user_id='synthetic-student-a' AND completed_at IS NULL;

  SELECT * INTO rec
  FROM public.finish_preview_verified_math('synthetic-student-a');
  IF rec.verified_xp<>35 OR rec.completed_at IS NULL
    THEN RAISE EXCEPTION 'Trusted scoring did not award 7 x 5 synthetic XP'; END IF;

  -- Retries/replayed finishes never create a second receipt.
  SELECT * INTO rec
  FROM public.finish_preview_verified_math('synthetic-student-a');
  IF rec.verified_xp<>35 THEN RAISE EXCEPTION 'Retry changed reward'; END IF;
  IF (SELECT count(*) FROM public.verified_completion_receipts
      WHERE auth_user_id='synthetic-student-a'
        AND completion_id='synthetic-math-seven-v1')<>1
    THEN RAISE EXCEPTION 'Duplicate verification receipt'; END IF;

  UPDATE public.preview_verified_math_sessions
  SET answers='{"q1":0}'::jsonb
  WHERE auth_user_id='synthetic-student-a' AND completed_at IS NULL;
  GET DIAGNOSTICS n=ROW_COUNT;
  IF n<>0 THEN RAISE EXCEPTION 'Completed pilot could be modified'; END IF;

  IF (SELECT answers->>'q1' FROM public.preview_verified_math_sessions
      WHERE auth_user_id='synthetic-student-a')<>'1'
    THEN RAISE EXCEPTION 'Pilot lost immutable answer'; END IF;

  -- B never sees A's verified award and cannot finalize A by having B's cookie:
  -- server methods always source p_auth_user_id from the verified session.
  INSERT INTO public.preview_verified_math_sessions(auth_user_id)
  VALUES('synthetic-student-b');
  UPDATE public.preview_verified_math_sessions
  SET answers='{"q1":0,"q2":2,"q3":0,"q4":1,"q5":1,"q6":0,"q7":2}'::jsonb
  WHERE auth_user_id='synthetic-student-b' AND completed_at IS NULL;
  SELECT * INTO rec
  FROM public.finish_preview_verified_math('synthetic-student-b');
  IF rec.verified_xp<>0 THEN RAISE EXCEPTION 'Incorrect answers yielded XP'; END IF;
  IF (SELECT coalesce(sum(verified_xp),0)
      FROM public.verified_completion_receipts
      WHERE auth_user_id='synthetic-student-b')<>0
    THEN RAISE EXCEPTION 'Wrong owner saw someone else''s XP'; END IF;

  RAISE NOTICE 'PASS: preview-only pilot role denial, single start, no answer rewrites, 7 server-graded answers, exact-once XP and cross-user isolation';
END;
$pilot$;
RESET ROLE;
