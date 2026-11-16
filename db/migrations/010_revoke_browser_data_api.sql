-- APProva+ — o browser deixa de aceder diretamente à base de dados.
--
-- Desde a v5.5 (PR #474) todo o progresso passa por /api/cloud/state, no
-- servidor, que usa DATABASE_URL (dono da base de dados). Os papéis da Data API
-- da Neon (`authenticated`, `anonymous`) já não são usados pela app. Retirar-lhes
-- os privilégios fecha um caminho de ataque sem alterar o comportamento.
-- O RLS mantém-se ligado como segunda barreira.
--
-- Idempotente e reversível (as permissões antigas estão nas migrações 004–008).
-- Corre no SQL Editor da Neon, branch `main`, como neondb_owner.

do $$
declare
  role_name text;
  t record;
begin
  foreach role_name in array array['authenticated','anonymous'] loop
    if exists (select 1 from pg_roles where rolname = role_name) then
      for t in select tablename from pg_tables where schemaname = 'public' loop
        execute format('revoke all on table public.%I from %I', t.tablename, role_name);
      end loop;
      execute format('revoke all on all sequences in schema public from %I', role_name);
      -- Tabelas criadas no futuro também não ficam acessíveis pelo browser.
      execute format('alter default privileges in schema public revoke all on tables from %I', role_name);
      execute format('alter default privileges in schema public revoke all on sequences from %I', role_name);
    end if;
  end loop;
end $$;

-- Verificação (deve devolver 0 linhas):
--   select grantee, table_name, string_agg(privilege_type, ', ') as privilegios
--   from information_schema.role_table_grants
--   where table_schema = 'public' and grantee in ('authenticated','anonymous')
--   group by 1, 2 order by 1, 2;
