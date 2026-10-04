# FQ A — Beta Candidate

Este documento define o corte mínimo para considerar Física e Química A pronta para teste externo controlado.

## Percurso obrigatório

O candidato a beta tem de preservar, sem atalhos nem ecrãs paralelos:

1. entrada/configuração da disciplina;
2. diagnóstico;
3. regresso ao menu Aprender sem iniciar automaticamente a Missão;
4. Missão;
5. Praticar;
6. Rever Matéria;
7. Mini-exame;
8. Exame Completo 715;
9. correção e revisão pós-prova;
10. Progresso;
11. Ranking e navegação principal.

## Regras de qualidade

- A resposta submetida fica fechada; o feedback serve para a próxima questão.
- Respostas abertas e por etapas podem ter correção automática, mas a incerteza tem de permanecer explícita.
- O Índice de Preparação de FQ A não pode ser apresentado como previsão da nota de exame.
- O conteúdo e os fluxos de 11.º ano continuam protegidos pelo gate específico de prontidão.
- O bundle total por rota continua sujeito ao orçamento de performance existente.
- Apronso e a navegação principal têm de permanecer visíveis e coerentes em desktop e mobile.

## Gate

`scripts/fqa-beta-candidate-audit.mjs` verifica o wiring ponta a ponta do candidato a beta e está incluído no `technical:gate`.

Este gate complementa — não substitui — os audits de conteúdo, corretor, 11.º ano, performance e experiência do aluno.
