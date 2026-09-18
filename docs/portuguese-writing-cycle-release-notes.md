# Portuguese writing cycle v2 — bloco 1

Branch: `codex/portuguese-writing-cycle-v2`
Base: `main` em `22c46b66db67286bf4274920192dcd86388b18a0`.

## Implementado

- Motor puro para comparar autoavaliações antes/depois.
- Separação entre melhoria de estado e melhoria de evidência.
- Priorização do próximo critério ainda em atenção.
- Pedido explícito de evidência quando um critério é marcado como cumprido sem passagem de suporte.
- Estado de consolidação quando todos os critérios estão cumpridos e documentados.
- Componente de síntese pronto para integração.
- Estilos responsivos isolados.
- Testes, cenários e audits de contrato.

## Segurança pedagógica

Nenhum resultado do motor é uma nota. Os contadores descrevem exclusivamente alterações feitas pelo aluno na própria autoavaliação. O motor não tenta inferir se a resposta está correta.

## Próximo bloco

Integrar a síntese na revisão real do mini-exame usando os snapshots já guardados pelo fluxo, sem duplicar estado nem interferir com a memória histórica de escrita.
