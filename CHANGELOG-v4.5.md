# v4.5 — Daily Engagement Loop

- Corrigido o streak: deixa de aumentar por Missão e passa a aumentar por dia.
- Nova estrutura `engagement` independente do motor pedagógico.
- Objetivo diário base de 60 XP.
- Missão, Diagnóstico ou Mini-exame completam o objetivo diário.
- Treino Livre completa o objetivo através de XP.
- Sessão concluída conta para streak mesmo com desempenho fraco.
- Falhar um dia completo quebra a sequência.
- Várias sessões no mesmo dia não inflam o streak.
- Atividades diárias são idempotentes por `sessionId`.
- Home mostra ritmo semanal, streak, XP diário e objetivos cumpridos.
- Resultados mostram estado do objetivo diário.
- Migração remove a interpretação errada do streak legado por Missões.
- Cloud state atualizado para `aplus-student-state-v4`.
- Beta exports passam a incluir engagement.
- Novo `npm run engagement:audit`.
- Technical Gate passa a validar regras de engagement.
