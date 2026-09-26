export const PHYSICS_CHEMISTRY_A_DATA_ITEMS=[
  {
    id:"FQA-DATA-ELEM-01",year:"10.º",domain:"q10-elements",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:2,maxPoints:10,
    prompt:"A tabela apresenta valores relativos de raio atómico para três elementos consecutivos do mesmo período. Qual interpretação é mais consistente com a tendência periódica?",
    stimulus:{type:"table",columns:["Elemento","X","Y","Z"],rows:[["Raio relativo","1,00","0,91","0,84"]]},
    options:["O raio aumenta com a carga nuclear efetiva.","O raio tende a diminuir ao longo do período.","O raio é independente da posição na Tabela Periódica.","Os três elementos têm necessariamente o mesmo número de eletrões de valência."],
    answerIndex:1,explanation:"Ao longo de um período, o aumento da carga nuclear efetiva tende a aproximar os eletrões do núcleo, diminuindo o raio."
  },
  {
    id:"FQA-DATA-MAT-01",year:"10.º",domain:"q10-matter",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:2,maxPoints:10,
    prompt:"Após exposição a radiação ultravioleta, registou-se a concentração relativa de ozono num sistema fechado. Qual conclusão é suportada pelos dados?",
    stimulus:{type:"table",columns:["Tempo / min","0","5","10","15"],rows:[["[O₃] relativa","1,00","0,82","0,69","0,61"]]},
    options:["A concentração de ozono aumentou continuamente.","A radiação não teve qualquer efeito observável.","A concentração de ozono diminuiu nas condições do ensaio.","A concentração atingiu zero aos 15 min."],
    answerIndex:2,explanation:"Os valores relativos diminuem ao longo do tempo; os dados suportam uma diminuição de ozono, sem permitirem concluir que se esgotou."
  },
  {
    id:"FQA-DATA-ENE-01",year:"10.º",domain:"f10-energy",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:2,maxPoints:10,
    prompt:"Dois corpos recebem a mesma energia por radiação durante o mesmo intervalo. O corpo A aumenta 8 °C e o corpo B aumenta 3 °C. Admitindo massas iguais e perdas desprezáveis, qual conclusão é mais adequada?",
    stimulus:{type:"table",columns:["Corpo","A","B"],rows:[["ΔT / °C","8","3"]]},
    options:["A capacidade térmica mássica de A é maior.","A capacidade térmica mássica de B é maior.","As capacidades térmicas mássicas são necessariamente iguais.","Não é possível comparar as capacidades térmicas mássicas."],
    answerIndex:1,explanation:"Para a mesma energia e massa, menor variação de temperatura implica maior capacidade térmica mássica."
  },
  {
    id:"FQA-DATA-MEC-01",year:"11.º",domain:"f11-mechanics",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:2,maxPoints:10,
    prompt:"A velocidade de um corpo varia como mostra a tabela. Admitindo movimento retilíneo, qual é a aceleração média entre 1,0 s e 3,0 s?",
    stimulus:{type:"table",columns:["t / s","0","1,0","2,0","3,0"],rows:[["v / m s⁻¹","1,0","3,0","5,0","7,0"]]},
    options:["1,0 m s⁻²","2,0 m s⁻²","3,0 m s⁻²","4,0 m s⁻²"],
    answerIndex:1,explanation:"a_m=(7,0−3,0)/(3,0−1,0)=2,0 m s⁻²."
  },
  {
    id:"FQA-DATA-WAV-01",year:"11.º",domain:"f11-waves",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Um fio condutor é percorrido por corrente elétrica. Ao aumentar a corrente, a intensidade do campo magnético medida à mesma distância varia conforme a tabela. Qual relação é mais compatível com os dados?",
    stimulus:{type:"table",columns:["I / A","1,0","2,0","3,0"],rows:[["B / unidade relativa","1,0","2,0","3,0"]]},
    options:["B é aproximadamente proporcional a I.","B é inversamente proporcional a I.","B é independente de I.","B varia com o quadrado de I."],
    answerIndex:0,explanation:"Duplicar ou triplicar a corrente duplica ou triplica B nas condições indicadas, sugerindo proporcionalidade direta."
  },
  {
    id:"FQA-DATA-EQ-01",year:"11.º",domain:"q11-equilibrium",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"Num processo industrial, foram testadas três condições. Qual condição apresenta o melhor compromisso entre rendimento elevado e menor consumo energético, considerando apenas a tabela?",
    stimulus:{type:"table",columns:["Condição","Rendimento","Consumo energético relativo"],rows:[["A","82%","1,00"],["B","88%","1,45"],["C","85%","1,10"]]},
    options:["A, porque tem sempre o maior rendimento.","B, porque o rendimento é o único critério relevante.","C, porque aumenta o rendimento face a A com acréscimo energético moderado.","Não é possível comparar qualquer condição."],
    answerIndex:2,explanation:"A condição C melhora o rendimento face a A com aumento energético muito menor do que B; é o melhor compromisso entre os dois critérios apresentados."
  },
  {
    id:"FQA-DATA-AQ-01",year:"11.º",domain:"q11-aqueous",competencyId:"fqa-data",responseType:"multiple-choice",gradingMode:"deterministic",difficultyTarget:3,maxPoints:10,
    prompt:"A solubilidade de um sal foi medida a diferentes temperaturas. Qual afirmação é suportada pelos resultados?",
    stimulus:{type:"table",columns:["T / °C","20","30","40","50"],rows:[["Solubilidade / g por 100 g H₂O","18","22","27","33"]]},
    options:["A solubilidade diminui com a temperatura.","A solubilidade aumenta nas condições estudadas.","A solubilidade é constante.","A 50 °C o sal é insolúvel."],
    answerIndex:1,explanation:"A solubilidade aumenta de 18 para 33 g por 100 g de água entre 20 °C e 50 °C."
  }
].map(item=>({...item,sourceOrigin:"original",reviewStatus:"prototype"}));
