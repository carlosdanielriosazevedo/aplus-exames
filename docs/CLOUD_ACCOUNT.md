# A+ v2.5 — Conta real e progresso na cloud

## Arquitetura

A v2.5 usa o SDK oficial `@neondatabase/neon-js` para unir:
- Neon Auth;
- Neon Data API.

A password/sessão pertencem ao Neon Auth.

O progresso do aluno é guardado em `student_cloud_state`.

## Segurança

A tabela ativa PostgreSQL Row-Level Security.

Políticas:
- SELECT: apenas `auth.user_id() = auth_user_id`
- INSERT: apenas a própria linha
- UPDATE: apenas a própria linha
- DELETE: apenas a própria linha

A role `anonymous` não tem permissões na tabela.
A role `authenticated` recebe apenas as operações protegidas pelas políticas.

Isto significa que a segurança não depende de esconder um ID no JavaScript.
Mesmo que alguém altere manualmente um pedido no browser, o PostgreSQL aplica a política.

## Sincronização v2.5

É manual de propósito:
- Guardar este dispositivo na cloud
- Carregar progresso da cloud

Ainda não fazemos merge automático entre dois dispositivos porque precisamos de testar conflitos reais primeiro.

## Ativação

No Neon:
1. ativar Auth;
2. ativar Data API;
3. executar `db/migrations/004_v2_5_student_cloud_rls.sql`;
4. copiar os endpoints para Vercel:
   - `NEXT_PUBLIC_NEON_AUTH_URL`
   - `NEXT_PUBLIC_NEON_DATA_API_URL`

Depois de novo deploy, o ecrã Conta A+ deixa o modo local e apresenta login/registo real.

## Nota

Os endpoints `NEXT_PUBLIC_*` não são passwords de base de dados.
São endpoints públicos do serviço. O acesso a dados é autorizado por JWT + RLS.
