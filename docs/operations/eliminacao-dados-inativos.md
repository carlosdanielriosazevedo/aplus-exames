# Eliminação de contas inativas e de reportes antigos

A política de privacidade (PR #480) promete:
- contas sem atividade há **24 meses** são eliminadas, com todo o progresso;
- reportes de problemas em perguntas são eliminados ao fim de **12 meses**.

Este procedimento é **manual e revisto por uma pessoa**, de propósito: eliminar contas é
irreversível. Corre-se **uma vez por ano** (lembrete: novembro; a primeira conta só pode
ficar inativa 24 meses em novembro de 2028). Local: Neon → APProva+ EU → branch `main`
→ SQL Editor.

## O que conta como atividade
A data mais recente entre: alteração da conta (`neon_auth.user."updatedAt"`), última
sessão (`neon_auth.session."updatedAt"`) e última gravação de progresso
(`public.student_cloud_state.updated_at`). Contas com papel `admin` nunca são incluídas.

## Etapa 1 — listar (só leitura, não altera nada)
```sql
with atividade as (
  select u.id::text as conta,
         u."createdAt" as criada,
         greatest(
           u."updatedAt",
           (select max(s."updatedAt") from neon_auth.session s where s."userId" = u.id),
           (select max(c.updated_at) from public.student_cloud_state c where c.auth_user_id = u.id::text)
         ) as ultima_atividade
  from neon_auth."user" u
  where coalesce(u.role, '') <> 'admin'
)
select conta, criada, ultima_atividade
from atividade
where ultima_atividade < now() - interval '24 months'
order by ultima_atividade;
```
Revê a lista. Anota o **número de linhas** (por exemplo 37).

## Etapa 2 — eliminar (só depois de rever a Etapa 1)
Substitui `0` em `esperado` pelo número de linhas da Etapa 1. Se, entretanto, o número
mudar (alguém voltou a entrar, ou passou o prazo a mais alguém), **nada é apagado** e
aparece um erro: volta à Etapa 1.
```sql
do $$
declare
  esperado constant integer := 0;  -- ← número de linhas da Etapa 1
  ids text[];
  t text;
begin
  select coalesce(array_agg(conta), '{}') into ids from (
    select u.id::text as conta,
           greatest(
             u."updatedAt",
             (select max(s."updatedAt") from neon_auth.session s where s."userId" = u.id),
             (select max(c.updated_at) from public.student_cloud_state c where c.auth_user_id = u.id::text)
           ) as ultima_atividade
    from neon_auth."user" u
    where coalesce(u.role, '') <> 'admin'
  ) a
  where ultima_atividade < now() - interval '24 months';

  if coalesce(array_length(ids, 1), 0) <> esperado then
    raise exception 'Esperava % contas, encontrei %. Nada foi apagado; repete a Etapa 1.',
      esperado, coalesce(array_length(ids, 1), 0);
  end if;
  if esperado = 0 then
    raise notice 'Nenhuma conta para eliminar.';
    return;
  end if;

  -- Dados da APProva+ ligados à conta (só tabelas que existam).
  foreach t in array array['student_cloud_state','student_cloud_state_history','ranking_profiles',
    'ranking_xp_events','ranking_weekly_totals','ranking_league_memberships','account_consents'] loop
    if to_regclass('public.' || t) is not null then
      execute format('delete from public.%I where auth_user_id = any($1)', t) using ids;
    end if;
  end loop;
  -- app_users apaga em cascata papéis, perfis, ligações a pais e dados de piloto.
  if to_regclass('public.app_users') is not null then
    delete from public.app_users where auth_user_id = any(ids);
  end if;

  -- Conta de autenticação (Neon Auth).
  delete from neon_auth.session where "userId"::text = any(ids);
  delete from neon_auth.account where "userId"::text = any(ids);
  delete from neon_auth.member  where "userId"::text = any(ids);
  delete from neon_auth."user"  where id::text = any(ids);

  raise notice 'Eliminadas % contas inativas.', esperado;
end $$;
```
O bloco é atómico: ou apaga tudo, ou não apaga nada.

## Etapa 3 — reportes com mais de 12 meses
Os reportes não têm dados pessoais (só pergunta, disciplina, categoria e data), mas
cumprimos o prazo publicado:
```sql
delete from public.content_reports where created_at < now() - interval '12 months';
```

## Registo
Depois de cada execução, regista aqui a data e os números (sem identificar contas):

| Data | Contas eliminadas | Reportes eliminados | Quem |
|------|-------------------|---------------------|------|
