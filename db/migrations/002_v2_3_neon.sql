-- Executar apenas se a base já tiver o schema da v2.2.

alter table editorial_reviews add column if not exists external_key text;
create unique index if not exists uq_editorial_reviews_external_key on editorial_reviews(external_key) where external_key is not null;

create table if not exists beta_results (
  id uuid primary key default gen_random_uuid(),
  external_key text not null unique,
  participant_id uuid not null references beta_participants(id) on delete cascade,
  result_kind text not null,
  occurred_at timestamptz not null,
  payload jsonb not null default '{}'::jsonb
);
create index if not exists idx_beta_results_participant on beta_results(participant_id,occurred_at desc);
