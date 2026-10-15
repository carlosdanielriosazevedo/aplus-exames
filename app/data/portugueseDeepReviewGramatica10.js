export const PORTUGUESE_GRAMATICA_10_DEEP_REVIEW_VERSION="2026.10-wave8";

export const PORTUGUESE_GRAMATICA_10_DEEP_REVIEW={
  id:"pt10-gramatica",
  title:"Gramática · base do secundário",
  lead:"Gramática no secundário não deve ser uma coleção de etiquetas decoradas. O objetivo é observar propriedades da língua em contexto, comparar construções e justificar uma classificação com testes ou pistas linguísticas. No 10.º ano, o núcleo inclui história e evolução do português, processos fonológicos, formação de palavras, sintaxe da frase simples e complexa, modalidade, anáfora, registos e atos de fala.",
  goals:[
    "Analisar palavras, grupos e orações dentro da construção em que ocorrem, distinguindo classe, função e valor semântico.",
    "Relacionar evolução da língua, etimologia e processos fonológicos com formas concretas do português.",
    "Reconhecer processos regulares de formação de palavras e usar a estrutura da palavra como pista para o significado.",
    "Identificar constituintes e funções sintáticas com testes, incluindo complemento do nome e complemento do adjetivo.",
    "Distinguir coordenação, subordinação e, em particular, orações subordinadas substantivas completivas e relativas.",
    "Reconhecer valores modais epistémicos, deônticos e apreciativos através das marcas efetivamente usadas no enunciado.",
    "Explicar mecanismos de coesão por anáfora e adequar registo e ato de fala à situação comunicativa.",
    "Resolver itens de gramática da prova 639 por comparação de contextos, evitando regras mecânicas baseadas numa palavra isolada."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 10.º ano · agosto de 2018 · referencial homologado em vigor · domínio Gramática",
    "DGE · Estudo Autónomo · recursos atuais de 10.º ano sobre processos fonológicos, formação de palavras, funções sintáticas, orações, modalidade e anáfora",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026 · Gramática avaliada por itens de seleção e construção, eventualmente com suporte textual",
    "IAVE/EduQA · Prova 639 · 1.ª fase · 2026 · itens de coesão, relações semânticas e funções sintáticas usados como referência de exigência contextual"
  ],
  sections:[
    {
      id:"pt10-gramatica-metodo",
      kicker:"1 · MÉTODO DE ANÁLISE",
      title:"Classifica pela propriedade observável, não pela aparência da palavra",
      paragraphs:[
        "A mesma palavra ou sequência pode desempenhar funções diferentes consoante a construção. Por isso, uma análise segura começa pela frase completa: identifica o núcleo, observa de que elementos depende o constituinte e testa o que muda quando o substituis, deslocas ou retiras. A etiqueta vem no fim do raciocínio, não no início.",
        "Classe de palavras, função sintática e valor semântico pertencem a níveis diferentes. Um grupo preposicional pode desempenhar complemento oblíquo, complemento do nome, complemento do adjetivo ou modificador; a preposição inicial, por si só, não decide a função. Da mesma forma, uma conjunção ou expressão pode assumir relações distintas em contextos diferentes.",
        "Em itens de comparação, procura a propriedade que se mantém ou se altera entre as frases. Pergunta quem seleciona o constituinte, que relação lógica existe, se há antecedente, se é possível pronominalizar ou se a transformação para a passiva preserva a estrutura relevante. Um teste é útil quando responde a uma hipótese concreta."
      ],
      signals:[
        "Lê sempre a frase completa antes de classificar uma palavra ou grupo.",
        "Separa três perguntas: que classe é, que função desempenha e que valor produz neste contexto?",
        "Usa substituição, dependência, mobilidade, pronominalização ou transformação apenas quando o teste é adequado ao problema."
      ],
      example:{
        title:"Exemplo de método · a mesma preposição, funções diferentes",
        prompt:"Duas expressões começam por «de». Como evitas concluir que têm a mesma função sintática?",
        steps:[
          "Identifica o núcleo de cada grupo e a palavra de que a expressão depende.",
          "Verifica se a expressão é selecionada por um verbo, nome ou adjetivo, ou se acrescenta informação opcional.",
          "Aplica um teste pertinente, como pronominalização ou remoção, sem o tratar como regra absoluta.",
          "Só depois atribui a função e justifica-a pela relação de dependência observada."
        ],
        modelAnswer:"A presença da mesma preposição não determina a função. É necessário observar de que núcleo depende cada expressão e se esse núcleo a seleciona. Assim, dois grupos iniciados por «de» podem ter funções diferentes porque participam em estruturas sintáticas diferentes.",
        note:"Em gramática, a forma visível é uma pista; a relação estrutural é que sustenta a classificação."
      },
      remember:"Não perguntes primeiro «como se chama?»; pergunta «o que faz nesta construção e que propriedade o demonstra?». ",
      pitfalls:[
        "Classificar pela preposição ou pela palavra inicial do constituinte.",
        "Confundir classe de palavra com função sintática.",
        "Aplicar um teste mecânico sem verificar se é adequado à construção."
      ]
    },
    {
      id:"pt10-gramatica-historia",
      kicker:"2 · HISTÓRIA E VARIAÇÃO DA LÍNGUA",
      title:"O português muda no tempo e distribui-se por comunidades diferentes",
      paragraphs:[
        "Conhecer a origem e a evolução do português ajuda a perceber que a língua não é um sistema imóvel. O português desenvolveu-se historicamente a partir do latim e foi sofrendo mudanças fonéticas, lexicais, morfológicas, sintáticas e semânticas. Uma forma antiga não é um «erro»: pertence a outro estado da língua ou a outra variedade.",
        "A distribuição geográfica do português também produz diversidade. Portugal, Brasil, países africanos de língua oficial portuguesa, Timor-Leste e comunidades espalhadas por outros territórios usam variedades com traços próprios. A existência de variação não elimina uma norma de referência em contextos formais; mostra que uso, norma e diversidade são conceitos diferentes.",
        "A etimologia indica a origem histórica de uma palavra e pode ajudar a compreender relações de forma e significado, mas não determina automaticamente o sentido atual. Palavras podem afastar-se semanticamente do étimo, e formas aparentadas podem seguir evoluções distintas. A análise deve combinar origem histórica e uso efetivo."
      ],
      signals:[
        "Distingue mudança histórica de erro linguístico.",
        "Distingue variedade geográfica de adequação a uma norma ou situação comunicativa.",
        "Usa o étimo como pista histórica, verificando sempre o significado atual."
      ],
      example:{
        title:"Exemplo de resposta · mudança não é corrupção",
        prompt:"Uma forma portuguesa moderna é diferente da forma latina que lhe deu origem. O que demonstra essa diferença?",
        steps:[
          "Identifica que estás perante uma relação histórica entre formas.",
          "Procura os processos de mudança que explicam a passagem entre elas.",
          "Separa descrição histórica de julgamento de correção.",
          "Relaciona a evolução com o princípio geral de que as línguas mudam ao longo do tempo."
        ],
        modelAnswer:"A diferença entre a forma latina e a portuguesa resulta de processos históricos de mudança linguística. A forma moderna não é uma versão «degradada» da antiga; é o resultado de transformações acumuladas que fazem parte da evolução regular da língua.",
        note:"A etimologia explica percursos; não é um manual automático do significado contemporâneo."
      },
      remember:"História da língua explica como chegámos a uma forma; descrição do uso atual explica como essa forma funciona hoje.",
      pitfalls:[
        "Tratar variedades geográficas como versões incorretas da língua.",
        "Deduzir o significado atual apenas pelo étimo.",
        "Confundir arcaísmo, variedade e erro ortográfico."
      ]
    },
    {
      id:"pt10-gramatica-fonologia",
      kicker:"3 · PROCESSOS FONOLÓGICOS",
      title:"Inserir, suprimir ou alterar sons permite descrever mudanças de forma precisa",
      paragraphs:[
        "Os processos fonológicos ajudam a descrever transformações ocorridas na evolução histórica e também fenómenos observáveis no uso. Uma primeira organização útil distingue inserção de segmentos, supressão de segmentos e alteração de segmentos. Identificar o grupo antes do nome específico reduz erros de memorização.",
        "Na inserção, um som pode surgir no início, no interior ou no fim da palavra; na supressão, pode desaparecer nessas posições. Daí termos como prótese, epêntese e paragoge, ou aférese, síncope e apócope. O essencial é comparar as duas formas e localizar exatamente o segmento acrescentado ou eliminado.",
        "Nos processos de alteração, a mudança não consiste apenas em acrescentar ou retirar. Podem ocorrer fenómenos como assimilação, dissimilação, metátese ou redução vocálica. Em vez de reconhecer uma palavra decorada, descreve primeiro o que aconteceu aos sons e só depois seleciona a designação técnica."
      ],
      signals:[
        "Compara forma de partida e forma resultante segmento a segmento.",
        "Decide primeiro entre inserção, supressão e alteração.",
        "Localiza a posição da mudança antes de escolher termos como aférese, síncope, apócope, prótese, epêntese ou paragoge."
      ],
      example:{
        title:"Exemplo de resposta · identificar pela operação",
        prompt:"Na passagem informal «estou» → «tou», que raciocínio permite classificar o processo?",
        steps:[
          "Compara as duas formas e identifica o segmento ausente.",
          "Verifica que houve supressão e não substituição.",
          "Localiza a supressão no início da palavra.",
          "Associa supressão inicial à designação aférese."
        ],
        modelAnswer:"Em «estou» → «tou» ocorre supressão de um segmento no início da palavra. Como a eliminação se dá em posição inicial, o processo fonológico é uma aférese.",
        note:"O mesmo método funciona com exemplos históricos: operação primeiro, terminologia depois."
      },
      remember:"Processo fonológico = que mudança ocorreu + onde ocorreu. Essa descrição conduz ao nome técnico.",
      pitfalls:[
        "Decorar exemplos sem conseguir comparar as formas.",
        "Confundir supressão com alteração apenas porque a pronúncia final parece muito diferente.",
        "Escolher o nome do processo sem localizar o segmento envolvido."
      ]
    },
    {
      id:"pt10-gramatica-formacao",
      kicker:"4 · FORMAÇÃO E SIGNIFICADO DAS PALAVRAS",
      title:"Segmentar a palavra ajuda a explicar como foi formada e que significado constrói",
      paragraphs:[
        "Na formação regular de palavras, a estrutura interna é decisiva. Derivação e composição são processos diferentes: na derivação, uma base recebe afixos ou participa noutro mecanismo derivacional; na composição, combinam-se bases ou radicais com autonomia estrutural própria. Antes de classificar, identifica a base ou bases que reconheces.",
        "Entre os processos derivacionais trabalhados no secundário estão prefixação, sufixação, parassíntese, derivação não afixal e conversão. A parassíntese não significa simplesmente «ter prefixo e sufixo»: interessa verificar se a palavra é formada pela associação simultânea dos elementos à base. A conversão, por sua vez, envolve mudança de classe sem acrescentar um afixo derivacional.",
        "A análise morfológica pode apoiar a interpretação lexical. Prefixos, sufixos, radicais e famílias de palavras fornecem pistas sobre o significado, mas o contexto continua necessário. Tal como na etimologia, decompor uma palavra ajuda a formular uma hipótese; não autoriza ignorar usos lexicalizados ou sentidos adquiridos."
      ],
      signals:[
        "Identifica a base ou as bases antes de nomear o processo.",
        "Na parassíntese, testa a formação simultânea em vez de contar simplesmente afixos.",
        "Usa constituintes morfológicos como pistas de significado, confirmando-as pelo contexto."
      ],
      example:{
        title:"Exemplo de resposta · forma antes da etiqueta",
        prompt:"Uma palavra apresenta elementos antes e depois da base. Como decides se há parassíntese?",
        steps:[
          "Isola a base possível e os elementos acrescentados.",
          "Verifica se existe uma formação intermédia válida apenas com o prefixo ou apenas com o sufixo no percurso relevante.",
          "Se a formação depende da associação conjunta, considera a hipótese de parassíntese.",
          "Confirma a análise com o significado e a estrutura da palavra, não apenas com o número de afixos."
        ],
        modelAnswer:"A presença simultânea de prefixo e sufixo não basta para classificar uma palavra como parassintética. É necessário mostrar que o processo de formação envolve a associação conjunta desses elementos à base, sem tratar como etapas independentes formas intermédias que não participam nessa derivação.",
        note:"Perguntar «como se formou?» é diferente de perguntar «que morfemas consigo ver na palavra final?»."
      },
      remember:"Na formação de palavras, reconstrói o processo; não faças apenas inventário das peças da palavra final.",
      pitfalls:[
        "Chamar parassíntese a qualquer palavra com prefixo e sufixo.",
        "Confundir composição com simples sequência de afixos.",
        "Deduzir um significado completo apenas pela decomposição morfológica."
      ]
    },
    {
      id:"pt10-gramatica-sintaxe",
      kicker:"5 · CONSTITUINTES E FUNÇÕES SINTÁTICAS",
      title:"Quem seleciona o constituinte é uma das perguntas mais úteis da análise sintática",
      paragraphs:[
        "A frase organiza-se em constituintes que mantêm relações hierárquicas. No grupo verbal, funções como complemento direto, indireto, oblíquo, agente da passiva, predicativo e modificador distinguem-se por propriedades de seleção e comportamento. Nenhum teste isolado resolve todos os casos, mas pronominalização, transformação passiva e dependência do verbo podem fornecer evidência.",
        "No grupo nominal, é especialmente importante distinguir complemento do nome de modificador do nome. Certos nomes, incluindo nomes derivados de verbos, relações ou estados, podem selecionar um constituinte que lhes completa o sentido. Um modificador acrescenta caracterização sem estabelecer o mesmo tipo de dependência. A análise deve partir do nome concreto e da relação que cria.",
        "No grupo adjetival, o complemento do adjetivo completa o sentido de determinados adjetivos, frequentemente através de grupo preposicional ou oração regida de preposição. Comparar «interesse por ciência», «interessado em ciência» e uma expressão ligada ao verbo mostra por que razão uma preposição semelhante pode integrar funções sintáticas distintas."
      ],
      signals:[
        "Localiza o núcleo do constituinte e pergunta de que palavra depende.",
        "Distingue seleção de informação opcional antes de separar complemento e modificador.",
        "Usa pronominalização, passiva ou remoção como evidência complementar, não como truque infalível."
      ],
      example:{
        title:"Exemplo de resposta · complemento do nome ou do adjetivo",
        prompt:"Compara «o interesse dos alunos pela ciência» e «os alunos estão interessados pela ciência». O que muda?",
        steps:[
          "Na primeira construção, identifica o nome nuclear «interesse».",
          "Na segunda, identifica o adjetivo nuclear «interessados».",
          "Observa que o grupo preposicional completa núcleos de categorias diferentes.",
          "Classifica a função dentro do grupo nominal ou adjetival correspondente e justifica pela dependência."
        ],
        modelAnswer:"Embora os constituintes possam exprimir conteúdo próximo, a função interna depende do núcleo. Junto de «interesse», o constituinte completa um nome; junto de «interessados», completa um adjetivo. A análise sintática acompanha a estrutura, não apenas o significado geral.",
        note:"Este tipo de comparação é próximo da lógica usada em itens de exame: mesma aparência superficial, relações estruturais diferentes."
      },
      remember:"Para identificar uma função sintática, descobre primeiro o núcleo e a relação de dependência do constituinte.",
      pitfalls:[
        "Classificar todos os grupos preposicionais como complemento oblíquo.",
        "Confundir complemento do nome com modificador apenas porque ambos aparecem dentro do grupo nominal.",
        "Usar a possibilidade de retirar um constituinte como único critério de classificação."
      ]
    },
    {
      id:"pt10-gramatica-oracoes",
      kicker:"6 · FRASE COMPLEXA E ORAÇÕES",
      title:"Classificar uma oração exige perceber a relação que estabelece com outra estrutura",
      paragraphs:[
        "Na frase complexa, começa por delimitar as orações e identificar os elementos que as articulam. Coordenação liga unidades sem relação de subordinação sintática; subordinação integra uma oração numa estrutura de que depende. A conjunção é uma pista importante, mas a relação sintática e semântica é que confirma a classificação.",
        "As subordinadas substantivas podem desempenhar funções típicas de grupos nominais. As completivas são selecionadas por um núcleo e completam-lhe o sentido; as substantivas relativas não têm antecedente nominal expresso e são introduzidas por palavras relativas, podendo a própria oração ocupar uma função sintática na estrutura superior.",
        "Não confundas substantiva relativa com adjetiva relativa. Numa adjetiva relativa existe um antecedente nominal que a oração modifica; numa substantiva relativa, a expressão relativa integra uma oração que funciona globalmente como constituinte sem esse antecedente nominal expresso. Comparar pares de frases é mais seguro do que decorar conectores."
      ],
      signals:[
        "Delimita primeiro cada oração e só depois tenta classificá-la.",
        "Pergunta se a oração é selecionada e que função desempenha na estrutura superior.",
        "Para distinguir relativas, procura um antecedente nominal expresso antes do relativo."
      ],
      example:{
        title:"Exemplo de resposta · relativa com ou sem antecedente",
        prompt:"Porque não basta encontrar «quem» para dizer que duas orações têm a mesma classificação?",
        steps:[
          "Localiza a expressão relativa em cada frase.",
          "Procura um antecedente nominal expresso a que ela se refira.",
          "Se existir antecedente, analisa a hipótese de oração adjetiva relativa.",
          "Se não existir e a oração funcionar como constituinte nominal, analisa a hipótese de substantiva relativa."
        ],
        modelAnswer:"A palavra relativa, isoladamente, não determina a classificação. É necessário verificar se retoma um antecedente nominal expresso ou se integra uma oração que funciona globalmente como constituinte nominal. Essa diferença estrutural permite distinguir uma adjetiva relativa de uma substantiva relativa.",
        note:"O exame privilegia frequentemente comparação de contextos; a mesma forma linguística pode participar em estruturas diferentes."
      },
      remember:"Na frase complexa, classificação = relação estrutural + função + valor; o conector sozinho raramente chega.",
      pitfalls:[
        "Classificar a oração apenas pela conjunção ou relativo que a inicia.",
        "Confundir subordinada substantiva relativa com adjetiva relativa.",
        "Ignorar a função que a oração inteira desempenha na frase superior."
      ]
    },
    {
      id:"pt10-gramatica-modalidade",
      kicker:"7 · MODALIDADE",
      title:"Certeza, obrigação e avaliação são posições diferentes do locutor",
      paragraphs:[
        "A modalidade exprime a posição do locutor relativamente ao conteúdo do enunciado ou aos participantes da situação. No valor epistémico, está em causa o grau de certeza ou probabilidade atribuído ao que se diz. Marcas como advérbios, verbos modais, tempos e modos verbais podem contribuir para esse valor, mas devem ser lidas no contexto.",
        "No valor deôntico, o enunciado relaciona-se com obrigação ou permissão. Ordens, regras, necessidade e autorização podem ser expressas por construções muito diferentes. Não confundas o verbo «poder» automaticamente com possibilidade epistémica: em «podes sair agora», por exemplo, o contexto pode construir permissão.",
        "No valor apreciativo, o locutor faz uma avaliação positiva ou negativa sobre uma situação. Adjetivos, advérbios, construções exclamativas ou outros recursos podem manifestar esse juízo. A pergunta de análise deve ser: o locutor apresenta o conteúdo como mais ou menos certo, regula uma ação ou avalia-a?"
      ],
      signals:[
        "Epistémico: procura certeza, probabilidade ou possibilidade quanto à verdade do conteúdo.",
        "Deôntico: procura obrigação, necessidade, permissão ou autorização relativas a uma ação.",
        "Apreciativo: procura juízo de valor positivo ou negativo do locutor."
      ],
      example:{
        title:"Exemplo de resposta · «poder» não tem sempre o mesmo valor",
        prompt:"Compara «Pode chover amanhã» e «Podes sair mais cedo». Que diferença de modalidade observas?",
        steps:[
          "Interpreta o primeiro enunciado como avaliação da possibilidade de um acontecimento.",
          "Interpreta o segundo na situação de interação entre participantes.",
          "Relaciona possibilidade de verdade com modalidade epistémica.",
          "Relaciona autorização para agir com modalidade deôntica."
        ],
        modelAnswer:"Em «Pode chover amanhã», o locutor apresenta a ocorrência como possível, construindo valor epistémico. Em «Podes sair mais cedo», num contexto de autorização, o locutor permite uma ação, construindo valor deôntico. A forma verbal é semelhante, mas o valor depende da situação comunicativa.",
        note:"Modalidade não é sinónimo de modo verbal; diferentes recursos linguísticos podem construir o mesmo tipo de valor modal."
      },
      remember:"Pergunta que posição o locutor assume: grau de certeza, regulação da ação ou avaliação.",
      pitfalls:[
        "Associar cada verbo modal a um único valor independentemente do contexto.",
        "Confundir modalidade com modo indicativo, conjuntivo ou imperativo.",
        "Chamar apreciativo a qualquer frase com adjetivos, mesmo quando não exprimem avaliação do locutor."
      ]
    },
    {
      id:"pt10-gramatica-texto",
      kicker:"8 · ANÁFORA, REGISTO E ATOS DE FALA",
      title:"A gramática também explica como um texto progride e como se adapta à situação",
      paragraphs:[
        "Na coesão textual, anáfora é a relação pela qual uma expressão retoma um referente anteriormente introduzido. O termo anafórico pode ser nominal, pronominal, verbal ou adverbial, e a sua interpretação depende do antecedente. Esta anáfora coesiva não deve ser confundida com a figura estilística de repetição também chamada anáfora.",
        "O registo de língua depende da situação de comunicação, da relação entre interlocutores, do grau de formalidade e do modo de interação. Formal e informal não significam automaticamente correto e incorreto. Uma construção pode ser adequada numa conversa entre amigos e inadequada num requerimento formal sem que isso transforme toda a variedade oral em erro.",
        "Os atos de fala descrevem o que fazemos ao falar: afirmar ou informar, pedir ou ordenar, assumir um compromisso, exprimir uma reação ou realizar certos atos institucionais através das palavras. A forma gramatical e a intenção podem não coincidir diretamente; uma pergunta como «Podes fechar a janela?» pode funcionar pragmaticamente como pedido."
      ],
      signals:[
        "Na anáfora coesiva, identifica termo anafórico e antecedente e verifica a correferência.",
        "No registo, relaciona escolhas linguísticas com interlocutores, finalidade, formalidade e meio oral ou escrito.",
        "No ato de fala, distingue a forma da frase da ação comunicativa que ela realiza no contexto."
      ],
      example:{
        title:"Exemplo de resposta · forma interrogativa, função de pedido",
        prompt:"Alguém pergunta «Podes passar-me o sal?» à mesa. Como analisas o ato de fala?",
        steps:[
          "Reconhece a forma interrogativa e o conteúdo literal sobre capacidade.",
          "Observa a situação de interação e o objetivo plausível do locutor.",
          "Verifica que a resposta esperada é a ação de passar o sal, não uma descrição da capacidade física.",
          "Classifica a intenção como pedido e explica a diferença entre forma e função pragmática."
        ],
        modelAnswer:"Embora o enunciado tenha forma interrogativa, na situação apresentada funciona como pedido: o locutor pretende que o interlocutor passe o sal. O contexto permite interpretar a intenção comunicativa para além do conteúdo literal da pergunta.",
        note:"Este mesmo princípio ajuda a analisar ironia, cortesia e adequação de registo: a língua funciona em situações, não em frases isoladas."
      },
      remember:"Coesão liga partes do texto; registo adapta a língua à situação; atos de fala explicam a ação realizada pelo enunciado.",
      pitfalls:[
        "Confundir anáfora coesiva com a figura de estilo baseada em repetição.",
        "Tratar informalidade como sinónimo de incorreção.",
        "Classificar o ato de fala apenas pela forma interrogativa, declarativa ou imperativa da frase."
      ]
    }
  ]
};

export function portugueseGramatica10DeepReviewFor(unitId){
  return unitId===PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.id?PORTUGUESE_GRAMATICA_10_DEEP_REVIEW:null;
}
