# v4.7 — Missão de Hoje

- Criada janela/modal automático da Missão de Hoje.
- Aparece automaticamente na primeira entrada diária na Home após o Diagnóstico.
- Mostra tema, foco, “porque agora?”, duração estimada, streak e +50 XP competitivo.
- Ações: Começar Missão / Agora não.
- “Agora não” impede repetição irritante no mesmo dia.
- Missão em pausa abre como “Continuar Missão”.
- Sessão de Treino/Mini-exame em pausa tem prioridade sobre o modal.
- Criada atribuição diária persistida: a Missão não muda a meio do dia.
- O que o aluno treinar depois influencia o dia seguinte, não substitui silenciosamente a Missão já atribuída.
- Direct route da Missão usa a atribuição diária congelada.
- Cloud state passa para `aplus-student-state-v6`.
- Persistence state passa para versão 22.
- Eventos beta medem apresentação, adiamento e retoma.
- Novo `npm run daily-mission:audit`.
- Technical Gate passa a validar a Missão de Hoje.
