export const FQA_MATTER_10_DEEP_REVIEW_VERSION="2026.10-wave2";

export const FQA_MATTER_10_DEEP_REVIEW={
  id:"q10-matter",
  title:"Propriedades e Transformações da Matéria",
  lead:"Neste domínio vais ligar a forma como os átomos se unem às propriedades dos materiais e às transformações químicas que observamos. A sequência é intencional: ligação química, estrutura molecular, compostos de carbono, interações intermoleculares, gases e soluções, energia das reações e fotoquímica.",
  goals:[
    "Explicar a formação e quebra de ligações a partir de forças, estabilidade e energia.",
    "Construir estruturas de Lewis e relacionar geometria molecular com polaridade.",
    "Reconhecer hidrocarbonetos e grupos funcionais relevantes em moléculas orgânicas.",
    "Relacionar interações intermoleculares com propriedades macroscópicas e sistemas biológicos.",
    "Resolver problemas de gases e soluções, incluindo preparação e diluição, com unidades coerentes.",
    "Interpretar entalpia, processos exo/endotérmicos, fotoquímica e os papéis do ozono."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 10.º ano · março de 2026 · Propriedades e Transformações da Matéria",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"q10-bonding",
      kicker:"1 · LIGAÇÃO QUÍMICA",
      title:"Uma ligação resulta do equilíbrio entre atrações e repulsões",
      paragraphs:[
        "Quando dois átomos se aproximam, entram em jogo atrações entre núcleos e eletrões e repulsões entre cargas do mesmo sinal. Uma ligação estável corresponde a uma distância internuclear para a qual a energia do sistema é mínima; afastar ou aproximar demasiado os núcleos aumenta a energia.",
        "Formar uma ligação a partir de átomos separados conduz a um estado de menor energia e, por isso, há libertação de energia para o exterior. Quebrar essa ligação exige fornecer energia ao sistema. É esta leitura que permite interpretar corretamente gráficos de energia potencial em função da distância internuclear.",
        "As ligações covalente, iónica e metálica representam formas diferentes de organização dos eletrões e das partículas. Na covalente há partilha de pares eletrónicos; na iónica predominam atrações eletrostáticas entre iões de sinais opostos; na metálica os eletrões de valência estão deslocalizados numa rede de catiões metálicos."
      ],
      formulas:[
        "formação de ligação: ΔE_sistema = E_final−E_inicial < 0",
        "quebra de ligação: ΔE_sistema > 0",
        "energia de ligação = energia necessária para quebrar uma mole dessas ligações no estado gasoso",
        "distância de equilíbrio: energia potencial do par de átomos é mínima"
      ],
      example:{
        title:"Exemplo resolvido · ler um gráfico energia–distância",
        steps:[
          "Num gráfico E_p(r), a curva desce quando dois átomos inicialmente afastados se aproximam.",
          "O mínimo ocorre em r=r₀; essa distância corresponde ao comprimento de ligação de equilíbrio.",
          "Para separar novamente os átomos até uma distância muito grande é necessário fornecer energia igual à profundidade do poço energético, nas condições do modelo.",
          "A formação da ligação faz o percurso inverso e liberta energia."
        ],
        result:"O mínimo do gráfico identifica a distância de ligação estável e a profundidade energética relaciona-se com a energia necessária para a quebrar.",
        note:"Não confundas ‘energia da ligação’ com ‘energia do sistema no mínimo’: a primeira é uma energia necessária à dissociação."
      },
      remember:"Uma ligação estável não aparece porque todas as forças desaparecem, mas porque o sistema atinge uma configuração de energia mínima.",
      pitfalls:[
        "Dizer que quebrar uma ligação liberta energia; quebrar ligações exige fornecimento de energia.",
        "Interpretar qualquer aproximação entre átomos como estabilização, ignorando a forte repulsão a distâncias demasiado pequenas."
      ]
    },
    {
      id:"q10-geometry-polarity",
      kicker:"2 · LEWIS, GEOMETRIA E POLARIDADE",
      title:"A distribuição dos eletrões de valência condiciona forma e polaridade",
      paragraphs:[
        "As estruturas de Lewis representam eletrões de valência e pares ligantes ou não ligantes. No conjunto de moléculas estudadas, a regra do octeto ajuda a organizar estruturas com ligações simples, duplas ou triplas, mas deve ser usada como modelo e não como desenho decorativo.",
        "A geometria molecular resulta da repulsão entre regiões eletrónicas de valência em torno do átomo central. Pares não ligantes ocupam espaço e podem alterar os ângulos e a forma molecular; por isso, contar apenas as ligações visíveis pode levar a uma geometria errada.",
        "A polaridade molecular depende simultaneamente da polaridade das ligações e da geometria. Uma molécula pode ter ligações polares e ser globalmente apolar se os vetores momento dipolar se compensarem, como acontece no CO₂ linear."
      ],
      formulas:[
        "eletrões de valência disponíveis = soma dos eletrões de valência dos átomos, ajustada à carga",
        "ligação simples/dupla/tripla corresponde à partilha de 1/2/3 pares de eletrões",
        "momento dipolar molecular: μ⃗_mol = soma vetorial dos μ⃗ das ligações",
        "ligações mais fortes entre os mesmos átomos tendem a ser mais curtas e a exigir mais energia para quebrar"
      ],
      example:{
        title:"Exemplo resolvido · porque CO₂ é apolar e H₂O é polar",
        steps:[
          "No CO₂, o carbono central forma duas ligações duplas C=O e não tem pares não ligantes; as duas regiões ligantes conduzem a uma geometria linear.",
          "Cada ligação C=O é polar, mas os dois dipolos têm igual intensidade e sentidos opostos: a soma vetorial é zero.",
          "Na H₂O, o oxigénio tem dois pares ligantes e dois pares não ligantes; a geometria molecular é angular.",
          "Os dipolos O–H não se anulam na geometria angular, logo a molécula é polar."
        ],
        result:"CO₂ é globalmente apolar apesar das ligações polares; H₂O é polar por causa da sua geometria angular.",
        note:"‘Tem ligações polares’ não é suficiente para concluir que a molécula é polar."
      },
      remember:"Primeiro constrói a estrutura eletrónica, depois determina a geometria e só no fim avalia a polaridade global.",
      pitfalls:[
        "Concluir a polaridade molecular apenas pela diferença de eletronegatividade de uma ligação.",
        "Ignorar pares não ligantes ao prever a geometria molecular."
      ]
    },
    {
      id:"q10-carbon",
      kicker:"3 · COMPOSTOS DE CARBONO",
      title:"A versatilidade do carbono nasce da variedade de ligações e estruturas",
      paragraphs:[
        "O carbono pode estabelecer várias ligações covalentes e formar cadeias, ramificações e estruturas com ligações simples, duplas ou triplas. Esta versatilidade explica a enorme diversidade de moléculas orgânicas em combustíveis, materiais, biomoléculas e fármacos.",
        "Nos hidrocarbonetos, compostos formados apenas por carbono e hidrogénio, uma estrutura saturada apresenta apenas ligações simples C–C; estruturas insaturadas contêm pelo menos uma ligação dupla ou tripla entre carbonos. A fórmula deve ser lida em conjunto com a estrutura e não apenas memorizada.",
        "Os grupos funcionais ajudam a reconhecer famílias com comportamentos químicos relacionados. No âmbito das AE de 10.º ano importa identificar álcoois, aldeídos, cetonas, ácidos carboxílicos e aminas a partir das fórmulas de estrutura."
      ],
      formulas:[
        "alcano acíclico saturado: CₙH₂ₙ₊₂",
        "alceno acíclico com uma dupla ligação: CₙH₂ₙ",
        "alcino acíclico com uma tripla ligação: CₙH₂ₙ₋₂",
        "grupo carboxilo: −COOH; grupo hidroxilo de álcool: −OH; grupo amino: −NH₂"
      ],
      example:{
        title:"Exemplo resolvido · reconhecer saturação e grupo funcional",
        steps:[
          "A molécula CH₃–CH₂–OH tem apenas ligações simples entre os carbonos e apresenta o grupo −OH ligado a carbono saturado.",
          "Classifica-se como um álcool; trata-se do etanol.",
          "Já CH₃–COOH contém o grupo −COOH e pertence aos ácidos carboxílicos.",
          "A presença de oxigénio não basta para identificar a família: é a organização dos átomos no grupo funcional que decide."
        ],
        result:"CH₃CH₂OH é um álcool e CH₃COOH é um ácido carboxílico.",
        note:"Reconhece o grupo funcional na fórmula de estrutura antes de tentares nomear a família."
      },
      remember:"Em química orgânica, a conectividade e o grupo funcional são informação química, não apenas a fórmula molecular global.",
      pitfalls:[
        "Chamar insaturado a um composto apenas porque tem poucos hidrogénios sem observar a estrutura.",
        "Confundir aldeído e cetona ou álcool e ácido carboxílico por procurar apenas a presença de oxigénio."
      ]
    },
    {
      id:"q10-intermolecular",
      kicker:"4 · INTERAÇÕES INTERMOLECULARES",
      title:"As forças entre moléculas ajudam a explicar propriedades da matéria",
      paragraphs:[
        "As interações intermoleculares atuam entre partículas moleculares e não devem ser confundidas com as ligações covalentes que mantêm os átomos unidos dentro de cada molécula. Entre elas encontram-se interações de Van der Waals, cuja intensidade depende da natureza e distribuição eletrónica das moléculas.",
        "As ligações de hidrogénio constituem uma interação intermolecular particularmente importante quando um átomo de hidrogénio ligado a N, O ou F interage com uma região eletronegativa adequada de outra molécula. Na água, estas interações influenciam propriedades como a temperatura de ebulição e a organização no estado líquido e sólido.",
        "A intensidade das interações intermoleculares ajuda a interpretar propriedades macroscópicas como volatilidade, temperaturas de mudança de estado e solubilidade. Em sistemas biológicos, estas interações contribuem para a organização de proteínas, ácidos nucleicos e outras estruturas."
      ],
      formulas:[
        "maior intensidade intermolecular ⇒ maior energia necessária, em geral, para separar moléculas",
        "interações mais intensas ⇒ tendência para menor volatilidade, comparando substâncias semelhantes",
        "ligação de hidrogénio: H ligado a N/O/F interage com região eletronegativa adequada",
        "ligação intramolecular ≠ interação intermolecular"
      ],
      example:{
        title:"Exemplo resolvido · comparar H₂O e H₂S",
        steps:[
          "H₂O e H₂S são moléculas pequenas e ambas apresentam interações intermoleculares.",
          "Na água podem formar-se redes extensas de ligações de hidrogénio porque o H está ligado ao oxigénio.",
          "Em H₂S não se estabelece o mesmo tipo de ligação de hidrogénio intensa nas condições usuais.",
          "A maior intensidade das interações na água ajuda a explicar a sua temperatura de ebulição anormalmente elevada face a H₂S."
        ],
        result:"A água apresenta interações intermoleculares globalmente mais fortes, o que contribui para uma temperatura de ebulição mais elevada.",
        note:"Não se ‘quebram ligações O–H’ quando a água ferve; vencem-se sobretudo interações entre moléculas."
      },
      remember:"Mudanças de estado moleculares vencem interações entre moléculas; uma reação química pode envolver quebra e formação de ligações dentro das partículas.",
      pitfalls:[
        "Dizer que a ebulição da água quebra as ligações covalentes O–H.",
        "Usar ‘ligação de hidrogénio’ para qualquer interação entre moléculas que contenham hidrogénio."
      ]
    },
    {
      id:"q10-gases-solutions",
      kicker:"5 · GASES, SOLUÇÕES E DISPERSÕES",
      title:"Composição e concentração exigem grandezas bem definidas",
      paragraphs:[
        "A Lei de Avogadro permite compreender o volume molar: à mesma pressão e temperatura, volumes iguais de gases ideais contêm a mesma quantidade de matéria. Assim, para um gás ideal, o volume molar depende de P e T e não da identidade química particular do gás.",
        "Nos problemas de misturas gasosas e soluções, é essencial distinguir fração molar, massa volúmica e concentração. A relação adequada depende da informação pedida: quantidade relativa de cada componente, massa por volume ou quantidade de soluto por volume de solução não são a mesma grandeza.",
        "Preparar uma solução a partir de um sólido exige pesar o soluto e completar até ao volume final em material volumétrico apropriado. Numa diluição transfere-se uma porção conhecida da solução inicial e adiciona-se solvente; a quantidade de soluto transferida conserva-se. As AE ligam ainda este bloco à composição da troposfera, poluentes e gases com efeito de estufa."
      ],
      formulas:[
        "V_m = V/n",
        "fração molar: x_i=n_i/n_total e Σx_i=1",
        "massa volúmica: ρ=m/V",
        "concentração molar: c=n_soluto/V_solução",
        "diluição do mesmo soluto: c_iV_i=c_fV_f"
      ],
      example:{
        title:"Exemplo resolvido · preparar por diluição",
        steps:[
          "Pretende-se preparar 250,0 mL de solução 0,100 mol dm⁻³ a partir de uma solução 0,500 mol dm⁻³ do mesmo soluto.",
          "Pela conservação da quantidade de soluto transferida: c_iV_i=c_fV_f.",
          "V_i=(0,100×250,0)/0,500=50,0 mL.",
          "Medem-se 50,0 mL da solução inicial e completa-se cuidadosamente o volume até 250,0 mL com solvente."
        ],
        result:"É necessário transferir 50,0 mL da solução inicial e diluir até 250,0 mL.",
        note:"Adicionar 200 mL de água não é rigorosamente equivalente a completar o volume final até 250 mL."
      },
      remember:"Antes da fórmula, identifica se estás a trabalhar com uma composição relativa, uma massa por volume ou uma quantidade de soluto por volume.",
      pitfalls:[
        "Usar um valor de volume molar sem indicar ou respeitar as condições de pressão e temperatura.",
        "Confundir volume de solvente adicionado com volume final da solução numa diluição."
      ]
    },
    {
      id:"q10-enthalpy",
      kicker:"6 · TRANSFORMAÇÕES QUÍMICAS E ENTALPIA",
      title:"Reações envolvem quebra e formação de ligações e uma variação global de energia",
      paragraphs:[
        "Numa reação química algumas ligações dos reagentes são quebradas e novas ligações são formadas nos produtos. Quebrar ligações requer energia; formar ligações liberta energia. O balanço entre estas contribuições ajuda a compreender o sinal energético da transformação.",
        "A variação de entalpia da reação é ΔH=H_produtos−H_reagentes. Num processo exotérmico ΔH<0 e o sistema transfere energia para o exterior; num processo endotérmico ΔH>0 e o sistema recebe energia. A pressão constante, ΔH corresponde ao calor trocado pelo sistema com o exterior.",
        "Energias médias de ligação permitem estimar ΔH: somam-se as energias necessárias para quebrar ligações nos reagentes e subtraem-se as energias libertadas na formação das ligações dos produtos. Trata-se de uma estimativa baseada nos valores médios utilizados."
      ],
      formulas:[
        "ΔH = H_produtos − H_reagentes",
        "a pressão constante: q_p = ΔH",
        "exotérmica: ΔH<0; endotérmica: ΔH>0",
        "ΔH≈ΣE(ligações quebradas)−ΣE(ligações formadas)"
      ],
      example:{
        title:"Exemplo resolvido · estimar ΔH por energias de ligação",
        steps:[
          "Numa reação hipotética é necessário fornecer 500 kJ mol⁻¹ para quebrar as ligações relevantes dos reagentes.",
          "A formação das novas ligações nos produtos liberta 650 kJ mol⁻¹.",
          "ΔH≈500−650=−150 kJ mol⁻¹.",
          "O sinal negativo indica que, no balanço global, a reação é exotérmica."
        ],
        result:"ΔH≈−150 kJ mol⁻¹; a transformação é exotérmica.",
        note:"Não confundas energia absorvida na quebra de ligações com ΔH da reação inteira."
      },
      remember:"O sinal de ΔH pertence ao balanço global da reação, não a uma única ligação quebrada ou formada.",
      pitfalls:[
        "Dizer que uma reação é exotérmica porque envolve quebra de ligações; quebrar ligações consome energia.",
        "Trocar a ordem produtos−reagentes ou interpretar ΔH<0 como energia absorvida pelo sistema."
      ]
    },
    {
      id:"q10-photochemistry",
      kicker:"7 · FOTOQUÍMICA E OZONO",
      title:"A luz pode fornecer a energia que inicia uma transformação química",
      paragraphs:[
        "Numa reação fotoquímica, a absorção de radiação pode fornecer energia suficiente para iniciar uma transformação. A energia de cada fotão depende da frequência, por isso diferentes regiões do espectro podem produzir efeitos químicos diferentes.",
        "As AE propõem investigar experimentalmente o efeito da luz sobre cloreto de prata. O escurecimento observado está associado à fotodecomposição e deve ser analisado com controlo de condições, comparação entre amostras e comunicação do procedimento e dos resultados.",
        "O ozono tem papéis distintos consoante a região atmosférica. Na estratosfera absorve radiação ultravioleta prejudicial; na troposfera é um poluente. A formação e decomposição de O₃ envolvem processos fotoquímicos e espécies reativas, pelo que o mesmo composto não deve ser classificado simplesmente como ‘bom’ ou ‘mau’ sem indicar o contexto."
      ],
      formulas:[
        "energia do fotão: E=hν",
        "c=λν ⇒ maior ν corresponde a menor λ",
        "O₂ + hν → 2 O· (radicais, para radiação suficientemente energética)",
        "O· + O₂ → O₃",
        "O₃ + hν → O₂ + O·"
      ],
      example:{
        title:"Exemplo resolvido · interpretar uma experiência com AgCl",
        steps:[
          "Preparam-se duas amostras comparáveis de AgCl; uma fica exposta à luz e outra protegida da luz.",
          "Mantêm-se, tanto quanto possível, iguais as restantes condições para isolar o efeito da radiação.",
          "Se a amostra iluminada escurecer mais rapidamente, a observação é evidência de que a luz favorece a transformação fotoquímica nas condições da experiência.",
          "A conclusão deve referir a comparação experimental e não afirmar apenas que ‘a luz aqueceu a amostra’."
        ],
        result:"A comparação entre amostra iluminada e controlo permite atribuir à radiação um papel na transformação observada.",
        note:"Uma experiência convincente exige variável independente clara, controlo e evidência observável."
      },
      remember:"O efeito químico da radiação depende da energia dos fotões e do sistema; no caso do ozono, o contexto atmosférico muda a consequência ambiental.",
      pitfalls:[
        "Confundir reação fotoquímica com simples aquecimento provocado por luz.",
        "Dizer que o ozono é sempre benéfico ou sempre prejudicial sem distinguir estratosfera de troposfera."
      ]
    }
  ]
};

export function physicsChemistryMatter10DeepReviewFor(domainId){
  return domainId==="q10-matter"?FQA_MATTER_10_DEEP_REVIEW:null;
}
