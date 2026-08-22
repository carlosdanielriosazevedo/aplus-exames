# v4.1 — IDs Estáveis de Competência

- Criado registo explícito de 69 microcompetências com IDs estáveis.
- Labels de competências ficam separados da identidade interna.
- Labels iniciais ficam preservados como aliases de migração.
- As 93 questões atuais passam a transportar `microcompetencyId`.
- Nova evidência grava `microcompetencyId`.
- `focusScore` passa a agrupar por ID estável, não por texto.
- Grafo causal passa a usar `MICRO_PREREQUISITES`.
- Missões passam a transportar `microcompetencyId`.
- Sinais de Treino Livre e histórico de Missões guardam o ID estável.
- Hipóteses causais passam a usar chaves estáveis.
- Migração automática de estados antigos com `migratePedagogicalIds`.
- Cloud state passa para `aplus-student-state-v3`, mantendo leitura v1/v2.
- Novo `npm run competency-id:audit`.
- O gate técnico passa a incluir a auditoria dos IDs pedagógicos.
