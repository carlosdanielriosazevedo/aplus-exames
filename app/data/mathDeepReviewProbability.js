export const MATH_PROBABILITY_REVIEW_VERSION="2026.10-wave2";

export const PROBABILITY_REVIEW={
  id:"12-prob",
  title:"Probabilidade",
  lead:"A probabilidade permite construir modelos para fenómenos aleatórios e quantificar a incerteza. Nesta revisão vais começar pela linguagem dos acontecimentos, avançar para as regras de cálculo e a probabilidade condicionada e terminar com variáveis aleatórias e o modelo Normal.",
  goals:[
    "Traduzir uma experiência aleatória para espaço de resultados, acontecimentos e operações entre acontecimentos.",
    "Calcular probabilidades usando as regras adequadas, sem aplicar a regra de Laplace fora das situações equiprováveis.",
    "Interpretar probabilidade condicionada, independência, árvores e tabelas de contingência.",
    "Construir e interpretar modelos discretos e usar o modelo Normal em situações de suporte contínuo."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Matemática A · 12.º ano · março de 2026 · Probabilidade",
    "DGE · Aprendizagens Essenciais de Matemática · recursos do Ensino Secundário",
    "IAVE · Prova Nacional de Matemática A 635 · prova e critérios de classificação de 2026"
  ],
  sections:[
    {
      id:"12-prob-fenomeno-acontecimentos",
      kicker:"1 · FENÓMENO ALEATÓRIO E ACONTECIMENTOS",
      title:"A linguagem que organiza um problema de probabilidade",
      paragraphs:[
        "Uma experiência aleatória é uma experiência cujo resultado concreto não é conhecido antecipadamente, embora se conheçam os resultados possíveis. O conjunto de todos esses resultados possíveis chama-se espaço de resultados ou espaço amostral e representa-se frequentemente por S ou Ω.",
        "Um acontecimento é um subconjunto do espaço de resultados. Pode ser elementar, quando contém apenas um resultado, ou composto, quando contém vários. O acontecimento certo coincide com todo o espaço de resultados e o acontecimento impossível não contém qualquer resultado.",
        "As operações entre acontecimentos ajudam a traduzir linguagem corrente. A∪B significa que ocorre A ou B, incluindo a possibilidade de ocorrerem ambos. A∩B significa que A e B ocorrem simultaneamente. O complementar de A, representado por Aᶜ, contém os resultados em que A não ocorre."
      ],
      formulas:[
        "A ⊆ S",
        "A∪B = resultados que pertencem a A ou a B",
        "A∩B = resultados comuns a A e B",
        "Aᶜ = S\\A"
      ],
      example:{
        title:"Exemplo resolvido · lançamento de um dado equilibrado",
        steps:[
          "Define S={1,2,3,4,5,6}.",
          "Se A é «sair número par», então A={2,4,6}.",
          "Se B é «sair número maior do que 4», então B={5,6}.",
          "Logo A∩B={6}, A∪B={2,4,5,6} e Aᶜ={1,3,5}."
        ],
        result:"Traduzir primeiro os acontecimentos para conjuntos torna as regras de probabilidade muito mais seguras.",
        note:"A palavra «ou» em probabilidade é normalmente inclusiva: A∪B inclui a interseção."
      },
      remember:"Antes de fazer contas, define claramente a experiência, o espaço de resultados e os acontecimentos.",
      pitfalls:["Confundir A∪B com «apenas A ou apenas B», esquecendo A∩B.","Listar resultados impossíveis ou omitir resultados possíveis no espaço amostral."]
    },
    {
      id:"12-prob-propriedades",
      kicker:"2 · PROBABILIDADE E PROPRIEDADES",
      title:"Somar probabilidades sem contar resultados duas vezes",
      paragraphs:[
        "Num modelo de probabilidade, cada acontecimento elementar recebe uma probabilidade entre 0 e 1 e a soma das probabilidades de todos os resultados possíveis é 1. A probabilidade de um acontecimento obtém-se somando as probabilidades dos resultados que o constituem.",
        "Quando os resultados elementares são equiprováveis, pode usar-se a regra de Laplace: a probabilidade é o quociente entre o número de casos favoráveis e o número de casos possíveis. A equiprobabilidade é uma condição do modelo, não uma consequência de existirem vários resultados.",
        "Na união de dois acontecimentos, a interseção seria contada duas vezes se somássemos simplesmente P(A)+P(B). Por isso subtrai-se P(A∩B). Se A e B forem disjuntos, a interseção é impossível e a fórmula reduz-se à soma."
      ],
      formulas:[
        "0 ≤ P(A) ≤ 1 e P(S)=1",
        "P(Aᶜ)=1−P(A)",
        "P(A∪B)=P(A)+P(B)−P(A∩B)",
        "Laplace: P(A)=n.º de casos favoráveis / n.º de casos possíveis, se os resultados forem equiprováveis"
      ],
      example:{
        title:"Exemplo resolvido · carta de um baralho de 52 cartas",
        steps:[
          "Escolhe-se uma carta ao acaso. Seja A «ser copas» e B «ser figura».",
          "P(A)=13/52 e P(B)=12/52.",
          "Existem 3 figuras de copas, logo P(A∩B)=3/52.",
          "P(A∪B)=13/52+12/52−3/52=22/52=11/26."
        ],
        result:"P(«copas ou figura»)=11/26.",
        note:"A interseção é subtraída porque as três figuras de copas apareceram nas duas contagens iniciais."
      },
      remember:"Só uses a regra de Laplace depois de justificares que os resultados elementares são equiprováveis.",
      pitfalls:["Somar P(A)+P(B) sem descontar a interseção quando os acontecimentos podem ocorrer em simultâneo.","Aplicar a regra de Laplace a resultados com probabilidades diferentes."]
    },
    {
      id:"12-prob-condicionada",
      kicker:"3 · PROBABILIDADE CONDICIONADA",
      title:"Atualizar probabilidades quando já sabes alguma coisa",
      paragraphs:[
        "Uma probabilidade condicionada responde a uma pergunta do tipo: qual é a probabilidade de A sabendo que B ocorreu? A informação de que B ocorreu reduz o universo relevante aos resultados de B.",
        "A expressão P(A|B) lê-se «probabilidade de A dado B» e, quando P(B)>0, calcula-se dividindo P(A∩B) por P(B). O denominador muda porque estamos agora a trabalhar dentro de B.",
        "A ordem da condição importa. Em geral, P(A|B) e P(B|A) não são iguais, porque cada uma usa um universo condicionado diferente."
      ],
      formulas:[
        "P(A|B)=P(A∩B)/P(B), se P(B)>0",
        "P(B|A)=P(A∩B)/P(A), se P(A)>0",
        "P(A∩B)=P(B)·P(A|B)=P(A)·P(B|A)"
      ],
      example:{
        title:"Exemplo resolvido · seleção sem reposição",
        steps:[
          "Um saco tem 3 bolas vermelhas e 2 azuis. Retiram-se duas sem reposição.",
          "Sabendo que a primeira foi vermelha, restam 2 vermelhas e 2 azuis.",
          "Logo P(2.ª vermelha | 1.ª vermelha)=2/4=1/2."
        ],
        result:"A informação sobre a primeira extração altera a composição do saco e, por isso, altera a probabilidade seguinte.",
        note:"Sem reposição, as extrações sucessivas são tipicamente dependentes."
      },
      remember:"Na probabilidade condicionada, pergunta sempre: «qual é agora o meu universo?».",
      pitfalls:["Trocar P(A|B) por P(B|A).","Continuar a usar o espaço amostral original no denominador depois de condicionares por B."]
    },
    {
      id:"12-prob-produto-arvores",
      kicker:"4 · REGRA DO PRODUTO E ÁRVORES",
      title:"Organizar experiências que acontecem por etapas",
      paragraphs:[
        "A regra do produto permite calcular a probabilidade de acontecimentos ocorrerem em sequência. Para A e B, P(A∩B)=P(A)P(B|A). O segundo fator deve refletir a informação criada pela primeira etapa.",
        "Uma árvore de probabilidade representa cada etapa por ramos. Em cada nó, as probabilidades dos ramos possíveis devem somar 1. A probabilidade de um caminho completo obtém-se multiplicando as probabilidades ao longo desse caminho.",
        "Se um acontecimento final puder ser alcançado por vários caminhos incompatíveis, calcula-se a probabilidade de cada caminho e somam-se os resultados."
      ],
      formulas:[
        "P(A∩B)=P(A)·P(B|A)",
        "Probabilidade de um caminho = produto das probabilidades dos seus ramos",
        "Probabilidade de vários caminhos disjuntos = soma das probabilidades dos caminhos"
      ],
      example:{
        title:"Exemplo resolvido · duas bolas sem reposição",
        steps:[
          "Num saco há 3 vermelhas e 2 azuis. Calcula a probabilidade de retirar duas vermelhas sem reposição.",
          "Primeira vermelha: P(V₁)=3/5.",
          "Depois de sair uma vermelha, ficam 2 vermelhas em 4 bolas: P(V₂|V₁)=2/4.",
          "Multiplica ao longo do caminho: P(V₁∩V₂)=(3/5)(2/4)=3/10."
        ],
        result:"P(duas vermelhas)=3/10.",
        note:"Uma árvore torna visível a mudança de probabilidades entre etapas; isso reduz muitos erros de condicionamento."
      },
      remember:"Numa árvore, multiplica ao longo de um caminho e soma caminhos alternativos que conduzem ao mesmo acontecimento.",
      pitfalls:["Manter a mesma probabilidade no segundo ramo de uma experiência sem reposição.","Somar probabilidades dentro de um único caminho em vez de as multiplicar."]
    },
    {
      id:"12-prob-contingencia-independencia",
      kicker:"5 · TABELAS DE CONTINGÊNCIA E INDEPENDÊNCIA",
      title:"Distinguir independência de incompatibilidade",
      paragraphs:[
        "Uma tabela de contingência cruza duas características e permite obter probabilidades conjuntas, marginais e condicionadas. O total relevante muda conforme a pergunta: numa probabilidade condicionada, o denominador corresponde ao total da linha ou coluna que representa a condição.",
        "Dois acontecimentos A e B são independentes quando saber que um ocorreu não altera a probabilidade do outro. Se as probabilidades forem positivas, isto equivale a P(A|B)=P(A), ou a P(A∩B)=P(A)P(B).",
        "Independência não significa incompatibilidade. Acontecimentos incompatíveis não podem ocorrer simultaneamente; se ambos tiverem probabilidade positiva, então não são independentes, porque saber que um ocorreu torna a probabilidade do outro igual a zero."
      ],
      formulas:[
        "A e B independentes ⇔ P(A∩B)=P(A)P(B)",
        "Se P(B)>0: A independente de B ⇔ P(A|B)=P(A)",
        "Se A e B são disjuntos: P(A∩B)=0"
      ],
      example:{
        title:"Exemplo resolvido · verificar independência",
        steps:[
          "Suponha P(A)=0,4, P(B)=0,5 e P(A∩B)=0,2.",
          "Calcula P(A)P(B)=0,4×0,5=0,2.",
          "Como P(A∩B)=P(A)P(B), os acontecimentos são independentes."
        ],
        result:"A e B são independentes.",
        note:"A igualdade deve ser verificada com as probabilidades do problema; independência não deve ser assumida apenas porque os acontecimentos parecem diferentes."
      },
      remember:"Incompatíveis significa «não podem acontecer juntos»; independentes significa «um não altera a probabilidade do outro».",
      pitfalls:["Confundir acontecimentos disjuntos com acontecimentos independentes.","Usar o total geral de uma tabela quando a pergunta está condicionada a uma linha ou coluna específica."]
    },
    {
      id:"12-prob-total",
      kicker:"6 · PROBABILIDADE TOTAL",
      title:"Juntar vários caminhos que explicam o mesmo resultado",
      paragraphs:[
        "A fórmula da probabilidade total é útil quando um acontecimento B pode ocorrer através de vários casos A₁,A₂,…,Aₙ que não se sobrepõem e que, em conjunto, cobrem todo o espaço de resultados.",
        "Em vez de procurar P(B) diretamente, decompõe-se B nos caminhos B∩Aᵢ. Cada caminho tem probabilidade P(Aᵢ)P(B|Aᵢ) e, como os caminhos são mutuamente exclusivos, somam-se as respetivas probabilidades.",
        "Esta ideia aparece naturalmente em árvores de probabilidade: para obter a probabilidade de um resultado final, somam-se todos os ramos completos que terminam nesse resultado."
      ],
      formulas:[
        "Se A₁,…,Aₙ formam uma partição de S: P(B)=Σ P(Aᵢ)P(B|Aᵢ)",
        "Para dois casos: P(B)=P(A)P(B|A)+P(Aᶜ)P(B|Aᶜ)",
        "Os Aᵢ devem ser mutuamente exclusivos e a sua união deve ser S"
      ],
      example:{
        title:"Exemplo resolvido · duas máquinas de produção",
        steps:[
          "Uma fábrica produz 60% das peças na máquina A e 40% na máquina B.",
          "A taxa de defeito é 2% em A e 5% em B.",
          "P(defeito)=0,60×0,02+0,40×0,05.",
          "P(defeito)=0,012+0,020=0,032."
        ],
        result:"A probabilidade de uma peça escolhida ao acaso ser defeituosa é 0,032, ou 3,2%.",
        note:"A média simples de 2% e 5% seria errada porque as máquinas não produzem a mesma proporção de peças."
      },
      remember:"Probabilidade total é uma soma ponderada pelos diferentes caminhos que podem produzir o acontecimento final.",
      pitfalls:["Somar probabilidades condicionadas sem as ponderar por P(Aᵢ).","Usar casos Aᵢ que se sobrepõem ou que não cobrem todo o espaço de resultados."]
    },
    {
      id:"12-prob-variaveis-discretas",
      kicker:"7 · VARIÁVEIS ALEATÓRIAS DISCRETAS",
      title:"Transformar resultados aleatórios num modelo numérico",
      paragraphs:[
        "Uma variável aleatória X associa um número real a cada resultado de uma experiência aleatória. Quando X assume um conjunto finito ou enumerável de valores, diz-se discreta.",
        "A função massa de probabilidade indica P(X=x) para cada valor possível x. Todas estas probabilidades são não negativas e a sua soma é 1. Valores diferentes de X não têm necessariamente a mesma probabilidade.",
        "O valor médio μ=E(X) representa o centro do modelo a longo prazo, não um resultado que tenha de ocorrer numa realização concreta. O desvio padrão σ mede a dispersão dos valores de X em torno desse centro."
      ],
      formulas:[
        "Σ P(X=xᵢ)=1",
        "μ=E(X)=Σ xᵢ·P(X=xᵢ)",
        "Var(X)=Σ (xᵢ−μ)²·P(X=xᵢ)",
        "σ=√Var(X)"
      ],
      example:{
        title:"Exemplo resolvido · ganho num jogo",
        steps:[
          "Um jogo dá 4 € com probabilidade 0,25 e perde 2 € com probabilidade 0,75.",
          "Define X como o ganho: X=4 com probabilidade 0,25 e X=−2 com probabilidade 0,75.",
          "E(X)=4×0,25+(−2)×0,75=1−1,5=−0,5."
        ],
        result:"O valor médio do ganho é −0,50 € por jogada.",
        note:"Isto não significa que se percam exatamente 0,50 € em cada jogada; descreve o comportamento médio quando o jogo é repetido muitas vezes."
      },
      remember:"A função massa é um modelo: associa probabilidades aos valores da variável, e essas probabilidades têm de somar 1.",
      pitfalls:["Assumir que os valores possíveis de X são equiprováveis só porque são poucos.","Interpretar o valor médio como o resultado mais provável ou como um valor que tem de ocorrer."]
    },
    {
      id:"12-prob-normal",
      kicker:"8 · MODELO NORMAL",
      title:"Probabilidades como áreas numa distribuição contínua",
      paragraphs:[
        "O modelo Normal é um modelo contínuo muito usado para variáveis como alturas, medidas ou erros que se distribuem aproximadamente de forma simétrica em torno de um valor central. A sua curva tem forma de sino e é simétrica em torno da média μ.",
        "Cada distribuição Normal é determinada por dois parâmetros: μ controla a posição do centro e σ>0 controla a dispersão. Um σ maior produz uma curva mais espalhada; um σ menor concentra mais probabilidade perto da média.",
        "Como o modelo é contínuo, probabilidades correspondem a áreas sob a curva em intervalos. A probabilidade de obter exatamente um único valor é zero; por isso P(X<a) e P(X≤a) são iguais num modelo contínuo. Na prática, a tecnologia é usada para calcular áreas associadas a intervalos."
      ],
      formulas:[
        "X ~ N(μ,σ)",
        "P(a≤X≤b) = área sob a curva Normal entre a e b",
        "P(X≤a)=P(X<a) num modelo contínuo",
        "Simetria: P(X≤μ−d)=P(X≥μ+d)"
      ],
      example:{
        title:"Exemplo resolvido · interpretar uma probabilidade Normal",
        steps:[
          "Admita que a altura X de uma população é modelada por uma Normal com média μ=170 cm e desvio padrão σ=6 cm.",
          "Os intervalos [164,170] e [170,176] estão à mesma distância da média.",
          "Como a curva é simétrica em torno de 170, as áreas correspondentes a esses dois intervalos são iguais.",
          "Logo P(164≤X≤170)=P(170≤X≤176), sem ser necessário calcular numericamente as áreas."
        ],
        result:"A simetria permite comparar probabilidades antes de recorrer à calculadora ou software.",
        note:"Para probabilidades numéricas em intervalos gerais, usa a funcionalidade de distribuição Normal da tecnologia autorizada no contexto de estudo."
      },
      remember:"No modelo Normal, média localiza o centro e desvio padrão controla a dispersão; probabilidades são áreas, não alturas da curva.",
      pitfalls:["Interpretar a altura da curva num ponto como uma probabilidade nesse ponto.","Confundir o papel de μ com o de σ ou assumir que todas as distribuições em forma de sino têm os mesmos parâmetros."]
    }
  ]
};

export function mathProbabilityReviewContentFor(themeId){
  return themeId==="12-prob"?PROBABILITY_REVIEW:null;
}
