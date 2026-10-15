export const PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW_VERSION="2026.10-wave1";

export const PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW={
  id:"pt10-trovadoresca",
  title:"Poesia trovadoresca",
  lead:"A poesia trovadoresca lê-se melhor quando começas pela situação de comunicação: quem fala, a quem se dirige, que relação existe entre as vozes e que efeito produzem repetição, refrão, paralelismo, ironia ou crítica. O objetivo não é decorar etiquetas, mas reconhecer marcas textuais e transformá-las numa interpretação fundamentada.",
  goals:[
    "Distinguir cantiga de amigo, cantiga de amor e cantiga de escárnio ou maldizer a partir de marcas do texto.",
    "Identificar voz poética, destinatário, situação comunicativa e relações entre intervenientes.",
    "Explicar o valor do paralelismo, refrão, repetição, natureza e outros recursos na construção de sentido.",
    "Distinguir crítica indireta e ambígua de ataque mais direto, justificando sempre com evidência textual.",
    "Construir respostas restritas que apresentem uma ideia, uma evidência e a explicação da ligação entre ambas."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 10.º ano · agosto de 2018 · referencial em vigor",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt10-trov-contexto",
      kicker:"1 · CONTEXTO E SITUAÇÃO COMUNICATIVA",
      title:"Antes do género, identifica quem fala e o que está a acontecer",
      paragraphs:[
        "A lírica galego-portuguesa nasce num contexto medieval de produção e circulação fortemente ligado à performance. Texto, música e situação social estavam relacionados, embora hoje o aluno trabalhe sobretudo o texto escrito. Para interpretar uma cantiga, o ponto de partida deve ser a voz construída no poema e não a biografia do autor.",
        "As três grandes modalidades trabalhadas no 10.º ano são cantigas de amigo, cantigas de amor e cantigas de escárnio e maldizer. O referencial em vigor prevê a leitura de quatro cantigas de amigo, duas de amor e uma de escárnio e maldizer, mas a prova pode apresentar outros textos do mesmo género; por isso, importa dominar características transferíveis.",
        "Uma boa leitura começa por responder a quatro perguntas: quem fala, a quem fala, sobre quem ou sobre o quê fala e em que circunstância. Só depois faz sentido classificar o género e analisar recursos formais. Esta ordem evita a classificação mecânica baseada numa única palavra ou num motivo isolado."
      ],
      signals:[
        "Distingue sempre autor histórico de voz poética construída no texto.",
        "Localiza destinatário, interlocutores e situação que desencadeia o discurso.",
        "Usa várias marcas convergentes antes de classificar a cantiga."
      ],
      example:{
        title:"Exemplo de resposta · começar pela situação comunicativa",
        prompt:"Num poema, uma voz feminina lamenta a ausência do amado perante a mãe. Que elementos deves mobilizar para interpretar a situação?",
        steps:[
          "Identifica a voz: é uma voz poética feminina, não necessariamente a voz do autor.",
          "Identifica o destinatário imediato: a mãe funciona como interlocutora ou confidente.",
          "Explica o núcleo da situação: a ausência do amado organiza a expressão de saudade ou inquietação.",
          "Só depois relaciona essas marcas com a tradição da cantiga de amigo."
        ],
        modelAnswer:"A situação aproxima-se da cantiga de amigo porque apresenta uma voz poética feminina que exprime a ausência do amado perante uma confidente, neste caso a mãe. A classificação resulta da combinação entre voz, relação amorosa e situação comunicativa, e não apenas da presença de uma personagem feminina.",
        note:"Num item de exame, adapta a resposta às palavras e aos elementos concretos do texto apresentado."
      },
      remember:"Classificar é o fim de uma pequena demonstração: primeiro recolhes marcas, depois explicas por que razão apontam para um género.",
      pitfalls:[
        "Dizer que o trovador é uma mulher só porque a voz poética é feminina.",
        "Classificar um texto por uma palavra isolada sem analisar a situação comunicativa.",
        "Transformar contexto histórico numa resposta genérica que não interpreta o texto apresentado."
      ]
    },
    {
      id:"pt10-trov-amigo",
      kicker:"2 · CANTIGAS DE AMIGO",
      title:"A voz feminina, a ausência e os interlocutores constroem a experiência amorosa",
      paragraphs:[
        "Na cantiga de amigo, a voz poética é tipicamente feminina e fala do amigo, isto é, do amado. A ausência, a espera, o encontro desejado, a demora ou o conflito amoroso podem organizar o poema. A emoção não deve ser resumida a uma etiqueta como «saudade»: é preciso perceber o que a situação concreta revela.",
        "A voz pode dirigir-se à mãe, às amigas, às irmãs, ao próprio amado ou a elementos da natureza. Esses interlocutores não são acessórios. Podem funcionar como confidentes, testemunhas, obstáculos, espelhos do estado emocional ou elementos que prolongam simbolicamente a experiência da voz poética.",
        "Paralelismo, refrão e repetição são frequentes e podem criar insistência, progressão, circularidade ou intensificação afetiva. A análise deve explicar o efeito no poema concreto: repetir não é apenas «dar musicalidade»; pode reforçar uma espera, uma pergunta, um desejo ou uma impossibilidade."
      ],
      signals:[
        "Voz poética feminina e referência ao amigo/amado.",
        "Interlocutores como mãe, amigas, irmãs ou natureza.",
        "Paralelismo e refrão usados para desenvolver ou intensificar a situação."
      ],
      example:{
        title:"Exemplo de resposta · explicar um refrão",
        prompt:"Como justificarias o valor de um refrão que repete a preocupação da voz feminina com a ausência do amigo?",
        steps:[
          "Não te limites a identificar o refrão; descreve a ideia que regressa.",
          "Relaciona a repetição com o estado emocional da voz poética.",
          "Explica o efeito estrutural: a recorrência faz a preocupação dominar o avanço do poema.",
          "Se o texto mostrar variações entre estrofes, articula o refrão fixo com essa progressão."
        ],
        modelAnswer:"O refrão reforça a inquietação provocada pela ausência do amigo, porque faz regressar a mesma preocupação no final das estrofes. A repetição transforma essa ideia num eixo do poema e intensifica a sensação de espera, mesmo quando os restantes versos introduzem pequenas variações.",
        note:"Evita a fórmula vazia «o refrão serve para dar musicalidade» quando o item pede construção de sentido."
      },
      remember:"Nas cantigas de amigo, pergunta sempre o que a voz feminina deseja ou teme e como os interlocutores e a repetição tornam esse estado visível.",
      pitfalls:[
        "Reduzir todas as cantigas de amigo à mesma emoção.",
        "Dizer apenas que a natureza «é importante» sem explicar a função que assume no texto.",
        "Identificar paralelismo ou refrão sem explicar o seu efeito de sentido."
      ]
    },
    {
      id:"pt10-trov-amor",
      kicker:"3 · CANTIGAS DE AMOR",
      title:"A relação amorosa organiza-se pela distância e pela submissão da voz masculina",
      paragraphs:[
        "Na cantiga de amor, a voz poética é tipicamente masculina e dirige-se ou refere-se a uma senhora colocada numa posição de superioridade. A relação é marcada por distância, idealização e dificuldade de concretização amorosa. A linguagem pode aproximar a relação amorosa de códigos de serviço e submissão.",
        "A coita de amor designa o sofrimento associado a essa relação impossível, não correspondida ou inacessível. Porém, numa resposta, não basta escrever «há coita de amor»: é necessário mostrar de que forma o discurso revela sofrimento, dependência, temor, desejo ou impossibilidade.",
        "O elogio da senhora pode privilegiar qualidades idealizadas e uma atitude de contenção ou reverência. A análise ganha qualidade quando relaciona posição da voz, imagem da senhora e consequências emocionais dessa desigualdade, em vez de listar características memorizadas."
      ],
      signals:[
        "Voz poética masculina perante uma senhora idealizada ou distante.",
        "Sofrimento amoroso associado a impossibilidade, distância ou falta de correspondência.",
        "Relação marcada por reverência, submissão ou serviço amoroso."
      ],
      example:{
        title:"Exemplo de resposta · justificar a coita de amor",
        prompt:"Um item pede para explicar como a relação entre a voz poética e a senhora produz sofrimento. Como estruturas a resposta?",
        steps:[
          "Formula a ideia central: existe uma relação desigual ou impossível.",
          "Seleciona uma marca do texto que revele distância, submissão, receio ou falta de correspondência.",
          "Explica como essa marca produz ou intensifica o sofrimento amoroso.",
          "Usa o conceito «coita de amor» como síntese da interpretação, não como substituto dela."
        ],
        modelAnswer:"O sofrimento resulta da distância entre a voz poética e a senhora, apresentada como superior e dificilmente acessível. A atitude de submissão e a impossibilidade de concretizar o desejo colocam o sujeito numa posição de dependência, configurando a coita de amor característica desta tradição.",
        note:"Se o excerto contrariar parcialmente uma característica habitual, segue o texto: o género não é uma lista rígida de frases obrigatórias."
      },
      remember:"A coita de amor é uma conclusão interpretativa: demonstra primeiro a relação de distância e as suas consequências para a voz poética.",
      pitfalls:[
        "Usar «coita de amor» como resposta completa sem explicar o texto.",
        "Confundir a voz masculina da cantiga de amor com o autor biográfico.",
        "Afirmar que a senhora é sempre descrita fisicamente; o essencial é a posição que ocupa na relação construída pelo poema."
      ]
    },
    {
      id:"pt10-trov-satira",
      kicker:"4 · ESCÁRNIO E MALDIZER",
      title:"A sátira exige perceber alvo, estratégia e grau de explicitação da crítica",
      paragraphs:[
        "As cantigas de escárnio e maldizer exploram a crítica e a sátira de comportamentos, figuras ou situações. O efeito pode resultar de ironia, duplo sentido, exagero, contraste, caricatura ou ataque verbal. O primeiro passo é perceber qual é o alvo e o que exatamente está a ser censurado ou ridicularizado.",
        "Tradicionalmente, o escárnio associa-se a uma crítica mais indireta ou ambígua, enquanto o maldizer tende para um ataque mais explícito. Esta distinção é útil, mas não deve ser aplicada de forma automática: a resposta deve apoiar-se na estratégia discursiva visível no texto apresentado.",
        "A comicidade não elimina a dimensão crítica. Uma formulação eficaz explica simultaneamente o mecanismo — por exemplo ironia ou contraste — e o efeito: expor uma contradição, desvalorizar o alvo, denunciar um comportamento ou provocar riso crítico no destinatário."
      ],
      signals:[
        "Identifica primeiro o alvo concreto e o comportamento criticado.",
        "Distingue linguagem indireta/ambígua de ataque mais explícito quando o texto o permite.",
        "Relaciona ironia, exagero ou contraste com o efeito produzido sobre o alvo."
      ],
      example:{
        title:"Exemplo de resposta · da ironia à crítica",
        prompt:"O poema elogia aparentemente uma personagem, mas os factos apresentados mostram o contrário. Como explicas o mecanismo?",
        steps:[
          "Identifica a discrepância entre o elogio literal e a imagem negativa construída pelos factos.",
          "Reconhece a ironia: o sentido pretendido não coincide com o elogio superficial.",
          "Explica o alvo da crítica e o comportamento desvalorizado.",
          "Relaciona a estratégia indireta com o efeito satírico."
        ],
        modelAnswer:"O elogio é irónico, porque entra em contradição com os comportamentos atribuídos à personagem. Essa discrepância leva o leitor a interpretar o discurso no sentido oposto ao literal e transforma o aparente louvor numa forma de ridicularizar o alvo e de censurar a sua conduta.",
        note:"Não basta escrever «há ironia»; identifica a contradição que permite reconhecê-la."
      },
      remember:"Numa sátira, responde a três perguntas: quem é o alvo, que comportamento é criticado e que mecanismo linguístico torna essa crítica eficaz.",
      pitfalls:[
        "Dizer que todo o texto cómico é automaticamente uma cantiga de escárnio.",
        "Definir escárnio e maldizer sem aplicar a distinção ao texto.",
        "Identificar ironia, exagero ou insulto sem explicar o efeito produzido."
      ]
    },
    {
      id:"pt10-trov-resposta",
      kicker:"5 · FORMA, COMPARAÇÃO E RESPOSTA DE EXAME",
      title:"Uma resposta forte liga interpretação, evidência e explicação",
      paragraphs:[
        "Os recursos formais da poesia trovadoresca só ganham valor quando ligados ao sentido. Paralelismo, refrão, repetição lexical ou sintática, apóstrofe, interrogação e contrastes podem organizar a progressão e a intensidade do discurso. Em vez de fazer um inventário, escolhe os recursos que ajudam a responder ao que foi perguntado.",
        "A comparação entre cantigas deve definir um critério claro — voz, situação amorosa, interlocutor, forma de representar a ausência, estratégia satírica — e mostrar uma semelhança ou diferença com evidência de ambos os textos. Comparar não é escrever dois pequenos resumos independentes.",
        "Nos itens de resposta restrita de Educação Literária, a qualidade depende sobretudo de responder diretamente, selecionar elementos pertinentes e explicar a sua função. Um modelo útil é ideia → evidência → explicação. A correção linguística também conta, mas uma resposta elegante sem conteúdo suficiente não substitui a interpretação pedida."
      ],
      signals:[
        "Começa pelo verbo do enunciado: explica, compara, justifica, caracteriza ou relaciona.",
        "Seleciona apenas evidência que sustente a ideia que estás a defender.",
        "Fecha a resposta explicando o efeito ou a relação; não termines numa citação ou numa enumeração."
      ],
      example:{
        title:"Exemplo de resposta · comparar cantiga de amigo e cantiga de amor",
        prompt:"Compara a posição da voz poética perante a experiência amorosa nos dois géneros.",
        steps:[
          "Define o critério comum: posição da voz perante o amado ou a senhora.",
          "Na cantiga de amigo, identifica a voz feminina e a situação concreta de espera, ausência ou encontro.",
          "Na cantiga de amor, identifica a voz masculina e a distância/submissão perante a senhora.",
          "Formula a diferença sem transformar a resposta em duas definições isoladas."
        ],
        modelAnswer:"Embora ambos os géneros representem uma experiência amorosa marcada por desejo e dificuldade, a posição da voz é diferente: na cantiga de amigo, a voz feminina tende a exprimir uma situação concreta de ausência ou espera do amado, frequentemente perante confidentes; na cantiga de amor, a voz masculina apresenta-se numa relação de maior distância e submissão perante uma senhora idealizada, o que acentua a coita amorosa.",
        note:"Uma boa comparação contém um critério comum e uma relação explícita entre os dois termos: «enquanto», «ao passo que», «em ambos», «diferentemente»."
      },
      remember:"Resposta completa = responde ao verbo do enunciado + apresenta evidência pertinente + explica por que essa evidência prova a tua ideia.",
      pitfalls:[
        "Começar por contar tudo o que sabes sobre poesia trovadoresca sem responder ao item.",
        "Usar uma citação ou referência textual sem explicar a sua função.",
        "Comparar dois textos em blocos separados sem estabelecer uma relação explícita.",
        "Decorar uma resposta-modelo e tentar encaixá-la num texto com marcas diferentes."
      ]
    }
  ]
};

export function portugueseTrovadoresca10DeepReviewFor(unitId){
  return unitId==="pt10-trovadoresca"?PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW:null;
}
