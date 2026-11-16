-- APProva+ — prova de consentimento no registo (RGPD art. 7.º, n.º 1).
--
-- Guarda apenas o necessário para demonstrar que a conta confirmou ter 13 anos
-- ou mais e aceitou as versões indicadas dos termos e da política de
-- privacidade. Sem IP, sem browser, sem email. Escrita exclusivamente pelo
-- servidor (DATABASE_URL); o browser não tem acesso.
-- Idempotente: pode ser aplicada mais do que uma vez.

create table if not exists account_consents (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null check (char_length(auth_user_id) between 1 and 200),
  consent_type text not null check (consent_type in ('signup_age13_terms_privacy')),
  terms_version text not null check (char_length(terms_version) <= 32),
  privacy_version text not null check (char_length(privacy_version) <= 32),
  accepted_at timestamptz not null default now(),
  unique (auth_user_id, consent_type, terms_version, privacy_version)
);

create index if not exists idx_account_consents_user on account_consents(auth_user_id);

alter table account_consents enable row level security;
revoke all on table account_consents from public;
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'anonymous') then
    revoke all on table account_consents from anonymous;
  end if;
  if exists (select 1 from pg_roles where rolname = 'authenticated') then
    revoke all on table account_consents from authenticated;
  end if;
end $$;

-- Consulta (SQL Editor da Neon):
--   select consent_type, terms_version, privacy_version, count(*) as contas
--   from account_consents group by 1, 2, 3 order by 1, 2, 3;
