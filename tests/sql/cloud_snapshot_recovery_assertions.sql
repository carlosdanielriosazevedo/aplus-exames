SET ROLE neondb_owner;
DO $assert$
DECLARE original jsonb := '{"schema":"aplus-student-state-v8","xp":37,"missionHistory":{},"examHistory":[{"id":"old-exam","score20":14,"answers":["synthetic historical answer"]}]}';
BEGIN
 IF (SELECT count(*) FROM public.student_cloud_state_history WHERE auth_user_id='synthetic-f7-a')<>1
 OR NOT EXISTS(SELECT 1 FROM public.student_cloud_state_history WHERE auth_user_id='synthetic-f7-a' AND revision=1 AND state_json=original AND device_id='synthetic-old-device')
 THEN RAISE EXCEPTION 'Original malformed snapshot, grade or answer lost during CAS repair'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.student_cloud_state WHERE auth_user_id='synthetic-f7-a' AND revision=2 AND state_json->>'xp' IN ('41','42') AND state_json->'missionHistory'='[]'::jsonb AND state_json->'examHistory'=original->'examHistory')
 THEN RAISE EXCEPTION 'Expected exactly one successful revision with retained history'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public.student_cloud_state WHERE auth_user_id='synthetic-f7-b' AND revision=1 AND state_json->>'xp'='5')
 OR EXISTS(SELECT 1 FROM public.student_cloud_state_history WHERE auth_user_id='synthetic-f7-b')
 THEN RAISE EXCEPTION 'Recovery affected another synthetic account'; END IF;
 RAISE NOTICE 'PASS F7 PostgreSQL: rollback, two concurrent CAS repairs, one winner, exact OLD snapshot/answers/grades, account B unchanged';
END;
$assert$;
RESET ROLE;
