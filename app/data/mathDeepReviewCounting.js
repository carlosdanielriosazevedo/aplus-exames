export const MATH_COUNTING_REVIEW_VERSION="2026.10-wave9";

export const COUNTING_REVIEW={
  id:"11-cont",
  title:"Contagem",
  lead:"Contar bem não significa listar tudo: significa reconhecer a estrutura do problema e escolher uma estratégia que conte todas as possibilidades exatamente uma vez. Neste tema vais distinguir alternativas de etapas sucessivas, organizar casos com árvores e tabelas, usar fatorial e reconhecer quando estás perante arranjos completos, permutações, arranjos simples ou combinações. A pergunta central será sempre: a ordem importa? E pode haver repetição?",
  goals:[
    "Aplicar corretamente os princípios da adição e da multiplicação, distinguindo alternativas de escolhas sucessivas.",
    "Organizar problemas com diagramas em árvore, tabelas e divisão em casos, usando também o princípio do pombal quando ele fornece uma garantia útil.",
    "Usar fatorial para simplificar produtos sucessivos e interpretar permutações como ordenações de todos os elementos distintos.",
    "Distinguir arranjos completos, arranjos simples e combinações através das perguntas ordem/repetição e justificar a fórmula adequada em vez de a aplicar por reconhecimento superficial."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Contagem",
    "DGE · Coletânea de tarefas das turmas piloto · Contagem · Matemática A 11.º ano · junho de 2025"
  ],
  sections:[
    {
      id:"11-cont-adicao-multiplicacao",
      kicker:"1 · PRINCÍPIOS DA ADIÇÃO E DA MULTIPLICAÇÃO",
      title:"Somar alternativas; multiplicar etapas sucessivas",
      paragraphs:[
        "O princípio da multiplicação aplica-se quando uma escolha é feita por etapas sucessivas. Se a primeira etapa pode ser realizada de a formas e, para cada uma delas, a segunda de b formas, então existem a·b resultados possíveis. Com mais etapas, multiplicam-se os números de possibilidades de cada etapa, desde que a contagem de cada ramo esteja corretamente representada.",
        "O princípio da adição aplica-se quando o conjunto de resultados é dividido em casos alternativos que não se sobrepõem. Se um resultado pode surgir pelo caso A ou pelo caso B, com a e b possibilidades respetivamente, e nenhum resultado pertence aos dois casos, o total é a+b.",
        "Muitos problemas combinam os dois princípios: primeiro contam-se as possibilidades dentro de cada caso por multiplicação e depois somam-se os totais dos casos. A dificuldade não está na conta final, mas em garantir que nenhum resultado fica de fora e nenhum é contado duas vezes."
      ],
      formulas:[
        "etapas sucessivas com a e b escolhas: N=a·b",
        "casos disjuntos A e B: N=N(A)+N(B)",
        "k etapas com n₁,…,n_k escolhas: N=n₁·n₂·…·n_k"
      ],
      example:{
        title:"Exemplo resolvido · construir uma ementa com duas alternativas de sobremesa",
        steps:[
          "Um restaurante oferece 3 entradas e 4 pratos principais. Na sobremesa, o cliente escolhe ou 2 opções de fruta ou 5 opções de doce.",
          "As sobremesas pertencem a dois casos alternativos e disjuntos: 2+5=7 possibilidades.",
          "A refeição é construída em três etapas sucessivas: entrada, prato e sobremesa.",
          "Aplica o princípio da multiplicação: 3·4·7=84."
        ],
        result:"Existem 84 ementas possíveis.",
        note:"Somámos fruta e doce porque são alternativas; multiplicámos esse total pelas entradas e pratos porque são etapas da mesma ementa."
      },
      remember:"Pergunta primeiro se estás a escolher entre casos ou a percorrer etapas. Alternativas disjuntas somam; etapas sucessivas multiplicam.",
      pitfalls:[
        "Somar números de escolhas que correspondem a etapas sucessivas da mesma construção.",
        "Somar casos que se sobrepõem sem corrigir a dupla contagem dos resultados comuns."
      ]
    },
    {
      id:"11-cont-diagramas",
      kicker:"2 · ÁRVORES, TABELAS, CASOS E PRINCÍPIO DO POMBAL",
      title:"Representar antes de calcular pode revelar a estrutura certa",
      paragraphs:[
        "Um diagrama em árvore mostra decisões sucessivas e torna visíveis os ramos possíveis. É particularmente útil quando o número de escolhas depende do que aconteceu numa etapa anterior ou quando existem restrições diferentes em ramos distintos.",
        "As tabelas ajudam a organizar duas características ou dois conjuntos de possibilidades e permitem detetar simetrias, repetições e casos esquecidos. Nenhuma representação é universalmente melhor: o objetivo é escolher uma que torne a contagem completa, sem duplicações e fácil de justificar.",
        "O princípio do pombal é uma estratégia de garantia, não uma fórmula para enumerar resultados. Se N objetos são distribuídos por p categorias, pelo menos uma categoria contém pelo menos ⌈N/p⌉ objetos. Nas AE aparece como ferramenta para raciocinar sobre situações em que se quer garantir uma repetição."
      ],
      formulas:[
        "princípio do pombal: algum grupo tem pelo menos ⌈N/p⌉ objetos",
        "se N>p, ao distribuir N objetos por p caixas, alguma caixa recebe pelo menos 2",
        "árvore: total = soma dos números de folhas dos ramos disjuntos"
      ],
      example:{
        title:"Exemplo resolvido · garantir aniversários no mesmo mês",
        steps:[
          "Há 12 meses possíveis, que funcionam como 12 categorias.",
          "Com 12 pessoas ainda é possível, em princípio, ter exatamente uma pessoa em cada mês.",
          "Ao considerar 13 pessoas, distribuímos 13 objetos por apenas 12 categorias.",
          "Pelo princípio do pombal, pelo menos um mês contém aniversários de pelo menos duas dessas pessoas."
        ],
        result:"Com 13 pessoas é garantido que pelo menos duas fazem anos no mesmo mês.",
        note:"O princípio não diz qual é o mês nem quantos pares existem; apenas garante que alguma categoria recebe pelo menos dois elementos."
      },
      remember:"Uma boa representação não é decoração: deve ajudar a provar que todos os casos foram incluídos exatamente como pretendido.",
      pitfalls:[
        "Usar uma árvore enorme quando uma regra de multiplicação simples descreve todos os ramos de forma uniforme.",
        "Interpretar o princípio do pombal como se identificasse a categoria repetida ou garantisse que apenas uma categoria tem repetição."
      ]
    },
    {
      id:"11-cont-fatorial",
      kicker:"3 · FATORIAL",
      title:"Uma notação compacta para produtos sucessivos decrescentes",
      paragraphs:[
        "Para um número natural n positivo, n! representa o produto n·(n−1)·…·2·1. Esta notação aparece naturalmente quando o número de escolhas diminui uma unidade em cada etapa, como acontece ao ordenar elementos distintos sem repetição.",
        "Define-se 0!=1. Esta convenção não é arbitrária: torna coerentes várias fórmulas de contagem nos casos limite, como escolher zero elementos ou considerar uma permutação do conjunto vazio.",
        "Ao simplificar quocientes de fatoriais, é normalmente mais seguro desenvolver apenas os fatores necessários em vez de calcular números enormes. Por exemplo, 10!/7!=10·9·8."
      ],
      formulas:[
        "n!=n·(n−1)·…·2·1, para n≥1",
        "0!=1",
        "n!=n·(n−1)!",
        "n!/(n−p)!=n·(n−1)·…·(n−p+1)"
      ],
      example:{
        title:"Exemplo resolvido · simplificar 9!/6! sem calcular os dois fatoriais",
        steps:[
          "Escreve 9!=9·8·7·6!.",
          "Substitui no quociente: 9!/6!=(9·8·7·6!)/6!.",
          "Cancela o fator comum 6!.",
          "Calcula 9·8·7=504."
        ],
        result:"9!/6!=504.",
        note:"Calcular primeiro 9! e 6! funcionaria, mas esconderia a estrutura que será útil nas fórmulas de arranjos e combinações."
      },
      remember:"Fatorial é sobretudo uma linguagem para produtos sucessivos; expande apenas até ao ponto necessário para simplificar.",
      pitfalls:[
        "Achar que 0!=0; por definição, 0!=1.",
        "Simplificar n!/p! como se fosse (n/p)!, o que em geral é falso."
      ]
    },
    {
      id:"11-cont-permutacoes",
      kicker:"4 · PERMUTAÇÕES",
      title:"Ordenar todos os elementos distintos sem repetição",
      paragraphs:[
        "Uma permutação de n elementos distintos é uma ordenação que utiliza todos os n elementos exatamente uma vez. Para a primeira posição existem n escolhas, para a segunda n−1, e assim sucessivamente; pelo princípio da multiplicação obtém-se n!.",
        "Quando surgem restrições, a fórmula n! não deve ser aplicada antes de interpretar a condição. Elementos que têm de ficar juntos podem ser tratados temporariamente como um bloco; posições obrigatórias, proibições ou simetrias podem exigir divisão em casos.",
        "A permutação é um caso particular de arranjo simples em que se escolhem todos os elementos disponíveis. Esta relação ajuda a evitar decorar fórmulas como objetos isolados."
      ],
      formulas:[
        "P_n=n!",
        "permutação = arranjo simples com p=n",
        "bloco de r elementos distintos pode ter r! ordens internas"
      ],
      example:{
        title:"Exemplo resolvido · cinco livros com dois obrigatoriamente juntos",
        steps:[
          "Há 5 livros distintos e os livros A e B têm de ficar juntos numa prateleira.",
          "Trata AB como um único bloco. Passas a ordenar 4 objetos: o bloco e os outros 3 livros, o que dá 4! possibilidades.",
          "Dentro do bloco, A e B podem aparecer como AB ou BA: 2!=2 possibilidades.",
          "Multiplica as duas etapas: 4!·2=48."
        ],
        result:"Há 48 ordenações em que A e B ficam juntos.",
        note:"Usar diretamente 5! contaria também todas as disposições em que A e B ficam separados."
      },
      remember:"Permutação significa: todos os elementos, ordem relevante, sem repetição dos elementos distintos.",
      pitfalls:[
        "Usar n! sempre que a ordem importa, mesmo quando apenas algumas posições são preenchidas.",
        "Aplicar o método do bloco e esquecer as possíveis ordens internas dos elementos agrupados."
      ]
    },
    {
      id:"11-cont-arranjos",
      kicker:"5 · ARRANJOS COMPLETOS E ARRANJOS SIMPLES",
      title:"A ordem importa; a repetição decide qual dos dois modelos usar",
      paragraphs:[
        "Num arranjo completo de n elementos tomados p a p, preenchem-se p posições ordenadas e cada posição pode reutilizar qualquer um dos n elementos. Existem n escolhas em cada uma das p etapas, logo o total é n^p.",
        "Num arranjo simples de n elementos tomados p a p, a ordem continua a importar, mas não há repetição. As escolhas sucessivas são n, n−1, …, n−p+1, dando A_n^p=n!/(n−p)!, com 0≤p≤n.",
        "A distinção deve nascer do enunciado. Um PIN pode admitir repetição de algarismos; um pódio atribui lugares diferentes a pessoas distintas sem repetir concorrentes. Em ambos os casos a ordem é relevante, mas a regra de repetição muda a contagem."
      ],
      formulas:[
        "arranjos completos: AC_n^p=n^p",
        "arranjos simples: A_n^p=n!/(n−p)!",
        "A_n^p=n·(n−1)·…·(n−p+1)",
        "A_n^n=n!=P_n"
      ],
      example:{
        title:"Exemplo resolvido · distinguir um PIN de um pódio",
        steps:[
          "PIN: um código tem 4 posições e em cada uma podem aparecer 10 algarismos, com repetição permitida. Logo há 10^4=10 000 códigos.",
          "Pódio: entre 8 atletas escolhem-se 1.º, 2.º e 3.º lugares, sem repetir atletas.",
          "Há 8 escolhas para o primeiro lugar, 7 para o segundo e 6 para o terceiro.",
          "Logo A_8^3=8·7·6=336 pódios possíveis."
        ],
        result:"PIN: 10 000 possibilidades; pódio: 336 possibilidades.",
        note:"A pergunta decisiva não é apenas “a ordem importa?”; depois tens de perguntar se o mesmo elemento pode ser usado novamente."
      },
      remember:"Ordem importa + repetição permitida → arranjo completo. Ordem importa + sem repetição → arranjo simples.",
      pitfalls:[
        "Usar n^p num problema em que um elemento escolhido deixa de estar disponível nas posições seguintes.",
        "Usar A_n^p quando a ordem das p escolhas não produz resultados diferentes."
      ]
    },
    {
      id:"11-cont-combinacoes",
      kicker:"6 · COMBINAÇÕES",
      title:"Escolher um subconjunto quando a ordem não cria um resultado novo",
      paragraphs:[
        "Uma combinação de n elementos tomados p a p é uma escolha de p elementos distintos em que a ordem não interessa. Escolher Ana, Bruno e Carla representa o mesmo grupo que escolher Carla, Ana e Bruno.",
        "Se começássemos por contar arranjos simples, cada grupo de p elementos apareceria p! vezes, uma por cada ordenação interna. Por isso dividimos A_n^p por p! e obtemos C_n^p=n!/[p!(n−p)!].",
        "As combinações modelam comissões, equipas, subconjuntos ou seleções sem cargos diferenciados. Se as pessoas escolhidas receberem depois papéis distintos, essa segunda etapa pode voltar a introduzir uma multiplicação por permutações ou arranjos."
      ],
      formulas:[
        "C_n^p=n!/[p!(n−p)!]",
        "A_n^p=C_n^p·p!",
        "C_n^p=C_n^(n−p)",
        "C_n^0=C_n^n=1"
      ],
      example:{
        title:"Exemplo resolvido · escolher uma comissão sem cargos",
        steps:[
          "Pretende-se escolher 4 alunos de uma turma com 10 para formar uma comissão sem cargos diferenciados.",
          "A ordem de seleção não altera a comissão: {A,B,C,D} é o mesmo grupo em qualquer ordem.",
          "Usa combinações: C_10^4=10!/(4!·6!).",
          "Simplifica: (10·9·8·7)/(4·3·2·1)=210."
        ],
        result:"Existem 210 comissões possíveis.",
        note:"Se depois fosse necessário escolher, dentro da comissão, presidente e secretário, surgiria uma nova etapa em que a ordem/papel volta a importar."
      },
      remember:"Quando a ordem não muda o grupo escolhido, pensa em combinações. Se trocar dois escolhidos cria um resultado diferente, não estás perante uma combinação simples.",
      pitfalls:[
        "Usar combinações para lugares, cargos ou posições em que os papéis distinguem os escolhidos.",
        "Multiplicar por p! depois de usar C_n^p num problema em que os elementos escolhidos continuam sem qualquer ordem ou função diferenciada."
      ]
    }
  ],
  decisionGuide:[
    "Há casos alternativos disjuntos? Conta cada caso e soma.",
    "Há etapas sucessivas? Multiplica as possibilidades de cada etapa.",
    "Selecionas todos os n elementos e a ordem importa, sem repetição? Permutação.",
    "Selecionas p posições e a ordem importa? Se houver repetição, arranjo completo; sem repetição, arranjo simples.",
    "Selecionas p elementos sem repetição e a ordem não importa? Combinação."
  ]
};

export function mathCountingReviewContentFor(themeId){
  return themeId==="11-cont"?COUNTING_REVIEW:null;
}
