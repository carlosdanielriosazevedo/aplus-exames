# PR #473 — seguimento da auditoria Work

Base confirmada no remoto: `cf2ba44f62cf00c9918647dc884e51978d9f4a97`,
branch `bot/approva-ui-issue-468`, checkout limpo e PR Draft.
O CI anterior não certifica os estados adicionais desta revisão.

## Correções e escolhas

O aviso de sessão irrecuperável passou para depois do hero, em Aprender e
Treinar, num componente partilhado com `role=alert`, nome acessível e botão
operável pelo teclado. As funções de confirmação/arquivamento, itens, respostas,
XP e competência não foram alterados. Não há posicionamento absoluto nem aviso
oculto. A ausência/presença e a remoção após confirmação não deslocam o hero.

A medição dos primeiros frames reproduziu um vazio no primeiro carregamento
de uma disciplina. O seletor agora prepara o módulo antes de mudar o estado e
o histórico; a troca é aplicada numa única atualização síncrona. Os módulos
continuam lazy e sujeitos aos mesmos budgets de isolamento. Falhas de download
mantêm o seletor; uma escolha abandonada não muda de disciplina mais tarde.

Os ecrãs auxiliares expuseram mais duas inconsistências: a beta guardada sem
query perdia a faixa em Shell sem StudentTop, e o botão automático Voltar era
inserido antes do topo. O contexto de estado partilhado fornece o modo ao Shell;
Voltar é inserido depois do StudentTop quando este existe. Os restantes ecrãs
conservam a ação de retorno e a faixa exterior.

**Escolha explícita do proprietário nesta sessão:** manter a diferença contextual
da faixa privada. O topo é comparado em coordenadas absolutas entre todos os
estados. Os heroes são comparados absolutamente dentro do mesmo contexto;
entre contextos, publicam-se tanto as coordenadas brutas como a diferença
causada pela altura real da faixa e sua margem. Só essa diferença é compensada:
um desvio adicional de mais de 2 px continua a falhar. Não se compensa qualquer
aviso de recuperação, título, botão Voltar ou frame em branco.

## Matriz obrigatória e evidência

| Família | Cobertura |
|---|---|
| Workspace e comparação cruzada | 6 larguras × 2 preferências de movimento × 2 modos × 2 sementes XP/streak = 48 casos |
| Conteúdo de cada caso | Matemática A, Português, FQ A × Aprender/Treinar = 288 estados normais e 288 stresses de texto |
| Sementes | XP 1/streak 1; XP 123456/streak 365; ambas também em beta privada com XP oculto |
| Beta | entrada por query com movimento reduzido; estado privado guardado sem query com movimento normal |
| Frames | clique, microtask, todos os frames de espera e primeiros 3 RAF do destino; 432 transições de abas/disciplinas |
| Recuperação | 6 larguras × 2 movimentos × 2 modos × Português/FQ A × 2 menus = 96 estados com aviso |
| Ação de recuperação | cancelamento por teclado nos dois menus; confirmação em Treinar/reduzido e Aprender/normal, em todas as larguras e modos; arquivo completo preservado, sem XP/competência/sessões concluídas adicionais |
| Após confirmação | comparação com o mesmo hero sem aviso, sem reload, incluindo primeiros frames |
| StudentTop/Shell auxiliares | 6 larguras × interno/reduzido e privado guardado/normal × 3 disciplinas: Progresso, Ranking (incluindo privado), Exames, Rever matéria, Praticar e seletor de disciplinas |
| Regressão anterior | todos os testes anteriores, incluindo os nove diagnósticos, mantidos; helpers apenas extraídos para reutilização |

Larguras: **320, 360, 390, 759, 761, 1440 px**. Altura da matriz: 900 px.
Verificam-se caixas de texto, sobreposições, ancestrais com clipping, limites
locais dos botões, viewport e overflow do documento. O pseudo-elemento do
Apronso usa uma sonda com os estilos computados na mesma célula da grelha;
as imagens reais são medidas pelo DOMRect. As capturas complementam a sonda.

O reporter `workspace-matrix-reporter.cjs` exige as 48 sementes e os seis
estados de cada uma no CI completo. Compara diretamente os slots de XP curto,
longo e oculto, streaks e disciplinas, a 2 px. JSON ausente, combinação ausente,
caixa inválida ou desvio adicional falham o processo de testes. Seis unitários
verificam os controlos negativos desse contrato.

No artefacto `release-browser-<merge SHA>` do Beta CI:

- `test-results/workspace-matrix/raw-cases.json`: todas as medições brutas,
  textos longos e frames, sem normalizar as coordenadas guardadas;
- `test-results/workspace-matrix/cross-state-comparison.json`: cobertura,
  referência de cada comparação, desvios brutos e contextualizados;
- subpastas por teste: `workspace-raw.json`, JSONs dos frames (mesmo quando
  há falha), `recovery-raw.json`, `shell-surfaces-raw.json` e capturas anexadas;
- captura normal para cada estado do workspace; textos longos nas duas abas,
  três disciplinas e seis larguras, incluindo beta; recuperação e auxiliares.

As capturas são gravadas por `page.screenshot({path})` antes de serem anexadas.
Buffers de anexos isolados não são prova de publicação no artefacto. O reporter
exige os nomes de imagens de cada cenário, lê os ficheiros e valida a assinatura
PNG. `workspace-matrix/artifacts.json` cataloga caminhos e tamanhos, assim como
os JSONs brutos de recuperação e dos auxiliares; a ausência de um percurso ou
imagem obrigatório falha a execução completa.

Os artefactos têm a retenção existente de três dias. As medições agregadas são
uma nova verificação adicional; não substituem as asserções dos testes.
Execuções locais focadas ou shards são identificados como parciais e não são
apresentados como prova de toda a matriz.

## Execução e limites

Mantêm-se timeouts de teste/expect/servidor/global e tolerância máxima de 2 px,
sem retries nem exclusões novos. A suite usa **dois workers no mesmo runner**
para suportar a cobertura adicional. Todos os testes e o contrato cruzado
continuam obrigatórios; o limite global continua a ser 600 s. Não foi criada
uma passagem alternativa do CI que omita verificações.

Local: Node 20.20.2, Playwright 1.55.0, Chromium 154 instalado. O CI conserva
o Chromium 140 do Playwright e executa o conjunto completo. Servidor apenas
127.0.0.1; DATABASE_URL, Auth e Data API vazios; todos os dados são sintéticos.
Resultados integrais e decisão final devem referir o HEAD/run desta revisão,
não o CI `43626625190` nem os primeiros testes focados que expuseram falhas.

## Percursos fora da matriz e revisão de completude

Não são cobertas todas as combinações de progresso pedagógico (missão feita,
diagnóstico por fazer, sugestões por padrões de erro), todos os textos possíveis,
zoom/tamanhos de fonte do sistema, Safari/Firefox ou dispositivos físicos.
A matriz de comparação fixa o estado académico para isolar as variáveis
auditadas; os percursos académicos existentes continuam na suite de regressão.

Nos auxiliares, a combinação interno/normal e privado/reduzido não é repetida
em todos os ecrãs; ambos os movimentos/modos são exercitados integralmente no
workspace e na recuperação. Os primeiros frames obrigatórios cobrem abas,
troca de disciplina e recuperação; os auxiliares verificam o estado renderizado
após navegação, não certificam a ausência de fallback em todos os módulos lazy.
Os ramos de confirmação têm o mesmo handler nos dois menus; a aceitação por
menu é distribuída pela preferência de movimento conforme a tabela.

Auth, sincronização externa, contas reais, área dos pais, ferramentas internas
e ações destrutivas/produção não são exercitadas por esta matriz visual. Esses
limites não são apresentados como testes aprovados. A revisão visual independente
continua pendente, com a PR em Draft. Sem merge, deployment, alterações em
produção/Neon/segredos/limites financeiros, worker UI ou avanço da issue #469.
