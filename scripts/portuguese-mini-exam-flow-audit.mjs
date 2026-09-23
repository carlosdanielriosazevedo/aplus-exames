import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portugueseSubject=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const learnPanel=readFileSync(new URL("../app/components/PortugueseLearnPanel.js",import.meta.url),"utf8");
const taxonomy=readFileSync(new URL("../app/data/portugueseTaxonomy.js",import.meta.url),"utf8");
const component=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/components/PortuguesePassageMiniExamRoute.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/portugues-mini-exame/passage-mini-exam.css",import.meta.url),"utf8");
const globalCss=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const subjects=readFileSync(new URL("../app/data/subjects.js",import.meta.url),"utf8");
const prototypeModule=readFileSync(new URL("../app/data/portuguesePassagePrototype.js",import.meta.url),"utf8");
const progressModule=readFileSync(new URL("../app/lib/portugueseWritingProgress.js",import.meta.url),"utf8");

assert.match(page,/dynamic\(\(\)=>import\("\.\/components\/PortuguesePassageMiniExamRoute"\)(?:,\{[^}]*\})?\)/u,"o fluxo principal deve carregar a experiência dedicada de Português por dynamic import");
assert.match(route,/portuguesePassagePrototypeExam/u,"a rota lazy deve consumir o catálogo de protótipos através da camada de dados da app");
assert.match(route,/selectedMiniExamId/u,"a rota deve respeitar o mini-exame escolhido no estado da disciplina");
assert.match(route,/examId==="mini-2"/u,"a rota deve distinguir explicitamente o histórico do segundo mini-exame");
assert.doesNotMatch(page,/content\/vnext/u,"o router principal não deve depender diretamente de fontes editoriais vNext");
assert.match(prototypeModule,/portuguese-639-passage-prototypes\.json/u,"a camada de dados deve consumir o primeiro documento canónico de textos partilhados");
assert.match(prototypeModule,/portuguese-639-passage-prototypes-2\.json/u,"a camada de dados deve consumir o segundo documento canónico de textos partilhados");
assert.match(prototypeModule,/PORTUGUESE_PASSAGE_PROTOTYPE_EXAMS/u,"a camada de dados deve expor um catálogo único de mini-exames");
assert.match(prototypeModule,/"mini-1":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM/u,"o catálogo deve incluir o mini-exame 1");
assert.match(prototypeModule,/"mini-2":PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2/u,"o catálogo deve incluir o mini-exame 2");
assert.match(prototypeModule,/buildPortuguesePassagePrototypeExam/u,"a camada de dados deve construir os mini-exames com o builder canónico");
assert.match(page,/screen==="portugueseMiniExam"/u,"deve existir um ecrã interno dedicado ao mini-exame de Português");
assert.match(page,/onExit=\{\(\)=>go\("exams"\)\}/u,"o mini-exame interno deve regressar à área comum de mini-exames");
assert.match(portugueseSubject,/Mini-exame/u,"o workspace de Português deve dar acesso explícito ao mini-exame");
assert.match(page,/s\.activeSubjectId==="portuguese"/u,"a área normal de exames deve estar preparada para encaminhar Português pelo fluxo próprio");
assert.match(portugueseSubject,/go\("portugueseMiniExam"\)/u,"a área de exames de Português deve encaminhar para o mini-exame integrado");
assert.match(portugueseSubject,/selectMiniExam\("mini-1"\)/u,"a área de exames deve permitir iniciar o mini-exame 1");
assert.match(portugueseSubject,/selectMiniExam\("mini-2"\)/u,"a área de exames deve permitir iniciar o mini-exame 2");

assert.match(portugueseSubject,/PortugueseLearnPanel/u,"o workspace de Português deve integrar Aprender sem criar uma aplicação paralela");
assert.match(portugueseSubject,/<ApronsoNudge pose="thinking">Queres praticar/u,"o hub de treino de Português deve usar o mesmo bloco com Apronso que Matemática A");
assert.match(portugueseSubject,/>Rever matéria<\/b>/u,"o terceiro cartão do hub de treino deve usar a mesma nomenclatura de Matemática A");
assert.doesNotMatch(portugueseSubject,/Rever matéria[\s\S]{0,120}Em breve/u,"Rever matéria em Português deve continuar funcional e não pode regressar a placeholder bloqueado");
assert.match(portugueseSubject,/go\("reviewMatter"\)/u,"Rever matéria deve abrir um ecrã próprio em vez de expandir conteúdo no hub de Treinar");
assert.match(page,/screen==="reviewMatter"&&s\.activeSubjectId==="portuguese"/u,"o router comum deve reconhecer o ecrã dedicado de Rever matéria para Português");
assert.match(portugueseSubject,/view==="reviewMatter"/u,"Português deve renderizar Rever matéria como ecrã próprio");
assert.match(portugueseSubject,/view==="train"[\s\S]*?<\/div>\n  <\/>\);\n\n  if\(!session&&view==="reviewMatter"\)/u,"o hub de Treinar deve terminar nos três cartões antes de começar o ecrã Rever matéria");
assert.match(portugueseSubject,/<Apronso pose="progress" alt="Apronso acompanha o teu progresso"\/>/u,"o progresso de Português deve reutilizar o mesmo Apronso e dimensionamento de Matemática A");
assert.match(globalCss,/\.divisionBadge\{display:flex;flex-direction:column;align-items:center;justify-content:center\}/u,"o cartão semanal de XP deve centrar verticalmente medalha, divisão e XP");
assert.match(learnPanel,/REVER MATÉRIA/u,"o ecrã dedicado deve usar a nomenclatura Rever matéria");
assert.match(learnPanel,/portugueseTaxonomyForYear/u,"Rever matéria deve respeitar o ano escolar e os anos anteriores");
assert.match(learnPanel,/unit\.keyPoints\.map/u,"cada unidade de Aprender deve apresentar pontos essenciais acionáveis");
assert.doesNotMatch(learnPanel,/onPractice|startPractice|trainingRun|go\("training/u,"Rever matéria de Português deve ser estudo passivo, sem iniciar treino");
assert.match(learnPanel,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria deve explicar claramente a diferença face a Praticar");
assert.match(taxonomy,/year:"10\.º"/u,"a taxonomia deve cobrir o 10.º ano");
assert.match(taxonomy,/year:"11\.º"/u,"a taxonomia deve cobrir o 11.º ano");
assert.match(taxonomy,/year:"12\.º"/u,"a taxonomia deve cobrir o 12.º ano");
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  assert.match(taxonomy,new RegExp(`domain:\"${domain}\"`,"u"),`a taxonomia deve incluir o domínio ${domain}`);
}
assert.match(taxonomy,/PORTUGUESE_TAXONOMY_VERSION/u,"a taxonomia deve ter versão editorial explícita");

assert.match(component,/PortuguesePassageMiniExam\(\{exam,onExit=null,onComplete=null\}\)/u,"o componente deve aceitar saída e conclusão para integração no fluxo principal");
assert.match(component,/Guardar revisão e voltar aos mini-exames/u,"a revisão concluída deve ser guardada antes de regressar à área comum");
assert.match(component,/Terminar e rever o exame/u,"o fim deve encaminhar diretamente para a revisão");
assert.doesNotMatch(component,/Voltar às respostas/u,"um exame já terminado não deve regressar ao fluxo de resposta");
assert.match(route,/recordSubjectSession/u,"a conclusão deve ficar no progresso canónico da disciplina");
assert.match(component,/não atribui automaticamente uma classificação final/u,"a execução não pode transformar resposta aberta em nota automática");
assert.match(component,/const \[selfAssessment,setSelfAssessment\]=useState\(\{\}\)/u,"a revisão deve guardar a autoavaliação por critério na tentativa");
assert.match(component,/PORTUGUESE_SELF_ASSESSMENT_LEVELS/u,"a autoavaliação deve consumir estados explícitos da camada pedagógica");
assert.match(component,/criterionFeedback/u,"a revisão deve produzir feedback pedagógico por critério");
assert.match(component,/selfAssessmentSummary/u,"a revisão deve calcular o próximo passo sem produzir nota");
assert.match(component,/Onde está a evidência na tua resposta\?/u,"a revisão deve recolher evidência textual por critério");
assert.match(component,/row\.rubric\?\.criteria/u,"os critérios apresentados devem vir da grelha editorial do item");
assert.match(component,/critérios com evidência escrita/u,"a revisão deve tornar visível o progresso de evidência");

assert.match(component,/const \[revisionDrafts,setRevisionDrafts\]=useState\(\{\}\)/u,"o aluno deve poder preparar uma nova versão sem destruir a anterior");
assert.match(component,/const \[revisions,setRevisions\]=useState\(\{\}\)/u,"o histórico de revisões deve ficar separado da resposta atual");
assert.match(component,/function revisionTargets/u,"a revisão deve associar a nova versão aos critérios que o aluno tentou melhorar");
assert.match(component,/\["partial","not-yet"\]/u,"lacunas e cumprimento parcial devem ter prioridade como alvos de melhoria");
assert.match(component,/targetedCriterionIds/u,"cada revisão deve guardar os critérios trabalhados");
assert.match(component,/criteria\.find\(criterion=>criterion\.id===id\)\?\.label/u,"o histórico deve resolver o rótulo pelo ID exato do critério trabalhado");
assert.match(component,/before,after/u,"cada revisão deve preservar explicitamente versões antes e depois");
assert.match(component,/Melhorar resposta/u,"a revisão deve oferecer uma ação explícita de melhoria");
assert.match(component,/Guardar nova versão/u,"a nova redação deve ser confirmada antes de substituir a resposta atual");
assert.match(component,/Antes · versão/u,"o histórico deve mostrar a versão anterior");
assert.match(component,/Depois · versão/u,"o histórico deve mostrar a versão melhorada");
assert.match(component,/respostas abertas melhoradas/u,"o resumo deve tornar visível quantas respostas foram efetivamente revistas");
assert.match(css,/\.ptx-revision-compare\{[^}]*grid-template-columns:1fr 1fr/u,"desktop deve comparar antes/depois lado a lado");
assert.match(css,/@media\(max-width:820px\)[\s\S]*\.ptx-revision-compare\{grid-template-columns:1fr\}/u,"mobile deve empilhar a comparação antes/depois");

assert.match(component,/writingMemoryProfile/u,"a revisão deve consumir o perfil agregado da memória de escrita");
assert.match(component,/excludeAttemptId:attemptId/u,"a tentativa atual não pode fabricar o seu próprio padrão histórico");
assert.match(component,/Padrões de escrita que tens assinalado/u,"o aluno deve conseguir ver um resumo explícito dos padrões autoassinalados");
assert.match(component,/Padrão transversal/u,"a UI deve distinguir padrões sustentados em mais de um domínio");
assert.match(component,/Padrão do domínio/u,"a UI deve distinguir padrões ainda específicos de um domínio");
assert.match(component,/Só aparece após repetição suficiente/u,"a UI deve explicar o limiar conservador do resumo");
assert.match(component,/não é uma classificação nem um diagnóstico automático/u,"o perfil agregado deve explicitar que não é nota nem diagnóstico");

assert.match(component,/writingActivePreAnswerFocus/u,"a execução deve usar apenas atenções ainda ativas no foco pré-resposta");
assert.match(progressModule,/writingActivePreAnswerFocus/u,"o motor temporal deve filtrar do foco as atenções que deixaram de ser recorrentes");
assert.match(progressModule,/suppressedResolved/u,"a supressão de um lembrete resolvido deve ficar explícita e auditável");
assert.match(component,/const \[dismissedWritingFocus,setDismissedWritingFocus\]=useState\(\{\}\)/u,"o aluno deve poder ocultar um lembrete pré-resposta sem apagar a memória");
assert.match(component,/Antes de responder, escolhe 1–2 pontos para vigiar/u,"o foco deve surgir antes da escrita, não apenas na correção");
assert.match(component,/Pontos que deixaram de ser atenção recorrente nas tentativas recentes deixam de aparecer aqui/u,"a UI deve explicar porque um lembrete pode desaparecer com evolução sustentada");
assert.match(component,/>Ocultar<\/button>/u,"o foco pedagógico deve ser dispensável pelo aluno");
assert.match(css,/\.ptx-memory-focus\{/u,"o foco pré-resposta deve ter apresentação própria e não parecer uma correção final");
assert.match(css,/@media\(max-width:820px\)[\s\S]*\.ptx-memory-focus-head\{flex-direction:column\}/u,"o foco pré-resposta deve adaptar-se ao mobile");

assert.match(component,/writingResolvedAttentions/u,"a revisão deve consumir a evolução temporal das atenções recorrentes");
assert.match(component,/const writingProgress=useMemo/u,"a evolução deve ser derivada da memória existente e não guardada como conclusão separada");
assert.match(component,/Boa evolução nas tuas autoavaliações/u,"a UI deve tornar visível quando uma atenção deixa de ser recorrente nas tentativas recentes");
assert.match(component,/não uma conclusão definitiva/u,"a UI deve deixar explícito que a evolução recente é reversível");
assert.match(progressModule,/deixou de aparecer como atenção recorrente por agora/u,"o motor deve usar linguagem reversível em vez de declarar um problema resolvido");
assert.doesNotMatch(progressModule,/problema resolvido/iu,"o motor não deve declarar a escrita definitivamente resolvida");
assert.match(css,/\.ptx-progress-story\{/u,"a evolução recente deve ter apresentação própria na revisão");
assert.match(css,/@media\(max-width:820px\)[\s\S]*\.ptx-progress-story-list\{grid-template-columns:1fr\}/u,"o resumo de evolução deve adaptar-se ao mobile");

assert.match(component,/não produz(?:em)? classificação automática final/u,"autoavaliação, revisões e memória não podem ser convertidas numa classificação final");
assert.doesNotMatch(component,/set.*points/iu,"a UI não deve escrever pontuação automática");

const portugueseRow=subjects.match(/\{id:"portuguese"[^\n]+\}/u)?.[0]||"";
assert.ok(portugueseRow,"Português deve continuar no catálogo de disciplinas");
assert.match(portugueseRow,/releaseStage:"foundation"/u,"Português deve continuar marcado como foundation");
assert.match(portugueseRow,/available:true/u,"Português deve estar selecionável no beta atual");

console.log("✓ Português integrado: Aprender por ano/unidade · dois mini-exames no mesmo motor · revisão e memória conservadoras · foundation · zero nota automática");
