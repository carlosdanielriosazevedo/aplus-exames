export const FQA_AQUEOUS_11_DEEP_REVIEW_VERSION="2026.10-wave7";

export const FQA_AQUEOUS_11_DEEP_REVIEW={
  id:"q11-aqueous",
  title:"Reações em sistemas aquosos",
  lead:"Em solução aquosa, muitas reações importantes podem ser lidas como transferência de protões, transferência de eletrões ou formação/dissolução de precipitados. Neste capítulo vais ligar ácido-base, pH, titulações, oxidação-redução, série eletroquímica, corrosão e equilíbrios de solubilidade, sempre com interpretação química, cálculo e trabalho experimental.",
  goals:[
    "Interpretar reações ácido-base segundo Brønsted e Lowry e identificar pares conjugados.",
    "Relacionar autoionização da água, Kw, pH, ácidos/bases fortes e equilíbrios de espécies fracas.",
    "Planear e interpretar titulações ácido-base, neutralização, ponto de equivalência e caráter de soluções de sais.",
    "Interpretar reações de oxidação-redução através de números de oxidação e semirreações.",
    "Usar uma série eletroquímica para comparar poder redutor, prever reações e compreender corrosão e proteção de metais.",
    "Interpretar solubilidade, Kps, precipitação, efeito do ião comum e aplicações no tratamento e caracterização da água."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 11.º ano · março de 2026 · Reações em sistemas aquosos",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"q11-acid-base",
      kicker:"1 · REAÇÕES ÁCIDO-BASE",
      title:"Brønsted e Lowry: ácido doa protões, base aceita protões",
      paragraphs:[
        "A interpretação dos fenómenos ácido-base evoluiu historicamente até ao modelo de Brønsted e Lowry. Neste modelo, um ácido é uma espécie que doa um protão H+ e uma base é uma espécie que aceita um protão. A reação ácido-base é, portanto, uma transferência de protão entre duas espécies químicas.",
        "Quando um ácido perde H+, origina a sua base conjugada; quando uma base recebe H+, origina o seu ácido conjugado. Os membros de um par conjugado diferem por um protão. Na reação HA+H₂O⇌A⁻+H₃O⁺, HA/A⁻ e H₃O⁺/H₂O são pares conjugados.",
        "A água é anfotérica: pode atuar como base perante um ácido ou como ácido perante uma base. Esta versatilidade ajuda a explicar a enorme diversidade de reações ácido-base em solução aquosa. A interpretação deve identificar quem doa e quem recebe o protão, evitando classificar espécies apenas pela presença visual de H ou OH na fórmula."
      ],
      formulas:[
        "ácido: HA ⇌ H⁺ + A⁻",
        "base: B + H⁺ ⇌ BH⁺",
        "HA + H₂O ⇌ A⁻ + H₃O⁺",
        "B + H₂O ⇌ BH⁺ + OH⁻"
      ],
      example:{
        title:"Exemplo resolvido · identificar pares conjugados",
        steps:[
          "Considera NH₃+H₂O⇌NH₄⁺+OH⁻.",
          "NH₃ recebe H+ e atua como base; NH₄⁺ é o seu ácido conjugado.",
          "H₂O doa H+ e atua como ácido; OH⁻ é a sua base conjugada.",
          "Os pares conjugados são NH₄⁺/NH₃ e H₂O/OH⁻."
        ],
        result:"NH₃ é base, H₂O é ácido; os pares conjugados são NH₄⁺/NH₃ e H₂O/OH⁻.",
        note:"Ácido e base conjugados diferem exatamente por um protão."
      },
      remember:"Numa reação de Brønsted-Lowry, segue o protão: quem o perde é ácido; quem o recebe é base.",
      pitfalls:[
        "Classificar uma espécie como ácido só porque contém hidrogénio na fórmula.",
        "Confundir par conjugado com as duas espécies que reagem diretamente entre si.",
        "Esquecer que a água pode comportar-se como ácido ou como base."
      ]
    },
    {
      id:"q11-ph",
      kicker:"2 · pH, ÁCIDOS E BASES FORTES E FRACOS",
      title:"O pH liga concentrações de H₃O⁺ ao equilíbrio ácido-base",
      paragraphs:[
        "A água sofre autoionização: 2H₂O⇌H₃O⁺+OH⁻. A uma dada temperatura, o produto iónico da água é Kw=[H₃O⁺][OH⁻]. A 25 °C, usa-se frequentemente Kw=1,0×10⁻¹⁴, mas é importante perceber que Kw depende da temperatura.",
        "O pH é definido por pH=−log[H₃O⁺] e permite trabalhar numa escala prática de acidez. Para ácidos fortes monopróticos, em situações simples, a ionização é considerada praticamente completa e [H₃O⁺] pode ser obtida da concentração analítica. Para bases fortes, determina-se [OH⁻] e usa-se Kw ou pOH para chegar ao pH.",
        "Ácidos e bases fracos ionizam apenas parcialmente. Para HA+H₂O⇌A⁻+H₃O⁺, Ka=[A⁻][H₃O⁺]/[HA]. O cálculo rigoroso parte da estequiometria e das concentrações de equilíbrio; não se deve tratar um ácido fraco como se estivesse totalmente ionizado. Relações análogas aplicam-se a bases fracas através de Kb."
      ],
      formulas:[
        "K_w = [H₃O⁺][OH⁻]",
        "a 25 °C: K_w = 1,0×10⁻¹⁴",
        "pH = −log[H₃O⁺]",
        "pOH = −log[OH⁻]",
        "a 25 °C: pH + pOH = 14,00",
        "K_a = [A⁻][H₃O⁺]/[HA]",
        "K_b = [BH⁺][OH⁻]/[B]"
      ],
      example:{
        title:"Exemplo resolvido · pH de uma solução de ácido forte",
        steps:[
          "Considera HCl 2,0×10⁻³ mol dm⁻³, admitindo dissociação completa.",
          "Sendo um ácido forte monoprótico, [H₃O⁺]≈2,0×10⁻³ mol dm⁻³.",
          "pH=−log(2,0×10⁻³)=2,70.",
          "O resultado é coerente com uma solução ácida, pois [H₃O⁺]>[OH⁻]."
        ],
        result:"pH≈2,70.",
        note:"A aproximação [H₃O⁺]≈c do ácido só é válida no modelo de ácido forte e nas condições consideradas."
      },
      remember:"Fortes: ionização praticamente completa no modelo escolar; fracos: equilíbrio e constante Ka ou Kb.",
      pitfalls:[
        "Aplicar diretamente pH=−log c a qualquer ácido, incluindo ácidos fracos.",
        "Assumir que Kw vale sempre 1,0×10⁻¹⁴ independentemente da temperatura.",
        "Confundir concentração inicial com concentração de equilíbrio num ácido fraco."
      ]
    },
    {
      id:"q11-titration",
      kicker:"3 · TITULAÇÕES ÁCIDO-BASE",
      title:"No ponto de equivalência, as quantidades reagiram segundo a estequiometria",
      paragraphs:[
        "Uma titulação ácido-base permite determinar a concentração de uma solução através da reação com uma solução padrão de concentração conhecida. O ponto de equivalência corresponde à condição estequiométrica em que titulante e analito reagiram nas proporções da equação química; não deve ser confundido com a simples igualdade de volumes nem, em todos os casos, com pH=7.",
        "O planeamento experimental exige escolher material volumétrico adequado, lavar corretamente a bureta e a pipeta, remover bolhas, ler o menisco ao nível dos olhos e aproximar-se do ponto final gota a gota. Um indicador deve mudar de cor numa zona compatível com a variação de pH próxima do ponto de equivalência.",
        "As reações ácido-base também permitem interpretar o caráter ácido, básico ou neutro de soluções de sais: os iões podem reagir com água conforme a força relativa dos seus ácidos e bases conjugados. O mesmo domínio ajuda a interpretar a acidez natural da chuva e a formação de chuva ácida, relacionando-a com óxidos atmosféricos e impactos ambientais."
      ],
      formulas:[
        "no equivalente: n(ácido)/ν_ácido = n(base)/ν_base",
        "n = cV",
        "para 1:1 no equivalente: c_aV_a = c_bV_b",
        "neutralização típica: H₃O⁺ + OH⁻ → 2H₂O"
      ],
      example:{
        title:"Exemplo resolvido · concentração por titulação 1:1",
        steps:[
          "Titula-se 25,00 mL de um ácido monoprótico com NaOH 0,1000 mol dm⁻³.",
          "O ponto de equivalência é atingido após 18,60 mL de NaOH.",
          "Como a estequiometria é 1:1, n(ácido)=n(OH⁻)=0,1000×0,01860=1,860×10⁻³ mol.",
          "c(ácido)=1,860×10⁻³/0,02500=0,0744 mol dm⁻³."
        ],
        result:"A concentração do ácido é 0,0744 mol dm⁻³.",
        note:"Usa volumes em dm³ quando trabalhas com concentração em mol dm⁻³."
      },
      remember:"Equivalência é uma relação estequiométrica de quantidades de matéria; ponto final é a observação experimental usada para o detetar.",
      pitfalls:[
        "Afirmar que no ponto de equivalência os volumes de ácido e base têm de ser iguais.",
        "Assumir que todo o ponto de equivalência ocorre a pH=7.",
        "Confundir ponto final do indicador com a definição química de ponto de equivalência."
      ]
    },
    {
      id:"q11-redox",
      kicker:"4 · REAÇÕES DE OXIDAÇÃO-REDUÇÃO",
      title:"Oxidar é perder eletrões; reduzir é ganhar eletrões",
      paragraphs:[
        "Numa reação de oxidação-redução ocorre transferência de eletrões. A espécie que perde eletrões é oxidada e atua como redutor; a espécie que ganha eletrões é reduzida e atua como oxidante. Os números de oxidação ajudam a identificar estas mudanças, sobretudo quando os eletrões não aparecem explicitamente na equação global.",
        "As semirreações separam os processos de oxidação e redução. Numa equação redox corretamente acertada, o número total de eletrões libertados na oxidação é igual ao número total de eletrões consumidos na redução. Esta conservação é um controlo importante da coerência do acerto.",
        "Ao interpretar uma reação, deve distinguir-se a espécie oxidada do agente oxidante: são conceitos opostos. A espécie oxidada é o redutor porque fornece eletrões; a espécie reduzida é o oxidante porque recebe eletrões."
      ],
      formulas:[
        "oxidação: Red → Ox + ne⁻",
        "redução: Ox + ne⁻ → Red",
        "eletrões perdidos = eletrões ganhos",
        "aumento do n.o. de oxidação → oxidação",
        "diminuição do n.o. de oxidação → redução"
      ],
      example:{
        title:"Exemplo resolvido · identificar oxidante e redutor",
        steps:[
          "Considera Zn(s)+Cu²⁺(aq)→Zn²⁺(aq)+Cu(s).",
          "Zn passa de n.o. 0 para +2: perde 2e⁻ e é oxidado.",
          "Cu²⁺ passa de +2 para 0: recebe 2e⁻ e é reduzido.",
          "Logo Zn é o redutor e Cu²⁺ é o oxidante."
        ],
        result:"Zn é oxidado e é o agente redutor; Cu²⁺ é reduzido e é o agente oxidante.",
        note:"O agente oxidante é a espécie que provoca a oxidação da outra e, por isso, ela própria se reduz."
      },
      remember:"Perde eletrões → oxida-se → é redutor. Ganha eletrões → reduz-se → é oxidante.",
      pitfalls:[
        "Chamar oxidante à espécie que foi oxidada.",
        "Usar números de oxidação sem verificar a conservação de carga e eletrões.",
        "Confundir carga iónica com número de oxidação em qualquer contexto."
      ]
    },
    {
      id:"q11-electrochem",
      kicker:"5 · SÉRIE ELETROQUÍMICA E CORROSÃO",
      title:"A série eletroquímica permite comparar poder redutor e prever reações",
      paragraphs:[
        "As AE propõem construir experimentalmente uma série eletroquímica a partir de reações entre metais e soluções contendo catiões de outros metais. Se um metal M reduz espontaneamente os iões Xⁿ⁺, então M revela maior poder redutor do que X nas condições consideradas.",
        "Uma série eletroquímica adequada permite prever se uma reação redox entre um metal e um ião metálico é espontânea no sentido proposto. A previsão deve ser acompanhada pelas semirreações e pela identificação de oxidante e redutor, não apenas por memorização de uma lista.",
        "A corrosão de metais é um processo redox com grande impacto tecnológico. A proteção pode envolver revestimentos, escolha de materiais, proteção catódica ou utilização de um metal de sacrifício mais facilmente oxidável. A estratégia deve impedir ou desviar o processo eletroquímico responsável pela degradação do metal estrutural."
      ],
      formulas:[
        "M(s) → Mⁿ⁺(aq) + ne⁻",
        "Xⁿ⁺(aq) + ne⁻ → X(s)",
        "redutor mais forte → oxida-se mais facilmente",
        "metal de sacrifício: oxida-se preferencialmente ao metal protegido"
      ],
      example:{
        title:"Exemplo resolvido · prever uma reação metal/ião",
        steps:[
          "Observa-se experimentalmente que Zn reage com Cu²⁺ formando Cu, mas Cu não reage com Zn²⁺.",
          "Isto mostra que Zn se oxida mais facilmente e tem maior poder redutor do que Cu.",
          "Assim, Zn(s)+Cu²⁺(aq)→Zn²⁺(aq)+Cu(s) é favorecida nas condições do ensaio.",
          "O resultado pode ser usado para ordenar Zn acima de Cu em poder redutor numa série construída experimentalmente."
        ],
        result:"Zn apresenta maior poder redutor do que Cu no sistema experimental considerado.",
        note:"A série deve ser construída ou usada de forma consistente com a convenção escolhida: poder redutor, facilidade de oxidação ou potenciais são ordenações relacionadas, mas não se leem todas no mesmo sentido."
      },
      remember:"Prever uma reação redox exige comparar tendências de oxidação e redução e confirmar quem fornece e quem recebe eletrões.",
      pitfalls:[
        "Ler uma série eletroquímica no sentido errado sem verificar a convenção usada.",
        "Afirmar que um metal de sacrifício protege por ser menos reativo; é precisamente por se oxidar mais facilmente.",
        "Ignorar a evidência experimental ao construir a ordem dos metais."
      ]
    },
    {
      id:"q11-solubility",
      kicker:"6 · SOLUÇÕES E SOLUBILIDADE",
      title:"A composição da água resulta de dissolução, equilíbrios e condições ambientais",
      paragraphs:[
        "Águas naturais e tratadas são soluções aquosas que contêm espécies dissolvidas provenientes de sais, gases e outros solutos. A dissolução de dióxido de carbono atmosférico contribui para a química das águas e para a sua acidez natural. A mineralização depende da origem geológica, do percurso da água e dos tratamentos aplicados.",
        "A solubilidade indica a quantidade máxima de soluto que pode dissolver-se em determinadas condições. Para muitos sólidos, a temperatura influencia fortemente a solubilidade, mas o efeito deve ser determinado para cada sistema em vez de assumir que todos os solutos se comportam da mesma forma.",
        "As AE exigem investigar experimentalmente o efeito da temperatura na solubilidade de um soluto sólido em água. Um bom desenho experimental controla massas, volumes, temperatura e estado de equilíbrio, repete medições e distingue dissolver mais depressa de ser efetivamente mais solúvel."
      ],
      formulas:[
        "concentração molar: c = n/V",
        "concentração mássica: c_m = m_soluto/V_solução",
        "solução saturada: equilíbrio com soluto não dissolvido nas condições consideradas",
        "solubilidade = quantidade máxima dissolvida por quantidade de solvente/solução, nas condições definidas"
      ],
      example:{
        title:"Exemplo resolvido · interpretar uma experiência de solubilidade",
        steps:[
          "Em dois ensaios usa-se a mesma massa de água, mas temperaturas diferentes.",
          "Adiciona-se gradualmente o mesmo sal até permanecer sólido não dissolvido após agitação suficiente.",
          "A massa total dissolvida antes da saturação é maior a 50 °C do que a 20 °C.",
          "Conclui-se, para esse sal e nesse intervalo, que a solubilidade aumenta com a temperatura."
        ],
        result:"Os dados experimentais suportam maior solubilidade do sal a 50 °C do que a 20 °C.",
        note:"Maior velocidade de dissolução não prova, por si só, maior solubilidade de equilíbrio."
      },
      remember:"Solubilidade é uma propriedade de equilíbrio dependente das condições; rapidez de dissolução é uma questão cinética.",
      pitfalls:[
        "Confundir dissolução mais rápida com maior solubilidade.",
        "Generalizar que a solubilidade de qualquer sólido aumenta sempre com a temperatura.",
        "Comparar ensaios em que massa de água, temperatura e tempo de equilíbrio não foram controlados."
      ]
    },
    {
      id:"q11-ksp",
      kicker:"7 · Kps, PRECIPITAÇÃO E EFEITO DO IÃO COMUM",
      title:"Kps permite ligar equilíbrio de solubilidade à formação de precipitados",
      paragraphs:[
        "Num sal pouco solúvel, estabelece-se equilíbrio entre o sólido e os seus iões em solução. Para AgCl(s)⇌Ag⁺(aq)+Cl⁻(aq), Kps=[Ag⁺][Cl⁻]. O valor de Kps caracteriza o equilíbrio a uma dada temperatura e permite relacionar solubilidade com concentrações iónicas de equilíbrio.",
        "Para prever precipitação compara-se o produto iónico Qps com Kps. Se Qps<Kps, a solução está insaturada relativamente ao sal; se Qps=Kps, está em equilíbrio de saturação; se Qps>Kps, existe tendência para precipitar até o produto iónico regressar ao valor de equilíbrio, nas condições do modelo.",
        "O efeito do ião comum pode ser interpretado por Le Châtelier: adicionar um ião já presente no equilíbrio tende a diminuir a solubilidade do sal. Estes princípios ajudam a compreender dureza da água e processos de remoção de poluentes por precipitação seletiva, bem como a escolher condições que favoreçam ou evitem a formação de precipitados."
      ],
      formulas:[
        "AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)",
        "K_ps(AgCl) = [Ag⁺][Cl⁻]",
        "Q_ps<K_ps → não precipita por saturação",
        "Q_ps=K_ps → solução saturada em equilíbrio",
        "Q_ps>K_ps → tendência para precipitação",
        "ião comum → deslocamento que tende a reduzir a solubilidade"
      ],
      example:{
        title:"Exemplo resolvido · prever precipitação com Qps",
        steps:[
          "Para AgCl, considera Kps=1,8×10⁻¹⁰ e uma mistura final com [Ag⁺]=2,0×10⁻⁵ mol dm⁻³ e [Cl⁻]=3,0×10⁻⁵ mol dm⁻³.",
          "Calcula Qps=[Ag⁺][Cl⁻]=(2,0×10⁻⁵)(3,0×10⁻⁵)=6,0×10⁻¹⁰.",
          "Como Qps>Kps, a composição contém produto iónico superior ao permitido no equilíbrio de saturação.",
          "Há tendência para formação de AgCl(s) até se restabelecer a condição de equilíbrio."
        ],
        result:"Qps=6,0×10⁻¹⁰>Kps; prevê-se precipitação de AgCl.",
        note:"Usa as concentrações após mistura/diluição quando calculas Qps; não uses automaticamente as concentrações das soluções antes de serem misturadas."
      },
      remember:"Kps é a referência de equilíbrio; Qps descreve a composição atual e permite prever se haverá precipitação.",
      pitfalls:[
        "Comparar Kps diretamente com concentrações individuais em vez de calcular o produto iónico correto.",
        "Usar concentrações antes da mistura sem corrigir a diluição.",
        "Dizer que adicionar um ião comum aumenta sempre a solubilidade do sal correspondente.",
        "Confundir solução saturada com solução que necessariamente contém grande concentração absoluta de soluto."
      ]
    }
  ]
};

export function physicsChemistryAqueous11DeepReviewFor(domainId){
  return domainId==="q11-aqueous"?FQA_AQUEOUS_11_DEEP_REVIEW:null;
}
