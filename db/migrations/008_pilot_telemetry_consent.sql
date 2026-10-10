-- APProva+ v5.7 — consentimento e telemetria mínima do piloto
-- A escolha entre pilot_self e pilot_minor é uma decisão de produto/jurídica,
-- não uma inferência automática da base de dados.
--
-- Nota operacional: este ficheiro contém uma função PL/pgSQL delimitada por $$.
-- O helper prepare_database_migration da Neon divide SQL de forma incompatível com
-- esse corpo e pode acusar "unterminated dollar-quoted string". Para validação e
-- promoção desta migration, aplicar ESTE ficheiro verbatim com psql -v ON_ERROR_STOP=1 -f.

create table if not exists consent_records (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  guardian_user_id uuid references app_users(id) on delete cascade,
  consent_type text not null check (consent_type in ('pilot_self','pilot_minor')),
  policy_version text not null,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  retention_until timestamptz not null,
  is_test boolean not null default false,
  created_at timestamptz not null default now(),
  check (revoked_at is null or revoked_at >= granted_at)
);

create unique index if not exists uq_consent_active_grant
  on consent_records(student_user_id,consent_type)
  where revoked_at is null;
create index if not exists idx_consent_student_active
  on consent_records(student_user_id,consent_type,revoked_at);

create table if not exists pilot_event_aggregates (
  student_user_id uuid not null references app_users(id) on delete cascade,
  period_date date not null,
  event_type text not null check (event_type in (
    'app_session','diagnostic_completed','practice_completed','mission_completed',
    'mini_exam_completed','full_exam_completed','review_opened',
    'onboarding_started','onboarding_completed','onboarding_abandoned'
  )),
  subject text not null default 'all' check (subject in ('all','math-a','portuguese','physics-chemistry-a')),
  total_count integer not null default 0 check (total_count >= 0),
  total_seconds integer not null default 0 check (total_seconds between 0 and 86400),
  retention_until timestamptz not null,
  is_test boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (student_user_id,period_date,event_type,subject)
);
create index if not exists idx_pilot_event_metrics
  on pilot_event_aggregates(period_date,event_type,subject)
  where is_test=false;

create table if not exists pilot_item_results (
  student_user_id uuid not null references app_users(id) on delete cascade,
  external_id text not null,
  item_id text not null check (item_id ~ '^[A-Za-z0-9][A-Za-z0-9:_./-]{0,159}$'),
  outcome text not null check (outcome in ('correct','partial','incorrect','skipped')),
  seconds integer not null default 0 check (seconds between 0 and 86400),
  occurred_on date not null,
  subject text not null default 'all' check (subject in ('all','math-a','portuguese','physics-chemistry-a')),
  retention_until timestamptz not null,
  is_test boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (student_user_id,external_id)
);
create index if not exists idx_pilot_item_results_date
  on pilot_item_results(student_user_id,occurred_on,subject,item_id);
create index if not exists idx_pilot_item_metrics
  on pilot_item_results(occurred_on,subject,item_id,outcome)
  where is_test=false;

create table if not exists pilot_feedback (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references app_users(id) on delete cascade,
  external_id text not null,
  feedback_type text not null check (feedback_type in ('general','clarity','difficulty','usefulness','bug','other')),
  subject text not null default 'all' check (subject in ('all','math-a','portuguese','physics-chemistry-a')),
  rating smallint check (rating between 1 and 5),
  comment text check (comment is null or char_length(comment) <= 2000),
  occurred_at timestamptz not null,
  retention_until timestamptz not null,
  is_test boolean not null default false,
  received_at timestamptz not null default now(),
  unique(student_user_id,external_id)
);
create index if not exists idx_pilot_feedback_metrics
  on pilot_feedback(received_at,subject,feedback_type)
  where is_test=false;

-- Marcador server-only das contas usadas nos smoke tests.
create table if not exists pilot_test_accounts (
  student_user_id uuid primary key references app_users(id) on delete cascade,
  label text,
  created_at timestamptz not null default now()
);

-- Rate limit persistente: funciona mesmo com várias Functions/serverless instances.
create table if not exists pilot_sync_rate_limits (
  student_user_id uuid primary key references app_users(id) on delete cascade,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists app_schema_meta (
  singleton boolean primary key default true check (singleton),
  schema_version integer not null,
  migration_name text not null,
  updated_at timestamptz not null default now()
);

insert into app_schema_meta(singleton,schema_version,migration_name,updated_at)
values (true,8,'008_pilot_telemetry_consent',now())
on conflict (singleton) do update set
  schema_version=excluded.schema_version,
  migration_name=excluded.migration_name,
  updated_at=excluded.updated_at;

-- Apaga os dados do piloto do próprio utilizador e revoga, mas não destrói,
-- o registo de consentimento. Isto preserva prova de granted_at/policy_version/revogação.
create or replace function delete_own_pilot_data(p_auth_user_id text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  target_id uuid;
  n_aggregates integer := 0;
  n_items integer := 0;
  n_feedback integer := 0;
  n_consents integer := 0;
begin
  select id into target_id from app_users where auth_user_id=p_auth_user_id limit 1;
  if target_id is null then
    return jsonb_build_object('aggregates',0,'itemResults',0,'feedback',0,'consentsRevoked',0);
  end if;

  delete from pilot_event_aggregates where student_user_id=target_id;
  get diagnostics n_aggregates = row_count;
  delete from pilot_item_results where student_user_id=target_id;
  get diagnostics n_items = row_count;
  delete from pilot_feedback where student_user_id=target_id;
  get diagnostics n_feedback = row_count;
  update consent_records
    set revoked_at=coalesce(revoked_at,now())
    where student_user_id=target_id and revoked_at is null;
  get diagnostics n_consents = row_count;
  delete from pilot_sync_rate_limits where student_user_id=target_id;

  return jsonb_build_object(
    'aggregates',n_aggregates,
    'itemResults',n_items,
    'feedback',n_feedback,
    'consentsRevoked',n_consents
  );
end;
$$;

revoke all on function delete_own_pilot_data(text) from public;
revoke all on function delete_own_pilot_data(text) from anonymous;
revoke all on function delete_own_pilot_data(text) from authenticated;

-- RLS: mesmo princípio da migration 007. O browser não escreve diretamente
-- consentimento, telemetria, marcadores de teste ou estado de rate limit.
alter table consent_records enable row level security;
alter table pilot_event_aggregates enable row level security;
alter table pilot_item_results enable row level security;
alter table pilot_feedback enable row level security;
alter table pilot_test_accounts enable row level security;
alter table pilot_sync_rate_limits enable row level security;
alter table app_schema_meta enable row level security;

revoke all on table consent_records from anonymous;
revoke all on table pilot_event_aggregates from anonymous;
revoke all on table pilot_item_results from anonymous;
revoke all on table pilot_feedback from anonymous;
revoke all on table pilot_test_accounts from anonymous;
revoke all on table pilot_sync_rate_limits from anonymous;
revoke all on table app_schema_meta from anonymous;

revoke insert,update,delete on table consent_records from authenticated;
revoke insert,update,delete on table pilot_event_aggregates from authenticated;
revoke insert,update,delete on table pilot_item_results from authenticated;
revoke insert,update,delete on table pilot_feedback from authenticated;
revoke all on table pilot_test_accounts from authenticated;
revoke all on table pilot_sync_rate_limits from authenticated;
revoke insert,update,delete on table app_schema_meta from authenticated;

grant select on table consent_records to authenticated;
grant select on table pilot_event_aggregates to authenticated;
grant select on table pilot_item_results to authenticated;
grant select on table pilot_feedback to authenticated;
grant select on table app_schema_meta to authenticated;

drop policy if exists "consent_records_select_self" on consent_records;
create policy "consent_records_select_self"
on consent_records for select to authenticated
using (
  student_user_id = (
    select id from app_users where auth_user_id = (select auth.user_id())
  )
  or guardian_user_id = (
    select id from app_users where auth_user_id = (select auth.user_id())
  )
);

drop policy if exists "pilot_event_aggregates_select_self" on pilot_event_aggregates;
create policy "pilot_event_aggregates_select_self"
on pilot_event_aggregates for select to authenticated
using (student_user_id = (select id from app_users where auth_user_id = (select auth.user_id())));

drop policy if exists "pilot_item_results_select_self" on pilot_item_results;
create policy "pilot_item_results_select_self"
on pilot_item_results for select to authenticated
using (student_user_id = (select id from app_users where auth_user_id = (select auth.user_id())));

drop policy if exists "pilot_feedback_select_self" on pilot_feedback;
create policy "pilot_feedback_select_self"
on pilot_feedback for select to authenticated
using (student_user_id = (select id from app_users where auth_user_id = (select auth.user_id())));

drop policy if exists "app_schema_meta_select_authenticated" on app_schema_meta;
create policy "app_schema_meta_select_authenticated"
on app_schema_meta for select to authenticated
using (true);
