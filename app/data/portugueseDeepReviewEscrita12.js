export const PORTUGUESE_ESCRITA_12_DEEP_REVIEW_VERSION="2026.10-wave25";

export const PORTUGUESE_ESCRITA_12_DEEP_REVIEW={
  id:"pt12-escrita",
  title:"Escrita · opinião, apreciação crítica e exposição",
  lead:"No 12.º ano, escrever com qualidade significa tomar decisões autónomas sobre conteúdo, organização, fundamentação, linguagem e revisão. As Aprendizagens Essenciais de março de 2026 mantêm como géneros centrais o texto de opinião, a apreciação crítica e a exposição sobre um tema, mas exigem uma execução mais madura: pesquisa e seleção de informação pertinente, planificação eficaz, desenvolvimento consistente, controlo da coesão, revisão e referenciação adequada.",
  goals:[
    "Transformar o enunciado num plano funcional antes da redação.",
    "Defender uma tese com argumentos distintos, evidência pertinente e progressão real.",
    "Produzir apreciação crítica com critérios explícitos e juízos fundamentados.",
    "Construir exposições claras, hierarquizadas e rigorosas sem derivar para opinião gratuita.",
    "Integrar informação pesquisada sem copiar nem perder a voz do texto.",
    "Rever por camadas: tarefa, estrutura, parágrafos, frase e correção linguística.",
    "Usar referenciação e fontes como parte da integridade do texto, não como adereço final."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais · Português · 12.º ano · março de 2026 · Escrita",
    "DGE · texto de opinião, apreciação crítica e exposição sobre um tema; pesquisa, planificação, redação, revisão e referenciação bibliográfica",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt12-escrita-enunciado-plano",
      kicker:"1 · ENUNCIADO E PLANIFICAÇÃO",
      title:"O primeiro erro de escrita acontece muitas vezes antes da primeira frase",
      paragraphs:[
        "Começa por decompor o enunciado: género, tema, finalidade, destinatário, extensão e elementos obrigatórios. Uma resposta elegante pode perder qualidade se resolver apenas parte da tarefa ou adotar um género diferente do pedido.",
        "Planificar não é escrever uma introdução provisória. É decidir a função de cada bloco: enquadramento, tese ou foco, desenvolvimento, exemplos, articulação entre ideias e conclusão. Um plano curto deve tornar visível a progressão antes da redação.",
        "No 12.º ano, o aluno deve conseguir selecionar o essencial sem depender de modelos fixos. Estruturas memorizadas podem ajudar a começar, mas nunca substituem a adaptação ao problema concreto do enunciado."
      ],
      signals:["Enunciado → género + objetivo + requisitos.","Plano → função de cada parágrafo.","Modelo é apoio; não é molde rígido."],
      example:{title:"Exemplo · decompor a tarefa",prompt:"O enunciado pede um texto de opinião com dois argumentos e referência a uma situação concreta. O que tens de garantir?",steps:["Formula a posição central.","Escolhe dois argumentos diferentes.","Associa evidência ou exemplo concreto a pelo menos um argumento.","Planeia uma conclusão coerente com o desenvolvimento."],modelAnswer:"Antes de redigir, o plano deve tornar identificáveis a tese, dois argumentos distintos, a situação concreta que funcionará como evidência e uma conclusão que feche a linha argumentativa sem introduzir matéria nova.",note:"Qualidade estilística não compensa requisitos em falta."},
      remember:"Planear é decidir relações e funções antes de escolher frases.",
      pitfalls:["Começar a escrever sem decompor o enunciado.","Usar um esquema memorizado sem adaptação.","Confundir plano com lista de frases prontas."]
    },
    {
      id:"pt12-escrita-opiniao",
      kicker:"2 · TEXTO DE OPINIÃO",
      title:"Uma tese só se torna convincente quando cada argumento acrescenta uma razão real",
      paragraphs:[
        "O texto de opinião precisa de uma posição identificável sobre uma questão discutível. A tese não tem de começar por fórmulas como «na minha opinião»; tem de ser reconhecível pela direção do texto.",
        "Um bom parágrafo argumentativo avança por afirmação → explicação → evidência/exemplo → ligação à tese. Dois parágrafos que dizem a mesma coisa com palavras diferentes não constituem dois argumentos.",
        "Contra-argumentar não é obrigatório em todas as tarefas, mas pode aumentar a robustez quando se reconhece uma objeção relevante e se responde a ela. A conclusão sintetiza e fecha; não inaugura um argumento que não foi desenvolvido."
      ],
      signals:["Tese clara e discutível.","Argumentos distintos, não paráfrases.","Exemplo só ganha força quando se explica o que demonstra."],
      example:{title:"Exemplo · argumento desenvolvido",prompt:"Transforma «a tecnologia ajuda os alunos» num argumento real.",steps:["Especifica que dimensão melhora.","Explica o mecanismo.","Dá evidência ou consequência concreta.","Liga o efeito à tese."],modelAnswer:"A tecnologia pode aumentar a autonomia quando permite feedback imediato e acesso organizado a materiais de revisão. Esse mecanismo reduz a dependência de correções tardias e ajuda o aluno a identificar lacunas mais cedo, o que sustenta a defesa do seu uso pedagógico quando existe orientação adequada.",note:"Uma afirmação plausível ainda não é um argumento desenvolvido."},
      remember:"Argumentar é mostrar por que razão a tese deve ser aceite.",
      pitfalls:["Confundir intensidade de opinião com força argumentativa.","Usar exemplos decorativos.","Repetir a tese em todos os parágrafos."]
    },
    {
      id:"pt12-escrita-apreciacao",
      kicker:"3 · APRECIAÇÃO CRÍTICA",
      title:"Avaliar exige critérios, não uma coleção de adjetivos",
      paragraphs:[
        "A apreciação crítica identifica e contextualiza o objeto, mas não se transforma numa sinopse longa. Resume apenas o que é necessário para sustentar a análise.",
        "Cada juízo deve apoiar-se num critério e numa evidência observável. Dizer que uma obra é «forte», «fraca» ou «emocionante» tem pouco valor se não se explicar em que aspeto e por que mecanismo produz esse efeito.",
        "Uma apreciação madura pode reconhecer simultaneamente méritos e limites. O balanço final deve resultar do desenvolvimento e não de uma impressão pessoal desligada dos critérios usados."
      ],
      signals:["Objeto + critério + evidência + juízo.","Resumo serve contexto; não ocupa o texto todo.","Avaliação pode ser nuançada sem ser contraditória."],
      example:{title:"Exemplo · juízo fundamentado",prompt:"Como transformas «o livro é muito original» numa apreciação crítica?",steps:["Define em que aspeto é original.","Indica uma característica concreta.","Explica o efeito dessa escolha.","Formula o juízo como conclusão."],modelAnswer:"A construção temporal é particularmente eficaz porque reorganiza a informação de modo a alterar progressivamente a perceção das personagens. Essa estrutura obriga o leitor a rever interpretações anteriores e constitui uma razão concreta para considerar a obra formalmente original.",note:"«Gostei» pode iniciar uma reflexão; não a fundamenta."},
      remember:"A crítica forte transforma impressão em julgamento demonstrado.",
      pitfalls:["Fazer apenas resumo.","Acumular adjetivos sem evidência.","Terminar com um juízo que contradiz o desenvolvimento."]
    },
    {
      id:"pt12-escrita-exposicao",
      kicker:"4 · EXPOSIÇÃO SOBRE UM TEMA",
      title:"Explicar bem é selecionar, hierarquizar e tornar relações visíveis",
      paragraphs:[
        "A exposição tem finalidade predominantemente informativa e explicativa. O tema deve ser delimitado e dividido em subtemas ou relações que o leitor consiga acompanhar.",
        "A progressão pode organizar-se do geral para o particular, por causa e efeito, problema e consequência, categorias ou outro princípio claro. Enumerar factos não é o mesmo que explicar.",
        "Informação pesquisada deve ser reformulada e integrada na lógica do texto. Um exemplo esclarece uma ideia, mas não substitui a explicação do conceito ou do mecanismo."
      ],
      signals:["Delimitar antes de desenvolver.","Informação deve obedecer a uma hierarquia.","Exemplo esclarece; não substitui explicação."],
      example:{title:"Exemplo · organizar informação",prompt:"Tens cinco factos sobre um fenómeno. Como evitas uma lista?",steps:["Agrupa-os por relação comum.","Define uma ordem lógica.","Explica como cada grupo se liga ao tema.","Fecha com síntese do mecanismo global."],modelAnswer:"Os factos devem ser agrupados segundo uma relação explicativa — por exemplo, causas, efeitos e respostas. Essa estrutura permite mostrar como a informação se encadeia e transforma uma enumeração numa exposição coerente.",note:"Mais informação não significa necessariamente melhor explicação."},
      remember:"Expor = selecionar + ordenar + explicar relações.",
      pitfalls:["Colar dados sem integração.","Confundir quantidade de informação com clareza.","Fechar com opinião pessoal não sustentada."]
    },
    {
      id:"pt12-escrita-fontes",
      kicker:"5 · PESQUISA, INTEGRAÇÃO E REFERENCIAÇÃO",
      title:"Usar uma fonte bem é compreender, reformular e tornar a origem rastreável",
      paragraphs:[
        "A pesquisa começa pela pertinência e fiabilidade da fonte. Nem tudo o que aparece numa pesquisa merece ser integrado; seleciona apenas o que contribui para o objetivo do texto.",
        "Parafrasear não é trocar algumas palavras. É reconstruir a informação com outra formulação e integrá-la na tua linha de raciocínio, preservando o sentido essencial.",
        "Quando a tarefa exige referenciação bibliográfica, mantém um sistema consistente e regista as fontes desde a pesquisa. Uma referência no fim não legitima uma reprodução demasiado próxima do original."
      ],
      signals:["Fonte → pertinência + fiabilidade.","Paráfrase → compreensão + reformulação real.","Referência não apaga cópia excessivamente próxima."],
      example:{title:"Exemplo · integrar uma fonte",prompt:"Encontraste um dado estatístico relevante. Como o incorporas?",steps:["Confirma a fonte.","Seleciona apenas o dado necessário.","Integra-o numa frase que explique a sua função.","Regista a origem no formato pedido."],modelAnswer:"O dado deve surgir ligado ao argumento ou explicação que sustenta, e não como número isolado. A referência identifica a origem; a frase do aluno explica por que razão esse dado é relevante para a ideia em desenvolvimento.",note:"Fonte e raciocínio cumprem funções diferentes."},
      remember:"Referenciar é assumir a origem da informação; integrar é dar-lhe função no teu texto.",
      pitfalls:["Copiar e apenas acrescentar bibliografia.","Usar fontes pouco fiáveis sem avaliação.","Inserir dados sem explicar a relevância."]
    },
    {
      id:"pt12-escrita-coesao-revisao",
      kicker:"6 · COESÃO E REVISÃO",
      title:"Revê em camadas: primeiro o texto, depois as frases",
      paragraphs:[
        "A coesão não se mede pelo número de conectores. Ela resulta de relações lógicas claras, cadeias referenciais estáveis, progressão lexical e transições que ajudam o leitor a perceber como uma ideia nasce da anterior.",
        "Revê por níveis. Primeiro confirma se respondeste à tarefa e se a estrutura funciona; depois verifica a função e ligação dos parágrafos; só no fim corrige pontuação, concordância, regência, ortografia e escolhas lexicais.",
        "Revisão avançada inclui cortar. Frases repetidas, exemplos redundantes e introduções demasiado genéricas podem enfraquecer um texto mesmo quando não contêm erros gramaticais."
      ],
      signals:["Coesão = relações claras, não conectores em série.","Revisão macro → meso → micro.","Eliminar redundância também é melhorar o texto."],
      example:{title:"Exemplo · revisão eficiente",prompt:"O texto está correto mas repetitivo. Por onde começas?",steps:["Identifica ideias repetidas.","Funde ou elimina redundâncias.","Verifica se cada parágrafo acrescenta algo novo.","Só depois melhora conectores e formulação."],modelAnswer:"A prioridade é corrigir a progressão: se dois parágrafos cumprem a mesma função, devem ser fundidos ou diferenciados. Só depois faz sentido aperfeiçoar conectores e escolhas lexicais, porque a coesão não resolve falta de progressão conceptual.",note:"Não polas frases antes de confirmar que elas merecem ficar."},
      remember:"Primeiro corrige o raciocínio; depois a organização; finalmente a superfície linguística.",
      pitfalls:["Rever apenas ortografia.","Trocar conectores sem corrigir a lógica.","Manter frases redundantes só porque estão corretas."]
    },
    {
      id:"pt12-escrita-exame",
      kicker:"7 · MÉTODO DE EXAME",
      title:"Escreve para cumprir critérios, não para impressionar com complexidade",
      paragraphs:[
        "Antes de começar, converte o enunciado numa checklist verificável. Durante a redação, acompanha extensão, requisitos e equilíbrio entre partes para não descobrir uma omissão nos minutos finais.",
        "Privilegia precisão sobre ornamentação. Frases excessivamente longas, vocabulário artificial ou citações decorativas aumentam o risco de erro e raramente compensam falta de desenvolvimento.",
        "Reserva tempo real para revisão. Nos minutos finais, verifica primeiro se todos os requisitos estão presentes, depois coerência e progressão e, por fim, correção linguística."
      ],
      signals:["Checklist antes da redação.","Precisão > complexidade ornamental.","Reserva revisão no plano temporal da prova."],
      example:{title:"Exemplo · últimos minutos",prompt:"Faltam cinco minutos e o texto está completo. O que revês primeiro?",steps:["Confirma género e requisitos.","Verifica se cada parágrafo tem função clara.","Procura contradições e referentes ambíguos.","Corrige erros linguísticos mais visíveis."],modelAnswer:"A revisão final deve começar pelos critérios que mais podem comprometer a resposta: cumprimento integral da tarefa, coerência e progressão. Depois corrige problemas de referência, sintaxe, pontuação, ortografia e léxico.",note:"Uma palavra sofisticada nunca vale mais do que uma ideia clara e correta."},
      remember:"No exame, qualidade é adequação + desenvolvimento + organização + correção.",
      pitfalls:["Gastar demasiado tempo na primeira frase.","Introduzir ideias novas na conclusão.","Entregar sem revisão estruturada."]
    }
  ]
};

export function portugueseEscrita12DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ESCRITA_12_DEEP_REVIEW.id?PORTUGUESE_ESCRITA_12_DEEP_REVIEW:null;
}
