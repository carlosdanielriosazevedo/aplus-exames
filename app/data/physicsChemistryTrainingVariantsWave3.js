function mc({id,year,domain,subtopicId,competencyId="fqa-concepts",prompt,options,answerIndex=0,explanation,difficultyTarget=2}){
  return {id,year,domain,subtopicId,competencyId,prompt,options,answerIndex,explanation,responseType:"multiple-choice",gradingMode:"deterministic",sourceOrigin:"original",reviewStatus:"prototype",difficultyTarget,maxPoints:10,generated:true,practiceVariant:true,templateId:id.split("-V")[0]};
}
const rows=[];
function addSet(prefix,year,domain,subtopicId,items,competencyId="fqa-concepts"){
  items.forEach((row,index)=>rows.push(mc({id:`FQA-V3-${prefix}-V${index+1}`,year,domain,subtopicId,competencyId,...row})));
}

addSet("EXPMOT","11.º","f11-mechanics","f11-experimental-motion",[
  {prompt:"Num estudo experimental do movimento, aumentar o número de medições ao longo do percurso permite sobretudo:",options:["descrever melhor a evolução temporal","eliminar qualquer incerteza","tornar a massa constante","dispensar unidades"],explanation:"Mais pontos experimentais permitem caracterizar melhor a evolução das grandezas no tempo."},
  {prompt:"Ao construir um gráfico posição-tempo a partir de dados experimentais, o declive local está associado à:",options:["velocidade","massa","força normal","energia interna"],explanation:"O declive de x(t) representa a taxa de variação da posição, isto é, a velocidade."},
  {prompt:"Num gráfico velocidade-tempo obtido experimentalmente, a área algébrica sob a curva representa:",options:["deslocamento","aceleração instantânea","força resultante","potência"],explanation:"A integral da velocidade no tempo corresponde ao deslocamento."},
  {prompt:"Repetir uma medição de tempo várias vezes é útil principalmente para:",options:["avaliar dispersão e reduzir o efeito de flutuações aleatórias","mudar a lei física","eliminar erros sistemáticos automaticamente","aumentar a gravidade"],explanation:"Repetições permitem avaliar a dispersão e obter estimativas mais robustas."},
  {prompt:"Se um sensor de posição tiver resolução limitada, essa limitação contribui para:",options:["a incerteza experimental","a massa do móvel","a aceleração gravítica real","a força aplicada"],explanation:"A resolução do instrumento limita a precisão com que a grandeza pode ser registada."},
  {prompt:"Ao comparar modelo e dados de movimento, uma conclusão cientificamente adequada deve:",options:["referir a tendência dos dados e as incertezas","ignorar pontos discrepantes sem justificação","usar apenas o valor mais conveniente","dispensar a representação gráfica"],explanation:"A conclusão deve apoiar-se nos dados observados e considerar a incerteza experimental."}
],"fqa-experimental");

addSet("FIELDS","11.º","f11-em","f11-fields",[
  {prompt:"No contexto de campos, uma carga elétrica positiva colocada num campo elétrico uniforme tende a sofrer força:",options:["no sentido do campo","sempre perpendicular ao campo","oposta ao campo em qualquer caso","nula por definição"],explanation:"Para q>0, F=qE tem o mesmo sentido do campo elétrico."},
  {prompt:"A intensidade do campo gravítico num ponto representa:",options:["força gravítica por unidade de massa","energia por unidade de tempo","massa por unidade de volume","velocidade por unidade de carga"],explanation:"Por definição, g=F_g/m."},
  {prompt:"As linhas de campo elétrico nunca se cruzam porque:",options:["o campo num ponto tem uma única direção","as cargas deixam de interagir","o campo é sempre nulo","as linhas são trajetórias materiais"],explanation:"Num ponto, o vetor campo tem uma direção única; linhas cruzadas implicariam duas direções."},
  {prompt:"Num campo elétrico criado por uma carga pontual positiva, as linhas de campo:",options:["saem radialmente da carga","entram radialmente na carga","formam círculos fechados","são sempre paralelas"],explanation:"As linhas de campo elétrico emergem de cargas positivas."},
  {prompt:"Se a distância a uma carga pontual duplicar, a intensidade do campo elétrico por ela criado fica:",options:["quatro vezes menor","duas vezes maior","igual","oito vezes maior"],explanation:"Para uma carga pontual, E é inversamente proporcional a r²."},
  {prompt:"Uma superfície equipotencial é caracterizada por:",options:["mesmo potencial elétrico em todos os seus pontos","campo elétrico necessariamente nulo","mesma carga em todos os pontos","força sempre paralela à superfície"],explanation:"Por definição, todos os pontos de uma equipotencial têm o mesmo potencial."}
]);

addSet("INDUCT","11.º","f11-em","f11-induction",[
  {prompt:"Na indução eletromagnética, surge força eletromotriz quando ocorre:",options:["variação do fluxo magnético","campo magnético constante sem qualquer mudança geométrica","temperatura constante","massa variável do circuito"],explanation:"A lei de Faraday relaciona a fem induzida com a variação temporal do fluxo magnético."},
  {prompt:"Segundo a lei de Lenz, a corrente induzida cria um efeito que:",options:["se opõe à variação que lhe deu origem","reforça sempre a variação inicial","anula a resistência elétrica","elimina o campo magnético externo"],explanation:"O sentido da corrente induzida opõe-se à mudança de fluxo que a produz."},
  {prompt:"Mover um íman mais rapidamente em direção a uma bobina tende a produzir uma fem induzida:",options:["de maior módulo","sempre nula","de menor módulo obrigatoriamente","independente da rapidez"],explanation:"Uma variação de fluxo mais rápida aumenta o módulo da fem induzida."},
  {prompt:"Se o fluxo magnético através de uma espira permanecer constante, a fem induzida ideal é:",options:["zero","máxima","igual à resistência","proporcional à massa da espira"],explanation:"Sem variação de fluxo, a lei de Faraday dá fem nula."},
  {prompt:"Num gerador elétrico simples, a conversão principal é de energia:",options:["mecânica em elétrica","elétrica em massa","térmica em gravítica","química em nuclear"],explanation:"A rotação mecânica provoca variação de fluxo e gera energia elétrica."},
  {prompt:"Aumentar o número de espiras de uma bobina, mantendo a mesma variação de fluxo por espira, tende a:",options:["aumentar a fem induzida","eliminar a indução","diminuir sempre a fem para zero","não ter qualquer efeito"],explanation:"A fem total é proporcional ao número de espiras."}
],"fqa-problems");

addSet("EMWAVES","11.º","f11-em","f11-em-waves",[
  {prompt:"Uma onda eletromagnética no vazio propaga-se com velocidade:",options:["c","dependente da amplitude","igual à velocidade do som","nula sem matéria"],explanation:"Todas as ondas eletromagnéticas propagam-se no vazio à velocidade da luz c."},
  {prompt:"Numa onda eletromagnética, os campos elétrico e magnético são:",options:["perpendiculares entre si e à direção de propagação","paralelos entre si","sempre nulos","longitudinais à propagação"],explanation:"Ondas eletromagnéticas são transversais, com E e B perpendiculares."},
  {prompt:"No vazio, se a frequência de uma onda eletromagnética aumenta, o comprimento de onda:",options:["diminui","aumenta","fica constante","torna-se nulo em qualquer caso"],explanation:"Como c=λf, frequência e comprimento de onda são inversamente proporcionais."},
  {prompt:"Entre ondas de rádio e raios X, os raios X apresentam em geral:",options:["maior frequência e maior energia por fotão","menor frequência","igual energia por fotão","maior comprimento de onda"],explanation:"Raios X têm frequência maior e, por E=hf, fotões mais energéticos."},
  {prompt:"A polarização é uma propriedade que evidencia o caráter:",options:["transversal das ondas eletromagnéticas","longitudinal obrigatório","corpuscular exclusivo","estacionário de toda a radiação"],explanation:"A polarização é característica de ondas transversais."},
  {prompt:"Ao passar do vazio para um meio transparente onde a velocidade diminui, a frequência da luz:",options:["mantém-se","diminui sempre para metade","aumenta obrigatoriamente","torna-se zero"],explanation:"Na passagem de meio, a frequência é determinada pela fonte e mantém-se; muda o comprimento de onda."}
]);

addSet("OPTICS","11.º","f11-em","f11-optics",[
  {prompt:"Na reflexão especular, o ângulo de reflexão é:",options:["igual ao ângulo de incidência","sempre 90°","metade do ângulo de incidência","independente da normal"],explanation:"A lei da reflexão estabelece igualdade entre os ângulos medidos relativamente à normal."},
  {prompt:"Na refração, a mudança de direção da luz resulta da alteração da sua:",options:["velocidade de propagação","frequência da fonte","carga elétrica","massa"],explanation:"A velocidade muda entre meios, provocando refração; a frequência mantém-se."},
  {prompt:"Ao passar para um meio com maior índice de refração, um raio oblíquo aproxima-se em geral:",options:["da normal","da superfície","do eixo horizontal independentemente da interface","de um ângulo de 90° sempre"],explanation:"Para n maior, a velocidade diminui e o raio refratado aproxima-se da normal."},
  {prompt:"A reflexão total interna só pode ocorrer quando a luz passa:",options:["de um meio de maior índice para outro de menor índice","do ar para vidro em qualquer ângulo","entre meios de igual índice","apenas no vazio"],explanation:"É necessária passagem do meio opticamente mais denso para o menos denso e incidência acima do ângulo crítico."},
  {prompt:"Uma lente convergente pode formar imagem real quando o objeto está:",options:["além do foco","sempre entre a lente e o foco","exatamente no centro ótico apenas","em qualquer posição sem exceção"],explanation:"Com objeto além do foco, raios convergem do outro lado da lente e podem formar imagem real."},
  {prompt:"O índice de refração absoluto de um meio pode ser expresso por:",options:["n=c/v","n=v/c","n=cv","n=c+v"],explanation:"Define-se n=c/v, com c a velocidade no vazio e v no meio."}
]);

addSet("EQSTATE","11.º","q11-equilibrium","q11-equilibrium-state",[
  {prompt:"Num equilíbrio químico dinâmico, as velocidades das reações direta e inversa são:",options:["iguais","nulas","sempre crescentes","independentes das concentrações"],explanation:"No equilíbrio dinâmico as duas reações continuam, mas com velocidades iguais."},
  {prompt:"Quando um sistema atinge equilíbrio químico, as concentrações macroscópicas:",options:["mantêm-se constantes no tempo","tornam-se necessariamente iguais","ficam todas nulas","deixam de depender da temperatura"],explanation:"No equilíbrio, as concentrações permanecem constantes, mas não têm de ser iguais entre si."},
  {prompt:"A constante de equilíbrio K depende, para uma reação definida, principalmente da:",options:["temperatura","massa inicial total","presença de catalisador","forma do recipiente apenas"],explanation:"Para uma reação dada, K varia com a temperatura."},
  {prompt:"Um valor de K muito superior a 1 indica que, no equilíbrio, são favorecidos:",options:["produtos","reagentes exclusivamente","sólidos em qualquer reação","catalisadores"],explanation:"K grande corresponde a uma composição de equilíbrio relativamente rica em produtos."},
  {prompt:"Um catalisador introduzido num sistema em equilíbrio:",options:["não altera K nem a composição de equilíbrio","aumenta sempre K","desloca sempre o equilíbrio para produtos","elimina a reação inversa"],explanation:"O catalisador acelera igualmente os sentidos direto e inverso, não alterando a posição de equilíbrio."},
  {prompt:"O quociente da reação Q permite prever a evolução até ao equilíbrio comparando-o com:",options:["K","a massa molar","a pressão atmosférica padrão","o número atómico"],explanation:"A comparação entre Q e K indica o sentido espontâneo de evolução até ao equilíbrio."}
]);

addSet("LECHAT","11.º","q11-equilibrium","q11-lechatelier",[
  {prompt:"Ao aumentar a concentração de um reagente num equilíbrio, o sistema tende a evoluir no sentido que:",options:["consome parte do reagente adicionado","produz ainda mais desse reagente obrigatoriamente","elimina o catalisador","mantém todas as quantidades instantaneamente iguais"],explanation:"Pelo princípio de Le Châtelier, o sistema contraria parcialmente a perturbação."},
  {prompt:"Num equilíbrio gasoso, aumentar a pressão por diminuição de volume favorece, em geral, o lado com:",options:["menor número de mol de gás","maior número de mol de gás","mais sólidos","maior massa molar"],explanation:"A redução de volume favorece o lado com menos partículas gasosas."},
  {prompt:"Para uma reação exotérmica, aumentar a temperatura tende a deslocar o equilíbrio para:",options:["os reagentes","os produtos sempre","o catalisador","nenhum lado em qualquer caso"],explanation:"O calor pode ser tratado como produto; aumentar T favorece o sentido endotérmico."},
  {prompt:"Adicionar um catalisador a um equilíbrio químico faz com que o sistema:",options:["atinja o equilíbrio mais rapidamente sem alterar a composição final","passe a ter K maior","produza apenas produtos","pare a reação inversa"],explanation:"O catalisador altera a cinética, não a posição de equilíbrio."},
  {prompt:"Retirar continuamente um produto de um sistema em equilíbrio tende a:",options:["favorecer a formação de mais produto","favorecer apenas reagentes","não produzir qualquer efeito","tornar K igual a zero"],explanation:"A remoção de produto leva o sistema a compensar produzindo mais desse produto."},
  {prompt:"O princípio de Le Châtelier descreve:",options:["a resposta de um equilíbrio a uma perturbação","a velocidade absoluta de qualquer reação","a estrutura eletrónica dos átomos","a conservação do momento linear"],explanation:"O princípio prevê qualitativamente como um sistema em equilíbrio responde a mudanças externas."}
]);

addSet("GREEN","11.º","q11-equilibrium","q11-green-industry",[
  {prompt:"Num processo industrial, aumentar rendimento e reduzir consumo energético são objetivos associados a:",options:["eficiência e sustentabilidade","eliminação da conservação de energia","aumento obrigatório de resíduos","uso máximo de reagentes perigosos"],explanation:"Processos mais eficientes procuram melhor aproveitamento de recursos e menor impacte."},
  {prompt:"A química verde procura, entre outros objetivos:",options:["reduzir substâncias perigosas e resíduos","maximizar etapas de síntese","usar sempre solventes tóxicos","ignorar eficiência atómica"],explanation:"A prevenção de resíduos e a redução de perigos são princípios centrais da química verde."},
  {prompt:"Num processo reversível industrial, a escolha de temperatura pode exigir compromisso entre:",options:["velocidade de reação e rendimento de equilíbrio","massa e número atómico","pressão e cor","volume e carga nuclear"],explanation:"Condições favoráveis ao equilíbrio podem não ser as melhores para a velocidade, exigindo compromisso."},
  {prompt:"Reciclar um reagente não convertido num processo industrial pode:",options:["aumentar o aproveitamento global de matéria","diminuir sempre o rendimento global","impedir qualquer equilíbrio","eliminar a necessidade de controlo"],explanation:"A recirculação reduz desperdício e melhora a utilização de reagentes."},
  {prompt:"A economia atómica de uma síntese é maior quando:",options:["maior fração dos átomos dos reagentes integra o produto desejado","há mais produtos secundários","se usa maior excesso de solvente","a reação demora mais"],explanation:"Economia atómica mede o aproveitamento dos átomos dos reagentes no produto pretendido."},
  {prompt:"Na avaliação ambiental de um processo químico, é relevante considerar:",options:["energia, matérias-primas, resíduos e perigosidade","apenas a cor do produto","só o preço do recipiente","apenas a massa do catalisador"],explanation:"A sustentabilidade exige análise integrada de recursos, energia, emissões, resíduos e risco."}
],"fqa-experimental");

addSet("ACIDBASE","11.º","q11-aqueous","q11-acid-base",[
  {prompt:"Segundo Brønsted-Lowry, um ácido é uma espécie capaz de:",options:["ceder protões","ceder eletrões obrigatoriamente","receber neutrões","aumentar sempre o pH"],explanation:"Um ácido de Brønsted-Lowry doa H+."},
  {prompt:"A base conjugada de um ácido forma-se quando esse ácido:",options:["cede um protão","ganha dois eletrões","recebe um protão","perde um neutrão"],explanation:"Ao doar H+, o ácido origina a sua base conjugada."},
  {prompt:"Uma solução aquosa com pH inferior a 7, a 25 °C, é:",options:["ácida","básica","sempre neutra","necessariamente concentrada"],explanation:"A 25 °C, pH<7 caracteriza uma solução ácida."},
  {prompt:"Se [H3O+] aumentar dez vezes, o pH:",options:["diminui aproximadamente uma unidade","aumenta dez unidades","não se altera","duplica"],explanation:"pH=-log[H3O+], logo um fator 10 corresponde a uma unidade de pH."},
  {prompt:"Um ácido forte em água caracteriza-se por:",options:["ionização praticamente completa","pH obrigatoriamente zero","ausência de base conjugada","concentração sempre elevada"],explanation:"A força ácida refere-se à extensão da ionização, não à concentração inicial."},
  {prompt:"Uma solução tampão resiste a variações de pH porque contém tipicamente:",options:["um par ácido-base conjugado em quantidades apreciáveis","apenas água pura","só um sal insolúvel","um metal sem reação"],explanation:"O par conjugado consome pequenas quantidades de ácido ou base adicionadas."}
]);

addSet("TITR","11.º","q11-aqueous","q11-titration",[
  {prompt:"Numa titulação ácido-base, o ponto de equivalência corresponde à situação em que:",options:["as quantidades reagiram na proporção estequiométrica","o indicador muda sempre exatamente a pH 7","os volumes são necessariamente iguais","a concentração do titulante é zero"],explanation:"No ponto de equivalência, reagente e titulante estão nas proporções estequiométricas da reação."},
  {prompt:"A solução de concentração conhecida adicionada pela bureta chama-se:",options:["titulante","analito sólido","solvente indicador","precipitado"],explanation:"O titulante é a solução padrão adicionada progressivamente."},
  {prompt:"A escolha de um indicador numa titulação deve considerar:",options:["a zona de viragem relativamente ao salto de pH","apenas a cor inicial","a massa da bureta","a pressão atmosférica apenas"],explanation:"O intervalo de viragem deve coincidir adequadamente com a região próxima da equivalência."},
  {prompt:"Ler a bureta ao nível dos olhos ajuda a reduzir erro de:",options:["paralaxe","estequiometria","massa molar","equilíbrio químico"],explanation:"A leitura ao nível do menisco reduz erro de paralaxe."},
  {prompt:"Se o titulante for acidentalmente diluído antes da titulação e se usar a concentração antiga nos cálculos, o resultado ficará:",options:["sistematicamente afetado","automaticamente correto","independente do volume","sem qualquer incerteza"],explanation:"A concentração real deixa de coincidir com a usada no cálculo, introduzindo erro sistemático."},
  {prompt:"Realizar titulações concordantes significa obter:",options:["volumes finais próximos entre repetições","qualquer conjunto de volumes","sempre exatamente o mesmo pH inicial","uma única medição sem repetição"],explanation:"Resultados concordantes mostram boa repetibilidade do volume de equivalência estimado."}
],"fqa-experimental");

addSet("REDOX","11.º","q11-aqueous","q11-redox",[
  {prompt:"Numa reação redox, oxidação corresponde a:",options:["perda de eletrões","ganho de eletrões","ganho de protões obrigatoriamente","diminuição inevitável do número de oxidação"],explanation:"Oxidação é perda de eletrões e aumento do número de oxidação."},
  {prompt:"A espécie que provoca a oxidação de outra e se reduz é o agente:",options:["oxidante","redutor","catalisador neutro","solvente"],explanation:"O agente oxidante aceita eletrões e sofre redução."},
  {prompt:"Redução corresponde a uma variação do número de oxidação no sentido de:",options:["diminuir","aumentar sempre","ficar necessariamente zero","duplicar"],explanation:"Na redução há ganho de eletrões e diminuição do número de oxidação."},
  {prompt:"Numa equação redox corretamente acertada devem conservar-se:",options:["átomos e carga elétrica","apenas os átomos de oxigénio","apenas os eletrões livres","somente o número de moléculas"],explanation:"O acerto redox respeita conservação da matéria e da carga."},
  {prompt:"Se Zn(s) se transforma em Zn2+(aq), o zinco:",options:["é oxidado","é reduzido","não transfere eletrões","ganha dois eletrões"],explanation:"Zn perde dois eletrões para formar Zn2+, sofrendo oxidação."},
  {prompt:"Os eletrões numa reação redox são:",options:["transferidos entre espécies","criados do nada","destruídos no produto","sempre ligados a protões"],explanation:"A oxidação e a redução estão acopladas por transferência eletrónica."}
]);

addSet("ELECTRO","11.º","q11-aqueous","q11-electrochem",[
  {prompt:"Numa pilha galvânica em funcionamento espontâneo, os eletrões circulam externamente do:",options:["ânodo para o cátodo","cátodo para o ânodo","sal para a ponte salina","eletrólito para o vazio"],explanation:"No ânodo ocorre oxidação, libertando eletrões que seguem para o cátodo."},
  {prompt:"Numa célula galvânica, a redução ocorre no:",options:["cátodo","ânodo","fio externo","reservatório de sal"],explanation:"Por definição, redução ocorre no cátodo."},
  {prompt:"A ponte salina numa pilha tem como função principal:",options:["manter a neutralidade elétrica permitindo migração iónica","transportar eletrões entre elétrodos","aumentar a massa dos metais","impedir qualquer movimento de iões"],explanation:"A ponte salina fecha o circuito internamente por transporte iónico e evita acumulação excessiva de carga."},
  {prompt:"Uma diferença de potencial positiva para a reação global de uma pilha indica, em condições definidas:",options:["tendência espontânea para a reação escrita","impossibilidade de transferência eletrónica","corrente sempre nula","ausência de oxidação"],explanation:"E_célula positivo corresponde a reação global termodinamicamente favorável nas condições consideradas."},
  {prompt:"Na eletrólise, a reação global não espontânea é impulsionada por:",options:["uma fonte externa de energia elétrica","gravidade apenas","uma ponte salina sem fonte","radiação sonora"],explanation:"A eletrólise requer fornecimento de energia elétrica para promover a reação."},
  {prompt:"Em qualquer célula eletroquímica, o ânodo é o elétrodo onde ocorre:",options:["oxidação","redução","neutralização obrigatória","precipitação sempre"],explanation:"A definição de ânodo é o local de oxidação, tanto em pilhas como em eletrólise."}
],"fqa-problems");

addSet("SOLUB","11.º","q11-aqueous","q11-solubility",[
  {prompt:"A solubilidade de uma substância corresponde, em condições definidas, à:",options:["quantidade máxima que se dissolve até formar solução saturada","quantidade mínima de solvente","massa molar do soluto","velocidade instantânea de dissolução"],explanation:"Solubilidade é uma propriedade de equilíbrio que quantifica quanto soluto pode dissolver-se."},
  {prompt:"Uma solução saturada está em equilíbrio com:",options:["soluto não dissolvido quando este está presente","apenas vapor de água","qualquer gás externo","um catalisador"],explanation:"Numa solução saturada pode existir equilíbrio dinâmico entre dissolução e cristalização."},
  {prompt:"Para muitos sólidos em água, a solubilidade tende a:",options:["variar com a temperatura","ser sempre independente da temperatura","ser igual à massa molar","ser sempre 1 mol/L"],explanation:"A temperatura influencia o equilíbrio de dissolução e, por isso, a solubilidade."},
  {prompt:"Adicionar um solvente a uma solução insaturada, mantendo o soluto, provoca inicialmente:",options:["diluição","precipitação obrigatória","aumento instantâneo de Kps","eliminação do soluto"],explanation:"A quantidade de soluto mantém-se, mas o volume aumenta e a concentração diminui."},
  {prompt:"Quando se diz que duas soluções têm a mesma concentração molar, significa que têm:",options:["igual quantidade de soluto por unidade de volume de solução","igual massa total","igual número de moléculas de solvente","o mesmo volume necessariamente"],explanation:"Concentração molar é n/V e não exige massas ou volumes totais iguais."},
  {prompt:"A presença de um ião comum num equilíbrio de dissolução pode:",options:["diminuir a solubilidade do sal","aumentar sempre a solubilidade","eliminar o equilíbrio","tornar Kps dependente da quantidade adicionada"],explanation:"O ião comum desloca o equilíbrio no sentido do sólido, reduzindo a solubilidade em muitos casos."}
]);

addSet("KSP","11.º","q11-aqueous","q11-ksp",[
  {prompt:"O produto de solubilidade Kps descreve o equilíbrio de:",options:["dissolução de um sólido pouco solúvel","combustão completa","neutralização forte obrigatória","fusão de um metal"],explanation:"Kps é a constante associada ao equilíbrio entre um sólido pouco solúvel e os seus iões em solução."},
  {prompt:"Para um sal AB(s) ⇌ A+(aq)+B−(aq), a expressão de Kps é:",options:["[A+][B−]","[AB]","[A+]+[B−]","[A+]/[B−]"],explanation:"A atividade do sólido puro não entra na expressão e os iões aparecem multiplicados."},
  {prompt:"Se o produto iónico Qps for inferior a Kps, a solução está:",options:["insaturada relativamente ao sólido","necessariamente com precipitado","em equilíbrio exato","sem solvente"],explanation:"Qps<Kps indica possibilidade de dissolver mais soluto antes da saturação."},
  {prompt:"Se Qps for superior a Kps, prevê-se:",options:["precipitação até se restabelecer o equilíbrio","dissolução adicional ilimitada","ausência total de iões","Kps igual a zero"],explanation:"Qps>Kps corresponde a supersaturação e favorece formação de precipitado."},
  {prompt:"O valor de Kps de um sal, a temperatura constante, não depende diretamente da:",options:["quantidade inicial de sólido presente, desde que exista fase sólida","temperatura","natureza do sal","estequiometria de dissolução"],explanation:"A constante de equilíbrio depende da temperatura, não da massa de sólido puro presente."},
  {prompt:"Comparar diretamente valores de Kps de sais com estequiometrias diferentes para ordenar solubilidades pode ser:",options:["enganador","sempre exato","equivalente a comparar massas molares","independente da expressão de equilíbrio"],explanation:"A relação entre Kps e solubilidade molar depende da estequiometria de dissolução."}
],"fqa-problems");

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE3=rows;
