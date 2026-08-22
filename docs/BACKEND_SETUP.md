# A+ Exames — ativar Neon Postgres (v2.3)

## Decisão técnica

Para a beta, a proposta passa a ser **Neon Postgres ligado nativamente ao Vercel**. A A+ continua local-first enquanto a ligação não for ativada.

## Porque Neon nesta fase

- PostgreSQL normal, sem formato proprietário para os nossos dados.
- Integração nativa no Vercel.
- Driver serverless adequado ao Next.js.
- Branches de base de dados para previews/testes.
- Plano gratuito suficiente para começar o piloto.
- Neon Auth pode ser ativado numa etapa posterior sem termos de inventar autenticação própria.

## O único passo manual necessário para ativar a BD

1. No projeto `aplus-exames` no Vercel, abrir **Marketplace / Storage**.
2. Adicionar **Neon** ao projeto.
3. Criar uma base nova para A+ Exames.
4. Confirmar que a integração criou `DATABASE_URL` nas variáveis do projeto.
5. No SQL Editor da Neon, executar `db/schema.sql`.
6. Fazer novo deploy no Vercel.
7. Abrir o Painel interno da Beta e carregar em **Sincronizar agora**.

Se `/api/health` devolver `backendReachable: true`, a ligação está operacional.

## Segurança

O browser nunca recebe `DATABASE_URL`. Só as rotas server-side do Next.js usam a credencial. O cliente envia o envelope para `/api/beta/sync`, que valida e faz upserts idempotentes.

## O que é sincronizado

- participante pseudónimo;
- sessões;
- eventos;
- feedback;
- reports;
- resultados de Missões/Mini-exames;
- decisões editoriais;
- lotes de revisão.

## O que ainda não fazemos

- login real do aluno;
- sincronização do estado pedagógico entre dispositivos;
- contas de pais/revisores;
- permissões por role.

Isso entra na fase de autenticação.
