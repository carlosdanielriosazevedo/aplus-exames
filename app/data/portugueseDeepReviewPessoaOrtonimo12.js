export const PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW_VERSION="2026.10-wave18";

export const PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW={
  id:"pt12-pessoa-ortonimo",
  title:"Fernando Pessoa · ortónimo",
  lead:"As Aprendizagens Essenciais de março de 2026 pedem a leitura de oito poemas do ortónimo. A seleção concreta pode variar, por isso este guia trabalha os grandes eixos que permitem interpretar os poemas escolhidos pela escola: fingimento artístico, consciência e dor de pensar, tensão entre sentir e pensar, fragmentação do eu, nostalgia da infância, sonho e distância entre experiência vivida e experiência construída pela poesia. No exame, o objetivo não é reconhecer etiquetas: é provar como uma voz poética pensa, sente, se observa e transforma essa experiência em linguagem.",
  goals:[
    "Distinguir Fernando Pessoa ortónimo dos heterónimos e de Mensagem, sem transferir automaticamente conceitos entre blocos.",
    "Compreender o fingimento artístico como construção poética da emoção, e não como simples mentira.",
    "Analisar a consciência e a dor de pensar como conflito entre experiência imediata e reflexão sobre a própria experiência.",
    "Relacionar sentir, pensar, imaginar e recordar com a instabilidade ou fragmentação do sujeito.",
    "Interpretar a nostalgia da infância como representação de um passado associado a unidade, inconsciência ou felicidade perdida.",
    "Explicar a função de paradoxos, oposições, imagens, ritmo e organização argumentativa na construção do sentido.",
    "Responder por ideia → evidência textual → relação interna → efeito → interpretação, evitando resumos biográficos."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais · Português · 12.º ano · março de 2026 · poesia lírica do ortónimo: oito poemas",
    "DGE · Currículo Nacional · Português · 12.º ano · Educação Literária e interpretação de texto poético",
    "DGE/#EstudoEmCasa · A poesia de Fernando Pessoa ortónimo · temáticas e leitura orientada",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt12-ortonimo-identidade",
      kicker:"1 · QUEM FALA NO ORTÓNIMO",
      title:"Ortónimo não significa voz simples nem confissão direta",
      paragraphs:[
        "Chama-se ortónimo à poesia publicada ou atribuída ao próprio nome Fernando Pessoa, por oposição às personalidades poéticas autónomas dos heterónimos. Esta distinção é útil, mas não autoriza a tratar o eu poético como se fosse uma transcrição transparente da biografia do autor.",
        "Mesmo quando um poema parece íntimo, a voz poética é uma construção textual. O sujeito pode observar-se, dividir-se, contradizer-se ou transformar uma emoção numa reflexão abstrata. É precisamente essa distância entre viver e observar-se a viver que explica muitas tensões da poesia ortónima.",
        "No exame, evita respostas biográficas do tipo «Pessoa sentia isto». Começa no texto: identifica a experiência enunciada, mostra como o sujeito a formula e só depois interpreta o conflito ou a visão do mundo que daí resulta."
      ],
      signals:[
        "Ortónimo ≠ autobiografia automática.",
        "Eu poético: voz construída no poema.",
        "Procura sinais de auto-observação, divisão, dúvida ou contradição."
      ],
      example:{
        title:"Exemplo de resposta · sujeito e autor",
        prompt:"Um poema usa repetidamente a primeira pessoa. Podes concluir que se trata de confissão autobiográfica?",
        steps:[
          "Identifica a presença da primeira pessoa.",
          "Observa se o sujeito comenta, analisa ou contradiz o que sente.",
          "Distingue a voz textual da pessoa histórica do autor.",
          "Formula a interpretação a partir do modo como a experiência é construída no poema."
        ],
        modelAnswer:"A primeira pessoa cria uma aparência de intimidade, mas não basta para transformar o poema numa confissão autobiográfica. O sujeito poético é uma voz construída que pode observar e reorganizar a própria experiência. O essencial é perceber como essa voz transforma o sentir em reflexão e que imagem de si resulta desse processo.",
        note:"A biografia pode contextualizar; não substitui a análise textual."
      },
      remember:"Lê primeiro a voz do poema; não a confundas automaticamente com a pessoa do autor.",
      pitfalls:[
        "Usar episódios biográficos como prova do sentido do poema.",
        "Tratar ortónimo como sinónimo de sinceridade imediata.",
        "Misturar características de Caeiro, Reis ou Campos sem evidência textual."
      ]
    },
    {
      id:"pt12-ortonimo-fingimento",
      kicker:"2 · FINGIMENTO ARTÍSTICO",
      title:"A emoção poética é construída: sentir, recordar e transformar não são o mesmo gesto",
      paragraphs:[
        "O fingimento artístico é uma das chaves mais conhecidas do ortónimo, mas costuma ser simplificado em excesso. Fingir poeticamente não significa apenas inventar uma emoção falsa. Significa converter experiência, memória ou possibilidade emocional numa forma verbal organizada, capaz de produzir no leitor uma emoção esteticamente construída.",
        "O poema pode estabelecer vários níveis: uma dor vivida, uma dor recordada ou pensada e a emoção que o leitor reconhece no texto. A poesia nasce da transformação entre esses níveis. Por isso, sentimento e inteligência não aparecem necessariamente como inimigos: a consciência participa na fabricação do poema.",
        "Quando encontrares referências a fingir, representar, imaginar, escrever ou sentir de modo mediado, pergunta sempre o que está a ser transformado e porquê. Uma resposta forte explica o processo, não apenas repete a palavra «fingimento»."
      ],
      signals:[
        "Fingimento artístico = transformação estética, não mentira banal.",
        "Distingue emoção vivida, emoção pensada/recordada e emoção construída no poema.",
        "Observa metalinguagem sobre poeta, poema, criação ou leitor."
      ],
      example:{
        title:"Exemplo de resposta · fingimento",
        prompt:"Como explicarias que um poeta possa escrever sobre uma dor sem simplesmente reproduzir a dor vivida?",
        steps:[
          "Parte da emoção ou experiência inicial.",
          "Mostra a intervenção da consciência e da memória.",
          "Explica a transformação em linguagem e forma poética.",
          "Conclui distinguindo experiência biográfica e efeito artístico."
        ],
        modelAnswer:"A dor que chega ao poema já não é apenas a experiência imediata: é selecionada, pensada e organizada pela consciência. O fingimento artístico consiste nessa transformação da emoção em construção verbal, permitindo que o texto produza um sentido e um efeito próprios, diferentes da experiência original.",
        note:"Não traduzas «fingimento» por falsidade moral."
      },
      remember:"O poeta não copia o sentir: transforma-o em forma.",
      pitfalls:[
        "Dizer apenas que o poeta mente.",
        "Confundir fingimento artístico com ausência de emoção.",
        "Esquecer o papel da consciência e da construção formal."
      ]
    },
    {
      id:"pt12-ortonimo-pensar",
      kicker:"3 · CONSCIÊNCIA E DOR DE PENSAR",
      title:"Pensar sobre o que se sente pode impedir a experiência imediata de ser plenamente vivida",
      paragraphs:[
        "Em muitos poemas do ortónimo, a consciência introduz distância. O sujeito não se limita a sentir: percebe que sente, analisa esse sentir e pode desejar uma forma de existência menos reflexiva. Daí nasce a chamada dor de pensar.",
        "A oposição fundamental não é simplesmente inteligência contra emoção. O conflito está entre experiência espontânea e consciência reflexiva. Quanto mais o sujeito se observa, mais difícil pode tornar-se viver sem fratura aquilo que acontece. Pensar duplica a experiência: há quem vive e, simultaneamente, quem observa esse viver.",
        "Figuras associadas a inconsciência, natureza, infância ou vida simples podem funcionar como contraponto. Não assumas, porém, que todo elemento natural significa felicidade: verifica se o texto constrói efetivamente esse contraste."
      ],
      signals:[
        "Consciência cria distância entre sujeito e experiência.",
        "Dor de pensar: excesso de auto-observação e impossibilidade de espontaneidade plena.",
        "Procura contrastes entre consciência e inconsciência, complexidade e simplicidade."
      ],
      example:{
        title:"Exemplo de resposta · dor de pensar",
        prompt:"O sujeito inveja uma existência que parece viver sem se analisar. Como interpretas essa inveja?",
        steps:[
          "Identifica a figura apresentada como menos consciente ou mais espontânea.",
          "Mostra a diferença em relação ao sujeito reflexivo.",
          "Explica o custo atribuído à consciência.",
          "Relaciona o contraste com o desejo impossível de recuperar espontaneidade."
        ],
        modelAnswer:"A figura invejada representa uma forma de existência percebida como imediata, sem a duplicação provocada pela autoanálise. O sujeito sente a consciência como fonte de distância e sofrimento, porque pensar continuamente a experiência impede que ela seja vivida com a mesma espontaneidade.",
        note:"A palavra-chave é relação: consciência → distância → perda de espontaneidade."
      },
      remember:"Sentir e saber que se sente não são, no ortónimo, a mesma experiência.",
      pitfalls:[
        "Definir dor de pensar como tristeza genérica.",
        "Dizer que Pessoa rejeita toda inteligência.",
        "Inventar oposição à natureza quando o texto não a constrói."
      ]
    },
    {
      id:"pt12-ortonimo-fragmentacao",
      kicker:"4 · FRAGMENTAÇÃO DO EU",
      title:"O sujeito pode tornar-se espectador de si próprio",
      paragraphs:[
        "A consciência favorece uma experiência dividida do eu. O sujeito pode não coincidir consigo próprio: sente uma coisa, pensa outra, observa-se de fora ou reconhece versões diferentes de si em momentos distintos. Esta instabilidade é mais rigorosamente descrita como fragmentação ou desdobramento do sujeito do que como simples indecisão.",
        "Pronomes, oposições, perguntas, paradoxos e mudanças de perspetiva podem materializar essa divisão. Um poema pode construir simultaneamente desejo e recusa, proximidade e distância, identidade e estranheza. O importante é mostrar como a forma verbal encena a fratura.",
        "Não confundas esta fragmentação interna com heteronímia. Os heterónimos são construções autorais com identidades poéticas próprias; um poema ortónimo pode apresentar um eu dividido sem deixar de pertencer ao ortónimo."
      ],
      signals:[
        "Eu que se observa = possibilidade de desdobramento interno.",
        "Contradições podem ser estruturais, não erros lógicos.",
        "Fragmentação do ortónimo ≠ heteronímia."
      ],
      example:{
        title:"Exemplo de resposta · eu dividido",
        prompt:"Um sujeito afirma desejar algo e logo questiona esse desejo. O que pode revelar esta estrutura?",
        steps:[
          "Identifica os dois movimentos contraditórios.",
          "Mostra que pertencem à mesma voz poética.",
          "Explica como a consciência impede uma identidade estável.",
          "Relaciona a forma contraditória com a fragmentação do sujeito."
        ],
        modelAnswer:"A sucessão entre desejo e questionamento mostra que o sujeito não coincide de forma estável com o que sente. Ao observar e corrigir a própria experiência, divide-se entre quem deseja e quem analisa esse desejo, tornando a contradição uma forma textual da fragmentação do eu.",
        note:"Não uses «dupla personalidade» como atalho psicológico."
      },
      remember:"No ortónimo, o eu pode ser simultaneamente experiência e observador da experiência.",
      pitfalls:[
        "Chamar heterónimo a qualquer desdobramento do sujeito.",
        "Reduzir a fragmentação a indecisão.",
        "Ignorar os mecanismos linguísticos que constroem a divisão."
      ]
    },
    {
      id:"pt12-ortonimo-infancia",
      kicker:"5 · INFÂNCIA, MEMÓRIA E NOSTALGIA",
      title:"A infância pode funcionar como imagem de uma unidade perdida",
      paragraphs:[
        "A infância surge frequentemente como tempo lembrado a partir do presente. Mais do que um simples período biográfico feliz, pode representar uma relação menos reflexiva com o mundo, uma sensação de unidade ou uma felicidade que só se reconhece plenamente depois de perdida.",
        "A memória não recupera o passado de forma neutra. O adulto reconstrói a infância através da consciência atual; por isso, a nostalgia contém simultaneamente aproximação e distância. Recordar pode intensificar a perda precisamente porque confirma que esse estado já não é recuperável.",
        "Quando o poema convoca objetos, lugares, vozes ou sensações do passado, analisa a função concreta desses elementos. Eles podem desencadear memória, marcar contraste temporal ou transformar uma lembrança particular numa reflexão sobre identidade e passagem do tempo."
      ],
      signals:[
        "Infância: verifica se representa inconsciência, unidade, proteção ou felicidade perdida.",
        "Memória é reconstrução no presente, não regresso literal ao passado.",
        "Nostalgia nasce muitas vezes do contraste passado/presente."
      ],
      example:{
        title:"Exemplo de resposta · nostalgia da infância",
        prompt:"O sujeito recorda um espaço da infância com aparente felicidade. O que falta analisar além da lembrança?",
        steps:[
          "Identifica o elemento concreto recordado.",
          "Mostra o valor positivo que recebe na memória.",
          "Compara-o com o presente do sujeito.",
          "Explica por que motivo recordar intensifica a consciência da perda."
        ],
        modelAnswer:"O espaço recordado vale menos como cenário biográfico do que como símbolo de um tempo percebido como mais uno e menos consciente. A comparação com o presente transforma a memória em nostalgia: o sujeito aproxima-se afetivamente do passado, mas a própria recordação confirma que esse estado já não pode ser recuperado.",
        note:"Infância não é automaticamente felicidade; demonstra o valor que o poema lhe atribui."
      },
      remember:"Recordar aproxima o passado e, ao mesmo tempo, prova a sua distância.",
      pitfalls:[
        "Resumir a nostalgia a saudades.",
        "Tratar a memória como fotografia objetiva.",
        "Usar dados biográficos em vez dos elementos do poema."
      ]
    },
    {
      id:"pt12-ortonimo-sonho-realidade",
      kicker:"6 · SONHO, DESEJO E REALIDADE",
      title:"Imaginar outras formas de existir pode revelar a insuficiência do presente",
      paragraphs:[
        "O sonho e a imaginação podem abrir possibilidades que a experiência concreta não oferece. O sujeito projeta estados, lugares ou identidades alternativas, mas essa abertura não garante realização: muitas vezes acentua a diferença entre aquilo que se deseja e aquilo que se vive.",
        "Esta tensão pode articular-se com a fragmentação do eu. Imaginar outra vida ou outro modo de sentir é também reconhecer que o presente não satisfaz plenamente. O sonho torna-se, assim, simultaneamente fuga, criação e medida da insuficiência do real.",
        "Evita interpretar qualquer imagem irreal como escapismo. Observa se o poema valoriza o sonho, o problematiza ou mostra a impossibilidade de permanecer nele. O sentido depende da relação construída entre imaginação e realidade."
      ],
      signals:[
        "Sonho pode funcionar como alternativa, fuga, criação ou contraste.",
        "Desejo e realização devem ser analisados separadamente.",
        "Pergunta sempre o que o imaginado revela sobre o presente."
      ],
      example:{
        title:"Exemplo de resposta · sonho e realidade",
        prompt:"Um cenário imaginado parece mais desejável do que o presente. Como evitar uma leitura superficial?",
        steps:[
          "Caracteriza o cenário imaginado.",
          "Identifica o limite ou mal-estar do presente.",
          "Explica a função do contraste.",
          "Verifica se o sonho oferece solução ou apenas torna a falta mais visível."
        ],
        modelAnswer:"O cenário imaginado funciona como contraponto ao presente e evidencia aquilo que nele falta. Contudo, se o poema sublinha a impossibilidade de permanecer nesse espaço ideal, o sonho não resolve o conflito: amplia-o, porque torna mais nítida a distância entre desejo e realidade.",
        note:"Não concluas automaticamente que sonhar é positivo ou negativo."
      },
      remember:"O sonho mede o real: mostra aquilo que o presente não consegue oferecer.",
      pitfalls:[
        "Chamar escapismo a toda imaginação.",
        "Confundir desejo com realização.",
        "Ignorar o regresso ou confronto com o presente."
      ]
    },
    {
      id:"pt12-ortonimo-forma-exame",
      kicker:"7 · FORMA, LEITURA E ESTRATÉGIA DE EXAME",
      title:"Tema sem forma é metade da resposta: prova como o poema constrói a ideia",
      paragraphs:[
        "Nos poemas do ortónimo, uma ideia abstrata pode desenvolver-se como pequeno raciocínio: afirmação, oposição, reformulação, pergunta, paradoxo ou conclusão. A organização interna do poema é tão importante como o tema. Segue a progressão do pensamento antes de escolher uma etiqueta temática.",
        "Recursos como antítese, paradoxo, comparação, metáfora, repetição, interrogação e variações de ritmo devem ser explicados pela sua função. Uma antítese pode materializar a divisão do sujeito; uma pergunta pode abrir dúvida; uma repetição pode insistir numa impossibilidade ou num desejo.",
        "No exame, constrói respostas densas mas controladas. Nomeia a ideia, cita ou parafraseia um indício preciso, explica a relação entre elementos e termina no efeito de sentido. Se a pergunta comparar dois poemas, estabelece um critério comum e depois mostra semelhança ou diferença com evidência de ambos."
      ],
      signals:[
        "Segue a progressão lógica e emocional do poema.",
        "Recurso expressivo só conta quando ligado a um efeito concreto.",
        "Resposta forte: ideia + evidência + mecanismo + efeito + interpretação."
      ],
      example:{
        title:"Exemplo de resposta · recurso expressivo",
        prompt:"O poema opõe sentir e pensar. Como transformar a identificação da antítese numa resposta completa?",
        steps:[
          "Identifica os dois polos da oposição.",
          "Localiza o indício textual que os coloca em confronto.",
          "Explica que conflito do sujeito essa oposição materializa.",
          "Relaciona o efeito com o sentido global do excerto."
        ],
        modelAnswer:"A oposição entre sentir e pensar não funciona apenas como contraste vocabular. Ela materializa a divisão do sujeito entre experiência imediata e consciência reflexiva; ao colocar os dois polos em tensão, o poema torna visível a dificuldade de viver uma emoção sem a transformar imediatamente em objeto de pensamento.",
        note:"Evita a fórmula vazia «torna o texto mais expressivo»."
      },
      remember:"No exame, não basta reconhecer o tema: mostra como a linguagem o produz.",
      pitfalls:[
        "Despejar características estudadas sem verificar se aparecem no excerto.",
        "Nomear figuras de estilo sem efeito.",
        "Responder com biografia em vez de análise.",
        "Misturar ortónimo, heterónimos e Mensagem por associação temática."
      ]
    }
  ]
};

export function portuguesePessoaOrtonimo12DeepReviewFor(unitId){
  return unitId===PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW.id?PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW:null;
}
