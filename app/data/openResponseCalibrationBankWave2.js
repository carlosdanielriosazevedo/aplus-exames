export const OPEN_RESPONSE_ADVERSARIAL_CASES=[
  // PORTUGUÊS — PT639-FND-311
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"keyword-soup",maxScore:.55,response:"problema alternativas conclusão clareza progressão leitor organização aplicação informação"},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"verbose-off-topic",maxScore:.55,response:"A mobilidade sustentável é um tema muito importante nas cidades modernas. Existem transportes públicos, bicicletas, automóveis elétricos e muitas outras soluções. As pessoas devem pensar no ambiente e escolher opções melhores, porque o futuro depende das escolhas de todos."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"O texto começa pelo problema e depois apresenta alternativas, o que ajuda a organizar a informação. No entanto, a ordem entre problema, alternativas e condições não influencia a clareza, porque qualquer sequência teria exatamente o mesmo efeito."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"concise-correct",minScore:.2,maxScore:.75,response:"A sequência problema → alternativas → condições cria uma progressão lógica e ajuda o leitor a relacionar as partes do texto."},

  // PORTUGUÊS — PT639-FND-313
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"keyword-soup",maxScore:.55,response:"biblioteca tese razões argumentos estudo acesso alunos posição benefícios igualdade"},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"verbose-off-topic",maxScore:.55,response:"As bibliotecas escolares são espaços agradáveis onde existem livros, computadores, mesas e funcionários. Muitos alunos gostam de estudar nesses locais e algumas escolas organizam atividades culturais, clubes de leitura e exposições ao longo do ano letivo."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"O apoio ao estudo e o acesso de quem não tem espaço em casa são benefícios concretos da proposta. Mesmo assim, essas razões não sustentam a posição do autor, porque uma tese deve ser defendida sem apresentar consequências ou exemplos."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"concise-correct",minScore:.2,maxScore:.75,response:"As razões mostram efeitos concretos do horário alargado e, por isso, transformam a opinião do autor numa posição fundamentada."},

  // PORTUGUÊS — PT639-FND-315
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"keyword-soup",maxScore:.55,response:"iniciativa horta anáfora referência consequência por isso coesão frases continuidade"},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"verbose-off-topic",maxScore:.55,response:"A horta escolar pode ser usada por várias turmas para aprender ciências, alimentação e sustentabilidade. Também pode melhorar os espaços exteriores da escola e incentivar os alunos a participar em atividades práticas com colegas e professores."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"«Esta iniciativa» retoma a criação da horta e evita repetição. Já «por isso» não exprime consequência; introduz uma oposição entre o envolvimento das turmas e a criação do segundo espaço."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"concise-correct",minScore:.2,maxScore:.75,response:"«Esta iniciativa» retoma a horta criada; «por isso» liga o envolvimento das turmas ao alargamento como relação de consequência."},

  // PORTUGUÊS — PT639-FND-317
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"keyword-soup",maxScore:.55,response:"pronome o relatório antecedente coesão referência repetição entregar rever Leonor"},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"verbose-off-topic",maxScore:.55,response:"Marta entregou um documento depois de o rever com cuidado, o que mostra preocupação com o trabalho. Leonor recebe o relatório no final e poderá depois analisá-lo ou enviar comentários à colega."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"O pronome evita repetição e ajuda a manter a coesão, mas o seu antecedente é Leonor: é Leonor que é retomada pelo pronome «o» depois da entrega do relatório."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"concise-correct",minScore:.2,maxScore:.75,response:"«O» retoma «o relatório» e evita repetir o nome, mantendo o mesmo referente ligado às duas ações."},

  // PORTUGUÊS — PT639-FND-319
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"keyword-soup",maxScore:.55,response:"predicativo complemento direto proposta propriedade verbo consideraram útil comunidade"},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"verbose-off-topic",maxScore:.55,response:"A proposta pode ser útil para a comunidade porque talvez resolva problemas locais. Os alunos deram uma opinião positiva sobre a ideia e consideraram que a comunidade poderia beneficiar da sua aplicação."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"A expressão atribui uma propriedade a «a proposta», mas a função sintática é complemento oblíquo e não predicativo do complemento direto."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"concise-correct",minScore:.2,maxScore:.75,response:"É predicativo do complemento direto, porque atribui à proposta, que é complemento direto, a propriedade de ser útil."},

  // PORTUGUÊS — PT639-FND-322
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"keyword-soup",maxScore:.55,response:"oração subordinada temporal relativa restritiva chuva atividade tempo que classificação"},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"verbose-off-topic",maxScore:.55,response:"A chuva interrompeu uma atividade escolar e os alunos só puderam retomá-la mais tarde. A frase descreve uma sequência de acontecimentos e mostra que a atividade já tinha começado antes de ser interrompida."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"«Quando a chuva terminou» é temporal, mas «que tinha sido interrompida» é uma oração completiva, porque completa o sentido do verbo «retomaram»."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"concise-correct",minScore:.2,maxScore:.75,response:"A primeira oração é adverbial temporal; a segunda é adjetiva relativa restritiva e delimita qual é a atividade referida."},

  // FQ A — espectros
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"keyword-soup",maxScore:.55,response:"eletrões níveis energia fotões riscas frequências elemento espectro característico transições"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"verbose-off-topic",maxScore:.55,response:"Os elementos químicos estão organizados na Tabela Periódica por número atómico e apresentam propriedades diferentes. Alguns são metais, outros não metais e podem formar compostos muito variados com propriedades físicas distintas."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"As riscas resultam de transições eletrónicas entre níveis e cada elemento tem níveis próprios. Contudo, as frequências emitidas são iguais para todos os elementos, pelo que o padrão não permite distinguir um elemento de outro."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"concise-correct",minScore:.3,response:"As transições entre níveis eletrónicos emitem fotões de energias específicas; como os níveis dependem do elemento, o conjunto de riscas funciona como uma assinatura."},

  // FQ A — diluição
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"keyword-soup",maxScore:.55,response:"pipeta alíquota balão volumétrico solvente traço menisco homogeneizar diluição 100 mL"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"verbose-off-topic",maxScore:.55,response:"Uma solução é uma mistura homogénea de soluto e solvente. A concentração pode ser expressa em diferentes unidades e depende da quantidade de soluto presente num determinado volume de solução."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"Mede-se a alíquota com pipeta e transfere-se para o balão volumétrico. Depois deve ultrapassar-se ligeiramente o traço para garantir que há solvente suficiente e não é necessário homogeneizar."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"concise-correct",minScore:.3,response:"Mede-se a alíquota com pipeta, transfere-se para balão volumétrico, completa-se até ao traço com leitura correta do menisco e homogeneíza-se."},

  // FQ A — energia
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"keyword-soup",maxScore:.55,response:"massa altura velocidade energia cinética potencial mecânica inicial final incerteza sensores rampa"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"verbose-off-topic",maxScore:.55,response:"Uma esfera que desce uma rampa acelera devido à componente do peso ao longo do plano. O movimento pode depender do atrito, da inclinação e das características do material da esfera e da rampa."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"Mede-se massa, altura e velocidade e calculam-se as energias inicial e final. Se os valores não forem exatamente iguais, conclui-se obrigatoriamente que a energia mecânica não se conserva, porque a incerteza experimental deve ser ignorada."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"concise-correct",minScore:.3,response:"Mede-se massa, altura e velocidade em dois pontos, calcula-se a energia mecânica em ambos e verifica-se se os valores são compatíveis tendo em conta a incerteza."},

  // FQ A — mecânica
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"keyword-soup",maxScore:.55,response:"aceleração declive velocidade tempo deslocamento área algébrica distância sinal módulos gráfico"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"verbose-off-topic",maxScore:.55,response:"Num movimento retilíneo, a velocidade pode aumentar, diminuir ou manter-se constante. O gráfico pode apresentar diferentes segmentos ao longo do tempo e permite representar visualmente o movimento de um corpo."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"mixed-contradictory",maxScore:.55,requiresReview:true,response:"O declive do gráfico dá a aceleração e a área algébrica dá o deslocamento. Porém, quando a velocidade muda de sinal, a distância e o deslocamento continuam sempre iguais."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"concise-correct",minScore:.3,response:"A aceleração obtém-se pelo declive de v(t); o deslocamento pela área algébrica. A distância soma os módulos quando há mudança de sinal."},

  // FQ A — ondas
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"keyword-soup",maxScore:.55,response:"distância propagação tempo incerteza relativa repetir medições média dispersão atrasos temperatura som"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"verbose-off-topic",maxScore:.55,response:"O som é uma onda mecânica que precisa de um meio material para se propagar. A sua velocidade depende das propriedades do meio e pode variar com a temperatura e outras condições ambientais."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"É útil repetir medições e controlar a temperatura, mas deve usar-se a menor distância possível para reduzir a incerteza relativa do tempo medido."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"concise-correct",minScore:.3,response:"Aumentar a distância reduz o peso relativo da resolução temporal; repetir medições permite usar a média e avaliar a dispersão."},

  // FQ A — equilíbrio
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"keyword-soup",maxScore:.55,response:"temperatura exotérmico endotérmico catalisador rapidez equilíbrio Kc composição dois sentidos"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"verbose-off-topic",maxScore:.55,response:"Num sistema químico podem existir reagentes e produtos em simultâneo. A velocidade das reações depende de vários fatores e a temperatura influencia a energia cinética média das partículas."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"mixed-contradictory",maxScore:.55,requiresReview:true,response:"A temperatura favorece o sentido endotérmico num equilíbrio exotérmico. O catalisador acelera os dois sentidos, mas também aumenta Kc e altera a composição final."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"concise-correct",minScore:.3,response:"Ao aquecer, favorece-se o sentido endotérmico. O catalisador só acelera a chegada ao equilíbrio; não altera Kc nem a composição."},

  // FQ A — titulação
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"keyword-soup",maxScore:.55,response:"equivalência estequiometria titulante titulado indicador curva pH bureta volume incerteza ponto final"},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"verbose-off-topic",maxScore:.55,response:"Uma titulação envolve adicionar gradualmente uma solução a outra e observar alterações no sistema. É uma técnica muito usada em laboratório para estudar soluções e reações químicas."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"mixed-contradictory",maxScore:.65,requiresReview:true,response:"A equivalência corresponde à proporção estequiométrica e pode ser detetada por indicador ou curva de pH. Em qualquer titulação ácido-base, porém, o ponto de equivalência ocorre necessariamente a pH 7."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"concise-correct",minScore:.3,response:"Na equivalência os reagentes estão na proporção estequiométrica. Pode usar-se indicador ou curva de pH; a leitura da bureta introduz incerteza."}
];

export const OPEN_RESPONSE_ADVERSARIAL_PROFILES=["keyword-soup","verbose-off-topic","mixed-contradictory","concise-correct"];
