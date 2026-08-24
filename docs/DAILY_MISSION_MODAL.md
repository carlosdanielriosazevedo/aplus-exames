# Janela automática — Missão de Hoje (v4.7)

## Comportamento

Depois do Diagnóstico inicial, a primeira entrada na Home em cada dia apresenta
automaticamente a Missão de Hoje.

A janela mostra:
- tipo da Missão;
- tema e microcompetência/foco;
- explicação curta de “porque agora?”;
- duração estimada;
- +50 XP competitivo;
- streak atual.

Ações:
- **Começar Missão**;
- **Agora não · ver a Home**.

## Frequência

A apresentação normal acontece no máximo uma vez por dia.

Se o aluno escolher “Agora não”, a janela não volta a aparecer continuamente nesse
dia. A Missão continua destacada na Home.

## Sessões em pausa

Se existe uma Missão em pausa, a janela muda para **Continuar Missão**.

Não é criada uma nova Missão e o progresso existente é reutilizado.

Se existe outro tipo de sessão em pausa (Treino ou Mini-exame), a janela da Missão
fica temporariamente suprimida para não competir com a recuperação dessa sessão.

## Uma Missão realmente fixa por dia

A v4.7 introduz uma atribuição diária persistida.

Quando o motor escolhe a Missão do dia, esse plano fica congelado para esse dia.
Isto significa que:

1. o aluno abre a app;
2. recebe “Derivadas · Monotonia”;
3. escolhe “Agora não”;
4. faz Treino Livre de outra matéria;
5. volta à Home;

a Missão de Hoje continua a ser a mesma.

O Treino Livre feito entretanto pode influenciar a Missão de amanhã, mas não troca
silenciosamente a missão que já tinha sido apresentada hoje.

## Dia seguinte

No primeiro acesso do novo dia, o motor cria uma nova atribuição com base no estado
mais recente do aluno, incluindo o que aconteceu depois da Missão anterior.

## Instrumentação beta

São registados eventos pseudónimos:
- `daily_mission_prompt_shown`;
- `daily_mission_prompt_dismissed`;
- `daily_mission_prompt_resumed`.

O `mission_started` também inclui a origem (`daily_modal` ou `home_card`).

Isto permite medir futuramente:
- quantos alunos começam diretamente pelo modal;
- quantos adiam;
- quantos retomam uma Missão interrompida;
- se a janela ajuda ou irrita.
