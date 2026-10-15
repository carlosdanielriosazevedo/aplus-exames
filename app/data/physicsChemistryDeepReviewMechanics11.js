export const FQA_MECHANICS_11_DEEP_REVIEW_VERSION="2026.10-wave4";

export const FQA_MECHANICS_11_DEEP_REVIEW={
  id:"f11-mechanics",
  title:"Mecânica",
  lead:"A Mecânica liga a descrição do movimento às interações que o produzem. Neste capítulo vais passar de posições, velocidades e gráficos para forças, leis de Newton, gravitação, movimento circular e análise experimental, sempre distinguindo grandezas escalares e vetoriais e justificando os modelos usados.",
  goals:[
    "Descrever movimentos retilíneos e curvilíneos a partir de posição, deslocamento, velocidade e aceleração.",
    "Interpretar gráficos posição-tempo, velocidade-tempo, aceleração-tempo e força-tempo.",
    "Relacionar forças com interações e aplicar as leis de Newton e a Lei da Gravitação Universal.",
    "Analisar movimentos retilíneos, queda livre, planos inclinados e situações com resistência do ar.",
    "Caracterizar o movimento circular uniforme e aplicar a dinâmica a satélites.",
    "Tratar dados experimentais de movimento, avaliando hipóteses, procedimentos, gráficos e conclusões."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 11.º ano · março de 2026 · Mecânica",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"f11-kinematics",
      kicker:"1 · TEMPO, POSIÇÃO, VELOCIDADE E ACELERAÇÃO",
      title:"Descrever um movimento começa por escolher um referencial",
      paragraphs:[
        "A posição de um corpo só tem significado depois de escolher um referencial e um eixo. Num movimento retilíneo, o deslocamento Δx=x_f−x_i pode ser positivo, negativo ou nulo; não deve ser confundido com a distância percorrida, que depende do caminho efetivamente realizado.",
        "A velocidade é vetorial: informa sobre a rapidez e a direção e sentido do movimento. A velocidade média relaciona o deslocamento com o intervalo de tempo. A aceleração média mede a variação da velocidade por unidade de tempo; uma aceleração positiva não significa automaticamente que o corpo está a aumentar a rapidez, porque é necessário comparar os sinais de v e a.",
        "Nos gráficos x(t), o declive informa sobre a velocidade; nos gráficos v(t), o declive informa sobre a aceleração e a área algébrica entre o gráfico e o eixo do tempo dá o deslocamento. A classificação em movimento uniforme, acelerado ou retardado deve ser feita a partir da evolução da velocidade e não apenas do sinal de a."
      ],
      formulas:[
        "Δx = x_f − x_i",
        "v_m = Δx/Δt",
        "a_m = Δv/Δt",
        "declive de x(t) ↔ velocidade",
        "área algébrica sob v(t) ↔ deslocamento"
      ],
      example:{
        title:"Exemplo resolvido · ler um movimento a partir de velocidades",
        steps:[
          "Um automóvel move-se num eixo Ox com v_i=+8,0 m s⁻¹ e, 4,0 s depois, tem v_f=+20,0 m s⁻¹.",
          "A aceleração média é a_m=(20,0−8,0)/4,0=3,0 m s⁻².",
          "Como v e a têm o mesmo sentido durante o intervalo considerado, a rapidez aumenta.",
          "Se a velocidade variasse linearmente, o deslocamento seria a área do trapézio no gráfico v(t): Δx=(8,0+20,0)/2×4,0=56 m."
        ],
        result:"a_m=3,0 m s⁻² e, para variação linear de v, Δx=56 m.",
        note:"O sinal da aceleração, isoladamente, não diz se o corpo acelera ou abranda; é preciso relacioná-lo com a velocidade."
      },
      remember:"Referencial, sinais e caráter vetorial vêm antes das fórmulas: sem eles, um cálculo correto pode representar uma interpretação física errada.",
      pitfalls:[
        "Confundir deslocamento com distância percorrida.",
        "Dizer que aceleração negativa significa sempre movimento retardado.",
        "Ler a altura de um gráfico x(t) como se fosse velocidade, em vez de analisar o declive."
      ]
    },
    {
      id:"f11-interactions",
      kicker:"2 · INTERAÇÕES E SEUS EFEITOS",
      title:"Uma força descreve uma interação, não uma propriedade isolada de um corpo",
      paragraphs:[
        "Uma força surge de uma interação entre dois corpos. As interações fundamentais são gravítica, eletromagnética, nuclear forte e nuclear fraca; diferem muito em intensidade relativa e alcance. No contexto mecânico macroscópico, muitas forças de contacto — normal, atrito e tensão — têm origem eletromagnética, enquanto o peso traduz a interação gravítica.",
        "Para estudar o movimento de um corpo, isola-se o sistema e constrói-se um diagrama de forças com apenas as forças que atuam nesse corpo. A resultante ΣF é a soma vetorial dessas forças. Forças que pertencem a um par ação-reação atuam em corpos diferentes e, por isso, não se anulam no mesmo diagrama de corpo livre.",
        "Uma força resultante nula não implica repouso: implica aceleração nula, pelo que um corpo pode permanecer em repouso ou mover-se com velocidade constante. Quando a resultante não é nula, a velocidade muda — em módulo, direção, sentido ou numa combinação destes efeitos."
      ],
      formulas:[
        "F⃗_resultante = ΣF⃗_i",
        "ΣF⃗ = 0 ⇒ a⃗ = 0",
        "par ação-reação: F⃗_A→B = −F⃗_B→A",
        "P⃗ = m g⃗ (perto da superfície terrestre)"
      ],
      example:{
        title:"Exemplo resolvido · forças num livro sobre uma mesa",
        steps:[
          "Um livro de 2,0 kg está em repouso sobre uma mesa horizontal; usa g=9,8 m s⁻².",
          "Sobre o livro atuam o peso P=mg=19,6 N para baixo e a força normal N da mesa para cima.",
          "Como a aceleração é nula, ΣF_y=0 e N−P=0.",
          "Logo N=19,6 N. A reação à normal é a força que o livro exerce na mesa, não o peso do livro."
        ],
        result:"A normal da mesa sobre o livro tem intensidade 19,6 N.",
        note:"Peso e normal podem ter a mesma intensidade nesta situação, mas não formam um par ação-reação porque atuam no mesmo corpo."
      },
      remember:"Antes de somar forças, pergunta sempre: qual é o corpo que estou a estudar e quem exerce cada força sobre ele?",
      pitfalls:[
        "Colocar no mesmo diagrama forças que atuam noutro corpo.",
        "Concluir que ΣF=0 implica necessariamente que v=0.",
        "Tratar peso e normal como um par ação-reação."
      ]
    },
    {
      id:"f11-newton-gravity",
      kicker:"3 · LEIS DE NEWTON E GRAVITAÇÃO",
      title:"A resultante das forças determina a aceleração",
      paragraphs:[
        "A Lei Fundamental da Dinâmica relaciona a resultante das forças com a aceleração do centro de massa: ΣF⃗=m a⃗, para massa constante. A Primeira Lei corresponde ao caso de resultante nula num referencial inercial; a Terceira Lei descreve forças de interação simultâneas, iguais em intensidade e opostas em direção e sentido, aplicadas em corpos diferentes.",
        "A Lei da Gravitação Universal descreve a atração entre duas massas puntiformes, ou corpos esfericamente simétricos quando observados exteriormente: F_g=Gm₁m₂/r². O campo gravítico criado por um planeta a distância r do seu centro tem intensidade g=GM/r², pelo que o valor de g diminui com a altitude.",
        "A queda livre perto da superfície terrestre é um caso em que, desprezando a resistência do ar e para variações de altitude pequenas, a aceleração é aproximadamente constante e independente da massa do corpo. As AE exigem determinar experimentalmente g e investigar precisamente esta independência, avaliando procedimentos e resultados."
      ],
      formulas:[
        "ΣF⃗ = m a⃗",
        "F_g = G m₁m₂/r²",
        "g = GM/r²",
        "P = mg",
        "G = 6,67430×10⁻¹¹ N m² kg⁻²"
      ],
      example:{
        title:"Exemplo resolvido · peso e aceleração gravítica em altitude",
        steps:[
          "Considera um satélite a uma distância do centro da Terra igual a 2R_T.",
          "Na superfície, g_0=GM/R_T².",
          "A 2R_T, g=GM/(2R_T)²=g_0/4.",
          "Se g_0≈9,8 m s⁻², então g≈2,45 m s⁻²."
        ],
        result:"A 2R_T do centro da Terra, a aceleração gravítica é aproximadamente um quarto do valor à superfície: 2,45 m s⁻².",
        note:"A distância r na lei da gravitação mede-se ao centro do planeta, não à sua superfície."
      },
      remember:"Massa é uma propriedade do corpo; peso é uma força e muda quando o campo gravítico muda.",
      pitfalls:[
        "Usar a altitude h diretamente no denominador de GM/r² em vez da distância ao centro r=R+h.",
        "Afirmar que objetos mais pesados têm maior aceleração em queda livre ideal.",
        "Misturar pares ação-reação com forças que se equilibram no mesmo corpo."
      ]
    },
    {
      id:"f11-forces-motion",
      kicker:"4 · FORÇAS E MOVIMENTOS",
      title:"As condições iniciais e a resultante das forças determinam a evolução do movimento",
      paragraphs:[
        "Num movimento retilíneo uniforme, a velocidade é constante e a resultante das forças é nula. Se a resultante for constante e a massa não variar, a aceleração também é constante e podem usar-se as equações do movimento uniformemente variado, sempre com um eixo e uma convenção de sinais explicitados.",
        "Em queda livre ideal, a única força relevante é o peso. Num plano inclinado, é útil decompor o peso em componentes paralela e perpendicular ao plano; a normal ajusta-se à componente perpendicular quando não existe aceleração nessa direção. Com atrito ou resistência do ar, a resultante e a energia mecânica podem alterar-se de forma diferente do modelo ideal.",
        "A resistência do ar depende das condições do movimento e pode crescer com a rapidez. Numa queda real, pode surgir velocidade terminal quando a força resistiva equilibra o peso, tornando a resultante nula e a velocidade constante. A escolha entre um modelo ideal e um modelo com resistência deve ser justificada pelo contexto e pela precisão pretendida."
      ],
      formulas:[
        "v = v₀ + at (a constante)",
        "Δx = v₀t + 1/2 at² (a constante)",
        "v² = v₀² + 2aΔx (a constante)",
        "componente do peso paralela ao plano: P_∥ = mg sinθ",
        "componente perpendicular: P_⊥ = mg cosθ"
      ],
      example:{
        title:"Exemplo resolvido · descida num plano inclinado sem atrito",
        steps:[
          "Um bloco parte do repouso num plano inclinado de 30°, desprezando o atrito e usando g=9,8 m s⁻².",
          "Ao longo do plano, a resultante é mg sin30°; logo a=g sin30°=4,9 m s⁻².",
          "Após percorrer 5,0 m, usa v²=v₀²+2aΔx=2×4,9×5,0=49.",
          "Assim, v=7,0 m s⁻¹."
        ],
        result:"A aceleração ao longo do plano é 4,9 m s⁻² e a rapidez após 5,0 m é 7,0 m s⁻¹.",
        note:"A massa cancela-se neste modelo porque tanto a componente do peso como a inércia são proporcionais à massa."
      },
      remember:"Não escolhas primeiro uma fórmula de cinemática: começa pelas forças, verifica se a aceleração é constante e só depois escolhe as equações adequadas.",
      pitfalls:[
        "Aplicar equações de aceleração constante a uma situação em que a resultante varia significativamente.",
        "Esquecer a convenção de sinais num movimento vertical ou num plano inclinado.",
        "Assumir que a normal é sempre igual a mg."
      ]
    },
    {
      id:"f11-circular",
      kicker:"5 · MOVIMENTO CIRCULAR UNIFORME",
      title:"Rapidez constante não significa velocidade constante",
      paragraphs:[
        "No movimento circular uniforme, a rapidez é constante mas a direção da velocidade muda continuamente. Por isso existe aceleração centrípeta, dirigida para o centro da trajetória. Esta aceleração não é uma força adicional: resulta da componente radial da resultante das forças reais que atuam no corpo.",
        "O período T é o tempo de uma volta e a frequência f é o número de voltas por unidade de tempo. A velocidade angular é ω=2π/T=2πf e a rapidez linear é v=ωr. A aceleração centrípeta pode escrever-se a_c=v²/r ou a_c=ω²r.",
        "Num satélite em órbita circular ideal, a força gravítica fornece a resultante centrípeta. Da igualdade GMm/r²=mv²/r obtém-se v=√(GM/r) e, combinando com T=2πr/v, conclui-se que o período aumenta fortemente com o raio orbital. A massa do satélite cancela-se no modelo ideal."
      ],
      formulas:[
        "f = 1/T",
        "ω = 2π/T = 2πf",
        "v = ωr = 2πr/T",
        "a_c = v²/r = ω²r",
        "F_resultante,radial = m v²/r",
        "órbita circular: v = √(GM/r)"
      ],
      example:{
        title:"Exemplo resolvido · rapidez e aceleração numa trajetória circular",
        steps:[
          "Um corpo descreve uma circunferência de raio 2,0 m com período T=4,0 s.",
          "ω=2π/T=π/2 rad s⁻¹.",
          "v=ωr=(π/2)×2,0=π≈3,14 m s⁻¹.",
          "a_c=v²/r≈3,14²/2,0≈4,93 m s⁻², dirigida para o centro."
        ],
        result:"v≈3,14 m s⁻¹ e a_c≈4,93 m s⁻².",
        note:"Mesmo com rapidez constante, a velocidade varia porque a sua direção muda."
      },
      remember:"‘Centrípeta’ descreve a direção da resultante radial; não acrescentes uma nova força chamada força centrípeta ao diagrama.",
      pitfalls:[
        "Concluir que a aceleração é nula porque a rapidez é constante.",
        "Desenhar uma força centrípeta extra além das forças reais.",
        "Usar a distância à superfície, em vez do raio orbital medido ao centro, em problemas de satélites."
      ]
    },
    {
      id:"f11-experimental-motion",
      kicker:"6 · ANÁLISE GRÁFICA E EXPERIMENTAL DO MOVIMENTO",
      title:"Uma conclusão experimental exige dados, modelo, incerteza e coerência gráfica",
      paragraphs:[
        "As AE pedem investigação experimental do movimento quando a resultante é nula e não nula, obtendo e interpretando gráficos velocidade-tempo. Num gráfico v(t), um declive aproximadamente nulo é compatível com aceleração nula; um declive aproximadamente constante e não nulo é compatível com aceleração constante, dentro da incerteza experimental.",
        "Também se deve relacionar experimentalmente velocidade e deslocamento num movimento de aceleração constante. A expressão v²=v₀²+2aΔx sugere linearizar os dados representando v² em função de Δx: o declive esperado é 2a e a ordenada na origem é v₀². Uma relação linear deve ser avaliada pela dispersão e não apenas por dois pontos escolhidos.",
        "Na determinação experimental de g por queda livre, o objetivo não é obter exatamente 9,8 m s⁻², mas produzir uma estimativa compatível com o modelo e discutir fontes de incerteza. Comparar corpos de massas diferentes permite testar a hipótese de que a aceleração gravítica não depende da massa quando a resistência do ar é desprezável."
      ],
      formulas:[
        "declive de v(t) = Δv/Δt ≈ a",
        "v² = v₀² + 2aΔx",
        "gráfico v²(Δx): declive ≈ 2a",
        "queda livre ideal: a≈g",
        "erro relativo = |valor_exp−valor_ref|/|valor_ref| ×100%"
      ],
      example:{
        title:"Exemplo resolvido · obter a aceleração de um gráfico linearizado",
        steps:[
          "Numa experiência com aceleração aproximadamente constante, o ajuste de v² em função de Δx é v²=5,8Δx+0,20, em unidades SI.",
          "Comparando com v²=v₀²+2aΔx, o declive 5,8 corresponde a 2a.",
          "Logo a=5,8/2=2,9 m s⁻².",
          "A ordenada na origem 0,20 m² s⁻² indica v₀²≈0,20, portanto v₀≈0,45 m s⁻¹."
        ],
        result:"O ajuste indica a≈2,9 m s⁻² e v₀≈0,45 m s⁻¹.",
        note:"Um ajuste linear ajuda a usar todos os dados e a avaliar a qualidade do modelo; não substitui a análise das incertezas e dos resíduos."
      },
      remember:"Num trabalho experimental, o gráfico não é decoração: é uma forma de testar o modelo e extrair parâmetros físicos com incerteza.",
      pitfalls:[
        "Forçar uma reta perfeita ou ignorar pontos discrepantes sem justificação.",
        "Confundir o declive de v²(Δx), que é 2a, com a própria aceleração.",
        "Declarar que g depende da massa apenas porque dois resultados experimentais não coincidem exatamente."
      ]
    }
  ]
};

export function physicsChemistryMechanics11DeepReviewFor(domainId){
  return domainId===FQA_MECHANICS_11_DEEP_REVIEW.id?FQA_MECHANICS_11_DEEP_REVIEW:null;
}
