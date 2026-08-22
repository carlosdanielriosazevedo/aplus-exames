# Fiabilidade da beta — v3.5

## Problema
Numa app real, o mesmo botão pode ser acionado duas vezes, o browser pode recarregar
no momento de conclusão ou um rascunho antigo pode reaparecer.

Se a conclusão não for idempotente, isso pode:
- dar XP duas vezes;
- duplicar evidência;
- duplicar um exame no histórico;
- distorcer métricas da beta.

## Idempotência local
Missão, Treino Livre e Mini-exame usam o ID da sessão como chave de conclusão.
Antes de gravar uma conclusão, o cliente reclama essa chave num registo local síncrono.

A segunda tentativa com a mesma chave é ignorada.

## Rastreabilidade
- `completionId` nas Missões;
- `completionId` nos Mini-exames;
- `sessionId` nos eventos de fim;
- `originSessionId` nos sinais vindos do Treino Livre.

## Auditoria
O Painel Beta passa a procurar:
- IDs de sessão duplicados;
- IDs de eventos duplicados;
- conclusões repetidas;
- várias sessões abertas do mesmo tipo;
- telemetria impossível.

## Limite
Isto protege a beta local. Quando a cloud estiver ativa, a idempotência crítica terá
também de ser aplicada no servidor/base de dados.
