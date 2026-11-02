\set ON_ERROR_STOP on
\echo 'Starting synthetic PostgreSQL role/RLS fixture'
\ir neon_rls_synthetic_bootstrap.sql
SET ROLE neondb_owner;
\echo 'Applying proposed migration 009 solely in ephemeral CI Postgres'
\ir ../../db/migrations/009_v5_8_neon_rls_history_hardening.sql
RESET ROLE;
\echo 'Checking trusted server owner can maintain app identity after migration'
SET ROLE neondb_owner;
UPDATE public.app_users SET display_name='Server approved name'
WHERE auth_user_id='synthetic-student-a';
DO $server_maintain$
BEGIN
 IF NOT EXISTS(
  SELECT 1 FROM public.app_users
  WHERE auth_user_id='synthetic-student-a'
   AND display_name='Server approved name'
 ) THEN RAISE EXCEPTION 'Server identity maintenance failed'; END IF;
END;
$server_maintain$;
RESET ROLE;
\echo 'Running synthetic authorization, CAS and history assertions'
\ir neon_rls_synthetic_assertions.sql
\echo 'PASS: PostgreSQL synthetic RLS migration smoke'
