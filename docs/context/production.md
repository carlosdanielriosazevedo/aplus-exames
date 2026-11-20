# Verificar o estado real

Registar data/hora, fonte e resultado em cada consulta. Em 31/10/2026, `git fetch origin main` confirmou a base `118021d48ae354ec28b029c132d943d5a20b1c4f`. A API GitHub devolveu Forbidden; CI/PRs não foram verificados por API. Vercel não foi consultada nesta tarefa.

| Estado | Evidência mínima |
| --- | --- |
| Discutido | Fonte e contexto; sem inferir aprovação |
| Aprovado | Aprovação identificável, autoridade e âmbito |
| Implementado | Commit e caminhos concretos, testes pertinentes |
| Integrado | Commit presente na branch alvo e PR correspondente |
| Publicado | Deployment Vercel READY do SHA exato e alias efetivo |
| Validado | Check funcional no deployment identificado, com resultado e limites |

## Procedimento somente de leitura

1. `git fetch origin main`; guardar `git rev-parse origin/main` e comparar com o commit de interesse usando `git merge-base --is-ancestor`.
2. Consultar PR e checks no GitHub para esse SHA. Não reutilizar aprovação de outro SHA. Uma falha de API não demonstra falta de acesso Git.
3. No projeto Vercel existente `aplus-exames`, consultar deployments, estados e aliases com acesso autorizado. Confirmar projeto, SHA, deployment ID, READY, destino production e domínio efetivamente associado. Não criar outro projeto.
4. Consultar `/api/health` no destino confirmado e executar smoke não destrutivo autorizado; health isolado não prova todas as funcionalidades, autenticação ou RLS.
5. Registar evidência, limitações e testes não executados. Sem acesso, marcar desconhecido; nunca promover um relatório histórico a verdade atual.

Não executar migrations, resets de sessões/progresso, promoção de aliases ou rollback durante uma verificação. Ler [RC histórico](../releases/rc-412-readiness.md) para riscos de recuperação e publicação automática, sem tratar esse documento como autorização atual.
