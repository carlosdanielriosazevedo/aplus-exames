export const FQA_ELEMENTS_10_DEEP_REVIEW_VERSION="2026.10-wave1";

export const FQA_ELEMENTS_10_DEEP_REVIEW={
  id:"q10-elements",
  title:"Elementos Químicos e sua organização",
  lead:"Neste domínio vais passar da estrutura do átomo para a organização periódica dos elementos. O objetivo é ligar número atómico, quantidade de matéria, energia eletrónica, configuração eletrónica e propriedades periódicas, percebendo o significado físico e químico de cada relação em vez de decorar regras isoladas.",
  goals:[
    "Relacionar constituição atómica, isótopos, massa atómica e escala microscópica.",
    "Usar mol, constante de Avogadro e massa molar para passar entre entidades, quantidade de matéria e massa.",
    "Interpretar fotões e espectros atómicos a partir de níveis de energia quantizados.",
    "Construir configurações eletrónicas até Z=23 e relacioná-las com a organização e periodicidade da Tabela Periódica.",
    "Articular os conceitos com trabalho experimental, incerteza de medição, teste de chama e densidade relativa de metais."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 10.º ano · março de 2026 · Elementos Químicos e sua organização",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"q10-atom-structure",
      kicker:"1 · MASSA E TAMANHO DOS ÁTOMOS",
      title:"Número atómico identifica o elemento; número de massa identifica o nuclídeo",
      paragraphs:[
        "Um átomo é constituído por um núcleo, onde se encontram protões e neutrões, e por eletrões distribuídos numa região muito maior em torno do núcleo. O número atómico Z é o número de protões e identifica o elemento químico. O número de massa A é a soma dos protões e neutrões do núcleo.",
        "Átomos do mesmo elemento têm o mesmo Z, mas podem ter números de neutrões diferentes: são isótopos. Num átomo neutro, o número de eletrões é igual a Z; num ião, o número de eletrões muda, mas Z não muda — caso contrário já seria outro elemento.",
        "À escala atómica é útil a unidade de massa atómica, u. A massa atómica relativa indicada na Tabela Periódica resulta da composição isotópica natural e não deve ser confundida automaticamente com um número de massa inteiro. As medições experimentais devem ainda respeitar resolução do instrumento, incerteza de leitura e algarismos significativos."
      ],
      formulas:[
        "Z = número de protões",
        "A = Z + N ⇒ N = A − Z",
        "átomo neutro: n(e⁻)=Z",
        "carga em unidades de e: q/e = Z − n(e⁻)"
      ],
      example:{
        title:"Exemplo resolvido · distinguir nuclídeo, átomo e ião",
        steps:[
          "Considera o nuclídeo ³⁷₁₇Cl. O número atómico é Z=17, portanto tem 17 protões.",
          "O número de neutrões é N=A−Z=37−17=20.",
          "Se for um átomo neutro, tem 17 eletrões.",
          "Se formar Cl⁻, ganha um eletrão e passa a ter 18 eletrões; o núcleo continua com Z=17 e N=20."
        ],
        result:"³⁷Cl tem 17 protões e 20 neutrões; Cl⁻ tem 18 eletrões sem deixar de ser cloro.",
        note:"A carga do ião altera o número de eletrões, nunca o número atómico."
      },
      remember:"Z identifica o elemento; A identifica um nuclídeo desse elemento; a carga informa sobre a diferença entre protões e eletrões.",
      pitfalls:[
        "Confundir número de massa A com massa atómica relativa da Tabela Periódica.",
        "Alterar Z ao formar um ião ou assumir que todos os isótopos têm o mesmo número de neutrões."
      ]
    },
    {
      id:"q10-amount-molar",
      kicker:"2 · QUANTIDADE DE MATÉRIA E MASSA MOLAR",
      title:"O mol liga o mundo microscópico às massas que conseguimos medir",
      paragraphs:[
        "A quantidade de matéria n mede quantas entidades elementares existem numa amostra. Uma mole contém exatamente a constante de Avogadro N_A de entidades; por isso, especificar a entidade — átomos, moléculas, iões ou outras — faz parte da resposta.",
        "A massa molar M é a massa de uma mole da substância e permite relacionar a massa medida no laboratório com a quantidade de matéria. Para uma substância pura, a relação n=m/M é uma das pontes fundamentais entre escala macroscópica e microscópica.",
        "Ao resolver problemas, controla sempre as unidades. Massa em gramas e massa molar em g mol⁻¹ produzem n em mol. Depois, N=nN_A converte essa quantidade no número de entidades. Resultados experimentais devem ser apresentados com precisão coerente com os dados."
      ],
      formulas:[
        "N_A = 6,02214076×10²³ mol⁻¹",
        "n = N/N_A ⇔ N = nN_A",
        "n = m/M ⇔ m = nM",
        "M = m/n"
      ],
      example:{
        title:"Exemplo resolvido · da massa ao número de moléculas",
        steps:[
          "Uma amostra contém 9,00 g de H₂O e considera-se M(H₂O)=18,0 g mol⁻¹.",
          "n=m/M=9,00/18,0=0,500 mol.",
          "N=nN_A=0,500×6,022×10²³≈3,01×10²³.",
          "Como se trata de água molecular, o resultado refere-se a moléculas de H₂O."
        ],
        result:"A amostra contém cerca de 3,01×10²³ moléculas de H₂O.",
        note:"Dizer apenas ‘entidades’ pode ser insuficiente; identifica o tipo de entidade contado."
      },
      remember:"m/M leva a mol; multiplicar por N_A leva de mol para número de entidades.",
      pitfalls:[
        "Multiplicar por massa molar quando o objetivo é obter quantidade de matéria a partir da massa.",
        "Usar N_A sem indicar se estás a contar átomos, moléculas, iões ou outra entidade."
      ]
    },
    {
      id:"q10-spectra",
      kicker:"3 · ENERGIA DOS ELETRÕES E ESPECTROS",
      title:"Uma risca espectral revela uma diferença de energia quantizada",
      paragraphs:[
        "A energia de um fotão é proporcional à frequência da radiação: E=hν. Como c=λν, maior frequência corresponde a menor comprimento de onda e a maior energia por fotão. Estas relações permitem ligar a zona do espectro eletromagnético à energia transportada pela radiação.",
        "Nos átomos, os eletrões só podem ocupar estados de energia permitidos. Quando um eletrão passa de um estado de maior energia para outro de menor energia, o átomo pode emitir um fotão cuja energia corresponde à diferença entre os dois níveis. Na absorção acontece o processo inverso.",
        "Como cada elemento tem uma estrutura eletrónica característica, os seus espectros de emissão e absorção funcionam como uma impressão digital. É por isso que a espectroscopia permite identificar elementos em estrelas, amostras forenses ou materiais desconhecidos. O teste de chama é uma aplicação experimental simples da emissão de radiação por átomos ou iões excitados."
      ],
      formulas:[
        "E_fotão = hν",
        "c = λν",
        "emissão: hν = E_i − E_f, com E_i>E_f",
        "absorção: E_f − E_i = hν, com E_f>E_i"
      ],
      example:{
        title:"Exemplo resolvido · energia de um fotão emitido",
        steps:[
          "Uma transição eletrónica liberta ΔE=3,03×10⁻¹⁹ J.",
          "Como hν=ΔE e h=6,626×10⁻³⁴ J s, ν=ΔE/h≈4,57×10¹⁴ Hz.",
          "Com c=3,00×10⁸ m s⁻¹, λ=c/ν≈6,56×10⁻⁷ m.",
          "Isto corresponde aproximadamente a 656 nm, na região visível."
        ],
        result:"ν≈4,57×10¹⁴ Hz e λ≈656 nm.",
        note:"Numa emissão, a energia do fotão é positiva mesmo que a variação de energia do átomo seja negativa."
      },
      remember:"As riscas espectrais existem porque as diferenças de energia eletrónica são quantizadas, não contínuas.",
      pitfalls:[
        "Afirmar que maior comprimento de onda significa maior energia do fotão.",
        "Confundir espectro de emissão com absorção ou tratar uma risca como uma energia arbitrária."
      ]
    },
    {
      id:"q10-electron-config",
      kicker:"4 · CONFIGURAÇÃO ELETRÓNICA",
      title:"A configuração eletrónica organiza eletrões por níveis, subníveis e orbitais",
      paragraphs:[
        "O modelo da nuvem eletrónica descreve regiões de probabilidade para encontrar eletrões. As orbitais s, p e d pertencem a subníveis de energia; orbitais do mesmo subnível são degeneradas quando têm a mesma energia nas condições consideradas.",
        "Para estabelecer configurações eletrónicas fundamentais de átomos até Z=23, usam-se o Princípio da Construção, o Princípio de Exclusão de Pauli e a maximização do número de eletrões desemparelhados em orbitais degeneradas. Cada orbital pode conter no máximo dois eletrões com estados de spin opostos.",
        "A configuração não é apenas uma contagem: ajuda a interpretar energias de remoção eletrónica, eletrões de valência e posição na Tabela Periódica. Uma quebra marcada numa sequência de energias de remoção pode revelar a passagem de eletrões de valência para um nível eletrónico mais interno."
      ],
      formulas:[
        "capacidade de um orbital = 2 eletrões",
        "subnível s: 1 orbital ⇒ até 2 e⁻",
        "subnível p: 3 orbitais ⇒ até 6 e⁻",
        "subnível d: 5 orbitais ⇒ até 10 e⁻",
        "ordem usada até Z=23: 1s, 2s, 2p, 3s, 3p, 4s, 3d"
      ],
      example:{
        title:"Exemplo resolvido · configuração do vanádio, Z=23",
        steps:[
          "Um átomo neutro de V tem 23 eletrões.",
          "Preenche-se 1s² 2s² 2p⁶ 3s² 3p⁶, totalizando 18 eletrões.",
          "Seguem-se 4s² e depois 3d³, perfazendo 23.",
          "Logo a configuração fundamental é 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d³."
        ],
        result:"V (Z=23): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d³.",
        note:"O limite Z=23 é o explicitamente indicado nas AE atuais para esta aprendizagem nuclear."
      },
      remember:"Construção define a ordem de ocupação; Pauli limita dois eletrões por orbital; em orbitais degeneradas, maximiza-se primeiro o número de desemparelhados.",
      pitfalls:[
        "Confundir subnível com orbital e atribuir apenas dois eletrões a todo um subnível p ou d.",
        "Emparelhar eletrões demasiado cedo em orbitais degeneradas ou ultrapassar o âmbito curricular ao exigir exceções fora de Z=23."
      ]
    },
    {
      id:"q10-periodicity",
      kicker:"5 · TABELA PERIÓDICA E PERIODICIDADE",
      title:"As tendências periódicas resultam da estrutura eletrónica, não de regras soltas",
      paragraphs:[
        "A Tabela Periódica organiza os elementos de forma coerente com as suas configurações eletrónicas. Elementos do mesmo grupo apresentam semelhanças na configuração de valência e, por isso, tendem a ter comportamentos químicos relacionados.",
        "Nos elementos representativos, ao longo de um período aumenta geralmente a carga nuclear efetiva sentida pelos eletrões de valência: o raio atómico tende a diminuir e a primeira energia de ionização tende, globalmente, a aumentar. Ao descer num grupo surgem níveis eletrónicos adicionais, pelo que o raio tende a aumentar e a energia de ionização tende a diminuir. São tendências globais, não regras sem exceções locais.",
        "A tendência para formar iões pode ser interpretada a partir da configuração eletrónica e da estabilidade relativa alcançada. A baixa reatividade dos gases nobres relaciona-se com a sua estrutura eletrónica de valência. Experimentalmente, a densidade relativa de metais pode ser determinada por picnometria, exigindo medição rigorosa, controlo do procedimento e comunicação da incerteza."
      ],
      formulas:[
        "ao longo de um período: Z_efetiva↑ ⇒ raio atómico tende a ↓",
        "ao longo de um período: energia de ionização tende a ↑",
        "ao descer um grupo: número de níveis ocupados↑ ⇒ raio atómico tende a ↑",
        "ião: q/e = Z − n(e⁻)"
      ],
      example:{
        title:"Exemplo resolvido · comparar Na e Cl no 3.º período",
        steps:[
          "Na e Cl pertencem ao mesmo período, mas Cl tem maior carga nuclear e maior carga nuclear efetiva sobre os eletrões de valência.",
          "Ao longo do 3.º período o raio atómico tende a diminuir, pelo que o Cl tem menor raio atómico do que o Na.",
          "A primeira energia de ionização tende globalmente a aumentar ao longo do período, pelo que é maior no Cl do que no Na.",
          "A comparação deve ser justificada pela estrutura eletrónica e atração núcleo-eletrões, não apenas pela posição gráfica na tabela."
        ],
        result:"No 3.º período, r(Na)>r(Cl) e, globalmente, EI₁(Na)<EI₁(Cl).",
        note:"As tendências periódicas admitem irregularidades; usa-as como tendências explicadas pela estrutura, não como leis absolutas."
      },
      remember:"Periodicidade é a consequência observável de padrões na configuração eletrónica e nas interações núcleo-eletrões.",
      pitfalls:[
        "Dizer que o raio aumenta ao longo de um período só porque Z aumenta.",
        "Memorizar setas de tendência sem conseguir relacioná-las com níveis eletrónicos, blindagem e atração nuclear."
      ]
    }
  ]
};

export function physicsChemistryElements10DeepReviewFor(domainId){
  return domainId==="q10-elements"?FQA_ELEMENTS_10_DEEP_REVIEW:null;
}
