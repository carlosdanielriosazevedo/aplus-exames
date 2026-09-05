export const SUBJECT_GROUPS=[
  {id:"math-science",label:"Matemática e Ciências"},
  {id:"languages",label:"Línguas"},
  {id:"humanities",label:"Ciências sociais e Humanidades"},
  {id:"arts",label:"Artes"}
];

export const SUBJECT_CATALOG_YEAR=2026;
export const SUBJECT_CATALOG_SOURCE="https://iave.pt/provas-e-exames/calendario/";

export const SECONDARY_EXAM_SUBJECTS=[
  {id:"math-a",name:"Matemática A",codes:["635"],examYear:"12.º",group:"math-science",icon:"∑",available:true},
  {id:"math-b",name:"Matemática B",codes:["735"],examYear:"11.º",group:"math-science",icon:"ƒ"},
  {id:"macs",name:"Matemática Aplicada às Ciências Sociais",shortName:"MACS",codes:["835"],examYear:"11.º",group:"math-science",icon:"%"},
  {id:"physics-chemistry-a",name:"Física e Química A",codes:["715"],examYear:"11.º",group:"math-science",icon:"⚛"},
  {id:"biology-geology",name:"Biologia e Geologia",codes:["702"],examYear:"11.º",group:"math-science",icon:"⌁"},

  {id:"portuguese",name:"Português",codes:["639"],examYear:"12.º",group:"languages",icon:"Aa"},
  {id:"portuguese-second-language",name:"Português Língua Segunda",codes:["138"],examYear:"12.º",group:"languages",icon:"PT"},
  {id:"portuguese-non-native",name:"Português Língua Não Materna",shortName:"PLNM",codes:["839"],examYear:"12.º",group:"languages",icon:"PT"},
  {id:"portuguese-literature",name:"Literatura Portuguesa",codes:["734"],examYear:"11.º",group:"languages",icon:"Li"},
  {id:"english",name:"Inglês",codes:["550"],examYear:"11.º",group:"languages",icon:"EN"},
  {id:"german",name:"Alemão",codes:["501"],examYear:"11.º",group:"languages",icon:"DE"},
  {id:"spanish",name:"Espanhol",codes:["547","847"],examYear:"11.º",group:"languages",icon:"ES"},
  {id:"french",name:"Francês",codes:["517"],examYear:"11.º",group:"languages",icon:"FR"},
  {id:"italian",name:"Italiano",codes:["849"],examYear:"11.º",group:"languages",icon:"IT"},
  {id:"latin-a",name:"Latim A",codes:["732"],examYear:"11.º",group:"languages",icon:"LA"},
  {id:"mandarin",name:"Mandarim",codes:["848"],examYear:"11.º",group:"languages",icon:"中"},

  {id:"economics-a",name:"Economia A",codes:["712"],examYear:"11.º",group:"humanities",icon:"€"},
  {id:"philosophy",name:"Filosofia",codes:["714"],examYear:"11.º",group:"humanities",icon:"?"},
  {id:"geography-a",name:"Geografia A",codes:["719"],examYear:"11.º",group:"humanities",icon:"◎"},
  {id:"history-a",name:"História A",codes:["623"],examYear:"12.º",group:"humanities",icon:"⌛"},
  {id:"history-b",name:"História B",codes:["723"],examYear:"11.º",group:"humanities",icon:"⌛"},
  {id:"arts-history",name:"História da Cultura e das Artes",shortName:"História da Cultura e das Artes",codes:["724"],examYear:"11.º",group:"humanities",icon:"◇"},

  {id:"drawing-a",name:"Desenho A",codes:["706"],examYear:"12.º",group:"arts",icon:"✎"},
  {id:"descriptive-geometry-a",name:"Geometria Descritiva A",codes:["708"],examYear:"11.º",group:"arts",icon:"△"}
];

export const AVAILABLE_SUBJECT_IDS=SECONDARY_EXAM_SUBJECTS.filter(subject=>subject.available).map(subject=>subject.id);

export function examCodesLabel(subject){
  return subject.codes.join(" / ");
}
