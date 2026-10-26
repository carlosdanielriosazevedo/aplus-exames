# Revisão da experiência de aprendizagem — 26/10/2026

Base: main 0364449d75c2f55151ff22e96d4c564075c960b8. Projeto isolado: applus-beta-synthetic-isolated / prj_8n5XwTMF651SAfsykIDji93oZp3r. Nenhuma intervenção na produção.

## Observações reais antes da alteração

Deployment baseline: dpl_4b1x6KfZAVwSY6GNcQMzLLbtzdv6, mesmo SHA de main, URL https://applus-beta-synthetic-isolated-73oyrr5b9.vercel.app. Navegação anónima e respostas exclusivamente sintéticas, sem conta nem gravação cloud deliberada.

- Num treino de Português, aparecem ← Voltar, Guardar e sair e Guardar e continuar depois. O Shell injeta a primeira saída porque a rota continua a ser a preparação do treino, apesar de StudySessionHeader estar presente.
- A correção aberta de Português apresenta pontuação repetida, linhas de critérios sem separação e listas repetidas. Num exemplo com 107 palavras, o bloco portugueseFeedback mede 2480,47 px de altura e contém 4552 caracteres.
- Texto de critérios/feedback medido no browser: 11 px. A leitura principal compete com detalhes editoriais extensos.
- Rever Matéria e os quatro menus têm capturas da base atual no CI 40246133412, com matriz desktop/mobile. Estas capturas não substituem o novo percurso completo.

## Alterações deste ciclo

1. StudySessionHeader passa a ser reconhecido pelo Shell como saída explícita. Remove-se o botão duplicado no fundo da sessão de Português; o Guardar e sair mantém o mesmo handler de persistência.
2. Texto de feedback passa a 14 px, títulos a 15 px, entrelinha e contraste coerentes, nas superfícies partilhadas. As informações de avaliação provisória mantêm-se visíveis.
3. Pontuação por critério e análise detalhada de Português ficam em disclosures nativos, acessíveis por teclado. Nada é removido da avaliação. Avisos de inconsistência e penalização global continuam visíveis fora dos disclosures.
4. Resumo de pontuação não é repetido quando o componente pai já o apresenta. Matemática mantém o resumo e as etapas existentes.

Não se alteram motores, grelhas, conteúdo, pontuações, APIs, base de dados, persistência ou política editorial.

## Validação a executar

- Três percursos reais em Chromium CI: configuração, diagnóstico completo, Aprender, Missão, Treino, Mini-exame, correção, Progresso, Ranking e Rever Matéria; sem backend configurado, requests externos bloqueados.
- 18 casos focados: três disciplinas × 320/360/390/430/1366/1920 px, submissão de respostas sintéticas, leitura/expansão dos critérios, ausência de overflow e resposta bloqueada após submissão.
- Capturas em /tmp/audit-journey, artefacto GitHub de três dias.
- CI integral, Technical Gate, unitários, build e budgets sem afrouxamento de limites.

## Achado pedagógico separado — por resolver

Item PT639-FND-126 pede uma tese sobre reservar um período diário sem telemóveis. Resposta sintética: «As escolas devem reservar um período sem telemóveis porque melhora a concentração.» O browser devolveu «Não é essa.»; gradePortugueseResponse confirma comparação exata após normalização para short-answer. As acceptedAnswers só contêm quatro formulações fixas. Uma tarefa de formulação livre de tese pode produzir falsos negativos com esta classificação. Este caso precisa de revisão editorial/pedagógica e testes de paráfrases antes de qualquer alteração do corretor. Não se resolveu esta limitação apenas mudando a apresentação nem se declara excelência pedagógica validada.

## Estado

Candidato em validação. Sem publicação em produção. A branch está isolada de codex/integration-next, que contém uma experiência de performance ainda não integrada. Os novos testes usam apenas fixtures locais sintéticas; não copiam dados de utilizadores. A falha de arranque de Chromium local é uma limitação do runtime; a evidência de browser será recolhida em GitHub Actions e no projeto Vercel isolado.

## Continuação da validação

CI 40251145482 no head 8909395: 165 browser PASS, incluindo os três percursos completos; seis falhas na asserção toBeDisabled aplicada a um fieldset (o matcher não mede esse elemento como um input). A verificação foi corrigida para exigir o atributo disabled e testar cada textarea individualmente. Mantém-se a proibição de editar respostas submetidas. Não se declara o CI inicial aprovado.

As capturas também confirmaram uma segunda saída em Matemática, antes e depois da submissão. Foi removida a saída redundante no fundo de Missão/Treino/Mini-exame e explicitado Guardar e sair no StudySessionHeader, com os handlers existentes. Os testes de retoma e reset passam a utilizar essa saída única. A matriz de correção verifica uma saída antes e depois da submissão. Os campos guiados de Matemática passam a ter fonte herdada, 16 px, padding e borda coerentes, sem mudar o bloqueio ou as respostas.

O achado pedagógico está na Issue #418. Probe com o motor real: tese de referência 13/13; a mesma tese acrescida de «porque isso melhora a concentração» 0/13, final=true. A apresentação nova não resolve este problema.

## Bloqueio de configuração também corrigido

No percurso manual, um perfil de 12.º ano sem matéria atual assinalada mostrava «Podes continuar a preparar-te com a matéria dos anos anteriores», mas o botão Continuar estava desativado. O guard de curriculumOnboard bloqueava precisamente 11.º/12.º sem seleção. Foi removido esse guard de navegação, mantendo intacta a seleção de scopedItems que exclui o ano atual sem matéria dada. Dois testes UI cobrem 11.º e 12.º, configuração vazia, retoma e diagnóstico construído exclusivamente com anos anteriores. O 10.º mantém a política existente de disponibilidade do diagnóstico; não se alteraram os motores.

## Confirmação explícita da saída nos testes

A repetição do CI 40319713867 falhou nos quatro casos de pausa de Matemática: o botão canónico StudySessionHeader abre a confirmação de segurança existente, que o Playwright dispensa por omissão. A sessão não saía, por isso o cartão de retoma não aparecia. Os testes de pausa/reset passam a esperar o diálogo confirm, verificar a mensagem de conservação e aceitar explicitamente antes de exigir a retoma e preservação. Não se removeu a confirmação nem se relaxaram os testes de dados; o CI final é repetido no novo head.

As capturas do CI em 320 e 1920 px mostraram ainda os três campos guiados de Matemática com larguras diferentes: o justify-content herdado fazia encolher a coluna grid segundo o título. A coluna fica explicitamente minmax(0,1fr), com alinhamento stretch, e os seis cenários passam a exigir os mesmos x/largura e fonte mínima de 16 px para os três campos.

CI 40323587240 no head cf902613 passou 173 browser em 8,3 min e 770 checks de recuperação, mas falhou em dois testes unitários de contrato que ainda exigiam o guard de Português removido. Atualizaram-se esses contratos para a continuação com anos anteriores, mantendo as guardas de seleção/nota e a indisponibilidade do diagnóstico do 10.º sem âmbito suficiente. Os dois testes browser exigem que todas as perguntas sejam de anos anteriores. O CI só será aprovado depois de repetir no head final; os testes antigos não foram eliminados.
