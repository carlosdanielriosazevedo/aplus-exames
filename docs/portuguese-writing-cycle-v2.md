# Ciclo pedagógico de escrita — Português v2

Este bloco formaliza a transição entre duas autoavaliações da mesma resposta aberta.

## Objetivo

Transformar a sequência resposta → autoavaliação → revisão → nova autoavaliação num ciclo pedagógico explícito, sem atribuir automaticamente uma classificação final.

## Regras

- A app descreve apenas alterações que o próprio aluno assinalou.
- Uma subida de `Ainda não`/`Parcial` para `Parcial`/`Cumpri` é apresentada como melhoria autoassinalada, não como correção automática.
- Evidência textual adicionada ou alterada é tratada separadamente do estado do critério.
- Critérios que continuam em `Parcial` ou `Ainda não` têm prioridade no próximo passo.
- Se todos os critérios estiverem em `Cumpri` mas faltar evidência, a app pede uma passagem concreta.
- Se todos estiverem cumpridos e documentados, o próximo passo é uma leitura final de consolidação.

## Integração seguinte

O motor em `app/lib/portugueseWritingCycle.js` deve ser ligado à revisão do `PortuguesePassageMiniExam` numa alteração separada, mantendo o fluxo atual funcional e permitindo testar a apresentação antes de qualquer desbloqueio de Português para alunos.
