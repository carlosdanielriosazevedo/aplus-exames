# v5.0 — Activation Funnel + Retention

- Criado `app/lib/productAnalytics.js`.
- Registo pseudónimo de dias reais de abertura da app.
- Funil principal:
  app → onboarding → perfil → objetivo → diagnóstico → plano → primeira Missão.
- Ativação definida como Diagnóstico + primeira Missão concluídos.
- Métricas D1, D3 e D7 por dia exato.
- Checkpoints só entram no denominador quando o tester é elegível temporalmente.
- Retenção separada de streak.
- Primeira abertura, onboarding, diagnóstico, plano e primeira Missão instrumentados.
- Reabertura da app por `visibilitychange` atualiza dias ativos sem duplicar o dia.
- Painel interno passa a mostrar funil, ativação e D1/D3/D7 reais.
- Relatórios externos mostram intenção declarada e comportamento real lado a lado.
- Agregação continua segmentada por aluno atual / ex-aluno / pai-mãe / observador.
- `friendsBetaReport` passa para `aplus-friends-beta-v3`.
- Relatórios v2 continuam importáveis.
- `exportBetaPayload` inclui `productAnalytics`.
- Local persistence passa para versão 25.
- Sync envelope de beta inclui analytics; cloud pedagógica do aluno não.
- Novo `npm run retention:audit`.
- Technical Gate passa a validar retention eligibility, funil e agregação.
