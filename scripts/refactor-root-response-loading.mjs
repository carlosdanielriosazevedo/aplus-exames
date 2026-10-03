import fs from "node:fs";

const path="app/page.js";
let source=fs.readFileSync(path,"utf8");

const oldImport=`import {
  responseType,isConstructedResponse,isResponseAnswered,completionFilledCount,
  expectedResponseLabel,studentResponseLabel,miniExamPointSummary,examScoreLabel,stepFeedback,gradeResponse
} from "./lib/constructedResponse";`;
const newImport=`import {
  responseType,isConstructedResponse,isResponseAnswered,completionFilledCount,
  expectedResponseLabel,studentResponseLabel,examScoreLabel,stepFeedback
} from "./lib/constructedResponseView";`;

if(!source.includes(oldImport))throw new Error("constructed response import block changed");
const miniUses=(source.match(/\bminiExamPointSummary\b/g)||[]).length;
if(miniUses!==1)throw new Error(`miniExamPointSummary has ${miniUses} occurrences; expected import-only usage`);
source=source.replace(oldImport,newImport);

const loaderAnchor=`let mathEngineModule=null;\nlet mathEnginePromise=null;`;
const lazyGrader=`let constructedResponseGraderPromise=null;
function gradeMathResponse(question,answer){
  if(!constructedResponseGraderPromise)constructedResponseGraderPromise=import("./lib/constructedResponse");
  return constructedResponseGraderPromise.then(module=>module.gradeResponse(question,answer));
}

let mathEngineModule=null;
let mathEnginePromise=null;`;
if(!source.includes(loaderAnchor))throw new Error("math engine loader anchor changed");
source=source.replace(loaderAnchor,lazyGrader);

const replacements=[
  [
    `function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(gradeResponse(current,sel))}`,
    `async function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(await gradeMathResponse(current,sel))}`
  ],
  [
    `function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(gradeResponse(q,sel))}`,
    `async function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(await gradeMathResponse(q,sel))}`
  ]
];
for(const [before,after] of replacements){
  if(!source.includes(before))throw new Error(`submit handler not found: ${before}`);
  source=source.replace(before,after);
}

if(/from "\.\/lib\/constructedResponse";/.test(source))throw new Error("constructedResponse remains statically imported by app/page.js");
const dynamicUses=(source.match(/gradeMathResponse\(/g)||[]).length;
if(dynamicUses!==3)throw new Error(`unexpected gradeMathResponse occurrence count ${dynamicUses}`);

fs.writeFileSync(path,source);
console.log("✓ app/page.js now keeps constructed-response grading behind dynamic import");
