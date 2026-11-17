# Posição da resposta certa nas perguntas de escolha múltipla (2026-11-16)

## Problema
O product owner notou que a resposta certa "nunca era duas vezes seguidas a mesma letra". Medido no banco completo:

| Banco | Repetição da letra entre perguntas seguidas | Observação |
|---|---|---|
| Matemática · piloto (100) | 0% | A, B, C, D, A, B… sem exceção |
| Matemática · diagnóstico (226) | 20% | 60% das certas na opção A |
| Português (647) | 12% | rotação pela soma dos códigos do ID |
| Física e Química A (569) | 11% | rotação pela soma dos códigos do ID |
| Mini-exames de Português (37) | 0% | — |

Ao acaso, com 4 opções, a letra repete-se cerca de 25% das vezes. Um padrão de rotação é aprendível: um aluno atento elimina opções sem saber a matéria.

## Regra
`app/lib/optionOrder.js`: cada pergunta tem uma posição-alvo fixa, calculada por hash estável do ID (FNV-1a + finalizador MurmurHash3). As posições são independentes entre perguntas e iguais em todos os dispositivos. As opções erradas mantêm a ordem relativa. Opções numéricas ordenadas não são mexidas.

Aplicada aos bancos vNext de Matemática (`engine.js`), a Português (`PORTUGUESE_ALL_ITEMS` e textos dos mini-exames) e a FQ A (`PHYSICS_CHEMISTRY_A_ALL_ITEMS`). O `QUESTION_BANK` base de Matemática mantém a sua regra, porque tem atestações de máquina presas ao fingerprint.

Resultado: repetição de ~25% e letras equilibradas em todos os bancos. Guarda: `tests/unit/optionOrder.test.mjs`.

## Sessões em curso
- Matemática: as sessões guardam cópia das perguntas; o diagnóstico já tratava mudanças de conteúdo pelo fingerprint.
- Português e FQ A guardam o índice escolhido: `legacyOptionIndex` converte índices antigos. Marca de versão em `lastPosition.optionOrder`, ao lado do rascunho de Português (`miniExamDraftOptionOrder`) e numa chave própria para rascunhos de FQ A. Os módulos de armazenamento congelados (#385) não foram alterados.

## Pendente
A posição deixou de ser pista; o **comprimento** ainda é: em Português, a certa é claramente a opção mais longa (≥1,2×) em 67% das perguntas de literatura. Corrigido por reescrita editorial das opções erradas, obra a obra.

## Comprimento das opções em Português (2026-11-17)
Reescrita editorial das 448 perguntas de escolha múltipla de literatura (25 obras), sem mudar a resposta certa:
- **1.ª passagem (300 perguntas):** as opções erradas curtas e absurdas («Elimina a unidade da obra.») passam a leituras plausíveis mas erradas da obra, com tamanho e tom próximos da certa. Fica uma errada curta por pergunta. Nos casos de respostas certas muito longas, a certa foi encurtada sem perder precisão. Nos heterónimos, várias erradas passam a ser traços de outro heterónimo, ao estilo dos exames.
- **2.ª passagem (136 perguntas):** uma das erradas foi alongada para que «escolher a opção mais longa» deixe de compensar.

| Literatura | Antes | Depois |
|---|---|---|
| A certa é a opção mais longa | 85% | 31% |
| A certa é claramente a mais longa (≥1,2×) | 67% | 2% |

Guarda: `tests/unit/optionLengthCue.test.mjs` (literatura ≤35% / ≤5%; perguntas de base sem piorar).

### Pendente
- Perguntas de base de Português (199): a certa é a mais longa em 52% e claramente a mais longa em 35%. É a próxima reescrita.
- Na literatura, a certa raramente é a opção mais curta (2%). A errada curta que ficou continua fácil de eliminar. É uma pista fraca, mas existe.
- Reescrita feita sem professor. Fica sujeita à revisão pedagógica já prevista.
