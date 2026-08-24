# Funil de Ativação + Retenção — v5.0

## Porque existe

Até esta versão conseguíamos perguntar a um tester:

> “Voltarias amanhã?”

Isso mede intenção, não comportamento.

A v5.0 passa a medir se a pessoa **realmente volta** à app e até onde avança no
primeiro percurso.

O objetivo é separar três coisas:

1. **gostou da ideia**;
2. **conseguiu chegar ao valor principal**;
3. **voltou a usar a app**.

## Funil principal

O funil v1 é:

1. Abriu a app
2. Começou onboarding
3. Completou perfil inicial
4. Definiu objetivo
5. Começou diagnóstico
6. Terminou diagnóstico
7. Viu o primeiro plano
8. Começou a primeira Missão
9. Terminou a primeira Missão

A definição inicial de **ativação** é:

> Diagnóstico concluído + primeira Missão concluída.

Isto é deliberadamente mais exigente do que “criou conta” ou “abriu a Home”.

## Retenção

Aberturas da app são registadas por dia de calendário.

### D1
Abriu a app no dia seguinte ao primeiro uso?

### D3
Abriu a app três dias depois?

### D7
Abriu a app sete dias depois?

Estes checkpoints usam dias exatos, não “qualquer momento dentro de 7 dias”.

## Denominadores corretos

Um tester que começou hoje **não pode contar como falha de D7**.

Cada checkpoint tem:

- `eligible`
- `retained`

Só pessoas cujo tempo de observação já atingiu aquele checkpoint entram no
denominador agregado.

Exemplo:

- 10 testers;
- apenas 4 já começaram há pelo menos 7 dias;
- D7 é calculado sobre 4, não sobre 10.

## Retenção ≠ streak

São métricas diferentes:

**Retenção**
- abriu a app naquele dia.

**Streak**
- realizou atividade de estudo significativa naquele dia.

Um aluno pode abrir a app e sair imediatamente:
- conta para retenção;
- não protege streak.

Isto é útil porque nos permite distinguir:

> “voltou, mas não estudou”

de

> “nem sequer voltou”.

## Intenção vs comportamento

Nos relatórios da beta mostramos lado a lado:

- intenção declarada de voltar (1–5);
- D1 real;
- taxa de ativação.

Se adultos disserem 5/5 mas alunos tiverem D1 baixo, o comportamento real tem mais
peso na decisão de produto.

## Segmentação

Os relatórios continuam separados em:

- alunos atuais;
- ex-alunos recentes;
- pais/mães;
- observadores adultos.

As métricas mais importantes para retenção são as dos alunos atuais.

## Privacidade

`productAnalytics` não inclui:

- nome;
- email;
- password;
- respostas concretas a perguntas;
- notas públicas.

Regista:

- dias de abertura;
- milestones do funil;
- timestamps;
- tipo de evento;
- metadados mínimos de produto.

O relatório continua pseudónimo pelo código do tester.

## Multi-dispositivo

Nesta fase, product analytics permanece local ao teste/browser e é exportado no
relatório da beta.

Não é incluído no estado cloud pedagógico do aluno, para não misturar telemetria de
produto com progresso académico.

Uma solução multi-dispositivo de analytics será desenhada quando existir backend
real da beta.

## Schema

Friends beta:
`aplus-friends-beta-v3`

Product analytics:
`aplus-product-analytics-v1`

Local state:
versão 25.
