import {readFileSync,readdirSync} from 'node:fs';
import {PORTUGUESE_COMPETENCIES} from '../app/data/portugueseFoundation.js';

const contentDir=new URL('../content/vnext/portuguese/foundation/',import.meta.url);
const files=readdirSync(contentDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name));
const items=files.flatMap(name=>JSON.parse(readFileSync(new URL(name,contentDir),'utf8')).items||[]);
const written=PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam);
const years=['10.º','11.º','12.º'];

const rows=[];
for(const competency of written){
  const relevant=items.filter(item=>item.competencyId===competency.id);
  const byYear=Object.fromEntries(years.map(year=>[year,relevant.filter(item=>item.year===year).length]));
  const minYear=Math.min(...Object.values(byYear));
  const responseTypes=new Set(relevant.map(item=>item.responseType));
  const cognitive=new Set(relevant.map(item=>item.cognitive));
  rows.push({
    competencyId:competency.id,
    domain:competency.domain,
    total:relevant.length,
    byYear,
    minYear,
    responseTypeVariety:responseTypes.size,
    cognitiveVariety:cognitive.size,
    priorityScore:(minYear*4)+(relevant.length)+(responseTypes.size*2)+cognitive.size
  });
}

rows.sort((a,b)=>a.priorityScore-b.priorityScore||a.total-b.total||a.competencyId.localeCompare(b.competencyId));

const target=200;
const remaining=Math.max(0,target-items.length);
const recommendation={
  currentItems:items.length,
  targetItems:target,
  remaining,
  principle:'priorizar menor cobertura por ano, depois menor volume e menor variedade de resposta/operação cognitiva',
  priorities:rows
};

console.log(JSON.stringify(recommendation,null,2));
