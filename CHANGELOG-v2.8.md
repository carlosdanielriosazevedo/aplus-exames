# v2.8 — Mapa por Competências

## Mudança estrutural
A A+ deixa de inferir apenas um score agregado por tema.
Cada evidência passa também a ficar associada ao `focus`/competência avaliada.

Exemplo:
- Funções: 68/100
  - Domínio e zeros: 84/100
  - Representações: 71/100
  - Monotonia e extremos: 43/100

## Motor de Missões
Depois de selecionar o tema prioritário, o motor escolhe a competência específica que oferece a melhor oportunidade de evolução.
A questão seguinte é procurada primeiro dentro desse foco.

## Evidência
Não foi criada uma segunda base de dados de scores. Os scores de competência são derivados da mesma evidência pedagógica, filtrada pelo foco. Isto evita inconsistências entre o score do tema e os seus componentes.

## Compatibilidade
Evidência antiga que não tenha `focus` explícito é recuperada através do `itemId` e do banco de questões. Por isso não é necessário apagar o progresso local da versão anterior.

## Progresso
Cada tema passa a mostrar as competências internas com:
- Domínio;
- Certeza da A+;
- estado sem evidência quando aplicável.

## Resultados de Missão
O resultado destaca primeiro a competência efetivamente trabalhada e, abaixo, mostra o impacto agregado no tema.

## Objetivo
Distinguir dificuldades que antes ficavam escondidas dentro do mesmo tema e permitir ao motor responder com maior precisão:
> não apenas “precisas de Funções”, mas “precisas de trabalhar Monotonia e extremos”.
