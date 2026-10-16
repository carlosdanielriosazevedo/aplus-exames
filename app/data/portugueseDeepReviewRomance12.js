export const PORTUGUESE_ROMANCE_12_DEEP_REVIEW_VERSION="2026.10-wave23";

export const PORTUGUESE_ROMANCE_12_DEEP_REVIEW={
  id:"pt12-saramago",
  title:"Romance · opção prescrita",
  lead:"Nas Aprendizagens Essenciais de Português do 12.º ano de março de 2026, o bloco Romance corresponde à leitura integral de uma de três opções: Memorial do Convento, de José Saramago; O Ano da Morte de Ricardo Reis, de José Saramago; ou Um Deus Passeando pela Brisa da Tarde, de Mário de Carvalho. O método abaixo separa o que é comum à análise do romance do que depende da obra realmente estudada, para evitar aplicar automaticamente traços de Saramago a Mário de Carvalho — ou misturar dois romances diferentes de Saramago.",
  goals:[
    "Reconhecer corretamente as três opções curriculares de romance nas AE de março de 2026.",
    "Distinguir análise transversal do género romance de conteúdos específicos de cada obra.",
    "Analisar narrador, focalização, tempo, espaço, personagens e composição pela função que desempenham.",
    "Relacionar História e ficção apenas quando essa relação for efetivamente construída pela obra estudada.",
    "Tratar ironia, comentário narratorial e intertextualidade como mecanismos textuais, não como etiquetas de autor.",
    "Interpretar personagens em conflito com estruturas sociais, políticas, culturais ou íntimas sem reduzir a obra a uma tese única.",
    "Usar episódios e pormenores concretos como prova da interpretação.",
    "Responder em exame por afirmação → evidência → mecanismo narrativo → efeito → interpretação."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais · Português · 12.º ano · março de 2026 · Romance: escolher uma de três opções",
    "DGE · Memorial do Convento, de José Saramago · opção de romance",
    "DGE · O Ano da Morte de Ricardo Reis, de José Saramago · opção de romance",
    "DGE · Um Deus Passeando pela Brisa da Tarde, de Mário de Carvalho · opção de romance",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt12-romance-contrato-curricular",
      kicker:"1 · O QUE É OBRIGATÓRIO",
      title:"Há uma escolha entre três romances — não um bloco obrigatório exclusivamente de Saramago",
      paragraphs:[
        "O ponto de partida tem de ser curricularmente exato. Em março de 2026, o aluno lê integralmente uma das três opções previstas: Memorial do Convento, O Ano da Morte de Ricardo Reis ou Um Deus Passeando pela Brisa da Tarde.",
        "Isto significa que não se deve ensinar o bloco inteiro como se todos os alunos tivessem estudado José Saramago. Duas opções são de Saramago, mas a terceira é de Mário de Carvalho e exige uma leitura própria.",
        "Também não se devem fundir os dois romances de Saramago. Partilham traços autorais possíveis, mas têm universos, personagens, estruturas, contextos e problemas interpretativos diferentes. Primeiro identifica a obra; só depois mobiliza conhecimento pertinente."
      ],
      signals:["Uma obra entre três opções.","Duas opções de Saramago; uma de Mário de Carvalho.","Autor comum não torna duas obras equivalentes.","O excerto e a obra estudada mandam na resposta."],
      example:{title:"Exemplo · antes de interpretar",prompt:"O que deves confirmar antes de responder a uma pergunta sobre o romance?",steps:["Identifica título e autor.","Situa o episódio na obra.","Separa traços textuais observáveis de conhecimentos gerais sobre o autor.","Seleciona apenas conceitos pertinentes para aquele excerto."],answer:"Uma resposta segura começa pela obra concreta. Se o texto pertence a Memorial do Convento, não devo transportar automaticamente elementos de O Ano da Morte de Ricardo Reis; se pertence a Um Deus Passeando pela Brisa da Tarde, não devo aplicar-lhe uma grelha de 'estilo saramaguiano'.",note:"A opção curricular não é uma lista de três romances para estudar em conjunto."},
      remember:"Primeiro a obra; depois o autor e o contexto — nunca o contrário.",
      pitfalls:["Apresentar Saramago como único romance obrigatório.","Misturar os dois romances de Saramago.","Aplicar traços de Saramago a Mário de Carvalho."]
    },
    {
      id:"pt12-romance-narrador-focalizacao",
      kicker:"2 · NARRADOR E FOCALIZAÇÃO",
      title:"Quem narra, quem percebe e quem comenta são perguntas diferentes",
      paragraphs:[
        "Num romance, identificar a pessoa gramatical do narrador é apenas o início. É necessário observar quem detém a informação, a que consciência o leitor tem acesso e em que momentos a perspetiva se aproxima ou afasta de uma personagem.",
        "O narrador pode comentar, avaliar, ironizar, antecipar ou estabelecer cumplicidade com o leitor. Essas intervenções só interessam se explicares o seu efeito: orientar a leitura, produzir distância crítica, relativizar uma versão dos factos ou revelar tensão entre discurso e acontecimento.",
        "A focalização também pode variar. Em vez de decorar um rótulo para a obra inteira, observa o excerto: que informação é permitida, que perceção domina e o que fica de fora? A análise deve nascer dessa distribuição concreta da informação."
      ],
      signals:["Narrador ≠ focalizador.","Comentário narratorial precisa de função.","A focalização pode variar ao longo da obra.","Pergunta sempre: quem sabe, quem vê e quem avalia?"],
      example:{title:"Exemplo · narrador interventivo",prompt:"Como analisar um comentário do narrador sem ficar pela identificação?",steps:["Isola o comentário.","Distingue-o da ação narrada.","Explica a atitude que introduz: ironia, juízo, distância, cumplicidade, etc.","Liga essa atitude à interpretação do episódio."],answer:"O comentário narratorial não é um ornamento: altera a forma como o leitor recebe a ação. Ao introduzir uma avaliação ou distância irónica, o narrador pode impedir uma leitura neutra do episódio e orientar a atenção para a contradição entre aparência e realidade.",note:"Dizer apenas 'o narrador é interventivo' não explica nada."},
      remember:"Classificação narrativa só vale quando explica a construção do sentido.",
      pitfalls:["Confundir narrador com autor.","Chamar omnisciente ao narrador só porque está na terceira pessoa.","Nomear ironia sem indicar alvo e efeito."]
    },
    {
      id:"pt12-romance-tempo-historia-ficcao",
      kicker:"3 · TEMPO, HISTÓRIA E FICÇÃO",
      title:"O contexto histórico não substitui a leitura da forma como a narrativa o transforma",
      paragraphs:[
        "Os três romances dialogam, de modos diferentes, com universos históricos e políticos. Porém, uma resposta literária não deve transformar-se numa aula de História. O objetivo é perceber como o romance seleciona, reorganiza, imagina ou problematiza esse passado.",
        "Quando surgem personagens ou acontecimentos históricos, pergunta que função assumem na ficção. Podem servir para contrastar experiência individual e poder, revelar tensões sociais, questionar versões oficiais ou criar um horizonte cultural para as personagens.",
        "O tempo narrativo também importa como construção: ordem, duração, elipse, pausa, antecipação, memória e repetição moldam a experiência do leitor. Não basta localizar o século; é preciso analisar a organização temporal do relato."
      ],
      signals:["Contexto histórico ≠ resumo histórico.","Facto histórico pode ser transformado pela ficção.","Tempo da história ≠ tempo do discurso.","Anacronia só interessa pelo efeito que produz."],
      example:{title:"Exemplo · História na ficção",prompt:"Como responder quando um episódio se apoia num acontecimento histórico?",steps:["Identifica o referente histórico necessário.","Mostra como o romance o representa.","Observa seleção, comentário, personagem ou detalhe ficcional.","Explica que leitura do passado resulta dessa construção."],answer:"A referência histórica fornece o quadro, mas a interpretação nasce da forma como o romance o transforma em narrativa. Ao escolher determinadas personagens, perspetivas e detalhes, a obra constrói uma leitura do passado em vez de o reproduzir como documento.",note:"Usa apenas o contexto que ajuda a explicar o texto."},
      remember:"Na literatura, o passado histórico é matéria organizada por uma voz, uma perspetiva e uma forma.",
      pitfalls:["Substituir análise literária por datas e factos.","Tratar personagem histórica e personagem ficcional do mesmo modo sem observar a construção.","Ignorar a organização temporal do discurso."]
    },
    {
      id:"pt12-romance-personagens-conflito",
      kicker:"4 · PERSONAGENS E CONFLITO",
      title:"Uma personagem forte é uma rede de escolhas, relações, limites e transformações",
      paragraphs:[
        "Caracterizar uma personagem não é colecionar adjetivos. Procura decisões, relações, contradições, gestos, linguagem, evolução e modo como outras personagens a veem. A caracterização deve ser demonstrável no texto.",
        "Nos romances do programa, o indivíduo pode confrontar-se com poder, convenções sociais, memória, desejo, dever, identidade ou violência histórica. O conflito ganha valor quando mostras como esses planos se cruzam na ação e na consciência das personagens.",
        "Evita reduzir uma personagem a porta-voz da mensagem do autor. Mesmo quando representa uma tensão coletiva, continua a ter uma função narrativa própria, com ambiguidades que podem impedir uma leitura moral demasiado simples."
      ],
      signals:["Adjetivo sem prova é caracterização fraca.","Relações revelam tanto como descrições.","Conflito externo e conflito interno podem coexistir.","Personagem ≠ tese ambulante do autor."],
      example:{title:"Exemplo · caracterização com prova",prompt:"Como mostrar que uma personagem está dividida entre dever e desejo?",steps:["Identifica uma decisão ou fala concreta.","Mostra o dever que a condiciona.","Mostra o desejo ou impulso contrário.","Explica o efeito dessa tensão no desenvolvimento da personagem."],answer:"A divisão da personagem deve ser demonstrada pela ação: quando a mesma decisão revela simultaneamente obediência a uma norma e resistência íntima, o conflito deixa de ser um adjetivo psicológico e passa a organizar o seu percurso narrativo.",note:"Troca 'é uma personagem complexa' por uma explicação de onde vem essa complexidade."},
      remember:"Caracterizar é provar como a personagem age, reage, muda e se relaciona.",
      pitfalls:["Listar traços sem evidência.","Confundir protagonista com herói moral.","Explicar todas as ações por uma única motivação."]
    },
    {
      id:"pt12-romance-espaco-sociedade",
      kicker:"5 · ESPAÇO E MUNDO SOCIAL",
      title:"O espaço pode organizar hierarquias, liberdade, vigilância, memória e contraste",
      paragraphs:[
        "O espaço romanesco não é apenas cenário. Casas, ruas, cidades, edifícios, paisagens ou espaços institucionais podem condicionar movimentos, encontros e relações de poder.",
        "Um contraste espacial pode tornar visível um contraste social ou psicológico. A passagem entre espaços também pode marcar transformação, exclusão, pertença, ameaça ou mudança de perspetiva.",
        "No exame, evita a descrição turística. Seleciona um detalhe espacial e pergunta o que permite, impede ou simboliza dentro da ação. A função vale mais do que a enumeração de lugares."
      ],
      signals:["Espaço condiciona ação.","Dentro/fora pode ter valor social ou simbólico.","Percurso espacial pode marcar transformação.","Descrição precisa de função narrativa."],
      example:{title:"Exemplo · função do espaço",prompt:"Como transformar uma descrição de lugar numa análise?",steps:["Identifica um traço concreto do espaço.","Relaciona-o com uma personagem ou grupo.","Explica a ação, hierarquia ou emoção que esse espaço condiciona.","Conclui com a função narrativa ou simbólica."],answer:"O espaço deixa de ser cenário quando interfere na experiência das personagens. Uma separação física pode materializar uma hierarquia social, enquanto uma mudança de lugar pode assinalar perda de proteção ou conquista de autonomia.",note:"Não inventes simbolismo sem apoio no texto."},
      remember:"Pergunta ao espaço: o que faz à ação e às personagens?",
      pitfalls:["Enumerar locais.","Chamar simbólico a qualquer espaço.","Ignorar relações entre espaço e poder."]
    },
    {
      id:"pt12-romance-opcoes",
      kicker:"6 · AS TRÊS OPÇÕES",
      title:"Cada romance exige um mapa próprio — as diferenças não podem ser apagadas",
      paragraphs:[
        "Em Memorial do Convento, a leitura deve partir da obra concreta e pode articular construção histórica, poder, trabalho, personagens e dimensão imaginativa, sempre apoiada em episódios e procedimentos narrativos observáveis.",
        "Em O Ano da Morte de Ricardo Reis, a presença de Ricardo Reis enquanto figura literária, o diálogo com Pessoa, o contexto histórico de 1936 e a relação entre observação, identidade e participação devem ser tratados através da construção específica do romance, não como simples biografia do heterónimo.",
        "Em Um Deus Passeando pela Brisa da Tarde, o centro de gravidade é outro: a opção curricular é de Mário de Carvalho e deve ser estudada nos seus próprios termos narrativos, históricos, políticos e éticos. Qualquer grelha criada para Saramago tem de ser abandonada se não for demonstrável no texto."
      ],
      signals:["Memorial do Convento: obra própria, não 'romance histórico' como etiqueta suficiente.","Ricardo Reis no romance ≠ simples ficha do heterónimo.","Mário de Carvalho exige grelha própria.","Conhecimento comparativo nunca substitui evidência da obra estudada."],
      example:{title:"Exemplo · evitar transferência indevida",prompt:"Porque é errado aplicar automaticamente 'narrador saramaguiano' às três opções?",steps:["Confirma o autor da obra.","Observa o comportamento do narrador no excerto.","Descreve os mecanismos concretos encontrados.","Só depois relaciona esses mecanismos com conhecimentos autorais pertinentes."],answer:"A categoria é inadequada porque uma das três opções é de Mário de Carvalho e porque, mesmo entre os dois romances de Saramago, o funcionamento narrativo deve ser demonstrado no texto. O autor pode orientar hipóteses; não substitui a análise.",note:"A unidade curricular é Romance, não 'traços de Saramago'."},
      remember:"Três opções curriculares, três mapas de obra — com ferramentas narrativas comuns.",
      pitfalls:["Forçar as três obras à mesma grelha.","Confundir Ricardo Reis personagem com o heterónimo sem mediação ficcional.","Apagar Mário de Carvalho do programa."]
    },
    {
      id:"pt12-romance-ironia-intertextualidade",
      kicker:"7 · IRONIA, VOZES E INTERTEXTUALIDADE",
      title:"Uma voz reconhecida ou uma referência cultural só ganha valor quando se explica o que faz no romance",
      paragraphs:[
        "A ironia depende de desfasamento: entre o que se diz e o que se quer fazer perceber, entre discurso e situação, ou entre expectativa e resultado. Identifica o alvo e o efeito; não uses 'irónico' como elogio vago da escrita.",
        "A intertextualidade também exige mecanismo. Uma referência a outro texto, autor, mito ou discurso cultural pode produzir contraste, continuação, paródia, revisão ou diálogo. A origem da referência é apenas metade da resposta.",
        "Quando coexistem várias vozes — narrador, personagem, discurso político, religioso, histórico ou literário — observa se o romance as confirma, confronta ou deixa em tensão. Essa polifonia pode ser decisiva para a visão crítica da obra."
      ],
      signals:["Ironia: alvo + desfasamento + efeito.","Intertexto: origem + transformação + função.","Voz citada não equivale à posição do romance.","Contraste entre discursos pode produzir crítica."],
      example:{title:"Exemplo · referência intertextual",prompt:"Como analisar uma alusão literária conhecida?",steps:["Identifica a alusão apenas se houver base segura.","Explica o sentido que traz do texto de origem.","Mostra como o romance a desloca ou reutiliza.","Liga essa transformação à personagem, tema ou situação atual."],answer:"Reconhecer a fonte não basta. A referência torna-se literariamente relevante quando o romance a reinscreve noutro contexto, criando aproximação ou contraste que modifica a leitura da cena e da personagem.",note:"Nunca transformes cultura geral em substituto da análise do excerto."},
      remember:"Referência reconhecida + função explicada = interpretação; referência isolada = trivia.",
      pitfalls:["Chamar ironia a qualquer comentário crítico.","Fazer caça a referências sem função.","Atribuir automaticamente ao autor qualquer fala de personagem."]
    },
    {
      id:"pt12-romance-exame",
      kicker:"8 · MÉTODO DE EXAME",
      title:"A resposta forte parte do excerto e regressa à obra sem perder a cadeia de prova",
      paragraphs:[
        "Começa pelo verbo do enunciado: explicar, comparar, caracterizar, interpretar ou justificar exigem operações diferentes. Depois formula uma afirmação que responda diretamente à pergunta.",
        "Seleciona evidência textual relevante e explica o mecanismo narrativo: focalização, comentário, contraste, organização temporal, espaço, relação entre personagens, ironia ou outro procedimento realmente presente. Só então chega à interpretação.",
        "Quando a pergunta exige relação com a obra integral, usa conhecimento global para iluminar o excerto — não para o abandonar. A melhor estrutura é afirmação → evidência → mecanismo → efeito → integração na obra."
      ],
      signals:["Responde ao verbo do enunciado.","Evidência antes de generalização.","Mecanismo explica como o sentido é produzido.","Obra integral deve iluminar o excerto."],
      example:{title:"Exemplo · cadeia completa",prompt:"Como construir um parágrafo de resposta sobre o efeito de um comentário narratorial?",steps:["Afirma o efeito relevante.","Aponta a formulação ou situação que o demonstra.","Explica o mecanismo: distância, ironia, antecipação, avaliação, etc.","Relaciona o efeito com personagem, conflito ou visão da obra."],answer:"O comentário do narrador introduz distância crítica perante a ação. A formulação escolhida contrasta com o comportamento observado, produzindo ironia; desse modo, o leitor é levado a questionar a versão superficial dos acontecimentos e a integrar o episódio numa crítica mais ampla construída pela obra.",note:"Evita iniciar com uma página de contexto antes de responder ao que foi perguntado."},
      remember:"Afirmação → evidência → mecanismo → efeito → interpretação integrada.",
      pitfalls:["Resumo do enredo em vez de resposta.","Conhecimento autoral sem ligação ao excerto.","Citação ou referência sem explicação do efeito."]
    }
  ]
};

export function portugueseRomance12DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ROMANCE_12_DEEP_REVIEW.id?PORTUGUESE_ROMANCE_12_DEEP_REVIEW:null;
}
