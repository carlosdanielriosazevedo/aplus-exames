# v3.1 — Planeador temporal + Missões adaptativas

## O que mudou internamente

### 1. Interleaving
O motor penaliza temporariamente a repetição imediata do mesmo tema.
Isto reduz o risco de o plano ficar preso na competência com score mais baixo.

### 2. Revisão espaçada dinâmica
Cada tema passa a ter um intervalo interno de reconfirmação calculado a partir de:
- Domínio;
- Certeza;
- contradições;
- proximidade do exame;
- nota objetivo.

### 3. Prioridade “está na altura de rever”
Uma área vencida para reconfirmação recebe um bónus de prioridade.
Uma área acabada de trabalhar recebe cooldown.

### 4. Missões com fim adaptativo
A Missão já não termina apenas por contagem fixa.
O motor observa:
- assinaturas independentes;
- variedade cognitiva;
- variedade de dificuldade;
- ganho de Certeza;
- estabilidade da estimativa.

### 5. Proteção contra falsa informação
Se as perguntas restantes forem semanticamente demasiado semelhantes,
a Missão termina em vez de fabricar Certeza com repetição.

### 6. Transparência
No resultado, o aluno passa a ver “Porque terminou agora?” com uma explicação curta.

Princípio:
> mais respostas não significa necessariamente mais informação.
