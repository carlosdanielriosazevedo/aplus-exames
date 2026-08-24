# v5.2 — Teacher Review Operations

- Transformado o roadmap de 64 aprovações em 8 lotes de 8 questões.
- Criado pack operacional em `docs/professor-review-v5.2/`.
- Novo schema externo `teacher-review-v2`.
- Cada linha exportada inclui `pack_id`, `batch_id` e `content_fingerprint`.
- Fingerprint editorial cobre enunciado, opções, resposta, solução, classificação e metadados pedagógicos.
- Aprovação torna-se automaticamente `pending` se o conteúdo mudar depois da revisão.
- Alterações ficam protegidas mesmo quando alguém se esquece de aumentar manualmente a versão.
- Importação rejeita fingerprints desatualizados.
- Decisões contraditórias sobre conteúdo já aprovado passam a conflito explícito.
- Segunda aprovação independente na mesma revisão é registada como quality control.
- Criada amostra determinística de ~10% das aprovações para QC adicional.
- Painel interno mostra lotes, projeção de readiness, fingerprints e aprovações desatualizadas.
- Importação continua atómica quando existem linhas inválidas/conflitos.
- Histórico editorial passa a guardar pack, lote, fingerprint e QC.
- Local state passa para versão 26.
- App version passa para 5.2.0.
- `teacher-review:audit` valida 64 aprovações, 8 lotes, stale invalidation, conflitos e QC.
- Readiness real continua 10%: nenhuma aprovação de professor foi simulada como real.
