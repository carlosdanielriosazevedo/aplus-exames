import {TAXONOMY,QUESTION_BANK} from '../app/data/content.js';
const rows=[];
for(const t of TAXONOMY.filter(t=>t.relevance>=4)){
 for(const f of t.focus){
  const items=QUESTION_BANK.filter(q=>q.themeId===t.id && q.focus===f && q.contexts?.includes('mission'));
  rows.push({theme:t.short,themeId:t.id,focus:f,count:items.length,ids:items.map(x=>x.id)});
 }
}
rows.sort((a,b)=>a.count-b.count || a.theme.localeCompare(b.theme));
console.log(JSON.stringify(rows,null,2));
