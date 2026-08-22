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
