# Referências e estado técnico

Observação local em 2026-10-31, base `118021d48ae354ec28b029c132d943d5a20b1c4f`. Código não equivale a funcionalidade publicada.

| Área | Fonte principal e âmbito |
| --- | --- |
| Missão e regras de produto | [AGENTS](../../AGENTS.md): XP/esforço separado do conhecimento; missão diária congelada; evidência independente; privacidade; IAVE; ícone bloqueado |
| Arquitetura | [Regras](../ARCHITECTURE_RULES.md), [backend](../DECISAO_BACKEND.md), [setup](../BACKEND_SETUP.md) |
| Recuperação e progresso | [Beta reliability](../BETA_RELIABILITY.md), [cloud reliability](../CLOUD_RELIABILITY_V4_9.md), [diagnóstico](../block1-2-diagnostic-resume-proof.md), [memória pedagógica](../PEDAGOGICAL_MEMORY_LIFECYCLE.md) |
| Aprendizagem e missões | [Evidence model](../EVIDENCE_MODEL_V2.md), [orquestrador](../MISSION_ORCHESTRATOR.md), [planeador](../TEMPORAL_PLANNER.md) |
| Segurança e contas | [Auth](../AUTH_ROLES.md), [ranking](../RANKING_BACKEND_SECURITY.md), [conta cloud](../CLOUD_ACCOUNT.md) |
| Validação pedagógica | [Política híbrida](../HYBRID_CONTENT_VALIDATION_V5_5.md), [pipeline matemático](../MATH_VALIDATION_PIPELINE.md), [revisões](../EDITORIAL_REVISIONS_V5_3.md) |
| Design | [Superfície beta](../BETA_STUDENT_SURFACE.md), [arte aprovada](../brand/approved-final-artwork-2026-10-30.md), [bloqueios de marca](../../AGENTS.md) |
| Testes e auditorias | [Estratégia](../testing-strategy.md), [gate](../TECHNICAL_GATE.md), [não regressão](../non-regression-policy.md), [CI executável](../../.github/workflows/beta-ci.yml) |
| Pendências | [Backlog](../PRODUCT_BACKLOG.md), [conteúdo](../CONTENT_BETA_READINESS.md), [RC histórico](../releases/rc-412-readiness.md), [triagem](../public-beta-feedback-triage.md) |

A base usa Next.js 15.5.24, React 18.3.1, Vitest e integração Neon opcional. `package.json` e lockfile são a referência executável; CI usa Node 20 e `npm ci --legacy-peer-deps --no-audit --no-fund`. O laboratório Vercel foi removido do ambiente, não é pré-requisito de desenvolvimento.

## Pendências com origem identificada

- Animações contextuais reais de Apronso: compromisso pendente em AGENTS; não alterar os assets bloqueados.
- Licenciamento IAVE: restrição vigente em AGENTS, sem inferir autorização do código existente.
- Evolução dos testes de componentes/browser/RLS: consultar estratégia e CI, distinguindo o que já executa do roteiro.
- Exportação APP EN, seleção validada, revisão sensível e associação de repositório privado: pendentes; nenhuma conversa foi consultada.
- Estado atual de produção: por verificar nesta tarefa. O relatório RC de 24/10 é evidência histórica, não observação atual.

Nenhum destes registos autoriza alterações de produto, pedagogia, segurança ou produção.
