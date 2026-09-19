import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {PORTUGUESE_YEAR_FOCUS,PORTUGUESE_COMPETENCIES,resolvePortugueseCompetencyId} from "../app/data/portugueseFoundation.js";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {PORTUGUESE_ASSESSMENT_POLICY,buildPortugueseCriterionEvidence,summarizePortugueseCriterionEvidence} from "../app/data/portugueseAssessmentPolicy.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name));
const PORTUGUESE_ITEMS=applyPortugueseRubricObservations(packFiles.flatMap(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")).items));

assert.equal(PORTUGUESE_ITEMS.length,250,"O runtime de Português deve carregar os 250 itens foundation.");
assert.equal(new Set(PORTUGUESE_ITEMS.map(item=>item.id)).size,300,"Os IDs devem ser únicos.");
assert.deepEqual(PORTUGUESE_YEAR_FOCUS.map(f=>f.year),["10.º","11.º","12.º"]);
assert.equal(PORTUGUESE_COMPETENCIES.filter(c=>c.writtenExam).length,16);

const writtenDomains=["leitura","educacao-literaria","escrita","gramatica"];
for(const year of ["10.º","11.º","12.º"]){
  const yearItems=PORTUGUESE_ITEMS.filter(item=>item.year===year);
  assert.ok(yearItems.length>=55,year+": profundidade insuficiente.");
  for(const domain of writtenDomains)assert.ok(yearItems.some(item=>item.domain===domain),year+": falta "+domain+".");
}
for(const item of PORTUGUESE_ITEMS){
  assert.ok(PORTUGUESE_COMPETENCIES.some(c=>c.id===resolvePortugueseCompetencyId(item.competencyId)&&c.writtenExam),item.id+": competência fora do exame escrito.");
  if(["restricted-response","extended-writing"].includes(item.responseType)){
    assert.equal(item.gradingMode,"rubric-assisted-provisional",item.id+": resposta aberta não pode ter nota final automática.");
    const evidence=buildPortugueseCriterionEvidence(item);
    assert.ok(evidence.length>0,item.id+": falta decomposição por critérios observáveis.");
    const summary=summarizePortugueseCriterionEvidence(evidence);
    assert.equal(summary.finalGrade,null);
    assert.equal(summary.provisional,true);
  }
}
assert.equal(PORTUGUESE_ASSESSMENT_POLICY.authority,"IAVE");
assert.equal(PORTUGUESE_ASSESSMENT_POLICY.finalAutoGradeForOpenResponses,false);
console.log("✓ Portuguese quality gate: 250 itens · 3 anos · 4 domínios escritos · evidência por critério sem nota final automática");
