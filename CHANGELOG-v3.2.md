# v3.2 — Orquestrador de Missões

## Nova camada interna
Prioridade, confirmação, calibração e investigação deixam de obedecer a uma fila fixa.
Cada uma gera um candidato e o motor compara o valor pedagógico antes de escolher.

## Guardrails
- evita confirmações repetidas;
- evita calibrações consecutivas;
- protege dificuldades críticas;
- agenda nova verificação de hipóteses causais apenas depois de intervalo;
- mantém o interleaving e revisão espaçada da v3.1.

## Auditoria
Cada Missão passa a guardar:
- origem da decisão;
- utilidade interna;
- alternativas que ficaram atrás.

Isto é interno e serve para validar o motor durante a beta.

## Correção de regressão
Foi reposta a lógica do onboarding aprovada anteriormente:
- 10.º → “Daqui a 2 anos”;
- 11.º → “No próximo ano”;
- 12.º → “Este ano letivo”;
- “Já terminei” → “Já terminei o secundário”;
- pergunta de programa adaptada para quem já terminou.

## Limpeza
O rótulo interno visível na Home passa de “MOTOR v2.4” para “MOTOR v3.2”.
