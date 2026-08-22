# A+ Exames — v2.0

## Workflow de Revisão Pedagógica

A v2.0 transforma os estados editoriais num fluxo de trabalho utilizável por um professor revisor.

### Painel de revisão
- Fila de questões por estado: Protótipo, A rever, Revisto e Bloqueado.
- Filtro por tema.
- Seleção do nome do revisor.
- Criação de lotes de 12 questões.
- Métricas editoriais no topo.

### Ficha de revisão
O professor vê tema, foco, ano, enunciado, opções, resposta correta, resolução, hipótese de erro, dificuldade, tipo cognitivo, assinatura semântica e template/seed quando aplicável.

### Checklist pedagógica
- Matemática correta
- Enunciado claro
- Resposta inequívoca
- Distratores plausíveis
- Resolução suficiente
- Classificação curricular correta
- Dificuldade adequada
- Hipótese de erro plausível

### Decisões
- Aprovar -> `reviewed`
- Pedir alteração -> `pending`
- Bloquear -> `blocked`

### Versionamento
- Cada item tem versão editorial.
- Simular uma alteração cria uma nova versão.
- Uma nova versão perde automaticamente a aprovação anterior e regressa a `pending`.
- O histórico de decisões fica visível.

### Reports dos alunos
- Itens com 3+ reports aparecem como revisão prioritária.
- O painel mostra a natureza dos reports associados.

### Ainda não é produção
Faltam backend, autenticação, permissões, edição real do conteúdo, comentários, dupla validação, notificações e colaboração multi-revisor.
