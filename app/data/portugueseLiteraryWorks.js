export const PORTUGUESE_LITERARY_WORKS=[
  {
    id:"frei-luis-de-sousa",
    year:"11.º",
    title:"Frei Luís de Sousa",
    author:"Almeida Garrett",
    curriculumLabel:"leitura integral",
    focus:["Conflito trágico e fatalidade","Identidade, passado e regresso","Personagens, espaço e símbolos","Estrutura dramática e progressão da ação"]
  },
  {
    id:"mensagem",
    year:"12.º",
    title:"Mensagem",
    author:"Fernando Pessoa",
    curriculumLabel:"seleção prescrita",
    focus:["Mito e História","Sebastianismo e Quinto Império","Símbolos e missão coletiva","Estrutura tripartida e construção épico-lírica"]
  }
];

export function portugueseLiteraryWorkById(id){
  return PORTUGUESE_LITERARY_WORKS.find(work=>work.id===id)||null;
}

export function portugueseLiteraryWorksForYear(year){
  return PORTUGUESE_LITERARY_WORKS.filter(work=>work.year===year);
}
