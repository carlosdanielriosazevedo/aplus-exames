
import assert from "node:assert/strict";
import {QUESTION_BANK} from "../app/data/content.js";
import {emptyScores,missionCandidateQueue,dailyMissionPlan} from "../app/lib/engine.js";

const DAY=24*60*60*1000;
const now=Date.now();
const missionThemes=[...new Set(QUESTION_BANK.filter(q=>q.contexts?.includes("mission")).map(q=>q.themeId))];

function syntheticScore(domain=60,conf=55,daysAgo=4,contradictory=false){
  const base=now-daysAgo*DAY;
  const evidence=[
    {itemId:"s1",signature:"s1",correct:domain>=50,difficulty:2,cognitive:"Aplicação",source:"mission",at:base,signal:domain,strength:1},
    {itemId:"s2",signature:"s2",correct:domain>=45,difficulty:2,cognitive:"Interpretação",source:"diagnostic",at:base-2*DAY,signal:Math.max(15,Math.min(95,domain+4)),strength:1},
    {itemId:"s3",signature:"s3",correct:domain>=55,difficulty:3,cognitive:"Raciocínio",source:"mission",at:base-4*DAY,signal:Math.max(15,Math.min(95,domain-3)),strength:1}
  ];
  if(contradictory){
    evidence[0]={...evidence[0],correct:true,signal:90};
    evidence[1]={...evidence[1],correct:false,signal:20};
  }
  return {domain,conf,evidence};
}

function baseState(){
  return {
    goal:17,scores:emptyScores(),missionHistory:[],freeTrainingSignals:[],
    learningHypotheses:[],editorialOverrides:{},betaMode:"internal",
    profile:{schoolYear:"12.º",examTiming:"thisYear"}
  };
}

function seedMeasured(s,count=6,domain=65){
  missionThemes.slice(0,count).forEach((id,i)=>{
    s.scores[id]=syntheticScore(domain+i%3,55+i%10,3+i);
  });
  return s;
}

function candidateTypes(s){return missionCandidateQueue(s).map(x=>x.plan.type)}

let checks=0;
function check(name,fn){fn();checks++;console.log(`✓ ${name}`)}

check("fila ordenada por utilidade",()=>{
  const s=seedMeasured(baseState(),6);
  const q=missionCandidateQueue(s);
  assert.ok(q.length>=1);
  for(let i=1;i<q.length;i++)assert.ok(q[i-1].utility>=q[i].utility);
  assert.equal(dailyMissionPlan(s).decisionMeta.utility,q[0].utility);
});

check("não há duas calibrações consecutivas",()=>{
  const s=seedMeasured(baseState(),4);
  s.missionHistory=[{type:"calibration",themeId:missionThemes[0],at:now-3*60*60*1000}];
  assert.notEqual(dailyMissionPlan(s).type,"calibration");
});

check("duas confirmações recentes bloqueiam nova confirmação",()=>{
  const s=seedMeasured(baseState(),6);
  const th=missionThemes[1];
  s.freeTrainingSignals=[{themeId:th,focus:null,ratio:.98,at:now-2*60*60*1000,confirmed:false}];
  s.missionHistory=[
    {type:"confirmation",themeId:th,at:now-2*DAY},
    {type:"confirmation",themeId:th,at:now-DAY},
    {type:"priority",themeId:missionThemes[2],at:now-5*60*60*1000}
  ];
  assert.ok(!candidateTypes(s).includes("confirmation"));
});

check("hipótese causal não é reavaliada no próprio dia",()=>{
  const s=seedMeasured(baseState(),8);
  const target=missionThemes.includes("11-cd")?"11-cd":missionThemes[0];
  s.learningHypotheses=[{
    key:"h1",targetThemeId:target,targetFocus:null,
    prerequisiteThemeId:"10-fun",prerequisiteFocus:null,
    status:"causa ainda ambígua",lastAt:now-6*60*60*1000
  }];
  assert.ok(!candidateTypes(s).includes("investigation"));
});

check("hipótese causal pode voltar após intervalo",()=>{
  const s=seedMeasured(baseState(),8);
  const target=missionThemes.includes("11-cd")?"11-cd":missionThemes[0];
  s.scores[target]=syntheticScore(56,42,5);
  s.learningHypotheses=[{
    key:"h2",targetThemeId:target,targetFocus:null,
    prerequisiteThemeId:"10-fun",prerequisiteFocus:null,
    status:"causa ainda ambígua",lastAt:now-3*DAY
  }];
  assert.ok(candidateTypes(s).includes("investigation"));
});

check("500 perfis sintéticos respeitam guardrails estruturais",()=>{
  for(let i=0;i<500;i++){
    const s=baseState();
    const maxCount=Math.max(4,Math.min(10,missionThemes.length));
    const measured=4+Math.floor(Math.random()*Math.max(1,maxCount-3));
    seedMeasured(s,measured,35+Math.floor(Math.random()*45));

    if(Math.random()<.45){
      const th=missionThemes[Math.floor(Math.random()*Math.min(measured,missionThemes.length))];
      s.freeTrainingSignals=[{themeId:th,focus:null,ratio:.75+Math.random()*.25,at:now-Math.random()*10*DAY,confirmed:false}];
    }

    const lastType=Math.random()<.3?"calibration":"priority";
    s.missionHistory=[{type:lastType,themeId:missionThemes[0],at:now-Math.random()*DAY}];

    if(Math.random()<.15){
      s.missionHistory=[
        {type:"confirmation",themeId:missionThemes[1],at:now-2*DAY},
        {type:"confirmation",themeId:missionThemes[2],at:now-DAY},
        {type:"priority",themeId:missionThemes[0],at:now-4*60*60*1000}
      ];
    }

    const q=missionCandidateQueue(s);
    for(let j=1;j<q.length;j++)assert.ok(q[j-1].utility>=q[j].utility);
    q.forEach(x=>assert.ok(Number.isFinite(x.utility)));

    const latest=[...s.missionHistory].sort((a,b)=>b.at-a.at)[0];
    if(latest?.type==="calibration")assert.ok(!q.some(x=>x.plan.type==="calibration"));

    const recentConf=[...s.missionHistory].sort((a,b)=>b.at-a.at).slice(0,3).filter(x=>x.type==="confirmation").length;
    if(recentConf>=2)assert.ok(!q.some(x=>x.plan.type==="confirmation"));
  }
});

console.log(`\nEngine audit concluído: ${checks} grupos de testes passaram.`);
