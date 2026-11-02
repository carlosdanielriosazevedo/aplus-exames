-- APProva+ 009 — REVIEW ONLY. DO NOT APPLY WITHOUT APPROVAL.
-- Hardens six identity/parental tables and the cloud history trigger atomically.
-- Derived from 007; crucial difference: revoke prior grants BEFORE selective grants.
-- Target for initial trial: separate synthetic Neon project, NEVER a clone of production.
-- Run whole file with psql -v ON_ERROR_STOP=1 -f; do not split dollar-quoted blocks.
BEGIN;

DO $preflight$
BEGIN
  IF current_database() <> 'neondb' THEN RAISE EXCEPTION 'Unexpected database'; END IF;
  IF current_user <> 'neondb_owner' THEN RAISE EXCEPTION 'Migration requires dedicated DB owner'; END IF;
  IF NOT EXISTS(SELECT 1 FROM pg_roles WHERE rolname='authenticated' AND NOT rolbypassrls AND NOT rolsuper) THEN
    RAISE EXCEPTION 'Authenticated role missing or privileged';
  END IF;
  IF (SELECT schema_version FROM public.app_schema_meta WHERE singleton=true) <> 8 THEN
    RAISE EXCEPTION 'Expected applied schema version 8';
  END IF;
  IF to_regclass('public.student_cloud_state_history') IS NULL
    OR to_regclass('public.student_cloud_state') IS NULL
    OR to_regprocedure('public.snapshot_student_cloud_state()') IS NULL THEN
    RAISE EXCEPTION 'Cloud history objects missing';
  END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid
    WHERE t.tgname='trg_student_cloud_state_snapshot'
      AND c.oid='public.student_cloud_state'::regclass AND t.tgenabled='O'
  ) THEN RAISE EXCEPTION 'Snapshot trigger missing or disabled'; END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p
    WHERE p.oid='public.snapshot_student_cloud_state()'::regprocedure
      AND pg_get_userbyid(p.proowner)='neondb_owner'
  ) THEN RAISE EXCEPTION 'Snapshot function owner is not verified'; END IF;
END;
$preflight$;

-- Pre-existing direct grants survive GRANTs in migration 007; clear them.
REVOKE ALL ON TABLE
  public.app_users, public.app_user_roles, public.student_profiles,
  public.parent_invites, public.student_parent_links,
  public.parent_link_change_requests
FROM authenticated, anonymous, PUBLIC;

-- Security boundary for cloud progress: the browser may read its own row but
-- MUST NOT write/delete it through Data API. All writes use /api/cloud/state,
-- a session-authorized server handler with an atomic revision precondition.
-- Deploy the compatible API/client BEFORE applying this database migration;
-- migration without a compatible running API intentionally blocks old clients.
REVOKE ALL ON TABLE public.student_cloud_state FROM authenticated, anonymous, PUBLIC;
GRANT SELECT ON TABLE public.student_cloud_state TO authenticated;
DROP POLICY IF EXISTS "student_cloud_state_select_own" ON public.student_cloud_state;
CREATE POLICY "student_cloud_state_select_own"
ON public.student_cloud_state FOR SELECT TO authenticated
USING ((SELECT auth.user_id()) = auth_user_id);
DROP POLICY IF EXISTS "student_cloud_state_insert_own" ON public.student_cloud_state;
DROP POLICY IF EXISTS "student_cloud_state_update_own" ON public.student_cloud_state;
DROP POLICY IF EXISTS "student_cloud_state_delete_own" ON public.student_cloud_state;

-- APProva+ v5.6 — fronteiras reais de autorização para identidade/parental
--
-- Objetivo: impedir que um utilizador autenticado leia ou altere dados de outra
-- conta diretamente através da Data API. Operações privilegiadas (atribuição de
-- roles, aceitação de convites, criação/revogação de ligações) devem passar por
-- código de servidor confiável e NÃO por permissões do browser.

-- Helper lógico repetido nas policies: resolve o app_users.id da sessão atual.
-- auth.user_id() é fornecido pelo Neon Data API a partir do JWT autenticado.

alter table app_users enable row level security;
alter table app_user_roles enable row level security;
alter table student_profiles enable row level security;
alter table parent_invites enable row level security;
alter table student_parent_links enable row level security;
alter table parent_link_change_requests enable row level security;

revoke all on table app_users from anonymous;
revoke all on table app_user_roles from anonymous;
revoke all on table student_profiles from anonymous;
revoke all on table parent_invites from anonymous;
revoke all on table student_parent_links from anonymous;
revoke all on table parent_link_change_requests from anonymous;

-- The app_users identity is server-authoritative (ensureAppUser() on DATABASE_URL).
-- Browser clients read their own entry but MUST NOT insert/update even their own row.
-- This prevents client-forged email_snapshot, generated IDs and timestamps.
grant select on table app_users to authenticated;
grant select on table app_user_roles to authenticated;
-- Users can edit their educational preferences, but not timestamps or row identity.
grant select on table student_profiles to authenticated;
grant insert (user_id,school_year,recent_grade,goal,syllabus_progress,exam_timing)
  on table student_profiles to authenticated;
grant update (school_year,recent_grade,goal,syllabus_progress,exam_timing)
  on table student_profiles to authenticated;

-- As tabelas parentais são apenas legíveis pelas duas partes da ligação.
-- Escritas ficam deliberadamente sem grant para authenticated: serão feitas por
-- endpoints server-side depois de validar sessão, role, token e transição de estado.
-- Invitation token hashes are server-only; clients may read safe invitation metadata.
-- Do not grant table-wide SELECT (which would expose token_hash via Data API).
grant select (id,student_user_id,target_email,status,expires_at,
  accepted_by_user_id,created_at,accepted_at)
  on table parent_invites to authenticated;
grant select on table student_parent_links to authenticated;
grant select on table parent_link_change_requests to authenticated;

-- app_users: user sees only their row; writes are server-only.
drop policy if exists "app_users_select_self" on app_users;
create policy "app_users_select_self"
on app_users for select to authenticated
using (auth_user_id = (select auth.user_id()));

-- Historical policies may exist from 007; remove them, not just grants.
drop policy if exists "app_users_insert_self" on app_users;
drop policy if exists "app_users_update_self" on app_users;

-- Roles: o utilizador pode ler os próprios roles, mas nunca autoatribuir reviewer/admin.
drop policy if exists "app_user_roles_select_self" on app_user_roles;
create policy "app_user_roles_select_self"
on app_user_roles for select to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Perfil de aluno: o aluno lê/escreve o seu. Um encarregado ligado pode apenas ler.
drop policy if exists "student_profiles_select_authorized" on student_profiles;
create policy "student_profiles_select_authorized"
on student_profiles for select to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
  or exists (
    select 1
    from student_parent_links spl
    join app_users parent_user on parent_user.id = spl.parent_user_id
    where spl.student_user_id = student_profiles.user_id
      and spl.status = 'active'
      and parent_user.auth_user_id = (select auth.user_id())
  )
);

drop policy if exists "student_profiles_insert_self" on student_profiles;
create policy "student_profiles_insert_self"
on student_profiles for insert to authenticated
with check (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

drop policy if exists "student_profiles_update_self" on student_profiles;
create policy "student_profiles_update_self"
on student_profiles for update to authenticated
using (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
)
with check (
  user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Convites: só o aluno que os criou os pode consultar diretamente.
-- O destinatário aceita através de endpoint de servidor; o token nunca é pesquisável.
drop policy if exists "parent_invites_select_student" on parent_invites;
create policy "parent_invites_select_student"
on parent_invites for select to authenticated
using (
  student_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Ligações: aluno e encarregado veem apenas ligações onde são parte.
drop policy if exists "student_parent_links_select_party" on student_parent_links;
create policy "student_parent_links_select_party"
on student_parent_links for select to authenticated
using (
  student_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
  or parent_user_id = (
    select id from app_users
    where auth_user_id = (select auth.user_id())
  )
);

-- Pedidos de alteração: visíveis apenas às partes da ligação correspondente.
drop policy if exists "parent_link_change_requests_select_party" on parent_link_change_requests;
create policy "parent_link_change_requests_select_party"
on parent_link_change_requests for select to authenticated
using (
  exists (
    select 1
    from student_parent_links spl
    join app_users current_user_row
      on current_user_row.auth_user_id = (select auth.user_id())
    where spl.id = parent_link_change_requests.link_id
      and current_user_row.id in (spl.student_user_id, spl.parent_user_id)
  )
);

-- Não conceder INSERT/UPDATE/DELETE das tabelas parentais nem de roles a
-- `authenticated`. O facto de existir RLS não substitui esta segunda barreira.

-- History is readable per ownership, never directly writable by browsers.
-- A trigger executes as its tightly restricted owner to record OLD rows.
REVOKE ALL ON TABLE public.student_cloud_state_history FROM authenticated, anonymous, PUBLIC;
GRANT SELECT ON TABLE public.student_cloud_state_history TO authenticated;

CREATE OR REPLACE FUNCTION public.snapshot_student_cloud_state()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path=pg_catalog,pg_temp
AS $snapshot$
BEGIN
  INSERT INTO public.student_cloud_state_history
    (auth_user_id, revision, state_json, device_id, saved_at)
  VALUES
    (OLD.auth_user_id, OLD.revision, OLD.state_json, OLD.last_device_id,
     coalesce(OLD.updated_at,now()));
  RETURN NEW;
END;
$snapshot$;
REVOKE ALL ON FUNCTION public.snapshot_student_cloud_state() FROM PUBLIC, authenticated, anonymous;

-- Server-authenticated assessment receipts are the future authority for XP.
-- Browser-provided state_json.xp, ranking and completed-session claims remain
-- UNVERIFIED. No browser or cloud-sync endpoint is authorized to mint receipts.
CREATE TABLE public.verified_completion_receipts (
  auth_user_id text NOT NULL,
  completion_id text NOT NULL CHECK (length(completion_id) BETWEEN 1 AND 160),
  kind text NOT NULL CHECK
    (kind IN ('diagnostic','mission','training','mini_exam','full_exam')),
  verified_xp integer NOT NULL CHECK (verified_xp BETWEEN 0 AND 500),
  grading_version text NOT NULL CHECK (length(grading_version) BETWEEN 1 AND 100),
  evidence_sha256 text NOT NULL CHECK (evidence_sha256 ~ '^[0-9a-f]{64}$'),
  verified_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (auth_user_id,completion_id)
);
ALTER TABLE public.verified_completion_receipts ENABLE ROW LEVEL SECURITY;
-- Explicitly no Data API policies/grants, including SELECT.
REVOKE ALL ON TABLE public.verified_completion_receipts
  FROM authenticated, anonymous, PUBLIC;

-- Even a mistaken owner UPDATE/DELETE cannot rewrite a receipt.
CREATE FUNCTION public.reject_verified_receipt_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path=pg_catalog,pg_temp
AS $immutable_reward$
BEGIN
  RAISE EXCEPTION 'Verified completion receipts are immutable';
END;
$immutable_reward$;
REVOKE ALL ON FUNCTION public.reject_verified_receipt_mutation()
  FROM PUBLIC, authenticated, anonymous;
CREATE TRIGGER trg_reject_verified_receipt_mutation
BEFORE UPDATE OR DELETE ON public.verified_completion_receipts
FOR EACH ROW
EXECUTE FUNCTION public.reject_verified_receipt_mutation();

-- Abort if any direct grants or RLS flags drifted.
DO $postflight$
DECLARE
  invalid_count integer;
BEGIN
  SELECT count(*) INTO invalid_count
  FROM (VALUES
    ('app_users',true,false,false,false,1),
    ('app_user_roles',true,false,false,false,1),
    ('student_profiles',true,false,false,false,3),
    ('parent_invites',false,false,false,false,1),
    ('student_parent_links',true,false,false,false,1),
    ('parent_link_change_requests',true,false,false,false,1),
    ('student_cloud_state',true,false,false,false,1),
    ('student_cloud_state_history',true,false,false,false,1)
  ) AS expected(table_name,can_select,can_insert,can_update,can_delete,policies)
  LEFT JOIN pg_class c ON c.oid=to_regclass('public.'||expected.table_name)
  WHERE c.oid IS NULL OR NOT c.relrowsecurity
    OR has_table_privilege('authenticated',c.oid,'SELECT') IS DISTINCT FROM expected.can_select
    OR has_table_privilege('authenticated',c.oid,'INSERT') IS DISTINCT FROM expected.can_insert
    OR has_table_privilege('authenticated',c.oid,'UPDATE') IS DISTINCT FROM expected.can_update
    OR has_table_privilege('authenticated',c.oid,'DELETE') IS DISTINCT FROM expected.can_delete
    OR (SELECT count(*)::integer FROM pg_policies p WHERE p.schemaname='public'
        AND p.tablename=expected.table_name) <> expected.policies;
  IF invalid_count<>0 THEN RAISE EXCEPTION 'RLS/grant postconditions failed for % tables',invalid_count; END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_class c
    WHERE c.oid='public.verified_completion_receipts'::regclass
      AND c.relrowsecurity
      AND pg_get_userbyid(c.relowner)='neondb_owner'
  ) OR has_table_privilege('authenticated','public.verified_completion_receipts','SELECT')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','INSERT')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','UPDATE')
    OR has_table_privilege('authenticated','public.verified_completion_receipts','DELETE')
    OR has_table_privilege('anonymous','public.verified_completion_receipts','SELECT')
    OR has_table_privilege('anonymous','public.verified_completion_receipts','INSERT')
    OR EXISTS(SELECT 1 FROM pg_policies
              WHERE schemaname='public' AND tablename='verified_completion_receipts')
    OR NOT EXISTS(
      SELECT 1 FROM pg_trigger
      WHERE tgrelid='public.verified_completion_receipts'::regclass
        AND tgname='trg_reject_verified_receipt_mutation'
        AND tgenabled='O'
    )
  THEN RAISE EXCEPTION 'Verified reward ledger privileges or immutability unsafe'; END IF;
  IF has_column_privilege('authenticated','public.parent_invites','token_hash','SELECT')
     OR NOT has_column_privilege('authenticated','public.parent_invites','id','SELECT')
     OR NOT has_column_privilege('authenticated','public.parent_invites','status','SELECT')
  THEN RAISE EXCEPTION 'Invitation token hashes exposed to authenticated'; END IF;
  -- RLS restricts rows; column privileges protect structural identity fields.
  IF has_column_privilege('authenticated','public.app_users','id','UPDATE')
     OR has_column_privilege('authenticated','public.app_users','auth_user_id','UPDATE')
     OR has_column_privilege('authenticated','public.app_users','created_at','UPDATE')
     OR has_column_privilege('authenticated','public.app_users','email_snapshot','UPDATE')
     OR has_column_privilege('authenticated','public.student_profiles','user_id','UPDATE')
     OR has_column_privilege('authenticated','public.student_profiles','created_at','UPDATE')
     OR has_column_privilege('authenticated','public.student_profiles','updated_at','UPDATE')
     OR has_column_privilege('authenticated','public.student_profiles','created_at','INSERT')
     OR has_column_privilege('authenticated','public.student_profiles','updated_at','INSERT')
     OR NOT has_column_privilege('authenticated','public.student_profiles','user_id','INSERT')
     OR has_column_privilege('authenticated','public.app_users','display_name','UPDATE')
     OR NOT has_column_privilege('authenticated','public.student_profiles','school_year','UPDATE')
  THEN RAISE EXCEPTION 'Unsafe or incomplete column-level UPDATE privileges'; END IF;

  IF EXISTS(
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public' AND c.relname IN
      ('app_users','app_user_roles','student_profiles','parent_invites',
       'student_parent_links','parent_link_change_requests','student_cloud_state',
       'student_cloud_state_history')
      AND (has_table_privilege('anonymous',c.oid,'SELECT')
        OR has_table_privilege('anonymous',c.oid,'INSERT')
        OR has_table_privilege('anonymous',c.oid,'UPDATE')
        OR has_table_privilege('anonymous',c.oid,'DELETE'))
  ) THEN RAISE EXCEPTION 'Anonymous privileges remain'; END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_proc WHERE oid='public.snapshot_student_cloud_state()'::regprocedure
    AND prosecdef AND pg_get_userbyid(proowner)='neondb_owner'
  ) THEN RAISE EXCEPTION 'History snapshot trigger function not securely owned'; END IF;
END;
$postflight$;

UPDATE public.app_schema_meta SET schema_version=9,
  migration_name='009_v5_8_neon_rls_history_hardening',updated_at=now()
WHERE singleton=true AND schema_version=8;
DO $versioncheck$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM public.app_schema_meta
               WHERE singleton=true AND schema_version=9) THEN
   RAISE EXCEPTION 'Schema marker update failed';
 END IF;
END;
$versioncheck$;
COMMIT;
