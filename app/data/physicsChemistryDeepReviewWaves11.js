export const FQA_WAVES_11_DEEP_REVIEW_VERSION="2026.10-wave5";

export const FQA_WAVES_11_DEEP_REVIEW={
  id:"f11-waves",
  title:"Ondas e eletromagnetismo",
  lead:"As ondas permitem transportar energia e informação sem transportar matéria de forma macroscópica. Neste capítulo vais ligar periodicidade temporal e espacial, som, campos elétrico e magnético, indução eletromagnética, ondas eletromagnéticas e ótica, sempre distinguindo o que as Aprendizagens Essenciais pedem qualitativamente do que deves saber aplicar em problemas e no trabalho experimental.",
  goals:[
    "Caracterizar ondas periódicas e sinais harmónicos por amplitude, período, frequência, comprimento de onda e velocidade de propagação.",
    "Relacionar as propriedades do som com a sua natureza de onda de pressão e interpretar atividades experimentais com sinais sonoros.",
    "Identificar as origens dos campos elétrico e magnético, caracterizá-los por linhas de campo e relacioná-los qualitativamente com forças.",
    "Aplicar a Lei de Faraday e interpretar a indução eletromagnética em geradores e transformadores.",
    "Compreender os contributos de Oersted, Faraday, Maxwell e Hertz e a produção e propagação de ondas eletromagnéticas.",
    "Aplicar as leis da reflexão e da refração e analisar experimentalmente reflexão total, difração, índice de refração e comprimento de onda de um laser."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais de Física e Química A · 11.º ano · março de 2026 · Ondas e Eletromagnetismo",
    "IAVE · Informação-Prova 715 · Física e Química A · 2026"
  ],
  sections:[
    {
      id:"f11-waves-signals",
      kicker:"1 · SINAIS E ONDAS",
      title:"Periodicidade temporal e espacial descrevem a propagação ondulatória",
      paragraphs:[
        "Um sinal traduz a variação temporal de uma grandeza física. Num sinal periódico, o padrão repete-se após um período T e a frequência f indica o número de ciclos por unidade de tempo. Num sinal harmónico, a representação temporal é sinusoidal e permite identificar diretamente amplitude, período e fase.",
        "O comprimento de onda λ é a periodicidade espacial: a distância entre dois pontos consecutivos no mesmo estado de vibração. Num meio homogéneo, a velocidade de propagação relaciona-se com frequência e comprimento de onda por v=λf. Quando uma onda passa de um meio para outro, a frequência não se altera porque depende da fonte; podem alterar-se v e λ.",
        "Ondas transversais têm a direção de oscilação perpendicular à direção de propagação; ondas longitudinais têm-na paralela. Ondas mecânicas precisam de meio material, enquanto ondas eletromagnéticas podem propagar-se no vazio. A onda transporta energia e informação, mas não transporta matéria de forma macroscópica ao longo do meio."
      ],
      formulas:[
        "T = 1/f",
        "ω = 2πf = 2π/T",
        "v = λf",
        "sinal harmónico: y(t)=A sin(ωt+φ)"
      ],
      example:{
        title:"Exemplo resolvido · período, frequência e comprimento de onda",
        steps:[
          "Uma fonte produz 25 oscilações em 2,0 s, logo f=25/2,0=12,5 Hz.",
          "O período é T=1/f=0,080 s.",
          "Se a onda se propagar nesse meio a 5,0 m s⁻¹, λ=v/f=5,0/12,5=0,40 m.",
          "Se entrar noutro meio, a fonte continua a impor f=12,5 Hz; uma eventual alteração de v traduz-se numa alteração de λ."
        ],
        result:"f=12,5 Hz, T=0,080 s e λ=0,40 m no meio considerado.",
        note:"A frequência é determinada pela fonte; não a alteres só porque a onda mudou de meio."
      },
      remember:"A periodicidade temporal é descrita por T e f; a periodicidade espacial por λ; num meio homogéneo ligam-se por v=λf.",
      pitfalls:[
        "Alterar a frequência quando a onda atravessa a fronteira entre dois meios.",
        "Confundir amplitude com comprimento de onda.",
        "Afirmar que as partículas do meio acompanham a onda ao longo de toda a propagação."
      ]
    },
    {
      id:"f11-sound",
      kicker:"2 · SOM",
      title:"O som é uma onda de pressão e as suas características podem ser investigadas experimentalmente",
      paragraphs:[
        "O som é uma onda mecânica de pressão. No ar, a propagação faz-se por sucessivas compressões e rarefações e é longitudinal. A altura do som relaciona-se com a frequência; a intensidade relaciona-se com a amplitude e com a energia transportada; o timbre permite distinguir sons com a mesma altura e intensidade pela sua composição e forma do sinal.",
        "Um som puro aproxima-se de um sinal sinusoidal, enquanto um som complexo resulta da sobreposição de várias componentes. As AE pedem que se investiguem experimentalmente intensidade, altura e timbre observando sinais elétricos obtidos por conversão de sinais sonoros e explicando procedimentos e resultados.",
        "A velocidade de propagação do som depende do meio e das suas condições, não da frequência emitida pela fonte no mesmo meio. As AE exigem também a determinação experimental dessa velocidade, identificando fontes de erro, propondo melhorias e procedimentos alternativos. Num método por tempo de voo mede-se distância e intervalo de tempo; num eco é indispensável considerar o percurso de ida e volta."
      ],
      formulas:[
        "v_som = λf",
        "T = 1/f",
        "tempo de voo: v = d/Δt",
        "eco: d_obstáculo = vΔt/2"
      ],
      example:{
        title:"Exemplo resolvido · distância através de um eco",
        steps:[
          "Um pulso sonoro é emitido e o eco regressa 0,40 s depois.",
          "Usa v_som=340 m s⁻¹ para as condições consideradas.",
          "O percurso total do sinal é vΔt=340×0,40=136 m.",
          "Como esse percurso corresponde a ida e volta, a distância ao obstáculo é 136/2=68 m."
        ],
        result:"O obstáculo encontra-se a aproximadamente 68 m.",
        note:"Numa atividade real, repete medições e discute a resolução temporal e as principais fontes de erro."
      },
      remember:"Som é uma onda de pressão: precisa de meio material e a frequência é imposta pela fonte.",
      pitfalls:[
        "Afirmar que sons de maior frequência se propagam necessariamente mais depressa no mesmo meio.",
        "Esquecer que o tempo de eco corresponde ao percurso de ida e volta.",
        "Confundir altura, intensidade e timbre."
      ]
    },
    {
      id:"f11-fields",
      kicker:"3 · CAMPOS ELÉTRICO E MAGNÉTICO",
      title:"As linhas de campo permitem caracterizar qualitativamente interações à distância",
      paragraphs:[
        "As Aprendizagens Essenciais de 2026 pedem que identifiques as origens dos campos elétrico e magnético e os caracterizes através das linhas de campo. Cargas elétricas criam campo elétrico; ímanes e correntes elétricas estão associados a campo magnético. As linhas representam a direção do campo em cada ponto e nunca se cruzam.",
        "Para uma carga positiva isolada, as linhas de campo elétrico apontam radialmente para fora; para uma carga negativa, apontam para a carga. A força elétrica sobre uma carga pontual relaciona-se qualitativamente com o campo: uma carga positiva sofre força no sentido do campo elétrico e uma carga negativa no sentido oposto.",
        "Num íman, as linhas de campo magnético formam linhas fechadas e, no exterior, orientam-se do polo norte para o polo sul. O trabalho de Oersted mostrou experimentalmente a ligação entre corrente elétrica e magnetismo. Neste tema, o foco curricular da relação campo-força é qualitativo: não é necessário transformar esta secção num exercício de Lei de Coulomb."
      ],
      formulas:[
        "q>0 ⇒ F⃗_e tem o sentido de E⃗",
        "q<0 ⇒ F⃗_e tem sentido oposto a E⃗",
        "linhas de E⃗: + → −",
        "no exterior de um íman: linhas de B⃗ de N → S"
      ],
      example:{
        title:"Exemplo resolvido · interpretar linhas de campo elétrico",
        steps:[
          "Considera separadamente um ião positivo e um ião negativo, ambos puntiformes e isolados.",
          "Em torno do ião positivo, escolhe a representação cujas setas das linhas de campo apontam radialmente para fora.",
          "Em torno do ião negativo, escolhe a representação cujas setas apontam radialmente para a carga.",
          "Uma carga de prova positiva seguiria localmente o sentido de E⃗; uma carga negativa sofreria força no sentido oposto."
        ],
        result:"Linhas de campo elétrico saem de cargas positivas e chegam a cargas negativas.",
        note:"Este tipo de leitura corresponde diretamente ao nível qualitativo explicitado nas AE e apareceu também na Prova 715 de 2026.",
      },
      remember:"Primeiro identifica a origem do campo e o sentido das linhas; só depois raciocina sobre a força exercida num objeto colocado nesse campo.",
      pitfalls:[
        "Desenhar linhas de campo elétrico a entrar numa carga positiva ou a sair de uma carga negativa.",
        "Confundir a direção do campo com a direção da força sobre uma carga negativa.",
        "Confundir campo elétrico com campo magnético ou inventar uma força adicional chamada ‘força centrada no campo’."
      ]
    },
    {
      id:"f11-induction",
      kicker:"4 · INDUÇÃO ELETROMAGNÉTICA",
      title:"Faraday relaciona a força eletromotriz induzida com a variação do fluxo magnético",
      paragraphs:[
        "Faraday mostrou que uma corrente pode ser induzida quando varia o fluxo magnético através de um circuito. O fluxo depende da intensidade do campo, da área atravessada e da orientação da superfície. Assim, mesmo com B constante, o fluxo pode mudar se a área efetiva ou a orientação se alterarem.",
        "A Lei de Faraday relaciona o módulo da força eletromotriz induzida com a rapidez de variação do fluxo magnético. Numa bobina com N espiras, o efeito é multiplicado pelo número de espiras. As AE de 2026 pedem explicitamente que a Lei de Faraday seja aplicada na resolução de problemas e que se interpretem aplicações como geradores e transformadores.",
        "A Lei de Lenz determina o sentido da corrente induzida: o campo criado pela corrente induzida opõe-se à variação do fluxo que a originou. Esta oposição é coerente com a conservação da energia. O contributo experimental de Faraday deve ser ligado ao de Oersted e, mais tarde, à síntese de Maxwell."
      ],
      formulas:[
        "Φ_B = BA cosθ",
        "|ε_ind,média| = |ΔΦ_B|/Δt",
        "para N espiras: |ε_ind,média| = N|ΔΦ_B|/Δt",
        "Faraday-Lenz: ε_ind = −N dΦ_B/dt"
      ],
      example:{
        title:"Exemplo resolvido · fem induzida numa bobina",
        steps:[
          "Numa bobina de 200 espiras, o fluxo por espira diminui de 4,0×10⁻⁴ Wb para zero em 0,020 s.",
          "O módulo de NΔΦ é 200×4,0×10⁻⁴=8,0×10⁻² Wb.",
          "O módulo da fem média é |ε|=8,0×10⁻²/0,020=4,0 V.",
          "Para determinar o sentido da corrente, identifica primeiro a variação do fluxo e aplica depois a Lei de Lenz."
        ],
        result:"O módulo da força eletromotriz induzida média é 4,0 V.",
        note:"O sinal negativo traduz a oposição descrita por Lenz; não significa que o módulo da fem seja negativo."
      },
      remember:"Não basta existir campo magnético: é a variação do fluxo magnético que está na origem da indução.",
      pitfalls:[
        "Afirmar que um campo magnético constante induz sempre corrente num circuito imóvel.",
        "Ignorar área ou orientação ao analisar o fluxo magnético.",
        "Aplicar Lenz antes de identificar qual é a variação do fluxo que a corrente induzida deve contrariar."
      ]
    },
    {
      id:"f11-em-waves",
      kicker:"5 · ELETROMAGNETISMO E ONDAS ELETROMAGNÉTICAS",
      title:"Oersted, Faraday, Maxwell e Hertz ligaram eletricidade, magnetismo e ondas",
      paragraphs:[
        "Oersted evidenciou que uma corrente elétrica cria efeitos magnéticos e Faraday mostrou a indução eletromagnética. Maxwell integrou eletricidade e magnetismo numa teoria capaz de prever ondas eletromagnéticas; Hertz demonstrou experimentalmente a produção e deteção dessas ondas. As AE pedem que saibas relacionar estes contributos com a construção do conhecimento científico.",
        "Uma onda eletromagnética não necessita de meio material e, no vazio, propaga-se com velocidade c. A frequência e o comprimento de onda relacionam-se por c=λf. O espetro eletromagnético pode ser usado como contexto para organizar rádio, micro-ondas, infravermelho, visível, ultravioleta, raios X e raios gama, sem perder o foco curricular na produção, propagação e aplicações das ondas.",
        "O conhecimento dos fenómenos ondulatórios sustenta tecnologias de comunicação e contribui para o conhecimento do Universo. A escolha da região do espetro numa aplicação depende da forma como a radiação é produzida, propagada, detetada e interage com a matéria; não deves assumir que toda a radiação eletromagnética tem os mesmos efeitos biológicos."
      ],
      formulas:[
        "no vazio: c = λf",
        "c ≈ 3,00×10⁸ m s⁻¹",
        "λ = c/f",
        "maior f ⇔ menor λ, no mesmo meio"
      ],
      example:{
        title:"Exemplo resolvido · frequência de uma onda eletromagnética",
        steps:[
          "Considera radiação com comprimento de onda λ=600 nm no vazio.",
          "Converte: 600 nm=6,00×10⁻⁷ m.",
          "Usa f=c/λ=3,00×10⁸/(6,00×10⁻⁷).",
          "Obtém f=5,00×10¹⁴ Hz."
        ],
        result:"A frequência é 5,00×10¹⁴ Hz.",
        note:"No vazio, a velocidade c é comum às ondas eletromagnéticas; frequência e comprimento de onda variam inversamente."
      },
      remember:"Maxwell previu a existência de ondas eletromagnéticas e Hertz forneceu demonstração experimental decisiva.",
      pitfalls:[
        "Dizer que ondas eletromagnéticas precisam de ar para se propagarem.",
        "Confundir maior frequência com maior comprimento de onda.",
        "Memorizar nomes históricos sem compreender a sequência Oersted → Faraday → Maxwell → Hertz."
      ]
    },
    {
      id:"f11-optics",
      kicker:"6 · REFLEXÃO, REFRAÇÃO, REFLEXÃO TOTAL E DIFRAÇÃO",
      title:"A luz muda de direção nas interfaces e produz padrões ondulatórios observáveis",
      paragraphs:[
        "Na reflexão especular, o ângulo de reflexão é igual ao ângulo de incidência, ambos medidos relativamente à normal. Na refração, a frequência mantém-se ao atravessar a interface, enquanto a velocidade e o comprimento de onda podem mudar. A Lei de Snell relaciona os ângulos de incidência e refração com os índices de refração.",
        "Quando a luz passa de um meio de maior índice de refração para outro de menor índice, pode ocorrer reflexão total interna se o ângulo de incidência exceder o ângulo crítico. Este fenómeno tem aplicações como as fibras óticas. A difração evidencia a natureza ondulatória e torna-se relevante quando as dimensões da abertura ou do obstáculo são comparáveis com λ.",
        "As AE exigem investigação experimental de reflexão, refração, reflexão total e difração, incluindo determinação do índice de refração de um meio e do comprimento de onda da luz de um laser através de uma rede de difração. O tratamento deve ligar medidas angulares e geométricas às relações físicas e discutir incerteza e qualidade dos resultados."
      ],
      formulas:[
        "lei da reflexão: θ_r = θ_i",
        "índice de refração: n = c/v",
        "lei de Snell: n₁ sinθ₁ = n₂ sinθ₂",
        "para n₁>n₂: sinθ_c = n₂/n₁",
        "rede de difração: d sinθ = mλ"
      ],
      example:{
        title:"Exemplo resolvido · refração do ar para o vidro",
        steps:[
          "Um raio passa do ar, n₁≈1,00, para vidro, n₂=1,50, com θ₁=30°.",
          "Pela Lei de Snell: 1,00 sin30°=1,50 sinθ₂.",
          "sinθ₂=0,500/1,50=0,333.",
          "Logo θ₂≈19,5°, aproximando-se da normal ao entrar no meio de maior índice."
        ],
        result:"O ângulo de refração é aproximadamente 19,5°.",
        note:"Os ângulos são medidos relativamente à normal, nunca relativamente à superfície."
      },
      remember:"Na refração numa interface estacionária, a frequência mantém-se; mudam a velocidade e o comprimento de onda.",
      pitfalls:[
        "Medir os ângulos relativamente à superfície em vez da normal.",
        "Aplicar reflexão total quando a luz passa de menor índice para maior índice.",
        "Dizer que a frequência da luz muda quando atravessa a interface."
      ]
    }
  ]
};

export function physicsChemistryWaves11DeepReviewFor(domainId){
  return domainId===FQA_WAVES_11_DEEP_REVIEW.id?FQA_WAVES_11_DEEP_REVIEW:null;
}
