function mc({id,year,domain,subtopicId,competencyId="fqa-data",prompt,options,answerIndex,explanation,difficultyTarget=3,stimulus}){
  return {id,year,domain,subtopicId,competencyId,prompt,options,answerIndex,explanation,responseType:"multiple-choice",gradingMode:"deterministic",sourceOrigin:"original",reviewStatus:"prototype",difficultyTarget,maxPoints:10,stimulus};
}

export const PHYSICS_CHEMISTRY_A_AUTHENTICITY_ITEMS=[
  mc({
    id:"FQA-AUTH-ELEM-G1",year:"10.º",domain:"q10-elements",subtopicId:"q10-periodicity",
    prompt:"O gráfico mostra a variação de uma propriedade periódica ao longo de quatro elementos consecutivos. Qual interpretação é mais consistente com uma diminuição global do raio atómico ao longo de um período?",
    options:["A carga nuclear efetiva aumenta e a nuvem eletrónica tende a contrair.","O número de níveis eletrónicos ocupados aumenta sempre de um elemento para o seguinte.","A carga nuclear diminui ao longo do período.","O número de protões se mantém constante."],answerIndex:0,
    explanation:"Ao longo de um período aumenta, em geral, a carga nuclear efetiva sentida pelos eletrões de valência, favorecendo uma contração do raio.",
    stimulus:{type:"line-chart",caption:"Raio atómico relativo ao longo de uma sequência de elementos do mesmo período.",xLabel:"Elemento na sequência",yLabel:"Raio relativo",points:[{x:1,y:1.00},{x:2,y:0.92},{x:3,y:0.86},{x:4,y:0.80}],xTicks:[1,2,3,4],yTicks:[0.8,0.9,1.0]}
  }),
  mc({
    id:"FQA-AUTH-ELEM-D1",year:"10.º",domain:"q10-elements",subtopicId:"q10-spectra",
    prompt:"No esquema, um eletrão transita de E3 para E1, emitindo radiação. Comparando essa emissão com uma transição E2→E1, a radiação E3→E1 terá:",
    options:["maior frequência, se a diferença de energia for maior.","sempre menor frequência, independentemente dos níveis.","a mesma frequência porque o átomo é o mesmo.","energia nula por se tratar de emissão."],answerIndex:0,
    explanation:"A energia do fotão emitido é igual à diferença entre níveis; maior diferença de energia corresponde a maior frequência.",
    stimulus:{type:"diagram",caption:"Níveis de energia eletrónicos simplificados.",nodes:[{id:"e3",label:"E3",note:"nível superior"},{id:"e2",label:"E2"},{id:"e1",label:"E1",note:"nível inferior"}]}
  }),

  mc({
    id:"FQA-AUTH-MAT-G1",year:"10.º",domain:"q10-matter",subtopicId:"q10-enthalpy",
    prompt:"O gráfico representa uma reação exotérmica. Que afirmação é compatível com o perfil energético mostrado?",
    options:["Os produtos têm menor entalpia do que os reagentes.","Os produtos têm maior entalpia do que os reagentes.","A reação tem ΔH positivo.","Não existe barreira energética."],answerIndex:0,
    explanation:"Numa reação exotérmica, os produtos ficam a menor entalpia do que os reagentes, correspondendo a ΔH<0.",
    stimulus:{type:"line-chart",caption:"Perfil energético simplificado de uma reação química.",xLabel:"Progresso da reação",yLabel:"Energia relativa",points:[{x:0,y:6},{x:1,y:7},{x:2,y:10},{x:3,y:7},{x:4,y:4}],xTicks:[0,2,4],yTicks:[4,7,10]}
  }),
  mc({
    id:"FQA-AUTH-MAT-D1",year:"10.º",domain:"q10-matter",subtopicId:"q10-gases-solutions",
    prompt:"O procedimento esquematizado corresponde à preparação de uma solução por:",
    options:["diluição de uma solução-mãe.","filtração de um precipitado.","titulação ácido-base.","destilação fracionada."],answerIndex:0,
    explanation:"Medir uma alíquota, transferi-la para balão volumétrico e completar até ao traço corresponde a uma diluição.",
    stimulus:{type:"diagram",caption:"Sequência experimental.",nodes:[{id:"a",label:"Pipeta",note:"medir alíquota"},{id:"b",label:"Balão volumétrico",note:"transferir"},{id:"c",label:"Adicionar solvente",note:"até ao traço"},{id:"d",label:"Homogeneizar"}]}
  }),

  mc({
    id:"FQA-AUTH-ENE-G1",year:"10.º",domain:"f10-energy",subtopicId:"f10-work",competencyId:"fqa-problems",
    prompt:"O gráfico apresenta a energia cinética em função da distância percorrida. Admitindo massa constante, qual é o trabalho da força resultante entre 0 m e 4 m?",
    options:["24 J","20 J","8 J","4 J"],answerIndex:0,
    explanation:"Pelo teorema da energia cinética, W_R=ΔEc=28−4=24 J.",
    stimulus:{type:"line-chart",caption:"Energia cinética de um corpo ao longo do percurso.",xLabel:"x / m",yLabel:"Ec / J",points:[{x:0,y:4},{x:1,y:10},{x:2,y:16},{x:3,y:22},{x:4,y:28}],xTicks:[0,2,4],yTicks:[4,16,28]}
  }),
  mc({
    id:"FQA-AUTH-ENE-D1",year:"10.º",domain:"f10-energy",subtopicId:"f10-electric",competencyId:"fqa-experimental",
    prompt:"No esquema de medição, qual disposição é adequada para determinar simultaneamente a corrente no resistor e a diferença de potencial aos seus terminais?",
    options:["Amperímetro em série e voltímetro em paralelo.","Amperímetro em paralelo e voltímetro em série.","Ambos em série.","Ambos em paralelo com a fonte, ignorando o resistor."],answerIndex:0,
    explanation:"A corrente mede-se com amperímetro em série; a diferença de potencial mede-se com voltímetro em paralelo.",
    stimulus:{type:"diagram",caption:"Esquema funcional de um circuito de medição.",nodes:[{id:"source",label:"Fonte"},{id:"amp",label:"A",note:"em série"},{id:"res",label:"Resistor"},{id:"volt",label:"V",note:"aos terminais do resistor"}]}
  }),

  mc({
    id:"FQA-AUTH-MEC-G1",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-kinematics",competencyId:"fqa-data",
    prompt:"A partir do gráfico velocidade-tempo, qual é o deslocamento entre 0 s e 4 s?",
    options:["16 m","8 m","4 m","32 m"],answerIndex:0,
    explanation:"A área sob o gráfico é a área de um trapézio: ((2+6)/2)×4=16 m.",
    stimulus:{type:"line-chart",caption:"Velocidade de um corpo em função do tempo.",xLabel:"t / s",yLabel:"v / m s⁻¹",points:[{x:0,y:2},{x:1,y:3},{x:2,y:4},{x:3,y:5},{x:4,y:6}],xTicks:[0,2,4],yTicks:[2,4,6]}
  }),
  mc({
    id:"FQA-AUTH-MEC-D1",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-forces-motion",
    prompt:"O esquema representa um bloco sujeito a uma força aplicada horizontal e a atrito em sentido oposto. Se a força aplicada for maior do que o atrito, o bloco terá:",
    options:["aceleração no sentido da força aplicada.","velocidade necessariamente nula.","aceleração no sentido do atrito.","força resultante nula."],answerIndex:0,
    explanation:"A resultante horizontal fica no sentido da força aplicada quando esta excede a força de atrito.",
    stimulus:{type:"diagram",caption:"Forças horizontais num bloco.",nodes:[{id:"fric",label:"← Atrito"},{id:"block",label:"Bloco"},{id:"app",label:"Força aplicada →",note:"maior módulo"}]}
  }),

  mc({
    id:"FQA-AUTH-WAV-G1",year:"11.º",domain:"f11-waves",subtopicId:"f11-sound",competencyId:"fqa-data",
    prompt:"O gráfico mostra o tempo de voo de um sinal sonoro em função da distância. Qual é a velocidade de propagação aproximada?",
    options:["340 m s⁻¹","170 m s⁻¹","680 m s⁻¹","0,0030 m s⁻¹"],answerIndex:0,
    explanation:"v=Δd/Δt≈3,4/0,010=340 m s⁻¹.",
    stimulus:{type:"line-chart",caption:"Tempo de voo do som para diferentes distâncias.",xLabel:"t / s",yLabel:"d / m",points:[{x:0.002,y:0.68},{x:0.004,y:1.36},{x:0.006,y:2.04},{x:0.008,y:2.72},{x:0.010,y:3.40}],xTicks:[0.002,0.006,0.010],yTicks:[0.68,2.04,3.40]}
  }),
  mc({
    id:"FQA-AUTH-WAV-D1",year:"11.º",domain:"f11-waves",subtopicId:"f11-optics",
    prompt:"O esquema representa luz a passar de um meio 1 para um meio 2, aproximando-se da normal. Que conclusão é adequada?",
    options:["O índice de refração do meio 2 é maior do que o do meio 1.","O índice de refração do meio 2 é menor.","A frequência da luz torna-se zero.","A luz sofreu reflexão total."],answerIndex:0,
    explanation:"Ao entrar num meio de maior índice de refração, a luz aproxima-se da normal.",
    stimulus:{type:"diagram",caption:"Refração numa interface.",nodes:[{id:"m1",label:"Meio 1",note:"raio incidente"},{id:"normal",label:"Normal"},{id:"m2",label:"Meio 2",note:"raio mais próximo da normal"}]}
  }),

  mc({
    id:"FQA-AUTH-EQ-G1",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-equilibrium-state",competencyId:"fqa-data",
    prompt:"O gráfico mostra as concentrações de reagente e produto até atingirem valores constantes. O instante a partir do qual ambas se mantêm aproximadamente constantes corresponde:",
    options:["ao estabelecimento de equilíbrio dinâmico.","ao desaparecimento de todas as reações.","a uma constante de equilíbrio igual a zero.","à ausência de colisões entre partículas."],answerIndex:0,
    explanation:"No equilíbrio dinâmico, as concentrações macroscópicas permanecem constantes enquanto as reações direta e inversa continuam.",
    stimulus:{type:"line-chart",caption:"Concentração de uma espécie ao longo do tempo até estabilização.",xLabel:"t / unidade",yLabel:"Concentração relativa",points:[{x:0,y:0.2},{x:1,y:0.45},{x:2,y:0.62},{x:3,y:0.70},{x:4,y:0.73},{x:5,y:0.74}],xTicks:[0,2.5,5],yTicks:[0.2,0.5,0.8]}
  }),
  mc({
    id:"FQA-AUTH-EQ-D1",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-lechatelier",
    prompt:"Num sistema exotérmico em equilíbrio, o esquema mostra um aumento de temperatura imposto ao sistema. Segundo Le Châtelier, espera-se favorecer:",
    options:["o sentido endotérmico.","o sentido exotérmico.","nenhum sentido em qualquer caso.","apenas a reação mais rápida."],answerIndex:0,
    explanation:"O sistema tende a contrariar o aumento de temperatura favorecendo o sentido que absorve energia.",
    stimulus:{type:"diagram",caption:"Perturbação térmica de um equilíbrio.",nodes:[{id:"eq",label:"Equilíbrio exotérmico"},{id:"heat",label:"↑ Temperatura"},{id:"response",label:"Resposta",note:"favorecer sentido endotérmico"}]}
  }),

  mc({
    id:"FQA-AUTH-AQ-G1",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-titration",competencyId:"fqa-data",
    prompt:"O gráfico representa uma curva de titulação. A região de variação mais acentuada de pH é a mais adequada para localizar:",
    options:["o ponto de equivalência.","a massa molar do indicador.","a densidade do titulante.","o ponto de fusão do ácido."],answerIndex:0,
    explanation:"A variação brusca de pH ocorre na vizinhança do ponto de equivalência em muitas titulações ácido-base.",
    stimulus:{type:"line-chart",caption:"Curva de titulação simplificada.",xLabel:"Volume de titulante / mL",yLabel:"pH",points:[{x:0,y:2.5},{x:10,y:2.8},{x:20,y:3.4},{x:24,y:5.0},{x:25,y:8.5},{x:26,y:10.5},{x:30,y:11.4}],xTicks:[0,15,30],yTicks:[2,7,12]}
  }),
  mc({
    id:"FQA-AUTH-AQ-D1",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-redox",
    prompt:"O esquema representa uma transferência de eletrões de X para Y. Qual afirmação é correta?",
    options:["X é oxidado e Y é reduzido.","X é reduzido e Y é oxidado.","Ambos são oxidados.","Não ocorre processo redox."],answerIndex:0,
    explanation:"Quem perde eletrões é oxidado; quem os recebe é reduzido.",
    stimulus:{type:"diagram",caption:"Transferência eletrónica.",nodes:[{id:"x",label:"X",note:"cede e⁻"},{id:"e",label:"e⁻"},{id:"y",label:"Y",note:"recebe e⁻"}]}
  })
];
