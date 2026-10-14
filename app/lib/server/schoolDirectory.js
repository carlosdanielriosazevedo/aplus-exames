import {createHash} from "node:crypto";

export const SCHOOL_DIRECTORY_SOURCE={
  authority:"AGSE/IGeFE · Pesquisa da Rede Escolar (GesEdu)",
  url:"https://www.gesedu.pt/PesquisaRede/",
  featureLayer:"https://services-eu1.arcgis.com/pXkWEYl9JkoX4UHe/arcgis/rest/services/RedeEscolar_tab/FeatureServer/0",
  criteria:"Estabelecimentos cuja oferta inclui Secundário ou Profissional"
};

const PAGE_SIZE=2000;
const MIN_EXPECTED_SCHOOLS=1000;

function clean(value,max=160){
  return String(value??"").replace(/[\u0000-\u001f\u007f]/gu," ").replace(/\s+/gu," ").trim().slice(0,max);
}

function schoolId({code,name,municipality,district}){
  const key=[code||"",name,municipality,district].map(value=>clean(value,160).normalize("NFKC").toLocaleLowerCase("pt-PT")).join("|");
  return `pt-school-${createHash("sha256").update(key).digest("hex").slice(0,16)}`;
}

export function normalizeSchoolFeatures(features=[]){
  const byId=new Map();
  for(const feature of features){
    const a=feature?.attributes||{};
    const name=clean(a.NOME,160);
    const municipality=clean(a.CONCELHO,100);
    const district=clean(a.DISTRITO,100);
    const code=clean(a.CODUOME,32)||null;
    if(!name||!municipality||!district)continue;
    const row={id:schoolId({code,name,municipality,district}),name,municipality,district};
    if(code)row.code=code;
    byId.set(row.id,row);
  }
  return [...byId.values()].sort((a,b)=>a.name.localeCompare(b.name,"pt-PT",{sensitivity:"base"})||a.municipality.localeCompare(b.municipality,"pt-PT",{sensitivity:"base"}));
}

async function fetchSchoolPage(offset){
  const url=new URL(`${SCHOOL_DIRECTORY_SOURCE.featureLayer}/query`);
  url.searchParams.set("where","CICLO LIKE '%Secundário%' OR CICLO LIKE '%Profissional%'");
  url.searchParams.set("outFields","OBJECTID,CODUOME,NOME,CONCELHO,DISTRITO");
  url.searchParams.set("orderByFields","NOME ASC,CONCELHO ASC");
  url.searchParams.set("returnGeometry","false");
  url.searchParams.set("resultOffset",String(offset));
  url.searchParams.set("resultRecordCount",String(PAGE_SIZE));
  url.searchParams.set("f","json");
  const response=await fetch(url,{next:{revalidate:86400}});
  if(!response.ok)throw new Error("SCHOOL_SOURCE_HTTP_ERROR");
  const body=await response.json();
  if(body?.error||!Array.isArray(body?.features))throw new Error("SCHOOL_SOURCE_INVALID_RESPONSE");
  return body;
}

export async function fetchOfficialSecondarySchools(){
  const features=[];
  let offset=0;
  for(let page=0;page<10;page+=1){
    const body=await fetchSchoolPage(offset);
    features.push(...body.features);
    if(!body.exceededTransferLimit&&body.features.length<PAGE_SIZE)break;
    if(body.features.length===0)break;
    offset+=body.features.length;
  }
  const schools=normalizeSchoolFeatures(features);
  if(schools.length<MIN_EXPECTED_SCHOOLS)throw new Error("SCHOOL_DIRECTORY_INCOMPLETE");
  return schools;
}
