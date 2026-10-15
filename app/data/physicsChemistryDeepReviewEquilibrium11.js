export const FQA_EQUILIBRIUM_11_DEEP_REVIEW_VERSION="2026.10-wave6";

export const FQA_EQUILIBRIUM_11_DEEP_REVIEW={
  id:"q11-equilibrium",
  title:"Equilíbrio Químico",
  lead:"O equilíbrio químico junta duas ideias que aparecem muitas vezes no exame: primeiro, saber quantificar corretamente uma reação; depois, perceber até onde essa reação evolui e como responde a perturbações. Aqui vais ligar estequiometria, rendimento, equilíbrio dinâmico, constante e quociente da reação, Princípio de Le Châtelier e decisões industriais.",
  goals:[
    "Interpretar equações químicas em termos de quantidade de matéria e resolver relações estequiométricas.",
    "Identificar o reagente limitante e calcular rendimento teórico, rendimento real e rendimento percentual.",
    "Reconhecer um equilíbrio químico dinâmico e interpretar a sua evolução através de gráficos e composição do sistema.",
    "Escrever e interpretar expressões de constante de equilíbrio e usar o quociente da reação para prever o sentido de evolução.",
    "Aplicar o Princípio de Le Châtelier a perturbações de concentração, pressão e temperatura, incluindo contexto experimental.",
    "Avaliar processos químicos segundo princípios de química verde e justificar compromissos industriais, nomeadamente na síntese do amoníaco."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 11.º ano · março de 2026 · Equilíbrio Químico",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"q11-stoichiometry",
      kicker:"1 · ASPETOS QUANTITATIVOS DAS REAÇÕES",
      title:"Uma equação química acertada é uma relação entre quantidades de matéria",
      paragraphs:[
        "Os coeficientes estequiométricos de uma equação química acertada indicam proporções entre quantidades de matéria. Na reação aA+bB→cC+dD, a razão n(A)/a deve ser comparada com n(B)/b; os coeficientes não representam massas nem volumes universais, mas relações em mol entre as espécies que reagem de acordo com a equação.",
        "Para passar de dados experimentais à estequiometria é frequente converter massa em quantidade de matéria por n=m/M, ou usar a concentração molar c=n/V quando a espécie está em solução. A sequência mais segura é: converter os dados para mol, aplicar a razão estequiométrica e só depois converter a quantidade pedida para a unidade final.",
        "A conservação dos átomos obriga a acertar a equação antes de qualquer cálculo. Uma resposta numericamente plausível pode estar errada se usar uma razão de coeficientes incorreta. Também é essencial manter unidades coerentes, distinguir volume de solução de volume de solvente e identificar claramente qual a espécie a que cada quantidade se refere."
      ],
      formulas:[
        "n = m/M",
        "c = n/V",
        "razão estequiométrica: n_i/ν_i",
        "para aA+bB→cC: n(C)=n(A)·c/a"
      ],
      example:{
        title:"Exemplo resolvido · quantidade de amoníaco a partir de hidrogénio",
        steps:[
          "Na reação N₂(g)+3H₂(g)⇌2NH₃(g), considera 6,0 mol de H₂ e excesso de N₂.",
          "A proporção estequiométrica é 3 mol H₂ para 2 mol NH₃.",
          "Logo n(NH₃)=6,0×2/3=4,0 mol, se a conversão fosse completa.",
          "Este valor é a quantidade estequiométrica máxima associada aos 6,0 mol de H₂; num sistema em equilíbrio a quantidade efetivamente obtida pode ser inferior."
        ],
        result:"A estequiometria permite formar, no máximo, 4,0 mol de NH₃ a partir de 6,0 mol de H₂ quando N₂ está em excesso.",
        note:"A estequiometria diz quanto seria consumido ou formado pela extensão considerada; não garante que uma reação reversível vá até conversão total."
      },
      remember:"Primeiro mol, depois proporção estequiométrica, só no fim a unidade pedida.",
      pitfalls:[
        "Usar diretamente razões de massas como se fossem razões dos coeficientes estequiométricos.",
        "Fazer cálculos antes de acertar a equação química.",
        "Confundir a quantidade estequiométrica máxima com a quantidade realmente obtida num processo reversível ou com rendimento inferior a 100%."
      ]
    },
    {
      id:"q11-limiting-yield",
      kicker:"2 · REAGENTE LIMITANTE E RENDIMENTO",
      title:"O reagente limitante fixa a quantidade máxima de produto",
      paragraphs:[
        "Quando existem quantidades finitas de mais do que um reagente, o reagente limitante é aquele que se esgota primeiro segundo a proporção estequiométrica. Uma forma robusta de o identificar é calcular n/ν para cada reagente: o menor valor determina a extensão máxima da reação e, portanto, a quantidade teórica máxima de produto.",
        "O rendimento percentual compara a quantidade de produto efetivamente obtida com a quantidade teórica prevista pela estequiometria. Um rendimento inferior a 100% pode resultar de reação incompleta, reações secundárias, perdas em transferências, purificação ou limitações experimentais. O rendimento não deve ser confundido com pureza nem com economia atómica.",
        "As AE exigem determinar experimentalmente o rendimento na síntese de um composto. Uma análise de qualidade não termina no cálculo: deve avaliar o procedimento, identificar fontes de perda ou contaminação, discutir a incerteza das medições e propor melhorias que aumentem a fiabilidade sem manipular seletivamente os resultados."
      ],
      formulas:[
        "reagente limitante: menor valor de n/ν",
        "rendimento (%) = quantidade_real/quantidade_teórica × 100",
        "m_teórica = n_teórica·M",
        "excesso remanescente = quantidade_inicial − quantidade_consumida"
      ],
      example:{
        title:"Exemplo resolvido · identificar o limitante e calcular rendimento",
        steps:[
          "Para 2H₂+O₂→2H₂O, misturam-se 3,0 mol de H₂ com 2,0 mol de O₂.",
          "Compara n/ν: H₂ dá 3,0/2=1,5 e O₂ dá 2,0/1=2,0; H₂ é o reagente limitante.",
          "A razão 2H₂:2H₂O mostra que a quantidade teórica de H₂O é 3,0 mol.",
          "Se forem obtidos 2,55 mol de H₂O, rendimento=2,55/3,0×100=85%."
        ],
        result:"H₂ é o reagente limitante e o rendimento do processo é 85%.",
        note:"O excesso de O₂ não aumenta a quantidade teórica de produto depois de o H₂ se esgotar."
      },
      remember:"O limitante define o teto teórico; o rendimento mede quanto desse teto foi realmente atingido.",
      pitfalls:[
        "Escolher como limitante o reagente com menos mol sem dividir pelo respetivo coeficiente estequiométrico.",
        "Calcular rendimento usando uma quantidade teórica obtida a partir do reagente em excesso.",
        "Interpretar um rendimento experimental superior a 100% como uma reação extraordinariamente eficiente, em vez de investigar água, impurezas ou erro experimental."
      ]
    },
    {
      id:"q11-equilibrium-state",
      kicker:"3 · ESTADO DE EQUILÍBRIO",
      title:"No equilíbrio, as reações direta e inversa continuam a ocorrer",
      paragraphs:[
        "Num sistema fechado em que uma reação é reversível, pode atingir-se equilíbrio químico. O equilíbrio é dinâmico: a velocidade da reação direta torna-se igual à velocidade da reação inversa. Isso não significa que as reações parem nem que as quantidades de reagentes e produtos sejam necessariamente iguais.",
        "Quando o equilíbrio se estabelece, as propriedades macroscópicas relevantes permanecem constantes ao longo do tempo nas condições fixadas. Num gráfico concentração-tempo, as concentrações deixam de variar macroscopicamente; num gráfico velocidade-tempo, as velocidades direta e inversa convergem para o mesmo valor não nulo.",
        "A posição de equilíbrio descreve a composição relativa do sistema em equilíbrio. Uma reação pode ter equilíbrio muito deslocado para os produtos ou para os reagentes. A extensão da reação não deve ser confundida com rapidez: uma reação pode atingir uma composição muito favorável aos produtos e, sem catalisador, fazê-lo lentamente."
      ],
      formulas:[
        "no equilíbrio: v_direta = v_inversa",
        "equilíbrio ≠ concentrações iguais",
        "equilíbrio dinâmico: composição macroscópica constante",
        "sistema fechado + condições fixadas → equilíbrio possível"
      ],
      example:{
        title:"Exemplo resolvido · interpretar um gráfico concentração-tempo",
        steps:[
          "Num sistema fechado, [A] diminui e [B] aumenta até ambas estabilizarem após 40 s.",
          "A estabilização simultânea é compatível com o estabelecimento de equilíbrio químico.",
          "Não se conclui que [A]=[B]; apenas que as concentrações deixam de variar macroscopicamente.",
          "Microscopicamente, as reações direta e inversa continuam, com velocidades iguais."
        ],
        result:"Após cerca de 40 s, o sistema apresenta características de equilíbrio dinâmico.",
        note:"Uma linha horizontal num gráfico de concentração não significa ausência de reação microscópica."
      },
      remember:"Equilíbrio químico é igualdade de velocidades direta e inversa, não igualdade de concentrações.",
      pitfalls:[
        "Dizer que a reação termina quando o equilíbrio é atingido.",
        "Afirmar que reagentes e produtos têm de ficar com a mesma concentração.",
        "Confundir posição de equilíbrio com velocidade de estabelecimento do equilíbrio."
      ]
    },
    {
      id:"q11-kq",
      kicker:"4 · CONSTANTE E QUOCIENTE DA REAÇÃO",
      title:"K descreve a posição de equilíbrio; Q diz onde o sistema está agora",
      paragraphs:[
        "Para uma reação homogénea aA+bB⇌cC+dD, a expressão de Kc, no modelo de concentrações usado no ensino secundário, tem as concentrações de equilíbrio dos produtos elevadas aos respetivos coeficientes estequiométricos no numerador e as dos reagentes no denominador. O valor de K, a uma dada temperatura, informa sobre a posição de equilíbrio.",
        "Uma constante K muito maior do que 1 está associada, em geral, a uma composição de equilíbrio favorecida em produtos; K muito menor do que 1 favorece reagentes. Para a reação inversa, a constante é o inverso: K_inversa=1/K_direta. Alterar os coeficientes da equação altera também a expressão e o valor numérico da constante correspondente.",
        "O quociente da reação Q tem a mesma forma algébrica de K, mas usa as concentrações no instante considerado. Comparar Q com K permite prever a evolução: se Q<K, o sistema evolui no sentido direto; se Q>K, evolui no sentido inverso; se Q=K, a composição é de equilíbrio nas condições consideradas."
      ],
      formulas:[
        "K_c = [C]^c[D]^d / ([A]^a[B]^b)",
        "K_inversa = 1/K_direta",
        "Q<K → evolução no sentido direto",
        "Q>K → evolução no sentido inverso",
        "Q=K → estado de equilíbrio"
      ],
      example:{
        title:"Exemplo resolvido · prever o sentido através de Q e K",
        steps:[
          "Para A⇌B, numa dada temperatura, Kc=4,0. Num instante, [A]=0,50 mol dm⁻³ e [B]=1,0 mol dm⁻³.",
          "Calcula Qc=[B]/[A]=1,0/0,50=2,0.",
          "Como Qc<Kc, a composição tem relativamente pouco produto face ao equilíbrio.",
          "O sistema evolui no sentido direto até Qc atingir Kc, se a temperatura se mantiver."
        ],
        result:"Qc=2,0<Kc=4,0; a evolução espontânea é no sentido direto.",
        note:"Q não é uma segunda constante: muda com a composição até, no equilíbrio, coincidir com K."
      },
      remember:"K pertence à reação e à temperatura; Q pertence à composição num determinado instante.",
      pitfalls:[
        "Usar concentrações iniciais na expressão de K como se fossem automaticamente concentrações de equilíbrio.",
        "Trocar a interpretação de Q<K e Q>K.",
        "Esquecer que a constante da reação inversa é 1/K da reação direta."
      ]
    },
    {
      id:"q11-lechatelier",
      kicker:"5 · PRINCÍPIO DE LE CHÂTELIER",
      title:"Uma perturbação desencadeia uma evolução que tende a contrariar o seu efeito",
      paragraphs:[
        "O Princípio de Le Châtelier permite prever qualitativamente como um sistema em equilíbrio responde a certas perturbações. Aumentar a concentração de um reagente tende a favorecer o sentido que o consome; remover produto tende também a favorecer a reação direta. Depois da perturbação, o sistema evolui até atingir uma nova composição de equilíbrio.",
        "Em equilíbrios gasosos, uma diminuição de volume e consequente aumento de pressão favorece, quando aplicável, o lado com menor quantidade estequiométrica total de espécies gasosas. Se ambos os lados tiverem o mesmo número total de mol de gás, a alteração de pressão por mudança de volume não desloca o equilíbrio por este critério.",
        "A temperatura é especial porque pode alterar o valor de K. Para uma reação direta exotérmica, aumentar a temperatura favorece o sentido endotérmico, deslocando o equilíbrio para os reagentes; diminuir a temperatura favorece os produtos. Um catalisador acelera as reações direta e inversa e permite atingir o equilíbrio mais depressa, mas não altera K nem a composição de equilíbrio. As AE incluem investigar experimentalmente perturbações por temperatura e concentração, formulando hipóteses e avaliando procedimentos."
      ],
      formulas:[
        "concentração ↑ de reagente → tendência para o consumir",
        "pressão ↑ por V↓ → favorece lado com menos mol de gás",
        "reação direta exotérmica: T↑ → deslocamento no sentido inverso",
        "catalisador: K inalterado e composição de equilíbrio inalterada"
      ],
      example:{
        title:"Exemplo resolvido · perturbar a síntese do amoníaco",
        steps:[
          "Considera N₂(g)+3H₂(g)⇌2NH₃(g), com reação direta exotérmica.",
          "Aumentar a pressão por diminuição do volume favorece o lado com menos mol de gás: os produtos, 2 mol em vez de 4.",
          "Aumentar a temperatura favorece o sentido endotérmico, deslocando o equilíbrio para os reagentes.",
          "Adicionar catalisador aumenta a rapidez de aproximação ao equilíbrio, mas não aumenta o rendimento de equilíbrio nas mesmas T e P."
        ],
        result:"Pressão mais elevada favorece NH₃; temperatura mais elevada desfavorece termodinamicamente NH₃; o catalisador altera a rapidez, não a posição do equilíbrio.",
        note:"Em contexto industrial escolhe-se um compromisso: condições que deem rendimento aceitável sem tornar a velocidade, o custo ou a segurança impraticáveis."
      },
      remember:"Concentração e pressão deslocam a composição; temperatura pode também alterar K; catalisador não desloca o equilíbrio.",
      pitfalls:[
        "Dizer que um catalisador aumenta K ou a quantidade de produto no equilíbrio.",
        "Aplicar a regra da pressão sem contar apenas as espécies gasosas e sem verificar se existe diferença entre os dois lados.",
        "Afirmar que aumentar a temperatura favorece sempre os produtos, ignorando o caráter endotérmico ou exotérmico."
      ]
    },
    {
      id:"q11-green-industry",
      kicker:"6 · QUÍMICA VERDE E PROCESSOS INDUSTRIAIS",
      title:"Uma decisão industrial procura rendimento, velocidade, segurança, custo e sustentabilidade em conjunto",
      paragraphs:[
        "Comparar processos pela química verde não se resume a escolher o maior rendimento. Devem considerar-se matérias-primas, perigosidade, resíduos, consumo energético, solventes, seletividade, economia atómica, possibilidade de reciclagem e impactos sociais, económicos e ambientais. Um processo com bom rendimento pode continuar a ser pouco sustentável se exigir reagentes perigosos ou muita energia.",
        "Na síntese do amoníaco, N₂(g)+3H₂(g)⇌2NH₃(g), a reação direta é exotérmica e reduz o número de mol de gás. Pressão elevada favorece a composição de equilíbrio em NH₃, mas aumenta custos de compressão e exigências de segurança. Temperatura baixa favorece termodinamicamente NH₃, mas torna a reação demasiado lenta; por isso usa-se uma temperatura de compromisso e um catalisador para obter velocidade industrial adequada.",
        "O catalisador não altera a composição de equilíbrio: reduz a energia de ativação das reações direta e inversa e permite operar com uma velocidade útil. A otimização industrial envolve ainda separar NH₃ e recircular reagentes não convertidos, gerir energia e avaliar a origem do hidrogénio. A melhor decisão é uma solução de compromisso fundamentada, não a maximização isolada de uma única variável."
      ],
      formulas:[
        "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
        "síntese do NH₃: ΔH<0 para a reação direta",
        "pressão ↑ → favorece 2 mol de gás face a 4 mol de gás",
        "catalisador → equilíbrio atingido mais depressa, K inalterado"
      ],
      example:{
        title:"Exemplo resolvido · escolher condições industriais para o amoníaco",
        steps:[
          "Uma fábrica pretende aumentar a produção de NH₃ sem tornar o processo excessivamente caro ou lento.",
          "Aumentar muito a pressão melhora a posição de equilíbrio, mas aumenta consumo energético, investimento e riscos operacionais.",
          "Baixar muito a temperatura melhora o equilíbrio para uma reação exotérmica, mas reduz demasiado a velocidade.",
          "A solução industrial usa pressão e temperatura de compromisso, catalisador e recirculação dos reagentes não convertidos."
        ],
        result:"A condição industrial ótima não é a que maximiza isoladamente K ou a velocidade; é a que equilibra rendimento, cinética, energia, segurança, custo e sustentabilidade.",
        note:"Le Châtelier explica a tendência termodinâmica; a decisão industrial exige acrescentar cinética, engenharia, economia e impacto ambiental."
      },
      remember:"Química verde é decisão multicritério: menos resíduos, menor perigosidade e menor consumo de recursos contam tanto como obter produto.",
      pitfalls:[
        "Confundir rendimento percentual com sustentabilidade global do processo.",
        "Dizer que o catalisador desloca o equilíbrio para o amoníaco.",
        "Escolher pressão máxima e temperatura mínima sem considerar velocidade, energia, segurança e custo."
      ]
    }
  ]
};

export function physicsChemistryEquilibrium11DeepReviewFor(domainId){
  return domainId==="q11-equilibrium"?FQA_EQUILIBRIUM_11_DEEP_REVIEW:null;
}
