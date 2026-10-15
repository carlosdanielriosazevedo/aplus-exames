export const PORTUGUESE_GRAMATICA_11_DEEP_REVIEW_VERSION="2026.10-wave17";

export const PORTUGUESE_GRAMATICA_11_DEEP_REVIEW={
  id:"pt11-gramatica",
  title:"Gramática · frase, texto, discurso e referência",
  lead:"No 11.º ano, a gramática deixa de ser uma lista de etiquetas e passa a exigir relações: como se organizam os constituintes, que função desempenham, como as frases se articulam, como o texto mantém e faz progredir referentes e como a situação de enunciação altera a interpretação de formas linguísticas. Para o exame, o método mais seguro é observar primeiro a construção concreta e só depois nomear a categoria.",
  goals:[
    "Sistematizar grupos sintáticos e funções internas à frase, distinguindo forma, posição e função.",
    "Explicar a articulação entre constituintes e entre frases em construções simples e complexas.",
    "Reconhecer valores semânticos de palavras considerando o respetivo étimo sem confundir origem com significado atual.",
    "Analisar anáfora, coesão lexical e gramatical e progressão temática em contexto.",
    "Distinguir modalidades de reprodução do discurso, incluindo o discurso indireto livre.",
    "Identificar referência deítica e resolver os referentes a partir da situação de enunciação.",
    "Responder a itens gramaticais por evidência estrutural e textual, evitando regras mecânicas baseadas numa única palavra."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 11.º ano · agosto de 2018 · referencial homologado atualmente em vigor · Gramática",
    "DGE · Gramática · constituintes e funções, valores semânticos/étimo, coesão e progressão, reprodução do discurso e referência deítica",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-gram-constituintes",
      kicker:"1 · CONSTITUINTES E FUNÇÕES",
      title:"Grupo sintático não é função sintática: identifica primeiro a unidade, depois o papel",
      paragraphs:[
        "Uma frase organiza-se em constituintes. Entre os grupos mais relevantes estão o grupo nominal, verbal, adjetival, preposicional e adverbial. O grupo descreve a estrutura interna do constituinte; a função sintática descreve o papel que esse constituinte desempenha na frase. Um grupo preposicional, por exemplo, pode realizar funções diferentes consoante a construção.",
        "A identificação deve apoiar-se na frase completa. Mobilidade, substituição, interrogativas de diagnóstico, concordância e seleção pelo verbo podem ajudar, mas nenhum teste deve ser aplicado como receita isolada. O mesmo segmento superficial pode comportar-se de modo diferente em contextos diferentes.",
        "Em construções mais densas, começa por localizar o predicado e o núcleo verbal, identifica os argumentos exigidos e só depois os modificadores. Esta ordem reduz confusões entre complemento e modificador e impede que uma preposição específica seja tratada como prova automática de uma função."
      ],
      signals:["Grupo = constituição interna; função = papel na frase.","Usa a frase completa e vários indícios, não uma palavra isolada.","Parte do verbo e da seleção argumental antes de classificar complementos e modificadores."],
      example:{
        title:"Exemplo · o mesmo tipo de grupo, funções diferentes",
        prompt:"Dois segmentos começam pela mesma preposição. Podes atribuir-lhes automaticamente a mesma função?",
        steps:["Identifica a construção verbal de cada frase.","Verifica se o segmento é selecionado pelo verbo ou apenas acrescenta circunstância.","Testa a relação com o núcleo e a possibilidade de omissão/mobilidade sem usar um único teste como regra absoluta.","Só depois atribui a função sintática."],
        modelAnswer:"Não. A forma preposicional não determina por si só a função. É necessário observar a relação do constituinte com o verbo e com a estrutura da frase: um segmento pode ser complemento numa construção e modificador noutra, apesar de apresentar a mesma preposição.",
        note:"Preposição igual não significa função igual."
      },
      remember:"Classifica em duas perguntas: que grupo é? que função desempenha aqui?",
      pitfalls:["Confundir grupo preposicional com complemento oblíquo.","Classificar pela preposição sem analisar o verbo.","Aplicar um único teste sintático como regra infalível."]
    },
    {
      id:"pt11-gram-articulacao",
      kicker:"2 · ARTICULAÇÃO ENTRE CONSTITUINTES E FRASES",
      title:"A frase complexa vale pelas relações que constrói, não pela contagem de orações",
      paragraphs:[
        "Na frase complexa, interessa reconhecer como as orações se ligam e que relação sintática e semântica estabelecem. Coordenação e subordinação não se distinguem apenas pela presença de uma conjunção: é necessário observar dependência estrutural e valor construído no enunciado.",
        "Uma oração subordinada pode desempenhar uma função dentro de outra estrutura, enquanto uma oração coordenada se articula com uma unidade de estatuto equivalente. Dentro das subordinadas, a classificação deve resultar da função e da relação efetivamente observadas, e não de uma lista decorada de conectores.",
        "A pontuação também participa na organização. Vírgulas, dois-pontos, travessões ou ponto e vírgula podem tornar relações mais legíveis, mas a pontuação não cria sozinha a relação sintática. Primeiro determina a estrutura; depois interpreta o efeito da pontuação nessa estrutura."
      ],
      signals:["Procura dependência estrutural antes de olhar para o conector.","Relaciona classificação da oração com a função que desempenha.","Pontuação sinaliza organização; não substitui a análise sintática."],
      example:{
        title:"Exemplo · conector ambíguo ou insuficiente",
        prompt:"Uma palavra pode introduzir construções diferentes. Como evitas classificar mecanicamente?",
        steps:["Lê a frase inteira e identifica as unidades articuladas.","Verifica a dependência ou autonomia relativa de cada oração.","Determina a função da oração quando ela integra a estrutura de outra.","Confirma se o valor semântico obtido é compatível com o contexto."],
        modelAnswer:"A classificação deve resultar da relação entre as orações. O conector é um indício, mas só a estrutura mostra se a oração depende de outra, que função desempenha e que valor constrói no enunciado.",
        note:"Evita regras do tipo «se aparece X, então é sempre Y»."
      },
      remember:"Conector ajuda; estrutura decide.",
      pitfalls:["Classificar apenas pela conjunção.","Confundir relação semântica com função sintática.","Usar a vírgula como prova de coordenação ou subordinação."]
    },
    {
      id:"pt11-gram-etimo",
      kicker:"3 · ÉTIMO E VALOR SEMÂNTICO",
      title:"A origem de uma palavra ajuda a explicar sentidos, mas não congela o significado atual",
      paragraphs:[
        "O étimo permite compreender a história formal e semântica de uma palavra. Ao comparar origem e usos atuais, podes reconhecer permanências, especializações, ampliações ou deslocações de sentido. O objetivo não é decorar listas de palavras latinas ou gregas, mas perceber relações de significado ao longo do tempo.",
        "O significado atual depende do contexto e da evolução histórica. Uma palavra pode afastar-se parcialmente do valor do étimo, adquirir usos figurados ou especializar-se numa área. Por isso, a etimologia é uma pista explicativa, não uma definição automática.",
        "Em itens de exame, lê o segmento em que a palavra ocorre, identifica o valor contextual e só depois mobiliza o étimo. A resposta forte explica a relação entre os dois valores — continuidade, aproximação ou mudança — em vez de limitar-se a indicar a origem."
      ],
      signals:["Contexto atual primeiro; étimo depois.","Procura continuidade, especialização, ampliação ou deslocação de sentido.","Origem histórica não equivale automaticamente à definição contemporânea."],
      example:{
        title:"Exemplo · do étimo ao sentido contextual",
        prompt:"O item fornece a origem de uma palavra e pede o seu valor no texto. O que fazes?",
        steps:["Determina o sentido exigido pelo contexto atual.","Observa que traço do étimo permanece ou se transformou.","Formula a relação entre origem e uso atual.","Evita apresentar o étimo como se fosse a única definição possível."],
        modelAnswer:"O étimo ajuda a reconhecer a base histórica do significado, mas o valor no texto resulta do uso atual. A resposta deve mostrar que traço semântico se mantém ou se alterou e explicar essa relação no contexto apresentado.",
        note:"Etimologia é história do significado, não um dicionário automático."
      },
      remember:"Étimo explica percurso; contexto determina o valor usado no enunciado.",
      pitfalls:["Dar apenas a origem da palavra.","Assumir que o sentido atual é idêntico ao antigo.","Ignorar o contexto em que a palavra ocorre."]
    },
    {
      id:"pt11-gram-coesao",
      kicker:"4 · COESÃO E PROGRESSÃO TEXTUAL",
      title:"Um texto progride quando mantém referentes reconhecíveis e acrescenta informação nova",
      paragraphs:[
        "A coesão gramatical liga partes do texto através de mecanismos como pronomes, determinantes, elipse e conectores. A coesão lexical mantém redes de sentido por repetição controlada, substituição, relações semânticas e vocabulário tematicamente relacionado. O objetivo é permitir continuidade sem tornar o texto redundante.",
        "A anáfora ocorre quando uma expressão retoma um referente ou conteúdo recuperável anteriormente. Para a analisar, identifica a expressão anafórica, localiza o antecedente e verifica que informação permite estabelecer a ligação. Se houver mais do que um candidato plausível, pode surgir ambiguidade referencial.",
        "Coesão e progressão não são sinónimos. Um texto pode estar cheio de pronomes e conectores e ainda assim não avançar. A progressão temática exige que informação conhecida sirva de base a informação nova, mantendo um fio reconhecível entre frases e parágrafos."
      ],
      signals:["Anáfora: expressão de retoma → antecedente → relação interpretativa.","Coesão lexical e gramatical devem servir continuidade e clareza.","Progressão = retomar o necessário + acrescentar informação nova."],
      example:{
        title:"Exemplo · pronome com referente ambíguo",
        prompt:"Uma frase contém «ele», mas dois nomes masculinos podem funcionar como antecedente. Como analisas?",
        steps:["Identifica todos os candidatos gramaticalmente possíveis.","Usa informação semântica e contexto discursivo para avaliar cada candidato.","Verifica se o texto fornece um antecedente inequívoco.","Se não fornecer, reconhece a ambiguidade e explica-a."],
        modelAnswer:"A interpretação do pronome depende do antecedente recuperável no contexto. Se dois referentes forem compatíveis e o texto não fornecer marcas suficientes para escolher um deles, existe ambiguidade referencial; a análise deve explicitá-la, não inventar certeza.",
        note:"Encontrar o nome mais próximo nem sempre resolve a anáfora."
      },
      remember:"Coesão liga; progressão faz avançar.",
      pitfalls:["Escolher automaticamente o antecedente mais próximo.","Confundir repetição lexical com ausência de coesão.","Contar conectores como medida de qualidade textual."]
    },
    {
      id:"pt11-gram-discurso",
      kicker:"5 · REPRODUÇÃO DO DISCURSO",
      title:"Direto, indireto e indireto livre constroem graus diferentes de mediação da voz",
      paragraphs:[
        "No discurso direto, a fala ou pensamento surge apresentado como intervenção autónoma, normalmente com marcas gráficas ou verbos introdutores. No discurso indireto, essa fala é integrada sintaticamente no discurso do narrador ou enunciador, o que pode implicar alterações de pessoa, tempo verbal e referência deítica.",
        "O discurso indireto livre combina traços da voz da personagem com a continuidade formal do discurso narrativo: pode dispensar verbo introdutor e marcas gráficas do direto, mas conservar vocabulário avaliativo, interrogações, exclamações ou perspetiva associada à personagem. Não é simplesmente «discurso indireto sem que».",
        "Ao transformar uma modalidade noutra, preserva o conteúdo e ajusta as coordenadas de enunciação. Pessoas, tempos, demonstrativos e advérbios como aqui, agora, hoje ou amanhã podem ter de mudar porque muda o centro de referência."
      ],
      signals:["Direto: voz autonomizada; indireto: integração sintática e reajuste de referência.","Indireto livre: continuidade narrativa + marcas de perspetiva/voz da personagem.","Transformação de discurso exige ajustar pessoa, tempo e dêixis quando o centro enunciativo muda."],
      example:{
        title:"Exemplo · reconhecer indireto livre",
        prompt:"O narrador continua na terceira pessoa, mas surge uma pergunta carregada da perspetiva da personagem, sem verbo introdutor. Que hipótese testas?",
        steps:["Verifica se a narração mantém a terceira pessoa e a continuidade sintática.","Procura marcas avaliativas, interrogações ou léxico associado à personagem.","Confirma a ausência das marcas formais típicas do discurso direto.","Justifica a presença simultânea da voz narrativa e da perspetiva da personagem."],
        modelAnswer:"A construção pode corresponder a discurso indireto livre porque mantém a continuidade do narrador, mas incorpora marcas expressivas e avaliativas associadas à personagem sem introdução explícita de fala. A classificação deve ser demonstrada por essa combinação de sinais.",
        note:"Não classifiques discurso indireto livre apenas porque falta «que»."
      },
      remember:"Pergunta sempre: quem enuncia, através de que mediação e a partir de que centro de referência?",
      pitfalls:["Reduzir indireto livre a indireto sem conjunção.","Transformar discurso sem ajustar dêiticos e tempos.","Confundir voz da personagem com mudança automática de narrador."]
    },
    {
      id:"pt11-gram-deixis",
      kicker:"6 · REFERÊNCIA DEÍTICA",
      title:"Eu, aqui e agora só se interpretam quando conheces a situação de enunciação",
      paragraphs:[
        "A dêixis aponta para elementos da situação comunicativa. Formas pessoais remetem para participantes; expressões espaciais localizam relativamente ao centro de enunciação; expressões temporais situam acontecimentos em relação ao momento em que se fala ou escreve. O referente depende, por isso, do contexto enunciativo.",
        "Dêixis e anáfora não são a mesma relação. Uma expressão deítica pode depender da situação exterior ao texto, enquanto uma expressão anafórica retoma informação linguística anterior. Em alguns contextos, uma mesma forma pode participar em mecanismos distintos, pelo que é necessário explicar de onde vem a referência.",
        "Quando o centro de enunciação muda — por exemplo, na passagem de discurso direto para indireto — também podem mudar os referentes de eu/tu, aqui/ali e hoje/naquele dia. A análise deve acompanhar essa deslocação e não apenas substituir palavras de forma mecânica."
      ],
      signals:["Dêixis pessoal → participantes; espacial → lugar; temporal → momento.","Pergunta se o referente vem da situação de enunciação ou de uma expressão anterior no texto.","Mudança de centro enunciativo pode obrigar a reajustar pessoa, espaço e tempo."],
      example:{
        title:"Exemplo · «amanhã» depende de quando se fala",
        prompt:"Porque é que «amanhã» não identifica a mesma data em qualquer contexto?",
        steps:["Localiza o momento da enunciação.","Interpreta «amanhã» relativamente a esse momento.","Se a fala for relatada noutro momento, verifica se a expressão precisa de ser reajustada.","Explica que o referente é calculado a partir do centro temporal do enunciador."],
        modelAnswer:"«Amanhã» é uma expressão deítica temporal: a data a que se refere depende do momento em que o enunciado é produzido. Se o centro temporal mudar, a interpretação também muda e, numa reprodução indireta, pode ser necessário usar uma expressão como «no dia seguinte».",
        note:"O significado lexical é estável; o referente concreto varia com a situação."
      },
      remember:"Dêitico = forma linguística cujo referente se calcula a partir de quem fala, onde e quando.",
      pitfalls:["Confundir dêixis com anáfora em todos os casos.","Atribuir um referente sem reconstruir a situação de enunciação.","Manter automaticamente «aqui/agora/amanhã» numa mudança de discurso."]
    },
    {
      id:"pt11-gram-exame",
      kicker:"7 · ESTRATÉGIA DE EXAME",
      title:"Em gramática, a resposta segura nasce do contexto e termina na classificação",
      paragraphs:[
        "Num item de gramática, começa por identificar exatamente o segmento relevante e a relação que está a ser testada. Lê a frase anterior e seguinte quando existirem: coesão, dêixis, discurso reproduzido e valores semânticos raramente podem ser decididos por uma palavra isolada.",
        "Se houver opções muito próximas, testa cada uma contra a estrutura. Para sintaxe, pergunta que função o constituinte desempenha; para coesão, qual é o referente; para discurso, quem fala e como a voz é mediada; para étimo, qual é o sentido contextual antes de olhar para a origem.",
        "Evita reconhecer apenas termos familiares. A prova pode apresentar exemplos novos e pedir aplicação. O objetivo é conseguir justificar mentalmente a escolha por uma relação observável, mesmo quando a resposta final é de seleção."
      ],
      signals:["Segmento → contexto → relação → classificação.","Elimina opções por incompatibilidade estrutural ou textual, não por impressão.","Em referência e discurso, reconstrói sempre o centro enunciativo."],
      example:{
        title:"Exemplo · duas opções parecem plausíveis",
        prompt:"Num item de escolha múltipla, duas classificações parecem possíveis. Como desempatas?",
        steps:["Define a propriedade que distingue as duas opções.","Procura no enunciado uma marca estrutural ou textual que teste essa propriedade.","Aplica o critério às duas hipóteses.","Seleciona apenas a que explica todos os dados relevantes."],
        modelAnswer:"A decisão não deve depender de a etiqueta parecer familiar. É necessário identificar a diferença entre as duas hipóteses e confrontá-la com a estrutura concreta do enunciado. A opção correta é a que explica a relação sintática, referencial ou discursiva sem deixar dados relevantes por justificar.",
        note:"Em gramática, uma boa regra é uma regra que sobrevive ao contexto."
      },
      remember:"Contexto primeiro, relação depois, nome no fim.",
      pitfalls:["Responder por reconhecimento de palavra-chave.","Ignorar o contexto textual em itens de coesão ou dêixis.","Aplicar transformações sem verificar se preservam o sentido e a referência."]
    }
  ]
};

export function portugueseGramatica11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_GRAMATICA_11_DEEP_REVIEW.id?PORTUGUESE_GRAMATICA_11_DEEP_REVIEW:null;
}
