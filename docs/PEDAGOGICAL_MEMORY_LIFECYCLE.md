# Memória Pedagógica — ciclo de vida v2 (v4.8)

## Problema resolvido

Até à v4.7, uma hipótese causal criada pelo motor podia permanecer indefinidamente
na memória do aluno. Isso arriscava criar “hipóteses fantasma”: dificuldades que já
tinham sido ultrapassadas, mas continuavam a influenciar decisões futuras.

A v4.8 transforma cada hipótese numa entidade com ciclo de vida explícito.

## Estados

### `open`
Há um sinal causal, mas ainda não existe evidência suficiente para concluir.

### `probable_prerequisite`
Duas ou mais verificações recentes apontam para o pré-requisito como causa provável.

### `probable_target`
O pré-requisito tem respondido melhor; a dificuldade parece mais específica da
competência-alvo.

### `ambiguous`
A evidência recente aponta em direções diferentes. O motor assume incerteza em vez
de forçar uma conclusão.

### `resolved`
A competência relevante acumulou Domínio, Certeza e evidência suficientes para
fechar a hipótese.

### `stale`
Passaram mais de 30 dias sem nova evidência causal. A hipótese deixa de influenciar
Missões até existir um sinal novo.

## Reabertura

`resolved` e `stale` não são estados irreversíveis.

Se uma dificuldade relevante reaparecer, a hipótese é reaberta e começa uma nova
janela de observações recentes. Mantemos o histórico anterior para não perder
contexto.

## Evidência recente vs histórica

Mantemos dois conjuntos de contadores:

- totais históricos;
- observações recentes desde a última abertura/reabertura.

Isto impede que uma hipótese antiga com muitas observações domine para sempre uma
situação que já mudou.

## Resolução por aprendizagem

A resolução não acontece simplesmente por passar tempo.

O motor verifica Domínio, Certeza e quantidade mínima de evidência na competência
alvo e, quando aplicável, no pré-requisito.

Os thresholds são guardrails heurísticos desta fase de protótipo; devem ser
calibrados com dados reais e revisão pedagógica.

## Relação com a Missão de Hoje

Só hipóteses ativas e pedagogicamente acionáveis podem gerar uma Missão de
Investigação.

- `open`, `ambiguous` e `probable_prerequisite` podem originar investigação;
- `probable_target` tende a ser tratada pela prioridade normal da competência;
- `resolved` e `stale` não entram na fila.

Assim evitamos que o motor continue a “perseguir” uma causa antiga sem necessidade.

## Transparência para o aluno

A área Progresso mostra a Memória Pedagógica com estados humanos:

- Em investigação
- Base provável
- Dificuldade específica provável
- Causa ainda ambígua
- Resolvida
- Desatualizada

Hipóteses fechadas podem ser vistas num histórico recente, mas não aparecem como
problemas ativos.

## Persistência

- `pedagogicalMemoryVersion: 2`
- cloud schema: `aplus-student-state-v7`
- local state version: `23`

Os estados antigos em português são migrados automaticamente.
