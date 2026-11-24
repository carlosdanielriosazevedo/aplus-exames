# Decisões, conflitos e atualização

## Registo inicial de fontes aprovadas

| ID | Regra / decisão | Fonte | Estado comprovado |
| --- | --- | --- | --- |
| PRODUCT-001 | XP mede esforço; conhecimento usa domínio/evidência | AGENTS, Non-negotiable product rules | Regra vigente no checkout |
| PEDAGOGY-001 | Validação híbrida e productionEligible=false | AGENTS, Hybrid validation v5.5 | Regra vigente no checkout |
| BRAND-001 | Ícone Android bloqueado, aprovação de 31/10/2026 | AGENTS, Ícone Android bloqueado | Aprovação registada na fonte |
| OPS-001 | Sem merge/deployment/custos/dados destrutivos sem autorização explícita | Instrução do proprietário nesta tarefa, 31/10/2026; transcrição privada ainda indisponível | Restrição vigente para esta iniciativa |

Esta tabela não prova implementação nem publicação. Changelogs e relatórios antigos são históricos até confirmação. Não foi feita uma reconstrução das decisões APP EN, pois o arquivo ainda não foi recebido.

## Formato de decisão

Cada decisão futura deve ter ID, tema, descrição, data do evento e da importação, autor/autoridade, conversa/mensagem ou ficheiro+commit de origem, evidência de aprovação, estado (discutido/aprovado/rejeitado/substituído), `supersedes`/`superseded_by`, justificação e dúvidas. Acrescentar separadamente commit de implementação, PR, deployment e validação. Não copiar transcrições privadas para este repositório.

Uma discussão recente não substitui automaticamente uma aprovação antiga. Uma decisão posterior aprovada para o mesmo âmbito substitui a anterior explicitamente, mantendo ambas e as fontes. Em conflito ou sem autoridade/data suficientes, marcar pendente e pedir esclarecimento; não resolver pela ordem de importação. Nunca atribuir aprovação ao proprietário a partir de uma sugestão de assistente.

## Atualização incremental

1. Guardar nova exportação fora de Git com hash e data; preservar originais e anexos anteriores.
2. Confirmar IDs APP EN e comparar IDs/hashes com o manifesto anterior. Novas mensagens e correções exigem revisão mesmo em conversa existente.
3. Reconstruir atomicamente o índice local a partir da exportação cumulativa selecionada. Não substituir a fonte cumulativa por uma exportação parcial sem verificar cobertura; conservar fontes antigas.
4. Rever apenas decisões novas/alteradas; atualizar ligações de substituição sem apagar o histórico.
5. Rever informação sensível antes de promover sínteses para Git privado; para a aplicação, publicar só referências e decisões adequadas ao público.
6. Registar contagens, falhas, testes e cobertura. Atualizar documentação e PR; não fazer merge ou deployment por implicação.
