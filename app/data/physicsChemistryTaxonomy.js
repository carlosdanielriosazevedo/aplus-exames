export const PHYSICS_CHEMISTRY_A_SUBTOPICS=[
  {id:"q10-atom-structure",domain:"q10-elements",label:"Massa e tamanho dos átomos"},
  {id:"q10-amount-molar",domain:"q10-elements",label:"Quantidade de matéria e massa molar"},
  {id:"q10-spectra",domain:"q10-elements",label:"Energia dos eletrões e espectros"},
  {id:"q10-electron-config",domain:"q10-elements",label:"Configuração eletrónica"},
  {id:"q10-periodicity",domain:"q10-elements",label:"Tabela Periódica e periodicidade"},

  {id:"q10-bonding",domain:"q10-matter",label:"Ligação química"},
  {id:"q10-geometry-polarity",domain:"q10-matter",label:"Estruturas de Lewis, geometria e polaridade"},
  {id:"q10-carbon",domain:"q10-matter",label:"Compostos de carbono e grupos funcionais"},
  {id:"q10-intermolecular",domain:"q10-matter",label:"Interações intermoleculares"},
  {id:"q10-gases-solutions",domain:"q10-matter",label:"Gases, soluções e dispersões"},
  {id:"q10-enthalpy",domain:"q10-matter",label:"Transformações químicas e entalpia"},
  {id:"q10-photochemistry",domain:"q10-matter",label:"Reações fotoquímicas e ozono"},

  {id:"f10-energy-motion",domain:"f10-energy",label:"Energia e movimentos"},
  {id:"f10-work",domain:"f10-energy",label:"Trabalho e teorema da energia cinética"},
  {id:"f10-mechanical-energy",domain:"f10-energy",label:"Energia potencial e mecânica"},
  {id:"f10-electric",domain:"f10-energy",label:"Energia e fenómenos elétricos"},
  {id:"f10-thermal-radiation",domain:"f10-energy",label:"Energia, fenómenos térmicos e radiação"},
  {id:"f10-thermodynamics",domain:"f10-energy",label:"Primeira e Segunda Leis da Termodinâmica"},

  {id:"f11-kinematics",domain:"f11-mechanics",label:"Tempo, posição, velocidade e aceleração"},
  {id:"f11-interactions",domain:"f11-mechanics",label:"Interações e seus efeitos"},
  {id:"f11-newton-gravity",domain:"f11-mechanics",label:"Leis de Newton e gravitação"},
  {id:"f11-forces-motion",domain:"f11-mechanics",label:"Forças e movimentos"},
  {id:"f11-circular",domain:"f11-mechanics",label:"Movimento circular uniforme"},
  {id:"f11-experimental-motion",domain:"f11-mechanics",label:"Análise gráfica e experimental do movimento"},

  {id:"f11-waves-signals",domain:"f11-waves",label:"Sinais e ondas"},
  {id:"f11-sound",domain:"f11-waves",label:"Som"},
  {id:"f11-fields",domain:"f11-waves",label:"Campos elétrico e magnético"},
  {id:"f11-induction",domain:"f11-waves",label:"Indução eletromagnética"},
  {id:"f11-em-waves",domain:"f11-waves",label:"Ondas eletromagnéticas"},
  {id:"f11-optics",domain:"f11-waves",label:"Reflexão, refração e aplicações tecnológicas"},

  {id:"q11-stoichiometry",domain:"q11-equilibrium",label:"Aspetos quantitativos das reações químicas"},
  {id:"q11-limiting-yield",domain:"q11-equilibrium",label:"Estequiometria, reagente limitante e rendimento"},
  {id:"q11-equilibrium-state",domain:"q11-equilibrium",label:"Estado de equilíbrio"},
  {id:"q11-kq",domain:"q11-equilibrium",label:"Constante e quociente da reação"},
  {id:"q11-lechatelier",domain:"q11-equilibrium",label:"Princípio de Le Châtelier"},
  {id:"q11-green-industry",domain:"q11-equilibrium",label:"Química verde e processos industriais"},

  {id:"q11-acid-base",domain:"q11-aqueous",label:"Reações ácido-base"},
  {id:"q11-ph",domain:"q11-aqueous",label:"pH, ácidos e bases fortes e fracos"},
  {id:"q11-titration",domain:"q11-aqueous",label:"Titulações ácido-base"},
  {id:"q11-redox",domain:"q11-aqueous",label:"Reações de oxidação-redução"},
  {id:"q11-electrochem",domain:"q11-aqueous",label:"Série eletroquímica e corrosão"},
  {id:"q11-solubility",domain:"q11-aqueous",label:"Soluções e equilíbrio de solubilidade"},
  {id:"q11-ksp",domain:"q11-aqueous",label:"Produto de solubilidade, precipitação e efeito do ião comum"}
];

const explicit={
  "FQA-ELEM-01":"q10-atom-structure","FQA-ELEM-02":"q10-amount-molar","FQA-ELEM-03":"q10-spectra","FQA-ELEM-04":"q10-spectra",
  "FQA-ELEM-05":"q10-electron-config","FQA-ELEM-06":"q10-periodicity","FQA-ELEM-07":"q10-atom-structure","FQA-ELEM-08":"q10-amount-molar",
  "FQA-C-ELEM-01":"q10-amount-molar","FQA-R-ELEM-01":"q10-spectra",

  "FQA-MAT-01":"q10-bonding","FQA-MAT-02":"q10-geometry-polarity","FQA-MAT-03":"q10-intermolecular","FQA-MAT-04":"q10-gases-solutions",
  "FQA-MAT-05":"q10-gases-solutions","FQA-MAT-06":"q10-enthalpy","FQA-MAT-07":"q10-carbon","FQA-MAT-08":"q10-enthalpy",
  "FQA-C-MAT-01":"q10-gases-solutions","FQA-R-MAT-01":"q10-gases-solutions",

  "FQA-ENE-01":"f10-energy-motion","FQA-ENE-02":"f10-mechanical-energy","FQA-ENE-03":"f10-work","FQA-ENE-04":"f10-electric",
  "FQA-ENE-05":"f10-energy-motion","FQA-ENE-06":"f10-thermal-radiation","FQA-ENE-07":"f10-energy-motion","FQA-ENE-08":"f10-thermodynamics",
  "FQA-C-ENE-01":"f10-work","FQA-R-ENE-01":"f10-mechanical-energy",

  "FQA-MEC-01":"f11-kinematics","FQA-MEC-02":"f11-kinematics","FQA-MEC-03":"f11-newton-gravity","FQA-MEC-04":"f11-circular",
  "FQA-MEC-05":"f11-forces-motion","FQA-MEC-06":"f11-newton-gravity","FQA-MEC-07":"f11-experimental-motion","FQA-MEC-08":"f11-kinematics",
  "FQA-C-MEC-01":"f11-forces-motion","FQA-R-MEC-01":"f11-experimental-motion",

  "FQA-WAV-01":"f11-waves-signals","FQA-WAV-02":"f11-waves-signals","FQA-WAV-03":"f11-waves-signals","FQA-WAV-04":"f11-sound",
  "FQA-WAV-05":"f11-induction","FQA-WAV-06":"f11-optics","FQA-WAV-07":"f11-sound","FQA-WAV-08":"f11-waves-signals",
  "FQA-C-WAV-01":"f11-waves-signals","FQA-R-WAV-01":"f11-sound",

  "FQA-EQ-01":"q11-stoichiometry","FQA-EQ-02":"q11-equilibrium-state","FQA-EQ-03":"q11-lechatelier","FQA-EQ-04":"q11-kq",
  "FQA-EQ-05":"q11-equilibrium-state","FQA-EQ-06":"q11-limiting-yield","FQA-EQ-07":"q11-equilibrium-state","FQA-EQ-08":"q11-green-industry",
  "FQA-C-EQ-01":"q11-kq","FQA-R-EQ-01":"q11-lechatelier",

  "FQA-AQ-01":"q11-acid-base","FQA-AQ-02":"q11-ph","FQA-AQ-03":"q11-titration","FQA-AQ-04":"q11-redox",
  "FQA-AQ-05":"q11-electrochem","FQA-AQ-06":"q11-ksp","FQA-AQ-07":"q11-ksp","FQA-AQ-08":"q11-titration",
  "FQA-C-AQ-01":"q11-ph","FQA-R-AQ-01":"q11-titration",

  "FQA-DATA-ELEM-01":"q10-periodicity",
  "FQA-DATA-MAT-01":"q10-photochemistry",
  "FQA-DATA-ENE-01":"f10-thermal-radiation",
  "FQA-DATA-MEC-01":"f11-interactions",
  "FQA-DATA-WAV-01":"f11-fields",
  "FQA-DATA-WAV-02":"f11-em-waves",
  "FQA-DATA-EQ-01":"q11-green-industry",
  "FQA-DATA-AQ-01":"q11-solubility"
};

export function physicsChemistrySubtopicIdForItem(item){
  return explicit[item.id]||null;
}

export function physicsChemistrySubtopicById(id){
  return PHYSICS_CHEMISTRY_A_SUBTOPICS.find(row=>row.id===id)||null;
}

export function physicsChemistrySubtopicsForDomain(domainId){
  return PHYSICS_CHEMISTRY_A_SUBTOPICS.filter(row=>row.domain===domainId);
}
