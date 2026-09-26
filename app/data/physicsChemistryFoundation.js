import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "./physicsChemistryConstructed.js";

export const PHYSICS_CHEMISTRY_A_VERSION="2026.09-foundation-v1";

export const PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES=[
  {id:"dge-fqa10-2026",authority:"DGE",status:"in-force",year:"10.º",url:"https://www.dge.mec.pt/sites/default/files/es_10_fisico-quimica_a.pdf",label:"Aprendizagens Essenciais · Física e Química A · 10.º ano · março 2026"},
  {id:"dge-fqa11-2026",authority:"DGE",status:"in-force",year:"11.º",url:"https://www.dge.mec.pt/sites/default/files/es_11_fisico-quimica_a.pdf",label:"Aprendizagens Essenciais · Física e Química A · 11.º ano · março 2026"},
  {id:"iave-fqa715-2026",authority:"IAVE",status:"exam-reference",year:"10.º+11.º",url:"https://iave.pt/wp-content/uploads/2025/11/IP-EX-FQA715-2026.pdf",label:"Informação-Prova 715 · Física e Química A · 2026"}
];

export const PHYSICS_CHEMISTRY_A_DOMAINS=[
  {id:"q10-elements",area:"Química",year:"10.º",title:"Elementos Químicos e sua organização",shortTitle:"Elementos Químicos",subtopics:["Massa e tamanho dos átomos","Quantidade de matéria e massa molar","Energia dos eletrões e espectros","Configuração eletrónica","Tabela Periódica e periodicidade"]},
  {id:"q10-matter",area:"Química",year:"10.º",title:"Propriedades e Transformações da Matéria",shortTitle:"Matéria e Transformações",subtopics:["Ligação química","Estruturas de Lewis, geometria e polaridade","Compostos de carbono e grupos funcionais","Interações intermoleculares","Gases, soluções e dispersões","Transformações químicas e entalpia","Reações fotoquímicas e ozono"]},
  {id:"f10-energy",area:"Física",year:"10.º",title:"Energia e sua conservação",shortTitle:"Energia",subtopics:["Energia e movimentos","Trabalho e teorema da energia cinética","Energia potencial e mecânica","Energia e fenómenos elétricos","Energia, fenómenos térmicos e radiação","Primeira e Segunda Leis da Termodinâmica"]},
  {id:"f11-mechanics",area:"Física",year:"11.º",title:"Mecânica",shortTitle:"Mecânica",subtopics:["Tempo, posição, velocidade e aceleração","Interações e seus efeitos","Leis de Newton e gravitação","Forças e movimentos","Movimento circular uniforme","Análise gráfica e experimental do movimento"]},
  {id:"f11-waves",area:"Física",year:"11.º",title:"Ondas e Eletromagnetismo",shortTitle:"Ondas e Eletromagnetismo",subtopics:["Sinais e ondas","Som","Campos elétrico e magnético","Indução eletromagnética","Ondas eletromagnéticas","Reflexão, refração e aplicações tecnológicas"]},
  {id:"q11-equilibrium",area:"Química",year:"11.º",title:"Equilíbrio Químico",shortTitle:"Equilíbrio Químico",subtopics:["Aspetos quantitativos das reações químicas","Estequiometria, reagente limitante e rendimento","Estado de equilíbrio","Constante e quociente da reação","Princípio de Le Châtelier","Química verde e processos industriais"]},
  {id:"q11-aqueous",area:"Química",year:"11.º",title:"Reações em sistemas aquosos",shortTitle:"Sistemas aquosos",subtopics:["Reações ácido-base","pH, ácidos e bases fortes e fracos","Titulações ácido-base","Reações de oxidação-redução","Série eletroquímica e corrosão","Soluções e equilíbrio de solubilidade","Produto de solubilidade, precipitação e efeito do ião comum"]}
];

export const PHYSICS_CHEMISTRY_A_COMPETENCIES=[
  {id:"fqa-concepts",label:"Conhecimento científico",description:"Mobilizar conceitos, leis, modelos e relações quantitativas com rigor."},
  {id:"fqa-problems",label:"Resolução de problemas",description:"Selecionar dados, relações e estratégias adequadas e verificar a coerência do resultado."},
  {id:"fqa-data",label:"Interpretação de dados",description:"Interpretar gráficos, tabelas, esquemas e informação experimental."},
  {id:"fqa-experimental",label:"Trabalho prático-experimental",description:"Analisar procedimentos, variáveis, incerteza, erros e conclusões experimentais."},
  {id:"fqa-communication",label:"Comunicação científica",description:"Apresentar raciocínios demonstrativos e conclusões com linguagem científica adequada."}
];

export function physicsChemistryDomainsForYear(year,{includePrevious=true}={}){
  if(year==="Já terminei o secundário")return PHYSICS_CHEMISTRY_A_DOMAINS;
  if(year==="10.º")return PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year==="10.º");
  if(year==="11.º"||year==="12.º")return PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>includePrevious||row.year==="11.º"?["10.º","11.º"].includes(row.year):row.year==="11.º");
  return PHYSICS_CHEMISTRY_A_DOMAINS;
}

const raw=[
["FQA-ELEM-01","10.º","q10-elements","fqa-concepts","Um átomo neutro tem número atómico 17 e número de massa 37. Quantos neutrões possui?",["17","20","37","54"],1,"O número de neutrões é A − Z = 37 − 17 = 20."],
["FQA-ELEM-02","10.º","q10-elements","fqa-problems","Uma amostra contém 0,50 mol de moléculas. O número de moléculas é aproximadamente:",["3,01 × 10²³","6,02 × 10²³","1,20 × 10²⁴","0,50"],0,"N = nN_A, logo 0,50 × 6,02 × 10²³ ≈ 3,01 × 10²³."],
["FQA-ELEM-03","10.º","q10-elements","fqa-concepts","Num espectro de emissão atómico, uma risca corresponde:",["à remoção do núcleo","à transição eletrónica com emissão de um fotão","à fusão de dois átomos","à perda de massa do eletrão"],1,"Uma transição para um nível de menor energia pode originar a emissão de um fotão."],
["FQA-ELEM-04","10.º","q10-elements","fqa-data","Dois elementos apresentam espectros de emissão diferentes. A conclusão mais adequada é:",["os espectros são característicos dos elementos","os elementos têm necessariamente a mesma configuração eletrónica","a frequência da luz não depende da energia","os espectros só dependem da massa da amostra"],0,"Os espectros atómicos são característicos de cada elemento."],
["FQA-ELEM-05","10.º","q10-elements","fqa-concepts","Qual configuração eletrónica fundamental corresponde ao sódio (Z=11)?",["1s² 2s² 2p⁶ 3s¹","1s² 2s² 2p⁵ 3s²","1s² 2s² 2p⁶ 3p¹","1s² 2s² 2p⁶ 3s²"],0,"O sódio tem 11 eletrões: 1s² 2s² 2p⁶ 3s¹."],
["FQA-ELEM-06","10.º","q10-elements","fqa-concepts","Ao longo de um período, em geral, o raio atómico:",["aumenta continuamente","diminui com o aumento da carga nuclear efetiva","não varia","depende apenas do número de neutrões"],1,"A carga nuclear efetiva tende a aumentar ao longo do período, contraindo a nuvem eletrónica."],
["FQA-ELEM-07","10.º","q10-elements","fqa-experimental","Ao medir repetidamente uma massa, resultados muito próximos entre si indicam sobretudo:",["boa precisão","ausência total de erro sistemático","valor necessariamente exato","maior incerteza"],0,"A proximidade entre medições repetidas está associada à precisão."],
["FQA-ELEM-08","10.º","q10-elements","fqa-problems","A massa molar de H₂O é aproximadamente 18,0 g mol⁻¹. Quantidade de matéria em 9,0 g de água:",["0,25 mol","0,50 mol","1,0 mol","2,0 mol"],1,"n=m/M=9,0/18,0=0,50 mol."],

["FQA-MAT-01","10.º","q10-matter","fqa-concepts","Numa ligação covalente, os átomos estabilizam-se principalmente por:",["partilha de eletrões de valência","transferência obrigatória de protões","desaparecimento dos eletrões","aumento do número de neutrões"],0,"A ligação covalente envolve partilha de pares de eletrões."],
["FQA-MAT-02","10.º","q10-matter","fqa-concepts","A molécula CO₂ é linear e as ligações C=O são polares. A molécula é globalmente:",["polar, porque contém oxigénio","apolar, porque os dipolos se compensam","iónica","metálica"],1,"A geometria linear faz com que os dipolos das duas ligações se anulem."],
["FQA-MAT-03","10.º","q10-matter","fqa-concepts","Entre moléculas de água, a interação intermolecular especialmente relevante é:",["ligação de hidrogénio","ligação metálica","ligação iónica","força nuclear"],0,"A presença de O–H permite ligações de hidrogénio entre moléculas de água."],
["FQA-MAT-04","10.º","q10-matter","fqa-problems","Uma solução contém 0,20 mol de soluto em 0,50 dm³. A concentração molar é:",["0,10 mol dm⁻³","0,20 mol dm⁻³","0,40 mol dm⁻³","2,5 mol dm⁻³"],2,"c=n/V=0,20/0,50=0,40 mol dm⁻³."],
["FQA-MAT-05","10.º","q10-matter","fqa-experimental","Para preparar por diluição uma solução menos concentrada deve-se:",["adicionar solvente a uma quantidade conhecida da solução inicial","evaporar solvente","adicionar mais soluto sólido sem medir","aquecer até ebulição"],0,"Numa diluição, conserva-se a quantidade de soluto transferida e aumenta-se o volume com solvente."],
["FQA-MAT-06","10.º","q10-matter","fqa-concepts","Numa reação exotérmica, a variação de entalpia do sistema é, em geral:",["positiva","negativa","sempre nula","igual à massa molar"],1,"Num processo exotérmico o sistema transfere energia para o exterior, pelo que ΔH<0."],
["FQA-MAT-07","10.º","q10-matter","fqa-concepts","Qual grupo funcional caracteriza um ácido carboxílico?",["–OH","–COOH","–NH₂","C=C"],1,"O grupo carboxilo é –COOH."],
["FQA-MAT-08","10.º","q10-matter","fqa-data","Se a energia necessária para quebrar ligações nos reagentes for menor do que a libertada na formação de ligações nos produtos, a reação tende a ser:",["endotérmica","exotérmica","sem transformação química","independente da energia"],1,"Libertar mais energia na formação de ligações do que a absorvida na quebra conduz a ΔH negativo."],

["FQA-ENE-01","10.º","f10-energy","fqa-problems","Um corpo de 2,0 kg move-se a 3,0 m s⁻¹. A energia cinética é:",["3 J","6 J","9 J","18 J"],2,"E_c=½mv²=½×2,0×9,0=9 J."],
["FQA-ENE-02","10.º","f10-energy","fqa-concepts","Se apenas atuarem forças conservativas num sistema mecânico, a energia mecânica:",["conserva-se","aumenta sempre","diminui sempre","é sempre zero"],0,"Na ausência de trabalho de forças não conservativas, a energia mecânica conserva-se."],
["FQA-ENE-03","10.º","f10-energy","fqa-problems","Uma força constante de 10 N atua no sentido do deslocamento de 3,0 m. O trabalho é:",["3 J","10 J","13 J","30 J"],3,"W=Fd cos0°=10×3=30 J."],
["FQA-ENE-04","10.º","f10-energy","fqa-concepts","Dois resistores iguais ligados em paralelo a uma fonte ideal ficam sujeitos:",["à mesma diferença de potencial","a correntes necessariamente nulas","a metade da tensão total em cada um","a uma resistência equivalente maior do que cada resistor"],0,"Em paralelo, os terminais de cada resistor ligam-se aos mesmos dois pontos, logo têm a mesma tensão."],
["FQA-ENE-05","10.º","f10-energy","fqa-problems","Um aparelho de 100 W funciona durante 20 s. A energia transferida é:",["5 J","120 J","200 J","2000 J"],3,"E=Pt=100×20=2000 J."],
["FQA-ENE-06","10.º","f10-energy","fqa-concepts","A transferência espontânea de energia por calor ocorre:",["do sistema mais frio para o mais quente","entre sistemas à mesma temperatura apenas","do sistema a maior temperatura para o de menor temperatura","sem diferença de temperatura"],2,"Calor é energia transferida espontaneamente devido a uma diferença de temperatura."],
["FQA-ENE-07","10.º","f10-energy","fqa-data","Num gráfico energia-tempo, a energia útil aumenta 400 J em 5 s. A potência útil média é:",["40 W","80 W","200 W","2000 W"],1,"P=ΔE/Δt=400/5=80 W."],
["FQA-ENE-08","10.º","f10-energy","fqa-concepts","Um rendimento inferior a 100% significa que:",["parte da energia transferida não fica disponível como energia útil","a energia total desapareceu","a conservação da energia deixou de se verificar","não houve qualquer transformação"],0,"A energia conserva-se, mas nem toda permanece em forma útil para o objetivo do processo."],

["FQA-MEC-01","11.º","f11-mechanics","fqa-data","Num gráfico posição-tempo, uma reta de declive constante representa um movimento:",["retilíneo uniforme","uniformemente acelerado","circular uniforme","necessariamente em repouso"],0,"Declive constante em x(t) corresponde a velocidade constante."],
["FQA-MEC-02","11.º","f11-mechanics","fqa-problems","Um móvel passa de 4,0 m s⁻¹ para 10,0 m s⁻¹ em 3,0 s. A aceleração média é:",["2,0 m s⁻²","3,0 m s⁻²","4,7 m s⁻²","18 m s⁻²"],0,"a_m=Δv/Δt=(10−4)/3=2,0 m s⁻²."],
["FQA-MEC-03","11.º","f11-mechanics","fqa-concepts","Segundo a segunda lei de Newton, a aceleração de um corpo tem a direção e o sentido:",["da velocidade inicial","da força resultante","do deslocamento total","sempre vertical"],1,"A força resultante e a aceleração têm a mesma direção e sentido."],
["FQA-MEC-04","11.º","f11-mechanics","fqa-concepts","Num movimento circular uniforme, a rapidez é constante mas:",["a velocidade vetorial varia de direção","a aceleração é nula","a resultante das forças é nula","a trajetória é retilínea"],0,"A direção da velocidade muda continuamente, existindo aceleração centrípeta."],
["FQA-MEC-05","11.º","f11-mechanics","fqa-problems","Uma força resultante de 12 N atua num corpo de 3,0 kg. A aceleração é:",["0,25 m s⁻²","4,0 m s⁻²","9,0 m s⁻²","36 m s⁻²"],1,"a=F_R/m=12/3=4,0 m s⁻²."],
["FQA-MEC-06","11.º","f11-mechanics","fqa-concepts","A força gravítica entre dois corpos, mantendo as massas, quando a distância entre os centros duplica:",["duplica","fica quatro vezes maior","reduz-se a metade","reduz-se a um quarto"],3,"Pela lei da gravitação, F é inversamente proporcional a r²."],
["FQA-MEC-07","11.º","f11-mechanics","fqa-experimental","Ao determinar g por queda livre, repetir medições permite sobretudo:",["avaliar a dispersão e reduzir a influência de flutuações aleatórias","eliminar qualquer erro sistemático","mudar o valor verdadeiro de g","dispensar a medição do tempo"],0,"Repetições ajudam a caracterizar a variabilidade aleatória, mas não garantem a eliminação de erros sistemáticos."],
["FQA-MEC-08","11.º","f11-mechanics","fqa-data","Num gráfico velocidade-tempo, a área algébrica entre a curva e o eixo do tempo corresponde:",["à aceleração","ao deslocamento","à força","à massa"],1,"A integral de v(t) no tempo fornece o deslocamento."],

["FQA-WAV-01","11.º","f11-waves","fqa-concepts","Uma onda mecânica necessita:",["de um meio material para se propagar","sempre de vácuo","de carga elétrica líquida","de reação química"],0,"Ondas mecânicas propagam-se através das interações das partículas de um meio."],
["FQA-WAV-02","11.º","f11-waves","fqa-problems","Uma onda com frequência 50 Hz e comprimento de onda 2,0 m propaga-se a:",["25 m s⁻¹","50 m s⁻¹","100 m s⁻¹","250 m s⁻¹"],2,"v=fλ=50×2,0=100 m s⁻¹."],
["FQA-WAV-03","11.º","f11-waves","fqa-concepts","Quando uma onda passa para outro meio, a frequência:",["mantém-se porque é determinada pela fonte","duplica sempre","fica nula","depende apenas do comprimento de onda inicial"],0,"A fonte fixa a frequência; no novo meio variam velocidade e comprimento de onda."],
["FQA-WAV-04","11.º","f11-waves","fqa-data","Num sinal sonoro puro, aumentar a amplitude mantendo a frequência altera principalmente:",["a altura","a intensidade","o período da fonte","a velocidade do som no mesmo meio"],1,"A amplitude está ligada à intensidade; a frequência determina a altura."],
["FQA-WAV-05","11.º","f11-waves","fqa-concepts","A indução eletromagnética ocorre quando:",["varia o fluxo magnético através de um circuito","a resistência é sempre zero","não existe campo magnético","há apenas uma carga em repouso"],0,"Uma variação de fluxo magnético pode induzir uma força eletromotriz."],
["FQA-WAV-06","11.º","f11-waves","fqa-concepts","Na refração da luz entre dois meios, a grandeza que permanece constante é:",["a velocidade","o comprimento de onda","a frequência","o índice de refração"],2,"A frequência é determinada pela fonte e mantém-se na passagem de meio."],
["FQA-WAV-07","11.º","f11-waves","fqa-experimental","Ao medir a velocidade do som por tempo de voo, uma melhoria útil é:",["aumentar a distância medida quando possível, mantendo controlo das condições","usar uma distância desconhecida","fazer apenas uma medição","ignorar atrasos instrumentais"],0,"Uma maior distância pode reduzir a importância relativa da incerteza temporal, desde que o procedimento permaneça controlado."],
["FQA-WAV-08","11.º","f11-waves","fqa-problems","Uma onda tem período 0,020 s. A frequência é:",["0,020 Hz","2,0 Hz","20 Hz","50 Hz"],3,"f=1/T=1/0,020=50 Hz."],

["FQA-EQ-01","11.º","q11-equilibrium","fqa-problems","Numa reação, 2,0 mol de A reagem com 1,0 mol de B segundo 2A + B → produtos. A mistura está inicialmente:",["estequiométrica","com A limitante","com B limitante","sem reagente limitante por definição"],0,"A razão 2:1 coincide exatamente com a estequiometria da equação."],
["FQA-EQ-02","11.º","q11-equilibrium","fqa-concepts","Num equilíbrio químico dinâmico:",["as reações direta e inversa continuam com velocidades iguais","as reações param","as concentrações são necessariamente iguais","não existem produtos"],0,"No equilíbrio, as velocidades direta e inversa igualam-se, mantendo concentrações macroscópicas constantes."],
["FQA-EQ-03","11.º","q11-equilibrium","fqa-concepts","Para uma reação exotérmica em equilíbrio, aumentar a temperatura tende a favorecer:",["o sentido endotérmico","sempre os produtos","sempre os reagentes independentemente da entalpia","nenhum sentido"],0,"O sistema responde à perturbação favorecendo o sentido que absorve energia."],
["FQA-EQ-04","11.º","q11-equilibrium","fqa-problems","Se Q<K para uma reação nas condições consideradas, o sistema tende inicialmente a evoluir:",["no sentido direto","no sentido inverso","sem qualquer alteração","para K=0"],0,"Q<K indica excesso relativo de reagentes face ao equilíbrio; a reação evolui no sentido direto."],
["FQA-EQ-05","11.º","q11-equilibrium","fqa-concepts","Adicionar um catalisador a um sistema em equilíbrio:",["altera K","desloca o equilíbrio para os produtos","acelera igualmente os sentidos direto e inverso sem alterar a composição de equilíbrio","elimina a reação inversa"],2,"O catalisador altera a rapidez de chegada ao equilíbrio, não a constante nem a composição de equilíbrio."],
["FQA-EQ-06","11.º","q11-equilibrium","fqa-problems","Se a massa teórica de produto é 10,0 g e se obtêm 8,0 g, o rendimento é:",["20%","80%","100%","125%"],1,"η=8,0/10,0×100%=80%."],
["FQA-EQ-07","11.º","q11-equilibrium","fqa-data","Num gráfico concentração-tempo, a partir de certo instante todas as concentrações ficam constantes. Isso é compatível com:",["equilíbrio químico macroscópico","paragem obrigatória das reações microscópicas","destruição do sistema","temperatura necessariamente zero"],0,"Concentrações constantes são compatíveis com equilíbrio dinâmico."],
["FQA-EQ-08","11.º","q11-equilibrium","fqa-communication","Num processo industrial em equilíbrio, a escolha das condições deve considerar:",["apenas o rendimento teórico","rendimento, rapidez, energia, segurança e impacto ambiental","apenas a cor dos reagentes","somente a pressão, em qualquer reação"],1,"A decisão industrial é um compromisso entre fatores químicos, energéticos, económicos, ambientais e de segurança."],

["FQA-AQ-01","11.º","q11-aqueous","fqa-concepts","Segundo Brönsted-Lowry, um ácido é uma espécie que:",["cede protões","recebe sempre eletrões","liberta obrigatoriamente oxigénio","forma precipitados em qualquer solução"],0,"Ácido de Brönsted-Lowry é dador de protões."],
["FQA-AQ-02","11.º","q11-aqueous","fqa-problems","Uma solução com [H₃O⁺]=1,0×10⁻³ mol dm⁻³ tem pH:",["1","3","7","11"],1,"pH=−log(10⁻³)=3."],
["FQA-AQ-03","11.º","q11-aqueous","fqa-concepts","Numa titulação ácido-base, o ponto de equivalência corresponde ao instante em que:",["as quantidades reagiram segundo a estequiometria da reação","o pH é sempre 7","a solução fica sempre incolor","todo o solvente evaporou"],0,"No ponto de equivalência, ácido e base foram misturados nas proporções estequiométricas pertinentes."],
["FQA-AQ-04","11.º","q11-aqueous","fqa-concepts","Numa reação de oxidação-redução, a espécie que se oxida:",["ganha eletrões","perde eletrões","não altera o número de oxidação","é sempre um ião negativo"],1,"Oxidação corresponde a perda de eletrões e aumento do número de oxidação."],
["FQA-AQ-05","11.º","q11-aqueous","fqa-concepts","A corrosão de muitos metais é interpretada como:",["um processo redox","uma simples mudança de estado","uma neutralização obrigatória","um equilíbrio de solubilidade sem eletrões"],0,"A corrosão envolve processos de oxidação-redução."],
["FQA-AQ-06","11.º","q11-aqueous","fqa-concepts","Para um sal pouco solúvel, se o produto iónico ultrapassar Kps, prevê-se:",["formação de precipitado","dissolução total adicional","pH necessariamente 7","ausência de iões"],0,"Quando o produto iónico excede Kps, a solução está acima da condição de equilíbrio e pode precipitar sólido."],
["FQA-AQ-07","11.º","q11-aqueous","fqa-concepts","O efeito do ião comum num equilíbrio de dissolução de um sal pouco solúvel tende a:",["aumentar a solubilidade sem limite","diminuir a solubilidade","não alterar qualquer equilíbrio","eliminar o solvente"],1,"Adicionar um ião já presente no equilíbrio desloca-o, em geral, no sentido da formação do sólido."],
["FQA-AQ-08","11.º","q11-aqueous","fqa-experimental","Numa titulação, enxaguar a bureta com a própria solução titulante antes de a encher ajuda a:",["evitar diluição indesejada do titulante por água residual","aumentar arbitrariamente a concentração","mudar o ponto de equivalência químico","eliminar a necessidade de ler volumes"],0,"O enxaguamento com titulante reduz a alteração da sua concentração por água residual na bureta."]
];

const PHYSICS_CHEMISTRY_A_SELECTION_ITEMS=raw.map(([id,year,domain,competencyId,prompt,options,answerIndex,explanation],index)=>({
  id,year,domain,competencyId,prompt,options,answerIndex,explanation,
  responseType:"multiple-choice",gradingMode:"deterministic",sourceOrigin:"original",reviewStatus:"prototype",
  difficultyTarget:1+(index%3),maxPoints:10
}));

export const PHYSICS_CHEMISTRY_A_ITEMS=[
  ...PHYSICS_CHEMISTRY_A_SELECTION_ITEMS,
  ...PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.map(item=>({...item,sourceOrigin:"original",reviewStatus:"prototype"}))
];

export function physicsChemistryItemById(id){return PHYSICS_CHEMISTRY_A_ITEMS.find(item=>item.id===id)||null}
export function physicsChemistryDomainById(id){return PHYSICS_CHEMISTRY_A_DOMAINS.find(row=>row.id===id)||null}
