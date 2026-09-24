export const PORTUGUESE_LITERARY_WORKS=[
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
    id:"mensagem",
    year:"12.º",
    title:"Mensagem",
    author:"Fernando Pessoa",
    curriculumLabel:"seleção prescrita",
    focus:["Mito e História","Sebastianismo e Quinto Império","Símbolos e missão coletiva","Estrutura tripartida e construção épico-lírica"],
    readyCompetencyIds:["pt-literatura-temas","pt-literatura-voz","pt-literatura-forma","pt-literatura-recursos"]
  }
];

export function portugueseLiteraryWorkById(id){
  return PORTUGUESE_LITERARY_WORKS.find(work=>work.id===id)||null;
}

export function portugueseLiteraryWorksForYear(year){
  return PORTUGUESE_LITERARY_WORKS.filter(work=>work.year===year);
}
