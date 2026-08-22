# Auditoria do motor — v3.3

O motor adaptativo precisa de testes comportamentais, não apenas sintáticos.

## Auditoria sintética
`npm run engine:audit`

Testa:
- ordenação da fila de Missões;
- prevenção de calibrações consecutivas;
- prevenção de excesso de confirmações;
- espaçamento de investigação causal;
- 500 perfis sintéticos aleatórios.

## Auditoria real
O Painel Beta passa a observar:
- maior sequência de Missões no mesmo tema;
- taxa de calibração;
- taxa de confirmação;
- sessões terminadas por falta de diversidade informativa;
- rastreabilidade das decisões.

O auditor apenas observa; nunca altera o plano do aluno.

Princípio:
> um motor adaptativo também precisa de ser avaliado como produto.
