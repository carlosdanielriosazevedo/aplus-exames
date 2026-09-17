import {readFileSync,writeFileSync} from "node:fs";

const pagePath=new URL("../app/page.js",import.meta.url);
const cssPath=new URL("../app/globals.css",import.meta.url);
let page=readFileSync(pagePath,"utf8");
let css=readFileSync(cssPath,"utf8");

const engineImport='import {PORTUGUESE_RUBRIC_EVIDENCE,assessPortugueseRubricObservation,buildAdaptivePortugueseMission,buildPortugueseDiagnostic,gradePortugueseResponse,portugueseCoverage,portugueseRubricGuidance,restorePortugueseRubricEvidence} from "./lib/portugueseEngine";';
const guidanceImport='import {portugueseObservationGuidance} from "./lib/portugueseObservationGuidance";';
if(!page.includes(guidanceImport)){
  if(!page.includes(engineImport))throw new Error("Portuguese engine import not found; observation-guidance UI patch aborted.");
  page=page.replace(engineImport,`${engineImport}\n${guidanceImport}`);
}

const oldPrompt='<span className="guidedRubricPrompt">Na tua resposta, que evidência encontras desta observação?</span><div className="guidedRubricChoices">';
const newPrompt='<span className="guidedRubricPrompt">Na tua resposta, que evidência encontras desta observação?</span>{(()=>{const guidance=portugueseObservationGuidance(item,criterion,observation);return <div className="rubricEvidenceGuide"><div><b>Conta como evidência</b><span>{guidance.counts}</span></div><div><b>Não chega</b><span>{guidance.notEnough}</span></div></div>})()}<div className="guidedRubricChoices">';
if(!page.includes(newPrompt)){
  if(!page.includes(oldPrompt))throw new Error("Guided rubric prompt anchor not found; observation-guidance UI patch aborted.");
  page=page.replace(oldPrompt,newPrompt);
}

const marker="/* Portuguese observation guidance */";
if(!css.includes(marker)){
  css+=`\n${marker}\n.rubricEvidenceGuide{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.rubricEvidenceGuide>div{padding:10px 11px;border:1px solid #e3e6ec;border-radius:10px;background:#f8f9fb}.rubricEvidenceGuide>div:first-child{border-color:#bedcc9;background:#f3faf6}.rubricEvidenceGuide>div:last-child{border-color:#efd5bb;background:#fff9f3}.rubricEvidenceGuide b,.rubricEvidenceGuide span{display:block}.rubricEvidenceGuide b{font-size:12px;color:#344057}.rubricEvidenceGuide span{margin-top:4px;font-size:12px;line-height:1.4;color:#657087}@media(max-width:760px){.rubricEvidenceGuide{grid-template-columns:1fr}}\n`;
}

writeFileSync(pagePath,page);
writeFileSync(cssPath,css);
console.log("✓ Portuguese observation guidance UI applied: positive evidence vs insufficient evidence");
