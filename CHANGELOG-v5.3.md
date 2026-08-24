# v5.3 — Editorial Revisions

- Criado `app/lib/editorialRevisions.js`.
- Pedido de ALTERAR passa a poder abrir diretamente o editor de nova versão.
- Editor suporta enunciado, opções, resposta, solução, hipótese de erro, tipo cognitivo e dificuldade.
- Preview antes/depois obrigatório antes de aplicar.
- Validação bloqueia opções vazias/duplicadas, resposta inválida, resolução vazia e outros erros estruturais.
- Alteração aplicada incrementa versão e força estado `pending`.
- Aprovação/checklist antigos deixam de valer na nova versão.
- Patch editorial passa a ser servido pelo motor em modos permitidos.
- Closed beta/produção continuam a bloquear patches ainda não revistos.
- IDs, tema e microcompetência permanecem imutáveis mesmo perante patches manipulados.
- Reversão de uma alteração cria uma nova versão e exige nova revisão.
- Histórico separado de revisões editoriais (`revisionHistory`).
- Readiness e roadmap reconhecem o conteúdo efetivo e o estado da nova versão.
- Novo `npm run editorial-revisions:audit`.
- Local state passa para versão 27.
- App version passa para 5.3.0.
- Technical Gate valida diff → nova versão → re-review → rollback → engine overlay.
- Readiness real continua 10%; não foram simuladas aprovações de professor como reais.
