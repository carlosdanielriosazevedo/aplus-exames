# Piloto com alunos reais — Matemática A

## Objetivo
Validar a APProva+ com alunos reais sem confundir validação de produto com certificação pedagógica externa. O piloto serve para medir clareza, dificuldade percebida, comportamento de estudo, retenção e anomalias de itens.

## Âmbito recomendado
- 12 a 20 alunos.
- Idealmente com representação de 10.º, 11.º e 12.º anos.
- Duração inicial: 7 dias consecutivos.
- Matemática A apenas.
- Usar o modo de beta controlada/amigos; não desbloquear produção comercial.

## Percurso mínimo por aluno
1. Completar onboarding e seleção de matéria já lecionada.
2. Fazer o diagnóstico inicial.
3. Fazer pelo menos 4 Missões de Hoje durante os 7 dias.
4. Fazer pelo menos 1 sessão de Treino Livre.
5. Fazer pelo menos 1 Mini-exame completo e rever os erros.
6. Reportar qualquer pergunta ambígua, errada ou pouco clara no momento em que aparece.

## Métricas principais
- Taxa de conclusão do onboarding.
- Taxa de conclusão do diagnóstico.
- Tempo mediano do diagnóstico.
- Taxa de conclusão da primeira missão.
- Número de missões por aluno em 7 dias.
- Retenção D1, D3 e D7.
- Tempo mediano por pergunta e por tipo de resposta.
- Percentagem de respostas corretas por item.
- Itens com taxa de erro extrema ou tempo anormal.
- Taxa de abandono por ecrã/modo.
- Taxa de utilização da revisão de Mini-exame.
- Número e tipo de reports por 100 respostas.

## Sinais de alerta por item
Marcar para revisão prioritária qualquer item que cumpra pelo menos um destes critérios durante o piloto:
- reportado por 2 ou mais alunos;
- taxa de acerto <15% ou >95% com amostra suficiente;
- tempo mediano muito acima dos itens da mesma dificuldade;
- diferença grande entre dificuldade declarada e comportamento real;
- abandono imediatamente após aparecer;
- respostas abertas com padrões corretos não reconhecidos pelo corretor.

## Critério de sucesso da primeira semana
O piloto é considerado tecnicamente saudável se:
- não existirem blockers de navegação ou perda de progresso;
- diagnóstico e Missão de Hoje forem concluídos pela maioria dos alunos que os iniciam;
- não houver um padrão sistemático de itens incorretos/ambíguos;
- os Mini-exames puderem ser terminados e revistos sem erros de estado;
- os reports permitirem identificar perguntas concretas e reproduzir o problema.

## Guardrails
- “STUDENT PILOT READINESS: GO” significa apenas que o produto e o banco estão em condições para teste controlado.
- Não significa validação oficial pelo IAVE.
- Não significa revisão por professor de todas as perguntas.
- Não altera `productionEligible` dos conteúdos.
- Produção comercial continua dependente dos gates de revisão externa definidos no projeto.

## Próxima decisão após 7 dias
No final do piloto, ordenar o trabalho por impacto:
1. erros factuais/matemáticos;
2. respostas corretas não reconhecidas;
3. ambiguidades de enunciado;
4. dificuldade mal calibrada;
5. abandono/UX;
6. melhorias cosméticas.

Só depois desta passagem deve ser aumentado o número de alunos ou avançada a validação externa formal.