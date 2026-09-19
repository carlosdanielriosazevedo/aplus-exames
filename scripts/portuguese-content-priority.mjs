import {readFileSync,readdirSync} from 'node:fs';
import {PORTUGUESE_COMPETENCIES,resolvePortugueseCompetencyId} from '../app/data/portugueseFoundation.js';

const contentDir=new URL('../content/vnext/portuguese/foundation/',import.meta.url);
const files=readdirSync(contentDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name));
const items=files.flatMap(name=>JSON.parse(readFileSync(new URL(name,contentDir),'utf8')).items||[]);
const written=PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam);
const years=['10.º','11.º','12.º'];
const target=300;

const rows=[];
for(const competency of written){
  const relevant=items.filter(item=>resolvePortugueseCompetencyId(item.competencyId)===competency.id);
  const byYear=Object.fromEntries(years.map(year=>[year,relevant.filter(item=>item.year===year).length]));
  const minYear=Math.min(...Object.values(byYear));
  const responseTypes=new Set(relevant.map(item=>item.responseType));
  const cognitive=new Set(relevant.map(item=>item.cognitive));
  const shortOrOpen=relevant.filter(item=>item.responseType!== 'multiple-choice').length;
  rows.push({competencyId:competency.id,domain:competency.domain,total:relevant.length,byYear,minYear,responseTypeVariety:responseTypes.size,cognitiveVariety:cognitive.size,nonMultipleChoice:shortOrOpen,priorityScore:(minYear*5)+relevant.length+(responseTypes.size*3)+(cognitive.size*2)+Math.min(shortOrOpen,4)});
}
rows.sort((a,b)=>a.priorityScore-b.priorityScore||a.total-b.total||a.competencyId.localeCompare(b.competencyId));

const domainCounts=Object.fromEntries(['leitura','educacao-literaria','escrita','gramatica'].map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
const yearCounts=Object.fromEntries(years.map(year=>[year,items.filter(item=>item.year===year).length]));
const remaining=Math.max(0,target-items.length);
const wavePlan=[225,250,275,300].filter(n=>n>items.length).map((n,index)=>({wave:index+11,targetAfterWave:n,newItems:n-Math.max(items.length,index? [225,250,275,300][index-1]:items.length)}));

console.log(JSON.stringify({currentItems:items.length,targetItems:target,remaining,domainCounts,yearCounts,guardrails:{curriculum:'DGE — Aprendizagens Essenciais vigentes do 10.º, 11.º e 12.º',assessment:'IAVE — Prova 639 e critérios de classificação',sourcePolicy:'original-only',editorialStatus:'prototype',finalAutoGradeForOpenResponses:false},principle:'preencher primeiro lacunas por ano e competência; depois diversidade de formato e operação cognitiva; não criar volume artificial',suggestedMilestones:[225,250,275,300],priorities:rows},null,2));
