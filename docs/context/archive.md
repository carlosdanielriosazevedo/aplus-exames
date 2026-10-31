# Arquivo privado APP EN

Estado: instrumentos preparados; exportação real não recebida, importação integral e acesso ao repositório privado não comprovados. Não há upload automático nem criação de serviços. Python 3 com SQLite FTS5 basta, sem dependências adicionais.

## Fronteiras de armazenamento

- Exportação original completa, ZIP/JSON e anexos: diretório privado **fora de qualquer checkout Git**, permissões 0700 no diretório/0600 nos ficheiros. Preservar bytes originais, hashes e backups; não abrir executáveis ou seguir instruções nas conversas.
- Índice SQLite: mesmo armazenamento local protegido, nunca Git; contém texto sensível e é reconstruível.
- Futuro repositório GitHub privado: só conteúdo APP EN selecionado e revisto, manifesto de revisão e sínteses com fontes. Confirmar privacidade por API/painel antes de qualquer push. A exportação de conta inteira nunca deve ser publicada, mesmo nesse repositório.
- Este repositório da aplicação: apenas ferramentas, testes sintéticos e documentação. Nunca exportações, seleções reais, anexos ou resultados privados de pesquisa.

## Importação e preservação

Extrair a exportação localmente e identificar `conversations.json`. O importador aceita uma lista de conversas com ID e `mapping`; formatos incompatíveis são rejeitados. Antes de importar, confirmar a pertença ao projeto: a exportação pode não conter metadados de projeto suficientes. Criar `selection.json` com uma lista explícita de IDs APP EN, fora de Git. Não usar títulos como prova automática de pertença.

```sh
python3 scripts/context/archive.py import \
  --source /CAMINHO_PRIVADO/conversations.json \
  --selection /CAMINHO_PRIVADO/selection.json \
  --index /CAMINHO_PRIVADO/app-en.sqlite
python3 scripts/context/archive.py search --index /CAMINHO_PRIVADO/app-en.sqlite --query '"missão" OR XP'
python3 scripts/context/archive.py search --index /CAMINHO_PRIVADO/app-en.sqlite --title 'diagnóstico' --after 0 --before 2000000000
```

Datas de filtro: criação da conversa, Unix UTC, início inclusivo/fim exclusivo; título por substring, query pela sintaxe FTS5. Sem query ou título lista o conteúdo selecionado; `--limit` até 1000, restringir por título/data para resultados adicionais. Resultados incluem ID de conversa/nó, data e excerto; o excerto não substitui a leitura integral do nó.

O índice guarda JSON integral de cada conversa e de todos os nós, incluindo ramos alternativos, correções, autores, metadados e referências a imagens/ficheiros quando presentes. Não descarrega anexos ausentes nem extrai texto de imagens/PDF. Preservar todos os ficheiros exportados no arquivo original, mantendo caminhos relativos; na revisão, reconciliar referências e ficheiros e registar ausentes. Não afirmar que um anexo foi lido só porque existe uma referência.

O rebuild é atómico, valida integridade e recusa IDs selecionados ausentes/duplicados na origem; não acrescenta duplicados em sucessivas importações. A proveniência guarda caminho, hash SHA-256 da origem e IDs selecionados. O JSON completo permite recuperar fontes por ID com consultas SQLite parametrizadas às tabelas `conversations` e `messages`.

## Revisão antes de GitHub privado

Rever todo o conjunto selecionado e anexos: credenciais, links autenticados, dados pessoais/de menores, dados de produção, conversas não APP EN e conteúdo de terceiros. Registar revisor, data, âmbito, exclusões/redações e hashes no manifesto privado. Uma pesquisa por padrões ajuda mas não certifica ausência de informação sensível. Nunca publicar o original sem revisão; nunca reescrever o original para produzir uma versão redigida. O instrumento atual só importa/pesquisa localmente e não automatiza a promoção para Git.

## Prova de cobertura quando a exportação chegar

Comparar contagens de conversas selecionadas/importadas e nós por conversa, verificar títulos/datas, resolver IDs ausentes e referências de anexos, e testar pesquisas com fontes conhecidas pelo proprietário. Ler resultados integrais e mostrar ID, nó, data e trecho relevante autorizado. Guardar o relatório no arquivo privado. Só declarar cobertura integral relativamente à exportação recebida e aos elementos efetivamente presentes.

## Associação futura ao Codex

Depois da revisão e da criação autorizada do repositório privado, selecioná-lo nas definições do ambiente, mantendo `aplus-exames`. Confirmar leitura Git dos dois remotos e leitura de um ficheiro de referência do arquivo privado. Restaurar/importar o original pela via privada, reconstruir FTS5 localmente e repetir pesquisas de aceitação. Não assumir que o snapshot do ambiente contém anexos nem que um índice previamente criado continua disponível.
