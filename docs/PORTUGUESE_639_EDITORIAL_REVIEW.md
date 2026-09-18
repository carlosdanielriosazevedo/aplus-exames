# Revisão editorial profunda — Português 639

> Estado interno do banco original da APProva+. Não constitui validação oficial IAVE nem desbloqueia a disciplina para produção.

## Âmbito

A revisão trabalha sobre os **120 itens** atuais do banco de Português 639. O objetivo desta fase é reduzir pistas involuntárias, distratores demasiado fáceis, equivalentes excessivamente permissivos e explicações circulares, mantendo intacta a política conservadora das respostas abertas.

## Alterações desta passagem

Na vaga 6 foram revistos diretamente os itens `PT639-FND-101`, `106`, `107`, `110`, `113`, `114` e `119`.

- `101`: distratores de leitura explícita tornados mais próximos do texto, reduzindo respostas absurdamente fáceis de eliminar.
- `106`: quatro opções passam a descrever organizações textuais plausíveis e comparáveis.
- `107`: distratores de recurso expressivo substituídos por categorias literárias plausíveis.
- `110`: interpretações alternativas da personagem tornadas semanticamente próximas do estímulo.
- `113`: todas as opções passam a ser operações reais de revisão textual, em vez de erros caricaturais.
- `114`: as quatro opções ficam relacionadas com a tese; a correta distingue-se por construir a cadeia argumentativa mais completa.
- `119`: deixa de aceitar o rótulo genérico `contraste`; a resposta determinística exige agora valor concessivo.

## Novo gate editorial

`scripts/portuguese-editorial-depth-audit.mjs` verifica transversalmente os 120 itens e passa a fazer parte do `Technical Gate`.

O audit confirma, entre outros pontos:

- todas as 70 escolhas múltiplas contra a opção correta **e contra cada distrator**;
- todos os 26 itens de resposta curta contra **todos os equivalentes declarados** e uma resposta negativa sentinela;
- normalização sem duplicados nos equivalentes;
- explicações mínimas e ausência de justificações circulares;
- deteção de assimetrias excessivas de comprimento da resposta correta;
- deteção de acumulação de palavras absolutas que podem denunciar distratores;
- preservação das 24 respostas abertas sem classificação final automática.

## Estado seguinte

A revisão estrutural automática não substitui leitura humana. A próxima passagem editorial deve concentrar-se progressivamente nas vagas 1–5, usando o mesmo critério: plausibilidade dos distratores, precisão linguística, fronteiras de aceitação das respostas curtas e proximidade de formulação ao tipo de raciocínio exigido no exame, sem copiar itens oficiais.
