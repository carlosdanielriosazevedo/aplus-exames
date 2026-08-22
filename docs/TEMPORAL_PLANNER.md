# Planeador temporal — v3.1

O motor não deve escolher apenas “a pior competência”.

Passa a considerar também:
- se aquela área acabou de ser trabalhada;
- se já chegou a altura de a reconfirmar;
- se houve contradições recentes;
- proximidade do exame;
- objetivo do aluno.

## Interleaving
Uma Missão recente no mesmo tema cria um pequeno cooldown.
Isso evita túneis do tipo “Funções todos os dias” quando existem outras prioridades próximas.

O cooldown não é absoluto:
- domínio muito baixo reduz a penalização;
- evidência contraditória reduz a penalização;
- uma necessidade forte pode trazer o tema de volta cedo.

## Revisão espaçada
Cada score recebe internamente um intervalo de revisão variável.
Não é uma curva fixa de memorização: depende de Domínio, Certeza, contradição,
proximidade do exame e objetivo.

## Fim adaptativo de Missão
A sessão termina quando:
- já existe diversidade suficiente;
- houve ganho informativo razoável;
- a estimativa ficou estável;
- o conteúdo restante seria repetitivo;
- ou é atingido um limite de segurança.

Princípio:
> recolher mais respostas não é automaticamente recolher mais informação.
