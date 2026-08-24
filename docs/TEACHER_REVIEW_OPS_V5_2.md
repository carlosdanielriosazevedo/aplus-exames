> **OBSOLETO PARA EXPORTAÇÃO:** os CSV/fingerprints operacionais atuais são os da v5.4 em `docs/professor-review-v5.4/`.

# Operação de Revisão Pedagógica — v5.2

## O gargalo atual

O corpus de Matemática A tem agora:

- 145 questões;
- 69/69 microcompetências cobertas;
- 42/42 focos críticos com pelo menos 2 assinaturas disponíveis;
- potencial estrutural de 100% se todo o corpus for formalmente revisto.

O readiness real continua em 10% porque ainda não existem aprovações reais de professor.

A v5.2 transforma esse bloqueio num processo operacional controlado.

## Caminho mínimo

O motor calcula atualmente:

- **64 aprovações** para atingir o gate mínimo da beta pedagógica fechada;
- **8 lotes de 8 questões**;
- cerca de **5 minutos por questão**;
- aproximadamente **5,3 horas** no total, se todas forem aprovadas à primeira.

Os lotes iniciais estão em:

`docs/professor-review-v5.2/`

Cada lote contém um CSV que pode ser enviado a um professor.

## Fluxo recomendado

1. Enviar Lote 01.
2. Professor preenche apenas:
   - reviewer
   - decision
   - note
   - check_*
3. Importar o CSV devolvido na app.
4. Se todas forem aprovadas, avançar para o lote seguinte.
5. Se existir ALTERAR ou BLOQUEAR, regenerar o roteiro antes de enviar o lote seguinte.

Isto é importante porque uma rejeição pode mudar quais são as próximas questões de maior impacto.

## Aprovação

Uma questão só pode receber APROVAR se os oito critérios forem confirmados:

1. Matemática correta
2. Enunciado claro
3. Resposta inequívoca
4. Distratores plausíveis
5. Resolução suficiente
6. Classificação curricular correta
7. Dificuldade adequada
8. Hipótese de erro plausível

ALTERAR e BLOQUEAR não exigem checklist completo.

## Fingerprint editorial

Cada questão exportada recebe um `content_fingerprint`.

O fingerprint depende de:

- enunciado;
- opções;
- resposta;
- solução;
- hipótese de erro;
- tema/microcompetência;
- dificuldade;
- tipo cognitivo;
- contextos;
- assinatura semântica.

Se qualquer uma destas partes mudar depois de o professor receber o ficheiro, a decisão antiga é rejeitada.

Isto protege contra um erro importante:

> questão aprovada → alguém edita o conteúdo → continua marcada como aprovada.

Na v5.2 isso deixa de ser possível.

Mesmo que alguém se esqueça de aumentar manualmente a versão, a alteração do fingerprint invalida a revisão.

## Aprovação desatualizada

Se uma questão já aprovada mudar no código:

`reviewed → pending`

automaticamente.

O painel mostra:

> Aprovação invalidada automaticamente.

A questão precisa de nova revisão.

## Conflitos de revisores

Uma decisão contraditória nunca substitui silenciosamente uma aprovação existente.

Exemplo:

- Professor A: APROVAR
- Professor B: BLOQUEAR

A importação fica bloqueada como **conflito editorial**.

É necessário reabrir conscientemente a questão e resolver a divergência.

## Segunda aprovação / Quality Control

Se uma questão já aprovada na mesma revisão de conteúdo receber APROVAR de um
segundo professor, isso é registado como confirmação de controlo de qualidade.

Não cria uma nova questão nem duplica a aprovação.

Existe também uma fila determinística de aproximadamente 10% das questões aprovadas
para spot-check/QC adicional.

Este QC não é usado para fabricar readiness artificial; serve para monitorizar
qualidade do processo de revisão.

## Packs e lotes

Todos os lotes de um roteiro pertencem ao mesmo `pack_id`.

Cada lote tem também um `batch_id`.

Assim conseguimos saber:

- que versão do roteiro foi enviada;
- qual lote originou cada decisão;
- que professor reviu;
- em que importação entrou;
- qual fingerprint foi efetivamente aprovado.

## Importação atómica

Se um CSV contém uma linha inválida ou um conflito, a importação inteira é
bloqueada por defeito.

Isto evita aplicar 7 decisões e deixar a 8.ª num estado ambíguo sem o utilizador perceber.

## Estado atual

A v5.2 melhora o processo de aprovação, mas não inventa aprovações.

Portanto:

- cobertura estrutural: 100% possível;
- readiness real: 10%;
- beta pedagógica fechada: NO-GO;
- Technical Gate: GO.

O próximo salto pedagógico real acontece quando um professor começar efetivamente
a devolver decisões.
