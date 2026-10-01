export const OPEN_RESPONSE_WAVE3_CASES=[
  // PORTUGUÊS — respostas plausíveis, negações e formulações muito compactas
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"polished-wrong",maxScore:.58,response:"O texto é muito claro porque utiliza frases relativamente curtas e vocabulário acessível. A sequência das ideias é secundária e poderia ser alterada sem afetar a compreensão global."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"negation-trap",maxScore:.6,response:"Não é a passagem do problema para as alternativas e depois para as condições que cria clareza; o leitor compreenderia da mesma forma mesmo que essas partes surgissem sem ordem."},
  {subject:"portuguese",itemId:"PT639-FND-311",profile:"terse-correct",minScore:.18,maxScore:.72,response:"A ordem problema → alternativas → condições cria progressão lógica e facilita a compreensão."},

  {subject:"portuguese",itemId:"PT639-FND-313",profile:"polished-wrong",maxScore:.58,response:"A tese é convincente sobretudo porque o autor escreve de forma segura e assertiva. As razões apresentadas são acessórios retóricos e não são necessárias para fundamentar a posição."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"negation-trap",maxScore:.6,response:"O apoio ao estudo e o maior acesso não justificam a proposta; são apenas exemplos e não constituem razões que sustentem a tese."},
  {subject:"portuguese",itemId:"PT639-FND-313",profile:"terse-correct",minScore:.18,maxScore:.72,response:"As razões mostram benefícios concretos e, por isso, fundamentam a posição do autor."},

  {subject:"portuguese",itemId:"PT639-FND-315",profile:"polished-wrong",maxScore:.58,response:"«Esta iniciativa» introduz uma informação nova e «por isso» estabelece contraste com a frase anterior. Estes mecanismos quebram a continuidade para destacar a segunda ideia."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"negation-trap",maxScore:.6,response:"«Esta iniciativa» não retoma a horta e «por isso» não exprime consequência; ambas as expressões servem apenas para iniciar novas ideias."},
  {subject:"portuguese",itemId:"PT639-FND-315",profile:"terse-correct",minScore:.18,maxScore:.72,response:"«Esta iniciativa» retoma a horta; «por isso» introduz uma consequência e assegura coesão."},

  {subject:"portuguese",itemId:"PT639-FND-317",profile:"polished-wrong",maxScore:.58,response:"O pronome «o» refere-se a Leonor e evita repetir o nome da pessoa que recebe o documento, garantindo assim continuidade referencial."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"negation-trap",maxScore:.6,response:"«O» não retoma «relatório»; o antecedente é Leonor, que surge como destinatária da ação."},
  {subject:"portuguese",itemId:"PT639-FND-317",profile:"terse-correct",minScore:.18,maxScore:.72,response:"«O» retoma «relatório», evita repetição e mantém o mesmo referente."},

  {subject:"portuguese",itemId:"PT639-FND-319",profile:"polished-wrong",maxScore:.58,response:"«Útil para a comunidade» é complemento oblíquo, pois completa o verbo «consideraram» e acrescenta informação necessária ao sentido da frase."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"negation-trap",maxScore:.6,response:"A expressão não é predicativo do complemento direto; funciona como complemento oblíquo e não atribui uma propriedade a «a proposta»."},
  {subject:"portuguese",itemId:"PT639-FND-319",profile:"terse-correct",minScore:.18,maxScore:.72,response:"É predicativo do complemento direto porque atribui a «a proposta» a propriedade de ser útil."},

  {subject:"portuguese",itemId:"PT639-FND-322",profile:"polished-wrong",maxScore:.58,response:"«Quando a chuva terminou» é causal, porque explica o motivo da retoma da atividade. «Que tinha sido interrompida» é completiva, pois completa o significado do verbo principal."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"negation-trap",maxScore:.6,response:"A primeira oração não é temporal e a segunda não é relativa restritiva; tratam-se, respetivamente, de uma causal e de uma completiva."},
  {subject:"portuguese",itemId:"PT639-FND-322",profile:"terse-correct",minScore:.18,maxScore:.72,response:"A primeira é subordinada temporal; a segunda é relativa restritiva e delimita «atividade»."},

  // FQ A — respostas cientificamente plausíveis mas erradas, negações e respostas curtas corretas
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"polished-wrong",maxScore:.58,response:"As riscas resultam sobretudo das diferenças de massa dos átomos. Como elementos diferentes têm massas diferentes, cada um produz automaticamente um padrão espectral distinto."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"negation-trap",maxScore:.6,response:"As riscas não resultam de transições entre níveis eletrónicos e os fotões emitidos não possuem energias específicas de cada elemento."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ELEM-01",profile:"terse-correct",minScore:.25,response:"Transições entre níveis eletrónicos emitem fotões de energias específicas; por isso, cada elemento tem um padrão de riscas próprio."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"polished-wrong",maxScore:.58,response:"Para diluir, mede-se a solução-mãe numa proveta, transfere-se para um copo e adiciona-se aproximadamente 100 mL de água. O volume final não precisa de coincidir rigorosamente com um traço de aferição."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"negation-trap",maxScore:.6,response:"Não é necessário usar pipeta nem ajustar o menisco ao traço; basta estimar os volumes e agitar no final."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MAT-01",profile:"terse-correct",minScore:.25,response:"Mede-se a alíquota com pipeta, transfere-se para balão volumétrico, completa-se até ao traço e homogeneíza-se."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"polished-wrong",maxScore:.58,response:"Para comprovar a conservação basta verificar que o tempo de descida é reprodutível. Se o tempo for igual em várias tentativas, a energia mecânica é necessariamente constante."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"negation-trap",maxScore:.6,response:"Não é preciso medir velocidade nem altura; a comparação das energias inicial e final não é necessária para testar a conservação."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-ENE-01",profile:"terse-correct",minScore:.25,response:"Mede-se massa, altura e velocidade em dois pontos e compara-se a energia mecânica considerando a incerteza."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"polished-wrong",maxScore:.55,response:"Num gráfico v(t), a área fornece a aceleração média e o declive corresponde ao deslocamento. Esta leitura permite obter diretamente as duas grandezas."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"negation-trap",maxScore:.55,response:"O declive não representa a aceleração e a área algébrica não representa o deslocamento."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",profile:"terse-correct",minScore:.25,response:"O declive dá a aceleração e a área algébrica dá o deslocamento; a distância soma módulos das áreas."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"polished-wrong",maxScore:.58,response:"A melhor estratégia é encurtar muito a distância, porque assim o som chega mais depressa e a incerteza absoluta do tempo deixa de ter efeito relevante."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"negation-trap",maxScore:.6,response:"Aumentar a distância não reduz o peso relativo da incerteza temporal e repetir medições não melhora a qualidade da estimativa."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-WAV-01",profile:"terse-correct",minScore:.25,response:"Maior distância reduz o peso relativo da incerteza temporal; várias medições permitem usar média e dispersão."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"polished-wrong",maxScore:.5,response:"Num equilíbrio exotérmico, aumentar a temperatura favorece os produtos e um catalisador aumenta Kc porque acelera preferencialmente a reação direta."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"negation-trap",maxScore:.5,response:"O catalisador não acelera ambos os sentidos e não mantém Kc; pelo contrário, altera a constante de equilíbrio."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",profile:"terse-correct",minScore:.25,response:"Aquecer favorece o sentido endotérmico; o catalisador só acelera a chegada ao equilíbrio e não altera Kc."},

  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"polished-wrong",maxScore:.58,response:"O ponto de equivalência de uma titulação ácido-base ocorre sempre quando o pH é 7, independentemente dos reagentes usados. A cor do indicador apenas confirma esse valor universal."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"negation-trap",maxScore:.6,response:"A equivalência não corresponde à proporção estequiométrica e não pode ser determinada por indicador nem por uma curva de pH."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-AQ-01",profile:"terse-correct",minScore:.25,response:"Na equivalência os reagentes estão na proporção estequiométrica; indicador ou curva de pH ajudam a localizá-la."}
];

export const OPEN_RESPONSE_WAVE3_PROFILES=["polished-wrong","negation-trap","terse-correct"];
