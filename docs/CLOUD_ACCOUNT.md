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

## Terminar sessão e dispositivos partilhados (2026-11-20)

Decisão do product owner: a conta é a fonte de verdade; o dispositivo é só uma
cópia temporária. Lógica em `app/lib/logoutPlan.js`, testes em
`tests/unit/logoutPlan.test.mjs`.

| Situação ao carregar em «Terminar sessão» | O que acontece |
|---|---|
| Progresso confirmado na conta, nada a meio | Apaga tudo deste dispositivo, sem perguntar |
| Missão, diagnóstico ou treino a meio | Aviso de uma linha («recomeça na próxima vez»); «Sair» apaga |
| Mini-exame, exame de FQ A ou texto de Português a meio | Aviso forte, «Voltar e terminar» em destaque; «Sair e apagar» |
| Sem confirmação da conta (sem rede, sessão expirada) | Nunca apaga: «Ficar e tentar outra vez» ou «Sair e guardar só neste dispositivo» (arquivo local da conta, invisível ao próximo aluno) |

A antiga caixa «Computador partilhado?» foi retirada: o comportamento seguro passou a ser o normal.

**Irmãos no mesmo dispositivo.** Progresso anónimo (estudo feito sem conta)
nunca entra numa conta sem o aluno confirmar «Sim, é meu». Se escolher
«Não é meu», esse progresso é posto à parte no dispositivo (não é enviado nem
apagado), a app carrega o progresso da conta, e o progresso posto à parte volta a
aparecer quando essa conta terminar sessão. Progresso ligado a outra conta é
sempre bloqueado (nem enviado nem substituído).

**Vários dispositivos.** Cada alteração é gravada na conta poucos segundos depois;
ao esconder o separador grava logo. Ao abrir a app, voltar ao separador ou à
janela, a app consulta a conta e aplica (ou junta) o progresso feito noutro
dispositivo. Não há consultas periódicas, para a base de dados poder adormecer.
