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
