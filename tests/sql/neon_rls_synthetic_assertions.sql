-- Entirely synthetic tests using SET ROLE and fake request claims.
-- This tests SQL RLS semantics, NOT cryptographic Neon Auth JWT validation.
SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE authenticated;
DO $assert_a$
DECLARE n integer;
BEGIN
 SELECT count(*) INTO n FROM public.app_users;
 IF n<>1 THEN RAISE EXCEPTION 'A can see % app users, expected 1',n; END IF;
 SELECT count(*) INTO n FROM public.student_profiles;
 IF n<>1 THEN RAISE EXCEPTION 'A can see % student profiles, expected 1',n; END IF;
 SELECT count(*) INTO n FROM public.app_user_roles;
 IF n<>1 THEN RAISE EXCEPTION 'A can see % roles, expected 1',n; END IF;
 SELECT count(*) INTO n FROM public.student_cloud_state;
 IF n<>1 THEN RAISE EXCEPTION 'A can see % cloud rows, expected 1',n; END IF;

 UPDATE public.student_profiles SET school_year='12.º'
 WHERE user_id='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>0 THEN RAISE EXCEPTION 'A could modify B profile'; END IF;
 
 BEGIN
   INSERT INTO public.app_user_roles(user_id,role)
     VALUES('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','admin');
   RAISE EXCEPTION 'A could grant self admin';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
   DELETE FROM public.student_parent_links;
   RAISE EXCEPTION 'A could directly delete parent links';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
   INSERT INTO public.student_cloud_state_history
     (auth_user_id,revision,state_json)
     VALUES('synthetic-student-a',99,'{}'::jsonb);
   RAISE EXCEPTION 'A could insert forged history';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END;
$assert_a$;

-- A legitimate cloud update should write exactly one OLD-state snapshot.
DO $cas$
DECLARE n integer;
BEGIN
 UPDATE public.student_cloud_state
 SET revision=revision+1,state_json='{"test":"a-updated"}'::jsonb
 WHERE auth_user_id='synthetic-student-a' AND revision=0;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>1 THEN RAISE EXCEPTION 'CAS update failed'; END IF;
 SELECT count(*) INTO n FROM public.student_cloud_state_history
 WHERE auth_user_id='synthetic-student-a' AND revision=0
   AND state_json='{"test":"a"}'::jsonb;
 IF n<>1 THEN RAISE EXCEPTION 'Snapshot OLD row missing'; END IF;
 UPDATE public.student_cloud_state
 SET revision=revision+1
 WHERE auth_user_id='synthetic-student-a' AND revision=0;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>0 THEN RAISE EXCEPTION 'Stale CAS unexpectedly accepted'; END IF;
 SELECT count(*) INTO n FROM public.student_cloud_state_history;
 IF n<>1 THEN RAISE EXCEPTION 'Stale CAS fabricated snapshot'; END IF;
END;
$cas$;

SELECT set_config('request.jwt.claim.sub','synthetic-student-b',false);
DO $assert_b$
DECLARE n integer;
BEGIN
 SELECT count(*) INTO n FROM public.app_users;
 IF n<>1 THEN RAISE EXCEPTION 'B cannot isolate app users'; END IF;
 SELECT count(*) INTO n FROM public.student_cloud_state_history;
 IF n<>0 THEN RAISE EXCEPTION 'B can see A cloud history'; END IF;
 UPDATE public.student_cloud_state
 SET revision=revision+1
 WHERE auth_user_id='synthetic-student-a' AND revision=1;
 GET DIAGNOSTICS n=ROW_COUNT;
 IF n<>0 THEN RAISE EXCEPTION 'B could update A cloud state'; END IF;
END;
$assert_b$;
RESET ROLE;

-- Parent link write must remain server-only.
INSERT INTO public.student_parent_links(id,student_user_id,parent_user_id,status)
VALUES('dddddddd-dddd-4ddd-8ddd-dddddddddddd',
       'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
       'cccccccc-cccc-4ccc-8ccc-cccccccccccc','active');
INSERT INTO public.parent_link_change_requests(id,link_id)
VALUES('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
       'dddddddd-dddd-4ddd-8ddd-dddddddddddd');

SELECT set_config('request.jwt.claim.sub','synthetic-parent-p',false);
SET ROLE authenticated;
DO $assert_parent$
DECLARE n integer;
BEGIN
 SELECT count(*) INTO n FROM public.student_profiles;
 IF n<>1 THEN RAISE EXCEPTION 'Parent should see only linked A profile; got %',n; END IF;
 SELECT count(*) INTO n FROM public.student_parent_links;
 IF n<>1 THEN RAISE EXCEPTION 'Parent cannot see own link'; END IF;
 SELECT count(*) INTO n FROM public.parent_link_change_requests;
 IF n<>1 THEN RAISE EXCEPTION 'Parent cannot see own link-change requests'; END IF;
END;
$assert_parent$;
RESET ROLE;

UPDATE public.student_parent_links SET status='revoked'
WHERE id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';

SET ROLE authenticated;
DO $assert_revoked$
DECLARE n integer;
BEGIN
 SELECT count(*) INTO n FROM public.student_profiles;
 IF n<>0 THEN RAISE EXCEPTION 'Revoked parent still sees student profile'; END IF;
 SELECT count(*) INTO n FROM public.student_parent_links;
 IF n<>1 THEN RAISE EXCEPTION 'Revoked history should still show involved link'; END IF;
END;
$assert_revoked$;

SELECT set_config('request.jwt.claim.sub','',false);
DO $assert_no_claim$
DECLARE n integer;
BEGIN
 SELECT count(*) INTO n FROM public.app_users;
 IF n<>0 THEN RAISE EXCEPTION 'Authenticated without subject claim sees users'; END IF;
 SELECT count(*) INTO n FROM public.student_profiles;
 IF n<>0 THEN RAISE EXCEPTION 'Authenticated without subject claim sees profiles'; END IF;
END;
$assert_no_claim$;
RESET ROLE;

SELECT set_config('request.jwt.claim.sub','synthetic-student-a',false);
SET ROLE anonymous;
DO $assert_anon$
BEGIN
 IF has_table_privilege('anonymous','public.app_users','SELECT')
 OR has_table_privilege('anonymous','public.student_profiles','SELECT')
 OR has_table_privilege('anonymous','public.student_parent_links','SELECT') THEN
  RAISE EXCEPTION 'Anonymous identity/parent table privilege present';
 END IF;
END;
$assert_anon$;
RESET ROLE;

DO $final_gate$
BEGIN
 IF (SELECT schema_version FROM public.app_schema_meta WHERE singleton)=9
    AND (SELECT count(*) FROM public.student_cloud_state_history)=1
    AND (SELECT count(*) FROM public.app_user_roles)=3 THEN
  RAISE NOTICE 'PASS: synthetic RLS, parental revocation, CAS and snapshot assertions';
 ELSE
  RAISE EXCEPTION 'Unexpected marker, snapshots or roles';
 END IF;
END;
$final_gate$;
