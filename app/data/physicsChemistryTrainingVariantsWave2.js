function mc({id,year,domain,subtopicId,competencyId="fqa-concepts",prompt,options,answerIndex=0,explanation,difficultyTarget=2}){
  return {id,year,domain,subtopicId,competencyId,prompt,options,answerIndex,explanation,responseType:"multiple-choice",gradingMode:"deterministic",sourceOrigin:"original",reviewStatus:"prototype",difficultyTarget,maxPoints:10,generated:true,practiceVariant:true,templateId:id.replace(/-V\\d+$/u,"")};
}
const rows=[];
function addSet(prefix,year,domain,subtopicId,items,competencyId="fqa-concepts"){
  items.forEach((row,index)=>rows.push(mc({id:`FQA-V2-${prefix}-V${index+1}`,year,domain,subtopicId,competencyId,...row})));
}

addSet("ATOM","10.º","q10-elements","q10-atom-structure",[
  {prompt:"Dois isótopos do mesmo elemento têm necessariamente o mesmo:",options:["número de protões","número de neutrões","número de nucleões","valor de massa atómica"],explanation:"Isótopos pertencem ao mesmo elemento porque têm o mesmo número atómico, isto é, o mesmo número de protões."},
  {prompt:"Num átomo neutro com número atómico 17 existem:",options:["17 protões e 17 eletrões","17 neutrões e 17 eletrões","34 protões","17 nucleões"],explanation:"Num átomo neutro, o número de eletrões é igual ao número de protões."},
  {prompt:"A massa de um átomo está concentrada sobretudo:",options:["no núcleo","na nuvem eletrónica","nos eletrões de valência","no espaço entre núcleo e eletrões"],explanation:"Protões e neutrões concentram praticamente toda a massa atómica no núcleo."},
  {prompt:"Se um átomo perde um eletrão, forma-se:",options:["um catião","um anião","um isótopo","um novo elemento"],explanation:"Perder eletrões deixa excesso de carga positiva, originando um catião."},
  {prompt:"O número de massa de um nuclídeo corresponde à soma de:",options:["protões e neutrões","protões e eletrões","neutrões e eletrões","apenas protões"],explanation:"O número de massa A conta os nucleões: protões + neutrões."},
  {prompt:"Átomos de elementos diferentes distinguem-se necessariamente pelo:",options:["número de protões","número de eletrões","número de neutrões","número de níveis ocupados"],explanation:"Cada elemento químico é definido pelo seu número atómico, isto é, pelo número de protões."}
]);

addSet("SPECTRA","10.º","q10-elements","q10-spectra",[
  {prompt:"Um espetro de emissão atómica apresenta linhas porque:",options:["os eletrões só podem ocupar determinados níveis de energia","os núcleos emitem todas as energias continuamente","a massa do átomo varia durante a emissão","os eletrões deixam de ter carga"],explanation:"As transições entre níveis quantizados originam fotões com energias bem definidas."},
  {prompt:"Quando um eletrão passa para um nível de energia mais baixo:",options:["é emitido um fotão","é absorvido um neutrão","a carga do núcleo diminui","o átomo deixa de ter níveis discretos"],explanation:"A diferença de energia entre níveis é libertada sob a forma de radiação."},
  {prompt:"Uma radiação de maior frequência tem, por fotão:",options:["maior energia","menor energia","a mesma energia de qualquer outra frequência","energia necessariamente nula"],explanation:"A energia do fotão é E=hf, aumentando com a frequência."},
  {prompt:"Num espetro de absorção, as linhas escuras correspondem a:",options:["frequências absorvidas pelos átomos","frequências produzidas pelo detetor","todas as frequências visíveis","ausência de níveis eletrónicos"],explanation:"Os átomos absorvem fotões cujas energias correspondem a diferenças entre níveis permitidos."},
  {prompt:"A identificação de elementos através do espetro baseia-se no facto de:",options:["cada elemento ter um conjunto característico de níveis eletrónicos","todos os elementos emitirem as mesmas linhas","a cor depender apenas da massa da amostra","a radiação não interagir com eletrões"],explanation:"As energias eletrónicas são características de cada elemento e geram linhas espectrais próprias."},
  {prompt:"Se a energia de um fotão aumenta, o seu comprimento de onda no vazio:",options:["diminui","aumenta","não se altera","torna-se sempre 1 m"],explanation:"Como E=hc/λ, maior energia corresponde a menor comprimento de onda."}
],"fqa-problems");

addSet("ECONF","10.º","q10-elements","q10-electron-config",[
  {prompt:"Os eletrões de valência são os que ocupam:",options:["os níveis mais externos ocupados","apenas o primeiro nível","o núcleo","qualquer nível interior completo"],explanation:"Os eletrões de valência pertencem à camada eletrónica mais externa ocupada."},
  {prompt:"A configuração 1s² 2s² 2p⁶ representa um átomo com:",options:["10 eletrões","6 eletrões","8 eletrões","12 eletrões"],explanation:"A soma dos expoentes é 2+2+6=10 eletrões."},
  {prompt:"Num orbital podem existir, no máximo:",options:["2 eletrões","1 eletrão","4 eletrões","8 eletrões"],explanation:"Cada orbital comporta no máximo dois eletrões com spins opostos."},
  {prompt:"O subnível p pode conter, no máximo:",options:["6 eletrões","2 eletrões","4 eletrões","10 eletrões"],explanation:"Um subnível p tem três orbitais, cada um com capacidade para dois eletrões."},
  {prompt:"Ao formar Na⁺ a partir de Na, o átomo:",options:["perde um eletrão de valência","ganha um protão","ganha um eletrão","perde um neutrão"],explanation:"O catião Na⁺ resulta da perda do eletrão mais externo do sódio."},
  {prompt:"Elementos do mesmo grupo principal apresentam semelhanças químicas sobretudo porque têm:",options:["configurações de valência semelhantes","o mesmo número de neutrões","a mesma massa atómica","o mesmo número total de eletrões"],explanation:"A reatividade química depende fortemente da configuração eletrónica de valência."}
]);

addSet("PERIOD","10.º","q10-elements","q10-periodicity",[
  {prompt:"Ao longo de um período, da esquerda para a direita, o raio atómico tende em geral a:",options:["diminuir","aumentar muito","ficar sempre constante","duplicar em cada elemento"],explanation:"A carga nuclear efetiva aumenta ao longo do período, atraindo mais fortemente os eletrões."},
  {prompt:"Ao descer num grupo da Tabela Periódica, o raio atómico tende a:",options:["aumentar","diminuir","ficar nulo","não depender do número de níveis"],explanation:"Aparecem novos níveis eletrónicos ocupados, aumentando o tamanho do átomo."},
  {prompt:"A energia de ionização mede a energia necessária para:",options:["remover um eletrão de uma espécie gasosa","adicionar um neutrão ao núcleo","fundir um sólido","quebrar qualquer ligação química"],explanation:"A energia de ionização está associada à remoção de eletrões de espécies no estado gasoso."},
  {prompt:"Os elementos de um mesmo grupo apresentam tipicamente:",options:["propriedades químicas semelhantes","o mesmo número de protões","a mesma massa atómica","o mesmo raio atómico"],explanation:"A semelhança deriva da configuração eletrónica de valência."},
  {prompt:"Um halogéneo tende, em reações simples, a:",options:["ganhar um eletrão","perder sete eletrões obrigatoriamente","ganhar dois protões","permanecer sempre neutro"],explanation:"Os halogéneos tendem a completar a camada de valência ganhando um eletrão."},
  {prompt:"Os gases nobres apresentam baixa reatividade porque possuem, em geral:",options:["camada de valência completa","apenas um eletrão","núcleos sem protões","energia de ionização nula"],explanation:"Uma configuração de valência completa é particularmente estável."}
]);

addSet("BOND","10.º","q10-matter","q10-bonding",[
  {prompt:"Numa ligação covalente, os átomos estabelecem ligação por:",options:["partilha de pares de eletrões","transferência obrigatória de protões","partilha de neutrões","eliminação dos eletrões de valência"],explanation:"A ligação covalente resulta da partilha de densidade eletrónica entre átomos."},
  {prompt:"Uma ligação iónica é favorecida quando ocorre:",options:["atração eletrostática entre iões de cargas opostas","partilha igual de neutrões","ausência total de cargas","sobreposição apenas de núcleos"],explanation:"A ligação iónica é dominada pela atração entre catiões e aniões."},
  {prompt:"Uma ligação covalente polar resulta de:",options:["partilha desigual de eletrões","ausência de eletrões ligantes","partilha de protões","igual eletronegatividade obrigatória"],explanation:"Diferenças de eletronegatividade conduzem a distribuição desigual da densidade eletrónica."},
  {prompt:"Em substâncias metálicas, a ligação pode ser descrita por:",options:["catiões numa rede e eletrões deslocalizados","moléculas isoladas sem eletrões","aniões ligados por pontes de hidrogénio","átomos sem interação"],explanation:"O modelo metálico envolve iões positivos imersos num conjunto de eletrões deslocalizados."},
  {prompt:"Uma ligação dupla envolve, comparativamente a uma ligação simples entre os mesmos átomos:",options:["mais pares eletrónicos partilhados","menos eletrões envolvidos","sempre maior comprimento","nenhuma densidade entre núcleos"],explanation:"Uma ligação dupla corresponde a dois pares eletrónicos partilhados."},
  {prompt:"A eletronegatividade traduz a tendência de um átomo, numa ligação, para:",options:["atrair densidade eletrónica","atrair neutrões do outro núcleo","perder sempre todos os eletrões","aumentar o número atómico"],explanation:"A eletronegatividade mede a capacidade relativa de atrair eletrões numa ligação."}
]);

addSet("GEOM","10.º","q10-matter","q10-geometry-polarity",[
  {prompt:"Segundo o modelo de repulsão dos pares eletrónicos, a geometria molecular resulta sobretudo de:",options:["minimizar repulsões entre regiões eletrónicas","maximizar a proximidade dos núcleos","eliminar pares não ligantes","tornar todas as moléculas planas"],explanation:"As regiões de densidade eletrónica orientam-se de modo a minimizar repulsões."},
  {prompt:"Mesmo contendo ligações polares, uma molécula pode ser globalmente apolar se:",options:["os dipolos se anulam pela geometria","não possui eletrões","todas as ligações são iónicas","tem sempre geometria angular"],explanation:"A polaridade molecular depende da soma vetorial dos dipolos de ligação."},
  {prompt:"Na molécula de CO₂, a geometria linear contribui para:",options:["anulação dos dipolos de ligação","criação de carga líquida positiva","ausência de ligações covalentes","formação de um ião"],explanation:"Os dois dipolos C=O têm sentidos opostos e igual intensidade, anulando-se."},
  {prompt:"Pares eletrónicos não ligantes no átomo central podem:",options:["alterar ângulos e geometria molecular","não exercer qualquer repulsão","aumentar o número de protões","transformar sempre a molécula em ião"],explanation:"Pares não ligantes também ocupam espaço e afetam a geometria."},
  {prompt:"Uma estrutura de Lewis representa principalmente:",options:["eletrões de valência e ligações","trajetórias exatas dos eletrões","movimento dos núcleos","massa de cada átomo"],explanation:"As estruturas de Lewis contabilizam eletrões de valência, pares ligantes e não ligantes."},
  {prompt:"Uma molécula angular com duas ligações polares iguais tende a ser:",options:["polar","necessariamente apolar","metálica","sem eletrões de valência"],explanation:"Numa geometria angular os vetores dipolo não se anulam completamente."}
]);

addSet("CARBON","10.º","q10-matter","q10-carbon",[
  {prompt:"O grupo funcional –OH caracteriza, entre outras classes, os:",options:["álcoois","alcanos","halogenetos metálicos","gases nobres"],explanation:"Nos álcoois, o grupo hidroxilo –OH está ligado a um carbono saturado."},
  {prompt:"Um hidrocarboneto contém apenas:",options:["carbono e hidrogénio","carbono e oxigénio","hidrogénio e azoto","carbono e qualquer metal"],explanation:"Por definição, hidrocarbonetos são constituídos apenas por C e H."},
  {prompt:"Uma ligação C=C é característica de:",options:["alcenos","alcanos","álcoois obrigatoriamente","sais iónicos"],explanation:"Os alcenos apresentam pelo menos uma ligação dupla carbono-carbono."},
  {prompt:"O grupo –COOH identifica a função:",options:["ácido carboxílico","éter","alceno","amina"],explanation:"O grupo carboxilo –COOH é característico dos ácidos carboxílicos."},
  {prompt:"Compostos com a mesma fórmula molecular mas estruturas diferentes são:",options:["isómeros","isótopos","iões do mesmo átomo","elementos diferentes obrigatoriamente"],explanation:"Isomeria corresponde a igual fórmula molecular e diferente arranjo estrutural."},
  {prompt:"O carbono forma grande diversidade de compostos devido, entre outros fatores, à sua capacidade de:",options:["formar quatro ligações covalentes e cadeias","ter sempre carga +4","não se ligar a si próprio","existir apenas em moléculas lineares"],explanation:"A tetravalência e a catenação do carbono sustentam a diversidade orgânica."}
]);

addSet("INTER","10.º","q10-matter","q10-intermolecular",[
  {prompt:"Entre moléculas de água, uma interação intermolecular importante é:",options:["ligação de hidrogénio","ligação metálica","ligação iónica entre moléculas neutras","fusão nuclear"],explanation:"O H ligado a O e os pares eletrónicos do O permitem ligações de hidrogénio."},
  {prompt:"Forças de dispersão de London existem:",options:["em todas as partículas moleculares","apenas em moléculas polares","apenas em iões","apenas em metais"],explanation:"Flutuações eletrónicas originam dipolos instantâneos em todas as espécies polarizáveis."},
  {prompt:"Em moléculas de tamanho semelhante, maior polaridade tende a favorecer:",options:["interações dipolo-dipolo mais fortes","ausência de forças intermoleculares","menor atração em qualquer caso","transformação automática em ião"],explanation:"Dipolos permanentes aumentam a contribuição dipolo-dipolo."},
  {prompt:"Um ponto de ebulição mais elevado pode indicar, entre moléculas comparáveis:",options:["interações intermoleculares mais fortes","ligações intramoleculares inexistentes","menor massa em todos os casos","ausência de eletrões"],explanation:"É necessária mais energia para separar moléculas fortemente atraídas."},
  {prompt:"Uma substância apolar dissolve-se tipicamente melhor num solvente:",options:["apolar","muito polar em qualquer situação","iónico sólido","sem moléculas"],explanation:"A semelhança de polaridade favorece compatibilidade intermolecular."},
  {prompt:"A ligação de hidrogénio é especialmente relevante quando H está ligado diretamente a:",options:["N, O ou F","Na, K ou Ca","qualquer metal","He, Ne ou Ar"],explanation:"N, O e F são pequenos e muito eletronegativos, permitindo fortes interações de hidrogénio."}
]);

addSet("PHOTO","10.º","q10-matter","q10-photochemistry",[
  {prompt:"Uma reação fotoquímica é iniciada ou promovida por:",options:["absorção de radiação","aumento de massa nuclear","remoção de todos os eletrões","ausência de energia"],explanation:"A absorção de fotões pode fornecer energia para desencadear transformações químicas."},
  {prompt:"O ozono estratosférico é importante porque absorve parte significativa da radiação:",options:["ultravioleta","micro-ondas","rádio de baixa frequência","som"],explanation:"A camada de ozono reduz a quantidade de UV que chega à superfície."},
  {prompt:"A energia de um fotão UV é, em geral, maior que a de um fotão visível porque o UV tem:",options:["maior frequência","menor velocidade no vazio","menor constante de Planck","massa superior"],explanation:"E=hf; frequências mais altas correspondem a fotões mais energéticos."},
  {prompt:"A fotodissociação ocorre quando a radiação absorvida:",options:["fornece energia suficiente para quebrar ligações","elimina a carga dos núcleos","reduz sempre a temperatura","impede qualquer colisão"],explanation:"Um fotão suficientemente energético pode promover quebra de ligação."},
  {prompt:"A proteção da camada de ozono está relacionada com a redução de substâncias que:",options:["libertam espécies capazes de catalisar a destruição do ozono","aumentam a concentração de azoto molecular","absorvem som","diminuem a gravidade"],explanation:"Certas espécies radicalares participam cataliticamente em ciclos de destruição do ozono."},
  {prompt:"Numa transformação fotoquímica, aumentar a intensidade luminosa pode aumentar a taxa inicial se:",options:["houver mais fotões disponíveis para serem absorvidos","a reação não absorver qualquer radiação","não existirem moléculas reagentes","a frequência deixar de existir"],explanation:"Mais fotões incidentes podem aumentar o número de eventos de absorção por unidade de tempo."}
]);

addSet("MECHENE","10.º","f10-energy","f10-mechanical-energy",[
  {prompt:"Na ausência de forças dissipativas, a energia mecânica de um sistema:",options:["conserva-se","aumenta sempre","diminui sempre","é sempre zero"],explanation:"Com apenas forças conservativas, a soma das energias cinética e potencial mantém-se."},
  {prompt:"Ao cair em queda livre, desprezando o ar, a energia potencial gravítica:",options:["diminui enquanto a cinética aumenta","aumenta juntamente com a cinética","não se altera","transforma-se em massa"],explanation:"A diminuição de energia potencial é convertida em energia cinética."},
  {prompt:"A energia potencial gravítica próxima da superfície terrestre depende de:",options:["massa, g e altura de referência","apenas da velocidade","apenas do tempo","carga elétrica"],explanation:"Usa-se Epg=mgh relativamente a um nível de referência."},
  {prompt:"Se a rapidez de um corpo duplica, a sua energia cinética:",options:["quadruplica","duplica","fica metade","não se altera"],explanation:"Ec=½mv², logo depende do quadrado da rapidez."},
  {prompt:"O trabalho de uma força dissipativa, como o atrito, pode provocar:",options:["diminuição da energia mecânica","aumento obrigatório da energia mecânica","conservação perfeita da energia mecânica","eliminação da energia total"],explanation:"Parte da energia mecânica é transferida para energia interna, embora a energia total se conserve."},
  {prompt:"Num lançamento vertical sem resistência do ar, no ponto mais alto:",options:["a energia cinética é mínima e a potencial máxima","a energia cinética é máxima","a energia potencial é mínima","a energia mecânica é zero"],explanation:"No topo a velocidade instantânea é zero e a energia potencial é máxima relativamente ao ponto de lançamento."}
],"fqa-problems");

addSet("THERMRAD","10.º","f10-energy","f10-thermal-radiation",[
  {prompt:"Um corpo a temperatura superior à vizinhança tende a transferir energia por radiação com saldo:",options:["para o exterior","para o interior","sempre nulo","independente da temperatura"],explanation:"Todos os corpos emitem e absorvem radiação, mas o mais quente tende a ter maior emissão líquida."},
  {prompt:"Uma superfície negra ideal é um bom:",options:["absorvedor e emissor de radiação","refletor perfeito","isolante de qualquer radiação","condutor elétrico obrigatório"],explanation:"Um corpo negro ideal absorve toda a radiação incidente e é também emissor eficiente."},
  {prompt:"A condução térmica ocorre por transferência de energia:",options:["através de interações microscópicas sem transporte macroscópico de matéria","apenas por ondas sonoras","apenas no vazio","com criação de energia"],explanation:"Na condução, a energia passa entre partículas sem deslocamento macroscópico do material."},
  {prompt:"A convecção é característica sobretudo de:",options:["fluidos","vácuo perfeito","sólidos rígidos apenas","núcleos atómicos"],explanation:"A convecção envolve movimento de massas de líquidos ou gases."},
  {prompt:"A potência radiada por um corpo aumenta fortemente quando:",options:["a sua temperatura absoluta aumenta","a sua massa diminui ligeiramente","o tempo passa sem alteração térmica","a gravidade é anulada"],explanation:"A lei de Stefan-Boltzmann mostra forte dependência da potência radiada com T⁴."},
  {prompt:"O equilíbrio térmico entre dois corpos em contacto significa que:",options:["não há transferência líquida de energia por diferença de temperatura","ambos deixam de ter energia interna","as massas ficam iguais","a temperatura é obrigatoriamente 0 °C"],explanation:"No equilíbrio térmico as temperaturas são iguais e não existe fluxo líquido devido a diferença térmica."}
]);

addSet("THERMO","10.º","f10-energy","f10-thermodynamics",[
  {prompt:"A Primeira Lei da Termodinâmica expressa essencialmente:",options:["conservação da energia","conservação exclusiva da massa","aumento obrigatório da temperatura","impossibilidade de trabalho"],explanation:"A variação de energia interna resulta das transferências de energia por calor e trabalho."},
  {prompt:"Quando um sistema recebe energia por aquecimento, a sua energia interna:",options:["pode aumentar","tem de diminuir","fica sempre nula","não pode variar"],explanation:"A energia transferida por calor pode aumentar a energia interna, dependendo também do trabalho trocado."},
  {prompt:"A Segunda Lei da Termodinâmica está associada ao facto de processos naturais terem:",options:["um sentido preferencial","reversibilidade perfeita em qualquer situação","rendimento sempre 100%","ausência de dissipação"],explanation:"A Segunda Lei introduz irreversibilidade e limita a conversão integral de calor em trabalho."},
  {prompt:"Uma máquina térmica não pode converter todo o calor recebido em trabalho porque:",options:["existem limitações impostas pela Segunda Lei","a energia não se conserva","a massa desaparece","a temperatura nunca muda"],explanation:"Uma máquina cíclica tem de rejeitar parte da energia para uma fonte fria."},
  {prompt:"Num processo adiabático ideal:",options:["não há transferência de energia por calor","não há qualquer trabalho","a energia interna é sempre constante","a pressão é sempre zero"],explanation:"Adiabático significa Q=0, embora possa haver trabalho e variação de energia interna."},
  {prompt:"A energia interna de um sistema está relacionada com:",options:["energias microscópicas das partículas","apenas a energia cinética do centro de massa","apenas a altura do sistema","apenas a carga total"],explanation:"A energia interna agrega contribuições microscópicas cinéticas e potenciais das partículas."}
]);

addSet("INTERACT","11.º","f11-mechanics","f11-interactions",[
  {prompt:"As forças de ação e reação atuam:",options:["em corpos diferentes","no mesmo corpo","apenas quando há movimento","apenas em interações de contacto"],explanation:"O par da Terceira Lei atua sempre em corpos distintos."},
  {prompt:"Se a força resultante sobre um corpo é nula, ele pode:",options:["estar em repouso ou mover-se com velocidade constante","apenas estar em repouso","apenas acelerar","mudar obrigatoriamente de direção"],explanation:"Resultante nula implica aceleração nula, não necessariamente velocidade nula."},
  {prompt:"A força gravítica entre dois corpos é:",options:["atrativa","sempre repulsiva","independente das massas","nula fora da Terra"],explanation:"A interação gravítica entre massas é atrativa."},
  {prompt:"Uma força é uma grandeza vetorial porque possui:",options:["módulo, direção e sentido","apenas valor numérico","apenas unidade","massa própria"],explanation:"A descrição completa de uma força exige módulo, direção e sentido."},
  {prompt:"Duas forças iguais e opostas aplicadas no mesmo corpo:",options:["podem ter resultante nula","formam necessariamente um par ação-reação","duplicam sempre a aceleração","não podem existir"],explanation:"Se forem colineares e opostas, podem equilibrar-se; isso não as torna automaticamente um par ação-reação."},
  {prompt:"O peso de um corpo corresponde:",options:["à força gravítica exercida sobre ele","à quantidade de matéria","à energia cinética","à força normal"],explanation:"Peso é a força gravítica que o astro exerce sobre o corpo."}
]);

addSet("FORCEMOT","11.º","f11-mechanics","f11-forces-motion",[
  {prompt:"Se a resultante das forças tem o mesmo sentido da velocidade, a rapidez tende a:",options:["aumentar","diminuir","ficar sempre constante","tornar-se zero instantaneamente"],explanation:"A aceleração no sentido da velocidade aumenta o módulo da velocidade."},
  {prompt:"Se a resultante é oposta à velocidade, a rapidez tende inicialmente a:",options:["diminuir","aumentar","ficar invariável","duplicar"],explanation:"Uma aceleração oposta à velocidade reduz o seu módulo enquanto o sentido não se inverter."},
  {prompt:"Numa trajetória curva com rapidez constante existe aceleração porque:",options:["a direção da velocidade varia","o módulo da velocidade aumenta","a massa varia","não há força resultante"],explanation:"A aceleração mede a variação do vetor velocidade, incluindo mudanças de direção."},
  {prompt:"Num plano horizontal, se atrito e força aplicada se equilibram, o corpo:",options:["pode mover-se com velocidade constante","tem de acelerar","tem de estar parado","perde massa"],explanation:"Com resultante nula, a aceleração é zero e a velocidade mantém-se."},
  {prompt:"A aceleração de um corpo de massa constante é proporcional:",options:["à força resultante","ao inverso da força resultante","à velocidade inicial apenas","ao tempo apenas"],explanation:"A Segunda Lei de Newton dá a=F_resultante/m."},
  {prompt:"Se a mesma força resultante atuar num corpo com o dobro da massa, a aceleração será:",options:["metade","o dobro","quatro vezes maior","a mesma"],explanation:"Pela relação a=F/m, duplicar a massa reduz a aceleração para metade."}
],"fqa-problems");

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE2=rows;
