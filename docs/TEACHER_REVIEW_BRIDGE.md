# Ponte de revisão com professor — v3.9

## Objetivo
A revisão pedagógica não deve obrigar um professor externo a entrar no protótipo.

A app exporta o caminho mínimo atual para um CSV com:
- enunciado;
- opções;
- resposta;
- resolução;
- hipótese de erro;
- taxonomia;
- motivo da prioridade;
- versão editorial;
- oito campos de checklist;
- decisão, revisor e nota.

## Decisões
O professor preenche:
- `APROVAR`
- `ALTERAR`
- `BLOQUEAR`

Para `APROVAR`, os oito campos `check_*` têm de estar `SIM`.

## Importação segura
A importação:
- valida IDs;
- rejeita IDs duplicados;
- valida a versão editorial;
- exige nome do revisor;
- impede aprovações sem checklist completa;
- é atómica por defeito: uma linha inválida impede aplicar todo o ficheiro.

Uma questão alterada depois da exportação fica com versão diferente e não pode
ser aprovada através de um CSV antigo.

## Auditoria
Cada decisão importada regista:
- revisor;
- origem `external_csv`;
- ID da importação;
- checklist;
- nota;
- timestamp;
- versão.

O histórico de importações fica também no estado editorial.
