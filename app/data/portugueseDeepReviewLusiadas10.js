export const PORTUGUESE_LUSIADAS_10_DEEP_REVIEW_VERSION="2026.10-wave5";

export const PORTUGUESE_LUSIADAS_10_DEEP_REVIEW={
  id:"pt10-lusiadas",
  title:"Luís de Camões · Os Lusíadas · Reflexões do Poeta",
  lead:"No 10.º ano, o foco curricular ativo em Os Lusíadas incide nas reflexões do Poeta: momentos em que a narração é interrompida ou comentada para pensar a fragilidade humana, o valor das letras, o exercício do poder, a corrupção, a fama e o estado da pátria. A escola trabalha três dos seis blocos prescritos, por isso esta revisão apresenta os seis para servir qualquer turma sem fingir que todos são obrigatórios.",
  goals:[
    "Distinguir narração épica de intervenção reflexiva do Poeta e explicar a função da passagem entre os dois planos.",
    "Conhecer os seis blocos de reflexão atualmente previstos e reconhecer que a seleção curricular é de três entre esses seis.",
    "Interpretar cada reflexão a partir do episódio que a desencadeia, da tese desenvolvida e dos recursos que a sustentam.",
    "Relacionar exaltação épica e crítica aos contemporâneos sem reduzir a obra a uma celebração uniforme de Portugal.",
    "Comparar reflexões por tema, tom, alvo e estratégia argumentativa.",
    "Construir respostas restritas por ideia → evidência → explicação, mobilizando contexto apenas quando melhora a leitura do excerto."
  ],
  sourceBasis:[
    "DGE · Currículo Nacional · Português · 10.º ano · Os Lusíadas: reflexões do Poeta, escolher três entre I 105-106, V 92-100, VII 78-87, VIII 96-99, IX 88-95 e X 145-156",
    "DGE · Estudo Autónomo · Camões épico · guiões sobre o discurso reflexivo e crítico em Os Lusíadas",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt10-lus-mapa",
      kicker:"1 · NARRAÇÃO E REFLEXÃO",
      title:"Quando o Poeta interrompe a história, a epopeia passa também a pensar sobre o mundo",
      paragraphs:[
        "Os Lusíadas combinam a narração de feitos heroicos com momentos em que a voz do Poeta comenta, questiona, critica ou aconselha. Essas reflexões não são apartes desligados da obra: nascem frequentemente do acontecimento acabado de narrar e alargam o seu significado a uma questão humana, moral, política ou cultural mais ampla.",
        "Para interpretar uma reflexão, começa pela ponte entre narrativa e comentário. Pergunta o que aconteceu imediatamente antes, que problema esse episódio sugere e como o Poeta transforma o caso particular numa tese mais geral. Esta passagem do concreto para o universal é uma das chaves de leitura mais úteis.",
        "O currículo ativo não exige os seis blocos a todos os alunos: prevê a escolha de três. A APProva+ apresenta os seis para que qualquer aluno encontre o percurso da sua turma e consiga também reconhecer relações entre reflexões diferentes, mas não trata os seis como leituras obrigatórias."
      ],
      signals:[
        "Identifica o episódio ou situação que desencadeia a reflexão.",
        "Formula a tese geral em palavras tuas antes de analisar recursos.",
        "Distingue a voz do Poeta das personagens que participam na ação narrada."
      ],
      example:{
        title:"Exemplo de resposta · ligar episódio e reflexão",
        prompt:"Depois de um episódio de engano ou perigo, o Poeta abandona momentaneamente a narração e generaliza sobre a insegurança humana. Como explicas essa passagem?",
        steps:[
          "Resume apenas o elemento do episódio que desencadeia a reflexão.",
          "Formula a ideia geral para a qual o Poeta amplia esse caso.",
          "Explica a relação lógica entre o acontecimento e a tese.",
          "Se o item pedir recursos, mostra como interrogações, exclamações ou enumerações reforçam essa ideia."
        ],
        modelAnswer:"O episódio funciona como ponto de partida para uma reflexão mais ampla: a ameaça vivida pelos navegadores deixa de ser apenas um acontecimento da viagem e torna-se exemplo da vulnerabilidade humana. A mudança de plano permite ao Poeta transformar uma situação concreta numa questão universal.",
        note:"Não gastes a resposta a resumir toda a viagem. O contexto só interessa na medida em que explica a reflexão."
      },
      remember:"Episódio → problema → reflexão geral: esta sequência ajuda a perceber por que razão o Poeta interrompe a narrativa.",
      pitfalls:[
        "Tratar as reflexões como textos independentes sem ligação ao episódio anterior.",
        "Confundir Poeta, narrador e Vasco da Gama como se fossem sempre a mesma voz.",
        "Assumir que todas as seis reflexões são obrigatórias para todas as turmas."
      ]
    },
    {
      id:"pt10-lus-i105",
      kicker:"2 · CANTO I · 105-106",
      title:"O perigo da viagem abre uma reflexão sobre a fragilidade e a insegurança humanas",
      paragraphs:[
        "No final do Canto I, sucessivos enganos e ameaças enfrentados pelos navegadores conduzem o Poeta a ampliar o olhar. O perigo marítimo e terrestre deixa de dizer respeito apenas à armada portuguesa e torna-se exemplo de uma condição humana marcada pela exposição ao dano, à guerra, ao engano e à morte.",
        "A reflexão constrói um contraste entre a pequenez e fragilidade do ser humano e a vastidão das forças que o podem ameaçar. O sujeito interroga onde pode existir segurança verdadeira e transforma a viagem épica numa pergunta sobre os limites do controlo humano sobre a própria vida.",
        "Exclamações, enumerações e interrogações contribuem para o tom de inquietação. Numa resposta, não basta identificá-las: explica como a acumulação de perigos e as perguntas sem resposta segura reforçam a ideia de vulnerabilidade."
      ],
      signals:[
        "Relaciona a reflexão com os perigos e enganos acabados de narrar.",
        "Distingue heroísmo português de fragilidade humana universal: os dois podem coexistir na epopeia.",
        "Observa acumulação, contraste, exclamação e interrogação como formas de intensificar a insegurança."
      ],
      example:{
        title:"Exemplo de resposta · do perigo particular à condição humana",
        prompt:"Como explicarias que a reflexão ultrapassa a situação dos marinheiros portugueses?",
        steps:[
          "Parte do perigo concreto vivido na viagem.",
          "Mostra que a formulação passa a referir o ser humano de modo geral.",
          "Identifica a oposição entre fragilidade humana e multiplicidade das ameaças.",
          "Conclui que o episódio épico desencadeia uma reflexão universal sobre insegurança."
        ],
        modelAnswer:"A reflexão ultrapassa os navegadores porque o Poeta transforma os perigos da viagem num exemplo da vulnerabilidade de qualquer ser humano. A acumulação de ameaças no mar e em terra e a pergunta sobre onde a vida pode estar segura dão ao comentário um alcance universal.",
        note:"Evita dizer que Camões deixa de valorizar o heroísmo: a reflexão complexifica-o ao mostrar o risco enfrentado por seres humanos frágeis."
      },
      remember:"O heroísmo torna-se mais significativo porque é praticado por seres humanos frágeis num mundo cheio de ameaças.",
      pitfalls:[
        "Resumir apenas os perigos sem chegar à ideia de fragilidade humana.",
        "Interpretar as perguntas apenas como pedidos reais de informação.",
        "Apresentar a reflexão como negação de toda a dimensão heroica da obra."
      ]
    },
    {
      id:"pt10-lus-v92",
      kicker:"3 · CANTO V · 92-100",
      title:"Armas e letras precisam uma da outra: o louvor conserva e pode estimular grandes feitos",
      paragraphs:[
        "Depois de Vasco da Gama narrar feitos extraordinários, o Poeta reflete sobre a relação entre ação heroica e celebração literária. A glória não depende apenas de realizar grandes obras: precisa também de memória, canto e reconhecimento para atravessar o tempo e servir de exemplo a outros.",
        "A reflexão recorre a exemplos da Antiguidade para defender que o louvor poético pode estimular novas ações dignas de memória. Em seguida, o olhar volta-se criticamente para Portugal: o Poeta lamenta a insuficiente valorização das letras e a separação entre cultura e exercício heroico.",
        "A oposição simplista entre espada e pena deve ser evitada. A tese não é que a literatura substitua a ação, nem que a ação torne a cultura dispensável; é a ideia de complementaridade entre feitos merecedores de memória e capacidade cultural de os reconhecer, transmitir e inspirar."
      ],
      signals:[
        "Identifica a tese sobre o louvor e a memória dos feitos.",
        "Usa os exemplos históricos como argumentos que sustentam a tese, não como informação decorativa.",
        "Relaciona a crítica cultural aos portugueses com a defesa da complementaridade entre armas e letras."
      ],
      example:{
        title:"Exemplo de resposta · explicar a função dos exemplos antigos",
        prompt:"Por que razão o Poeta convoca heróis da Antiguidade e aqueles que os celebraram?",
        steps:[
          "Formula a tese: o reconhecimento literário contribui para a permanência e o estímulo do heroísmo.",
          "Mostra que os exemplos antigos fornecem casos concretos dessa relação.",
          "Explica a função argumentativa dos exemplos: servem de prova ou modelo.",
          "Relaciona-os com a crítica posterior à situação portuguesa."
        ],
        modelAnswer:"Os exemplos da Antiguidade funcionam como argumentos a favor da relação entre feitos e louvor. Ao mostrar que grandes figuras desejaram e valorizaram a celebração das suas ações, o Poeta sustenta a importância das letras e prepara a crítica à insuficiente valorização cultural no seu próprio país.",
        note:"Não basta listar nomes clássicos; explica para que servem no raciocínio do Poeta."
      },
      remember:"As armas realizam; as letras conservam, interpretam e podem inspirar. A reflexão valoriza a articulação entre ambas.",
      pitfalls:[
        "Dizer apenas que Camões prefere a literatura à guerra.",
        "Enumerar exemplos clássicos sem explicar a função argumentativa.",
        "Reduzir a crítica aos portugueses a uma afirmação vaga de que não gostavam de poesia."
      ]
    },
    {
      id:"pt10-lus-vii78",
      kicker:"4 · CANTO VII · 78-87",
      title:"A experiência do próprio Poeta conduz à crítica da ingratidão, da ambição e do mau exercício do poder",
      paragraphs:[
        "No final do Canto VII, a reflexão assume uma dimensão pessoal: o Poeta invoca as ninfas, recorda dificuldades da sua própria trajetória e exprime receio de não conseguir levar a obra até ao fim. Essa presença autobiográfica não transforma automaticamente o poema num diário; serve de fundamento a uma reflexão sobre criação, reconhecimento e serviço.",
        "A partir da própria experiência, o discurso amplia-se para uma crítica a quem exerce poder por ambição, interesse pessoal, dissimulação ou exploração do povo. O contraste fundamental é entre servir o bem comum e usar posição ou autoridade em benefício próprio.",
        "A reflexão termina por delimitar quem merece ser cantado: aqueles cuja ação, esforço e risco se orientam para valores superiores ao interesse individual. Assim, o Poeta também define critérios para o verdadeiro heroísmo e para a própria função do canto épico."
      ],
      signals:[
        "Distingue referências autobiográficas de uma leitura biográfica total da obra.",
        "Organiza a crítica por comportamentos: ambição, interesse próprio, dissimulação e exploração.",
        "Relaciona a crítica aos indignos com a definição positiva de quem merece memória e canto."
      ],
      example:{
        title:"Exemplo de resposta · da experiência pessoal à crítica política e moral",
        prompt:"Como explicas a passagem da queixa pessoal do Poeta para a crítica aos poderosos?",
        steps:[
          "Identifica a experiência de dificuldade ou falta de reconhecimento evocada.",
          "Mostra que o discurso deixa de incidir apenas no sujeito e passa a avaliar comportamentos sociais.",
          "Distingue interesse pessoal de serviço do bem comum.",
          "Relaciona essa oposição com o critério de quem merece ser celebrado."
        ],
        modelAnswer:"A experiência pessoal funciona como ponto de partida para uma crítica mais ampla. A falta de reconhecimento e as dificuldades evocadas levam o Poeta a condenar aqueles que usam o poder em benefício próprio e, por contraste, a reservar o canto para quem serve valores coletivos e aceita o esforço associado a esse serviço.",
        note:"Evita transformar a resposta numa biografia de Camões; seleciona apenas os elementos pessoais que ajudam a interpretar a reflexão."
      },
      remember:"O Poeta não define apenas quem critica: define também quem considera digno de memória e, portanto, o tipo de heroísmo que a epopeia deve celebrar.",
      pitfalls:[
        "Confundir primeira pessoa poética com relato autobiográfico integral e literal.",
        "Listar defeitos dos poderosos sem os relacionar com o bem comum.",
        "Ignorar que a reflexão acaba por estabelecer um critério positivo de merecimento."
      ]
    },
    {
      id:"pt10-lus-viii96",
      kicker:"5 · CANTO VIII · 96-99",
      title:"O suborno desencadeia uma crítica ao poder corruptor do dinheiro em toda a sociedade",
      paragraphs:[
        "A reflexão parte da desconfiança provocada por um comportamento orientado pelo interesse material. A partir desse caso, o Poeta generaliza sobre a força corruptora do dinheiro e apresenta os seus efeitos em pessoas de diferentes posições sociais.",
        "A argumentação desenvolve-se por acumulação de consequências e exemplos: traição, vileza, desvio da justiça, manipulação de leis ou consciências e corrupção de quem deveria agir segundo princípios superiores ao interesse material. O objetivo não é memorizar a lista, mas perceber a tese que a organiza.",
        "As referências à Antiguidade e a enumeração de efeitos funcionam como prova e intensificação. A crítica ganha força porque o dinheiro aparece capaz de atingir relações pessoais, instituições, conhecimento, poder político e até espaços associados à religião."
      ],
      signals:[
        "Liga a reflexão ao episódio de corrupção ou suborno que a precede.",
        "Formula a tese como poder corruptor do interesse material, não apenas como condenação de uma personagem.",
        "Lê exemplos e enumerações como estratégia argumentativa de demonstração e amplitude."
      ],
      example:{
        title:"Exemplo de resposta · explicar uma enumeração de efeitos do dinheiro",
        prompt:"O Poeta apresenta sucessivas consequências negativas da cobiça. Que função tem essa acumulação?",
        steps:[
          "Identifica a tese geral sobre o dinheiro ou interesse material.",
          "Agrupa os exemplos por áreas afetadas, em vez de os repetir todos.",
          "Explica que a acumulação mostra extensão e recorrência do problema.",
          "Relaciona a estratégia com o tom crítico da reflexão."
        ],
        modelAnswer:"A enumeração amplia a crítica porque mostra que o poder do dinheiro não se limita a um caso isolado. Ao fazê-lo afetar relações, justiça, poder e consciência, o Poeta apresenta a corrupção como um problema transversal e reforça argumentativamente a gravidade da cobiça.",
        note:"Se o item pedir um exemplo específico, explica-o em vez de tentar reproduzir toda a enumeração."
      },
      remember:"O caso particular de corrupção serve para demonstrar uma tese universalizante: o interesse material pode deformar decisões, relações e instituições.",
      pitfalls:[
        "Reduzir a reflexão ao comportamento do Catual ou de uma só personagem.",
        "Memorizar a enumeração sem perceber a tese comum aos exemplos.",
        "Identificar alusões clássicas sem explicar que papel desempenham na argumentação."
      ]
    },
    {
      id:"pt10-lus-ix88",
      kicker:"6 · CANTO IX · 88-95",
      title:"A Ilha dos Amores é interpretada como prémio simbólico: fama e imortalidade conquistam-se pelo mérito",
      paragraphs:[
        "No final do episódio da Ilha dos Amores, o Poeta explica o valor simbólico do prémio concedido aos navegadores. A dimensão maravilhosa e sensual do episódio é alargada para uma leitura de fama, honra e imortalidade simbólica associadas a ações consideradas dignas.",
        "A reflexão opõe o verdadeiro merecimento a caminhos como ócio, cobiça, ambição injusta ou tirania. O heroísmo resulta de esforço, coragem, justiça, serviço e capacidade de agir para além do interesse estritamente individual.",
        "A passagem tem também valor de exortação. O leitor não é convidado apenas a admirar heróis concluídos: é desafiado a compreender que a glória depende de escolhas e ações. A afirmação da vontade não elimina dificuldade ou acaso, mas valoriza iniciativa e responsabilidade."
      ],
      signals:[
        "Distingue o episódio maravilhoso da interpretação simbólica que o Poeta lhe atribui.",
        "Relaciona fama e imortalidade com mérito, esforço e serviço, não com simples desejo de reconhecimento.",
        "Observa o contraste entre comportamentos que conduzem à glória e aqueles que a impedem."
      ],
      example:{
        title:"Exemplo de resposta · explicar o valor simbólico da Ilha",
        prompt:"Como justificarias que a Ilha dos Amores funciona para além de um prémio literal aos navegadores?",
        steps:[
          "Identifica o prémio narrativo recebido pelos heróis.",
          "Mostra que o Poeta associa esse prémio a fama e imortalidade simbólica.",
          "Relaciona o reconhecimento com esforço e mérito.",
          "Explica o efeito exemplar da reflexão sobre outros homens."
        ],
        modelAnswer:"A Ilha ultrapassa a função de recompensa narrativa porque o Poeta a interpreta como imagem da honra e da imortalidade alcançadas por ações meritórias. O prémio transforma-se, assim, num modelo de reconhecimento simbólico e numa exortação a conquistar a glória através do esforço e do serviço.",
        note:"Não confundas imortalidade simbólica pela memória e fama com imortalidade física das personagens."
      },
      remember:"A glória épica não aparece como prémio automático: é apresentada como consequência simbólica de mérito, esforço e ação orientada por valores.",
      pitfalls:[
        "Reduzir a Ilha dos Amores a recompensa amorosa ou sensual.",
        "Confundir fama merecida com ambição ou cobiça, que a reflexão critica.",
        "Interpretar a valorização da vontade como negação de todos os limites humanos apresentados noutros cantos."
      ]
    },
    {
      id:"pt10-lus-x145",
      kicker:"7 · CANTO X · 145-156",
      title:"A epopeia termina entre desalento e esperança: crítica ao presente e apelo à renovação",
      paragraphs:[
        "Nas estâncias finais, a voz poética manifesta cansaço e desalento perante uma pátria que considera pouco recetiva ao canto, marcada por cobiça, rudeza e falta de estímulo ao engenho. O contraste é forte: uma obra construída para celebrar grandes feitos termina confrontando a distância entre a grandeza cantada e o presente observado pelo Poeta.",
        "O final, contudo, não é apenas desistência. A intervenção dirige-se a D. Sebastião e assume caráter de conselho e exortação: valorizar quem serve, reconhecer mérito, governar com discernimento e criar condições para que novos feitos dignos da memória coletiva sejam possíveis.",
        "Desalento, orgulho e esperança coexistem. Esta combinação impede uma leitura simples do final como pessimismo absoluto: a crítica ao presente é acompanhada pela possibilidade de mudança e pelo desejo de que o rei e a comunidade estejam à altura do legado que a epopeia celebrou."
      ],
      signals:[
        "Identifica o contraste entre glórias cantadas e estado presente da pátria.",
        "Distingue desalento inicial de exortação e esperança nas estâncias seguintes.",
        "Relaciona o apelo ao rei com reconhecimento do mérito, serviço e renovação coletiva."
      ],
      example:{
        title:"Exemplo de resposta · explicar sentimentos aparentemente contraditórios",
        prompt:"Como justificas que o final reúna simultaneamente desalento e esperança?",
        steps:[
          "Identifica as razões do desalento perante o presente.",
          "Mostra que o discurso depois se dirige ao rei com conselhos e expectativas.",
          "Explica que o apelo pressupõe possibilidade de mudança.",
          "Conclui que crítica e esperança coexistem no fecho da obra."
        ],
        modelAnswer:"O desalento nasce da distância entre a grandeza dos feitos celebrados e a realidade contemporânea criticada pelo Poeta. Contudo, a exortação dirigida ao rei mantém aberta a possibilidade de renovação, pelo que o final combina denúncia do presente com esperança numa ação futura capaz de recuperar valores dignos de celebração.",
        note:"Não reduz o final a «Camões está triste». Explica o objeto da crítica e a função do apelo."
      },
      remember:"A última palavra da epopeia não é só cansaço: a crítica procura também provocar ação, reconhecimento e renovação.",
      pitfalls:[
        "Ler o final como pessimismo sem qualquer dimensão de apelo.",
        "Transformar a exortação ao rei numa simples adulação.",
        "Separar totalmente a crítica final da função cívica e exemplar do poema."
      ]
    },
    {
      id:"pt10-lus-resposta",
      kicker:"8 · RESPOSTA DE EXAME",
      title:"Compara reflexões pela pergunta que fazem, pela tese que defendem e pela forma como argumentam",
      paragraphs:[
        "Como a seleção curricular varia entre turmas, o objetivo de estudo deve ser dominar ferramentas transferíveis. Em qualquer reflexão, localiza o desencadeador narrativo, formula a tese, identifica o tom e observa os principais mecanismos de argumentação ou expressão.",
        "Se o item pedir comparação, define um critério comum — por exemplo visão do heroísmo, crítica social, relação indivíduo-coletividade, função do Poeta ou tom — e aplica-o aos dois excertos. Uma comparação forte não é composta por dois resumos independentes: mostra explicitamente semelhança ou diferença.",
        "Na resposta restrita, usa o esquema ideia → evidência → explicação. A evidência pode ser uma imagem, contraste, enumeração, pergunta, exemplo histórico ou passagem do particular para o geral. O conhecimento da obra ajuda a reconhecer a estratégia, mas a conclusão deve nascer do excerto apresentado."
      ],
      signals:[
        "Desencadeador narrativo → tese → estratégia → efeito.",
        "Na comparação, usa o mesmo critério nos dois textos.",
        "Seleciona uma evidência relevante e explica-a em vez de despejar informação sobre o canto inteiro."
      ],
      example:{
        title:"Exemplo de resposta · comparar duas reflexões",
        prompt:"Dois excertos criticam comportamentos diferentes. Como constróis uma comparação em vez de dois resumos?",
        steps:[
          "Escolhe um critério comum, como alvo da crítica ou relação com o bem coletivo.",
          "Formula a ideia relativa ao primeiro excerto e associa-lhe uma evidência.",
          "Aplica o mesmo critério ao segundo excerto e identifica semelhança ou diferença.",
          "Fecha com uma frase comparativa que responda diretamente ao item."
        ],
        modelAnswer:"Embora ambos os excertos usem a crítica para defender valores coletivos, fazem-no contra alvos diferentes. Num caso, o problema pode ser a corrupção pelo interesse material; no outro, o uso egoísta do poder. A comparação torna-se clara quando o mesmo critério é aplicado às duas reflexões e sustentado por evidências próprias de cada texto.",
        note:"Não assumes o tema apenas pelo número do canto; lê sempre o excerto e adapta a resposta ao que efetivamente aparece."
      },
      remember:"Uma reflexão dos Lusíadas é uma pequena estrutura argumentativa dentro da epopeia: percebe o que a desencadeia, o que defende e como procura convencer ou interpelar.",
      pitfalls:[
        "Decorar seis resumos e tentar identificar o canto sem interpretar o texto.",
        "Comparar dois excertos através de dois parágrafos independentes sem relação explícita.",
        "Usar contexto histórico ou informação da obra que não contribui para responder ao item."
      ]
    }
  ]
};

export function portugueseLusiadas10DeepReviewFor(unitId){
  return unitId===PORTUGUESE_LUSIADAS_10_DEEP_REVIEW.id?PORTUGUESE_LUSIADAS_10_DEEP_REVIEW:null;
}
