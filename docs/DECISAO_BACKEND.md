# Decisão de backend — v2.3

**Escolha recomendada para a beta: Neon Postgres + Vercel.**

A decisão não impede uma migração futura: os dados continuam em PostgreSQL e a lógica da A+ está isolada da camada de persistência.

A autenticação fica deliberadamente para a próxima fase. Não vamos construir passwords/sessões por conta própria; a opção preferida é avaliar Neon Auth (Better Auth gerido) quando a base estiver ligada.
