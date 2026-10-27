// Opt-in pilot executor. Defaults to DRY RUN. No student data or production imports.
// Usage: node scripts/fqa-context-pilot.mjs --dry-run
// Live requests require --live plus AI_GATEWAY_API_KEY, MODEL_ID and PILOT_APPROVED=YES.
// Seven synthetic cases; $0.10 is an application-side reservation, NOT a billing hard cap.
import {performance} from "node:perf_hooks";
import {FQA_SHADOW_RESEARCH_WAVE2} from "../app/data/fqaShadowResearchWave2.js";
import {makeContextualReviewRequest,validateContextualReview} from "./lib/fqaContextualShadow.mjs";
const budget=0.10;
const modelId=process.env.MODEL_ID;
const priceInput=process.env.PRICE_INPUT_PER_MILLION===undefined?NaN:Number(process.env.PRICE_INPUT_PER_MILLION);
const priceOutput=process.env.PRICE_OUTPUT_PER_MILLION===undefined?NaN:Number(process.env.PRICE_OUTPUT_PER_MILLION);
const live=process.argv.includes("--live");
if(live&&(process.env.PILOT_APPROVED!=="YES"||!process.env.AI_GATEWAY_API_KEY||!modelId||process.env.GATEWAY_KEY_BUDGET_CONFIRMED!=="YES"))
 throw Error("Live pilot requires approval, verified MODEL_ID, dedicated gateway key and confirmed server-side budget");
if(live&&(!Number.isFinite(priceInput)||priceInput<=0||!Number.isFinite(priceOutput)||priceOutput<=0))
 throw Error("Specify verified current input/output token prices in USD per million");
// Verify model availability and unit prices against the live public catalogue before any paid call.
if(live){
 const catalogueResponse=await fetch("https://ai-gateway.vercel.sh/v1/models",{signal:AbortSignal.timeout(10000)});
 if(!catalogueResponse.ok)throw Error("Model catalogue inaccessible");
 const catalogue=await catalogueResponse.json();
 const entry=catalogue.data?.find(x=>x.id===modelId);
 if(!entry)throw Error("MODEL_ID not present in current catalogue");
 const actualInput=Number(entry.pricing?.input)*1e6;
 const actualOutput=Number(entry.pricing?.output)*1e6;
 if(!Number.isFinite(actualInput)||!Number.isFinite(actualOutput)||
    Math.abs(actualInput-priceInput)>1e-6||Math.abs(actualOutput-priceOutput)>1e-6)
  throw Error("Quoted model prices differ from live catalogue; aborting");
}
const sample=["ELEM","MAT","ENE","MEC","WAV","EQ","AQ"].map(x=>
 FQA_SHADOW_RESEARCH_WAVE2.find(r=>r.itemId==="FQA-R-"+x+"-01"&&r.profile==="paraphrase"));
if(sample.some(x=>!x)||sample.length!==7)throw Error("Fixture set changed");
let estimatedSpent=0;const results=[];
for(const row of sample){
 const request=makeContextualReviewRequest(row.itemId,row.response);
 if(!live){results.push({itemId:row.itemId,status:"DRY_RUN_NOT_EVALUATED",requestSize:JSON.stringify(request).length});continue;}
 // Local reservation only. Billing budgets are soft caps; use a separately restricted API key.
 const maxInputTokens=3000,maxOutputTokens=1200;
 const reserve=(maxInputTokens*priceInput+maxOutputTokens*priceOutput)/1e6;
 if(estimatedSpent+reserve>budget){results.push({itemId:row.itemId,status:"BUDGET_STOP"});break;}
 estimatedSpent+=reserve;
 const started=performance.now();
 try{
  const response=await fetch("https://ai-gateway.vercel.sh/v1/chat/completions",{
   method:"POST",headers:{"Authorization":"Bearer "+process.env.AI_GATEWAY_API_KEY,"Content-Type":"application/json"},
   body:JSON.stringify({model:modelId,messages:[
    {role:"system",content:request.instructions.join("\n")},
    {role:"user",content:JSON.stringify({rubric:request.rubric,studentResponse:request.studentResponse})}
   ],max_tokens:maxOutputTokens,temperature:0}),
   signal:AbortSignal.timeout(20000)
  });
  if(!response.ok)throw Error("Gateway HTTP "+response.status);
  const json=await response.json();
  const verdict=validateContextualReview(row.itemId,row.response,json.choices?.[0]?.message?.content);
  const usage=json.usage||{};
  const measured=Number.isFinite(usage.prompt_tokens)&&Number.isFinite(usage.completion_tokens)?
    (usage.prompt_tokens*priceInput+usage.completion_tokens*priceOutput)/1e6:null;
  results.push({itemId:row.itemId,status:verdict.status,reason:verdict.reason??null,
   latencyMs:Math.round(performance.now()-started),inputTokens:usage.prompt_tokens??null,
   outputTokens:usage.completion_tokens??null,estimatedUsd:measured,
   judgments:verdict.assessments?.map(a=>({criterionIndex:a.criterionIndex,verdict:a.verdict}))??[]});
 }catch(e){results.push({itemId:row.itemId,status:"ABSTAINED",reason:String(e.message).slice(0,100),
   latencyMs:Math.round(performance.now()-started)});}
}
const report={status:live?"EXPERIMENT_ONLY":"DRY_RUN",model:live?modelId:null,
 sampleType:"DEVELOPER_SYNTHETIC_NOT_HOLDOUT",sampleCount:sample.length,
 localReservationTargetUsd:budget,localReservedEstimatedUsd:estimatedSpent,serverSideBudgetConfirmationProvided:live,results};
console.log(JSON.stringify(report,null,2));
// No disk writes of student responses, credentials, or model outputs. No scoring.
