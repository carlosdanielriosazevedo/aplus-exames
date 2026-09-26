import {STUDY_SESSION_MIN_QUESTIONS,STUDY_SESSION_MAX_QUESTIONS,DEFAULT_MISSION_QUESTIONS} from "./sessionPolicy.js";
import {PHYSICS_CHEMISTRY_A_DOMAINS} from "../data/physicsChemistryFoundation.js";

export function gradePhysicsChemistryResponse(item,value){
  if(value===null||value===undefined||value==="")return {status:"unanswered",final:true,correct:null,points:0,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode};
  if(item.responseType!=="multiple-choice")return {status:"awaiting-rubric",final:false,correct:null,points:null,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode};
  const correct=Number(value)===item.answerIndex;
  return {status:"final",final:true,correct,points:correct?(item.maxPoints||10):0,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode};
}

export function physicsChemistryCoverage(items=[]){
  const byDomain=Object.fromEntries(PHYSICS_CHEMISTRY_A_DOMAINS.map(domain=>[domain.id,items.filter(item=>item.domain===domain.id).length]));
  const byYear=Object.fromEntries(["10.º","11.º"].map(year=>[year,items.filter(item=>item.year===year).length]));
  return {
    total:items.length,
    byDomain,
    byYear,
    missionEligibleByDomain:Object.fromEntries(Object.entries(byDomain).map(([id,count])=>[id,count>=STUDY_SESSION_MIN_QUESTIONS])),
    diagnosticReady:byYear["10.º"]>=4&&byYear["11.º"]>=4,
    missionReady:Object.values(byDomain).every(count=>count>=STUDY_SESSION_MIN_QUESTIONS)
  };
}

function stablePick(items,count,offset=0){
  if(!items.length)return [];
  return Array.from({length:Math.min(count,items.length)},(_,index)=>items[(offset+index)%items.length]);
}

export function buildPhysicsChemistryDiagnostic(items=[]){
  const selected=[];
  const plan=[
    ["10.º","q10-elements"],["10.º","q10-matter"],["10.º","f10-energy"],["10.º","q10-elements"],
    ["11.º","f11-mechanics"],["11.º","f11-waves"],["11.º","q11-equilibrium"],["11.º","q11-aqueous"]
  ];
  for(const [year,domain] of plan){
    const pool=items.filter(item=>item.year===year&&item.domain===domain&&!selected.some(row=>row.id===item.id));
    const fallback=items.filter(item=>item.year===year&&!selected.some(row=>row.id===item.id));
    const next=(pool[0]||fallback[0]);
    if(next)selected.push(next);
  }
  return selected.slice(0,8);
}

export function buildAdaptivePhysicsChemistryMission(items=[],{progress={},domain=null,year=null,size=DEFAULT_MISSION_QUESTIONS}={}){
  const bounded=Math.max(STUDY_SESSION_MIN_QUESTIONS,Math.min(STUDY_SESSION_MAX_QUESTIONS,size));
  let pool=items.filter(item=>(!domain||item.domain===domain)&&(!year||item.year===year));
  const recent=new Set((progress.sessions||[]).slice(-4).flatMap(row=>row.itemIds||[]));
  const fresh=pool.filter(item=>!recent.has(item.id));
  if(fresh.length>=bounded)pool=fresh;

  const competence=progress.competence||{};
  pool=[...pool].sort((a,b)=>{
    const ra=competence[a.competencyId]||{},rb=competence[b.competencyId]||{};
    const aa=ra.deterministicAttempts||0,ab=rb.deterministicAttempts||0;
    const pa=aa?(ra.correct||0)/aa:0.5,pb=ab?(rb.correct||0)/ab:0.5;
    return pa-pb||aa-ab||String(a.id).localeCompare(String(b.id));
  });

  const selected=[];
  for(const item of pool){
    if(selected.length>=bounded)break;
    const sameDomain=selected.filter(row=>row.domain===item.domain).length;
    if(!domain&&sameDomain>=3)continue;
    selected.push(item);
  }
  if(selected.length<bounded){
    for(const item of pool){
      if(selected.length>=bounded)break;
      if(!selected.some(row=>row.id===item.id))selected.push(item);
    }
  }
  return {items:selected,targetDomain:domain||null,year:year||null};
}

export function physicsChemistryScope(items,currentYear,taughtDomainIds=[]){
  const allowedYears=currentYear==="10.º"?["10.º"]:["10.º","11.º"];
  return items.filter(item=>{
    if(!allowedYears.includes(item.year))return false;
    if(item.year!==currentYear||currentYear==="12.º")return true;
    return taughtDomainIds.includes(item.domain);
  });
}
