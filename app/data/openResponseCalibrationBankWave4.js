export const OPEN_RESPONSE_WAVE4_CASES=[
  // PORTUGUÊS — respostas parcialmente certas, factos relevantes que não respondem e formulações prudentes corretas
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"A sequência entre problema, alternativas e condições ajuda a organizar o texto. Ainda assim, essa ordem não tem qualquer efeito na clareza global."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"related-nonanswer",maxScore:.55,response:"O texto usa vocabulário acessível e frases curtas, características que podem facilitar a leitura."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"hedged-correct",minScore:.18,response:"A clareza parece resultar, em grande parte, da progressão problema → alternativas → condições, porque orienta o leitor entre as partes."},

  {subject:"portuguese",itemId:"PT639-FND-313",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"O apoio ao estudo e o acesso de quem não tem condições em casa são benefícios concretos. Porém, esses benefícios não funcionam como razões de sustentação da tese."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"related-nonanswer",maxScore:.55,response:"As bibliotecas escolares disponibilizam livros, computadores e espaços de trabalho que muitos alunos utilizam."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"hedged-correct",minScore:.18,response:"Diria que as razões sustentam a tese por mostrarem benefícios concretos da proposta, como apoio ao estudo e maior acesso."},

  {subject:"portuguese",itemId:"PT639-FND-315",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"«Esta iniciativa» retoma a horta e contribui para a coesão. Já «por isso» introduz uma oposição, não uma consequência."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"related-nonanswer",maxScore:.55,response:"A horta escolar é uma iniciativa que envolve turmas e pode ser usada em atividades de várias disciplinas."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"hedged-correct",minScore:.18,response:"«Esta iniciativa» deverá retomar a horta; «por isso» estabelece consequência, ligando as ideias e reforçando a coesão."},

  {subject:"portuguese",itemId:"PT639-FND-317",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"O pronome evita repetição e mantém a continuidade referencial, mas o antecedente é Leonor e não «relatório»."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"related-nonanswer",maxScore:.55,response:"Marta reviu o relatório antes de o entregar a Leonor, mostrando cuidado com o documento."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"hedged-correct",minScore:.18,response:"Neste contexto, «o» retoma «relatório», evitando a repetição do nome e mantendo o mesmo referente."},

  {subject:"portuguese",itemId:"PT639-FND-319",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"A expressão atribui uma propriedade a «a proposta». Apesar disso, classifico-a como complemento oblíquo."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"related-nonanswer",maxScore:.55,response:"A proposta foi considerada útil pela comunidade e recebeu uma avaliação positiva dos participantes."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"hedged-correct",minScore:.18,response:"A expressão deverá ser predicativo do complemento direto, porque atribui à proposta a propriedade de ser útil."},

  {subject:"portuguese",itemId:"PT639-FND-322",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"«Quando a chuva terminou» é uma oração temporal. A oração «que tinha sido interrompida», porém, é completiva."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"related-nonanswer",maxScore:.55,response:"A frase apresenta uma sequência em que a chuva termina antes de a atividade ser retomada."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"hedged-correct",minScore:.18,response:"A primeira oração é temporal; a segunda parece ser relativa restritiva, pois delimita a atividade a que se refere."},

  // FQ A — mesma lógica, com foco em verdade científica relevante mas insuficiente
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"As riscas resultam de transições entre níveis eletrónicos com emissão de fotões. No entanto, todos os elementos têm essencialmente o mesmo conjunto de energias emitidas."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"related-nonanswer",maxScore:.55,response:"Os eletrões ocupam níveis de energia quantizados nos átomos."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"hedged-correct",minScore:.25,response:"O padrão deverá ser característico porque as transições entre níveis emitem fotões com energias específicas de cada elemento."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"A alíquota mede-se com pipeta e transfere-se para um balão volumétrico. Depois pode ultrapassar-se ligeiramente o traço sem afetar a concentração final."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"related-nonanswer",maxScore:.55,response:"Uma diluição reduz a concentração da solução pela adição de solvente."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"hedged-correct",minScore:.25,response:"Usaria pipeta para medir a alíquota, balão volumétrico, ajuste do menisco ao traço e homogeneização final."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"Devem medir-se massa, altura e velocidade em dois pontos e calcular as energias. Se os valores diferirem, mesmo dentro da incerteza, a conservação fica necessariamente refutada."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"related-nonanswer",maxScore:.55,response:"A energia cinética depende da massa e do quadrado da velocidade, enquanto a potencial gravítica depende da altura."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"hedged-correct",minScore:.25,response:"Compararia a energia mecânica em dois pontos usando massa, altura e velocidade, aceitando conservação se os valores forem compatíveis dentro da incerteza."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"partial-then-false",maxScore:.62,requiresReview:true,response:"Num gráfico v(t), o declive representa a aceleração. A área algébrica, porém, representa a distância total percorrida mesmo quando a velocidade muda de sinal."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"related-nonanswer",maxScore:.55,response:"A velocidade pode ser positiva, negativa ou nula e varia ao longo do tempo."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"hedged-correct",minScore:.25,response:"O declive permite obter a aceleração e a área algébrica o deslocamento; para distância somam-se módulos quando há mudança de sinal."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"Repetir medições e controlar a temperatura melhora a experiência. Ainda assim, uma distância menor reduz a incerteza relativa associada ao tempo."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"related-nonanswer",maxScore:.55,response:"A velocidade do som depende das propriedades do meio e da temperatura."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"hedged-correct",minScore:.25,response:"Preferiria uma distância maior para reduzir o peso relativo da resolução temporal e repetiria medições para usar média e dispersão."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"partial-then-false",maxScore:.58,requiresReview:true,response:"Aquecer um equilíbrio exotérmico favorece o sentido endotérmico. Um catalisador acelera os dois sentidos, mas aumenta o valor de Kc."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"related-nonanswer",maxScore:.55,response:"Num equilíbrio químico, as reações direta e inversa continuam a ocorrer microscopicamente."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"hedged-correct",minScore:.25,response:"O aquecimento deverá favorecer o sentido endotérmico; o catalisador acelera a chegada ao equilíbrio sem alterar Kc nem a composição de equilíbrio."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"partial-then-false",maxScore:.68,requiresReview:true,response:"Na equivalência, os reagentes estão na proporção estequiométrica. Por isso, numa titulação ácido-base, o pH de equivalência é sempre 7."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"related-nonanswer",maxScore:.55,response:"Numa titulação, o titulante é adicionado gradualmente a partir de uma bureta."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"hedged-correct",minScore:.25,response:"A equivalência corresponde à proporção estequiométrica; pode ser localizada com uma curva de pH ou um indicador adequado, sem assumir pH 7 em todos os casos."}
];

export const OPEN_RESPONSE_WAVE4_PROFILES=["partial-then-false","related-nonanswer","hedged-correct"];
