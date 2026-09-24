export const PORTUGUESE_LITERARY_WORKS=[
  {
    id:"poesia-trovadoresca",
    year:"10.º",
    title:"Poesia Trovadoresca",
    author:"Autores medievais",
    curriculumLabel:"seleção prescrita",
    focus:["Cantigas de amigo, amor e escárnio/maldizer","Voz e situação comunicativa","Paralelismo e refrão","Ironia e crítica social"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-forma"]
  },
  {
    id:"os-lusiadas-reflexoes",
    year:"10.º",
    title:"Os Lusíadas · Reflexões do Poeta",
    author:"Luís de Camões",
    curriculumLabel:"três reflexões prescritas",
    focus:["Crítica e consciência dos limites da glória","Experiência, esforço e risco","Relação entre épica e reflexão","Valores coletivos e voz do Poeta"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-forma"]
  },
  {
    id:"sermao-santo-antonio",
    year:"11.º",
    title:"Sermão de Santo António aos Peixes",
    author:"Padre António Vieira",
    curriculumLabel:"partes prescritas",
    focus:["Tese e progressão argumentativa","Alegoria dos peixes","Crítica social e moral","Recursos retóricos e persuasão"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-forma"]
  },
  {
    id:"frei-luis-de-sousa",
    year:"11.º",
    title:"Frei Luís de Sousa",
    author:"Almeida Garrett",
    curriculumLabel:"leitura integral",
    focus:["Conflito trágico e fatalidade","Identidade, passado e regresso","Personagens, espaço e símbolos","Estrutura dramática e progressão da ação"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-voz","pt-literatura-forma","pt-literatura-recursos"]
  },
  {
    id:"pessoa-ortonimo",
    year:"12.º",
    title:"Fernando Pessoa · Ortónimo",
    author:"Fernando Pessoa",
    curriculumLabel:"seleção prescrita",
    focus:["Fingimento artístico","Dor de pensar e consciência","Sonho e realidade","Identidade e fragmentação do sujeito"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-forma"]
  },
  {
    id:"pessoa-heteronimos",
    year:"12.º",
    title:"Fernando Pessoa · Heterónimos",
    author:"Alberto Caeiro, Ricardo Reis e Álvaro de Campos",
    curriculumLabel:"seleção prescrita",
    focus:["Poéticas distintas","Sensação, razão e modernidade","Tempo, destino e consciência","Comparação sustentada por marcas textuais"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-voz"]
  },
  {
    id:"mensagem",
    year:"12.º",
    title:"Mensagem",
    author:"Fernando Pessoa",
    curriculumLabel:"seleção prescrita",
    focus:["Mito e História","Sebastianismo e Quinto Império","Símbolos e missão coletiva","Estrutura tripartida e construção épico-lírica"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-voz","pt-literatura-forma","pt-literatura-recursos"]
  },
  {
    id:"memorial-do-convento",
    year:"12.º",
    title:"Memorial do Convento",
    author:"José Saramago",
    curriculumLabel:"opção de leitura integral",
    focus:["História e ficção","Baltasar e Blimunda","Narrador e ironia","Poder, construção e sonho"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-voz"]
  }
];

export function portugueseLiteraryWorkById(id){
  return PORTUGUESE_LITERARY_WORKS.find(work=>work.id===id)||null;
}

export function portugueseLiteraryWorksForYear(year){
  return PORTUGUESE_LITERARY_WORKS.filter(work=>work.year===year);
}
