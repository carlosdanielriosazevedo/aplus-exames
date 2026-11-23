-- APProva+ — reportes de problemas em perguntas (beta pública).
-- Aprovado pelo product owner em 2026-11-15 (PR "reportes no servidor").
--
-- Minimização de dados: NÃO se guarda nome, email, identificador de conta nem
-- texto livre. Apenas a pergunta, a disciplina, a categoria e a data.
-- Escrita exclusivamente pelo servidor (DATABASE_URL); o browser não tem acesso.
-- Idempotente: pode ser aplicada mais do que uma vez sem efeitos adicionais.

-- Compatibilidade (auditoria externa 2026-11-23, J-01): uma base criada com
-- db/schema.sql (v2.3) já tem uma tabela content_reports com outro formato
-- (external_id, occurred_at...). Sem este passo, o "create table if not exists"
-- seguinte não fazia nada e o índice sobre created_at falhava. A tabela antiga
-- é preservada com outro nome, fechada ao browser, e a nova é criada a seguir.
-- Numa base em que esta migração já correu bem, este bloco não faz nada.
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='content_reports' and column_name='external_id')
     and not exists (select 1 from information_schema.columns
             where table_schema='public' and table_name='content_reports' and column_name='subject_id') then
    if to_regclass('public.content_reports_legacy_v23') is null then
      alter table public.content_reports rename to content_reports_legacy_v23;
    else
      raise exception 'content_reports tem o formato v2.3 e content_reports_legacy_v23 já existe: rever manualmente.';
    end if;
  end if;
end $$;

do $$
begin
  if to_regclass('public.content_reports_legacy_v23') is not null then
    execute 'alter table public.content_reports_legacy_v23 enable row level security';
    execute 'revoke all on table public.content_reports_legacy_v23 from public';
    if exists (select 1 from pg_roles where rolname='anonymous') then
      execute 'revoke all on table public.content_reports_legacy_v23 from anonymous';
    end if;
    if exists (select 1 from pg_roles where rolname='authenticated') then
      execute 'revoke all on table public.content_reports_legacy_v23 from authenticated';
    end if;
  end if;
end $$;

create table if not exists content_reports (
  id uuid primary key default gen_random_uuid(),
  item_id text not null check (char_length(item_id) between 1 and 160),
  subject_id text not null check (subject_id in ('math-a','portuguese','physics-chemistry-a','unknown')),
  category text not null check (category in ('wrong','unclear','difficulty','typo','other')),
  app_version text check (app_version is null or char_length(app_version) <= 64),
  created_at timestamptz not null default now()
);

create index if not exists idx_content_reports_item on content_reports(item_id,created_at desc);
create index if not exists idx_content_reports_created on content_reports(created_at desc);

alter table content_reports enable row level security;
revoke all on table content_reports from public;
revoke all on table content_reports from anonymous;
revoke all on table content_reports from authenticated;
-- Sem políticas para anonymous/authenticated: nenhum acesso pela Data API.

-- Consulta para o product owner (SQL Editor da Neon):
--   select item_id, subject_id, category, count(*) as reportes, max(created_at) as ultimo
--   from content_reports group by 1,2,3 order by reportes desc, ultimo desc;
