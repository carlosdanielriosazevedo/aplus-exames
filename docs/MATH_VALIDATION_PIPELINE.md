# Pipeline de Validação Matemática — v4.4

## Objetivo

Nenhuma variante matemática automática deve chegar ao aluno apenas porque o gerador
conseguiu produzir texto e quatro opções.

O pipeline passa a separar três responsabilidades:

1. **Gerador** — cria os parâmetros, enunciado, opções e resolução.
2. **Validador matemático independente** — recalcula a resposta a partir de dados
   matemáticos mínimos (`mathWitness`).
3. **Professor** — valida qualidade pedagógica, clareza, dificuldade, taxonomia,
   distratores e explicação.

A validação matemática não substitui revisão pedagógica.

## `mathWitness`

Cada um dos 9 templates automáticos passa a emitir um testemunho matemático mínimo,
por exemplo:

- equação linear: coeficientes `a` e `b`;
- ponto médio: coordenadas dos dois pontos;
- derivada: coeficiente e expoente;
- probabilidade condicionada: interseção e probabilidade da condição;
- limite polinomial: coeficientes e ponto.

O validador não confia na opção que o gerador diz estar correta.
Recalcula a solução usando apenas o witness e compara-a com `options[answerIndex]`.

## Estados

- `structural_only` — conteúdo curado passou apenas validações estruturais.
- `validated_local` — variante gerada foi recalculada e validada localmente.
- `validated_dual` — local + segundo motor concordam.
- `invalid_local` — o nosso próprio recálculo não concorda.
- `blocked_conflict` — segundo motor discorda; questão bloqueada.

## Segundo validador

A arquitetura está preparada para um provider externo sem estar ligada a nenhum
fornecedor nesta versão.

Wolfram é um candidato possível, mas a decisão de ativação fica separada porque
envolve conta, custos e licenciamento.

O provider recebe apenas uma expressão matemática normalizada, como:

`d/dx (4*x^3)`

ou

`solve(3^x=81,x)`

Não precisa de dados do aluno nem do histórico pedagógico.

## Fingerprint

Cada pedido matemático tem um fingerprint (`mv1-...`) derivado do template e do
witness. Serve para:

- cachear verificações no futuro;
- evitar chamadas repetidas ao provider;
- associar o veredito à variante exata;
- invalidar naturalmente o resultado quando os parâmetros mudam.

## Regra de conflito

Se:

- validador local = A
- validador externo = B

não existe desempate automático.

A variante fica:

`blocked_conflict`

e segue para revisão humana.

## Auditoria

`npm run math-validation:audit`

Atualmente recalcula 900 variantes:
- 9 templates;
- 100 variantes por template/foco.

Também testa adulteração deliberada da resposta e conflito entre validadores.
