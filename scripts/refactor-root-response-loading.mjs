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
if(miniUses!==3)throw new Error(`miniExamPointSummary has ${miniUses} occurrences; expected import plus two legacy fallbacks`);
source=source.replace(oldImport,newImport);

const loaderAnchor=`let mathEngineModule=null;\nlet mathEnginePromise=null;`;
const lazyGrader=`let constructedResponseGraderPromise=null;
function loadConstructedResponseGrader(){
  if(!constructedResponseGraderPromise)constructedResponseGraderPromise=import("./lib/constructedResponse");
  return constructedResponseGraderPromise;
}
function gradeMathResponse(question,answer){
  return loadConstructedResponseGrader().then(module=>module.gradeResponse(question,answer));
}
function legacyMiniExamPointSummary(questions,answers){
  return loadConstructedResponseGrader().then(module=>module.miniExamPointSummary(questions,answers));
}

let mathEngineModule=null;
let mathEnginePromise=null;`;
if(!source.includes(loaderAnchor))throw new Error("math engine loader anchor changed");
source=source.replace(loaderAnchor,lazyGrader);

const submitReplacements=[
  [
    `function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(gradeResponse(current,sel))}`,
    `async function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(await gradeMathResponse(current,sel))}`
  ],
  [
    `function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(gradeResponse(q,sel))}`,
    `async function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(await gradeMathResponse(q,sel))}`
  ]
];
for(const [before,after] of submitReplacements){
  if(!source.includes(before))throw new Error(`submit handler not found: ${before}`);
  source=source.replace(before,after);
}

const resultBefore=`function MiniExamResult({s,setS,go}){
  const r=s.lastExam;
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há resultado.</h1></Shell>;
  const questions=r.questionIds.map(questionById).filter(Boolean);
  const fallbackSummary=miniExamPointSummary(questions,r.answers);
  const itemResults=r.itemResults||fallbackSummary.results;
  const earnedPoints=r.earnedPoints??fallbackSummary.earnedPoints;
  const maxPoints=r.maxPoints??fallbackSummary.maxPoints;`;
const resultAfter=`function MiniExamResult({s,setS,go}){
  const r=s.lastExam;
  const [fallbackSummary,setFallbackSummary]=useState(null);
  const questions=useMemo(()=>r?.questionIds?.map(questionById).filter(Boolean)||[],[r]);
  useEffect(()=>{
    let live=true;
    if(r&&!r.itemResults)legacyMiniExamPointSummary(questions,r.answers).then(summary=>{if(live)setFallbackSummary(summary)});
    return ()=>{live=false};
  },[r,questions]);
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há resultado.</h1></Shell>;
  if(!r.itemResults&&!fallbackSummary)return <Shell><Logo/><p className="muted">A recuperar a avaliação deste Mini-exame…</p></Shell>;
  const itemResults=r.itemResults||fallbackSummary.results;
  const earnedPoints=r.earnedPoints??fallbackSummary.earnedPoints;
  const maxPoints=r.maxPoints??fallbackSummary.maxPoints;`;
if(!source.includes(resultBefore))throw new Error("MiniExamResult fallback block changed");
source=source.replace(resultBefore,resultAfter);

const reviewBefore=`function MiniExamCompletedReview({s,setS,go}){
  const r=s.lastExam;
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há um Mini-exame para rever.</h1></Shell>;
  const questions=r.questionIds.map(questionById).filter(Boolean);
  const fallbackSummary=miniExamPointSummary(questions,r.answers);
  const itemResults=r.itemResults||fallbackSummary.results;`;
const reviewAfter=`function MiniExamCompletedReview({s,setS,go}){
  const r=s.lastExam;
  const [fallbackSummary,setFallbackSummary]=useState(null);
  const questions=useMemo(()=>r?.questionIds?.map(questionById).filter(Boolean)||[],[r]);
  useEffect(()=>{
    let live=true;
    if(r&&!r.itemResults)legacyMiniExamPointSummary(questions,r.answers).then(summary=>{if(live)setFallbackSummary(summary)});
    return ()=>{live=false};
  },[r,questions]);
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há um Mini-exame para rever.</h1></Shell>;
  if(!r.itemResults&&!fallbackSummary)return <Shell><Logo/><p className="muted">A recuperar a avaliação deste Mini-exame…</p></Shell>;
  const itemResults=r.itemResults||fallbackSummary.results;`;
if(!source.includes(reviewBefore))throw new Error("MiniExamCompletedReview fallback block changed");
source=source.replace(reviewBefore,reviewAfter);

if(/from "\.\/lib\/constructedResponse";/.test(source))throw new Error("constructedResponse remains statically imported by app/page.js");
if(/\bminiExamPointSummary\b/.test(source))throw new Error("miniExamPointSummary remains statically referenced in app/page.js");
const dynamicUses=(source.match(/gradeMathResponse\(/g)||[]).length;
if(dynamicUses!==3)throw new Error(`unexpected gradeMathResponse occurrence count ${dynamicUses}`);

fs.writeFileSync(path,source);
console.log("✓ app/page.js keeps constructed-response grading and legacy mini-exam fallback behind dynamic import");
