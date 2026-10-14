export const MATH_DOT_PRODUCT_REVIEW_VERSION="2026.10-wave8";

export const DOT_PRODUCT_REVIEW={
  id:"11-pe",
  title:"Produto escalar",
  lead:"O produto escalar liga coordenadas, ângulos e perpendicularidade e torna-se uma ferramenta central da geometria analítica no plano e no espaço. Nesta revisão vais passar do declive de uma reta para operações com vetores, medir ângulos, reconhecer perpendicularidade, trabalhar equações de retas e planos e calcular distâncias. A ideia unificadora é simples: traduzir relações geométricas em condições algébricas que possam ser calculadas e justificadas.",
  goals:[
    "Relacionar declive e inclinação de uma reta e interpretar corretamente retas com declive positivo, negativo, nulo ou não definido.",
    "Calcular e interpretar o produto escalar de vetores no plano e no espaço, tanto por coordenadas como através das normas e do ângulo.",
    "Usar produto escalar para estudar ângulos e perpendicularidade de vetores e retas.",
    "Resolver problemas com retas e planos no espaço, incluindo equações cartesianas, posições relativas e distância de um ponto a um plano."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Produto escalar",
    "DGE · Coletânea de tarefas das turmas piloto · Produto escalar · Matemática A 11.º ano · abril de 2025"
  ],
  sections:[
    {
      id:"11-pe-declive-inclinacao",
      kicker:"1 · DECLIVE E INCLINAÇÃO DE UMA RETA",
      title:"O sinal e o valor do declive traduzem a direção da reta",
      paragraphs:[
        "A inclinação α de uma reta não vertical é o ângulo, entre 0 e π, medido no sentido positivo desde o semieixo positivo Ox até uma direção da reta. O declive m é a tangente dessa inclinação: m=tg α. Assim, uma reta crescente tem m>0 e uma reta decrescente tem m<0.",
        "Uma reta horizontal tem inclinação 0 e declive 0. Uma reta vertical tem inclinação π/2, mas a tangente não está definida nesse ângulo; por isso uma reta vertical não tem declive. Esta exceção é importante quando se usam fórmulas que pressupõem a existência de m.",
        "A forma reduzida y=mx+b mostra diretamente o declive de uma reta não vertical. Se forem conhecidos dois pontos distintos A(x₁,y₁) e B(x₂,y₂), com x₁≠x₂, o declive é a razão entre a variação vertical e a variação horizontal."
      ],
      formulas:[
        "m=tg α, com 0≤α<π e α≠π/2",
        "m=(y₂−y₁)/(x₂−x₁), se x₂≠x₁",
        "reta não vertical: y=mx+b",
        "reta vertical x=a: declive não definido"
      ],
      example:{
        title:"Exemplo resolvido · encontrar a inclinação a partir de um declive negativo",
        steps:[
          "Uma reta tem declive m=−√3. Procuramos α∈[0,π[ tal que tg α=−√3.",
          "O ângulo de referência é π/3 porque tg(π/3)=√3.",
          "Como a tangente é negativa no 2.º quadrante dentro do intervalo escolhido, α=π−π/3=2π/3.",
          "Em graus, 2π/3 corresponde a 120°."
        ],
        result:"A inclinação da reta é 2π/3 rad, ou 120°.",
        note:"Escolher −π/3 teria a mesma tangente, mas não respeitaria a convenção de inclinação no intervalo [0,π[."
      },
      remember:"Declive e inclinação estão ligados por m=tg α, mas a inclinação usa uma convenção de intervalo que elimina a ambiguidade periódica da tangente.",
      pitfalls:[
        "Atribuir declive infinito a uma reta vertical; o correto é dizer que o declive não está definido.",
        "Usar arctg(m) sem ajustar o resultado ao intervalo convencionado para a inclinação da reta."
      ]
    },
    {
      id:"11-pe-produto-coordenadas",
      kicker:"2 · PRODUTO ESCALAR POR COORDENADAS",
      title:"Multiplicar coordenadas correspondentes e somar cria um número com significado geométrico",
      paragraphs:[
        "Num referencial ortonormado, o produto escalar de dois vetores é a soma dos produtos das coordenadas correspondentes. No plano, u·v=u₁v₁+u₂v₂; no espaço acrescenta-se a terceira parcela. O resultado é um número real, não um vetor.",
        "O produto escalar é comutativo e distributivo relativamente à adição de vetores e comporta-se de forma previsível com a multiplicação por escalares. Em particular, u·u=||u||², o que liga imediatamente o produto escalar à norma.",
        "O cálculo por coordenadas é especialmente útil porque transforma questões geométricas em contas algébricas simples. A interpretação vem depois: sinal, zero ou magnitude do resultado podem fornecer informação sobre ângulos e perpendicularidade."
      ],
      formulas:[
        "ℝ²: (u₁,u₂)·(v₁,v₂)=u₁v₁+u₂v₂",
        "ℝ³: (u₁,u₂,u₃)·(v₁,v₂,v₃)=u₁v₁+u₂v₂+u₃v₃",
        "u·v=v·u ; u·(v+w)=u·v+u·w",
        "u·u=||u||²"
      ],
      example:{
        title:"Exemplo resolvido · produto escalar no espaço",
        steps:[
          "Considera u=(2,−1,3) e v=(4,0,−2).",
          "Multiplica coordenadas correspondentes: 2·4=8, (−1)·0=0 e 3·(−2)=−6.",
          "Soma os três resultados: 8+0−6=2.",
          "O resultado é escalar: u·v=2."
        ],
        result:"u·v=2.",
        note:"Não confundas produto escalar com uma multiplicação coordenada a coordenada que produzisse o vetor (8,0,−6)."
      },
      remember:"Produto escalar por coordenadas: produtos correspondentes, depois soma. O resultado é sempre um escalar.",
      pitfalls:[
        "Devolver um vetor em vez de um número depois de multiplicar as coordenadas correspondentes.",
        "Esquecer a terceira coordenada quando se passa do plano para o espaço."
      ]
    },
    {
      id:"11-pe-angulo-norma",
      kicker:"3 · NORMAS, ÂNGULO E SINAL DO PRODUTO ESCALAR",
      title:"O produto escalar mede quanto dois vetores apontam na mesma direção",
      paragraphs:[
        "Para vetores não nulos, u·v=||u||·||v||·cos θ, onde θ é o ângulo entre eles, escolhido entre 0 e π. Esta relação permite calcular um ângulo a partir de coordenadas ou, inversamente, calcular um produto escalar quando se conhecem normas e ângulo.",
        "O sinal do produto escalar revela a natureza do ângulo: positivo corresponde a um ângulo agudo, zero a um ângulo reto e negativo a um ângulo obtuso. Esta leitura é muitas vezes suficiente, sem ser necessário calcular θ exatamente.",
        "Para determinar o ângulo numericamente, isola cos θ=(u·v)/(||u||||v||) e usa a função arccos. A fórmula exige vetores não nulos porque não existe um ângulo bem definido com o vetor nulo e porque surgiria divisão por zero."
      ],
      formulas:[
        "u·v=||u||·||v||·cos θ",
        "cos θ=(u·v)/(||u||||v||), se u≠0 e v≠0",
        "u·v>0 ⇒ θ agudo ; u·v=0 ⇒ θ reto ; u·v<0 ⇒ θ obtuso",
        "||(x,y,z)||=√(x²+y²+z²)"
      ],
      example:{
        title:"Exemplo resolvido · ângulo entre dois vetores no plano",
        steps:[
          "Considera u=(1,2) e v=(3,−1). O produto escalar é u·v=3−2=1.",
          "As normas são ||u||=√5 e ||v||=√10.",
          "Logo cos θ=1/(√5·√10)=1/√50.",
          "Aplicando arccos, obtém-se θ≈81,9°. Como u·v>0, o resultado ser agudo é coerente com a previsão pelo sinal."
        ],
        result:"O ângulo entre os vetores é aproximadamente 81,9°.",
        note:"A verificação pelo sinal do produto escalar é uma boa forma de detetar um erro de calculadora ou de quadrante."
      },
      remember:"Antes de calcular o ângulo, olha para o sinal de u·v: ele já diz se esperas um ângulo agudo, reto ou obtuso.",
      pitfalls:[
        "Aplicar a fórmula do cosseno do ângulo a um vetor nulo.",
        "Esquecer as normas no denominador e tratar diretamente u·v como se fosse cos θ."
      ]
    },
    {
      id:"11-pe-perpendicularidade",
      kicker:"4 · PERPENDICULARIDADE DE VETORES E RETAS",
      title:"Produto escalar nulo é a condição algébrica da perpendicularidade",
      paragraphs:[
        "Dois vetores não nulos são perpendiculares se e só se o seu produto escalar for zero. Esta equivalência é uma das aplicações mais importantes do produto escalar porque evita medir ângulos diretamente.",
        "Para retas no plano, basta aplicar a condição aos respetivos vetores diretores. Quando ambas as retas são não verticais, a mesma relação pode ser expressa pelos declives: retas perpendiculares satisfazem m₁m₂=−1.",
        "No espaço, o raciocínio com vetores continua válido. A perpendicularidade pode envolver vetores, uma reta e um vetor normal de um plano, ou outras configurações que se traduzem por produtos escalares nulos."
      ],
      formulas:[
        "u⊥v ⇔ u·v=0, para u,v não nulos",
        "retas com diretores u,v: r⊥s ⇔ u·v=0",
        "retas não verticais perpendiculares: m₁m₂=−1"
      ],
      example:{
        title:"Exemplo resolvido · construir uma reta perpendicular por um ponto",
        steps:[
          "A reta r tem vetor diretor u=(2,3). Queremos uma reta s perpendicular a r e que passe em P=(1,−2).",
          "Um vetor v=(3,−2) é perpendicular a u porque u·v=2·3+3·(−2)=0.",
          "Usa v como vetor diretor de s: (x,y)=(1,−2)+t(3,−2), t∈ℝ.",
          "A condição u·v=0 garante a perpendicularidade sem necessidade de calcular o ângulo."
        ],
        result:"Uma equação vetorial possível é (x,y)=(1,−2)+t(3,−2), t∈ℝ.",
        note:"Há infinitos vetores diretores múltiplos de (3,−2); todos descrevem a mesma direção da reta s."
      },
      remember:"Se procuras perpendicularidade, pensa primeiro em produto escalar zero.",
      pitfalls:[
        "Usar u·v=0 sem excluir o vetor nulo e depois falar de um ângulo de 90° com esse vetor.",
        "Aplicar m₁m₂=−1 quando uma das retas é vertical e o seu declive não está definido."
      ]
    },
    {
      id:"11-pe-retas-planos",
      kicker:"5 · RETAS E PLANOS NO ESPAÇO",
      title:"Vetores diretores e normais organizam posições e equações geométricas",
      paragraphs:[
        "Uma reta pode ser descrita por um ponto e um vetor diretor. No plano ou no espaço, a equação vetorial P+t·u mostra todos os pontos obtidos ao avançar na direção de u. Comparar vetores diretores ajuda a estudar paralelismo e posição relativa de retas.",
        "Um plano no espaço pode ser descrito por um ponto A e um vetor normal n=(a,b,c). Um ponto X=(x,y,z) pertence ao plano quando n·(X−A)=0, o que conduz à equação cartesiana ax+by+cz+d=0.",
        "A posição relativa entre reta e plano pode ser analisada comparando o vetor diretor u da reta com o normal n do plano. Se u·n=0, a direção da reta é paralela ao plano; depois é necessário verificar um ponto para distinguir uma reta contida no plano de uma reta paralela exterior."
      ],
      formulas:[
        "reta: X=P+t·u, t∈ℝ",
        "plano por A e normal n: n·(X−A)=0",
        "plano cartesiano: ax+by+cz+d=0, normal n=(a,b,c)",
        "u·n=0 ⇒ direção da reta paralela ao plano"
      ],
      example:{
        title:"Exemplo resolvido · equação de um plano a partir de ponto e normal",
        steps:[
          "O plano π passa por A=(1,0,2) e tem vetor normal n=(2,−1,3).",
          "Escreve n·[(x,y,z)−A]=0: (2,−1,3)·(x−1,y,z−2)=0.",
          "Desenvolve: 2(x−1)−y+3(z−2)=0.",
          "Simplifica para 2x−y+3z−8=0. Confirma com A: 2−0+6−8=0."
        ],
        result:"π: 2x−y+3z−8=0.",
        note:"Os coeficientes de x, y e z numa equação cartesiana do plano formam imediatamente um vetor normal."
      },
      remember:"Reta: pensa em vetor diretor. Plano: pensa em vetor normal. A relação entre esses vetores permite estudar posições relativas.",
      pitfalls:[
        "Concluir que uma reta está contida num plano apenas porque o seu vetor diretor é perpendicular ao normal; isso garante paralelismo da direção, não a pertença de um ponto.",
        "Trocar o papel de vetor diretor de uma reta pelo de vetor normal de um plano."
      ]
    },
    {
      id:"11-pe-distancias",
      kicker:"6 · DISTÂNCIA DE UM PONTO A UM PLANO",
      title:"A distância é a projeção perpendicular sobre a direção normal",
      paragraphs:[
        "A distância de um ponto P a um plano é o comprimento do segmento perpendicular ao plano que liga P ao seu ponto mais próximo no plano. O vetor normal fornece precisamente a direção dessa perpendicular.",
        "Se o plano é ax+by+cz+d=0 e P=(x₀,y₀,z₀), a distância obtém-se pelo valor absoluto da expressão do plano em P, dividido pela norma do vetor normal (a,b,c). O valor absoluto é indispensável porque distância nunca é negativa.",
        "A mesma fórmula pode ser entendida como uma projeção: escolhendo um ponto A do plano, a distância é |n·(P−A)|/||n||. Esta leitura liga diretamente o cálculo de distâncias ao produto escalar estudado nas secções anteriores."
      ],
      formulas:[
        "d(P,π)=|ax₀+by₀+cz₀+d|/√(a²+b²+c²)",
        "d(P,π)=|n·(P−A)|/||n||, com A∈π",
        "P∈π ⇔ d(P,π)=0"
      ],
      example:{
        title:"Exemplo resolvido · distância de um ponto a um plano",
        steps:[
          "Considera P=(1,2,3) e π: 2x−y+2z−5=0.",
          "Substitui as coordenadas de P no numerador: |2·1−2+2·3−5|=|1|=1.",
          "A norma do vetor normal n=(2,−1,2) é √(4+1+4)=3.",
          "Divide: d(P,π)=1/3."
        ],
        result:"A distância de P ao plano é 1/3 unidade de comprimento.",
        note:"Sem o valor absoluto, a expressão pode dar um valor negativo que indica apenas de que lado orientado do plano está o ponto, não uma distância negativa."
      },
      remember:"Distância ponto-plano = módulo da componente na direção normal, normalizada pelo comprimento do vetor normal.",
      pitfalls:[
        "Esquecer o valor absoluto no numerador da fórmula da distância.",
        "Dividir por a²+b²+c² em vez de pela norma √(a²+b²+c²)."
      ]
    }
  ],
  boundaryNotes:[
    "As AE de março de 2026 dizem explicitamente que lugares geométricos definidos a partir do produto escalar não pertencem ao núcleo obrigatório deste tema.",
    "Produto vetorial e extensões por lugares geométricos aparecem apenas como possíveis aprofundamentos e não são tratados como conteúdo nuclear deste capítulo."
  ]
};

export function mathDotProductReviewContentFor(themeId){
  return themeId==="11-pe"?DOT_PRODUCT_REVIEW:null;
}
