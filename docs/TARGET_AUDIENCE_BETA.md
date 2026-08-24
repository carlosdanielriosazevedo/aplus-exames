# Beta por público-alvo — v4.3

## Porque existe

Os primeiros testes podem ser feitos por amigos adultos e continuam a ser úteis
para validar conceito, clareza, navegação e estética.

Mas feedback de alguém que fez os Exames Nacionais há 10–15 anos não deve ser
misturado com feedback de um aluno que está atualmente no secundário.

A v4.3 separa explicitamente estes sinais.

## Segmentos

O tester escolhe apenas uma categoria:
- aluno do secundário;
- terminou o secundário há pouco tempo;
- pai/mãe;
- observador adulto.

Não recolhemos idade exata, nome ou email.

A classificação `target` só é atribuída quando o tester se identifica como aluno
e o perfil académico confirma 10.º, 11.º ou 12.º ano.

## Métricas adicionais

Nos momentos mais relevantes da experiência recolhemos:
- clareza;
- adequação da dificuldade;
- utilidade;
- sensação de personalização;
- intenção de regressar no dia seguinte.

A pergunta de regresso muda ligeiramente:
- aluno atual: “voltarias amanhã?”
- observador: “se fosses aluno hoje, isto dar-te-ia vontade de voltar?”

As duas respostas ficam separadas por segmento.

## Agregador sem backend

O painel interno da beta aceita vários relatórios JSON enviados pelos testers.

A análise acontece apenas no browser e separa:
- alunos atuais;
- ex-alunos recentes;
- pais/mães;
- observadores adultos.

Mostra por grupo:
- número de testers;
- sessões por tester;
- intenção de regressar;
- personalização;
- utilidade;
- conclusão.

Isto permite começar a aprender com 5–10 testers reais mesmo antes de ativar o
backend de recolha automática.

## Interpretação

Comentários positivos de observadores adultos validam sobretudo:
- conceito;
- intuitividade;
- percepção de valor;
- apresentação.

Só alunos atuais devem começar a sustentar hipóteses sobre:
- vontade real de voltar;
- hábito diário;
- adequação ao estudo;
- sensação real de personalização.

Mesmo para alunos atuais, a v4.3 continua a ser uma beta de experiência:
o conteúdo ainda não passou pela revisão pedagógica mínima necessária para validar
a precisão académica do motor.


## Testers menores de idade

Como o público real inclui alunos menores, o piloto deve continuar a recolher o
mínimo possível de dados. Não pedimos nome, email nem idade exata.

Quando o teste envolver menores, a recomendação operacional é fazê-lo com
conhecimento/autorização do encarregado de educação, sobretudo se o relatório
pseudónimo for enviado para análise.
