\set ON_ERROR_STOP on
\echo 'Starting synthetic PostgreSQL role/RLS fixture'
\ir neon_rls_synthetic_bootstrap.sql
SET ROLE neondb_owner;
\echo 'Applying proposed migration 009 solely in ephemeral CI Postgres'
\ir ../../db/migrations/009_v5_8_neon_rls_history_hardening.sql
RESET ROLE;
\echo 'Checking trusted server owner can maintain app identity after migration'
SET ROLE neondb_owner;
-- Mirror ensureAppUser()'s INSERT ... ON CONFLICT DO UPDATE under the DB owner role.
INSERT INTO public.app_users (id,auth_user_id,display_name,email_snapshot)
VALUES ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','synthetic-student-a',
        'Server approved name','synthetic-verified@example.invalid')
ON CONFLICT (auth_user_id) DO UPDATE SET
  display_name=excluded.display_name,
  email_snapshot=excluded.email_snapshot,
  updated_at=now();
DO $server_maintain$
BEGIN
 IF NOT EXISTS(
  SELECT 1 FROM public.app_users
  WHERE auth_user_id='synthetic-student-a'
   AND display_name='Server approved name'
   AND email_snapshot='synthetic-verified@example.invalid'
 ) THEN RAISE EXCEPTION 'Server identity maintenance failed'; END IF;
END;
$server_maintain$;
RESET ROLE;
\echo 'Running synthetic authorization, CAS and history assertions'
\ir neon_rls_synthetic_assertions.sql
\echo 'Running server-authoritative insert/CAS and replay assertions'
\ir neon_rls_synthetic_server_cas.sql
\echo 'PASS: PostgreSQL synthetic RLS migration smoke'
