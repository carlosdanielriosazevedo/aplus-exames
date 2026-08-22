# A+ Exames — v2.3

## Neon Postgres: backend real preparado para ativação

- Escolha técnica para a beta: Neon Postgres integrado com Vercel.
- Dependência `@neondatabase/serverless` (linha 1.1.x).
- `/api/health` testa uma ligação real à base.
- `/api/beta/sync` deixou de ser apenas proxy: faz ingestão direta e idempotente no PostgreSQL.
- Upsert de participantes e sessões.
- Deduplicação por IDs externos para eventos, feedback e reports.
- Sincronização de Missões/Mini-exames para `beta_results`.
- Sincronização do histórico editorial e lotes de revisão.
- Mantém comportamento local-first se `DATABASE_URL` não existir ou a sincronização falhar.
- Novo migration SQL e documentação de ativação.

## Ainda não incluído

- autenticação;
- contas multi-dispositivo;
- roles aluno/pai/revisor/admin;
- sincronização central do mapa de Domínio.

Esses pontos devem entrar depois de ativarmos e validarmos a base real.
