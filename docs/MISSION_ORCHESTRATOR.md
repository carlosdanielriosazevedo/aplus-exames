# Orquestrador de Missões — v3.2

A app já tem vários motivos legítimos para propor uma Missão:
- prioridade pedagógica;
- confirmação de um sinal do Treino Livre;
- calibração de uma zona desconhecida;
- investigação de uma hipótese causal.

Até v3.1 estas categorias eram tratadas sobretudo por ordem fixa.
Isso podia fazer uma confirmação ou calibração passar à frente de uma dificuldade
mais urgente apenas por ter sido encontrada primeiro.

## v3.2
Cada categoria gera um candidato com utilidade interna.
O orquestrador compara os candidatos e escolhe apenas depois.

### Guardrails
- no máximo 2 confirmações entre as 3 Missões mais recentes;
- calibrações não aparecem em duas Missões consecutivas;
- zonas críticas ganham boost;
- hipóteses causais só são revisitadas depois de intervalo temporal;
- a mesma competência não é investigada imediatamente de novo;
- o cooldown/interleaving da v3.1 continua ativo.

## Auditabilidade
A decisão guarda internamente:
- origem da decisão;
- utilidade do candidato escolhido;
- até 3 alternativas que ficaram atrás.

Estes valores não são mostrados ao aluno.
Servem para análise beta e para perceber por que razão o motor tomou uma decisão.

Princípio:
> o tipo de Missão também deve ser adaptativo.
