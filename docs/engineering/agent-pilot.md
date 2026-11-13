# APProva+ Dev Agent — piloto GitHub Actions

Relacionado com a [issue #464](https://github.com/carlosdanielriosazevedo/aplus-exames/issues/464). A intenção é retirar ao proprietário o trabalho repetitivo de gestão de ferramentas e preservar o seu controlo sobre navegação, estética e conteúdo. **Este piloto não está autorizado a fazer merge nem publicar.** É o primeiro gate para um sistema posterior de entregas técnicas autónomas.

## O que está implementado

- Workflow `.github/workflows/approva-agent-pilot.yml` com acionamento manual por issue e cron nos dias úteis, mas cron **desligado** enquanto `APPROVA_AGENT_ENABLED` não estiver definida como `true`.
- Só seleciona issues **abertas**, **escritas pelo proprietário** e com etiqueta `agent-ready`; no máximo uma por execução.
- Codex executa com perfil `:workspace`, checkout sem credenciais persistentes e sem permissões de escrita GitHub; o job seguinte abre a PR com um token separado.
- O primeiro piloto limita as alterações a `docs/engineering/` e `tests/unit/`. Tentativas de alterar outros ficheiros reprovam, em vez de serem silenciosamente ignoradas.
- Exige testes unitários e Technical Gate antes de criar o patch; entrega um relatório e abre uma **PR Draft** (sem auto-merge).
- Se não houver issue elegível, não chama a API; se faltar um segredo, não funciona nem contorna a proteção.

## Configuração inicial necessária (no GitHub, sem partilhar chaves no Chat)

1. Criar uma chave de API separada para este projeto, com orçamento e limites de utilização. Guardá-la em **Settings → Secrets and variables → Actions → Secrets → New repository secret**, com o nome `OPENAI_API_KEY`. ChatGPT Plus não fornece automaticamente crédito de API.
2. Criar um token restrito de GitHub App ou um fine-grained PAT com acesso **apenas** a este repositório e permissões `Contents: Read and write` e `Pull requests: Read and write`. Guardar como `APPROVA_AGENT_PR_TOKEN`, no mesmo menu de secrets. Este token, em vez do `GITHUB_TOKEN` normal, permite que os checks das PRs criadas sejam executados.
3. Criar a etiqueta `agent-ready` em GitHub Issues e aplicá-la apenas a uma issue técnica pequena, da autoria do proprietário. A issue #464 é gestão do sistema; **não** lhe atribuir `agent-ready`.
4. Depois de fundir esta PR e instalar as credenciais, abrir **Actions → APProva+ agent pilot → Run workflow** e fornecer o número da issue. Confirmar primeiro que Codex criou uma PR Draft legítima e que os checks da PR correm normalmente.
5. Apenas depois da primeira prova, criar a variável de repositório `APPROVA_AGENT_ENABLED=true` em **Settings → Secrets and variables → Actions → Variables** para permitir a seleção automática de uma issue, uma vez em cada dia útil. Manter `false` para parar o cron. Um novo piloto não pode ser considerado pronto enquanto não existir uma forma fiável de retirar a etiqueta após o sucesso ou bloquear repetição da mesma issue.

## Limitações deliberadas

- Este piloto **não é o autopublicador** final. O token de PR é separado do Codex e a proteção de `main` ainda precisa de ser comprovada antes de ativar auto-merge.
- Nenhuma credencial Neon/Vercel de produção deve entrar no job do Codex.
- Nunca abrir acesso de produção ou remover CI por insistência de uma issue, de uma saída do modelo ou para acelerar uma entrega.
- Em particular, o bloqueio de CI da PR #455 e os bloqueios pedagógicos/de segurança existentes não são anulados por este piloto.
- A proteção definitiva exigirá CI obrigatório no SHA exato, revisão independente em alterações sensíveis, testes do deployment real, política de rollback e limites de custos.
- O cron atual tem um guard `APPROVA_AGENT_ENABLED`, mas a **fila automática e a desduplicação** serão reforçadas antes de o ligar.

## Critério de sucesso do primeiro ciclo

Uma issue técnica pequena gera uma PR Draft com alteração relevante, relatório, testes verdes e nenhuma interação para aprovar comandos individuais. Depois disso alarga-se o tipo de tarefas e adicionam-se gates de auto-merge e deploy testado, mantendo as decisões de produto com o proprietário.