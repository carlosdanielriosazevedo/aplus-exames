import {OPEN_RESPONSE_WAVE5_CASES} from "../app/data/openResponseCalibrationBankWave5.js";
import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

function ratio(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return result.provisionalPoints/result.maxPoints;
  if(Number.isFinite(result?.points)&&Number(result?.maxPoints)>0)return result.points/result.maxPoints;
  return 0;
}
function grade(row,response){
  const item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Missing invariant fixture: "+row.subject+"/"+row.itemId);
  return row.subject==="portuguese"?gradePortugueseResponse(item,response):gradePhysicsChemistryResponse(item,response);
}
function accentless(value){
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[«»“”"'.,;:!?()[\]{}]/g," ").replace(/\s+/g," ").trim();
}
function addNoise(value){return String(value).trim()+" Além disso, este tema faz parte da disciplina e pode aparecer numa prova.";}
const contradictionByItem={
  "PT639-FND-311":"No entanto, a ordem dos elementos não influencia a clareza nem a compreensão.",
  "PT639-FND-313":"No entanto, essas razões não sustentam nem justificam a tese.",
  "PT639-FND-315":"Na verdade, «por isso» estabelece oposição e não uma consequência.",
  "PT639-FND-317":"Na verdade, o pronome refere-se a Leonor e não ao relatório.",
  "PT639-FND-319":"Na verdade, trata-se de complemento oblíquo e não de predicativo do complemento direto.",
  "PT639-FND-322":"Na verdade, a primeira oração é causal e a segunda é completiva.",
  "FQA-R-ELEM-01":"No entanto, as riscas não resultam de transições entre níveis de energia.",
  "FQA-R-MAT-01":"No entanto, não é necessário usar pipeta nem ajustar o menisco.",
  "FQA-R-ENE-01":"No entanto, não é necessário medir a velocidade nem a altura.",
  "FQA-R-MEC-01":"No entanto, a aceleração corresponde à área e o deslocamento ao declive.",
  "FQA-R-WAV-01":"No entanto, aumentar a distância não reduz a influência relativa da incerteza.",
  "FQA-R-EQ-01":"No entanto, o catalisador aumenta Kc e altera a composição de equilíbrio.",
  "FQA-R-AQ-01":"No entanto, o ponto de equivalência é sempre pH 7."
};

const seeds=OPEN_RESPONSE_WAVE5_CASES.filter(row=>row.profile==="student-shorthand");
const failures=[],rows=[];
for(const row of seeds){
  const base=grade(row,row.response);
  const plain=grade(row,accentless(row.response));
  const noisy=grade(row,addNoise(row.response));
  const contradictionText=contradictionByItem[row.itemId];
  if(!contradictionText)throw new Error("Missing contradiction fixture for "+row.itemId);
  const contradicted=grade(row,row.response+" "+contradictionText);
  const corrected=grade(row,row.response+" "+contradictionText+" Corrigindo: "+row.response);
  const scores={base:ratio(base),accentless:ratio(plain),noisy:ratio(noisy),contradicted:ratio(contradicted),corrected:ratio(corrected)};
  rows.push({...row,scores});
  if(Math.abs(scores.accentless-scores.base)>.12)failures.push(`${row.subject}/${row.itemId}: removing accents/punctuation moved score ${Math.round((scores.accentless-scores.base)*100)}pp`);
  if(scores.noisy>scores.base+.08)failures.push(`${row.subject}/${row.itemId}: irrelevant padding improved score by more than 8pp`);
  if(!(scores.contradicted<=scores.base-.08||contradicted?.requiresReview||contradicted?.feedbackSummary?.errorDiagnosis?.code==="conceptual_contradiction"))failures.push(`${row.subject}/${row.itemId}: explicit contradiction did not reduce score or trigger review/diagnosis`);
  if(scores.corrected+0.001<scores.contradicted)failures.push(`${row.subject}/${row.itemId}: explicit self-correction scored below the contradicted version`);
}
const summary={invariantCases:rows.length*4,seedAnswers:rows.length,totalProtectedCases:315+rows.length*4,rows,failures};
console.log("=== RESPONSE ANALYSIS CALIBRATION V6 · METAMORPHIC INVARIANTS ===");
console.log("Seed answers: "+rows.length);
console.log("Invariant comparisons: "+summary.invariantCases);
console.log("Total protected scenarios: "+summary.totalProtectedCases);
for(const row of rows){
  const s=row.scores;
  console.log(`  ${row.subject.padEnd(21)} ${row.itemId.padEnd(16)} base ${Math.round(s.base*100)}% · plain ${Math.round(s.accentless*100)}% · noise ${Math.round(s.noisy*100)}% · contradiction ${Math.round(s.contradicted*100)}% · corrected ${Math.round(s.corrected*100)}%`);
}
await import("node:fs").then(({writeFileSync})=>writeFileSync(new URL("../response-analysis-calibration-v6.json",import.meta.url),JSON.stringify(summary,null,2)));
if(failures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V6 FAILED ("+failures.length+" issues)");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V6 PASSED");
