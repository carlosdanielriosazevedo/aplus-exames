# v4.8 — Memória Pedagógica v2

- Criado `app/lib/pedagogicalMemory.js`.
- Hipóteses causais passam a ter ciclo de vida explícito.
- Estados: open, probable_prerequisite, probable_target, ambiguous, resolved, stale.
- Hipóteses com >30 dias sem evidência tornam-se `stale`.
- Hipóteses resolvidas/desatualizadas podem reabrir perante nova evidência.
- Separados contadores históricos de observações recentes.
- Resolução automática exige Domínio + Certeza + quantidade mínima de evidência.
- Missões de Investigação deixam de perseguir hipóteses resolvidas/desatualizadas.
- `probable_target` passa a ser tratado preferencialmente pelo motor normal de prioridade.
- Memória é refrescada após Diagnóstico, Missão e Mini-exame.
- Área Progresso mostra estados humanos e histórico recente fechado.
- Migração automática dos antigos estados em português.
- Cloud state passa para `aplus-student-state-v7`.
- Local persistence passa para versão 23.
- Novo `npm run pedagogical-memory:audit`.
- Technical Gate passa a validar o ciclo completo open → probable → ambiguous → resolved/stale → reopen.
