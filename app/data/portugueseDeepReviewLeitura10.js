export const PORTUGUESE_LEITURA_10_DEEP_REVIEW_VERSION="2026.10-wave6";

export const PORTUGUESE_LEITURA_10_DEEP_REVIEW={
  id:"pt10-leitura",
  title:"Leitura · géneros do 10.º ano",
  lead:"Ler bem no secundário não é apenas localizar frases no texto. É distinguir informação explícita de inferência, reconstruir a organização, identificar pontos de vista e explicar como escolhas verbais ou visuais constroem sentido. No 10.º ano, este trabalho faz-se sobretudo através do relato de viagem, da exposição sobre um tema, da apreciação crítica e do cartoon.",
  goals:[
    "Distinguir informação explícita, inferência e conclusão não sustentada, usando sempre pistas do texto.",
    "Reconstruir tema, ideias principais, organização interna e progressão de um texto sem confundir detalhe com ideia central.",
    "Ler relato de viagem, exposição sobre um tema, apreciação crítica e cartoon segundo as características que realmente ajudam a compreender o sentido.",
    "Relacionar linguagem verbal, organização e elementos visuais com intenção, ponto de vista e efeito no leitor.",
    "Responder a itens de seleção e de resposta restrita com precisão, evidência e justificação suficiente."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Português · 10.º ano · agosto de 2018 · referencial homologado em vigor · domínio Leitura",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026 · Leitura avaliada por itens de seleção ou construção a partir de géneros previstos nas AE"
  ],
  sections:[
    {
      id:"pt10-leitura-metodo",
      kicker:"1 · MÉTODO DE LEITURA",
      title:"Do que o texto diz ao que o texto permite concluir",
      paragraphs:[
        "Uma leitura rigorosa começa por separar três níveis. A informação explícita está diretamente formulada; a inferência resulta da combinação de pistas textuais; uma conclusão não sustentada acrescenta uma ideia que o texto não autoriza. Em exame, muitos erros surgem quando uma possibilidade plausível é tratada como se fosse uma conclusão obrigatória.",
        "Tema, ideia principal e detalhe também não são equivalentes. O tema indica a área geral de que o texto trata; a ideia principal exprime o que o texto afirma ou desenvolve sobre esse tema; exemplos, dados, descrições e episódios podem apoiar essa ideia sem terem a mesma importância estrutural. Para reconstruir o sentido global, pergunta que função cada segmento desempenha no conjunto.",
        "A organização interna ajuda a ler. Mudanças de parágrafo, conectores, reformulações, exemplos, causas, consequências, contrastes e conclusões revelam a progressão do texto. Uma resposta forte não aponta apenas uma palavra: mostra a relação entre a pista escolhida e a interpretação que dela resulta."
      ],
      signals:[
        "Marca mentalmente o que é explícito antes de inferir.",
        "Distingue tema, ideia principal e informação de apoio.",
        "Procura relações entre segmentos: causa, consequência, contraste, exemplo, explicação ou conclusão."
      ],
      example:{
        title:"Exemplo de resposta · inferência sustentada",
        prompt:"Um texto nunca afirma que o autor desaprova uma decisão, mas acumula consequências negativas e termina com uma pergunta irónica. Como justificas essa leitura?",
        steps:[
          "Formula a inferência com prudência: o texto sugere uma posição crítica.",
          "Seleciona duas pistas convergentes, por exemplo a sequência de consequências negativas e a pergunta final.",
          "Explica como essas pistas orientam o leitor para uma avaliação desfavorável.",
          "Evita atribuir ao autor intenções adicionais que o texto não sustenta."
        ],
        modelAnswer:"O texto sugere uma perspetiva crítica sobre a decisão, porque associa a medida a várias consequências negativas e fecha a reflexão com uma pergunta de valor irónico. Essas pistas convergem para uma avaliação desfavorável, mesmo sem existir uma frase explícita de condenação.",
        note:"Inferir não é adivinhar: quanto mais indireta for a conclusão, mais clara deve ser a evidência que a sustenta."
      },
      remember:"A melhor inferência é aquela que consegues reconstruir passo a passo a partir de pistas observáveis no texto.",
      pitfalls:[
        "Escolher uma opção porque parece verdadeira no mundo real, embora não seja sustentada pelo texto.",
        "Confundir um exemplo marcante com a ideia principal do texto.",
        "Citar uma pista sem explicar a relação entre essa pista e a conclusão."
      ]
    },
    {
      id:"pt10-leitura-relato",
      kicker:"2 · RELATO DE VIAGEM",
      title:"Percurso, observação e perspetiva constroem a experiência da viagem",
      paragraphs:[
        "No relato de viagem, a progressão espacial e temporal costuma organizar a experiência narrada. Locais, deslocações, momentos e encontros podem funcionar como eixo do texto, mas não basta enumerá-los: interessa perceber que acontecimentos são selecionados e que imagem do espaço ou da experiência vai sendo construída.",
        "O relato pode combinar narração, descrição, informação e comentário pessoal. Uma passagem descritiva pode revelar mais do que aparência física; as escolhas lexicais, comparações e avaliações mostram frequentemente a perspetiva de quem observa. Distinguir observação de avaliação ajuda a perceber até que ponto o texto apresenta um lugar e até que ponto o interpreta.",
        "A voz que relata seleciona o que considera relevante. Por isso, duas viagens pelo mesmo espaço poderiam produzir textos muito diferentes. Ao analisar um excerto, relaciona o percurso com a perspetiva: que aspetos são destacados, que emoções ou juízos surgem e como esses elementos orientam a imagem final da viagem."
      ],
      signals:[
        "Segue marcas de tempo, espaço e deslocação para reconstruir o percurso.",
        "Distingue descrição observável de comentário ou avaliação do relator.",
        "Relaciona escolhas de detalhe e vocabulário com a perspetiva sobre o lugar visitado."
      ],
      example:{
        title:"Exemplo de resposta · descrição e ponto de vista",
        prompt:"Um excerto descreve uma cidade através de pormenores visuais e, ao mesmo tempo, usa adjetivos avaliativos. O que deves mostrar?",
        steps:[
          "Identifica os elementos que permitem visualizar o espaço.",
          "Separa esses elementos das palavras que exprimem avaliação.",
          "Explica que a descrição não é neutra quando incorpora juízos do relator.",
          "Relaciona essa combinação com a imagem global construída da cidade."
        ],
        modelAnswer:"O espaço é construído por pormenores concretos que permitem ao leitor visualizar a cidade, mas a presença de vocabulário avaliativo revela também a perspetiva do relator. Assim, o texto não se limita a registar o lugar: apresenta-o através de uma experiência subjetiva que orienta a imagem recebida pelo leitor.",
        note:"Não confundas relato de viagem com simples enumeração cronológica; o modo de observar e selecionar também produz sentido."
      },
      remember:"Num relato de viagem, pergunta sempre onde se está, o que muda no percurso e que olhar transforma o espaço em experiência.",
      pitfalls:[
        "Resumir o itinerário sem analisar a perspetiva do relator.",
        "Tratar todos os adjetivos como meramente descritivos quando alguns exprimem avaliação.",
        "Concluir que um relato é objetivo apenas porque inclui dados concretos."
      ]
    },
    {
      id:"pt10-leitura-exposicao",
      kicker:"3 · EXPOSIÇÃO SOBRE UM TEMA",
      title:"A informação ganha clareza quando consegues reconstruir a sua hierarquia",
      paragraphs:[
        "Uma exposição sobre um tema procura apresentar e desenvolver conhecimento de forma organizada. O texto pode definir conceitos, explicar processos, estabelecer relações de causa e consequência, apresentar classificações ou recorrer a exemplos. A compreensão depende de perceber qual é o núcleo de informação e que elementos o esclarecem ou desenvolvem.",
        "A organização costuma ser visível em títulos, parágrafos, conectores e sequências explicativas. Expressões como «por exemplo», «isto é», «por esse motivo» ou «em contraste» ajudam a identificar funções diferentes. Em vez de decorar listas de conectores, usa-os como pistas para reconstruir a relação lógica entre ideias.",
        "Resumir uma exposição exige hierarquizar. Uma boa síntese mental conserva o tema, as ideias principais e as relações essenciais, eliminando repetições e exemplos dispensáveis. Se um item pede a função de um exemplo, responde pelo papel que ele desempenha — ilustrar, concretizar ou comprovar — e não pelo seu conteúdo isolado."
      ],
      signals:[
        "Identifica o tema e os subtemas antes de recolher detalhes.",
        "Associa definições, explicações, exemplos e dados à ideia que desenvolvem.",
        "Usa conectores e organização dos parágrafos para reconstruir a progressão lógica."
      ],
      example:{
        title:"Exemplo de resposta · função de um exemplo",
        prompt:"Depois de explicar um conceito abstrato, o texto apresenta um caso concreto. Como justificas a função desse segmento?",
        steps:[
          "Localiza a ideia geral imediatamente antes do exemplo.",
          "Identifica no caso concreto os elementos que correspondem ao conceito.",
          "Explica que o exemplo torna a ideia mais concreta ou verificável.",
          "Não substituas a função do segmento por uma repetição do que ele conta."
        ],
        modelAnswer:"O caso concreto funciona como exemplificação da ideia apresentada anteriormente, porque transforma o conceito abstrato numa situação observável. Dessa forma, facilita a compreensão e mostra como a noção se aplica numa ocorrência específica.",
        note:"Quando te perguntam «para que serve este exemplo?», a resposta deve indicar a relação funcional com a ideia que ele apoia."
      },
      remember:"Numa exposição, lê em camadas: tema → ideia principal → desenvolvimento → exemplo ou dado de apoio.",
      pitfalls:[
        "Dar o mesmo peso a uma definição central e a um exemplo secundário.",
        "Identificar conectores sem explicar a relação lógica que assinalam.",
        "Confundir resumo com cópia de frases sucessivas do texto."
      ]
    },
    {
      id:"pt10-leitura-apreciacao",
      kicker:"4 · APRECIAÇÃO CRÍTICA",
      title:"Avaliar implica objeto, critério e fundamentação — não apenas gosto pessoal",
      paragraphs:[
        "Uma apreciação crítica combina apresentação do objeto com avaliação fundamentada. O autor pode referir características de uma obra, espetáculo, livro, filme ou outra produção e, a partir delas, formular um juízo. Para compreender o texto, distingue os momentos em que descreve ou informa daqueles em que avalia.",
        "A avaliação ganha consistência quando assenta em critérios reconhecíveis: construção, eficácia, originalidade, coerência, qualidade expressiva ou adequação, por exemplo. Um adjetivo valorativo mostra uma posição, mas não revela sozinho a fundamentação. Procura as razões, exemplos ou aspetos concretos usados para sustentar esse juízo.",
        "A perspetiva crítica pode ser globalmente favorável e incluir reservas, ou globalmente negativa e reconhecer qualidades. Evita reduzir o texto a «gostou» ou «não gostou». Reconstrói a posição com nuance e percebe como a organização dos argumentos conduz à avaliação final."
      ],
      signals:[
        "Separa apresentação do objeto, avaliação e razões que a sustentam.",
        "Procura critérios e exemplos concretos por trás de palavras valorativas.",
        "Reconhece concessões e reservas que tornam a posição mais complexa."
      ],
      example:{
        title:"Exemplo de resposta · opinião fundamentada",
        prompt:"O autor elogia uma obra, mas critica o seu final. Como caracterizas a posição global?",
        steps:[
          "Identifica a avaliação dominante ao longo do texto.",
          "Localiza a reserva específica relativa ao final.",
          "Explica que uma crítica parcial não anula necessariamente a apreciação global positiva.",
          "Sustenta a conclusão com os critérios ou razões apresentados."
        ],
        modelAnswer:"A apreciação é globalmente favorável, embora não seja incondicional. O autor valoriza vários aspetos da obra e fundamenta essa avaliação positivamente, mas introduz uma reserva específica sobre o final. A crítica pontual funciona, assim, como nuance da posição global e não como inversão completa do juízo.",
        note:"Uma apreciação crítica pode conter posições mistas; lê a hierarquia dos argumentos, não apenas a frase mais negativa."
      },
      remember:"Apreciação crítica = o que está a ser avaliado + como é avaliado + com que razões.",
      pitfalls:[
        "Confundir apreciação crítica com resumo do objeto avaliado.",
        "Tomar um adjetivo valorativo como argumento suficiente.",
        "Ignorar reservas ou concessões e transformar uma posição matizada numa resposta absoluta."
      ]
    },
    {
      id:"pt10-leitura-cartoon",
      kicker:"5 · CARTOON",
      title:"Imagem, palavra e ironia funcionam em conjunto para construir uma posição",
      paragraphs:[
        "No cartoon, o sentido nasce frequentemente da articulação entre elementos visuais e verbais. Personagens, objetos, tamanho, posição, símbolos, expressões faciais, legendas e balões podem cooperar ou entrar em contraste. Uma leitura completa não descreve apenas a imagem: explica a função desses elementos na construção da mensagem.",
        "Exagero, contraste, incongruência e ironia são mecanismos frequentes. A ironia não se prova dizendo apenas que «é engraçado»; é necessário mostrar a distância entre o que parece ser afirmado e o sentido crítico que o contexto produz. Também é importante identificar o alvo: comportamento, situação social, instituição, hábito ou ideia posta em causa.",
        "A informação contextual ajuda, mas a resposta tem de permanecer ancorada no cartoon apresentado. Se uma personagem aparece minúscula diante de um objeto desproporcionado, por exemplo, essa relação visual pode sugerir desigualdade, dependência ou perda de controlo — mas a interpretação final deve ser confirmada pelos restantes elementos da imagem e do texto."
      ],
      signals:[
        "Observa composição, escala, expressão, símbolos, legendas e balões antes de concluir.",
        "Explica a relação entre linguagem verbal e visual: reforço, contraste, contradição ou complemento.",
        "Identifica mecanismo crítico, alvo e ponto de vista, evitando interpretações desligadas da imagem."
      ],
      example:{
        title:"Exemplo de resposta · relação verbal-visual",
        prompt:"Uma personagem diz «tenho tudo sob controlo», enquanto a imagem mostra uma situação evidentemente caótica. Como analisas o efeito?",
        steps:[
          "Identifica o significado literal da fala.",
          "Descreve apenas o elemento visual necessário para mostrar o contrário.",
          "Explica o contraste entre discurso e imagem.",
          "Relaciona esse contraste com a ironia e com o alvo crítico sugerido pelo contexto."
        ],
        modelAnswer:"A fala afirma domínio da situação, mas a composição visual mostra precisamente o contrário. O contraste entre o enunciado verbal e a evidência da imagem produz ironia, porque desmente a segurança da personagem e permite criticar a sua incapacidade de reconhecer ou controlar o problema representado.",
        note:"Descrever todos os objetos do cartoon não aumenta a qualidade da resposta; seleciona os elementos que constroem o efeito pedido."
      },
      remember:"No cartoon, a pergunta central é: que relação entre imagem e palavra cria o sentido crítico?",
      pitfalls:[
        "Fazer uma descrição longa da imagem sem formular interpretação.",
        "Chamar «ironia» a qualquer situação cómica sem explicar o contraste que a produz.",
        "Usar conhecimento do tema para inventar uma intenção que os elementos do cartoon não sustentam."
      ]
    },
    {
      id:"pt10-leitura-exame",
      kicker:"6 · LEITURA EM EXAME",
      title:"Responde ao item, prova a leitura e elimina o que o texto não autoriza",
      paragraphs:[
        "Na prova 639, a Leitura pode ser avaliada por itens de seleção ou de construção, incluindo resposta restrita, sempre a partir de textos dos géneros previstos nas Aprendizagens Essenciais. Isso exige duas competências complementares: reconhecer com precisão a alternativa mais sustentada e formular justificações curtas quando a resposta tem de ser construída.",
        "Nos itens de seleção, testa cada opção contra o texto inteiro. Distratores frequentes podem repetir uma palavra do texto, transformar uma possibilidade em certeza, generalizar um exemplo ou acrescentar informação plausível mas ausente. A estratégia não é procurar a opção mais familiar; é eliminar aquela que entra em conflito com a evidência disponível.",
        "Na resposta restrita, começa pelo verbo do item. Se pede para explicar, apresenta relação e efeito; se pede para justificar, inclui evidência; se pede para identificar, evita desenvolver matéria irrelevante. Uma estrutura segura é resposta direta → pista ou evidência → explicação da ligação."
      ],
      signals:[
        "Nos itens de seleção, verifica todas as palavras decisivas da opção, sobretudo absolutos como sempre, apenas ou necessariamente.",
        "Na resposta restrita, usa o verbo do enunciado para decidir a profundidade necessária.",
        "Prefere uma evidência precisa a várias referências vagas ao texto."
      ],
      example:{
        title:"Exemplo de resposta · justificar uma ideia principal",
        prompt:"O item pede que justifiques a ideia de que o texto apresenta uma mudança de perspetiva. Como organizas a resposta?",
        steps:[
          "Formula diretamente a mudança identificada.",
          "Escolhe uma pista do primeiro momento do texto e outra do momento posterior.",
          "Explica a diferença entre as duas posições.",
          "Conclui sem acrescentar causas que o texto não apresenta."
        ],
        modelAnswer:"O texto revela uma mudança de perspetiva porque a posição inicial é apresentada com reservas, enquanto no segmento final surgem elementos que conduzem a uma avaliação mais favorável. O contraste entre esses dois momentos mostra uma evolução da posição expressa ao longo do texto.",
        note:"Uma resposta curta pode ser completa se tiver ideia, evidência suficiente e explicação da relação."
      },
      remember:"Em Leitura, não ganhas pontos por saber mais sobre o tema do que o texto: ganhas por demonstrar melhor o que o texto permite concluir.",
      pitfalls:[
        "Escolher uma opção apenas porque contém palavras iguais às do texto.",
        "Responder com conhecimento geral do tema em vez de interpretar o documento fornecido.",
        "Copiar uma frase como justificação sem explicar por que razão ela prova a resposta."
      ]
    }
  ]
};

export function portugueseLeitura10DeepReviewFor(unitId){
  return unitId===PORTUGUESE_LEITURA_10_DEEP_REVIEW.id?PORTUGUESE_LEITURA_10_DEEP_REVIEW:null;
}
