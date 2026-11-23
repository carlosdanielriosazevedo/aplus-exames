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

## Verificar que os reportes funcionam na base publicada (auditoria 2026-11-23, J-01)
Uma base criada com `db/schema.sql` tinha uma tabela `content_reports` antiga e a migração 009 original falhava. No SQL Editor da Neon:

```sql
select
  (select count(*) from information_schema.columns
     where table_schema='public' and table_name='content_reports' and column_name='subject_id') as formato_novo,
  to_regclass('public.content_reports_legacy_v23') as tabela_antiga_guardada;
```

- `formato_novo = 1`: os reportes estão a ser gravados. Nada a fazer.
- `formato_novo = 0`: os reportes **não** estão a ser gravados. Executar outra vez `db/migrations/009_content_reports.sql` (já corrigida; é idempotente) e, se ainda não tiverem corrido, 010 → 013. Depois, carregar em «Reportar» numa pergunta e confirmar que aparece uma linha em `content_reports`.

