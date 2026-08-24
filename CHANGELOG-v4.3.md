# v4.3 — Beta por Público-Alvo

- Testers passam a identificar apenas a sua perspetiva: aluno, ex-aluno recente, pai/mãe ou observador adulto.
- Não são recolhidos nome, email nem idade exata.
- “Público-alvo” só é confirmado se o perfil indicar 10.º, 11.º ou 12.º ano.
- Feedback passa a medir sensação de personalização.
- Feedback passa a medir intenção de regressar no dia seguinte.
- Cada feedback fica marcado com o segmento do tester.
- Relatório JSON da beta passa para `aplus-friends-beta-v2`.
- Relatórios incluem `targetFit` e ano escolar, sem identidade pessoal.
- Painel interno consegue importar vários JSON e agregá-los por segmento.
- Feedback de adultos deixa de ser confundido com feedback de alunos atuais.
- Auditoria automática testa segmentação, privacidade, agregação e storage isolado.

- Corrigido o score de prontidão de conteúdo: os pesos teóricos passam a totalizar 100 pontos (antes totalizavam 95). Mesmo com todo o banco atual revisto, o score não chega a 100 enquanto faltarem perguntas em focos críticos — por desenho.
