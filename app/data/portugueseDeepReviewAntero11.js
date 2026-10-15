export const PORTUGUESE_ANTERO_11_DEEP_REVIEW_VERSION="2026.10-wave13";

export const PORTUGUESE_ANTERO_11_DEEP_REVIEW={
  id:"pt11-antero",
  title:"Antero de Quental · Sonetos Completos",
  lead:"O currículo em vigor pede a leitura de dois sonetos de Antero de Quental. O objetivo não é decorar comentários de dois poemas específicos, mas aprender a reconhecer uma poesia em que pensamento, angústia, ideal, sonho, consciência e natureza se organizam dentro da forma rigorosa do soneto. A revisão prepara o aluno para interpretar poemas diferentes dos trabalhados em aula e justificar cada inferência com evidência textual.",
  goals:[
    "Proteger o corpus ativo: dois sonetos escolhidos de Sonetos Completos, sem transformar exemplos de aula num cânone obrigatório.",
    "Reconhecer a angústia existencial e a procura de sentido através da progressão do pensamento poético.",
    "Analisar a idealização do real, o sonho e a tensão entre aspiração e desilusão.",
    "Interpretar a relação entre sujeito poético e natureza quando o espaço exterior espelha, intensifica ou contrasta o estado interior.",
    "Relacionar forma do soneto, oposição, gradação, metáfora e outras escolhas expressivas com o desenvolvimento da ideia.",
    "Comparar sonetos por um critério comum, mostrando convergências e diferenças sem impor uma leitura única a toda a poesia anteriana.",
    "Responder a poemas novos por ideia → evidência → progressão → efeito → tema."
  ],
  sourceBasis:[
    "DGE · Currículo Nacional · Português · 11.º ano · referencial em vigor: Antero de Quental — Sonetos Completos, escolher dois poemas",
    "DGE · Estudo Autónomo · Poesia do século XIX · Antero de Quental · GTA 62–64 · leitura, comparação e interpretação de sonetos",
    "DGE/#EstudoEmCasa · O Palácio da Ventura, Sonho oriental e Oceano Nox · angústia existencial, idealização do real, natureza e estilo",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-antero-corpus",
      kicker:"1 · CORPUS E MÉTODO",
      title:"Dois sonetos obrigatórios, competências transferíveis para muitos outros",
      paragraphs:[
        "O referencial curricular determina a escolha de dois poemas de Sonetos Completos. Os poemas concretos podem variar entre escolas ou turmas. Por isso, exemplos como O Palácio da Ventura, Sonho oriental ou Oceano Nox são úteis para treino, mas não devem ser apresentados pela app como uma lista fixa e universalmente obrigatória.",
        "A melhor preparação consiste em dominar processos de leitura: localizar a situação inicial, acompanhar mudanças de estado, identificar oposições e perceber como o último terceto ou os versos finais podem confirmar, inverter ou aprofundar a reflexão anterior. O soneto é curto, mas a progressão interna pode ser muito intensa.",
        "Ao responder, começa pelo poema efetivamente apresentado. Conhecimento sobre Antero ajuda a formular hipóteses, mas cada ideia deve ser demonstrada por palavras, imagens, contrastes, tempos verbais, estrutura ou relações presentes naquele texto."
      ],
      signals:[
        "Corpus ativo: escolher dois poemas de Sonetos Completos.",
        "Exemplos oficiais são treino, não uma lista obrigatória comum a todas as turmas.",
        "Lê o poema como percurso: ponto de partida → transformação → conclusão."
      ],
      example:{
        title:"Exemplo de estratégia · poema desconhecido",
        prompt:"Recebes no teste um soneto de Antero que não trabalhaste em aula. Por onde começas?",
        steps:[
          "Identifica quem fala, sobre que situação ou problema e em que tom.",
          "Marca palavras ou imagens que criem oposição, mudança ou repetição.",
          "Observa a passagem das quadras para os tercetos e o efeito dos versos finais.",
          "Só depois relaciona a leitura com temas anterianos que o texto realmente sustenta."
        ],
        modelAnswer:"A leitura deve partir da progressão concreta do soneto. Primeiro identifico a situação e a voz, depois observo as oposições e mudanças que organizam o pensamento e, por fim, verifico como os tercetos reformulam a ideia inicial. Só então relaciono esse percurso com temas como angústia, ideal ou desilusão.",
        note:"Conhecer o autor não substitui ler o poema presente no enunciado."
      },
      remember:"Em Antero, o método mais seguro é seguir o pensamento verso a verso antes de nomear o tema.",
      pitfalls:[
        "Tratar O Palácio da Ventura como poema obrigatório em todas as turmas.",
        "Começar pela biografia do autor e esquecer o texto.",
        "Aplicar o mesmo tema a todos os sonetos sem evidência."
      ]
    },
    {
      id:"pt11-antero-angustia",
      kicker:"2 · ANGÚSTIA E PROCURA DE SENTIDO",
      title:"A inquietação existencial nasce do confronto entre desejo de sentido e limites da experiência",
      paragraphs:[
        "A angústia existencial é uma linha forte da poesia anteriana, mas deve ser demonstrada. Pode surgir por perguntas sem resposta, sensação de vazio, consciência da dor, confronto com a noite, solidão, morte ou impossibilidade de atingir uma certeza. O importante é identificar a forma concreta que a inquietação assume no poema.",
        "Muitos sonetos desenvolvem uma procura. O sujeito pode desejar verdade, repouso, felicidade, absoluto ou libertação e descobrir uma distância entre essa aspiração e a experiência real. A progressão poética transforma então o desejo inicial em dúvida, queda, desencanto ou nova consciência.",
        "A dimensão filosófica não significa escrever conceitos abstratos desligados dos versos. Se o poema interroga, personifica uma ideia ou constrói uma viagem simbólica, explica como esse procedimento torna visível o problema existencial e que conclusão — provisória ou definitiva — resulta dele."
      ],
      signals:[
        "Procura palavras de desejo, pergunta, negação, vazio, dor, noite ou limite.",
        "Distingue o que o sujeito procura daquilo que efetivamente encontra.",
        "Segue a passagem de expectativa para desilusão ou de dúvida para uma conclusão."
      ],
      example:{
        title:"Exemplo de resposta · angústia existencial",
        prompt:"Como justificas a presença de angústia sem escrever apenas que o sujeito poético está triste?",
        steps:[
          "Identifica o objeto da procura ou da inquietação.",
          "Seleciona uma imagem, pergunta ou oposição que mostre o conflito.",
          "Explica por que razão a experiência frustra ou problematiza a aspiração.",
          "Relaciona o percurso com a reflexão existencial do poema."
        ],
        modelAnswer:"A angústia não se reduz a tristeza, porque nasce da incapacidade de conciliar uma aspiração elevada com a experiência efetiva. A oposição entre o que o sujeito procura e aquilo que encontra transforma o sentimento numa reflexão sobre os limites da existência e da possibilidade de alcançar o ideal.",
        note:"Nomeia o problema existencial concreto; evita respostas genéricas sobre sofrimento."
      },
      remember:"Angústia anteriana = problema + procura + obstáculo + consciência desse limite.",
      pitfalls:[
        "Usar angústia como sinónimo de tristeza.",
        "Inventar uma conclusão filosófica que o poema não formula.",
        "Ignorar a evolução do estado do sujeito poético."
      ]
    },
    {
      id:"pt11-antero-ideal-sonho",
      kicker:"3 · IDEAL, SONHO E DESILUSÃO",
      title:"O ideal ilumina a poesia precisamente porque pode ser impossível de possuir",
      paragraphs:[
        "A idealização do real pode surgir quando o sujeito projeta uma realidade superior, harmoniosa ou absoluta sobre uma experiência limitada. Imagens de luz, palácio, beleza, amor, Oriente ou elevação podem construir esse espaço desejado, mas o seu significado depende da oposição que o poema estabelece com o presente.",
        "O sonho é frequentemente ambivalente: oferece fuga, beleza ou promessa, mas pode revelar-se frágil quando o sujeito desperta ou confronta a realidade. Essa passagem entre sonho e vigília é um mecanismo poderoso para representar a tensão entre ideal e real.",
        "Não assumes que todo o ideal é amoroso. O objeto desejado pode ser felicidade, verdade, plenitude, repouso ou transcendência. A análise deve nomear aquilo que o texto permite inferir e explicar como as imagens tornam esse desejo sensível."
      ],
      signals:[
        "Ideal: procura imagens de perfeição, elevação, luz ou plenitude.",
        "Sonho/vigília: observa mudanças bruscas de cenário, tom ou consciência.",
        "Desilusão: mostra como o final reinterpreta ou desfaz a expectativa inicial."
      ],
      example:{
        title:"Exemplo de resposta · sonho e realidade",
        prompt:"Um soneto constrói primeiro uma visão luminosa e termina num regresso doloroso ao presente. Como interpretas a mudança?",
        steps:[
          "Caracteriza o campo imagético da primeira parte.",
          "Identifica o marcador que provoca a viragem.",
          "Contrasta o estado anterior com o estado final.",
          "Explica como a estrutura representa a distância entre ideal e realidade."
        ],
        modelAnswer:"A primeira parte constrói uma realidade idealizada por imagens de plenitude e luz, mas a viragem final interrompe essa experiência e devolve o sujeito a um presente doloroso. A estrutura do soneto transforma, assim, a passagem do sonho à vigília numa representação da distância entre aspiração e realidade.",
        note:"A oposição deve ser demonstrada com campos lexicais ou imagens do poema."
      },
      remember:"O ideal não se identifica pela beleza das imagens; identifica-se pela relação entre o que é desejado e o que a realidade permite.",
      pitfalls:[
        "Tratar toda imagem luminosa como felicidade definitiva.",
        "Reduzir idealização a amor romântico.",
        "Ignorar a viragem estrutural do soneto."
      ]
    },
    {
      id:"pt11-antero-natureza",
      kicker:"4 · NATUREZA E ESTADO INTERIOR",
      title:"A paisagem pode espelhar a consciência, ampliá-la ou responder-lhe com silêncio",
      paragraphs:[
        "Na poesia de Antero, a natureza pode relacionar-se intensamente com a vida interior. Noite, mar, vento, céu ou silêncio podem exteriorizar angústia, criar uma atmosfera de interrogação ou funcionar como interlocutores simbólicos. Não basta identificar o cenário; é preciso explicar a relação entre exterior e interior.",
        "Em poemas como Oceano Nox, o espaço natural pode adquirir dimensão cósmica e aprofundar perguntas sobre existência, destino ou resposta do universo. O silêncio da natureza pode ser tão significativo como uma imagem de movimento: pode intensificar a solidão ou a falta de resposta sentida pelo sujeito.",
        "A personificação, a apóstrofe e a interrogação podem transformar elementos naturais em interlocutores. Quando isso acontece, analisa que pergunta lhes é dirigida e se o poema oferece ou recusa uma resposta. A função expressiva nasce dessa relação."
      ],
      signals:[
        "Natureza: identifica o elemento e o estado interior a que se liga.",
        "Interlocução: procura apóstrofe, personificação ou pergunta dirigida ao mundo exterior.",
        "Silêncio ou ausência de resposta podem ser semanticamente decisivos."
      ],
      example:{
        title:"Exemplo de resposta · natureza como interlocutora",
        prompt:"O sujeito interroga o mar, mas não obtém resposta. Que efeito pode resultar?",
        steps:[
          "Identifica a pergunta e o elemento natural interpelado.",
          "Explica o que o sujeito procura saber ou confirmar.",
          "Observa a ausência de resposta ou o silêncio.",
          "Relaciona-o com solidão, angústia ou impossibilidade de encontrar sentido."
        ],
        modelAnswer:"Ao interrogar o mar, o sujeito transforma a natureza num possível interlocutor para a sua inquietação. A ausência de resposta amplia a sensação de isolamento e converte o espaço exterior numa imagem da própria dificuldade de encontrar um sentido ou uma certeza para a existência.",
        note:"Evita afirmar que a natureza «reflete sentimentos» sem dizer qual sentimento e por que mecanismo."
      },
      remember:"Natureza em Antero: elemento exterior → interlocução ou atmosfera → efeito interior → reflexão.",
      pitfalls:[
        "Tratar a paisagem como decoração.",
        "Afirmar correspondência emocional sem evidência.",
        "Esquecer a função do silêncio e da ausência de resposta."
      ]
    },
    {
      id:"pt11-antero-forma-progressao",
      kicker:"5 · SONETO, FORMA E PROGRESSÃO DO PENSAMENTO",
      title:"A forma fixa organiza uma ideia em movimento — não é apenas métrica para inventariar",
      paragraphs:[
        "O soneto possui catorze versos organizados em duas quadras e dois tercetos, mas a análise formal só ganha valor quando mostra como essa arquitetura serve o pensamento. As quadras podem apresentar situação, imagem ou problema; os tercetos podem desenvolver, contrariar ou concluir essa linha.",
        "Oposições, gradações, paralelismos, metáforas e personificações ajudam a estruturar o raciocínio poético. Em vez de identificar cinco recursos, escolhe os que realmente organizam o sentido e explica a relação entre mecanismo e efeito.",
        "A volta ou viragem pode coincidir com a passagem para os tercetos, mas não é obrigatório tratá-la como regra mecânica. Procura a verdadeira mudança de direção semântica no poema: uma conjunção adversativa, mudança temporal, despertar, resposta inesperada ou alteração de tom pode ser mais importante do que a fronteira estrófica isolada."
      ],
      signals:[
        "Duas quadras + dois tercetos: observa a função de cada bloco no desenvolvimento da ideia.",
        "Recurso expressivo: nome → mecanismo → efeito → tema.",
        "Viragem: localiza a mudança real de pensamento, não apenas a mudança de estrofe."
      ],
      example:{
        title:"Exemplo de resposta · forma e sentido",
        prompt:"Como explicas a importância de uma conjunção adversativa no início de um terceto?",
        steps:[
          "Resume a linha de pensamento construída nas quadras.",
          "Identifica a oposição introduzida pela conjunção.",
          "Explica a nova direção assumida nos tercetos.",
          "Relaciona a viragem com a conclusão temática do soneto."
        ],
        modelAnswer:"A conjunção adversativa marca uma alteração no percurso do pensamento: depois de as quadras construírem uma expectativa, o terceto introduz um dado que a contraria. A mudança formal coincide, assim, com uma viragem semântica que conduz à desilusão ou à nova consciência expressa no final.",
        note:"A forma só vale como argumento quando explicas a progressão que organiza."
      },
      remember:"Soneto = forma fixa; pensamento = movimento. A análise liga os dois.",
      pitfalls:[
        "Fazer escansão sem relação com o sentido quando o item não a pede.",
        "Listar recursos expressivos sem efeito.",
        "Assumir que a viragem ocorre sempre exatamente no primeiro terceto."
      ]
    },
    {
      id:"pt11-antero-comparacao-resposta",
      kicker:"6 · COMPARAÇÃO E RESPOSTA DE EXAME",
      title:"Compara percursos de pensamento, não apenas temas iguais",
      paragraphs:[
        "Dois sonetos podem partilhar angústia, sonho, natureza ou idealização e ainda assim organizar esses temas de formas muito diferentes. Uma comparação forte define um critério comum e observa como cada poema parte de uma situação, desenvolve uma tensão e chega a uma conclusão.",
        "A estrutura de resposta mais segura é ideia → evidência → progressão → efeito → tema. Em poesia, a evidência pode ser uma imagem, oposição, campo lexical, mudança de tempo verbal, apóstrofe ou organização estrófica. A progressão explica como essa marca participa no percurso global.",
        "Evita depender de citações longas decoradas. Num poema novo, seleciona palavras ou expressões curtas e explica-as com precisão. O objetivo é demonstrar leitura autónoma, não provar que memorizaste um comentário sobre um soneto específico."
      ],
      signals:[
        "Comparação: critério comum + percurso de cada poema + relação explícita.",
        "Resposta: ideia → evidência → progressão → efeito → tema.",
        "Poema novo: inferência fundamentada vale mais do que comentário decorado."
      ],
      example:{
        title:"Exemplo de comparação · ideal e desilusão",
        prompt:"Dois sonetos partem de uma aspiração ideal, mas terminam de forma diferente. Como organizas a comparação?",
        steps:[
          "Define o critério comum: relação entre ideal e realidade.",
          "Mostra a imagem ou desejo inicial em cada poema.",
          "Explica a viragem e a conclusão de cada percurso.",
          "Formula claramente a semelhança inicial e a diferença no desfecho."
        ],
        modelAnswer:"Os dois sonetos aproximam-se porque constroem uma aspiração que ultrapassa a experiência imediata. Contudo, a progressão diverge: num, o ideal pode manter-se como horizonte de procura; no outro, a viragem final desfaz a esperança e devolve o sujeito à desilusão. A comparação deve, por isso, considerar não só o tema comum, mas o destino que cada poema dá a esse tema.",
        note:"Dois poemas com a mesma palavra-chave não têm necessariamente a mesma visão."
      },
      remember:"Compara o caminho que a ideia percorre, não apenas o nome do tema.",
      pitfalls:[
        "Escrever dois mini-resumos independentes.",
        "Dizer que os poemas são iguais porque ambos falam de angústia.",
        "Usar recursos formais sem os integrar na interpretação."
      ]
    }
  ]
};

export function portugueseAntero11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ANTERO_11_DEEP_REVIEW.id?PORTUGUESE_ANTERO_11_DEEP_REVIEW:null;
}
