-- APProva+ — funil anónimo v2: origem (rede) + início do diagnóstico + regresso
-- na semana seguinte. Base do resumo semanal e dos alarmes (2026-11-18).
--
-- Continua sem dados pessoais: a origem é uma categoria fechada (instagram,
-- tiktok, …), nunca o endereço, a campanha ou um identificador.
-- Linhas antigas ficam com origem 'direto'. Idempotente.
--
-- APLICAR ANTES do deploy do código que envia a origem. Se o código chegar
-- primeiro, as contagens não se perdem: o dispositivo guarda-as e reenvia.

alter table funnel_daily add column if not exists source text not null default 'direto';

alter table funnel_daily drop constraint if exists funnel_daily_source_check;
alter table funnel_daily add constraint funnel_daily_source_check
  check (source in ('direto','instagram','tiktok','whatsapp','youtube','facebook','google','escola','outro'));

alter table funnel_daily drop constraint if exists funnel_daily_step_check;
alter table funnel_daily add constraint funnel_daily_step_check
  check (step in ('app_opened','subjects_selected','diagnostic_started','diagnostic_completed','first_session_completed','returned_next_day','returned_week_after','account_linked'));

alter table funnel_daily drop constraint if exists funnel_daily_pkey;
alter table funnel_daily add primary key (day, step, source);

-- Consulta (SQL Editor da Neon), últimos 7 dias por origem:
--   select source, step, sum(count) from funnel_daily
--   where day >= current_date - 7 group by 1,2 order by 1,2;
