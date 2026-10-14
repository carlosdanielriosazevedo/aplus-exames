// Canonical APProva+ school catalogue snapshot · 2026-10-14.
// Mainland: DGEEC InfoEscolas (Ensino Secundário). Açores: official regional public/professional/private directories.
// Madeira: official regional secondary/professional network, current PLACE directory and 2025/26 education statistics.
import schools0 from "./schools/aveiro.js";
import schools1 from "./schools/beja.js";
import schools2 from "./schools/braga.js";
import schools3 from "./schools/braganca.js";
import schools4 from "./schools/castelo-branco.js";
import schools5 from "./schools/coimbra.js";
import schools6 from "./schools/evora.js";
import schools7 from "./schools/faro.js";
import schools8 from "./schools/guarda.js";
import schools9 from "./schools/leiria.js";
import schools10 from "./schools/lisboa.js";
import schools11 from "./schools/portalegre.js";
import schools12 from "./schools/porto.js";
import schools13 from "./schools/santarem.js";
import schools14 from "./schools/setubal.js";
import schools15 from "./schools/viana-do-castelo.js";
import schools16 from "./schools/vila-real.js";
import schools17 from "./schools/viseu.js";
import schools18 from "./schools/acores.js";
import schools19 from "./schools/madeira.js";

export const SCHOOL_CATALOG=[
  ...schools0.map(row=>({...row,region:"Aveiro"})),
  ...schools1.map(row=>({...row,region:"Beja"})),
  ...schools2.map(row=>({...row,region:"Braga"})),
  ...schools3.map(row=>({...row,region:"Bragança"})),
  ...schools4.map(row=>({...row,region:"Castelo Branco"})),
  ...schools5.map(row=>({...row,region:"Coimbra"})),
  ...schools6.map(row=>({...row,region:"Évora"})),
  ...schools7.map(row=>({...row,region:"Faro"})),
  ...schools8.map(row=>({...row,region:"Guarda"})),
  ...schools9.map(row=>({...row,region:"Leiria"})),
  ...schools10.map(row=>({...row,region:"Lisboa"})),
  ...schools11.map(row=>({...row,region:"Portalegre"})),
  ...schools12.map(row=>({...row,region:"Porto"})),
  ...schools13.map(row=>({...row,region:"Santarém"})),
  ...schools14.map(row=>({...row,region:"Setúbal"})),
  ...schools15.map(row=>({...row,region:"Viana do Castelo"})),
  ...schools16.map(row=>({...row,region:"Vila Real"})),
  ...schools17.map(row=>({...row,region:"Viseu"})),
  ...schools18.map(row=>({...row,region:"Açores"})),
  ...schools19.map(row=>({...row,region:"Madeira"})),
];

const SCHOOL_BY_REGION=new Map();
for(const school of SCHOOL_CATALOG){
  const rows=SCHOOL_BY_REGION.get(school.region)||[];
  rows.push(school);
  SCHOOL_BY_REGION.set(school.region,rows);
}
for(const rows of SCHOOL_BY_REGION.values())rows.sort((a,b)=>a.municipality.localeCompare(b.municipality,"pt")||a.name.localeCompare(b.name,"pt"));

export function schoolsForRegion(region){return SCHOOL_BY_REGION.get(region)||[];}
export function isCanonicalSchool(region,name){return schoolsForRegion(region).some(row=>row.name===name);}
