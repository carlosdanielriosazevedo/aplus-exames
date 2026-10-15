export const PORTUGUESE_ECA_11_DEEP_REVIEW_VERSION="2026.10-wave12";

export const PORTUGUESE_ECA_11_DEEP_REVIEW={
  id:"pt11-eca",
  title:"Eça de Queirós · Os Maias ou A Ilustre Casa de Ramires",
  lead:"No currículo atualmente em vigor, a turma lê integralmente Os Maias OU A Ilustre Casa de Ramires. As duas alternativas exigem mais do que conhecer o enredo: é preciso perceber como Eça observa a sociedade portuguesa, constrói personagens contraditórias, usa ironia e articula espaços, narrador, história familiar e crítica. A app apresenta ambas para servir qualquer turma, sem transformar duas alternativas numa obrigação cumulativa.",
  goals:[
    "Distinguir o corpus ativo: Os Maias OU A Ilustre Casa de Ramires, ambas em leitura integral.",
    "Relacionar Realismo e crítica social com observação, pormenor, ironia, narrador e representação do quotidiano.",
    "Dominar a arquitetura de Os Maias: história familiar, educação, intriga amorosa e episódios da vida romântica.",
    "Explicar a dimensão trágica da relação entre Carlos da Maia e Maria Eduarda sem reduzir a obra à revelação do parentesco.",
    "Analisar os episódios sociais de Os Maias como retratos críticos da Lisboa oitocentista.",
    "Interpretar A Ilustre Casa de Ramires pela relação entre Gonçalo, a novela A Torre de D. Ramires, memória familiar, política e identidade.",
    "Explicar a ironia que nasce do contraste entre o presente de Gonçalo e o passado heroico dos Ramires.",
    "Responder a excertos novos por ideia → evidência → mecanismo narrativo → significado crítico."
  ],
  sourceBasis:[
    "DGE · Currículo Nacional · Português · 11.º ano · referencial em vigor: Eça de Queirós — Os Maias (leitura integral) OU A Ilustre Casa de Ramires (leitura integral)",
    "DGE · Estudo Autónomo · Tema 11 · Os Maias · enquadramento, educação, episódios da vida romântica, dimensão trágica e treino de itens de avaliação",
    "Imprensa Nacional-Casa da Moeda · edição de A Ilustre Casa de Ramires · romance e novela histórica A Torre de D. Ramires",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt11-eca-corpus-realismo",
      kicker:"1 · CORPUS E OLHAR REALISTA",
      title:"Duas obras alternativas, um mesmo autor atento às contradições da sociedade",
      paragraphs:[
        "O referencial em vigor apresenta duas alternativas: Os Maias ou A Ilustre Casa de Ramires, ambas de leitura integral. A app cobre as duas para que um aluno de qualquer escola encontre a sua obra, mas o estudo obrigatório de uma turma não se torna cumulativo. Antes de rever, confirma qual foi a alternativa escolhida.",
        "Eça associa observação da realidade a uma escrita crítica. O Realismo não se resume a descrever com detalhe: interessa observar como o narrador seleciona comportamentos, ambientes, instituições, linguagem e relações para revelar contradições sociais. O pormenor só ganha valor quando contribui para caracterização, ironia ou crítica.",
        "A ironia é uma ferramenta central. Pode surgir pela distância entre o que uma personagem pensa de si e aquilo que o narrador mostra, pela escolha de adjetivos, por comparações, pelo contraste entre discurso e ação ou pela organização de uma cena. Em exame, identifica primeiro a discrepância e só depois explica o alvo crítico."
      ],
      signals:[
        "Corpus ativo: Os Maias OU A Ilustre Casa de Ramires — leitura integral.",
        "Realismo: observação e análise crítica, não simples acumulação de detalhes.",
        "Ironia: procura sempre a distância entre aparência, discurso e realidade."
      ],
      example:{
        title:"Exemplo de resposta · explicar ironia",
        prompt:"O narrador descreve elogiosamente uma personagem, mas acumula pormenores que a tornam ridícula. Como respondes?",
        steps:[
          "Identifica o elogio aparente.",
          "Seleciona o pormenor que entra em conflito com esse elogio.",
          "Explica a discrepância criada pelo narrador.",
          "Relaciona o efeito irónico com a característica ou comportamento criticado."
        ],
        modelAnswer:"A ironia nasce da distância entre o elogio aparente e os pormenores que revelam o contrário. Ao deixar que a própria descrição desminta a imagem positiva da personagem, o narrador produz um efeito de ridicularização e orienta o leitor para uma leitura crítica do comportamento representado.",
        note:"Não basta escrever «há ironia». Mostra o contraste que a produz e o que ele põe em causa."
      },
      remember:"Em Eça, pergunta sempre: o que é mostrado e que distância existe entre a aparência e a avaliação implícita do narrador?",
      pitfalls:[
        "Estudar as duas alternativas como obrigatórias.",
        "Definir Realismo apenas por descrição objetiva.",
        "Chamar ironia a qualquer frase humorística sem explicar a discrepância."
      ]
    },
    {
      id:"pt11-eca-maias-arquitetura",
      kicker:"2 · OS MAIAS · FAMÍLIA, EDUCAÇÃO E ARQUITETURA",
      title:"A história dos Maias liga gerações, educação e escolhas individuais",
      paragraphs:[
        "O título Os Maias destaca uma família e permite acompanhar várias gerações, sobretudo Afonso, Pedro e Carlos. Essa continuidade é essencial: educação, valores, decisões afetivas e consequências atravessam a história familiar e ajudam a perceber por que razão a intriga principal não surge isolada.",
        "A educação de Carlos é colocada em contraste com modelos tradicionais representados, por exemplo, pela educação de Eusebiozinho. A comparação entre exercício físico, autonomia, contacto com a natureza e uma aprendizagem excessivamente livresca permite ao romance discutir modelos de formação. Não transformes este contraste numa fórmula de bom/mau sem ler o modo irónico como o texto o constrói.",
        "O subtítulo Episódios da Vida Romântica abre a obra para além da família. A narrativa combina a intriga principal com cenas de sociedade que observam política, jornalismo, cultura, finanças e sociabilidade lisboeta. Assim, a história privada e o retrato coletivo desenvolvem-se em paralelo."
      ],
      signals:[
        "Afonso → Pedro → Carlos: segue continuidades e contrastes entre gerações.",
        "Educação de Carlos vs Eusebiozinho: compara métodos, valores e efeitos.",
        "Título familiar + subtítulo social: intriga privada e episódios coletivos coexistem."
      ],
      example:{
        title:"Exemplo de resposta · comparar modelos educativos",
        prompt:"Um excerto contrapõe Carlos e Eusebiozinho. Como evitas limitar-te a dizer que um modelo é melhor?",
        steps:[
          "Identifica uma prática educativa atribuída a cada personagem.",
          "Explica o valor ou conceção de formação implícita em cada prática.",
          "Observa o tom do narrador e eventuais marcas de ironia.",
          "Relaciona o contraste com a caracterização das personagens e com a crítica social."
        ],
        modelAnswer:"O contraste não depende apenas de resultados escolares: Carlos é associado a uma formação que valoriza autonomia, corpo e experiência, enquanto Eusebiozinho surge ligado a um modelo excessivamente protegido e livresco. O tom irónico usado na descrição deste último orienta a leitura para uma crítica do modelo educativo que representa.",
        note:"A comparação deve nascer do excerto; não despejes uma lista fixa de características educativas."
      },
      remember:"Os Maias é simultaneamente história de uma família e observação crítica de uma sociedade.",
      pitfalls:[
        "Resumir três gerações sem explicar relações entre elas.",
        "Usar Eusebiozinho apenas como caricatura, ignorando o modelo educativo criticado.",
        "Esquecer o subtítulo quando o item trabalha um episódio social."
      ]
    },
    {
      id:"pt11-eca-maias-intriga",
      kicker:"3 · OS MAIAS · CARLOS, MARIA EDUARDA E DIMENSÃO TRÁGICA",
      title:"A relação amorosa progride sob sinais que o leitor só compreende plenamente com a revelação final",
      paragraphs:[
        "A relação entre Carlos da Maia e Maria Eduarda desenvolve-se como intriga amorosa central. O romance constrói atração, idealização e intimidade, mas espalha sinais e coincidências que ganham novo significado quando a identidade de Maria Eduarda é revelada. A dimensão trágica depende desta progressão e não apenas do facto final do incesto.",
        "A anagnórise altera retrospetivamente a leitura da relação. O leitor e as personagens são obrigados a reinterpretar episódios anteriores e a perceber que aquilo que parecia solução afetiva se torna uma impossibilidade familiar e moral. O reconhecimento produz consequências porque transforma conhecimento, identidade e relação ao mesmo tempo.",
        "Afonso ocupa um lugar decisivo na dimensão familiar da catástrofe. A revelação atinge a continuidade da casa e os afetos entre gerações. Numa resposta, evita transformar a tragédia numa sucessão de fatalidades abstratas: identifica o sinal, a revelação e a consequência concreta que o excerto permite demonstrar."
      ],
      signals:[
        "Intriga amorosa: segue aproximação, idealização e obstáculos antes da revelação.",
        "Sinais trágicos: só contam se explicares como preparam ou ganham sentido com o reconhecimento.",
        "Anagnórise: a nova identidade reorganiza a leitura do passado e torna a relação impossível."
      ],
      example:{
        title:"Exemplo de resposta · sinal trágico",
        prompt:"Um detalhe aparentemente secundário ganha importância depois da revelação do parentesco. Como explicas a sua função?",
        steps:[
          "Identifica o detalhe no momento em que surge.",
          "Explica o significado limitado que tinha antes da revelação.",
          "Relaciona-o com a verdade descoberta posteriormente.",
          "Mostra como a releitura reforça a construção trágica."
        ],
        modelAnswer:"O detalhe funciona como sinal porque inicialmente pode ser lido sem que as personagens compreendam toda a sua importância. Depois da revelação da identidade de Maria Eduarda, esse elemento adquire um novo sentido e passa a integrar a rede de antecipações que prepara a dimensão trágica da intriga.",
        note:"Evita escrever que «o destino já estava traçado» se não demonstrares a função narrativa do sinal."
      },
      remember:"A tragédia d'Os Maias constrói-se pela passagem de indício → reconhecimento → releitura → perda.",
      pitfalls:[
        "Reduzir toda a intriga ao incesto.",
        "Chamar presságio a qualquer pormenor.",
        "Confundir reconhecimento com resolução feliz do conflito."
      ]
    },
    {
      id:"pt11-eca-maias-sociedade",
      kicker:"4 · OS MAIAS · EPISÓDIOS DA VIDA ROMÂNTICA",
      title:"As cenas sociais funcionam como laboratório da crítica queirosiana",
      paragraphs:[
        "Os episódios sociais alargam o romance ao retrato da Lisboa oitocentista. Jantares, corridas, saraus, conversas políticas, ambientes jornalísticos e círculos culturais permitem observar grupos, discursos e instituições. O essencial não é memorizar cada episódio como capítulo isolado, mas perceber o comportamento coletivo que expõe.",
        "A crítica é frequentemente construída por ironia. Personagens que defendem modernidade podem agir de modo provinciano; discursos grandiosos podem terminar em banalidade; instituições que se apresentam como sérias podem revelar interesses, vaidade ou improviso. A discrepância entre imagem e prática é o mecanismo a demonstrar.",
        "O jornalismo, por exemplo, permite discutir influência, reputação e manipulação da opinião; outros episódios observam educação, política, cultura ou dinheiro. Uma resposta forte parte sempre da cena concreta, identifica a conduta ou discurso e explica que traço da sociedade portuguesa fica criticado."
      ],
      signals:[
        "Cena social → comportamento coletivo → alvo crítico.",
        "Ironia: discurso prestigioso pode ser desmontado pela ação ou pelo pormenor narrativo.",
        "Jornalismo, política, cultura e sociabilidade são examinados como práticas, não como temas abstratos."
      ],
      example:{
        title:"Exemplo de resposta · episódio social",
        prompt:"Uma cena jornalística revela interesses pessoais por trás de um discurso público. Como respondes?",
        steps:[
          "Identifica o discurso ou valor que a personagem afirma defender.",
          "Seleciona a ação que revela o interesse particular.",
          "Explica a contradição e o efeito irónico.",
          "Relaciona a cena com a crítica à instituição ou prática social representada."
        ],
        modelAnswer:"A cena é crítica porque contrapõe a imagem pública de independência do jornal ao comportamento condicionado por interesses particulares. A contradição entre discurso e prática produz ironia e permite ao narrador questionar a credibilidade da imprensa e os mecanismos de influência social.",
        note:"O episódio social não é um intervalo na intriga: é parte do projeto crítico do romance."
      },
      remember:"Nos episódios da vida romântica, procura sempre o triângulo comportamento → ironia → crítica social.",
      pitfalls:[
        "Listar episódios sem explicar a sua função.",
        "Dizer apenas que Eça critica a sociedade portuguesa.",
        "Confundir personagem caricatural com ausência de análise séria do problema social."
      ]
    },
    {
      id:"pt11-eca-maias-narrador-espacos",
      kicker:"5 · OS MAIAS · NARRADOR, ESPAÇOS E DESFECHO",
      title:"O espaço e o olhar do narrador ajudam a reler o percurso das personagens",
      paragraphs:[
        "O Ramalhete é mais do que residência: acompanha a história familiar e pode concentrar memória, expectativas e perda. Outros espaços de Lisboa ajudam a mapear grupos sociais, hábitos e contrastes. Em vez de decorar símbolos fixos, explica o que determinado espaço permite ver ou recordar naquele momento da ação.",
        "O narrador alterna descrição, comentário, focalização e ironia. A forma como apresenta Carlos, Ega ou as figuras episódicas orienta a leitura sem precisar de formular sempre um juízo explícito. Adjetivação, comparações, seleção de detalhes e distância entre a perspetiva da personagem e o resultado dos acontecimentos podem construir avaliação crítica.",
        "No capítulo final, o reencontro de Carlos e Ega com Lisboa e com lugares conhecidos permite avaliar a passagem do tempo e o percurso das personagens. O desfecho é especialmente fértil em ironia e contraste entre ideias proclamadas e ações. Analisa o final como releitura do romance, não apenas como informação sobre o que aconteceu depois."
      ],
      signals:[
        "Ramalhete e Lisboa: espaço físico com memória e função narrativa.",
        "Narrador: observa como descrição e ironia orientam o leitor.",
        "Desfecho: regresso aos lugares permite confrontar passado, presente, discurso e ação."
      ],
      example:{
        title:"Exemplo de resposta · função do espaço no final",
        prompt:"Carlos regressa a um espaço associado ao passado. Como explicas a função desse regresso?",
        steps:[
          "Identifica o espaço e o que representava anteriormente.",
          "Observa as mudanças físicas ou a reação das personagens.",
          "Explica como a comparação entre tempos produz memória ou avaliação.",
          "Relaciona o efeito com o balanço do percurso das personagens."
        ],
        modelAnswer:"O regresso ao espaço permite confrontar o presente com aquilo que as personagens viveram e projetaram anteriormente. As mudanças observadas e a reação de Carlos transformam o lugar num suporte de memória e avaliação, fazendo do desfecho uma releitura crítica do percurso pessoal e social representado no romance.",
        note:"Evita atribuir a um espaço um significado universal desligado da cena concreta."
      },
      remember:"Em Os Maias, os espaços ajudam o narrador a tornar visível o tempo, a sociedade e a memória.",
      pitfalls:[
        "Aplicar símbolos decorados a qualquer referência ao Ramalhete.",
        "Ignorar o tom do narrador.",
        "Tratar o capítulo final como simples epílogo informativo."
      ]
    },
    {
      id:"pt11-eca-ramires-dupla-narrativa",
      kicker:"6 · A ILUSTRE CASA DE RAMIRES · PRESENTE E NOVELA HISTÓRICA",
      title:"Gonçalo escreve o passado heroico dos Ramires enquanto tenta construir o próprio presente",
      paragraphs:[
        "A Ilustre Casa de Ramires articula a vida de Gonçalo Mendes Ramires com a novela histórica que ele escreve, A Torre de D. Ramires. Essa narrativa inserida recupera antepassados medievais, em particular Tructesindo Mendes Ramires, e cria um segundo plano temporal dentro do romance.",
        "A relação entre os dois planos é crítica. Gonçalo admira força, honra e independência nos antepassados, mas o presente expõe hesitações, interesses, dependências e momentos de cobardia. O contraste permite que o passado funcione simultaneamente como modelo, peso familiar e espelho irónico das fragilidades do protagonista.",
        "A escrita da novela também faz parte da caracterização de Gonçalo. Os entusiasmos, bloqueios, imitação de modelos históricos e desejo de publicação relacionam literatura, prestígio social e ambição política. Por isso, a novela inserida não deve ser estudada como história medieval autónoma: ela comenta o próprio Gonçalo."
      ],
      signals:[
        "Ação principal: Gonçalo no século XIX; narrativa inserida: A Torre de D. Ramires.",
        "Tructesindo e antepassados → modelo heroico; Gonçalo → presente contraditório.",
        "Escrever a novela liga memória familiar, notoriedade e projeto político."
      ],
      example:{
        title:"Exemplo de resposta · função da narrativa inserida",
        prompt:"Porque não deves resumir A Torre de D. Ramires como se fosse independente do romance?",
        steps:[
          "Identifica que a novela é escrita por Gonçalo dentro da ação principal.",
          "Seleciona um valor atribuído aos antepassados.",
          "Compara-o com uma atitude de Gonçalo no presente.",
          "Explica como o contraste caracteriza o protagonista e problematiza a herança familiar."
        ],
        modelAnswer:"A novela histórica integra a caracterização de Gonçalo porque o passado heroico que ele narra funciona como termo de comparação para o seu comportamento presente. A distância entre os valores atribuídos aos antepassados e as hesitações do fidalgo produz ironia e transforma a escrita numa procura de identidade e prestígio.",
        note:"O plano medieval só ganha todo o sentido quando o relacionas com o narrador-escritor Gonçalo."
      },
      remember:"Em A Ilustre Casa de Ramires, o passado escrito por Gonçalo comenta o homem que Gonçalo é no presente.",
      pitfalls:[
        "Estudar A Torre de D. Ramires como obra separada.",
        "Idealizar os antepassados sem considerar a ironia do contraste.",
        "Esquecer que a escrita serve também ambições sociais e políticas."
      ]
    },
    {
      id:"pt11-eca-ramires-identidade",
      kicker:"7 · A ILUSTRE CASA DE RAMIRES · GONÇALO, POLÍTICA E IDENTIDADE",
      title:"A personagem cresce entre fraqueza, ambição, memória familiar e desejo de afirmação",
      paragraphs:[
        "Gonçalo é deliberadamente contraditório. Pode ser generoso e vaidoso, cordial e oportunista, medroso num momento e capaz de ação noutro. Essa oscilação impede uma caracterização plana. O narrador explora a distância entre a grandeza histórica do nome Ramires e os comportamentos concretos do último fidalgo da Torre.",
        "A ambição política participa nessa contradição. A procura de notoriedade literária e de eleição para deputado relaciona identidade privada com reconhecimento público. As alianças, conveniências e mudanças de atitude permitem observar criticamente mecanismos da vida política e provincial da Regeneração.",
        "A ida para África e o regresso posterior introduzem a questão da transformação de Gonçalo. O final não precisa de ser lido como conversão simples de cobarde em herói: interessa avaliar que mudanças o texto sugere, que ambiguidades permanecem e como a personagem pode funcionar como imagem problemática de Portugal, entre passado ilustre, fragilidade presente e desejo de renovação."
      ],
      signals:[
        "Gonçalo: caracteriza por contradições demonstradas em ações diferentes.",
        "Política: observa relação entre ambição, prestígio, conveniência e discurso público.",
        "África e regresso: analisa transformação sem apagar a ambiguidade irónica."
      ],
      example:{
        title:"Exemplo de resposta · personagem contraditória",
        prompt:"Um item pede que caracterizes Gonçalo a partir de dois comportamentos aparentemente incompatíveis. Como respondes?",
        steps:[
          "Identifica os dois comportamentos concretos.",
          "Explica o valor ou motivação visível em cada um.",
          "Mostra que a contradição faz parte da construção da personagem.",
          "Relaciona-a com a distância entre a herança ilustre e o presente do fidalgo."
        ],
        modelAnswer:"Os dois comportamentos não anulam um ao outro; revelam a complexidade de Gonçalo. A personagem oscila entre o desejo de estar à altura do nome familiar e atitudes condicionadas por medo, vaidade ou conveniência, permitindo ao narrador explorar ironicamente a distância entre a grandeza herdada e o mérito efetivamente demonstrado.",
        note:"Evita decidir demasiado cedo que Gonçalo é apenas cobarde, apenas oportunista ou finalmente herói."
      },
      remember:"Gonçalo interessa porque muda e se contradiz; a ironia nasce muitas vezes dessa instabilidade.",
      pitfalls:[
        "Reduzir Gonçalo a um único adjetivo.",
        "Ler o final como transformação moral totalmente inequívoca.",
        "Separar política, escrita e memória familiar quando o romance as articula."
      ]
    },
    {
      id:"pt11-eca-resposta",
      kicker:"8 · RESPOSTA DE EXAME E COMPARAÇÃO",
      title:"Começa pela alternativa e pelo excerto: depois mobiliza a obra integral",
      paragraphs:[
        "Antes de responder, identifica se o item trabalha Os Maias ou A Ilustre Casa de Ramires. Não importes automaticamente personagens, episódios ou conceitos específicos da outra alternativa. O conhecimento da obra integral serve para contextualizar o excerto certo, não para mostrar tudo o que sabes sobre Eça.",
        "A cadeia mais segura é ideia → evidência → mecanismo narrativo → significado crítico. A evidência pode ser uma decisão, descrição, comentário do narrador, fala, espaço, contraste, sinal trágico ou relação entre dois planos narrativos. O mecanismo explica como essa marca produz o efeito pedido.",
        "Se houver comparação, define um critério comum: ironia, representação social, identidade, relação passado-presente, protagonista e sociedade, por exemplo. Depois usa uma evidência de cada texto e explicita semelhança e diferença. Comparar duas obras de Eça não significa presumir que funcionam da mesma maneira."
      ],
      signals:[
        "Alternativa correta primeiro: Os Maias OU A Ilustre Casa de Ramires.",
        "Estrutura: ideia → evidência → mecanismo narrativo → significado crítico.",
        "Comparação: critério comum + evidência de cada obra + relação explícita."
      ],
      example:{
        title:"Exemplo de resposta · ironia em duas obras",
        prompt:"Como compararias o uso da ironia sem fazer dois resumos?",
        steps:[
          "Define o critério: distância entre imagem pública ou ideal e comportamento real.",
          "Em Os Maias, seleciona uma personagem ou episódio social em que essa discrepância seja visível.",
          "Em A Ilustre Casa de Ramires, seleciona uma contradição de Gonçalo perante o passado ilustre.",
          "Explica a semelhança do mecanismo e a diferença dos alvos ou contextos."
        ],
        modelAnswer:"Nas duas obras, a ironia pode nascer da distância entre a imagem valorizada e a prática efetiva. Em Os Maias, essa discrepância expõe frequentemente hábitos ou instituições da sociedade lisboeta; em A Ilustre Casa de Ramires, incide de modo particular sobre Gonçalo e sobre a distância entre a herança heroica que celebra e os seus comportamentos presentes. O mecanismo aproxima as obras, mas os alvos concretos diferem.",
        note:"Uma comparação forte estabelece relação; não justapõe duas fichas de leitura."
      },
      remember:"Eça lê-se melhor pela discrepância: imagem → comportamento → ironia → crítica.",
      pitfalls:[
        "Misturar as duas alternativas numa resposta sobre uma só obra.",
        "Responder com resumo em vez de analisar o mecanismo pedido.",
        "Usar «crítica social» como conclusão sem identificar o alvo."
      ]
    }
  ]
};

export function portugueseEca11DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ECA_11_DEEP_REVIEW.id?PORTUGUESE_ECA_11_DEEP_REVIEW:null;
}
