-- Disposable PostgreSQL only. Schema 009 must have been applied by the
-- synthetic runner before these tests. No real Neon accounts or credentials.
SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE authenticated;
DO $untrusted$
BEGIN
  IF has_table_privilege('authenticated','public.verified_completion_receipts','SELECT')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','INSERT')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','UPDATE')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','DELETE')
  THEN RAISE EXCEPTION 'Browser role may manipulate verified receipts'; END IF;

  BEGIN
    PERFORM count(*) FROM public.verified_completion_receipts;
    RAISE EXCEPTION 'Browser can enumerate verified reward receipts';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;

  BEGIN
    INSERT INTO public.verified_completion_receipts
      (auth_user_id,completion_id,kind,verified_xp,grading_version,evidence_sha256)
    VALUES ('synthetic-student-a','fake-session','mission',500,'untrusted',
            repeat('f',64));
    RAISE EXCEPTION 'Browser can forge a verified reward receipt';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END;
$untrusted$;
RESET ROLE;

SET ROLE neondb_owner;
DO $trusted$
DECLARE
  affected integer;
  total integer;
BEGIN
  INSERT INTO public.verified_completion_receipts
    (auth_user_id,completion_id,kind,verified_xp,grading_version,evidence_sha256)
  VALUES ('synthetic-student-a','synthetic-session-1','mission',50,'test-only-v1',repeat('a',64))
  ON CONFLICT (auth_user_id,completion_id) DO NOTHING;
  GET DIAGNOSTICS affected=ROW_COUNT;
  IF affected<>1 THEN RAISE EXCEPTION 'Server ledger append failed'; END IF;

  -- Replayed receipt cannot duplicate XP or change a previous award.
  INSERT INTO public.verified_completion_receipts
    (auth_user_id,completion_id,kind,verified_xp,grading_version,evidence_sha256)
  VALUES ('synthetic-student-a','synthetic-session-1','mission',500,'test-only-v1',repeat('b',64))
  ON CONFLICT (auth_user_id,completion_id) DO NOTHING;
  GET DIAGNOSTICS affected=ROW_COUNT;
  IF affected<>0 THEN RAISE EXCEPTION 'Replay minted XP twice'; END IF;

  SELECT coalesce(sum(verified_xp),0)::integer INTO total
  FROM public.verified_completion_receipts
  WHERE auth_user_id='synthetic-student-a';
  IF total<>50 THEN RAISE EXCEPTION 'Verified XP total forged by replay'; END IF;

  BEGIN
    UPDATE public.verified_completion_receipts
    SET verified_xp=500
    WHERE auth_user_id='synthetic-student-a';
    RAISE EXCEPTION 'Unexpectedly accepted UPDATE of verified reward';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM<>'Verified completion receipts are immutable' THEN RAISE; END IF;
  END;

  BEGIN
    DELETE FROM public.verified_completion_receipts
    WHERE auth_user_id='synthetic-student-a';
    RAISE EXCEPTION 'Unexpectedly accepted DELETE of verified reward';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM<>'Verified completion receipts are immutable' THEN RAISE; END IF;
  END;

  IF (SELECT count(*) FROM public.verified_completion_receipts
      WHERE auth_user_id='synthetic-student-a')<>1
  THEN RAISE EXCEPTION 'Immutable receipt removed after forbidden mutation'; END IF;

  IF (SELECT coalesce(sum(verified_xp),0) FROM public.verified_completion_receipts
      WHERE auth_user_id='synthetic-student-b')<>0
  THEN RAISE EXCEPTION 'Cross-user reward total leaked'; END IF;
  RAISE NOTICE 'PASS: verified rewards are server-only, deduped, immutable and owner-filtered';
END;
$trusted$;
RESET ROLE;
