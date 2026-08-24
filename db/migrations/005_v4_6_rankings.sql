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
