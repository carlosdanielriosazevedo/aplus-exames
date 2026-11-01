\set ON_ERROR_STOP on
\echo 'Starting synthetic PostgreSQL role/RLS fixture'
\ir neon_rls_synthetic_bootstrap.sql
SET ROLE neondb_owner;
\echo 'Applying proposed migration 009 solely in ephemeral CI Postgres'
\ir ../../db/migrations/009_v5_8_neon_rls_history_hardening.sql
RESET ROLE;
\echo 'Running synthetic authorization, CAS and history assertions'
\ir neon_rls_synthetic_assertions.sql
\echo 'PASS: PostgreSQL synthetic RLS migration smoke'
