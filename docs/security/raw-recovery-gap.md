# raw-recovery-gap — exceção documentada (sem alteração de implementação)

## Definição

Tentativa de exportar pela aplicação JSON local **ilegível** cuja conta de origem não pode ser comprovada. Na candidata experimental (#455, `app/lib/cloudRecovery.js`) a exportação é recusada com `CLOUD_RECOVERY_ORIGIN_UNPROVEN`. Esta recusa é uma proteção de segurança, não um defeito a contornar.

## Porque continua bloqueada

- Bytes ilegíveis não permitem ler `accountOwner`; não há prova de titularidade.
- Ter descoberto os dados no perfil do navegador **não** prova titularidade: o perfil pode ser partilhado (computador da escola, irmãos).
- A conta autenticada no momento da quarentena também não prova titularidade: a quarentena pode ocorrer depois de uma troca de conta.
- Atribuir ou exportar estes bytes para a conta atual pode expor dados académicos de um menor a outra pessoa ou fundir histórico alheio.

## Estado atual (preservado)

- Os bytes originais permanecem intactos no armazenamento local.
- A exportação automática pela aplicação continua bloqueada.
- Nada é atribuído, fundido ou apagado.
- No branch `claude/recovery-integrity` (base `main`) o percurso de exportação cloud não existe; o contrato sombra reporta `not_applicable`. Na #455 reporta `exception_blocked` (recusa confirmada).

## Proposta de recuperação assistida (não implementada)

1. **Pedido iniciado pelo aluno**, autenticado, a partir do ecrã de recuperação: “Pedir ajuda para recuperar dados danificados”. Não envia os bytes automaticamente.
2. **Prova de titularidade fora da app**, por pessoa autorizada (encarregado de educação / suporte), com critérios definidos pelo product owner. Nunca baseada só em presença no dispositivo ou na conta ativa.
3. **Exportação local para o próprio dispositivo**, com digest SHA-256 dos bytes e aviso explícito de que o ficheiro pode conter dados de outra pessoa, apenas depois da aprovação do passo 2.
4. **Revisão humana** do conteúdo e reconstrução manual, gerando uma nova versão (sem ressuscitar aprovações ou recibos antigos).
5. **Registo de auditoria** mínimo (pedido, decisão, digest), sem conteúdo académico nem dados pessoais adicionais.

Decisões pendentes do product owner: critérios de prova de titularidade, quem pode aprovar, retenção dos bytes em quarentena, e se a exportação local do passo 3 é aceitável para utilizadores menores.
