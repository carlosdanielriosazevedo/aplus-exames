export const PORTUGUESE_ESCRITA_11_DEEP_REVIEW_VERSION="2026.10-wave16";

export const PORTUGUESE_ESCRITA_11_DEEP_REVIEW={
  id:"pt11-escrita",
  title:"Escrita · opinião, apreciação crítica e exposição",
  lead:"No 11.º ano, escrever bem significa responder integralmente ao género e à finalidade pedidos, selecionar informação pertinente, organizar ideias com progressão e rever o texto antes de o dar por concluído. Os géneros centrais — texto de opinião, apreciação crítica e exposição sobre um tema — exigem decisões diferentes, mas partilham uma base: planear, desenvolver, ligar e rever. A qualidade nasce de escolhas controladas, não de frases artificialmente complexas.",
  goals:[
    "Planificar a escrita a partir de género, tema, finalidade, destinatário e requisitos do enunciado.",
    "Escrever texto de opinião com tese clara, argumentos distintos, evidência e conclusão coerente.",
    "Escrever apreciação crítica articulando contextualização, critérios, evidência e juízo fundamentado.",
    "Escrever exposição sobre um tema com hierarquia de informação, explicação e progressão lógica.",
    "Usar mecanismos de coesão de forma funcional, sem repetição mecânica de conectores.",
    "Rever conteúdo, estrutura, correção linguística e referenciação de forma hierarquizada.",
    "Transformar tarefas de exame numa checklist de requisitos antes de começar a redação."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 11.º ano · referencial homologado em vigor · Escrita: texto de opinião, apreciação crítica e exposição sobre um tema",
    "DGE · Escrita · pesquisa e seleção de informação, planificação, textualização, revisão e referenciação bibliográfica",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-escrita-planificacao",
      kicker:"1 · PLANIFICAÇÃO E PESQUISA",
      title:"Antes de escrever frases, decide o que o texto precisa de cumprir",
      paragraphs:[
        "Começa pelo enunciado. Identifica género, tema, finalidade, destinatário, extensão e tarefas obrigatórias. Um texto pode estar linguisticamente correto e ainda falhar se ignorar um requisito essencial ou responder a um género diferente do pedido.",
        "Quando a tarefa exige pesquisa, seleciona informação pela pertinência e fiabilidade. Agrupa dados por ideias, elimina redundâncias e regista a origem do que será necessário referenciar. A pesquisa alimenta o plano; não substitui a organização do texto.",
        "O plano deve antecipar a função de cada parágrafo. Decide onde enquadras o tema, onde desenvolves cada argumento ou subtema, que exemplos usas e como concluis. Pensar relações antes de escrever reduz repetições e evita conclusões que introduzem matéria nova."
      ],
      signals:["Enunciado → género + finalidade + destinatário + requisitos.","Pesquisa → selecionar + organizar + registar fontes.","Plano → uma função clara por parágrafo e progressão explícita."],
      example:{
        title:"Exemplo · planear um texto de opinião",
        prompt:"Tens de defender uma posição com dois argumentos e um exemplo. Que plano mínimo preparas?",
        steps:["Formula a tese numa frase completa.","Escolhe dois argumentos realmente diferentes.","Associa evidência ou exemplo a cada argumento.","Planeia uma conclusão que retome a posição sem abrir matéria nova."],
        modelAnswer:"O plano deve prever uma introdução que enquadre o problema e torne a tese clara, dois parágrafos argumentativos com razões diferentes e evidência pertinente e uma conclusão que sintetize a posição e as suas consequências.",
        note:"Um plano curto evita reformulações longas durante a redação."
      },
      remember:"Planeia funções, não frases decoradas: tese, argumento, evidência, relação, conclusão.",
      pitfalls:["Começar sem decompor o enunciado.","Acumular pesquisa sem selecionar.","Planear vários parágrafos que repetem a mesma ideia."]
    },
    {
      id:"pt11-escrita-opiniao",
      kicker:"2 · TEXTO DE OPINIÃO",
      title:"Uma opinião torna-se argumentação quando mostra por que razão deve ser aceite",
      paragraphs:[
        "O texto de opinião defende uma tese sobre uma questão discutível. A introdução deve enquadrar o problema e tornar a posição identificável, sem depender de fórmulas como «na minha opinião». O leitor precisa de saber qual é a ideia que o texto vai sustentar.",
        "Cada argumento deve acrescentar uma razão diferente. Desenvolve-o pela cadeia afirmação → explicação → evidência/exemplo → ligação à tese. Um exemplo isolado ilustra; só se torna apoio argumentativo quando explicas o que demonstra.",
        "Uma objeção bem escolhida pode fortalecer o texto. Reconhecer uma limitação ou posição contrária e responder-lhe mostra domínio do problema. A conclusão fecha a linha argumentativa e não deve introduzir uma nova razão que nunca foi desenvolvida."
      ],
      signals:["Tese clara e discutível.","Argumento: razão → explicação → evidência → ligação à tese.","Conclusão fecha a linha argumentativa; não inaugura um argumento."],
      example:{
        title:"Exemplo · aprofundar um argumento vago",
        prompt:"Escreveste «a medida é boa porque ajuda os alunos». Como melhoras?",
        steps:["Especifica a dificuldade a que responde.","Explica o mecanismo do benefício.","Acrescenta um exemplo ou consequência pertinente.","Liga esse efeito à tese defendida."],
        modelAnswer:"A medida pode melhorar a autonomia dos alunos porque cria um período regular para planear e rever o trabalho antes da avaliação. Ao reduzir decisões de última hora, favorece uma preparação mais consistente, o que sustenta a defesa da medida como instrumento de organização e aprendizagem.",
        note:"Evita argumentos circulares como «é importante porque tem importância»."
      },
      remember:"Opinião = posição; argumentação = razões desenvolvidas que tornam essa posição defensável.",
      pitfalls:["Confundir convicção forte com argumento forte.","Usar exemplos sem explicar o que provam.","Introduzir uma nova razão na conclusão."]
    },
    {
      id:"pt11-escrita-apreciacao",
      kicker:"3 · APRECIAÇÃO CRÍTICA",
      title:"Descrever o objeto é apenas o começo; avaliar exige critérios e evidência",
      paragraphs:[
        "A apreciação crítica identifica e contextualiza o objeto avaliado, mas não deve transformar-se numa sinopse extensa. Resume apenas o necessário para o leitor compreender o que será avaliado e por que critérios.",
        "Um juízo precisa de fundamento. Se consideras uma obra eficaz, original, incoerente ou previsível, explicita o critério e apresenta uma característica concreta que justifique a avaliação. O objetivo é substituir adjetivos soltos por relações demonstráveis.",
        "A apreciação pode reconhecer méritos e limitações. Essa nuance não é incoerência quando os juízos incidem sobre aspetos diferentes. O balanço final deve ser compatível com os critérios desenvolvidos ao longo do texto."
      ],
      signals:["Contextualização breve: identifica o objeto e o enquadramento necessário.","Avaliação: critério + evidência + juízo.","Balanço final integra méritos e limites sem contradizer o desenvolvimento."],
      example:{
        title:"Exemplo · transformar adjetivo em crítica",
        prompt:"Escreveste «o filme é excelente e emocionante». Como fundamentas?",
        steps:["Define o aspeto avaliado.","Escolhe uma característica observável.","Explica o efeito produzido.","Formula o juízo como conclusão desse raciocínio."],
        modelAnswer:"A interpretação é particularmente eficaz porque as mudanças de tom e expressão tornam visível a evolução emocional da personagem sem depender de explicações externas. Essa construção dá credibilidade ao conflito e constitui uma razão concreta para a avaliação positiva do filme.",
        note:"«Gostei» pode ser ponto de partida pessoal; não é ainda fundamentação crítica."
      },
      remember:"Apreciação crítica = objeto + critério + evidência + avaliação.",
      pitfalls:["Escrever uma sinopse em vez de uma crítica.","Acumular adjetivos sem critérios.","Fazer um balanço incompatível com o corpo do texto."]
    },
    {
      id:"pt11-escrita-exposicao",
      kicker:"4 · EXPOSIÇÃO SOBRE UM TEMA",
      title:"Explicar exige hierarquia, precisão e relações claras entre ideias",
      paragraphs:[
        "A exposição tem finalidade predominantemente informativa e explicativa. Começa por delimitar o assunto e organizar subtemas. Uma sequência lógica pode avançar do geral para o particular, de causa para consequência, de conceito para exemplo ou por categorias bem definidas.",
        "A informação pesquisada deve ser reformulada e integrada. Copiar frases de fontes produz um texto fragmentado e aumenta o risco de erro de referenciação. Usa vocabulário preciso e exemplos que esclareçam a ideia sem substituir a explicação.",
        "A objetividade não implica frases impessoais a todo o custo. Implica controlar avaliações não justificadas, manter consistência terminológica e apresentar relações que o leitor consiga acompanhar. A conclusão sintetiza os pontos essenciais sem transformar a exposição num texto de opinião."
      ],
      signals:["Delimita tema e subtemas antes de redigir.","Hierarquiza: conceito → explicação → exemplo ou causa → efeito.","Reformula informação pesquisada e referencia quando necessário."],
      example:{
        title:"Exemplo · organizar causas e consequências",
        prompt:"Tens três causas e várias consequências de um fenómeno. Como organizas?",
        steps:["Define o fenómeno numa introdução breve.","Agrupa as causas por um critério claro.","Liga consequências às causas relevantes.","Fecha com síntese do mecanismo global, não com opinião nova."],
        modelAnswer:"A exposição deve delimitar primeiro o fenómeno e depois organizar as causas de modo coerente. As consequências surgem ligadas aos fatores que as explicam, para que o leitor perceba o mecanismo e não apenas uma enumeração. A conclusão sintetiza essa relação global.",
        note:"Informar com clareza também exige escolher o que deixar de fora."
      },
      remember:"Exposição = seleção + hierarquia + explicação + precisão.",
      pitfalls:["Transformar pesquisa numa colagem de frases.","Enumerar informação sem mostrar relações.","Introduzir opinião pessoal como conclusão factual."]
    },
    {
      id:"pt11-escrita-coesao-revisao",
      kicker:"5 · COESÃO, REVISÃO E REFERENCIAÇÃO",
      title:"Revê primeiro ideias e estrutura; só depois microcorreções",
      paragraphs:[
        "A coesão deve ajudar a progressão. Conectores tornam visíveis relações lógicas, pronomes e expressões referenciais evitam repetições e a coesão lexical mantém o tema ativo. Usar muitos conectores não melhora automaticamente um texto se as relações entre ideias forem fracas.",
        "A revisão deve ocorrer em camadas: primeiro verifica tarefa e estrutura; depois parágrafos e ligações; por fim pontuação, ortografia, concordância, regência e escolhas lexicais. Esta ordem evita gastar tempo a polir uma frase num texto que ainda falha o enunciado.",
        "Quando usas informação pesquisada, distingue conhecimento comum de informação que requer fonte, reformula verdadeiramente o conteúdo e mantém referenciação consistente. Uma bibliografia não transforma uma cópia demasiado próxima numa paráfrase adequada."
      ],
      signals:["Coesão serve relações; não é uma contagem de conectores.","Revisão macro → meso → micro: tarefa/estrutura → parágrafos → frase/correção.","Fonte: regista origem e reformula realmente a informação."],
      example:{
        title:"Exemplo · parágrafo repetitivo",
        prompt:"Três frases começam por «Além disso» e repetem a mesma ideia. O que corriges primeiro?",
        steps:["Decide se existem realmente três ideias diferentes.","Elimina ou funde redundâncias.","Identifica a relação lógica da ideia que permanece.","Só depois escolhe um conector, se necessário."],
        modelAnswer:"A revisão deve começar pela lógica e não pelo conector. Se as frases repetem a mesma ideia, devem ser fundidas ou eliminadas; se acrescentam razões diferentes, é preciso explicitar essa diferença. O conector é escolhido no fim para tornar visível uma relação já existente.",
        note:"Trocar «além disso» por três sinónimos não corrige redundância de conteúdo."
      },
      remember:"Revê primeiro o que dizes; depois como organizas; finalmente como escreves cada frase.",
      pitfalls:["Fazer revisão apenas ortográfica.","Usar conectores sofisticados com relações erradas.","Copiar informação e acrescentar uma referência como se isso bastasse."]
    },
    {
      id:"pt11-escrita-exame",
      kicker:"6 · ESCRITA EM PROVA",
      title:"Transforma o enunciado numa checklist antes de gastar palavras",
      paragraphs:[
        "Numa tarefa de escrita, identifica os elementos obrigatórios. Se o enunciado pede posição, dois argumentos e um exemplo, todos têm de aparecer de forma reconhecível. A qualidade estilística não recupera um requisito omitido.",
        "Controla o tempo por fases: planificação curta, redação e revisão reservada. Se bloqueares numa frase, avança para a ideia seguinte e regressa depois; não sacrifiques a estrutura inteira à procura de uma abertura perfeita.",
        "Na revisão final, confirma primeiro conteúdo e extensão, depois coerência e ligações, e só depois correção linguística. Procura especialmente frases demasiado longas, referentes ambíguos, concordâncias, repetição lexical e pontuação que altere relações sintáticas."
      ],
      signals:["Enunciado → checklist de requisitos.","Tempo → plano curto + redação + revisão reservada.","Revisão final → conteúdo/estrutura antes de microcorreção."],
      example:{
        title:"Exemplo · últimos minutos",
        prompt:"Faltam cinco minutos e o texto está completo, mas ainda não foi revisto. O que priorizas?",
        steps:["Confirma todos os requisitos do enunciado.","Verifica coerência entre tese/objetivo e desenvolvimento.","Corrige ligações fracas entre parágrafos.","Faz uma passagem final por pontuação, concordância e ortografia."],
        modelAnswer:"A prioridade é garantir que o texto cumpre a tarefa e que a estrutura sustenta a finalidade pedida. Só depois se corrigem problemas locais. Uma revisão hierarquizada evita gastar os últimos minutos num detalhe enquanto permanece uma falha estrutural mais grave.",
        note:"Reservar revisão faz parte da estratégia de escrita; não é tempo perdido."
      },
      remember:"Em prova, cumprir integralmente a tarefa é a primeira condição de um bom texto.",
      pitfalls:["Escrever imediatamente sem decompor o enunciado.","Gastar demasiado tempo na introdução.","Rever apenas ortografia e deixar uma exigência por cumprir."]
    }
  ]
};

export function portugueseEscrita11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ESCRITA_11_DEEP_REVIEW.id?PORTUGUESE_ESCRITA_11_DEEP_REVIEW:null;
}
