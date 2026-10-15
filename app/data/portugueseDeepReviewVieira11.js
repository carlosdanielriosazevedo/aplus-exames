export const PORTUGUESE_VIEIRA_11_DEEP_REVIEW_VERSION="2026.10-wave6";

export const PORTUGUESE_VIEIRA_11_DEEP_REVIEW={
  id:"pt11-vieira",
  title:"Padre António Vieira · Sermão de Santo António aos Peixes",
  lead:"O Sermão de Santo António aos Peixes é uma peça de oratória argumentativa: Vieira prega simbolicamente aos peixes para falar dos homens, organiza louvores e repreensões e usa a alegoria para tornar a crítica mais eficaz. O currículo ativo prevê leitura integral dos capítulos I e V e excertos dos restantes, por isso esta revisão ensina a estrutura global e aprofunda especialmente os dois capítulos integrais.",
  goals:[
    "Compreender a estrutura argumentativa do sermão e a função do exórdio, exposição/confirmação e peroração.",
    "Explicar a alegoria peixes ↔ homens e distinguir plano literal de sentido moral e social.",
    "Analisar o capítulo I integralmente, identificando conceito predicável, tese, destinatário e estratégia de captação do auditório.",
    "Reconhecer a organização dos louvores e repreensões gerais e particulares nos capítulos intermédios.",
    "Analisar o capítulo V integralmente através dos peixes repreendidos e dos comportamentos humanos que representam.",
    "Explicar como recursos de retórica e argumentação — exemplos, analogias, perguntas, apóstrofes, antíteses, gradações e enumerações — servem a persuasão.",
    "Construir respostas restritas por tese → evidência → função argumentativa → efeito persuasivo."
  ],
  sourceBasis:[
    "DGE · Currículo Nacional · Português · 11.º ano · Sermão de Santo António pregado em São Luís do Maranhão em 1654 · capítulos I e V integrais e excertos dos restantes",
    "DGE · Estudo Autónomo · recursos atuais sobre exórdio, louvores, repreensões e peroração do Sermão de Santo António aos Peixes",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-vieira-estrutura",
      kicker:"1 · ESTRUTURA E SITUAÇÃO DE COMUNICAÇÃO",
      title:"Antes de decorar peixes, percebe quem fala, a quem fala e o que pretende conseguir",
      paragraphs:[
        "Um sermão é um discurso construído para ensinar, persuadir e mover o auditório. Em Vieira, a eficácia nasce da combinação entre organização argumentativa, conhecimento do público, referências religiosas e uma linguagem capaz de tornar ideias abstratas concretas e memoráveis.",
        "No Sermão de Santo António aos Peixes, o pregador dirige formalmente o discurso aos peixes, mas o verdadeiro alvo é humano. Esta deslocação cria distância crítica: comportamentos dos homens podem ser elogiados ou censurados através de figuras animais, permitindo que a alegoria funcione como instrumento de persuasão e de denúncia.",
        "A estrutura global acompanha o movimento do discurso: o exórdio apresenta a matéria e procura predispor o auditório; os capítulos centrais desenvolvem louvores e repreensões em geral e em particular; a peroração fecha o sermão, retoma a relação entre pregador, peixes e homens e dá sentido final à argumentação."
      ],
      signals:[
        "Distingue destinatário aparente — os peixes — de destinatário humano implícito.",
        "Localiza a função de cada parte antes de analisar recursos isolados.",
        "Pergunta sempre que comportamento humano está a ser projetado na imagem dos peixes."
      ],
      example:{
        title:"Exemplo de resposta · explicar a alegoria",
        prompt:"Um excerto elogia uma qualidade de um peixe e transforma-a numa lição dirigida aos homens. Como estruturas a interpretação?",
        steps:[
          "Identifica a qualidade apresentada no plano literal do peixe.",
          "Explica o valor moral ou comportamento humano associado a essa qualidade.",
          "Mostra a relação analógica entre os dois planos.",
          "Conclui explicando a função persuasiva ou crítica da alegoria."
        ],
        modelAnswer:"A característica atribuída ao peixe funciona num plano literal, mas Vieira converte-a numa imagem de um comportamento humano. A analogia permite apresentar a lição de forma concreta e indireta, tornando a crítica ou o elogio mais expressivos e persuasivos para o verdadeiro auditório do sermão.",
        note:"Não escrevas apenas «os peixes representam os homens». Diz que qualidade ou vício está em causa e como a relação é construída."
      },
      remember:"A alegoria só fica explicada quando ligas três elementos: peixe, comportamento humano e finalidade argumentativa.",
      pitfalls:[
        "Confundir destinatário fictício com público real do sermão.",
        "Enumerar partes do sermão sem explicar a função de cada uma.",
        "Chamar alegoria a qualquer referência a um peixe sem estabelecer a correspondência humana."
      ]
    },
    {
      id:"pt11-vieira-cap1",
      kicker:"2 · CAPÍTULO I · EXÓRDIO",
      title:"O conceito predicável organiza a tese e transforma a dificuldade de pregar numa estratégia",
      paragraphs:[
        "O capítulo I, de leitura integral no currículo ativo, abre com o conceito predicável «Vós sois o sal da terra». A imagem do sal permite pensar a função do pregador: tal como o sal deve preservar, a pregação deve impedir a corrupção moral. A partir daí, Vieira formula um problema argumentativo: se a terra continua corrompida, onde está a falha?",
        "O raciocínio distribui hipóteses entre pregadores e ouvintes. O pregador pode não ensinar corretamente; os ouvintes podem recusar a doutrina. Esta construção permite apresentar a decisão de Santo António de pregar aos peixes como exemplo e modelo para o próprio sermão.",
        "O episódio de Santo António não é um ornamento narrativo. Funciona como argumento e justificação da situação comunicativa que se segue: se os homens não escutam, o pregador desloca simbolicamente o auditório para os peixes, sem abandonar a intenção de corrigir os homens."
      ],
      signals:[
        "Explica o valor do sal antes de nomear o conceito predicável.",
        "Segue o raciocínio por hipóteses: corrupção da terra → possível falha do pregador ou dos ouvintes.",
        "Relaciona Santo António com a decisão retórica de falar aos peixes."
      ],
      example:{
        title:"Exemplo de resposta · conceito predicável e tese",
        prompt:"Como explicarias a função da imagem do sal no início do sermão?",
        steps:[
          "Identifica a propriedade simbólica do sal: conservar e impedir corrupção.",
          "Relaciona-a com a missão do pregador perante os homens.",
          "Mostra que a persistência da corrupção cria o problema central do exórdio.",
          "Explica como esse problema prepara a decisão de pregar aos peixes."
        ],
        modelAnswer:"A imagem do sal define simbolicamente a função da pregação: preservar os homens da corrupção moral. Ao constatar que a terra continua corrompida, Vieira transforma a metáfora num problema argumentativo e questiona a eficácia de pregadores e ouvintes, preparando assim a solução exemplar de Santo António — dirigir a pregação aos peixes.",
        note:"Não basta identificar a metáfora bíblica; explica a cadeia de raciocínio que ela põe em marcha."
      },
      remember:"No exórdio, o conceito predicável não é decoração: é o motor lógico que organiza o problema, a tese e a estratégia do sermão.",
      pitfalls:[
        "Citar «sal da terra» sem explicar a função simbólica do sal.",
        "Dizer apenas que os homens são maus sem reconstruir as hipóteses sobre pregadores e ouvintes.",
        "Tratar a história de Santo António como episódio desligado da argumentação."
      ]
    },
    {
      id:"pt11-vieira-louvores",
      kicker:"3 · CAPÍTULOS II E III · LOUVORES",
      title:"O elogio dos peixes é também uma forma indireta de ensinar e censurar os homens",
      paragraphs:[
        "Nos capítulos de louvor, Vieira começa por qualidades gerais dos peixes e passa depois a exemplos particulares. A organização do discurso cria um percurso do coletivo para o individual e permite transformar características naturais ou lendárias dos animais em modelos de comportamento humano.",
        "Entre os exemplos particulares, o sermão mobiliza peixes cuja qualidade é interpretada moralmente. O importante para o exame não é decorar uma ficha zoológica, mas compreender a correspondência: que característica é apresentada, que virtude humana simboliza e que lição o pregador constrói a partir dela.",
        "O louvor tem frequentemente uma face crítica implícita. Ao elogiar nos peixes aquilo que falta aos homens, Vieira cria contraste e censura indireta. Assim, louvar não significa suspender a crítica; pode ser uma forma mais subtil de revelar insuficiências do verdadeiro auditório."
      ],
      signals:[
        "Distingue louvores gerais de louvores particulares.",
        "Nos exemplos particulares, traduz característica do peixe → virtude humana → lição.",
        "Procura o contraste implícito com os homens mesmo quando o tom é de elogio."
      ],
      example:{
        title:"Exemplo de resposta · louvor que também critica",
        prompt:"Vieira elogia num peixe uma qualidade que afirma faltar aos homens. Que efeito argumentativo produz esse contraste?",
        steps:[
          "Identifica a qualidade elogiada no peixe.",
          "Explica a virtude humana que essa qualidade simboliza.",
          "Mostra que a comparação expõe por contraste uma falha dos homens.",
          "Conclui que o elogio funciona simultaneamente como modelo e censura indireta."
        ],
        modelAnswer:"O louvor do peixe propõe uma virtude como modelo, mas o contraste com os homens transforma o elogio numa crítica indireta. Ao mostrar que o animal possui aquilo que falta ao verdadeiro auditório, Vieira aumenta a força persuasiva da censura sem abandonar formalmente o tom elogioso.",
        note:"Se o item identificar um peixe concreto, usa apenas as características relevantes para esse excerto."
      },
      remember:"Em Vieira, um elogio pode cumprir duas funções ao mesmo tempo: apresentar um modelo positivo e revelar, por contraste, um defeito humano.",
      pitfalls:[
        "Decorar nomes de peixes sem saber a virtude ou lição associada.",
        "Assumir que os capítulos de louvor não contêm crítica aos homens.",
        "Confundir característica literal do animal com a conclusão moral construída pelo pregador."
      ]
    },
    {
      id:"pt11-vieira-repreensoes-gerais",
      kicker:"4 · CAPÍTULO IV · REPREENSÕES EM GERAL",
      title:"A crítica passa do elogio à denúncia de comportamentos coletivos",
      paragraphs:[
        "No capítulo IV, a organização muda para repreensões em geral. Vieira censura comportamentos atribuídos coletivamente aos peixes e constrói analogias com vícios humanos. A progressão do sermão torna-se mais confrontativa: depois dos modelos positivos, o auditório é colocado perante condutas que devem ser reconhecidas e corrigidas.",
        "A alegoria permite abordar relações de poder e exploração. Um comportamento natural descrito entre peixes pode ganhar sentido social quando é apresentado como imagem de homens que prejudicam outros homens. O valor do excerto depende desta passagem entre descrição e crítica.",
        "Perguntas retóricas, apóstrofes, repetições, contrastes e exemplos tornam a repreensão mais viva. O pregador não se limita a transmitir informação: simula diálogo, interpela o auditório e conduz a interpretação para a conclusão moral pretendida."
      ],
      signals:[
        "Identifica primeiro o comportamento coletivo censurado.",
        "Explica a analogia social ou moral que resulta desse comportamento.",
        "Relaciona interpelação e perguntas retóricas com a tentativa de envolver o auditório."
      ],
      example:{
        title:"Exemplo de resposta · da descrição à crítica social",
        prompt:"Um comportamento dos peixes é descrito como exploração dos mais fracos pelos mais fortes. Como desenvolves a resposta?",
        steps:[
          "Resume o comportamento literal em causa.",
          "Identifica a relação de poder que ele simboliza entre os homens.",
          "Explica o valor crítico da analogia.",
          "Mostra como a interpelação do pregador intensifica a censura."
        ],
        modelAnswer:"A descrição do comportamento dos peixes ultrapassa o plano animal porque representa uma relação humana de exploração. A analogia permite censurar os que usam a sua força ou posição contra os mais fracos, e a interpelação direta aumenta a pressão persuasiva sobre o auditório.",
        note:"Evita interpretações sociais genéricas: demonstra sempre a ponte entre o comportamento descrito e o vício humano."
      },
      remember:"Nas repreensões gerais, não pares no que os peixes fazem: pergunta que relação humana Vieira quer tornar visível através desse comportamento.",
      pitfalls:[
        "Resumir a descrição animal sem chegar ao sentido humano.",
        "Aplicar uma crítica social que o excerto não sustenta.",
        "Identificar pergunta retórica ou apóstrofe sem explicar o efeito de interpelação."
      ]
    },
    {
      id:"pt11-vieira-cap5",
      kicker:"5 · CAPÍTULO V · REPREENSÕES EM PARTICULAR",
      title:"Roncadores, Pegadores, Voadores e Polvo transformam vícios humanos em imagens memoráveis",
      paragraphs:[
        "O capítulo V, de leitura integral no currículo ativo, organiza repreensões particulares em torno de peixes que representam vícios específicos. Os Roncadores associam-se à arrogância e ostentação; os Pegadores à dependência interesseira de figuras poderosas; os Voadores à ambição desmedida; e o Polvo à dissimulação e traição.",
        "Cada exemplo segue uma lógica argumentativa semelhante: característica atribuída ao peixe, interpretação moral, comparação com comportamentos humanos e reforço por exemplos ou contrastes. Esta repetição estrutural ajuda a estudar o capítulo sem transformar a aprendizagem numa lista mecânica.",
        "O Polvo ocupa um lugar particularmente expressivo porque a capacidade de ocultação permite construir uma crítica da falsidade. O contraste entre aparência e ação torna a figura eficaz como imagem de quem esconde intenções e age contra aqueles que engana."
      ],
      signals:[
        "Roncadores → arrogância/ostentação; Pegadores → dependência interesseira; Voadores → ambição; Polvo → dissimulação/traição.",
        "Para cada peixe, explica a propriedade que sustenta a analogia — não saltes diretamente para o vício.",
        "Observa exemplos, comparações e contrastes usados para tornar a repreensão convincente."
      ],
      example:{
        title:"Exemplo de resposta · explicar uma repreensão particular",
        prompt:"Um item pede que expliques por que razão o Polvo funciona como símbolo de falsidade. Como respondes?",
        steps:[
          "Identifica a característica de ocultação ou dissimulação atribuída ao animal.",
          "Relaciona essa característica com a possibilidade de enganar a vítima.",
          "Traduz a relação para o comportamento humano criticado.",
          "Explica como o contraste entre aparência e intenção aumenta a força da censura."
        ],
        modelAnswer:"O Polvo simboliza a falsidade porque a sua capacidade de se ocultar é apresentada como equivalente à dissimulação de quem esconde intenções para enganar. A distância entre aparência e ação permite a Vieira transformar uma característica do animal numa imagem concreta da traição humana.",
        note:"Se o item incidir noutro peixe, segue a mesma lógica: propriedade → analogia → vício → efeito crítico."
      },
      remember:"O capítulo V fica muito mais simples se estudares relações causais, não pares de palavras: propriedade do peixe → comportamento humano → censura.",
      pitfalls:[
        "Trocar os vícios associados aos quatro peixes.",
        "Saber o vício, mas não conseguir explicar a característica que permite a analogia.",
        "Apresentar o Polvo apenas como «mau» sem analisar dissimulação, engano e traição."
      ]
    },
    {
      id:"pt11-vieira-peroracao",
      kicker:"6 · CAPÍTULO VI · PERORAÇÃO",
      title:"O final retoma o confronto entre peixes e homens e fecha a persuasão com uma última inversão",
      paragraphs:[
        "A peroração funciona como conclusão do sermão. Vieira retoma a comparação entre peixes e homens, sintetiza o movimento do discurso e procura deixar no auditório uma impressão final forte. O fecho não acrescenta apenas matéria nova: reorganiza o que foi argumentado e define a atitude final do pregador.",
        "Ao aproximar novamente os dois planos da alegoria, o sermão evidencia que os peixes foram um meio para falar dos homens. A distância criada ao longo do discurso é parcialmente anulada no final, tornando mais explícita a responsabilidade do verdadeiro destinatário.",
        "O tom final combina reflexão religiosa, apelo e conclusão moral. Numa resposta, interessa perceber como esta mudança de posição encerra a estratégia persuasiva e reforça a necessidade de transformação de quem ouviu o sermão."
      ],
      signals:[
        "Procura sínteses ou retomadas de ideias anteriores.",
        "Explica como o final aproxima novamente peixes e homens.",
        "Relaciona a conclusão com a finalidade de mover o auditório à mudança."
      ],
      example:{
        title:"Exemplo de resposta · função da peroração",
        prompt:"Por que razão a peroração é mais do que um simples resumo do sermão?",
        steps:[
          "Identifica uma ideia ou oposição retomada no final.",
          "Mostra como essa retomada reorganiza o sentido global.",
          "Explica a posição final do pregador perante peixes e homens.",
          "Relaciona o fecho com a finalidade persuasiva do sermão."
        ],
        modelAnswer:"A peroração não se limita a resumir porque usa a retoma das ideias para produzir um efeito final sobre o auditório. Ao aproximar novamente os planos dos peixes e dos homens, Vieira evidencia o verdadeiro alvo da crítica e encerra o sermão reforçando a exigência de transformação moral.",
        note:"Numa pergunta sobre estrutura, distingue sempre função de conteúdo: o final sintetiza, mas também procura mover o auditório."
      },
      remember:"A peroração fecha o argumento e tenta deixar consequência: compreender a crítica deve conduzir o verdadeiro auditório a rever o próprio comportamento.",
      pitfalls:[
        "Definir peroração apenas como «a última parte».",
        "Resumir o capítulo sem explicar a função de conclusão e persuasão.",
        "Esquecer que o verdadeiro alvo do discurso continua a ser humano."
      ]
    },
    {
      id:"pt11-vieira-retorica",
      kicker:"7 · RETÓRICA E ARGUMENTAÇÃO",
      title:"Um recurso expressivo só interessa quando consegues mostrar como ajuda Vieira a convencer",
      paragraphs:[
        "Vieira mobiliza recursos expressivos dentro de uma estratégia de persuasão. Perguntas retóricas podem pressionar o auditório para uma conclusão; apóstrofes simulam contacto direto; enumerações e gradações ampliam a força de uma crítica; antíteses tornam oposições morais mais visíveis; exemplos dão corpo a ideias gerais.",
        "A análise deve distinguir recurso de argumento. Uma analogia entre peixe e homem pode constituir parte do próprio raciocínio; uma repetição pode reforçar emocionalmente esse raciocínio. Quando o item pede valor de um recurso, explica sempre o conteúdo que ele organiza e o efeito que produz.",
        "A persuasão combina razão e impacto. O sermão procura demonstrar, mas também envolver, surpreender, ridicularizar, advertir e mover. Esta combinação explica por que razão a linguagem figurada não é adorno: faz parte da eficácia argumentativa."
      ],
      signals:[
        "Pergunta retórica → conduz ou pressiona o auditório para uma conclusão.",
        "Exemplo/analogia → concretiza e sustenta uma ideia geral.",
        "Antítese, enumeração ou gradação → organiza e intensifica uma oposição ou crítica."
      ],
      example:{
        title:"Exemplo de resposta · recurso e função persuasiva",
        prompt:"Vieira formula várias perguntas seguidas cuja resposta parece evidente. Como explicas o efeito?",
        steps:[
          "Identifica que as perguntas não procuram informação real.",
          "Explica a conclusão para a qual orientam o auditório.",
          "Mostra como a sequência cria pressão ou intensidade.",
          "Relaciona esse efeito com a tese ou censura defendida."
        ],
        modelAnswer:"As perguntas são retóricas porque orientam o auditório para respostas implícitas. A sucessão de interrogações aumenta a intensidade da interpelação e conduz o ouvinte para a conclusão pretendida pelo pregador, reforçando a força persuasiva da censura.",
        note:"Evita respostas como «a pergunta retórica serve para chamar a atenção» sem dizer atenção para quê e com que efeito."
      },
      remember:"Recurso → conteúdo organizado → efeito → finalidade persuasiva: esta cadeia transforma análise estilística em análise argumentativa.",
      pitfalls:[
        "Fazer uma lista de figuras de estilo desligada da tese.",
        "Confundir exemplo argumentativo com simples ornamentação.",
        "Usar sempre a fórmula vaga «chamar a atenção do leitor»."
      ]
    },
    {
      id:"pt11-vieira-resposta",
      kicker:"8 · RESPOSTA DE EXAME",
      title:"Uma resposta forte reconstrói o raciocínio de Vieira em vez de apenas reconhecer nomes de peixes",
      paragraphs:[
        "Na prova, um excerto pode exigir compreensão da alegoria, identificação da tese, explicação de um argumento ou análise do valor persuasivo de um recurso. O método mais seguro é reconstruir o raciocínio: o que Vieira afirma, que evidência ou exemplo usa e como essa escolha conduz o auditório para uma conclusão.",
        "Nos capítulos de peixes particulares, estrutura a resposta por propriedade → correspondência humana → vício ou virtude → finalidade. Em perguntas de argumentação, usa tese → argumento → recurso → efeito. Estas cadeias evitam respostas fragmentadas e ajudam a explicar, não apenas identificar.",
        "O conhecimento global do sermão serve para enquadrar o excerto, mas não substitui a sua leitura. Mesmo quando reconheces o peixe ou o capítulo, confirma sempre a ideia e o recurso que aparecem no texto apresentado."
      ],
      signals:[
        "Responde primeiro à ideia pedida pelo verbo do enunciado.",
        "Seleciona a característica, argumento ou recurso que demonstra a tua ideia.",
        "Fecha explicando a função moral, crítica ou persuasiva dessa evidência."
      ],
      example:{
        title:"Exemplo de resposta · tese, evidência e efeito",
        prompt:"O item pede que mostres como uma comparação contribui para a crítica aos homens.",
        steps:[
          "Formula a crítica humana que o excerto desenvolve.",
          "Identifica os dois elementos colocados em comparação.",
          "Explica a semelhança relevante que sustenta a analogia.",
          "Conclui mostrando como a imagem torna a censura mais concreta e persuasiva."
        ],
        modelAnswer:"A comparação contribui para a crítica porque aproxima um comportamento do peixe de um vício humano com base numa característica comum. Essa analogia concretiza a censura e torna a conclusão mais fácil de visualizar, reforçando o efeito persuasivo do argumento.",
        note:"Identificar o peixe certo vale pouco se não explicares a relação que Vieira constrói e a função dessa relação no discurso."
      },
      remember:"Vieira não se estuda como catálogo de peixes: estuda-se como raciocínio persuasivo construído através deles.",
      pitfalls:[
        "Responder apenas com o nome do peixe e do vício.",
        "Citar um recurso sem explicar o argumento a que ele serve.",
        "Despejar a estrutura completa do sermão quando o item pede apenas uma relação específica."
      ]
    }
  ]
};

export function portugueseVieira11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_VIEIRA_11_DEEP_REVIEW.id?PORTUGUESE_VIEIRA_11_DEEP_REVIEW:null;
}
