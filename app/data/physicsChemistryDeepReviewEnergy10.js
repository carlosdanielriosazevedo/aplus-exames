export const FQA_ENERGY_10_DEEP_REVIEW_VERSION="2026.10-wave3";

export const FQA_ENERGY_10_DEEP_REVIEW={
  id:"f10-energy",
  title:"Energia e sua conservação",
  lead:"A energia permite descrever fenómenos mecânicos, elétricos e térmicos com uma linguagem comum: identificar o sistema, reconhecer transferências e transformações, aplicar um balanço e interpretar onde a energia útil se conserva ou se degrada. Neste capítulo vais ligar trabalho, movimento, energia mecânica, circuitos, calor, radiação e Termodinâmica.",
  goals:[
    "Relacionar movimento e energia cinética, distinguindo estado energético de transferência de energia.",
    "Calcular trabalho de forças e aplicar o Teorema da Energia Cinética.",
    "Analisar conservação e variação da energia mecânica, incluindo forças dissipativas e rendimento.",
    "Interpretar circuitos elétricos, potência, efeito Joule e o comportamento de um gerador real.",
    "Distinguir temperatura, calor e mecanismos de transferência de energia e resolver balanços térmicos.",
    "Aplicar a Primeira e a Segunda Leis da Termodinâmica e interpretar a degradação da energia útil."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 10.º ano · março de 2026 · Energia e sua conservação",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"f10-energy-motion",
      kicker:"1 · ENERGIA E MOVIMENTOS",
      title:"A energia cinética depende da massa e do quadrado da velocidade",
      paragraphs:[
        "Ao escolher um sistema mecânico, a energia cinética descreve o movimento do seu centro de massa. Um corpo mais rápido tem mais energia cinética, e a dependência em v² faz com que duplicar a velocidade quadruplique E_c, mantendo a massa.",
        "Energia não é uma força nem uma propriedade que ‘se gasta’ simplesmente: pode ser transferida entre sistemas ou transformada entre diferentes formas. Num problema, começa por identificar o sistema e os estados inicial e final antes de decidir que relações usar.",
        "A variação de energia cinética mede a diferença entre os estados de movimento final e inicial. Esta ideia será ligada ao trabalho das forças: uma força pode transferir energia para ou do sistema e, com isso, alterar E_c."
      ],
      formulas:[
        "E_c = 1/2 mv²",
        "ΔE_c = E_c,f − E_c,i",
        "v→2v, com m constante ⇒ E_c→4E_c"
      ],
      example:{
        title:"Exemplo resolvido · efeito da velocidade na energia cinética",
        steps:[
          "Um automóvel de 1000 kg desloca-se inicialmente a 10 m s⁻¹.",
          "E_c,i=1/2×1000×10²=50 000 J.",
          "Se passar para 20 m s⁻¹, E_c,f=1/2×1000×20²=200 000 J.",
          "A velocidade duplicou, mas a energia cinética ficou quatro vezes maior."
        ],
        result:"E_c aumenta de 50 kJ para 200 kJ; ΔE_c=150 kJ.",
        note:"A relação é quadrática em v, por isso não deves raciocinar como se E_c fosse proporcional à velocidade."
      },
      remember:"Antes de calcular transferências, identifica o estado energético inicial e final do sistema.",
      pitfalls:[
        "Esquecer o quadrado da velocidade em E_c.",
        "Confundir energia cinética com força resultante ou afirmar que um corpo parado ‘não tem energia’ em qualquer sentido."
      ]
    },
    {
      id:"f10-work",
      kicker:"2 · TRABALHO E TEOREMA DA ENERGIA CINÉTICA",
      title:"O trabalho mede energia transferida pela ação de forças",
      paragraphs:[
        "O trabalho de uma força constante num deslocamento retilíneo depende da intensidade da força, do deslocamento e do ângulo entre ambos. Uma força paralela e no mesmo sentido do movimento realiza trabalho positivo; uma força oposta realiza trabalho negativo; uma força perpendicular realiza trabalho nulo.",
        "O Teorema da Energia Cinética estabelece que a soma dos trabalhos de todas as forças que atuam no corpo é igual à variação da sua energia cinética. Assim, o sinal do trabalho resultante indica se a rapidez tende a aumentar ou diminuir no intervalo considerado.",
        "As AE incluem a verificação experimental da relação entre ΔE_c e a distância percorrida quando a força resultante é constante. Nesse caso, o trabalho resultante cresce linearmente com a distância e os dados experimentais devem ser tratados com incerteza e análise gráfica."
      ],
      formulas:[
        "W_F = F d cosθ",
        "W_resultante = ΣW_i",
        "ΣW_i = ΔE_c",
        "força resultante constante e paralela: ΔE_c = F_R d"
      ],
      example:{
        title:"Exemplo resolvido · trabalho resultante e velocidade final",
        steps:[
          "Um corpo de 2,0 kg parte do repouso e uma força resultante constante de 6,0 N atua no sentido do movimento ao longo de 3,0 m.",
          "W_R=Fd=6,0×3,0=18 J.",
          "Pelo Teorema da Energia Cinética, ΔE_c=18 J, logo E_c,f=18 J.",
          "1/2×2,0×v²=18, portanto v²=18 e v≈4,24 m s⁻¹."
        ],
        result:"O trabalho resultante é 18 J e a rapidez final é aproximadamente 4,24 m s⁻¹.",
        note:"O teorema usa a soma dos trabalhos das forças, não apenas o trabalho de uma força escolhida."
      },
      remember:"Trabalho não é ‘força vezes distância’ em qualquer situação: o ângulo e o sistema escolhido importam.",
      pitfalls:[
        "Usar W=Fd sem considerar o ângulo entre força e deslocamento.",
        "Igualar o trabalho de uma única força a ΔE_c quando existem outras forças com trabalho não nulo."
      ]
    },
    {
      id:"f10-mechanical-energy",
      kicker:"3 · ENERGIA POTENCIAL E MECÂNICA",
      title:"A energia mecânica conserva-se apenas quando o modelo o permite",
      paragraphs:[
        "A força gravítica é conservativa, pelo que o seu trabalho pode ser relacionado com a variação da energia potencial gravítica. Perto da superfície da Terra e para g aproximadamente constante, usa-se E_pg=mgh relativamente a um nível de referência escolhido.",
        "A energia mecânica é a soma da energia cinética e da energia potencial. Se apenas forças conservativas realizarem trabalho relevante, E_m conserva-se. Se forças não conservativas, como o atrito, transferirem energia para fora da descrição mecânica, a energia mecânica varia.",
        "A diminuição de energia mecânica por forças dissipativas não significa violação da conservação da energia total: a energia é transformada ou transferida, frequentemente para energia interna. As AE ligam esta análise a quedas, ressaltos, situações do quotidiano e ao cálculo de rendimentos."
      ],
      formulas:[
        "E_pg = mgh",
        "W_g = −ΔE_pg",
        "E_m = E_c + E_pg",
        "W_não conservativas = ΔE_m",
        "rendimento η = E_útil/E_fornecida ×100%"
      ],
      example:{
        title:"Exemplo resolvido · queda com conservação da energia mecânica",
        steps:[
          "Uma bola de 0,50 kg é largada do repouso a 5,0 m de altura, desprezando a resistência do ar e usando g=9,8 m s⁻².",
          "No início, E_c=0 e E_pg=mgh=0,50×9,8×5,0=24,5 J.",
          "Imediatamente antes do solo, tomando E_pg≈0, a conservação dá E_c≈24,5 J.",
          "1/2×0,50×v²=24,5, logo v≈9,9 m s⁻¹."
        ],
        result:"A rapidez imediatamente antes do impacto é aproximadamente 9,9 m s⁻¹ no modelo sem resistência do ar.",
        note:"Num ressalto real, a altura seguinte é menor porque parte da energia mecânica é convertida noutras formas."
      },
      remember:"Conservação da energia total é geral; conservação da energia mecânica depende de quais interações são incluídas no modelo.",
      pitfalls:[
        "Afirmar que a energia mecânica se conserva sempre.",
        "Tratar o nível zero de energia potencial como uma altura física obrigatória em vez de uma referência escolhida."
      ]
    },
    {
      id:"f10-electric",
      kicker:"4 · ENERGIA E FENÓMENOS ELÉTRICOS",
      title:"Corrente, tensão e resistência descrevem como a energia circula num circuito",
      paragraphs:[
        "A corrente elétrica mede a quantidade de carga que atravessa uma secção por unidade de tempo; a diferença de potencial está relacionada com a energia transferida por unidade de carga. A resistência caracteriza a oposição do componente à corrente nas condições consideradas.",
        "Em associações em série, a corrente é a mesma nos componentes e as diferenças de potencial somam-se; em paralelo, a diferença de potencial é comum aos ramos e as correntes somam-se nos nós. Medições com amperímetros e voltímetros devem respeitar a forma correta de ligação dos aparelhos.",
        "Um gerador real pode ser modelado por uma força eletromotriz ε e uma resistência interna r. Quando fornece corrente, parte da energia é dissipada internamente e a tensão terminal pode ser descrita por U=ε−rI. O gráfico U(I) permite estimar ε pelo valor para I=0 e r pelo módulo do declive."
      ],
      formulas:[
        "I = ΔQ/Δt",
        "U = ΔE/q",
        "lei de Ohm para resistor óhmico: U=RI",
        "potência elétrica: P=UI=RI²=U²/R",
        "gerador real em descarga: U=ε−rI"
      ],
      example:{
        title:"Exemplo resolvido · interpretar um gerador real",
        steps:[
          "Uma pilha tem ε=1,50 V e resistência interna r=0,20 Ω e fornece I=0,50 A.",
          "A queda de tensão interna é rI=0,20×0,50=0,10 V.",
          "A tensão nos terminais é U=ε−rI=1,50−0,10=1,40 V.",
          "A potência entregue ao circuito externo é P=UI=1,40×0,50=0,70 W."
        ],
        result:"U=1,40 V e a potência entregue ao exterior é 0,70 W.",
        note:"A força eletromotriz não é uma força mecânica; é energia fornecida pelo gerador por unidade de carga."
      },
      remember:"Num circuito, acompanha simultaneamente carga, energia e potência; não trates corrente como ‘energia que circula’.",
      pitfalls:[
        "Ligar um amperímetro em paralelo ou um voltímetro em série.",
        "Assumir U=ε num gerador real que fornece corrente, ignorando a resistência interna."
      ]
    },
    {
      id:"f10-thermal-radiation",
      kicker:"5 · ENERGIA, FENÓMENOS TÉRMICOS E RADIAÇÃO",
      title:"Temperatura não é calor: calor é energia em transferência",
      paragraphs:[
        "A temperatura caracteriza o estado térmico e determina o sentido espontâneo da transferência de energia por calor entre sistemas: essa transferência ocorre do sistema a maior temperatura para o de menor temperatura até ao equilíbrio térmico. Em geral, maior temperatura corresponde a maior energia cinética média microscópica das partículas.",
        "A energia pode ser transferida por condução, convecção e radiação. A condução não exige movimento macroscópico de matéria; a convecção envolve movimento de fluido; a radiação eletromagnética pode propagar-se no vazio. Todos os corpos emitem radiação e, à temperatura ambiente, a emissão é predominantemente infravermelha.",
        "Nos aquecimentos sem mudança de fase usa-se Q=mcΔT. Numa mudança de fase à temperatura de transição, a energia transferida relaciona-se com a entalpia mássica de transição. As AE incluem a determinação experimental da capacidade térmica mássica e da entalpia de fusão do gelo, e a investigação da potência de painéis fotovoltaicos em função da irradiância e da tensão."
      ],
      formulas:[
        "sem mudança de fase: Q=mcΔT",
        "mudança de fase: Q=mL",
        "potência: P=ΔE/Δt",
        "irradiância: G=P_radiação/A",
        "rendimento de conversão: η=P_útil/P_incidente"
      ],
      example:{
        title:"Exemplo resolvido · aquecer água sem mudança de fase",
        steps:[
          "Aquecem-se 0,50 kg de água de 20 °C para 60 °C, usando c=4,18×10³ J kg⁻¹ K⁻¹.",
          "ΔT=40 K.",
          "Q=mcΔT=0,50×4,18×10³×40=83 600 J.",
          "São necessários aproximadamente 83,6 kJ transferidos para a água no modelo considerado."
        ],
        result:"Q≈83,6 kJ.",
        note:"Uma diferença de temperatura tem o mesmo valor numérico em kelvin e em graus Celsius."
      },
      remember:"Calor é energia transferida por diferença de temperatura; não é uma substância armazenada dentro do corpo.",
      pitfalls:[
        "Usar Q=mcΔT durante uma mudança de fase a temperatura constante.",
        "Dizer que radiação térmica necessita de ar ou outro meio material para se propagar."
      ]
    },
    {
      id:"f10-thermodynamics",
      kicker:"6 · PRIMEIRA E SEGUNDA LEIS DA TERMODINÂMICA",
      title:"A energia conserva-se, mas a capacidade de a aproveitar degrada-se",
      paragraphs:[
        "A Primeira Lei da Termodinâmica é um balanço de energia. Adotando a convenção Q>0 quando entra energia por calor no sistema e W_on>0 quando o exterior realiza trabalho sobre o sistema, a variação de energia interna é ΔU=Q+W_on. Uma convenção diferente altera sinais, não a física; por isso a convenção deve ser explícita.",
        "A energia interna pode variar por aquecimento, arrefecimento, mudanças de fase ou trabalho. Num problema real podem coexistir vários mecanismos e o balanço deve incluir todas as transferências relevantes, em vez de aplicar uma fórmula térmica isolada sem definir o sistema.",
        "A Segunda Lei introduz uma direção para os processos espontâneos: embora a energia total se conserve, a energia útil tende a diminuir. Nenhuma máquina real converte integralmente toda a energia fornecida em energia útil; o rendimento é inferior a 100% e a análise dessa degradação é central para a utilização sustentável de recursos."
      ],
      formulas:[
        "convenção usada: ΔU = Q + W_on",
        "se o sistema realiza trabalho W_by>0: ΔU=Q−W_by",
        "rendimento: η=E_útil/E_fornecida=P_útil/P_fornecida",
        "0≤η<1 para processos reais de conversão com perdas"
      ],
      example:{
        title:"Exemplo resolvido · balanço pela Primeira Lei",
        steps:[
          "Um sistema recebe 500 J por calor e realiza 180 J de trabalho sobre o exterior.",
          "Usando ΔU=Q−W_by, temos Q=+500 J e W_by=+180 J.",
          "ΔU=500−180=320 J.",
          "A energia interna aumenta porque entrou mais energia por calor do que saiu sob a forma de trabalho."
        ],
        result:"ΔU=+320 J.",
        note:"Indicar a convenção de sinais evita resultados contraditórios que são apenas diferenças de notação."
      },
      remember:"A Primeira Lei controla a quantidade total de energia; a Segunda Lei ajuda a perceber a direção dos processos e a qualidade da energia disponível.",
      pitfalls:[
        "Misturar convenções de sinal para trabalho dentro do mesmo cálculo.",
        "Confundir conservação de energia com possibilidade de converter 100% da energia fornecida em energia útil."
      ]
    }
  ]
};

export function physicsChemistryEnergy10DeepReviewFor(domainId){
  return domainId==="f10-energy"?FQA_ENERGY_10_DEEP_REVIEW:null;
}
