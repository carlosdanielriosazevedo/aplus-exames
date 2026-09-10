# Reforço de qualidade do banco vNext — 10 de setembro de 2026

## Resultado desta passagem

- Banco preservado: 113 ficheiros e 5650 perguntas.
- Avisos estruturais reduzidos de 36 para 0.
- Bloqueios estruturais: 0.
- Vinte enunciados ou soluções demasiado curtos foram reescritos para explicitar a tarefa ou o método.
- Dezasseis perguntas repetidas entre submatérias foram substituídas por variantes independentes.
- Sete distratores artificiais, que apenas acrescentavam um ponto de interrogação a outra opção, foram substituídos por erros matemáticos plausíveis.
- Quatro perguntas com opções numericamente equivalentes foram corrigidas.
- Foi feita uma passagem técnica focada por 372 itens de dificuldade 4 em probabilidades, logaritmos, derivadas e trigonometria.
- Foi corrigida uma inconsistência real numa questão de independência: a resolução concluía `0,5`, mas a opção assinalada correspondia a `0,45`.
- Vinte e duas resoluções de derivadas, trigonometria e cálculo integral foram reescritas para explicitar a regra, a simplificação e a resposta final.
- Foi criado um banco compacto de 339 itens para Mini-exames: três itens independentes por cada uma das 113 submatérias, sem reutilizar os itens reservados ao Diagnóstico ou às Missões.
- A seleção dos 339 itens passou a penalizar resoluções curtas e opções certas visualmente denunciadas: a resolução mais curta tem 31 caracteres, os 34 desequilíbrios de comprimento detetados caíram para zero e cada submatéria apresenta pelo menos dois tipos cognitivos.

## Proteções acrescentadas

O auditor estrutural passa a bloquear:

- opções iguais apesar de diferenças irrelevantes de pontuação final;
- números, decimais, percentagens ou frações equivalentes em duas opções.
- opções malformadas que terminam em ponto de interrogação, exceto quando a própria opção é legitimamente uma pergunta;
- divergências entre a opção certa e o resultado numérico explicitamente declarado no final da resolução.

Além disso, passa a assinalar como aviso qualquer solução que se limite a repetir a opção certa, sem explicação.

A deteção de equivalência numérica inclui um teste interno de regressão para frações e percentagens. A comparação entre resolução e opção certa cobre atualmente 169 itens cujo resultado final pode ser interpretado com segurança pelo auditor.

O banco de Mini-exames é regenerado a partir das fontes editoriais e bloqueia a validação se ficar desatualizado. Os itens recebem IDs próprios, mantêm a referência à pergunta de origem e continuam indisponíveis em produção enquanto forem protótipos.

## Limite desta validação

Esta passagem elimina falhas objetivas e automatizáveis, mas não transforma as 5650 perguntas em conteúdo pedagogicamente aprovado. Os itens continuam com estado `prototype`. A passagem focada de dificuldade 4 é uma verificação técnica de consistência, não uma validação por professor. A fase seguinte deve aprofundar a correção matemática e pedagógica por famílias de exercícios, incluindo perguntas de raciocínio e respostas construídas.
