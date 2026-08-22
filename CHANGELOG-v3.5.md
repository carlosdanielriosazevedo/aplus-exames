# v3.5 — Fiabilidade e Idempotência da Beta

- Conclusão de Missão, Treino e Mini-exame passa a ser idempotente no dispositivo.
- Duplo clique/refresh não deve voltar a contabilizar a mesma conclusão.
- Mini-exames passam a transportar o ID estável da sessão.
- Missões e Mini-exames guardam `completionId`.
- Eventos de fim guardam `sessionId`.
- Sinais de Treino guardam `originSessionId`.
- Novo auditor de integridade no Painel Beta.
- Novo `npm run reliability:audit`.
