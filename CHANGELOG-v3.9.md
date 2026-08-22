# v3.9 — Ponte de Revisão com Professor

- Exportação do caminho mínimo completo para CSV.
- Professor pode rever fora da app.
- Importação do CSV devolvido com pré-validação.
- Aprovação externa exige os 8 critérios do checklist.
- Validação de versão impede aprovar uma pergunta alterada entretanto.
- IDs repetidos, decisões inválidas e revisores em falta são rejeitados.
- Importação atómica: uma linha inválida bloqueia o lote inteiro.
- Auditoria guarda revisor, checklist, fonte e importId.
- Histórico de importações no painel editorial.
- Novo `npm run teacher-review:audit`.
- Novo `npm run teacher-review:pack`.
