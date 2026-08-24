# Ciclo Diário de Engagement — v4.5

## Objetivo

A gamificação deve aumentar consistência sem falsificar aprendizagem.

Por isso existem três sistemas independentes:

- **XP** — recompensa esforço/atividade;
- **Streak** — recompensa voltar em dias consecutivos;
- **Domínio/Certeza** — representam aprendizagem/evidência pedagógica.

Nunca usamos XP ou streak para subir Domínio.

## Streak

Até v4.4 o protótipo aumentava o streak sempre que uma Missão era concluída.
Isso permitia fazer três Missões no mesmo dia e obter artificialmente três dias.

Na v4.5:
- o streak só pode aumentar uma vez por dia de calendário;
- qualquer sessão de estudo concluída conta como dia ativo, mesmo com respostas erradas;
- falhar um dia completo quebra a sequência;
- várias sessões no mesmo dia não aumentam a sequência novamente;
- o streak antigo baseado em número de Missões é descartado na migração.

A ideia é premiar **consistência**, não desempenho.

## Objetivo diário

Valor base: **60 XP**.

O objetivo diário fica concluído quando o aluno:
- termina uma Missão;
- termina um Mini-exame;
- conclui o Diagnóstico inicial;
- ou acumula 60 XP através de Treino Livre.

Isto evita obrigar o aluno a continuar a responder só para “farmar XP” quando a
Missão adaptativa já terminou por ter evidência suficiente.

## Treino Livre

Uma sessão de Treino, mesmo com 0 respostas certas:
- conta como dia ativo para o streak;
- não completa automaticamente o objetivo diário;
- só contribui para a barra diária através do XP efetivamente ganho.

Assim o streak recompensa o hábito, mas o objetivo diário continua a incentivar uma
atividade minimamente substancial.

## Home

A Home mostra:
- streak atual;
- progresso do objetivo diário;
- últimos 7 dias;
- melhor sequência;
- número de dias ativos;
- objetivos diários concluídos.

## Resultados

Depois de Diagnóstico, Missão, Treino ou Mini-exame aparece uma nota curta:
- objetivo diário concluído; ou
- sequência protegida e quanto falta para o objetivo.

## Idempotência

Cada atividade diária usa `sessionId/activityId`.

Se uma conclusão for processada duas vezes, a atividade não volta a contar para:
- XP diário;
- streak;
- número de sessões daquele dia.

Isto complementa a proteção de conclusão de sessões que já existia.

## Cloud

O estado de engagement passa a fazer parte do progresso cloud.

Schema cloud:
`aplus-student-state-v4`

Versões v1–v3 continuam legíveis.

## Próximos passos possíveis

Depois de termos dados de alunos reais, podemos testar:
- objetivo diário ajustável;
- “streak freeze”;
- lembretes;
- milestones de 3/7/14/30 dias;
- desafios semanais;
- recompensas cosméticas.

Não serão adicionados apenas por imitar o Duolingo: devem ser medidos contra retenção
real e não criar pressão contraproducente.
