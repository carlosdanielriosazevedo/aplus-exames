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
