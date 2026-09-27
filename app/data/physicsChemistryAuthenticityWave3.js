function base(item){
  return {...item,sourceOrigin:"original",reviewStatus:"prototype"};
}

export const PHYSICS_CHEMISTRY_A_AUTHENTICITY_WAVE3=[
  base({
    id:"FQA-W3-DATA-ELEM-01",year:"10.º",domain:"q10-elements",subtopicId:"q10-spectra",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"A tabela mostra quatro riscas observadas num espectro de emissão de uma amostra desconhecida. A referência do elemento X contém riscas em 410, 434, 486 e 656 nm. Qual conclusão é sustentada pelos dados?",
    stimulus:{type:"table",columns:["Riscas observadas / nm","410","434","486","656"],rows:[["Intensidade relativa","0,42","0,31","0,75","1,00"]]},
    options:["A amostra é compatível com a presença do elemento X.","A amostra não pode conter X porque as intensidades são diferentes.","As riscas provam que todos os eletrões têm a mesma energia.","O espectro permite determinar diretamente a massa molar de X."],
    answerIndex:0,explanation:"A identificação espectral baseia-se sobretudo na coincidência das posições das riscas características; as intensidades podem depender das condições experimentais."
  }),
  base({
    id:"FQA-W3-DATA-MAT-01",year:"10.º",domain:"q10-matter",subtopicId:"q10-gases-solutions",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Foram preparadas quatro soluções do mesmo soluto. Qual ensaio apresenta maior concentração em quantidade de matéria?",
    stimulus:{type:"table",columns:["Ensaio","n / mmol","V / mL"],rows:[["A","2,0","100"],["B","3,0","150"],["C","2,5","100"],["D","4,0","250"]]},
    options:["A","B","C","D"],answerIndex:2,
    explanation:"c=n/V. Os valores são 0,020; 0,020; 0,025; 0,016 mol dm⁻³, respetivamente."
  }),
  base({
    id:"FQA-W3-DATA-ENE-01",year:"10.º",domain:"f10-energy",subtopicId:"f10-thermal-radiation",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Uma placa é aquecida com potência constante. A tabela mostra a temperatura ao longo do tempo. Em que intervalo a taxa média de aumento da temperatura é maior?",
    stimulus:{type:"table",columns:["t / min","0","2","4","6","8"],rows:[["T / °C","20","31","40","47","52"]]},
    options:["0–2 min","2–4 min","4–6 min","6–8 min"],answerIndex:0,
    explanation:"As variações de temperatura em intervalos iguais são 11, 9, 7 e 5 °C; a primeira taxa média é a maior."
  }),
  base({
    id:"FQA-W3-DATA-MEC-01",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-experimental-motion",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Um sensor registou a velocidade de um carrinho. Qual valor representa melhor a aceleração média entre 1,0 s e 3,0 s?",
    stimulus:{type:"table",columns:["t / s","0,0","1,0","2,0","3,0"],rows:[["v / m s⁻¹","0,4","1,2","2,1","3,0"]]},
    options:["0,45 m s⁻²","0,90 m s⁻²","1,20 m s⁻²","1,80 m s⁻²"],answerIndex:1,
    explanation:"a_m=(3,0−1,2)/(3,0−1,0)=0,90 m s⁻²."
  }),
  base({
    id:"FQA-W3-DATA-WAV-01",year:"11.º",domain:"f11-waves",subtopicId:"f11-optics",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Um feixe passa do ar para três materiais. Admitindo o mesmo ângulo de incidência, em qual deles a velocidade de propagação da luz é menor?",
    stimulus:{type:"table",columns:["Material","A","B","C"],rows:[["Índice de refração","1,33","1,50","1,62"]]},
    options:["A","B","C","É igual nos três"],answerIndex:2,
    explanation:"v=c/n; maior índice de refração corresponde a menor velocidade de propagação."
  }),
  base({
    id:"FQA-W3-DATA-EQ-01",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-equilibrium-state",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Num sistema fechado A ⇌ B, registaram-se as concentrações seguintes. A partir de que instante os dados são compatíveis com um estado de equilíbrio dinâmico?",
    stimulus:{type:"table",columns:["t / min","0","2","4","6","8"],rows:[["[A] / mol dm⁻³","0,80","0,62","0,51","0,50","0,50"],["[B] / mol dm⁻³","0,10","0,28","0,39","0,40","0,40"]]},
    options:["0 min","2 min","4 min","6 min"],answerIndex:3,
    explanation:"A partir de 6 min as concentrações se mantêm constantes dentro dos dados apresentados, embora as reações direta e inversa continuem."
  }),
  base({
    id:"FQA-W3-DATA-AQ-01",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-titration",competencyId:"fqa-data",
    responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Numa titulação, qual intervalo de volume contém a variação de pH mais acentuada e, portanto, a região mais provável do ponto de equivalência?",
    stimulus:{type:"table",columns:["V titulante / mL","18,0","19,0","20,0","21,0","22,0"],rows:[["pH","3,1","3,5","5,2","9,8","10,4"]]},
    options:["18–19 mL","19–20 mL","20–21 mL","21–22 mL"],answerIndex:2,
    explanation:"A maior variação de pH ocorre entre 20 e 21 mL."
  }),

  base({
    id:"FQA-W3-C-ELEM-01",year:"10.º",domain:"q10-elements",subtopicId:"q10-amount-molar",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:3,maxPoints:15,
    prompt:"Uma amostra contém 3,01×10²² moléculas de CO₂. Considera N_A=6,02×10²³ mol⁻¹ e M(CO₂)=44,0 g mol⁻¹. Determina a massa da amostra.",
    steps:[
      {id:"n",label:"Quantidade de matéria",type:"numeric",value:0.0500,tolerance:0.0005,unit:"mol",points:7,expected:"0,0500 mol"},
      {id:"m",label:"Massa da amostra",type:"numeric",value:2.20,tolerance:0.02,unit:"g",points:8,expected:"2,20 g"}
    ],guidance:"Relaciona primeiro o número de entidades com a quantidade de matéria e só depois calcula a massa."
  }),
  base({
    id:"FQA-W3-C-MAT-01",year:"10.º",domain:"q10-matter",subtopicId:"q10-enthalpy",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:3,maxPoints:15,
    prompt:"Numa reação, 0,250 mol de reagente libertam 18,0 kJ. Admitindo proporcionalidade, determina a energia libertada por mol e a energia libertada quando reagem 0,600 mol.",
    steps:[
      {id:"molar",label:"Energia libertada por mol",type:"numeric",value:72.0,tolerance:0.5,unit:"kJ mol⁻¹",points:7,expected:"72,0 kJ mol⁻¹"},
      {id:"energy",label:"Energia para 0,600 mol",type:"numeric",value:43.2,tolerance:0.4,unit:"kJ",points:8,expected:"43,2 kJ"}
    ],guidance:"Mantém claro que se trata do módulo da energia libertada."
  }),
  base({
    id:"FQA-W3-C-ENE-01",year:"10.º",domain:"f10-energy",subtopicId:"f10-electric",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:3,maxPoints:15,
    prompt:"Um aquecedor elétrico de 1200 W funciona durante 8,0 min. Determina a energia elétrica consumida em joule e em kWh.",
    steps:[
      {id:"joule",label:"Energia em joule",type:"numeric",value:576000,tolerance:3000,unit:"J",points:7,expected:"5,76×10⁵ J"},
      {id:"kwh",label:"Energia em kWh",type:"numeric",value:0.160,tolerance:0.002,unit:"kWh",points:8,expected:"0,160 kWh"}
    ],guidance:"Converte o tempo de forma coerente com a unidade de potência usada em cada etapa."
  }),
  base({
    id:"FQA-W3-C-MEC-01",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-newton-gravity",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:4,maxPoints:15,
    prompt:"Um corpo de 4,0 kg é puxado horizontalmente por uma força de 18 N. A força de atrito tem módulo 6,0 N. Determina a força resultante e a aceleração.",
    steps:[
      {id:"fr",label:"Força resultante",type:"numeric",value:12.0,tolerance:0.1,unit:"N",points:7,expected:"12,0 N"},
      {id:"a",label:"Aceleração",type:"numeric",value:3.0,tolerance:0.03,unit:"m s⁻²",points:8,expected:"3,0 m s⁻²"}
    ],guidance:"Representa mentalmente os sentidos das forças antes de aplicar a segunda lei de Newton."
  }),
  base({
    id:"FQA-W3-C-WAV-01",year:"11.º",domain:"f11-waves",subtopicId:"f11-optics",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:4,maxPoints:15,
    prompt:"A luz propaga-se num material com índice de refração 1,50. Considera c=3,00×10⁸ m s⁻¹ e uma frequência de 5,00×10¹⁴ Hz. Determina a velocidade no material e o comprimento de onda.",
    steps:[
      {id:"v",label:"Velocidade no material",type:"numeric",value:2.00e8,tolerance:2e6,unit:"m s⁻¹",points:7,expected:"2,00×10⁸ m s⁻¹"},
      {id:"lambda",label:"Comprimento de onda",type:"numeric",value:4.00e-7,tolerance:5e-9,unit:"m",points:8,expected:"4,00×10⁻⁷ m"}
    ],guidance:"Usa n=c/v e depois v=fλ."
  }),
  base({
    id:"FQA-W3-C-EQ-01",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-limiting-yield",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:4,maxPoints:15,
    prompt:"Numa síntese, o rendimento teórico é 12,0 g e foram obtidos 9,30 g de produto. Determina o rendimento percentual e a massa que seria obtida se o rendimento aumentasse para 85,0%.",
    steps:[
      {id:"yield",label:"Rendimento percentual",type:"numeric",value:77.5,tolerance:0.4,unit:"%",points:7,expected:"77,5%"},
      {id:"mass",label:"Massa para 85,0%",type:"numeric",value:10.2,tolerance:0.1,unit:"g",points:8,expected:"10,2 g"}
    ],guidance:"Distingue sempre massa teórica de massa efetivamente obtida."
  }),
  base({
    id:"FQA-W3-C-AQ-01",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-titration",competencyId:"fqa-problems",
    responseType:"stepwise",gradingMode:"structured-provisional",difficultyTarget:4,maxPoints:15,
    prompt:"25,00 mL de uma solução de HCl são titulados com NaOH 0,1000 mol dm⁻³. O ponto de equivalência ocorre após 20,40 mL de titulante. Determina a quantidade de NaOH adicionada e a concentração de HCl.",
    steps:[
      {id:"n",label:"Quantidade de NaOH no ponto de equivalência",type:"numeric",value:0.002040,tolerance:0.000010,unit:"mol",points:7,expected:"2,040×10⁻³ mol"},
      {id:"c",label:"Concentração de HCl",type:"numeric",value:0.0816,tolerance:0.0005,unit:"mol dm⁻³",points:8,expected:"0,0816 mol dm⁻³"}
    ],guidance:"Usa a estequiometria 1:1 entre HCl e NaOH no ponto de equivalência."
  }),

  base({
    id:"FQA-W3-R-ELEM-01",year:"10.º",domain:"q10-elements",subtopicId:"q10-periodicity",competencyId:"fqa-communication",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Compara qualitativamente o raio atómico de dois elementos do mesmo período, um situado mais à direita do que o outro, e fundamenta a tendência.",
    criteria:[
      "Indica que, em geral, o raio atómico diminui da esquerda para a direita num período.",
      "Relaciona a tendência com o aumento da carga nuclear efetiva sentida pelos eletrões de valência.",
      "Explica que os eletrões permanecem no mesmo nível principal de energia, não compensando totalmente o aumento da atração nuclear."
    ]
  }),
  base({
    id:"FQA-W3-R-MAT-01",year:"10.º",domain:"q10-matter",subtopicId:"q10-intermolecular",competencyId:"fqa-communication",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Explica por que razão duas substâncias moleculares com massas molares semelhantes podem apresentar temperaturas de ebulição bastante diferentes.",
    criteria:[
      "Identifica que a temperatura de ebulição depende da intensidade das interações intermoleculares.",
      "Distingue tipos de interação relevantes, como dispersão, dipolo-dipolo e ligação de hidrogénio.",
      "Relaciona interações mais fortes com maior energia necessária para separar as moléculas e, em geral, maior temperatura de ebulição."
    ]
  }),
  base({
    id:"FQA-W3-R-ENE-01",year:"10.º",domain:"f10-energy",subtopicId:"f10-thermodynamics",competencyId:"fqa-communication",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Uma máquina térmica não consegue converter integralmente em trabalho toda a energia recebida por aquecimento. Explica esta afirmação à luz da Segunda Lei da Termodinâmica.",
    criteria:[
      "Reconhece que uma máquina térmica opera entre fontes a temperaturas diferentes.",
      "Refere que parte da energia tem de ser transferida para a fonte fria.",
      "Conclui que a conversão integral de calor em trabalho num ciclo é incompatível com a Segunda Lei."
    ]
  }),
  base({
    id:"FQA-W3-R-MEC-01",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-experimental-motion",competencyId:"fqa-experimental",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Num ensaio de queda livre com sensor de posição, indica como tratarias os dados para estimar g e como avaliarias a qualidade do resultado.",
    criteria:[
      "Propõe obter velocidades/acelerações a partir dos dados ou ajustar um modelo cinemático adequado.",
      "Relaciona o parâmetro estimado com o valor de g e explicita unidades.",
      "Compara com um valor de referência considerando dispersão, resolução e outras fontes de incerteza."
    ]
  }),
  base({
    id:"FQA-W3-R-WAV-01",year:"11.º",domain:"f11-waves",subtopicId:"f11-induction",competencyId:"fqa-communication",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Explica por que razão mover um íman relativamente a uma bobina pode produzir corrente elétrica e por que razão manter ambos imóveis deixa de produzir esse efeito.",
    criteria:[
      "Relaciona a indução com a variação do fluxo magnético através da bobina.",
      "Indica que o movimento relativo pode alterar o fluxo e originar uma força eletromotriz induzida.",
      "Explica que, com fluxo constante, deixa de existir força eletromotriz induzida nas condições descritas."
    ]
  }),
  base({
    id:"FQA-W3-R-EQ-01",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-green-industry",competencyId:"fqa-communication",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Num processo industrial reversível, explica por que razão a condição que maximiza o rendimento de equilíbrio pode não ser a melhor condição de operação.",
    criteria:[
      "Distingue rendimento de equilíbrio de rapidez de reação.",
      "Refere compromissos energéticos, económicos, de segurança ou ambientais.",
      "Explica que a operação industrial procura um compromisso entre conversão, velocidade, custos e sustentabilidade."
    ]
  }),
  base({
    id:"FQA-W3-R-AQ-01",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-solubility",competencyId:"fqa-experimental",
    responseType:"restricted-response",gradingMode:"rubric-review",difficultyTarget:4,maxPoints:12,
    prompt:"Descreve como poderias investigar experimentalmente o efeito da temperatura na solubilidade de um sólido em água e identificar duas variáveis que teriam de ser controladas.",
    criteria:[
      "Propõe preparar sistemas a diferentes temperaturas e determinar a quantidade máxima de soluto dissolvido.",
      "Mantém constante a natureza do soluto e do solvente e usa uma quantidade de solvente comparável.",
      "Refere controlo/medição da temperatura e um método coerente para reconhecer saturação ou quantificar soluto dissolvido."
    ]
  })
];
