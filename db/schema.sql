-- A+ Exames v2.3 — esquema PostgreSQL para Neon / beta centralizada.
-- Pensado para um backend server-side: o browser NÃO deve receber credenciais de escrita direta.

create extension if not exists pgcrypto;

create table if not exists beta_participants (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  cohort text,
  school_year text,
  goal smallint check (goal between 10 and 20),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists beta_sync_imports (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid references beta_participants(id) on delete cascade,
  schema_version text not null,
  app_version text,
  imported_at timestamptz not null default now(),
  payload_hash text,
  raw_summary jsonb not null default '{}'::jsonb
);

create table if not exists beta_sessions (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  participant_id uuid not null references beta_participants(id) on delete cascade,
  kind text not null,
  started_at timestamptz not null,
  finished_at timestamptz,
  duration_seconds integer,
  meta jsonb not null default '{}'::jsonb
);

create table if not exists beta_events (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  participant_id uuid not null references beta_participants(id) on delete cascade,
  event_type text not null,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists beta_feedback (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  participant_id uuid not null references beta_participants(id) on delete cascade,
  kind text not null,
  occurred_at timestamptz not null,
  clarity smallint check (clarity between 1 and 5),
  difficulty_fit smallint check (difficulty_fit between 1 and 5),
  usefulness smallint check (usefulness between 1 and 5),
  comment text
);


create table if not exists beta_results (
  id uuid primary key default gen_random_uuid(),
  external_key text not null unique,
  participant_id uuid not null references beta_participants(id) on delete cascade,
  result_kind text not null,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists content_reports (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  participant_id uuid references beta_participants(id) on delete set null,
  item_id text not null,
  template_id text,
  theme_id text,
  focus text,
  category text not null,
  label text,
  generated boolean not null default false,
  occurred_at timestamptz not null,
  resolved_at timestamptz,
  resolution_note text
);

create table if not exists content_items (
  item_id text primary key,
  current_version integer not null default 1,
  review_status text not null default 'prototype' check (review_status in ('prototype','pending','reviewed','blocked')),
  theme_id text,
  focus text,
  is_generated_template boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists editorial_reviews (
  id uuid primary key default gen_random_uuid(),
  external_key text unique,
  item_id text not null references content_items(item_id) on delete cascade,
  item_version integer not null,
  reviewer_id text not null,
  decision text not null check (decision in ('approve','changes','block','reopen','version_bump')),
  resulting_status text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists review_batches (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  reviewer_id text,
  status text not null default 'open',
  item_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists idx_beta_sessions_participant on beta_sessions(participant_id,started_at desc);
create index if not exists idx_beta_events_participant on beta_events(participant_id,occurred_at desc);
create index if not exists idx_reports_item on content_reports(item_id,occurred_at desc);
create index if not exists idx_beta_results_participant on beta_results(participant_id,occurred_at desc);
create index if not exists idx_reviews_item on editorial_reviews(item_id,created_at desc);

-- Segurança recomendada:
-- 1. o browser comunica apenas com uma API server-side da A+;
-- 2. a API valida o participante/payload e escreve na BD com credencial secreta;
-- 3. nunca expor uma service-role key ao cliente;
-- 4. definir política de retenção e minimização antes da beta real.


-- ============================================================
-- v2.4 — Identidade da aplicação, papéis e ligações parentais
-- A autenticação base (utilizador/sessão/password/OAuth) pertence ao Neon Auth.
-- A+ guarda apenas dados de negócio ligados ao auth_user_id.
-- ============================================================

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null unique,
  display_name text,
  email_snapshot text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_user_roles (
  user_id uuid not null references app_users(id) on delete cascade,
  role text not null check (role in ('student','parent','reviewer','admin')),
  granted_at timestamptz not null default now(),
  granted_by uuid references app_users(id) on delete set null,
  primary key (user_id,role)
);

create table if not exists student_profiles (
  user_id uuid primary key references app_users(id) on delete cascade,
  school_year text,
  recent_grade smallint check (recent_grade between 0 and 20),
  goal smallint check (goal between 10 and 20),
  syllabus_progress text,
  exam_timing text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists parent_invites (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  target_email text,
  token_hash text not null unique,
  status text not null default 'pending'
    check (status in ('pending','accepted','expired','cancelled')),
  expires_at timestamptz not null,
  accepted_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  accepted_at timestamptz
);

create table if not exists student_parent_links (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  parent_user_id uuid not null references app_users(id) on delete cascade,
  status text not null default 'active'
    check (status in ('active','removal_pending','revoked')),
  created_from_invite_id uuid references parent_invites(id) on delete set null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique(student_user_id,parent_user_id)
);

create table if not exists parent_link_change_requests (
  id uuid primary key default gen_random_uuid(),
  link_id uuid not null references student_parent_links(id) on delete cascade,
  requested_by_user_id uuid not null references app_users(id) on delete cascade,
  request_type text not null check (request_type in ('remove')),
  status text not null default 'pending'
    check (status in ('pending','confirmed','rejected','cancelled')),
  confirmed_by_user_id uuid references app_users(id) on delete set null,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists idx_app_roles_role on app_user_roles(role,user_id);
create index if not exists idx_parent_invites_student on parent_invites(student_user_id,status);
create index if not exists idx_parent_links_student on student_parent_links(student_user_id,status);
create index if not exists idx_parent_links_parent on student_parent_links(parent_user_id,status);

-- Regras importantes da aplicação:
-- 1. Não existe pesquisa pública de alunos/pais.
-- 2. A ligação parental nasce de convite seguro criado pelo aluno.
-- 3. O token real nunca deve ser guardado em texto simples: guardar apenas hash.
-- 4. A remoção da ligação não é unilateral no fluxo normal; cria pedido que a outra parte confirma.
-- 5. Roles reviewer/admin nunca são auto-atribuídos pelo utilizador; apenas por administração autorizada.


-- A+ v2.5 — estado do aluno na cloud via Neon Data API + RLS

create table if not exists student_cloud_state (
  auth_user_id text primary key default (auth.user_id()),
  state_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table student_cloud_state enable row level security;

-- A tabela nunca deve estar aberta a utilizadores anónimos.
revoke all on table student_cloud_state from anonymous;
grant select, insert, update, delete on table student_cloud_state to authenticated;

drop policy if exists "student_cloud_state_select_own" on student_cloud_state;
create policy "student_cloud_state_select_own"
on student_cloud_state
for select
to authenticated
using ((select auth.user_id()) = auth_user_id);

drop policy if exists "student_cloud_state_insert_own" on student_cloud_state;
create policy "student_cloud_state_insert_own"
on student_cloud_state
for insert
to authenticated
with check ((select auth.user_id()) = auth_user_id);

drop policy if exists "student_cloud_state_update_own" on student_cloud_state;
create policy "student_cloud_state_update_own"
on student_cloud_state
for update
to authenticated
using ((select auth.user_id()) = auth_user_id)
with check ((select auth.user_id()) = auth_user_id);

drop policy if exists "student_cloud_state_delete_own" on student_cloud_state;
create policy "student_cloud_state_delete_own"
on student_cloud_state
for delete
to authenticated
using ((select auth.user_id()) = auth_user_id);

create index if not exists idx_student_cloud_state_updated
on student_cloud_state(updated_at desc);

-- Resultado:
-- o JWT da sessão é validado pelo Neon Data API;
-- auth.user_id() representa o utilizador autenticado;
-- mesmo que o browser tente pedir o estado de outro auth_user_id,
-- a política RLS impede a leitura/escrita.


-- ============================================================
-- v4.6 — rankings/divisões (ver migration 005 para políticas RLS completas)
-- ============================================================

-- A+ v4.6 — arquitetura de rankings/divisões.
-- IMPORTANTE: estas tabelas ficam preparadas, mas o ranking real ainda NÃO está ativo.
-- O browser nunca deve conseguir ler livremente perfis/XP de outros alunos.
-- A composição de leaderboards deve ser feita por API server-side com regras de privacidade.

create table if not exists ranking_profiles (
  auth_user_id text primary key default (auth.user_id()),
  nickname text,
  school_year text,
  region text,
  school_name text,
  district_opt_in boolean not null default false,
  school_opt_in boolean not null default false,
  leaderboard_enabled boolean not null default true,
  division text not null default 'bronze'
    check (division in ('bronze','silver','gold','platinum','diamond')),
  highest_division text not null default 'bronze'
    check (highest_division in ('bronze','silver','gold','platinum','diamond')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ranking_xp_events (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null,
  event_key text not null,
  week_start date not null,
  occurred_at timestamptz not null,
  activity_kind text not null
    check (activity_kind in ('diagnostic','mission','training','mini_exam','exam')),
  ranked_xp integer not null check (ranked_xp between 0 and 500),
  raw_xp integer not null check (raw_xp between 0 and 500),
  multiplier numeric(5,2) not null check (multiplier between 0 and 1),
  focus_key_hash text,
  server_rule_version integer not null default 1,
  created_at timestamptz not null default now(),
  unique(auth_user_id,event_key)
);

create table if not exists ranking_weekly_totals (
  auth_user_id text not null,
  week_start date not null,
  ranked_xp integer not null default 0 check (ranked_xp >= 0),
  updated_at timestamptz not null default now(),
  primary key(auth_user_id,week_start)
);

create table if not exists ranking_league_memberships (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null,
  week_start date not null,
  division text not null
    check (division in ('bronze','silver','gold','platinum','diamond')),
  league_group_id uuid not null,
  final_position smallint,
  outcome text check (outcome in ('promoted','stay','demoted')),
  finalized_at timestamptz,
  created_at timestamptz not null default now(),
  unique(auth_user_id,week_start)
);

create index if not exists idx_ranking_weekly_xp
  on ranking_weekly_totals(week_start,ranked_xp desc);

create index if not exists idx_ranking_league_group
  on ranking_league_memberships(week_start,division,league_group_id);

create index if not exists idx_ranking_events_user_week
  on ranking_xp_events(auth_user_id,week_start,occurred_at desc);

-- Cada aluno pode gerir/ver apenas o seu próprio perfil/estado via Data API.
-- Os rankings multiutilizador devem ser devolvidos por endpoints server-side
-- que apliquem nickname, opt-in e limiares mínimos de anonimato.

alter table ranking_profiles enable row level security;
alter table ranking_xp_events enable row level security;
alter table ranking_weekly_totals enable row level security;
alter table ranking_league_memberships enable row level security;

revoke all on table ranking_profiles from anonymous;
revoke all on table ranking_xp_events from anonymous;
revoke all on table ranking_weekly_totals from anonymous;
revoke all on table ranking_league_memberships from anonymous;

grant select,insert,update,delete on table ranking_profiles to authenticated;
grant select on table ranking_xp_events to authenticated;
grant select on table ranking_weekly_totals to authenticated;
grant select on table ranking_league_memberships to authenticated;

drop policy if exists "ranking_profiles_own_select" on ranking_profiles;
create policy "ranking_profiles_own_select"
on ranking_profiles for select to authenticated
using ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_profiles_own_insert" on ranking_profiles;
create policy "ranking_profiles_own_insert"
on ranking_profiles for insert to authenticated
with check ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_profiles_own_update" on ranking_profiles;
create policy "ranking_profiles_own_update"
on ranking_profiles for update to authenticated
using ((select auth.user_id())=auth_user_id)
with check ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_profiles_own_delete" on ranking_profiles;
create policy "ranking_profiles_own_delete"
on ranking_profiles for delete to authenticated
using ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_events_own_select" on ranking_xp_events;
create policy "ranking_events_own_select"
on ranking_xp_events for select to authenticated
using ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_totals_own_select" on ranking_weekly_totals;
create policy "ranking_totals_own_select"
on ranking_weekly_totals for select to authenticated
using ((select auth.user_id())=auth_user_id);

drop policy if exists "ranking_league_own_select" on ranking_league_memberships;
create policy "ranking_league_own_select"
on ranking_league_memberships for select to authenticated
using ((select auth.user_id())=auth_user_id);

-- Escrita de XP/totais/divisões fica deliberadamente fora do cliente autenticado.
-- Deve ser feita pelo backend após validar a conclusão real da atividade.
-- Isto reduz cheating por manipulação do JavaScript/browser.


-- ============================================================
-- v4.9 — revisões otimistas e snapshots cloud
-- ============================================================

-- A+ v4.9 — revisões otimistas, device attribution e snapshots server-side.
-- Aplicar apenas quando a cloud Neon estiver a ser ativada/testada.

alter table student_cloud_state
  add column if not exists revision integer not null default 0,
  add column if not exists last_device_id text;

create table if not exists student_cloud_state_history (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null,
  revision integer not null,
  state_json jsonb not null,
  device_id text,
  saved_at timestamptz not null default now()
);

create index if not exists idx_student_cloud_history_user_revision
  on student_cloud_state_history(auth_user_id,revision desc);

-- Guardar automaticamente a versão anterior antes de cada UPDATE.
create or replace function snapshot_student_cloud_state()
returns trigger
language plpgsql
as $$
begin
  insert into student_cloud_state_history(
    auth_user_id,revision,state_json,device_id,saved_at
  ) values (
    old.auth_user_id,
    old.revision,
    old.state_json,
    old.last_device_id,
    coalesce(old.updated_at,now())
  );
  return new;
end;
$$;

drop trigger if exists trg_student_cloud_state_snapshot on student_cloud_state;
create trigger trg_student_cloud_state_snapshot
before update on student_cloud_state
for each row
execute function snapshot_student_cloud_state();

alter table student_cloud_state_history enable row level security;

revoke all on table student_cloud_state_history from anonymous;
grant select on table student_cloud_state_history to authenticated;

drop policy if exists "student_cloud_history_select_own" on student_cloud_state_history;
create policy "student_cloud_history_select_own"
on student_cloud_state_history
for select
to authenticated
using ((select auth.user_id()) = auth_user_id);

-- A aplicação cliente NÃO recebe INSERT/UPDATE/DELETE na tabela de histórico.
-- O trigger server-side é a única via normal de escrita.
--
-- A coluna revision funciona como compare-and-swap:
-- UPDATE ... WHERE auth_user_id = current_user AND revision = expected_revision.
-- Se zero linhas forem alteradas, outro dispositivo avançou a revisão e a app
-- deve bloquear a escrita em vez de sobrescrever silenciosamente.
