export const PORTUGUESE_LEITURA_11_DEEP_REVIEW_VERSION="2026.10-wave15";

export const PORTUGUESE_LEITURA_11_DEEP_REVIEW={
  id:"pt11-leitura",
  title:"Leitura · discurso político, opinião e apreciação crítica",
  lead:"No 11.º ano, a leitura aprofunda sobretudo textos argumentativos: discurso político, artigo de opinião e apreciação crítica. O objetivo é reconstruir o raciocínio do texto — tema, tese, argumentos, relações lógicas, ponto de vista e intenção — e distinguir informação explícita de inferências sustentadas. No exame, uma resposta forte não escolhe a opção que parece plausível: mostra por que razão o texto autoriza aquela conclusão.",
  goals:[
    "Distinguir tema, tese, argumento, exemplo, facto, opinião e inferência em contexto.",
    "Interpretar discurso político pela relação entre orador, auditório, contexto, valores e finalidade persuasiva.",
    "Interpretar artigo de opinião pela tese, progressão argumentativa, modalização, concessão e refutação.",
    "Interpretar apreciação crítica pela cadeia objeto → critério → evidência → juízo.",
    "Explicar conectores, anáforas e outras escolhas de coesão pela função lógica que desempenham no texto.",
    "Resolver itens de exame pela relação conclusão → evidência → mecanismo → intenção, evitando extrapolações."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 11.º ano · referencial homologado em vigor · Leitura: discurso político, artigo de opinião e apreciação crítica",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026 · compreensão, inferência e resposta fundamentada"
  ],
  sections:[
    {
      id:"pt11-leitura-metodo",
      kicker:"1 · MÉTODO ARGUMENTATIVO",
      title:"Tema não é tese, e exemplo não é argumento sem relação explicada",
      paragraphs:[
        "O tema indica o assunto geral do texto; a tese exprime a posição defendida sobre esse assunto. Para a localizar, procura afirmações avaliativas, conclusões, reformulações e a direção para que convergem os parágrafos. Uma palavra-chave repetida pode indicar o tema sem formular ainda a posição do autor.",
        "Um argumento é uma razão apresentada em apoio de uma conclusão. Exemplos, dados, analogias, relações de causa e efeito ou referências de autoridade podem servir de suporte, mas só ganham função argumentativa quando explicas o que tornam mais aceitável. A leitura deve reconstruir essa ligação.",
        "Também é essencial separar informação explícita, inferência e extrapolação. Uma inferência resulta de pistas convergentes do texto; uma extrapolação acrescenta informação que pode ser plausível no mundo real, mas que o texto não permite concluir. Esta distinção é decisiva nos itens de seleção."
      ],
      signals:[
        "Tema = assunto; tese = posição completa sobre esse assunto.",
        "Argumento = razão ligada a uma conclusão, não simples exemplo isolado.",
        "Inferência exige pistas textuais; plausibilidade externa não basta."
      ],
      example:{
        title:"Exemplo · reconstruir a tese",
        prompt:"Um texto enumera dois problemas e termina a defender uma medida. Qual é a tese?",
        steps:[
          "Resume os problemas sem os confundir com a posição do autor.",
          "Identifica a proposta ou conclusão defendida.",
          "Mostra como os problemas funcionam como razões para essa proposta.",
          "Formula a tese numa frase que inclua posição e objeto da posição."
        ],
        modelAnswer:"A tese é a defesa da medida proposta como resposta aos problemas apresentados. Os problemas constituem razões que sustentam essa conclusão, mas não são, por si só, a tese do texto.",
        note:"Uma formulação como «o texto fala de mobilidade» identifica apenas o tema."
      },
      remember:"Lê a argumentação como cadeia: posição → razões → evidência → conclusão.",
      pitfalls:["Confundir assunto com tese.","Chamar argumento a qualquer exemplo.","Escolher uma inferência com base em conhecimento exterior ao texto."]
    },
    {
      id:"pt11-leitura-discurso-politico",
      kicker:"2 · DISCURSO POLÍTICO",
      title:"Quem fala, a quem fala e para quê condiciona toda a persuasão",
      paragraphs:[
        "O discurso político é produzido numa situação concreta. Antes de analisar recursos, identifica orador, auditório, contexto e objetivo: mobilizar, justificar, propor, celebrar, advertir, criticar ou construir uma visão comum. A mesma frase pode ter efeitos diferentes consoante o público a quem se dirige.",
        "A argumentação pode apoiar-se em valores partilhados como justiça, liberdade, segurança, igualdade, responsabilidade ou progresso. Pronomes inclusivos, vocativos, repetições, perguntas retóricas e apelos ao coletivo podem aproximar o auditório e apresentar uma posição como responsabilidade comum.",
        "Raciocínio e emoção podem coexistir. Dados, relações causais e exemplos concretos podem combinar-se com imagens e linguagem avaliativa. Em vez de classificar automaticamente a persuasão como manipulação, explica que estratégia é usada, que reação procura provocar e como se liga à finalidade global."
      ],
      signals:["Situação comunicativa: orador + auditório + contexto + objetivo.","Valores partilhados ajudam a criar terreno comum.","Recurso persuasivo = mecanismo + efeito sobre o auditório."],
      example:{
        title:"Exemplo · pronome inclusivo",
        prompt:"O orador repete «nós» ao defender uma decisão coletiva. Que função pode desempenhar?",
        steps:["Identifica quem é incluído no «nós».","Relaciona a inclusão com o problema discutido.","Explica como distribui pertença ou responsabilidade.","Liga o efeito à finalidade persuasiva."],
        modelAnswer:"A repetição de «nós» constrói uma comunidade entre orador e auditório e apresenta o problema como responsabilidade partilhada. Ao reduzir a distância entre quem fala e quem ouve, reforça o apelo à participação e favorece a aceitação da posição defendida.",
        note:"Define o referente do pronome a partir do contexto; nem todo «nós» inclui todos."
      },
      remember:"Discurso político é argumentação dirigida a um auditório específico, num contexto e com uma finalidade.",
      pitfalls:["Analisar o conteúdo sem considerar o auditório.","Dizer apenas que a repetição «dá ênfase».","Confundir persuasão com manipulação sem evidência textual."]
    },
    {
      id:"pt11-leitura-opiniao",
      kicker:"3 · ARTIGO DE OPINIÃO",
      title:"Segue o percurso da posição, dos argumentos e das objeções",
      paragraphs:[
        "No artigo de opinião, o autor assume um ponto de vista sobre uma questão discutível. A tese pode aparecer numa frase explícita ou resultar da articulação entre introdução, argumentos e conclusão. Por isso, uma expressão avaliativa isolada nem sempre corresponde à posição global.",
        "A modalização mostra graus de certeza, possibilidade, obrigação e avaliação. Verbos modais, advérbios, adjetivos avaliativos e construções impessoais revelam como o autor se compromete com o que afirma. O interesse está no efeito argumentativo, não numa lista de marcas gramaticais.",
        "Uma concessão pode reconhecer um ponto válido da posição contrária e preparar uma refutação. Conectores como «embora», «no entanto», «por isso» ou «assim» tornam visível a arquitetura lógica. Analisa sempre as duas ideias que o conector relaciona e o modo como essa relação reforça ou limita a tese."
      ],
      signals:["Tese = posição global, mesmo quando distribuída por vários parágrafos.","Modalização revela grau de compromisso do autor.","Concessão e refutação devem ser lidas como movimentos do raciocínio."],
      example:{
        title:"Exemplo · concessão que reforça a tese",
        prompt:"O autor admite uma vantagem da posição contrária antes de a rejeitar. Porque faz isso?",
        steps:["Identifica a ideia concedida.","Localiza a viragem argumentativa.","Explica a razão usada para limitar essa concessão.","Relaciona a estratégia com o reforço da tese."],
        modelAnswer:"A concessão reconhece um ponto válido da posição contrária, tornando a argumentação menos simplista. A viragem seguinte mostra, porém, que esse benefício é insuficiente perante o argumento principal e permite ao autor responder antecipadamente a uma objeção previsível.",
        note:"Conceder um ponto não significa abandonar a posição defendida."
      },
      remember:"Artigo de opinião: problema → posição → argumentos → objeções → conclusão.",
      pitfalls:["Tratar a primeira frase avaliativa como tese completa.","Confundir modalização com qualquer adjetivo.","Interpretar concessão como contradição do autor."]
    },
    {
      id:"pt11-leitura-apreciacao",
      kicker:"4 · APRECIAÇÃO CRÍTICA",
      title:"Uma avaliação só é crítica quando o juízo é sustentado por critérios",
      paragraphs:[
        "A apreciação crítica apresenta um objeto — obra, espetáculo, filme, livro, exposição ou outro produto cultural — e formula uma avaliação fundamentada. Contextualizar ou resumir pode ser necessário, mas o resumo deve ocupar apenas o espaço necessário para permitir compreender os critérios de avaliação.",
        "Um juízo como «excelente» ou «fraco» vale pouco sem razão. Procura que aspetos são avaliados: coerência, originalidade, interpretação, linguagem, estrutura, eficácia ou relação com o público. Depois identifica os exemplos ou características que sustentam o juízo.",
        "O texto pode combinar avaliação positiva e negativa. Isso não é incoerência quando os juízos incidem sobre critérios diferentes. A leitura deve reconstruir o balanço global e perceber que aspetos pesam mais na conclusão."
      ],
      signals:["Objeto avaliado + critério + evidência + juízo.","Resumo/contextualização prepara a avaliação, mas não a substitui.","Méritos e limitações podem coexistir em critérios diferentes."],
      example:{
        title:"Exemplo · balanço crítico",
        prompt:"Uma crítica elogia os atores, mas considera o espetáculo pouco coerente. Como reconstróis a avaliação?",
        steps:["Separa interpretação e coerência como critérios distintos.","Identifica a evidência usada para cada juízo.","Verifica qual dos critérios domina a conclusão.","Formula o balanço sem apagar a avaliação positiva."],
        modelAnswer:"A apreciação valoriza o trabalho dos atores, mas avalia negativamente a articulação global do espetáculo. O balanço deve reconhecer o mérito interpretativo e explicar que a falta de coerência estrutural condiciona a avaliação final.",
        note:"Uma apreciação pode ser ambivalente sem ser contraditória."
      },
      remember:"Crítica fundamentada = juízo + critério + evidência.",
      pitfalls:["Confundir sinopse com apreciação crítica.","Tomar adjetivos avaliativos como argumentos suficientes.","Reduzir o texto a «gostou/não gostou». "]
    },
    {
      id:"pt11-leitura-coesao",
      kicker:"5 · ORGANIZAÇÃO E COESÃO",
      title:"Conectores e retomas tornam visível o percurso lógico do texto",
      paragraphs:[
        "Parágrafos e conectores explicitam relações de causa, consequência, oposição, concessão, exemplificação, reformulação e conclusão. Reconhecer a relação é mais importante do que decorar o nome do conector: tens de explicar que duas ideias estão ligadas e que efeito produz essa ligação.",
        "Referências anafóricas, repetições controladas e campos lexicais mantêm tópicos ativos. Quando um pronome ou expressão retoma uma ideia anterior, identificar corretamente o referente pode ser decisivo para interpretar uma conclusão ou perceber quem é responsável por uma ação.",
        "A intenção comunicativa resulta do conjunto: género, posição, organização, tom e recursos. Evita respostas vagas como «informar e convencer» sem mostrar que marcas permitem distinguir a finalidade principal dos efeitos secundários."
      ],
      signals:["Conector: identifica a relação lógica entre duas ideias.","Anáfora: encontra o referente e verifica a continuidade temática.","Intenção: liga género, posição, organização e tom."],
      example:{
        title:"Exemplo · valor de «no entanto»",
        prompt:"Um parágrafo começa por «no entanto». O que tens de demonstrar?",
        steps:["Recupera a ideia anterior.","Formula a ideia introduzida depois do conector.","Explica em que aspeto a segunda limita ou contrasta com a primeira.","Mostra o efeito dessa viragem na argumentação global."],
        modelAnswer:"«No entanto» introduz uma ideia que contrasta com a conclusão provisória anterior e obriga o leitor a reconsiderá-la. A relação adversativa reorganiza o argumento e prepara uma posição mais matizada ou uma refutação.",
        note:"O efeito de um conector depende sempre das duas ideias que relaciona."
      },
      remember:"Coesão não é decoração gramatical: torna o raciocínio legível e progressivo.",
      pitfalls:["Nomear o valor do conector sem indicar as ideias ligadas.","Escolher o referente apenas pelo nome mais próximo.","Atribuir intenção geral sem apoio no texto."]
    },
    {
      id:"pt11-leitura-exame",
      kicker:"6 · ESTRATÉGIA DE EXAME",
      title:"Valida a conclusão inteira e mostra o caminho textual que a sustenta",
      paragraphs:[
        "Nos itens de seleção, testa cada opção contra o texto inteiro. Distratores eficazes podem conter uma palavra verdadeira e uma relação falsa, trocar causa e consequência ou generalizar o que o autor limita. O detalhe lexical não salva uma conclusão global errada.",
        "Em resposta restrita, começa pelo verbo: explicar, justificar, relacionar, caracterizar ou interpretar. Depois seleciona a menor quantidade de evidência necessária e explicita a relação entre essa evidência e a conclusão.",
        "Quando o item pede eficácia ou intenção, não basta identificar um recurso. Explica o mecanismo: recurso → relação criada → efeito no leitor/auditório → função no propósito global. Esta cadeia torna a resposta verificável e reduz afirmações vagas."
      ],
      signals:["Seleção: verifica a opção inteira, incluindo quantificadores e causalidade.","Resposta restrita: conclusão → evidência → explicação.","Recurso: mecanismo → efeito → intenção."],
      example:{
        title:"Exemplo · justificar uma inferência",
        prompt:"O autor não formula uma reprovação direta, mas o item pede que justifiques a sua posição crítica.",
        steps:["Formula a inferência com precisão.","Seleciona duas pistas convergentes.","Explica o valor avaliativo de cada pista.","Mostra por que razão juntas sustentam a conclusão sem a tornar absoluta."],
        modelAnswer:"A posição crítica é inferível pela acumulação de consequências negativas e pelo contraste usado na conclusão. Embora não exista uma condenação explícita, essas escolhas orientam a avaliação do leitor para uma perspetiva desfavorável e sustentam a interpretação pedida.",
        note:"Quanto mais indireta a inferência, mais importante é mostrar o percurso que a justifica."
      },
      remember:"No exame, não basta acertar na ideia: mostra por que razão o texto permite chegar a ela.",
      pitfalls:["Escolher uma opção por conhecimento exterior.","Citar sem explicar.","Responder sobre o tema geral em vez do verbo concreto do item."]
    }
  ]
};

export function portugueseLeitura11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_LEITURA_11_DEEP_REVIEW.id?PORTUGUESE_LEITURA_11_DEEP_REVIEW:null;
}
