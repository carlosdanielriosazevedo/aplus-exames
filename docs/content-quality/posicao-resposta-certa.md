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
