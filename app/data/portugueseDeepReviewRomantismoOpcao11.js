export const PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW_VERSION="2026.10-wave11";

export const PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW={
  id:"pt11-romantismo-opcao",
  title:"Romantismo · Garrett, Herculano ou Camilo",
  lead:"Esta unidade é curricularmente alternativa: a turma trabalha Viagens na Minha Terra, A Abóbada ou Amor de Perdição segundo o corpus prescrito. A app apresenta as três possibilidades para servir qualquer escola, mas o aluno não deve estudar as três como se fossem cumulativamente obrigatórias. O objetivo é dominar a obra escolhida e, ao mesmo tempo, reconhecer procedimentos românticos transferíveis para excertos novos.",
  goals:[
    "Distinguir com rigor as três alternativas curriculares e as respetivas seleções de capítulos ou leitura integral.",
    "Reconhecer marcas do Romantismo através de personagens, natureza, história, conflito, subjetividade e crítica, sem usar o rótulo de forma vaga.",
    "Interpretar Viagens na Minha Terra como viagem geográfica, sentimental, digressiva e crítica, articulada com a novela de Carlos e Joaninha.",
    "Interpretar A Abóbada pela imaginação histórica, sentimento nacional, relações entre personagens e construção do herói romântico.",
    "Interpretar Amor de Perdição pelo amor contrariado, conflito com a sociedade, cartas, triângulo amoroso e progressão trágica.",
    "Comparar obras ou excertos por critérios comuns, evitando dois resumos paralelos.",
    "Responder a itens de exame por ideia → evidência → mecanismo → significado, mobilizando apenas a alternativa relevante."
  ],
  sourceBasis:[
    "DGE · Currículo Nacional · Português · 11.º ano · referencial em vigor: Viagens na Minha Terra OU A Abóbada OU Amor de Perdição",
    "DGE · Estudo Autónomo · recursos atuais sobre Viagens na Minha Terra, A Abóbada e Amor de Perdição",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-rom-corpus",
      kicker:"1 · CORPUS ALTERNATIVO",
      title:"Primeiro identifica a obra da tua turma: as três opções não são cumulativas",
      paragraphs:[
        "O currículo prevê uma escolha entre três percursos. Em Viagens na Minha Terra, selecionam-se cinco capítulos de entre I, V, VIII, X, XIII, XX, XLIV e XLIX. Em A Abóbada, a leitura é integral. Em Amor de Perdição, selecionam-se cinco partes de entre a Introdução, os capítulos I, IV, X e XIX e a Conclusão.",
        "A app mostra os três percursos porque alunos de escolas diferentes podem trabalhar obras diferentes. Isto não altera a regra curricular: cada turma segue a alternativa definida no seu percurso. Ao rever, começa sempre por confirmar qual é a tua opção e concentra o estudo profundo nela.",
        "Mesmo sendo alternativas, as obras partilham problemas e procedimentos românticos que podem ser comparados: relação entre indivíduo e sociedade, intensidade afetiva, representação da natureza, passado histórico, sentimento nacional, conflito entre ideal e realidade e construção de figuras excecionais. A comparação só é útil quando nasce de um critério concreto."
      ],
      signals:[
        "Viagens: cinco entre I, V, VIII, X, XIII, XX, XLIV e XLIX.",
        "A Abóbada: leitura integral.",
        "Amor de Perdição: cinco entre Introdução, I, IV, X, XIX e Conclusão."
      ],
      example:{
        title:"Exemplo de organização · escolher o percurso certo",
        prompt:"A tua turma trabalha Amor de Perdição. Como deves usar esta unidade?",
        steps:[
          "Confirma as cinco partes selecionadas pela turma dentro do conjunto prescrito.",
          "Estuda profundamente a secção dedicada a Amor de Perdição e os princípios transversais do Romantismo.",
          "Usa as outras alternativas apenas como comparação ou cultura literária, salvo indicação do professor ou do item.",
          "Nunca assumes que o exame exige domínio cumulativo das três obras alternativas."
        ],
        modelAnswer:"Se a turma trabalha Amor de Perdição, o estudo obrigatório centra-se nas partes selecionadas dessa obra e nos conceitos transversais que ajudam a interpretá-las. Viagens na Minha Terra e A Abóbada podem servir de comparação, mas não passam por isso a ser leituras obrigatórias adicionais.",
        note:"A regra curricular da alternativa deve permanecer visível para evitar sobrecarga e estudo desnecessário."
      },
      remember:"A app cobre três caminhos; a tua turma percorre um deles.",
      pitfalls:[
        "Estudar as três obras como se fossem obrigatórias.",
        "Inventar capítulos fora das seleções curriculares.",
        "Comparar obras sem definir um critério comum."
      ]
    },
    {
      id:"pt11-rom-tracos",
      kicker:"2 · ROMANTISMO EM CONTEXTO",
      title:"Romântico não é sinónimo de sentimental: demonstra sempre a marca no texto",
      paragraphs:[
        "O Romantismo valoriza frequentemente a subjetividade, a liberdade individual, a intensidade emocional, a natureza, o passado nacional e personagens em conflito com limites sociais ou históricos. Estas tendências não aparecem da mesma forma em todas as obras, por isso não devem ser usadas como uma lista automática.",
        "A tensão entre ideal e realidade é particularmente produtiva. Uma personagem pode desejar amor absoluto, liberdade, reconhecimento ou fidelidade a um ideal e encontrar uma sociedade, uma história ou circunstâncias que tornam esse desejo impossível. A análise deve mostrar onde está o ideal, que obstáculo surge e que transformação produz.",
        "Natureza e história também podem ganhar valor expressivo. A paisagem pode acompanhar uma experiência interior, contrariá-la ou suscitar reflexão; o passado histórico pode sustentar identidade nacional, crítica do presente ou imaginação literária. O contexto só conta quando explica uma escolha textual concreta."
      ],
      signals:[
        "Subjetividade: procura perceção, emoção, memória ou avaliação, não apenas primeira pessoa.",
        "Ideal vs realidade: identifica desejo, obstáculo e consequência.",
        "Natureza ou história: explica sempre a função que assumem no excerto."
      ],
      example:{
        title:"Exemplo de resposta · provar uma marca romântica",
        prompt:"Como justificas que uma personagem funciona como herói romântico?",
        steps:[
          "Seleciona um traço concreto, como intensidade afetiva, individualismo, rebeldia ou conflito com a sociedade.",
          "Aponta uma ação, decisão ou fala que o demonstre.",
          "Explica o obstáculo que torna essa atitude problemática ou excecional.",
          "Relaciona o conflito com o sentido global do excerto."
        ],
        modelAnswer:"A personagem aproxima-se do herói romântico porque age segundo um ideal pessoal que entra em choque com as normas ou circunstâncias que a rodeiam. A decisão concreta apresentada no excerto demonstra que a intensidade do desejo e a recusa de acomodação produzem conflito e isolamento.",
        note:"Não basta escrever «é romântico porque sofre por amor»."
      },
      remember:"Marca romântica = traço + evidência + conflito + efeito.",
      pitfalls:[
        "Usar «romântico» como sinónimo de amoroso.",
        "Listar características do movimento sem as aplicar ao excerto.",
        "Confundir contextualização histórica com interpretação literária."
      ]
    },
    {
      id:"pt11-rom-viagens-viagem",
      kicker:"3 · VIAGENS NA MINHA TERRA · VIAGEM, DIGRESSÃO E CRÍTICA",
      title:"A deslocação geográfica abre espaço à reflexão sobre literatura, sociedade e país",
      paragraphs:[
        "Viagens na Minha Terra acompanha uma deslocação real, mas a viagem não se limita ao itinerário. O narrador interrompe, comenta, conversa com o leitor e transforma lugares, pessoas e acontecimentos em pontos de partida para digressões. A estrutura mistura observação, memória, reflexão e crítica, criando um texto deliberadamente móvel.",
        "Nos capítulos I, V e VIII, entre outros, a natureza e a paisagem ajudam a construir a experiência da viagem. A descrição pode ser atravessada por avaliação subjetiva, ironia ou discussão sobre a própria literatura romântica. Por isso, não basta identificar uma paisagem: é preciso perguntar que reflexão ou atitude do narrador ela desencadeia.",
        "A dimensão crítica pode atingir sociedade, política, cultura e modelos literários. A coloquialidade e o diálogo com o leitor reforçam a sensação de proximidade e permitem ao narrador mudar rapidamente de registo. Uma digressão é relevante quando explicas de onde parte, que assunto introduz e que função cumpre."
      ],
      signals:[
        "Viagem geográfica → observação → digressão → reflexão crítica.",
        "Natureza: descreve, mas também provoca avaliação e pensamento.",
        "Narrador dialogante e coloquial: aproxima o leitor e legitima mudanças de assunto."
      ],
      example:{
        title:"Exemplo de resposta · função de uma digressão",
        prompt:"O narrador interrompe a descrição da viagem para comentar um hábito literário. Que efeito produz?",
        steps:[
          "Identifica o ponto da viagem que desencadeia a interrupção.",
          "Resume a reflexão crítica sem substituir a análise por paráfrase.",
          "Explica como a digressão amplia o texto para além do relato de deslocação.",
          "Relaciona o tom ou a ironia com a posição do narrador."
        ],
        modelAnswer:"A digressão transforma um momento da viagem num pretexto para reflexão literária. Ao interromper o itinerário e dirigir-se criticamente ao leitor, o narrador mostra que a obra combina deslocação, comentário e pensamento, usando a viagem como estrutura aberta para discutir o país e a própria literatura.",
        note:"Digressão não significa simplesmente «mudar de assunto»: explica a ligação funcional entre o ponto de partida e a reflexão."
      },
      remember:"Em Viagens, andar pelo território é também pensar o território, a literatura e a sociedade.",
      pitfalls:[
        "Resumir o percurso geográfico sem analisar o narrador.",
        "Chamar digressão a qualquer descrição.",
        "Identificar natureza sem explicar o valor subjetivo ou crítico."
      ]
    },
    {
      id:"pt11-rom-viagens-novela",
      kicker:"4 · VIAGENS NA MINHA TERRA · NOVELA SENTIMENTAL",
      title:"Carlos e Joaninha inserem uma história afetiva dentro da viagem e aprofundam o conflito romântico",
      paragraphs:[
        "A partir do Vale de Santarém, a obra incorpora a chamada História da Menina dos Rouxinóis. Carlos e Joaninha introduzem uma narrativa sentimental encaixada, mas essa história não fica desligada do resto do livro: continua a dialogar com natureza, memória, identidade e reflexão sobre a sociedade.",
        "Os capítulos X, XIII e XX permitem observar a construção do Vale, a apresentação de Joaninha, o regresso de Carlos e a complexidade das relações familiares e afetivas. Frei Dinis acrescenta uma dimensão de passado, segredo e reflexão moral. O importante é perceber como a narrativa encaixada concentra conflitos que a viagem exterior vinha preparando por outros meios.",
        "A oposição entre materialismo e idealismo surge como instrumento de reflexão sobre indivíduos e sociedade. Em vez de decorar uma equivalência fixa para cada personagem, segue os valores, escolhas e transformações que o excerto mostra e explica como o narrador os enquadra."
      ],
      signals:[
        "Vale de Santarém: natureza e espaço da narrativa sentimental encaixada.",
        "Carlos/Joaninha/Frei Dinis: relações afetivas e familiares ligadas a memória e conflito.",
        "Materialismo vs idealismo: usa a oposição para interpretar valores e escolhas, não como etiqueta automática."
      ],
      example:{
        title:"Exemplo de resposta · narrativa encaixada e obra global",
        prompt:"Como mostras que a história de Carlos e Joaninha não é um episódio isolado?",
        steps:[
          "Identifica a entrada da narrativa sentimental no percurso da viagem.",
          "Relaciona espaço e natureza com a atmosfera e as personagens.",
          "Mostra que a história desenvolve temas como memória, amor, conflito e sociedade.",
          "Liga esses temas à dimensão reflexiva que atravessa a obra."
        ],
        modelAnswer:"A história de Carlos e Joaninha está encaixada na viagem, mas prolonga problemas já presentes na obra. O espaço do Vale e as relações entre as personagens transformam a deslocação exterior numa reflexão sobre afetos, memória e sociedade, mantendo a articulação entre narrativa e comentário crítico.",
        note:"Evita tratar a novela sentimental como um livro separado dentro do livro."
      },
      remember:"Em Viagens, a novela sentimental muda o modo de narrar, não o projeto reflexivo da obra.",
      pitfalls:[
        "Estudar Carlos e Joaninha apenas como história de amor.",
        "Separar completamente viagem e novela encaixada.",
        "Aplicar materialismo/idealismo sem evidência do excerto."
      ]
    },
    {
      id:"pt11-rom-abobada",
      kicker:"5 · A ABÓBADA · HISTÓRIA, NAÇÃO E HERÓI ROMÂNTICO",
      title:"A imaginação histórica transforma a construção da Batalha num conflito de identidade e reconhecimento",
      paragraphs:[
        "A Abóbada é lida integralmente e combina reconstituição histórica com imaginação literária. O Mosteiro da Batalha e a memória nacional não servem apenas de cenário: permitem pensar autoria, mérito, honra, trabalho e sentimento de pertença. A análise deve distinguir dado histórico, elaboração narrativa e valor simbólico.",
        "Afonso Domingues concentra traços do herói romântico: individualidade forte, orgulho no trabalho, ligação à obra construída e confronto com circunstâncias que ameaçam o seu reconhecimento. Mais importante do que enumerar características é mostrar como decisões, relações e sofrimento transformam o mestre numa figura excecional.",
        "As relações entre personagens e o desfecho reforçam o sentimento nacional e a valorização do criador. O texto pode exaltar o passado sem se tornar simples lição de história: a imaginação histórica seleciona e dramatiza acontecimentos para construir uma visão sobre identidade coletiva e mérito individual."
      ],
      signals:[
        "Mosteiro da Batalha: espaço histórico com função identitária e simbólica.",
        "Afonso Domingues: herói romântico demonstrado por ação, orgulho, conflito e sacrifício.",
        "Imaginação histórica: história transformada em narrativa orientada por valores."
      ],
      example:{
        title:"Exemplo de resposta · herói romântico e sentimento nacional",
        prompt:"Como relacionas Afonso Domingues com a dimensão nacional do conto?",
        steps:[
          "Identifica uma ação ou atitude que mostre a ligação do mestre à obra.",
          "Explica o conflito que ameaça o seu reconhecimento ou autoridade.",
          "Mostra como a personagem se liga ao monumento e à memória coletiva.",
          "Conclui explicando a valorização simultânea do indivíduo e da nação."
        ],
        modelAnswer:"Afonso Domingues é valorizado como indivíduo excecional porque liga a sua identidade e honra à obra que ajudou a construir. O conflito em torno do reconhecimento do seu mérito transforma o mestre numa figura romântica e, ao mesmo tempo, faz do monumento um símbolo de memória e sentimento nacional.",
        note:"Não confundas sentimento nacional com simples referência a Portugal ou à Batalha."
      },
      remember:"Em A Abóbada, indivíduo, monumento e memória nacional reforçam-se mutuamente.",
      pitfalls:[
        "Contar a história do mosteiro em vez de analisar a narrativa.",
        "Chamar Afonso Domingues herói romântico sem ação ou conflito que o demonstre.",
        "Tratar imaginação histórica como erro factual."
      ]
    },
    {
      id:"pt11-rom-amor-perdicao",
      kicker:"6 · AMOR DE PERDIÇÃO · PAIXÃO E DESTINO TRÁGICO",
      title:"O amor absoluto entra em choque com família, sociedade e destino",
      paragraphs:[
        "Amor de Perdição centra-se no amor contrariado de Simão Botelho e Teresa de Albuquerque, condicionado pela rivalidade familiar e por estruturas sociais que tornam difícil a realização do projeto amoroso. Simão é construído como figura romântica pela intensidade da paixão, pela recusa de acomodação e pelo conflito com o mundo que o rodeia.",
        "As cartas são decisivas porque mantêm a relação entre os amantes quando o contacto direto é impedido. Não são apenas veículo de informação: revelam voz íntima, tom confessional, idealização, esperança e consciência do sofrimento. Num excerto epistolar, analisa sempre quem escreve, para quem, em que situação e que mudança emocional ou narrativa a carta produz.",
        "Mariana introduz uma terceira linha afetiva: ama Simão sem ser correspondida e acompanha-o com dedicação extrema. A Conclusão concentra a progressão trágica e a morte das figuras centrais, articulando estado físico, natureza, cartas e perda. O desfecho deve ser explicado como culminação de conflitos preparados ao longo da narrativa, não como fatalidade súbita."
      ],
      signals:[
        "Simão e Teresa: paixão contrária às barreiras familiares e sociais.",
        "Cartas: ação narrativa + intimidade + expressão do sentimento.",
        "Mariana e Conclusão: amor não correspondido, dedicação e culminação trágica."
      ],
      example:{
        title:"Exemplo de resposta · função de uma carta",
        prompt:"Uma carta de Simão ou Teresa surge num momento de separação. Como explicas a sua função?",
        steps:[
          "Situa a carta no conflito e identifica emissor e destinatário.",
          "Seleciona uma marca do tom confessional ou da expressão amorosa.",
          "Explica que informação, decisão ou estado emocional a carta transmite.",
          "Relaciona-a com a progressão do amor contrariado e do destino trágico."
        ],
        modelAnswer:"A carta permite que a relação continue apesar da separação física e dá acesso direto à interioridade da personagem. O tom confessional intensifica a expressão do amor e do sofrimento, ao mesmo tempo que a mensagem faz avançar a ação e reforça a consciência de que o conflito se aproxima de uma solução trágica.",
        note:"Não analises a carta apenas como recurso estilístico; liga-a à relação e à ação."
      },
      remember:"Em Amor de Perdição, a paixão move a ação, mas as cartas tornam audível a interioridade das personagens.",
      pitfalls:[
        "Reduzir a obra a uma história de amor triste.",
        "Ignorar a função narrativa das cartas.",
        "Explicar o desfecho apenas como doença ou azar."
      ]
    },
    {
      id:"pt11-rom-comparacao",
      kicker:"7 · COMPARAÇÃO ENTRE PERCURSOS",
      title:"Compara por um problema comum, nunca por dois resumos",
      paragraphs:[
        "As alternativas podem ser comparadas através de critérios como herói romântico, relação entre indivíduo e sociedade, natureza, sentimento nacional, ideal e realidade, amor, liberdade ou memória histórica. Antes de escrever, escolhe um único critério suficientemente preciso para existir nos dois textos.",
        "Depois, identifica como cada obra concretiza esse critério. O conflito de Simão com família e sociedade não é igual ao de Afonso Domingues com o reconhecimento do seu mérito, e a inquietação de Carlos não se reduz ao mesmo modelo. A comparação ganha qualidade quando mostra semelhança e diferença.",
        "A prova pode fornecer excertos que permitem relações não decoradas previamente. Nesse caso, usa primeiro os textos e só depois mobiliza conhecimento da obra. Comparar é construir uma relação demonstrável entre duas evidências, não repetir fichas de leitura lado a lado."
      ],
      signals:[
        "Critério comum primeiro; evidência de cada texto depois.",
        "Formula uma semelhança e pelo menos uma diferença relevante quando o item o permitir.",
        "Conhecimento da obra serve a relação; não substitui a leitura dos excertos."
      ],
      example:{
        title:"Exemplo de resposta · herói romântico",
        prompt:"Como compararias duas figuras românticas de obras alternativas?",
        steps:[
          "Define o critério: conflito entre ideal individual e realidade exterior.",
          "Seleciona uma ação da primeira personagem que demonstre esse conflito.",
          "Seleciona uma ação equivalente ou contrastante da segunda.",
          "Conclui mostrando o que têm em comum e como divergem."
        ],
        modelAnswer:"As duas personagens podem aproximar-se pelo modo como subordinam a vida a um ideal pessoal e entram em conflito com circunstâncias exteriores. Contudo, esse conflito assume formas distintas: numa pode nascer da paixão amorosa e da oposição familiar; noutra, da honra, da criação e do reconhecimento público. A semelhança está na intensidade do ideal, não na identidade das situações.",
        note:"Dois parágrafos independentes não constituem automaticamente uma comparação."
      },
      remember:"Comparar = mesmo critério + duas evidências + relação explícita.",
      pitfalls:[
        "Fazer dois resumos separados.",
        "Forçar uma semelhança que apaga diferenças importantes.",
        "Usar «ambos são românticos» como conclusão suficiente."
      ]
    },
    {
      id:"pt11-rom-resposta",
      kicker:"8 · RESPOSTA DE EXAME",
      title:"Responde à alternativa e ao excerto que tens diante de ti",
      paragraphs:[
        "Num item de Educação Literária, começa por identificar a obra ou alternativa presente e o verbo de comando: explicar, caracterizar, relacionar, justificar, comparar. A seleção curricular não deve contaminar a resposta com matéria de uma obra diferente só porque está disponível na app.",
        "A estrutura mais segura continua a ser ideia → evidência → mecanismo → significado. Em narrativa, a evidência pode ser comentário do narrador, descrição, carta, decisão, relação entre personagens, espaço ou progressão temporal. Explica sempre como essa marca constrói o sentido pedido.",
        "A Informação-Prova 639 exige competências transferíveis. Por isso, a revisão profunda prepara o aluno para excertos novos: reconhecer estruturas e processos, justificar inferências e mobilizar conhecimento global sem reproduzir uma resposta decorada."
      ],
      signals:[
        "Confirma a alternativa curricular antes de mobilizar conhecimento da obra.",
        "Estrutura: ideia → evidência → mecanismo → significado.",
        "Excerto novo: usa o conhecimento global como enquadramento, não como resposta pronta."
      ],
      example:{
        title:"Exemplo de resposta · natureza e subjetividade",
        prompt:"Um excerto relaciona paisagem e estado interior. Como respondes sem cair em generalidades sobre o Romantismo?",
        steps:[
          "Identifica a característica concreta da paisagem.",
          "Seleciona a marca que revela a perceção ou estado da personagem/narrador.",
          "Explica a relação entre exterior e interior.",
          "Só depois relaciona essa construção com uma tendência romântica."
        ],
        modelAnswer:"A paisagem ganha valor subjetivo porque é filtrada pelo estado interior da voz que a observa. As características selecionadas do espaço correspondem à emoção ou reflexão expressa no excerto, fazendo da natureza uma forma de exteriorizar a experiência individual — uma relação que pode ser associada à sensibilidade romântica.",
        note:"A marca de época é a conclusão da análise, não o ponto de partida automático."
      },
      remember:"Primeiro lê o excerto; depois reconhece a marca romântica. Nunca ao contrário.",
      pitfalls:[
        "Despejar características do Romantismo sem as provar.",
        "Misturar personagens e acontecimentos das três alternativas.",
        "Usar resumo da obra em vez de responder ao verbo do item."
      ]
    }
  ]
};

export function portugueseRomantismoOpcao11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW.id?PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW:null;
}
