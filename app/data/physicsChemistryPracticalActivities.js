export const PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES=[
  {id:"lab10-measurement-uncertainty",year:"10.º",domain:"q10-elements",subtopicId:"q10-atom-structure",label:"Medição de massas e volumes",focus:["seleção de instrumentos","incerteza de leitura","algarismos significativos"]},
  {id:"lab10-flame-tests",year:"10.º",domain:"q10-elements",subtopicId:"q10-spectra",label:"Identificação de elementos por testes de chama",focus:["espectros/emissão","procedimento","comunicação de conclusões"]},
  {id:"lab10-metal-density",year:"10.º",domain:"q10-elements",subtopicId:"q10-periodicity",label:"Densidade relativa de metais por picnometria",focus:["medição","procedimento","tratamento e comunicação de resultados"]},

  {id:"lab10-photochemistry",year:"10.º",domain:"q10-matter",subtopicId:"q10-photochemistry",label:"Efeito da luz sobre cloreto de prata",focus:["controlo de condições","observação","avaliação do procedimento"]},

  {id:"lab10-work-energy",year:"10.º",domain:"f10-energy",subtopicId:"f10-work",label:"Variação da energia cinética e distância",focus:["resultante constante","medição","tratamento estatístico de dados"]},
  {id:"lab10-bounce",year:"10.º",domain:"f10-energy",subtopicId:"f10-mechanical-energy",label:"Queda e ressalto de uma bola",focus:["balanço energético","comparação modelo-dados","perdas de energia"]},
  {id:"lab10-circuits",year:"10.º",domain:"f10-energy",subtopicId:"f10-electric",label:"Circuitos em série e paralelo",focus:["corrente","diferença de potencial","montagem e medição"]},
  {id:"lab10-cell",year:"10.º",domain:"f10-energy",subtopicId:"f10-electric",label:"Características de uma pilha",focus:["gerador","medições elétricas","avaliação do procedimento"]},
  {id:"lab10-calorimetry",year:"10.º",domain:"f10-energy",subtopicId:"f10-thermal-radiation",label:"Capacidade térmica mássica e fusão do gelo",focus:["balanço energético","calorimetria","incerteza experimental"]},
  {id:"lab10-photovoltaic",year:"10.º",domain:"f10-energy",subtopicId:"f10-thermal-radiation",label:"Painel fotovoltaico",focus:["irradiância","diferença de potencial","potência elétrica"]},

  {id:"lab11-freefall-g",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-experimental-motion",label:"Determinação de g por queda livre",focus:["recolha de dados","dependência da massa","incerteza e comunicação"]},
  {id:"lab11-resultant-force",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-forces-motion",label:"Movimento sob resultante nula e não nula",focus:["formulação de hipóteses","força resultante","interpretação de resultados"]},
  {id:"lab11-speed-displacement",year:"11.º",domain:"f11-mechanics",subtopicId:"f11-experimental-motion",label:"Velocidade e deslocamento em movimento uniformemente variado",focus:["aceleração","resultante das forças","análise gráfica"]},

  {id:"lab11-sound-signal",year:"11.º",domain:"f11-waves",subtopicId:"f11-sound",label:"Características de sons a partir de sinais elétricos",focus:["frequência","amplitude","interpretação de sinais"]},
  {id:"lab11-sound-speed",year:"11.º",domain:"f11-waves",subtopicId:"f11-sound",label:"Velocidade de propagação do som",focus:["tempo de voo","fontes de erro","melhorias ao procedimento"]},
  {id:"lab11-field-lines",year:"11.º",domain:"f11-waves",subtopicId:"f11-fields",label:"Linhas de campo elétrico e magnético",focus:["origem dos campos","observação experimental","representação"]},
  {id:"lab11-optics",year:"11.º",domain:"f11-waves",subtopicId:"f11-optics",label:"Reflexão, refração, reflexão total e difração",focus:["índice de refração","comprimento de onda","procedimento experimental"]},

  {id:"lab11-synthesis-yield",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-limiting-yield",label:"Rendimento na síntese de um composto",focus:["estequiometria","rendimento","avaliação de resultados"]},
  {id:"lab11-equilibrium-shift",year:"11.º",domain:"q11-equilibrium",subtopicId:"q11-lechatelier",label:"Perturbação de equilíbrios em sistemas aquosos",focus:["concentração","hipóteses","Le Châtelier"]},

  {id:"lab11-titration",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-titration",label:"Titulação ácido-base",focus:["material volumétrico","ponto de equivalência","incerteza"]},
  {id:"lab11-solubility-temperature",year:"11.º",domain:"q11-aqueous",subtopicId:"q11-solubility",label:"Efeito da temperatura na solubilidade",focus:["controlo de variáveis","solubilidade","avaliação dos resultados"]}
];

export function physicsChemistryPracticalActivitiesForDomain(domainId){
  return PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES.filter(row=>row.domain===domainId);
}
