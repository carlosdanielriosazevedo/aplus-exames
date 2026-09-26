export const PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS=[
  {
    id:"FQA-C-ELEM-01",year:"10.º",domain:"q10-elements",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:2,maxPoints:12,
    prompt:"Uma amostra de alumínio tem massa 5,40 g. Considera M(Al)=27,0 g mol⁻¹ e N_A=6,02×10²³ mol⁻¹. Determina o número de átomos de alumínio na amostra.",
    steps:[
      {id:"n",label:"Quantidade de matéria de Al",type:"numeric",value:0.2,tolerance:0.002,unit:"mol",points:5,expected:"0,200 mol"},
      {id:"N",label:"Número de átomos",type:"numeric",value:1.204e23,tolerance:2e20,unit:"átomos",points:7,expected:"1,20×10²³ átomos"}
    ],
    guidance:"Apresenta as relações usadas e conserva os valores intermédios com precisão suficiente."
  },
  {
    id:"FQA-C-MAT-01",year:"10.º",domain:"q10-matter",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:2,maxPoints:12,
    prompt:"Pretende-se preparar 250,0 mL de uma solução 0,0800 mol dm⁻³ a partir de uma solução-mãe 0,500 mol dm⁻³. Determina o volume de solução-mãe necessário.",
    steps:[
      {id:"n",label:"Quantidade de soluto na solução final",type:"numeric",value:0.0200,tolerance:0.0002,unit:"mol",points:5,expected:"0,0200 mol"},
      {id:"V",label:"Volume da solução-mãe",type:"numeric",value:0.0400,tolerance:0.0005,unit:"dm³",points:7,expected:"0,0400 dm³ (40,0 mL)"}
    ],
    guidance:"A relação de diluição pode ser usada diretamente ou deduzida por conservação da quantidade de soluto."
  },
  {
    id:"FQA-C-ENE-01",year:"10.º",domain:"f10-energy",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:2,maxPoints:12,
    prompt:"Um corpo de 2,0 kg parte do repouso e recebe trabalho resultante de 36 J. Determina o módulo da sua velocidade final.",
    steps:[
      {id:"Ec",label:"Energia cinética final",type:"numeric",value:36,tolerance:0.2,unit:"J",points:5,expected:"36 J"},
      {id:"v",label:"Velocidade final",type:"numeric",value:6.0,tolerance:0.05,unit:"m s⁻¹",points:7,expected:"6,0 m s⁻¹"}
    ],
    guidance:"Relaciona o trabalho da resultante com a variação da energia cinética."
  },
  {
    id:"FQA-C-MEC-01",year:"11.º",domain:"f11-mechanics",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:2,maxPoints:12,
    prompt:"Um carrinho de 0,80 kg aumenta a velocidade de 1,0 m s⁻¹ para 5,0 m s⁻¹ em 2,0 s, com aceleração constante. Determina o módulo da força resultante.",
    steps:[
      {id:"a",label:"Aceleração",type:"numeric",value:2.0,tolerance:0.02,unit:"m s⁻²",points:5,expected:"2,0 m s⁻²"},
      {id:"F",label:"Força resultante",type:"numeric",value:1.6,tolerance:0.02,unit:"N",points:7,expected:"1,6 N"}
    ],
    guidance:"A primeira etapa determina a aceleração; a segunda aplica a segunda lei de Newton."
  },
  {
    id:"FQA-C-WAV-01",year:"11.º",domain:"f11-waves",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:2,maxPoints:12,
    prompt:"Uma onda tem frequência 250 Hz e comprimento de onda 1,36 m. Determina a velocidade de propagação e o tempo necessário para percorrer 680 m.",
    steps:[
      {id:"v",label:"Velocidade de propagação",type:"numeric",value:340,tolerance:1,unit:"m s⁻¹",points:5,expected:"340 m s⁻¹"},
      {id:"t",label:"Tempo de propagação",type:"numeric",value:2.0,tolerance:0.02,unit:"s",points:7,expected:"2,0 s"}
    ],
    guidance:"Calcula primeiro v=fλ e usa depois a relação entre distância, velocidade e tempo."
  },
  {
    id:"FQA-C-EQ-01",year:"11.º",domain:"q11-equilibrium",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:3,maxPoints:12,
    prompt:"Para A(g) ⇌ 2 B(g), num dado estado de equilíbrio, [A]=0,50 mol dm⁻³ e [B]=0,40 mol dm⁻³. Determina Kc.",
    steps:[
      {id:"expr",label:"Expressão de Kc",type:"text",accepted:["[B]^2/[A]","[B]²/[A]","B^2/A"],points:5,expected:"Kc=[B]²/[A]"},
      {id:"Kc",label:"Valor de Kc",type:"numeric",value:0.32,tolerance:0.003,unit:null,points:7,expected:"0,32"}
    ],
    guidance:"A expressão da constante deve respeitar os coeficientes estequiométricos."
  },
  {
    id:"FQA-C-AQ-01",year:"11.º",domain:"q11-aqueous",competencyId:"fqa-problems",responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:3,maxPoints:12,
    prompt:"Uma solução tem pH=3,40. Determina [H₃O⁺] e, a 25 °C, [OH⁻]. Considera Kw=1,0×10⁻¹⁴.",
    steps:[
      {id:"h",label:"Concentração de H₃O⁺",type:"numeric",value:3.981e-4,tolerance:2e-6,unit:"mol dm⁻³",points:5,expected:"3,98×10⁻⁴ mol dm⁻³"},
      {id:"oh",label:"Concentração de OH⁻",type:"numeric",value:2.512e-11,tolerance:2e-13,unit:"mol dm⁻³",points:7,expected:"2,51×10⁻¹¹ mol dm⁻³"}
    ],
    guidance:"Usa a definição de pH e, depois, o produto iónico da água."
  },

  {
    id:"FQA-R-ELEM-01",year:"10.º",domain:"q10-elements",competencyId:"fqa-communication",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Explica por que razão os espectros de emissão atómicos podem ser usados para identificar elementos químicos.",
    criteria:[
      "Relaciona as riscas espectrais com transições entre níveis de energia eletrónicos.",
      "Explica que os níveis de energia são característicos de cada elemento.",
      "Conclui que o padrão de frequências/comprimentos de onda funciona como identificação do elemento."
    ]
  },
  {
    id:"FQA-R-MAT-01",year:"10.º",domain:"q10-matter",competencyId:"fqa-experimental",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Descreve um procedimento adequado para preparar, por diluição, 100,0 mL de uma solução a partir de uma solução-mãe, referindo material volumétrico e cuidados essenciais.",
    criteria:[
      "Mede uma alíquota adequada da solução-mãe com material volumétrico apropriado.",
      "Transfere para balão volumétrico e completa com solvente até ao traço.",
      "Refere homogeneização e leitura correta do menisco/controlo do volume."
    ]
  },
  {
    id:"FQA-R-ENE-01",year:"10.º",domain:"f10-energy",competencyId:"fqa-experimental",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:12,
    prompt:"Propõe um procedimento experimental para testar se a energia mecânica de uma esfera se conserva ao descer uma rampa.",
    criteria:[
      "Identifica as grandezas a medir e instrumentos adequados para massa, altura e velocidade.",
      "Explica como determinar a energia mecânica inicial e final.",
      "Estabelece o critério de comparação entre os valores, reconhecendo a incerteza experimental."
    ]
  },
  {
    id:"FQA-R-MEC-01",year:"11.º",domain:"f11-mechanics",competencyId:"fqa-data",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Num gráfico velocidade-tempo de um movimento retilíneo, explica como obter a aceleração e o deslocamento num intervalo de tempo.",
    criteria:[
      "Associa a aceleração ao declive do gráfico velocidade-tempo.",
      "Associa o deslocamento à área algébrica entre a curva e o eixo do tempo.",
      "Distingue deslocamento de distância percorrida quando a velocidade muda de sinal."
    ]
  },
  {
    id:"FQA-R-WAV-01",year:"11.º",domain:"f11-waves",competencyId:"fqa-experimental",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Num ensaio para determinar a velocidade do som por tempo de voo, explica duas decisões experimentais que reduzam a incerteza relativa do resultado.",
    criteria:[
      "Propõe aumentar a distância de propagação quando compatível com o equipamento.",
      "Refere repetição de medições e tratamento da dispersão/valor médio.",
      "Reconhece a necessidade de controlar atrasos instrumentais e condições do meio."
    ]
  },
  {
    id:"FQA-R-EQ-01",year:"11.º",domain:"q11-equilibrium",competencyId:"fqa-communication",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Explica o efeito de aumentar a temperatura num equilíbrio exotérmico e distingue esse efeito do efeito de adicionar um catalisador.",
    criteria:[
      "Relaciona o aumento de temperatura com o favorecimento do sentido endotérmico.",
      "Distingue alteração da composição de equilíbrio de alteração da rapidez.",
      "Explica que o catalisador acelera os dois sentidos sem alterar Kc nem a composição de equilíbrio."
    ]
  },
  {
    id:"FQA-R-AQ-01",year:"11.º",domain:"q11-aqueous",competencyId:"fqa-experimental",responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:3,maxPoints:10,
    prompt:"Explica como identificar experimentalmente o ponto de equivalência numa titulação ácido-base e indica uma fonte de incerteza relevante.",
    criteria:[
      "Relaciona o ponto de equivalência com a proporção estequiométrica entre titulante e titulado.",
      "Indica um método de deteção adequado, como indicador ou curva de pH.",
      "Identifica uma fonte de incerteza coerente, como leitura do volume ou determinação do ponto final."
    ]
  }
];

export function physicsChemistryConstructedItemById(id){
  return PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.find(item=>item.id===id)||null;
}
