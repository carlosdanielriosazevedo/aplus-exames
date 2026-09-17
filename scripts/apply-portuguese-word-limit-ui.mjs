import {readFileSync,writeFileSync} from "node:fs";

const pagePath=new URL("../app/page.js",import.meta.url);
const cssPath=new URL("../app/globals.css",import.meta.url);
let page=readFileSync(pagePath,"utf8");
let css=readFileSync(cssPath,"utf8");

const importNeedle='import {PORTUGUESE_RUBRIC_EVIDENCE,assessPortugueseRubricObservation,buildAdaptivePortugueseMission,buildPortugueseDiagnostic,gradePortugueseResponse,portugueseCoverage,portugueseRubricGuidance,restorePortugueseRubricEvidence} from "./lib/portugueseEngine";';
const wordLimitImport='import {portugueseWordLimitFeedback} from "./lib/portugueseWordLimit";';
if(!page.includes(wordLimitImport)){
  if(!page.includes(importNeedle))throw new Error("Portuguese engine import not found; word-limit UI patch aborted.");
  page=page.replace(importNeedle,`${importNeedle}\n${wordLimitImport}`);
}

const stateNeedle='  const rubricGuidance=feedback&&!feedback.final&&feedback.rubricCompleted?portugueseRubricGuidance(feedback):null;';
const stateReplacement=`${stateNeedle}\n  const wordLimitFeedback=!isChoice&&!isShort?portugueseWordLimitFeedback(item,answer):null;`;
if(!page.includes('const wordLimitFeedback=!isChoice&&!isShort?portugueseWordLimitFeedback(item,answer):null;')){
  if(!page.includes(stateNeedle))throw new Error("Portuguese rubric state anchor not found; word-limit UI patch aborted.");
  page=page.replace(stateNeedle,stateReplacement);
}

const oldCounter='<small className="portugueseWordCount">{String(answer??"").trim()?String(answer).trim().split(/\\s+/).length:0} palavras · recomendado: {item.wordLimit.min}–{item.wordLimit.max}</small>';
const newCounter='<div className={`portugueseWordCount ${wordLimitFeedback.status}`}><b>{wordLimitFeedback.label}</b><span>{wordLimitFeedback.count} palavras · pedido: {wordLimitFeedback.min}–{wordLimitFeedback.max}</span>{wordLimitFeedback.caution&&<small>{wordLimitFeedback.caution}</small>}</div>';
if(!page.includes(newCounter)){
  if(!page.includes(oldCounter))throw new Error("Portuguese word counter anchor not found; word-limit UI patch aborted.");
  page=page.replace(oldCounter,newCounter);
}

const marker="/* Portuguese word-limit feedback */";
if(!css.includes(marker)){
  css+=`\n${marker}\n.portugueseWordCount{display:grid;grid-template-columns:1fr auto;gap:3px 12px;align-items:center;margin-top:8px;padding:10px 12px;border:1px solid #dfe3ea;border-radius:11px;background:#f8f9fb;color:#536078}.portugueseWordCount b{font-size:13px;color:#344057}.portugueseWordCount span{font-size:12px;font-weight:800}.portugueseWordCount small{grid-column:1/-1;font-size:11px;line-height:1.35;color:#657087}.portugueseWordCount.below,.portugueseWordCount.above{border-color:#efc4a0;background:#fff8f1}.portugueseWordCount.below b,.portugueseWordCount.above b{color:#9a4e13}.portugueseWordCount.within{border-color:#b9dcc9;background:#f3faf6}.portugueseWordCount.within b{color:#216344}.portugueseWordCount.empty b{color:#657087}@media(max-width:760px){.portugueseWordCount{grid-template-columns:1fr}.portugueseWordCount span{font-size:11px}}\n`;
}

writeFileSync(pagePath,page);
writeFileSync(cssPath,css);
console.log("✓ Portuguese word-limit UI applied: below / within / above states with content warning");
