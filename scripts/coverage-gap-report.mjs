
import {
  TAXONOMY,MICROCOMPETENCIES,QUESTION_BANK
} from "../app/data/content.js";

const rows=MICROCOMPETENCIES.map(mc=>{
  const t=TAXONOMY.find(x=>x.id===mc.themeId);
  const items=QUESTION_BANK.filter(q=>q.microcompetencyId===mc.id);
  const mission=items.filter(q=>q.contexts?.includes("mission"));
  const training=items.filter(q=>q.contexts?.includes("training"));
  const exam=items.filter(q=>q.contexts?.includes("exam"));
  const diagnostic=items.filter(q=>q.contexts?.includes("diagnostic"));
  return {
    id:mc.id,year:t?.year,theme:t?.short,themeId:mc.themeId,focus:mc.label,
    relevance:t?.relevance||0,
    total:items.length,
    mission:mission.length,
    missionSigs:new Set(mission.map(q=>q.signature||q.id)).size,
    training:training.length,exam:exam.length,diagnostic:diagnostic.length
  };
});

const critical=rows.filter(x=>x.relevance>=4);
const gaps=critical.filter(x=>x.missionSigs<2)
  .sort((a,b)=>a.missionSigs-b.missionSigs||b.relevance-a.relevance||a.id.localeCompare(b.id));

console.log(`Total microcompetências: ${rows.length}`);
console.log(`Críticas: ${critical.length}`);
console.log(`Críticas com >=2 evidências mission no corpus: ${critical.length-gaps.length}/${critical.length}`);
console.log(`Gaps críticos: ${gaps.length}`);
for(const x of gaps){
  console.log(`${x.id}\t${x.year}\t${x.theme}\t${x.focus}\tmission=${x.mission}\tsigs=${x.missionSigs}\ttraining=${x.training}\texam=${x.exam}`);
}

console.log("\nMicrocompetências sem qualquer questão:");
for(const x of rows.filter(x=>x.total===0))console.log(`${x.id}\t${x.theme}\t${x.focus}`);

console.log("\nTemas sem treino:");
for(const t of TAXONOMY){
  const n=QUESTION_BANK.filter(q=>q.themeId===t.id&&q.contexts?.includes("training")).length;
  if(!n)console.log(`${t.id}\t${t.short}`);
}
