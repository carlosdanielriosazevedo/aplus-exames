export const PORTUGUESE_LEITURA_12_DEEP_REVIEW_VERSION="2026.10-wave24";

export const PORTUGUESE_LEITURA_12_DEEP_REVIEW={
  id:"pt12-leitura",
  title:"Leitura · argumentação e apreciação crítica",
  lead:"No 12.º ano, a leitura exige autonomia crítica: perceber o que o texto defende, como organiza o raciocínio, que ponto de vista constrói, que inferências autoriza e para que efeito usa determinados recursos. Nas AE de março de 2026, o foco recai predominantemente em textos argumentativos, com destaque para artigo de opinião e apreciação crítica. O objetivo não é caçar palavras-chave, mas reconstruir relações de sentido com prova textual.",
  goals:[
    "Reconstruir sentido global, tema, subtemas, ideias principais e ponto de vista.",
    "Distinguir tese, argumento, exemplo, contra-argumento e conclusão quando aplicável.",
    "Analisar organização interna e externa sem confundir partes gráficas com função argumentativa.",
    "Fazer inferências sustentadas em pistas textuais e separar inferência de opinião pessoal.",
    "Explicar intencionalidade comunicativa e efeito de recursos expressivos.",
    "Ler criticamente artigo de opinião e apreciação crítica sem os reduzir a esquemas rígidos.",
    "Responder por afirmação → evidência → relação → interpretação."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais · Português · 12.º ano · março de 2026 · domínio Leitura",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt12-leitura-sentido-global",
      kicker:"1 · SENTIDO GLOBAL",
      title:"Tema, subtemas, ideias e ponto de vista formam uma arquitetura, não uma lista",
      paragraphs:[
        "O sentido global nasce da relação entre aquilo de que o texto trata, aquilo que afirma sobre esse tema e a perspetiva a partir da qual o faz. Tema não é tese; e uma palavra temática, sozinha, raramente basta para explicar a posição do texto.",
        "Subtemas organizam o desenvolvimento e ajudam a perceber como o autor progride. Uma boa leitura liga cada bloco à função que desempenha no conjunto.",
        "No exame, formula o sentido global em frase completa e verifica se essa frase explica também o desenvolvimento do texto."
      ],
      signals:["Tema ≠ tese.","Ideia principal exige relação, não palavra isolada.","Subtema deve ser ligado à progressão global.","Ponto de vista é posição construída no texto."],
      example:{title:"Exemplo · sentido global",prompt:"Como formular o sentido global sem resumir parágrafo a parágrafo?",steps:["Identifica o tema.","Formula a posição ou foco dominante.","Observa como os subtemas a desenvolvem.","Condensa a relação numa frase completa."],modelAnswer:"O sentido global resulta da defesa de uma perspetiva sobre o tema, desenvolvida por subtemas que acrescentam razões, exemplos ou consequências. A resposta deve mostrar essa relação, e não reproduzir a sequência dos parágrafos.",note:"Evita respostas do tipo «o texto fala sobre…» quando a pergunta exige interpretação."},
      remember:"Ler globalmente é reconstruir relações entre tema, posição e progressão.",
      pitfalls:["Confundir tema com tese.","Enumerar assuntos sem hierarquia.","Copiar uma frase do texto como se fosse o sentido global."]
    },
    {
      id:"pt12-leitura-argumentacao",
      kicker:"2 · ARGUMENTAÇÃO",
      title:"Tese e argumentos devem ser distinguidos pela função que cumprem",
      paragraphs:[
        "Num texto argumentativo, a tese é a posição que se procura sustentar; os argumentos são razões que a apoiam. Exemplos, dados, analogias ou referências podem funcionar como prova ou concretização, mas não são automaticamente argumentos autónomos.",
        "A estrutura pode incluir concessão, contra-argumento e refutação. Reconhecê-los exige perceber a relação entre enunciados, não procurar apenas conectores.",
        "Quando justificares uma classificação, indica sempre a função do segmento no raciocínio global."
      ],
      signals:["Tese = posição defendida.","Argumento = razão de sustentação.","Exemplo pode apoiar um argumento sem ser a tese.","Conector ajuda, mas não substitui análise funcional."],
      example:{title:"Exemplo · função argumentativa",prompt:"Como provas que um segmento funciona como argumento?",steps:["Identifica a tese.","Pergunta que razão o segmento acrescenta.","Mostra a ligação lógica.","Explica como essa razão reforça a posição defendida."],modelAnswer:"O segmento funciona como argumento porque fornece uma razão diretamente relacionada com a tese. A sua função não depende apenas da posição no texto, mas do contributo que dá para tornar a posição defendida mais justificável.",note:"Não classifiques pela presença de «porque», «logo» ou «mas» apenas."},
      remember:"A função argumentativa reconhece-se pela relação lógica entre partes.",
      pitfalls:["Chamar tese a qualquer opinião.","Chamar argumento a qualquer exemplo.","Classificar apenas por conectores."]
    },
    {
      id:"pt12-leitura-generos",
      kicker:"3 · ARTIGO DE OPINIÃO E APRECIAÇÃO CRÍTICA",
      title:"Os géneros orientam expectativas, mas não funcionam como moldes mecânicos",
      paragraphs:[
        "O artigo de opinião tende a construir uma posição argumentada sobre uma questão relevante, selecionando razões e estratégias adequadas ao leitor e à intenção comunicativa.",
        "A apreciação crítica avalia um objeto cultural, discursivo ou artístico: combina descrição seletiva, juízo e fundamentação. Não é um simples resumo acompanhado de «gostei» ou «não gostei».",
        "No exame, usa os traços do género para interpretar a função das partes, mas confirma sempre no texto concreto."
      ],
      signals:["Artigo de opinião: posição + fundamentação.","Apreciação crítica: avaliação + critérios/evidência.","Resumo não equivale a apreciação.","Género orienta; o texto prova."],
      example:{title:"Exemplo · apreciação crítica",prompt:"Como distingues avaliação de simples descrição?",steps:["Localiza o objeto avaliado.","Identifica um juízo.","Procura o critério ou evidência que o sustenta.","Explica a relação entre juízo e fundamento."],modelAnswer:"Há apreciação crítica quando o texto não se limita a descrever o objeto: formula uma avaliação e fornece razões, critérios ou exemplos que permitem compreender por que motivo esse juízo é defendido.",note:"Uma avaliação sem fundamento é apenas opinião solta."},
      remember:"Apreciação crítica exige juízo fundamentado.",
      pitfalls:["Reduzir apreciação crítica a resumo.","Confundir gosto pessoal com crítica fundamentada.","Aplicar um esquema fixo sem olhar para o texto."]
    },
    {
      id:"pt12-leitura-inferencia",
      kicker:"4 · INFERÊNCIA",
      title:"Inferir é concluir a partir de pistas; não é inventar informação plausível",
      paragraphs:[
        "Uma inferência válida combina informação textual com raciocínio controlado. A conclusão pode não estar escrita literalmente, mas tem de ser sustentada pelo texto.",
        "Quanto mais complexa a inferência, mais importante é explicitar as pistas que a autorizam. Uma hipótese possível mas sem apoio suficiente não deve ser apresentada como certeza.",
        "Distingue sempre aquilo que o texto afirma, aquilo que permite concluir e aquilo que tu apenas achas sobre o tema."
      ],
      signals:["Afirmação explícita ≠ inferência.","Inferência precisa de pistas.","Possível não significa demonstrado.","Opinião pessoal não responde a uma pergunta inferencial."],
      example:{title:"Exemplo · inferência",prompt:"Como justificas uma inferência sobre a atitude do autor?",steps:["Localiza duas ou mais pistas relevantes.","Explica o que cada pista sugere.","Cruza-as numa conclusão.","Formula a conclusão com grau de certeza adequado."],modelAnswer:"A inferência é sustentável porque resulta da convergência de várias pistas do texto. Em vez de atribuir uma intenção arbitrária ao autor, a resposta mostra como escolhas lexicais, contraste ou organização discursiva apontam para determinada atitude.",note:"Se a conclusão depende de informação que o texto não fornece, é uma extrapolação."},
      remember:"Inferência = pista textual + relação lógica + conclusão proporcional.",
      pitfalls:["Inventar motivações.","Responder com conhecimento do mundo sem voltar ao texto.","Apresentar hipótese fraca como facto."]
    },
    {
      id:"pt12-leitura-organizacao",
      kicker:"5 · ORGANIZAÇÃO INTERNA E EXTERNA",
      title:"Parágrafos, títulos e conectores só interessam quando explicam a progressão do sentido",
      paragraphs:[
        "A organização externa inclui aspetos visíveis, como título, parágrafos ou secções. A organização interna corresponde às relações funcionais: apresentação do problema, desenvolvimento de razões, contraposição, exemplificação, conclusão ou outras etapas.",
        "Um parágrafo não tem uma função fixa só por ser o primeiro ou o último. É preciso observar o que faz dentro daquele texto.",
        "A análise ganha qualidade quando liga forma de organização, progressão argumentativa e efeito no leitor."
      ],
      signals:["Externa = disposição observável.","Interna = função das partes.","Posição no texto não determina função.","Conectores explicitam relações, mas o sentido manda."],
      example:{title:"Exemplo · organização",prompt:"Como explicas a função de um parágrafo intermédio?",steps:["Resume a ideia do parágrafo.","Relaciona-a com o anterior.","Relaciona-a com o seguinte.","Nomeia a função que desempenha na progressão."],modelAnswer:"O parágrafo deve ser explicado pela relação com o raciocínio envolvente: pode introduzir uma objeção, concretizar uma razão ou mudar o foco. A classificação só é sólida quando essa função é demonstrada pela progressão do texto.",note:"«É o segundo parágrafo» nunca é uma explicação funcional."},
      remember:"Organização interna é arquitetura de funções, não numeração de parágrafos.",
      pitfalls:["Confundir organização interna e externa.","Atribuir funções pela posição.","Listar conectores sem explicar relações."]
    },
    {
      id:"pt12-leitura-recursos-intencao",
      kicker:"6 · RECURSOS E INTENCIONALIDADE",
      title:"Um recurso só é relevante quando se explica o mecanismo pelo qual constrói sentido",
      paragraphs:[
        "Ironia, comparação, enumeração, repetição, pergunta retórica, modalização ou escolha lexical podem influenciar persuasão, avaliação e tom. Nomear o recurso é apenas o início da análise.",
        "A intencionalidade comunicativa não se reduz a verbos vagos como «informar» ou «convencer». É preciso explicar o que o texto procura fazer relativamente a um tema, posição e destinatário.",
        "A resposta mais forte liga recurso → mecanismo → efeito → intenção, usando evidência concreta."
      ],
      signals:["Etiqueta não é análise.","Efeito deve ser específico.","Intenção é contextual.","Modalização pode revelar grau de compromisso ou avaliação."],
      example:{title:"Exemplo · recurso expressivo",prompt:"Como analisar uma pergunta retórica?",steps:["Identifica a pergunta.","Verifica se espera resposta literal.","Explica a ideia que pressupõe ou reforça.","Liga esse efeito à estratégia do texto."],modelAnswer:"A pergunta retórica não serve apenas para variar a forma do discurso; orienta o leitor para uma resposta implícita e reforça a posição defendida. O efeito deve ser explicado em função da ideia concreta que está em causa.",note:"Evita «torna o texto mais expressivo» sem explicar como e para quê."},
      remember:"Recurso → mecanismo → efeito → intenção.",
      pitfalls:["Nomear figuras sem efeito.","Usar «chamar a atenção» para tudo.","Confundir intenção com tema."]
    },
    {
      id:"pt12-leitura-metodo-exame",
      kicker:"7 · MÉTODO DE EXAME",
      title:"Responder bem é selecionar a prova certa e explicar a relação pedida",
      paragraphs:[
        "Começa pelo verbo do enunciado: identificar, explicitar, justificar, relacionar e interpretar não exigem exatamente a mesma operação. A extensão da resposta deve acompanhar a tarefa.",
        "Para perguntas de interpretação, usa uma cadeia estável: afirmação clara, evidência textual pertinente, explicação da relação e conclusão interpretativa. A citação, quando usada, não substitui a explicação.",
        "Revê a resposta perguntando: respondi ao que foi pedido? provei no texto? expliquei a relação? evitei acrescentar opinião irrelevante?"
      ],
      signals:["Lê primeiro o verbo do enunciado.","Evidência deve ser pertinente, não apenas verdadeira.","Citação ≠ explicação.","Resposta crítica continua ancorada no texto."],
      example:{title:"Exemplo · resposta completa",prompt:"Como estruturar uma justificação de quatro ou cinco linhas?",steps:["Responde logo à pergunta.","Seleciona a pista mais forte.","Explica como a pista prova a afirmação.","Fecha com o efeito ou interpretação relevante."],modelAnswer:"Uma resposta eficaz começa por uma afirmação inequívoca e seleciona apenas a evidência necessária. Depois explica a relação lógica entre essa evidência e a conclusão. O objetivo é tornar visível o raciocínio, não acumular transcrições do texto.",note:"Mais texto não significa mais pontuação se a relação pedida continuar implícita."},
      remember:"Afirmação → evidência → relação → interpretação.",
      pitfalls:["Copiar sem explicar.","Responder ao tema em geral e não ao enunciado.","Dar opinião pessoal quando a tarefa pede interpretação textual."]
    }
  ]
};

export function portugueseLeitura12DeepReviewFor(unitId){
  return unitId===PORTUGUESE_LEITURA_12_DEEP_REVIEW.id?PORTUGUESE_LEITURA_12_DEEP_REVIEW:null;
}
