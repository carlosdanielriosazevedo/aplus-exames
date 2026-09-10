# Reforço de qualidade do banco vNext — 10 de setembro de 2026

## Resultado desta passagem

- Banco preservado: 113 ficheiros e 5650 perguntas.
- Avisos estruturais reduzidos de 36 para 0.
- Bloqueios estruturais: 0.
- Vinte enunciados ou soluções demasiado curtos foram reescritos para explicitar a tarefa ou o método.
- Dezasseis perguntas repetidas entre submatérias foram substituídas por variantes independentes.
- Sete distratores artificiais, que apenas acrescentavam um ponto de interrogação a outra opção, foram substituídos por erros matemáticos plausíveis.
- Quatro perguntas com opções numericamente equivalentes foram corrigidas.

## Proteções acrescentadas

O auditor estrutural passa a bloquear:

- opções iguais apesar de diferenças irrelevantes de pontuação final;
- números, decimais, percentagens ou frações equivalentes em duas opções.

Além disso, passa a assinalar como aviso qualquer solução que se limite a repetir a opção certa, sem explicação.

A deteção de equivalência numérica inclui um teste interno de regressão para frações e percentagens.

## Limite desta validação

Esta passagem elimina falhas objetivas e automatizáveis, mas não transforma as 5650 perguntas em conteúdo pedagogicamente aprovado. Os itens continuam com estado `prototype`. A fase seguinte deve priorizar revisão matemática por amostragem de risco, começando por probabilidades, logaritmos, derivadas, trigonometria e perguntas de raciocínio de dificuldade 4.
