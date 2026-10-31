# Contexto de desenvolvimento APProva+

Ler primeiro [AGENTS.md](../../AGENTS.md), que permanece intacto. Este mapa liga fontes existentes; não substitui regras nem converte relatórios históricos em estado atual.

- [Inventário completo na base](inventory.md): documentos existentes, títulos, grupos e hashes.
- [Referências e estado técnico](reference.md): produto, arquitetura, testes, design e pendências.
- [Decisões e atualização](decisions.md): proveniência, aprovação, substituição e manutenção.
- [Verificar produção](production.md): GitHub, CI, Vercel e validação funcional.
- [Arquivo APP EN](archive.md): importação local, pesquisa e publicação privada controlada.

## Instrução operacional permanente

Usar os checkouts existentes do ambiente, sem criar worktrees salvo pedido explícito. Consultar este mapa no início das tarefas relevantes. O índice privado deve ser pesquisado apenas quando disponível e necessário. Declarar o que foi realmente lido e os acessos que falharam. Não assumir memória entre tarefas nem acesso automático ao projeto ChatGPT.

Nesta iniciativa, por instrução explícita do proprietário, não fazer merge, deployment, operações destrutivas sobre dados ou operações com custos sem autorização explícita, mesmo que uma regra anterior conceda autorização genérica. A branch `codex/context-architecture` isola este trabalho documental e de privacidade; não altera a branch de integração existente.

## Aceitação e evidência

Preservar AGENTS e aplicação; inventariar fontes; testar importação idempotente, pesquisa FTS5, exclusão de conversas não selecionadas, preservação de ramos/metadados e proteção do arquivo original. Exportação real ainda não recebida: não existe prova de cobertura integral APP EN. Ver [validação](validation.md).
