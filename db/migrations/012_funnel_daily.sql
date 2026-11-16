-- APProva+ — funil anónimo: contagens por dia de passos do percurso.
--
-- Sem dados pessoais: não há conta, dispositivo, IP, idade nem respostas. Cada
-- dispositivo envia cada passo no máximo uma vez; o servidor só soma.
-- Escrita exclusivamente pelo servidor (DATABASE_URL); o browser não tem acesso.
-- Idempotente.

create table if not exists funnel_daily (
  day date not null,
  step text not null check (step in ('app_opened','subjects_selected','diagnostic_completed','first_session_completed','returned_next_day','account_linked')),
  count integer not null default 0 check (count >= 0),
  primary key (day, step)
);

alter table funnel_daily enable row level security;
revoke all on table funnel_daily from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anonymous') then
    revoke all on table funnel_daily from anonymous;
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    revoke all on table funnel_daily from authenticated;
  end if;
end $$;

-- Consulta (SQL Editor da Neon), últimos 30 dias:
--   select step, sum(count) as total
--   from funnel_daily where day >= current_date - 30
--   group by step order by total desc;
