# Prontidão de conteúdo para beta — v3.6

A app deixa de usar apenas “número de perguntas” como sinal de prontidão.

## Critérios mínimos para beta fechada

### Diagnóstico
Cada um dos 7 temas-núcleo do diagnóstico precisa de:
- pelo menos uma âncora revista;
- pelo menos um probe revisto.

### Missões
Nos focos de temas de maior relevância curricular, o objetivo mínimo é ter
duas evidências independentes revistas por foco. O gate de beta exige pelo menos
55% destes focos cobertos antes de considerar o banco suficientemente robusto.

### Mini-exame
Mínimo:
- 8 itens independentes revistos;
- 6 temas diferentes;
- 3 tipos cognitivos diferentes.

### Estrutura
Erros automáticos do banco têm de ser zero.

## O que o score não significa
O score de prontidão não é uma classificação da qualidade pedagógica.
É um checklist operacional para impedir que uma interface funcional nos faça
confundir “a app corre” com “a app já pode medir alunos reais”.

## Professor
O sistema cria uma fila de revisão priorizada por impacto:
diagnóstico → exame → missões → relevância/pré-requisitos → lacunas de revisão.

`npm run content:readiness` gera também um CSV com as 30 questões cuja revisão
mais aproxima o produto de uma beta.
