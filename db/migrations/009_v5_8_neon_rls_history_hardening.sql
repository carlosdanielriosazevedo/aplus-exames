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
END
$preflight$;

-- Pre-existing direct grants survive GRANTs in migration 007; clear them.
REVOKE ALL ON TABLE
  public.app_users, public.app_user_roles, public.student_profiles,
  public.parent_invites, public.student_parent_links,
  public.parent_link_change_requests
FROM authenticated, anonymous, PUBLIC;

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

-- O browser autenticado pode gerir apenas o seu registo base e o seu perfil de aluno.
grant select, insert, update on table app_users to authenticated;
grant select on table app_user_roles to authenticated;
grant select, insert, update on table student_profiles to authenticated;

-- As tabelas parentais são apenas legíveis pelas duas partes da ligação.
-- Escritas ficam deliberadamente sem grant para authenticated: serão feitas por
-- endpoints server-side depois de validar sessão, role, token e transição de estado.
grant select on table parent_invites to authenticated;
grant select on table student_parent_links to authenticated;
grant select on table parent_link_change_requests to authenticated;

-- app_users: cada sessão vê/cria/edita apenas o próprio utilizador.
drop policy if exists "app_users_select_self" on app_users;
create policy "app_users_select_self"
on app_users for select to authenticated
using (auth_user_id = (select auth.user_id()));

drop policy if exists "app_users_insert_self" on app_users;
create policy "app_users_insert_self"
on app_users for insert to authenticated
with check (auth_user_id = (select auth.user_id()));

drop policy if exists "app_users_update_self" on app_users;
create policy "app_users_update_self"
on app_users for update to authenticated
using (auth_user_id = (select auth.user_id()))
with check (auth_user_id = (select auth.user_id()));

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
END
$snapshot$;
REVOKE ALL ON FUNCTION public.snapshot_student_cloud_state() FROM PUBLIC, authenticated, anonymous;

-- Abort if any direct grants or RLS flags drifted.
DO $postflight$
DECLARE
  invalid_count integer;
BEGIN
  SELECT count(*) INTO invalid_count
  FROM (VALUES
    ('app_users',true,true,true,false,3),
    ('app_user_roles',true,false,false,false,1),
    ('student_profiles',true,true,true,false,3),
    ('parent_invites',true,false,false,false,1),
    ('student_parent_links',true,false,false,false,1),
    ('parent_link_change_requests',true,false,false,false,1),
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
  IF EXISTS(
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public' AND c.relname IN
      ('app_users','app_user_roles','student_profiles','parent_invites',
       'student_parent_links','parent_link_change_requests','student_cloud_state_history')
      AND (has_table_privilege('anonymous',c.oid,'SELECT')
        OR has_table_privilege('anonymous',c.oid,'INSERT')
        OR has_table_privilege('anonymous',c.oid,'UPDATE')
        OR has_table_privilege('anonymous',c.oid,'DELETE'))
  ) THEN RAISE EXCEPTION 'Anonymous privileges remain'; END IF;
  IF NOT EXISTS(
    SELECT 1 FROM pg_proc WHERE oid='public.snapshot_student_cloud_state()'::regprocedure
    AND prosecdef AND pg_get_userbyid(proowner)='neondb_owner'
  ) THEN RAISE EXCEPTION 'History snapshot trigger function not securely owned'; END IF;
END
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
END
$versioncheck$;
COMMIT;
