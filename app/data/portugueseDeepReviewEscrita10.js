export const PORTUGUESE_ESCRITA_10_DEEP_REVIEW_VERSION="2026.10-wave7";

export const PORTUGUESE_ESCRITA_10_DEEP_REVIEW={
  id:"pt10-escrita",
  title:"Escrita · síntese, exposição e apreciação crítica",
  lead:"Escrever bem não é produzir um texto longo nem usar palavras difíceis. É cumprir o género pedido, selecionar conteúdo pertinente, organizar uma progressão clara e rever o texto até que as relações entre ideias sejam inequívocas. No 10.º ano, o núcleo curricular inclui síntese, exposição sobre um tema e apreciação crítica, trabalhando planificação, textualização, coerência, coesão e revisão.",
  goals:[
    "Distinguir síntese, exposição sobre um tema e apreciação crítica pelas respetivas finalidades e marcas estruturais.",
    "Planificar antes de escrever, escolhendo conteúdo, ordem, objetivo, destinatário e organização em parágrafos.",
    "Construir progressão temática, coerência e coesão sem depender de conectores artificiais ou frases excessivamente longas.",
    "Fundamentar avaliações e explicações com aspetos relevantes, exemplos e relações claras entre ideias.",
    "Rever conteúdo, estrutura, vocabulário, pontuação e correção linguística como etapas distintas do mesmo processo.",
    "Adaptar a escrita às exigências da prova 639, incluindo género, tema, extensão e qualidade discursiva."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 10.º ano · agosto de 2018 · referencial homologado em vigor · domínio Escrita",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026 · resposta restrita e resposta extensa; 200 a 350 palavras na resposta extensa, exceto síntese",
    "IAVE/EduQA · Prova 639 · 1.ª fase · 2026 · critérios de apreciação crítica usados como referência de exigência discursiva"
  ],
  sections:[
    {
      id:"pt10-escrita-processo",
      kicker:"1 · PROCESSO DE ESCRITA",
      title:"Planear, escrever e rever são três decisões diferentes — e todas contam",
      paragraphs:[
        "Antes de redigir, identifica o género, o tema, o objetivo e o destinatário. A planificação deve transformar o enunciado numa lista curta de tarefas: que conteúdo é obrigatório, que ideias precisam de desenvolvimento e que ordem permite ao leitor acompanhar o raciocínio. Começar imediatamente pela primeira frase aumenta o risco de repetição, desequilíbrio e fuga ao tema.",
        "Durante a textualização, cada parágrafo deve ter uma função reconhecível. Uma ideia principal pode ser desenvolvida por explicação, exemplo, causa, consequência, contraste ou avaliação. O objetivo não é fazer parágrafos todos iguais, mas evitar blocos que acumulam assuntos sem relação explícita ou frases isoladas que interrompem a progressão.",
        "A revisão deve ocorrer em duas passagens. Primeiro revê conteúdo e estrutura: respondi ao tema, cumpri o género, falta alguma ideia, repeti-me? Depois revê a linguagem: referências claras, conectores funcionais, vocabulário preciso, concordância, regência, pontuação e ortografia. Corrigir apenas gralhas não resolve um texto mal organizado."
      ],
      signals:[
        "Transforma o enunciado em requisitos concretos antes de escrever.",
        "Dá a cada parágrafo uma função na progressão do texto.",
        "Revê primeiro sentido e estrutura; só depois faz a revisão linguística fina."
      ],
      example:{
        title:"Exemplo de método · planificar em menos de um minuto",
        prompt:"Tens de escrever uma apreciação crítica de uma imagem. Como evitas começar sem direção?",
        steps:[
          "Sublinha o género e os elementos obrigatórios do enunciado.",
          "Escolhe os aspetos concretos da imagem que vais comentar e formula uma avaliação global.",
          "Ordena: apresentação/descrição relevante → aspetos avaliados e fundamentação → conclusão.",
          "Reserva uma última etapa para verificar se cada comentário crítico está ligado a um elemento observável."
        ],
        modelAnswer:"A planificação não precisa de ser extensa: basta definir o foco, selecionar os aspetos relevantes, decidir a ordem e antecipar a conclusão. Essa estrutura impede que a descrição ocupe todo o texto e garante espaço para a apreciação fundamentada.",
        note:"Um bom plano é curto e operacional. Se já parece um texto completo, provavelmente estás a gastar demasiado tempo antes da redação."
      },
      remember:"O plano decide o percurso; a redação concretiza-o; a revisão verifica se o leitor consegue seguir esse percurso sem adivinhar relações.",
      pitfalls:[
        "Começar por uma introdução genérica antes de perceber exatamente o que o enunciado pede.",
        "Rever apenas ortografia e ignorar repetições, saltos lógicos ou ideias por desenvolver.",
        "Usar parágrafos apenas para dividir visualmente o texto, sem função discursiva clara."
      ]
    },
    {
      id:"pt10-escrita-sintese",
      kicker:"2 · SÍNTESE",
      title:"Reduzir é selecionar e reorganizar — não cortar frases ao acaso",
      paragraphs:[
        "A síntese conserva a informação essencial de um texto ou conjunto de informações, reduzindo detalhes secundários, exemplos dispensáveis e repetições. Para a construir, primeiro identifica tema, ideias principais e relações entre elas. Só depois decides o que pode desaparecer sem deformar o sentido global.",
        "Uma boa síntese reformula. Copiar segmentos sucessivos pode produzir um texto mais curto, mas não demonstra hierarquização nem garante coerência. Parafrasear significa preservar o conteúdo essencial com formulação própria e ligar as ideias segundo a estrutura lógica que importa manter.",
        "A síntese deve ser fiel: não acrescenta opinião pessoal, avaliação, informação exterior nem conclusões que o texto de partida não apresenta. Também não precisa de conservar todos os exemplos. O critério é funcional: se retirar um detalhe não altera a compreensão da ideia principal, esse detalhe pode ser candidato à eliminação."
      ],
      signals:[
        "Distingue ideia principal de exemplo, explicação acessória e repetição.",
        "Reformula com palavras próprias sem alterar relações de causa, contraste ou consequência.",
        "Mantém neutralidade: síntese não é comentário nem apreciação."
      ],
      example:{
        title:"Exemplo de resposta · decidir o que fica",
        prompt:"Um parágrafo apresenta uma ideia geral e três exemplos semelhantes. O que deves fazer numa síntese curta?",
        steps:[
          "Formula a ideia geral numa frase clara.",
          "Verifica se algum exemplo acrescenta informação indispensável à compreensão.",
          "Elimina exemplos redundantes ou substitui-os por uma formulação mais geral.",
          "Confirma que a relação lógica original não foi alterada pela redução."
        ],
        modelAnswer:"A síntese deve conservar a ideia geral e apenas o exemplo que seja indispensável para a compreender; quando os três exemplos cumprem a mesma função, podem ser omitidos ou condensados numa formulação mais geral. O essencial é preservar a hierarquia e a relação entre as ideias do texto de partida.",
        note:"Menos palavras não significam automaticamente melhor síntese: cortar uma causa ou uma condição importante pode tornar o texto infiel."
      },
      remember:"Síntese = seleção + hierarquia + reformulação + fidelidade. Opinião pessoal fica de fora.",
      pitfalls:[
        "Colar frases do texto de partida sem as reorganizar.",
        "Eliminar conectores ou relações lógicas e deixar apenas uma lista de informações.",
        "Acrescentar comentário pessoal para «completar» o texto."
      ]
    },
    {
      id:"pt10-escrita-exposicao",
      kicker:"3 · EXPOSIÇÃO SOBRE UM TEMA",
      title:"Explicar exige uma linha de desenvolvimento, não uma coleção de factos",
      paragraphs:[
        "A exposição sobre um tema apresenta conhecimento de forma clara e organizada. O primeiro passo é definir o foco: um tema amplo precisa de ser transformado numa questão ou eixo de desenvolvimento. Depois seleciona informação pertinente e ordena-a de modo que cada parte prepare a seguinte.",
        "O desenvolvimento pode recorrer a definição, explicação, exemplificação, comparação, causa e consequência ou classificação. Estes processos não são uma lista obrigatória; escolhem-se porque ajudam a esclarecer o tema. Um exemplo só é útil quando o leitor percebe que ideia está a concretizar.",
        "A conclusão deve fechar o percurso realizado, não introduzir subitamente uma ideia nova. Pode sintetizar a relação principal, retirar uma consequência ou retomar o foco inicial. Em contexto escolar ou de exame, a clareza e a pertinência são mais importantes do que uma linguagem artificialmente solene."
      ],
      signals:[
        "Define o foco antes de selecionar informação.",
        "Organiza o desenvolvimento por relações: definição, causa, consequência, comparação, exemplo ou explicação.",
        "Faz a conclusão responder ao percurso do texto, sem abrir um tema novo."
      ],
      example:{
        title:"Exemplo de resposta · do tópico ao desenvolvimento",
        prompt:"Tens de expor dois efeitos de uma determinada mudança social. Como estruturas o desenvolvimento?",
        steps:[
          "Apresenta brevemente a mudança e delimita o foco nos dois efeitos pedidos.",
          "Dedica um núcleo de desenvolvimento a cada efeito.",
          "Explica a relação causal e usa um exemplo pertinente quando ajuda a concretizar.",
          "Conclui articulando os dois efeitos com o tema inicial."
        ],
        modelAnswer:"Uma exposição clara anuncia o foco, desenvolve cada efeito separadamente e explica a relação entre a mudança e as consequências apresentadas. Os exemplos devem concretizar as ideias, e a conclusão deve reunir o percurso sem repetir palavra por palavra a introdução.",
        note:"Se o enunciado pede dois aspetos, certifica-te de que ambos recebem desenvolvimento real e não apenas uma referência passageira."
      },
      remember:"Na exposição, o leitor deve conseguir responder a três perguntas: sobre o quê, em que ordem e com que relação entre as ideias?",
      pitfalls:[
        "Transformar exposição em enumeração de factos sem relações explícitas.",
        "Usar exemplos interessantes mas pouco ligados ao foco pedido.",
        "Introduzir na conclusão uma ideia que não foi preparada no desenvolvimento."
      ]
    },
    {
      id:"pt10-escrita-apreciacao",
      kicker:"4 · APRECIAÇÃO CRÍTICA",
      title:"Descrever o objeto é ponto de partida; avaliar e fundamentar é o centro do género",
      paragraphs:[
        "A apreciação crítica apresenta um objeto e formula sobre ele um juízo fundamentado. A descrição é necessária quando fornece ao leitor os elementos que serão avaliados, mas não deve ocupar todo o texto. Depois de selecionar aspetos relevantes, explica por que razão funcionam bem, mal ou de forma ambivalente segundo critérios reconhecíveis.",
        "O discurso valorativo pode ser explícito ou implícito, mas precisa de fundamentação. Dizer «a imagem é impactante» não chega; é necessário explicar que composição, contraste, símbolo, escolha verbal ou relação entre elementos produz esse efeito. O mesmo princípio vale para livros, espetáculos, filmes ou outros objetos de apreciação.",
        "Uma posição crítica pode ter nuance. Reconhecer uma qualidade e, ao mesmo tempo, apontar uma limitação não enfraquece a resposta quando os dois juízos são coerentes e fundamentados. O que prejudica o texto é a sucessão de gostos pessoais sem critérios ou de descrições sem avaliação."
      ],
      signals:[
        "Seleciona apenas os elementos descritivos que vão sustentar a avaliação.",
        "Liga cada juízo a um aspeto concreto e explica o efeito produzido.",
        "Usa uma conclusão que sintetize a posição crítica global, incluindo nuances quando existirem."
      ],
      example:{
        title:"Exemplo de resposta · comentário crítico fundamentado",
        prompt:"Uma imagem usa forte contraste de escala para representar um problema social. Como passas da descrição à apreciação?",
        steps:[
          "Descreve brevemente a diferença de escala relevante.",
          "Interpreta o efeito desse contraste na representação do problema.",
          "Formula um juízo sobre a eficácia da escolha visual.",
          "Fundamenta esse juízo mostrando como o recurso orienta a atenção ou intensifica a mensagem."
        ],
        modelAnswer:"O contraste de escala destaca visualmente a desigualdade representada e torna imediata a relação de desproporção entre os elementos. A opção é eficaz porque transforma uma ideia abstrata numa oposição visual facilmente reconhecível, reforçando o impacto crítico da imagem sem depender de uma explicação verbal extensa.",
        note:"Descrição e avaliação devem estar ligadas. Um catálogo visual seguido de «gostei» não constitui apreciação crítica."
      },
      remember:"Apreciação crítica = elemento observado → interpretação → juízo → fundamentação.",
      pitfalls:[
        "Usar a maior parte do texto para descrever e deixar a avaliação para duas frases finais.",
        "Confundir gosto pessoal com fundamentação crítica.",
        "Repetir vários adjetivos valorativos sem explicar o que os justifica."
      ]
    },
    {
      id:"pt10-escrita-coesao",
      kicker:"5 · COERÊNCIA, COESÃO E PARÁGRAFO",
      title:"Um texto é coeso quando as ligações são claras — não quando tem muitos conectores",
      paragraphs:[
        "A coerência diz respeito à compatibilidade e progressão das ideias; a coesão torna visíveis as ligações linguísticas entre partes do texto. Pronomes, repetições controladas, substituições lexicais, conectores, tempos verbais e relações referenciais ajudam o leitor a perceber quem ou o que está em causa e como uma ideia se liga à anterior.",
        "Os conectores devem expressar a relação que realmente existe. «Porém» não melhora um texto se não houver contraste; «portanto» exige uma consequência; «além disso» acrescenta informação. Variar conectores pode ser útil, mas escolher o valor certo é mais importante do que evitar qualquer repetição.",
        "O parágrafo organiza unidades de desenvolvimento. Quando muda a ideia principal ou a função discursiva, pode justificar-se um novo parágrafo; quando uma frase apenas explica ou exemplifica a anterior, separá-la pode fragmentar o raciocínio. A revisão deve testar se cada parágrafo tem unidade interna e uma ligação compreensível ao seguinte."
      ],
      signals:[
        "Confirma se referências como ele, este, isso ou essa ideia têm antecedente inequívoco.",
        "Escolhe conectores pelo valor lógico, não pela aparência de formalidade.",
        "Verifica se cada parágrafo desenvolve uma unidade e prepara a progressão para a seguinte."
      ],
      example:{
        title:"Exemplo de revisão · corrigir um salto lógico",
        prompt:"Dois parágrafos tratam temas relacionados, mas o segundo começa como se a ligação fosse óbvia. O que fazes?",
        steps:[
          "Identifica a relação real entre os dois núcleos: continuação, contraste, causa, consequência ou mudança de foco.",
          "Confirma se a última frase do primeiro parágrafo prepara essa relação.",
          "Reformula a abertura do segundo ou acrescenta um conector apenas se ele representar corretamente o vínculo.",
          "Relê os dois parágrafos em sequência para testar se a progressão ficou clara."
        ],
        modelAnswer:"A correção deve tornar explícita a relação lógica entre os parágrafos, mas não exige necessariamente acrescentar um conector. Por vezes basta reformular a frase inicial do segundo parágrafo para retomar a ideia anterior e mostrar de que modo o novo núcleo a desenvolve ou contrasta com ela.",
        note:"Coesão não é decoração. Um conector errado pode tornar o raciocínio menos claro do que a ausência de conector."
      },
      remember:"Liga ideias pelo sentido primeiro; só depois escolhe os recursos linguísticos que tornam essa ligação visível.",
      pitfalls:[
        "Começar muitos parágrafos com conectores diferentes apenas para parecer variado.",
        "Usar pronomes ou demonstrativos cujo referente pode ser mais do que uma ideia.",
        "Misturar vários núcleos temáticos no mesmo parágrafo sem hierarquia."
      ]
    },
    {
      id:"pt10-escrita-exame",
      kicker:"6 · ESCRITA NA PROVA 639",
      title:"Cumprir género, tema e extensão é parte da resposta — não uma formalidade exterior",
      paragraphs:[
        "A Informação-Prova 639 de 2026 prevê itens de resposta restrita e um item de resposta extensa. Este último indica género, tema e extensão: entre 200 e 350 palavras, exceto quando o género é síntese, caso em que se aplicam regras específicas. Antes de escrever, transforma estas instruções em critérios de controlo do teu texto.",
        "Os critérios de classificação valorizam o cumprimento do género e a estruturação temática e discursiva, além da correção linguística. Na apreciação crítica pedida na 1.ª fase de 2026, por exemplo, não bastava descrever a imagem: era necessário construir comentário crítico fundamentado em aspetos relevantes e concluir de forma adequada. O detalhe concreto varia de prova para prova; o princípio mantém-se: cada exigência do enunciado tem de aparecer efetivamente no texto.",
        "A gestão final deve reservar tempo para verificar quatro níveis: cumprimento do género, resposta ao tema, progressão e fundamentação, e correção linguística. Se o texto ultrapassa ou não atinge a extensão pedida, a solução não é cortar ou acrescentar frases aleatórias: revê a hierarquia e decide que desenvolvimento é essencial."
      ],
      signals:[
        "Antes de redigir, anota género, tema, elementos obrigatórios e limite de extensão.",
        "No final, confirma cada requisito do enunciado um a um.",
        "Revê conteúdo e estrutura antes de gastar tempo a aperfeiçoar palavras isoladas."
      ],
      example:{
        title:"Exemplo de controlo final · lista de requisitos",
        prompt:"Terminaste uma resposta extensa dentro do limite de palavras. O que verificas antes de entregar?",
        steps:[
          "Confirma que o género pedido é reconhecível pela estrutura e pelo tipo de desenvolvimento.",
          "Compara o texto com todos os pontos obrigatórios do enunciado.",
          "Verifica se os aspetos desenvolvidos estão fundamentados e ligados ao foco.",
          "Faz uma última leitura para referências, conectores, pontuação, concordância e ortografia."
        ],
        modelAnswer:"O controlo final deve começar pelo cumprimento da tarefa: género, tema e elementos pedidos. Depois verifica-se se o desenvolvimento é coerente e suficientemente fundamentado e, só então, faz-se a revisão linguística. Estar dentro do limite de palavras não compensa a ausência de um requisito essencial.",
        note:"Não memorizes uma receita fixa para todas as respostas extensas; lê sempre os requisitos concretos do enunciado."
      },
      remember:"Na prova, cada instrução do enunciado é uma obrigação editorial do teu texto: cumpre-a, desenvolve-a e revê-a.",
      pitfalls:[
        "Usar uma introdução decorada que não ajuda a responder ao tema concreto.",
        "Cumprir o número de palavras mas esquecer um dos aspetos obrigatórios.",
        "Cortar aleatoriamente o texto para reduzir extensão e destruir ligações importantes."
      ]
    }
  ]
};

export function portugueseEscrita10DeepReviewFor(unitId){
  return unitId===PORTUGUESE_ESCRITA_10_DEEP_REVIEW.id?PORTUGUESE_ESCRITA_10_DEEP_REVIEW:null;
}
