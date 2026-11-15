# Reportes de problemas em perguntas

Os alunos usam "⚑ Reportar problema nesta pergunta" em Matemática A, Português e FQ A. O servidor guarda **apenas** a pergunta (`item_id`), a disciplina, a categoria, a versão da app e a data. Não guarda conta, nome, email nem texto livre.

## Ativar (uma vez, depois do merge e deploy)
Neon → APProva+ EU → branch `main` → SQL Editor → colar e correr o conteúdo de `db/migrations/009_content_reports.sql`. Pode ser corrido mais do que uma vez sem efeitos adicionais.
Até isto ser feito, o botão responde "Não foi possível enviar o reporte agora". A cópia local continua a ser guardada.

## Consultar
```sql
select item_id, subject_id, category, count(*) as reportes, max(created_at) as ultimo
from content_reports
group by 1,2,3
order by reportes desc, ultimo desc;
```
Categorias: `wrong` (resposta parece errada), `unclear` (enunciado confuso), `difficulty`, `typo`, `other`.

## Proteções
- Só com sessão iniciada, e com um limite de 30 reportes por conta por hora.
- Pedidos de outra origem são recusados.
- O browser não tem acesso à tabela: as permissões para `authenticated` e `anonymous` foram revogadas.
