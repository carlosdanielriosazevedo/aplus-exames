export const PORTUGUESE_POESIA_CONTEMPORANEA_12_DEEP_REVIEW_VERSION="2026.10-wave22";

const CONTENT={
  id:"pt12-poesia-contemporanea",
  title:"Poesia portuguesa contemporânea",
  lead:"Nas Aprendizagens Essenciais de março de 2026, o contrato de leitura do 12.º ano prevê seis poemas de, pelo menos, três poetas portugueses contemporâneos. Por isso, esta revisão não transforma três autores numa lista obrigatória: ensina um método rigoroso que o aluno consegue aplicar aos poemas efetivamente selecionados pela escola.",
  goals:[
    "Ler cada poema a partir de indícios textuais concretos, evitando etiquetas decorativas sobre o autor.",
    "Relacionar voz, imagens, ritmo, sintaxe, léxico e organização formal com a construção de sentido.",
    "Distinguir tema, posição do sujeito poético e efeito dos recursos usados.",
    "Comparar poemas através de um eixo comum e de mecanismos diferentes, sem apagar a singularidade de cada texto.",
    "Transferir o método de análise para poetas e poemas diferentes dos exemplos praticados na app."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português do 12.º ano · março de 2026: contrato de leitura de seis poemas de pelo menos três poetas portugueses contemporâneos.",
    "IAVE/EduQA · Informação-Prova 639 · 2026: leitura e interpretação sustentadas em elementos do texto e conhecimento literário mobilizado com pertinência."
  ],
  sections:[
    {
      id:"pt12-poesia-contrato",
      title:"1. O que é obrigatório — e o que não é",
      paragraphs:[
        "O currículo de 2026 não reduz a poesia contemporânea a três nomes fixos. O requisito é trabalhar seis poemas de, pelo menos, três poetas portugueses contemporâneos no contrato de leitura. A seleção concreta pode variar de escola para escola.",
        "Isto muda a forma correta de estudar: decorar uma ficha sobre um autor não chega. O aluno tem de aprender a reconhecer, em qualquer poema, quem fala, o que está em tensão, que imagens estruturam o texto e como a forma participa no sentido.",
        "Os autores usados pela APProva+ funcionam como treino representativo. Servem para praticar estratégias de leitura e comparação, não para sugerir que são os únicos possíveis no exame ou no percurso escolar."
      ],
      signals:["seis poemas","pelo menos três poetas","contrato de leitura","seleção variável","método transferível"],
      example:{prompt:"A escola estudou autores diferentes dos exemplos da app. O método deixa de servir?",steps:["Identifica o que a pergunta pede no poema concreto.","Localiza indícios textuais: voz, léxico, imagem, ritmo, sintaxe, estrutura.","Explica o efeito desses elementos.","Formula a interpretação sem depender de uma etiqueta prévia sobre o autor."],answer:"Não. O núcleo da análise é textual e transferível; o conhecimento do autor ajuda quando é pertinente, mas não substitui a prova no poema."},
      note:"A seleção da app é uma amostra de treino, não uma lista curricular fechada.",
      remember:"Currículo aberto não significa análise vaga: quanto mais variável é a seleção, mais importante é dominar um método estável.",
      pitfalls:["Tratar três autores como obrigatórios.","Responder com biografia em vez de analisar o poema.","Achar que contrato de leitura significa ausência de rigor textual."]
    },
    {
      id:"pt12-poesia-voz",
      title:"2. Voz poética: quem fala e de que posição",
      paragraphs:[
        "O sujeito poético não deve ser confundido automaticamente com o autor biográfico. Mesmo num poema em primeira pessoa, a voz é uma construção textual cuja posição se infere a partir do que diz, do modo como diz e da relação que estabelece com o mundo, com um destinatário ou consigo própria.",
        "Pergunta sempre: esta voz observa, recorda, interpela, denuncia, contempla, hesita, deseja, recusa? A resposta deve nascer de verbos, pronomes, modalizadores, campos lexicais, apóstrofes e movimentos argumentativos presentes no texto.",
        "Uma mudança de pessoa, de tempo verbal ou de destinatário pode alterar profundamente a posição da voz. Não descrevas apenas a mudança: explica o que ela faz à relação entre sujeito, experiência e leitor."
      ],
      signals:["primeira/segunda/terceira pessoa","apóstrofe","modalização","mudança de destinatário","posição enunciativa"],
      example:{prompt:"O poema passa de descrição para interpelação direta. Como analisar?",steps:["Assinala a mudança enunciativa.","Identifica o destinatário explícito ou implícito.","Explica o aumento de proximidade, tensão ou confronto.","Liga essa mudança ao tema central do poema."],answer:"A interpelação transforma uma observação em relação direta, intensificando o envolvimento da voz com aquilo que antes apenas descrevia."},
      note:"‘Eu’ textual e autor real não são equivalentes automáticos.",
      remember:"Posição da voz = marcas linguísticas + relação com o objeto/destinatário + efeito no sentido.",
      pitfalls:["Dizer que o poeta sente X sem prova textual.","Confundir sujeito poético com autor.","Identificar pessoa gramatical sem explicar a função da escolha."]
    },
    {
      id:"pt12-poesia-imagem",
      title:"3. Imagem poética: não é decoração",
      paragraphs:[
        "Na poesia contemporânea, uma imagem forte raramente vale apenas pela beleza. Metáforas, comparações, personificações, símbolos contextuais e associações inesperadas reorganizam a experiência e obrigam o leitor a estabelecer relações entre realidades diferentes.",
        "Evita transformar uma imagem num dicionário fixo. A mesma palavra — mar, casa, corpo, luz, noite, cidade — pode ter funções muito diferentes consoante o campo lexical em que surge, as oposições que cria e a progressão do poema.",
        "A pergunta útil é: que relação esta imagem constrói e o que passa a ser possível pensar ou sentir por causa dela? Assim, o recurso deixa de ser nome técnico isolado e passa a mecanismo de sentido."
      ],
      signals:["metáfora","comparação","personificação","símbolo contextual","campo lexical","oposição imagética"],
      example:{prompt:"A casa aparece repetidamente num poema. Posso dizer que simboliza segurança?",steps:["Recolhe as ocorrências e o léxico associado.","Vê se a casa é abrigo, prisão, ausência, memória ou outro valor.","Relaciona-a com a progressão do poema.","Só depois formula o valor simbólico, de modo contextual."],answer:"Não há significado automático. O valor da casa tem de ser demonstrado pela rede de relações que o próprio poema constrói."},
      note:"Símbolo literário não é equivalência fixa.",
      remember:"Imagem → relação criada → efeito → interpretação.",
      pitfalls:["Listar figuras de estilo sem efeito.","Atribuir símbolos por hábito cultural sem verificar o texto.","Tratar imagem poética como mero ornamento."]
    },
    {
      id:"pt12-poesia-ritmo",
      title:"4. Ritmo, sintaxe e organização visual",
      paragraphs:[
        "Ritmo não significa apenas métrica regular. Na poesia contemporânea, pode nascer da repetição, do paralelismo, da extensão desigual dos versos, das pausas, do encadeamento sintático, da enumeração ou de ruturas deliberadas.",
        "A pontuação — ou a sua ausência — também participa na leitura. Um período longo pode criar fluxo, acumulação ou sufocação; frases breves podem produzir corte, insistência ou secura. O efeito depende sempre do contexto.",
        "A disposição gráfica do poema pode orientar a progressão, separar blocos de experiência, destacar palavras ou criar vazios significativos. Não basta dizer ‘verso livre’: é preciso mostrar como a liberdade formal organiza a experiência representada."
      ],
      signals:["repetição","paralelismo","enjambement","pausa","enumeração","verso livre","disposição gráfica"],
      example:{prompt:"Uma sequência de versos longos é interrompida por um verso muito curto. O que fazer?",steps:["Localiza a quebra rítmica.","Compara a função sintática e semântica do verso curto.","Explica o destaque ou corte criado.","Relaciona-o com a mudança de ideia, emoção ou perspetiva."],answer:"A alteração rítmica torna o verso curto estruturalmente saliente; a interpretação depende do conteúdo que ele isola ou faz culminar."},
      note:"Forma livre não é ausência de construção.",
      remember:"Descrever a forma é apenas o primeiro passo; a resposta de exame deve explicar o seu efeito.",
      pitfalls:["‘É verso livre, logo não há regras.’","Confundir ritmo com contagem silábica apenas.","Apontar enjambement sem explicar a continuidade ou tensão que cria."]
    },
    {
      id:"pt12-poesia-tema",
      title:"5. Tema não é resumo",
      paragraphs:[
        "Dizer que um poema ‘fala do tempo’, ‘do amor’, ‘da morte’ ou ‘da memória’ é demasiado amplo. Uma boa interpretação formula a relação específica que o poema constrói com esse tema: aceitação, perda, resistência, desejo de permanência, estranheza, celebração, conflito ou outra posição sustentada pelo texto.",
        "O tema resulta da combinação entre imagens, voz, progressão e forma. Dois poemas podem partilhar o mesmo tópico e, ainda assim, construí-lo de modos quase opostos.",
        "No exame, uma formulação precisa vale mais do que uma palavra temática genérica. Em vez de ‘tema: memória’, procura algo como ‘a memória surge como tentativa instável de preservar uma experiência que o presente já tornou inacessível’, desde que os indícios o justifiquem."
      ],
      signals:["tensão central","progressão","posição da voz","oposição","transformação do motivo"],
      example:{prompt:"Dois poemas abordam a passagem do tempo. São tematicamente iguais?",steps:["Define o eixo comum: passagem do tempo.","Determina a atitude da voz em cada poema.","Compara imagens e organização formal.","Formula a diferença de visão."],answer:"Partilhar um tópico não implica construir o mesmo tema; a atitude e os mecanismos textuais podem ser diferentes."},
      note:"Tema = tópico + relação específica construída pelo poema.",
      remember:"Quanto mais precisa for a formulação temática, mais fácil será selecionar evidência relevante.",
      pitfalls:["Reduzir o poema a uma palavra.","Fazer resumo narrativo de um texto lírico.","Atribuir ao poema uma mensagem moral não demonstrada."]
    },
    {
      id:"pt12-poesia-comparar",
      title:"6. Comparar poemas sem fazer duas fichas",
      paragraphs:[
        "Uma comparação forte começa por um eixo comum: representação da cidade, memória, corpo, natureza, passagem do tempo, relação com o outro, função da imagem, atitude da voz ou outro critério pedido.",
        "Depois, para cada poema, identifica o mecanismo concreto que constrói esse eixo. Um pode usar enumeração e saturação sensorial; outro pode trabalhar silêncio, elipse e imagem concentrada. A comparação nasce da relação entre esses mecanismos, não da soma de duas análises independentes.",
        "Também é legítimo encontrar aproximações e divergências simultaneamente. O importante é que cada afirmação comparativa seja demonstrável nos dois textos."
      ],
      signals:["eixo comum","semelhança","diferença","mecanismo formal","evidência nos dois poemas"],
      example:{prompt:"Compara a representação da cidade em dois poemas.",steps:["Define o mesmo eixo nos dois textos.","Escolhe um ou dois indícios relevantes de cada poema.","Explica o mecanismo e efeito em cada um.","Formula a semelhança/diferença numa frase verdadeiramente relacional."],answer:"Em vez de descrever A e depois B, mostra como cada poema constrói a cidade e em que ponto essas construções convergem ou divergem."},
      note:"Uma comparação exige sempre evidência dos dois lados.",
      remember:"Eixo comum → mecanismo A → mecanismo B → relação.",
      pitfalls:["Escrever dois mini-resumos separados.","Comparar apenas temas genéricos.","Forçar diferenças autorais sem apoio nos poemas concretos."]
    },
    {
      id:"pt12-poesia-exame",
      title:"7. Método de resposta de exame",
      paragraphs:[
        "Perante um poema desconhecido ou pouco familiar, começa por responder exatamente ao verbo do enunciado: explicar, interpretar, justificar, comparar, explicitar. Depois seleciona apenas os elementos que ajudam essa tarefa.",
        "Uma resposta robusta costuma seguir quatro movimentos: afirmação precisa, evidência textual pertinente, explicação do mecanismo e ligação à interpretação pedida. Esta estrutura evita tanto a paráfrase como a caça a figuras de estilo.",
        "Se mobilizares conhecimento sobre o poeta, usa-o apenas quando ilumina o texto concreto. Nunca substituas a leitura do poema por uma característica memorizada da obra do autor."
      ],
      signals:["verbo do enunciado","afirmação","evidência","mecanismo","interpretação","conhecimento literário pertinente"],
      example:{prompt:"Explica como a repetição contribui para a representação de uma experiência.",steps:["Formula o efeito central da repetição.","Indica a repetição concreta ou o padrão.","Explica o efeito rítmico/semântico.","Liga-o à experiência representada."],answer:"A resposta deve mostrar o que a repetição faz, e não apenas identificá-la."},
      note:"O melhor conhecimento literário é o que ajuda a explicar o texto presente.",
      remember:"Afirmação → evidência → mecanismo → interpretação.",
      pitfalls:["Começar por despejar matéria memorizada.","Citar sem explicar.","Identificar recursos sem os relacionar com a pergunta."]
    }
  ]
};

export function portuguesePoesiaContemporanea12DeepReviewFor(unitId){
  return unitId===CONTENT.id?CONTENT:null;
}
