# Português 639 — plano da sexta vaga

> Plano editorial interno. Não representa validação humana nem desbloqueia produção.

## Ponto de partida

O banco tem 100 itens: Leitura 24, Educação Literária 24, Escrita 28 e Gramática 24. As 16 competências escritas têm entre 6 e 8 itens. Existem 58 itens de escolha múltipla, 18 de resposta curta e 24 respostas abertas.

## Objetivo da vaga 6

A sexta vaga deve levar o banco de 100 para **120 itens** sem aumentar os desequilíbrios atuais.

### Distribuição por domínio

| Domínio | Atual | Adicionar | Após vaga 6 |
|---|---:|---:|---:|
| Leitura | 24 | 6 | 30 |
| Educação Literária | 24 | 6 | 30 |
| Escrita | 28 | 2 | 30 |
| Gramática | 24 | 6 | 30 |

Resultado pretendido: **30 itens em cada domínio**.

### Distribuição por competência

- Leitura: acrescentar 2 itens a duas competências e 1 item às outras duas, levando-as de 6 para 7–8 itens.
- Educação Literária: mesma regra, levando as quatro competências de 6 para 7–8 itens.
- Escrita: acrescentar 1 item a `pt-escrita-exposicao` e 1 a `pt-escrita-argumentacao`; o domínio passa a uma faixa de 7–8 itens por competência.
- Gramática: acrescentar 2 itens a duas competências e 1 item às outras duas, levando-as de 6 para 7–8 itens.

A escolha exata das duas competências que recebem +2 em Leitura, Educação Literária e Gramática deve privilegiar variedade cognitiva e dificuldade, não apenas contagem bruta.

### Formatos de resposta

A vaga 6 deve ser determinística para não criar nova dívida de calibração de respostas abertas enquanto o conjunto atual de 24 grelhas continua a ser endurecido.

Meta recomendada: **12 escolhas múltiplas + 8 respostas curtas**. O banco passaria aproximadamente para 70 escolhas múltiplas, 26 respostas curtas e 24 abertas: cerca de 58% / 22% / 20%.

Não acrescentar uma nova resposta aberta sem, no mesmo PR, incluir grelha atómica, orientação específica, calibração textual, casos adversariais e proteção de limite de palavras quando aplicável.

### Operação cognitiva e dificuldade

A seleção dos 20 itens deve ser feita depois de observar a distribuição produzida por `portuguese-bank-shape:audit`. A vaga deve preencher operações cognitivas ou níveis de dificuldade sub-representados; não deve simplesmente repetir a distribuição da vaga anterior.

A dificuldade continua **editorial-provisional**. Nenhum nível pode ser apresentado como calibrado até existirem dados suficientes de alunos reais.

## Critérios de entrada

A vaga 6 só pode ser integrada se:

1. o banco total tiver 120 IDs únicos e originais;
2. cada domínio terminar com 30 itens;
3. cada uma das 16 competências tiver pelo menos 7 itens;
4. as respostas abertas continuarem a representar pelo menos 18% do banco;
5. a resposta curta representar pelo menos 15%;
6. nenhum formato, operação cognitiva ou nível de dificuldade ultrapassar os limites do `portuguese-bank-shape:audit`;
7. o Technical Gate e o build de produção passarem integralmente.
