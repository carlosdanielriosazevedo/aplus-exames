-- ONLY disposable PostgreSQL after the synthetic 009 fixture. No Neon access.
SET ROLE neondb_owner;
INSERT INTO public.student_cloud_state(auth_user_id,revision,state_json,last_device_id)
VALUES ('synthetic-f7-a',1,'{"schema":"aplus-student-state-v8","xp":37,"missionHistory":{},"examHistory":[{"id":"old-exam","score20":14,"answers":["synthetic historical answer"]}]}','synthetic-old-device'),
       ('synthetic-f7-b',1,'{"schema":"aplus-student-state-v8","xp":5,"missionHistory":[],"examHistory":[]}','synthetic-b-device');
-- A failed recovery transaction must roll back BOTH current state and history.
BEGIN;
UPDATE public.student_cloud_state SET state_json='{"xp":999}',revision=revision+1
WHERE auth_user_id='synthetic-f7-a' AND revision=1;
ROLLBACK;
DO $assert$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.student_cloud_state WHERE auth_user_id='synthetic-f7-a' AND revision=1 AND state_json->>'xp'='37' AND state_json->'missionHistory'='{}'::jsonb)
 OR EXISTS(SELECT 1 FROM public.student_cloud_state_history WHERE auth_user_id='synthetic-f7-a') THEN RAISE EXCEPTION 'Recovery rollback lost original or left history'; END IF;
END;
$assert$;
RESET ROLE;
