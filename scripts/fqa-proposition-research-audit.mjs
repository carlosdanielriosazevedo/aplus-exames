// Side-by-side offline exploratory diagnostics, NEVER pedagogical accuracy.
// All examples are author-written development data; labels are not teacher awards.
import {OPEN_RESPONSE_WAVE4_CASES} from "../app/data/openResponseCalibrationBankWave4.js";
import {OPEN_RESPONSE_WAVE5_CASES} from "../app/data/openResponseCalibrationBankWave5.js";
import {FQA_SHADOW_RESEARCH_WAVE2} from "../app/data/fqaShadowResearchWave2.js";
import {inspectScientificRelations} from "./lib/physicsChemistryShadowRelations.mjs";
import {extractScientificEvidence} from "./lib/fqaPropositionShadow.mjs";
const rows=[...OPEN_RESPONSE_WAVE4_CASES,...OPEN_RESPONSE_WAVE5_CASES].filter(x=>x.subject==="physics-chemistry-a")
  .concat(FQA_SHADOW_RESEARCH_WAVE2);
if(rows.length!==105)throw Error("Expected 105 developer fixtures");
const output={total:rows.length,source:"DEVELOPMENT_ONLY_NOT_HOLDOUT",pedagogicalAccuracy:null,
  byProfile:{},byItem:{},falseEvidenceSignals:[]};
for(const [index,row] of rows.entries()){
 const original=inspectScientificRelations(row.itemId,row.response),next=extractScientificEvidence(row.itemId,row.response);
 if(next.points!==null||next.score!==null||next.scoringAuthorized!==false)throw Error("Unsafe scoring at "+index);
 const profile=row.profile??"unknown";
 for(const [key,map] of [[profile,output.byProfile],[row.itemId,output.byItem]]){
  const o=map[key]??={n:0,oldCandidate:0,newLinked:0,contradiction:0,negationRisk:0};
  o.n++;o.oldCandidate+=Number(original.status==="candidate-relations");
  o.newLinked+=Number(next.linkedFacets.length>=2&&next.risk==="NO_OBVIOUS_CONTRADICTION");
  o.contradiction+=Number(next.risk==="CONTRADICTION_SIGNAL");
  o.negationRisk+=Number(next.risk==="NEGATION_NEEDS_REVIEW");
 }
 if(["contradiction","negation","keyword-soup","injection","irrelevant"].includes(profile) &&
   next.linkedFacets.length>=2&&next.risk==="NO_OBVIOUS_CONTRADICTION")
   output.falseEvidenceSignals.push({index,itemId:row.itemId,profile,linkedFacets:next.linkedFacets});
}
console.log(JSON.stringify(output,null,2));
// This gate is about research safety only. Labels are developer-authored and cannot validate grades.
if(output.falseEvidenceSignals.length)process.exitCode=1;
