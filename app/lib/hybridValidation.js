
import {QUESTION_BANK,TAXONOMY,DIAGNOSTIC_BLUEPRINT} from "../data/content.js";
import {
  minimumReviewRoadmap,betaContentReadiness,effectiveReviewStatus,
  contentRevisionFingerprint
} from "./quality.js";
import {itemPreReviewQa,preReviewQaReport} from "./preReviewQa.js";
import {
  machineValidationPassport,machineClosedBetaEligible,
  requiresHumanPedagogy,deterministicTeacherSample
} from "./validationPolicy.js";

function virtualMachineOverrides(overrides={}){
  const next={...(overrides||{})};
  for(const q of QUESTION_BANK){
    const passport=machineValidationPassport(q);
    if(!passport.closedBetaEligible)continue;
    const existing=next[q.id];
    if(existing?.status==="reviewed")continue;
    next[q.id]={
      ...(existing||{}),
      version:existing?.version||1,
      status:"reviewed",
      reviewer:"VALIDAÇÃO HÍBRIDA · MÁQUINA",
      reviewedFingerprint:passport.fingerprint,
      reviewSource:"hybrid_machine_virtual",
      reviewedAt:null
    };
  }
  return next;
}

function reviewedByHuman(item,overrides={}){
  const ov=overrides?.[item.id];
  return ov?.status==="reviewed"
    &&ov?.reviewSource!=="hybrid_machine_virtual"
    &&effectiveReviewStatus(item,overrides)==="reviewed";
}

export function hybridValidationPlan(overrides={},reports=[],{
  sampleRate=0.20
}={}){
  const qa=preReviewQaReport({overrides});
  const machine=QUESTION_BANK.filter(q=>machineClosedBetaEligible(q));
  const machineIds=new Set(machine.map(x=>x.id));
  const virtual=virtualMachineOverrides(overrides);

  const mandatoryRoadmap=minimumReviewRoadmap(virtual,reports);
  const mandatory=mandatoryRoadmap.selected
    .map(x=>x.item)
    .filter(item=>!machineIds.has(item.id));

  // Em paralelo, rever uma amostra do lane de máquina para verificar se a política
  // está a falhar em dificuldade, linguagem ou pedagogia.
  const sample=deterministicTeacherSample(machine,{rate:sampleRate,min:1});
  const sampleIds=new Set(sample.map(x=>x.id));

  const humanTarget=[];
  for(const item of [...mandatory,...sample]){
    if(!humanTarget.some(x=>x.id===item.id))humanTarget.push(item);
  }

  const humanRemaining=humanTarget.filter(item=>!reviewedByHuman(item,overrides));
  const mandatoryRemaining=mandatory.filter(item=>!reviewedByHuman(item,overrides));
  const sampleRemaining=sample.filter(item=>!reviewedByHuman(item,overrides));

  return {
    schema:"aplus-hybrid-validation-plan-v1",
    policy:"conservative_hybrid_beta",
    sampleRate,
    corpus:QUESTION_BANK.length,
    machineLane:machine,
    machineCount:machine.length,
    mandatoryHuman:mandatory,
    mandatoryHumanCount:mandatory.length,
    teacherSample:sample,
    teacherSampleCount:sample.length,
    humanTarget,
    humanTargetCount:humanTarget.length,
    humanRemaining,
    humanRemainingCount:humanRemaining.length,
    mandatoryRemaining,
    sampleRemaining,
    qaBlockers:qa.blocked,
    conservativeRoadmap:minimumReviewRoadmap(overrides,reports),
    virtualRoadmap:mandatoryRoadmap
  };
}

export function hybridBetaReadiness(overrides={},reports=[],options={}){
  const plan=hybridValidationPlan(overrides,reports,options);
  const virtual=virtualMachineOverrides(overrides);
  const structural=betaContentReadiness(virtual,reports);
  const machinePass=plan.machineLane.every(q=>machineValidationPassport(q).closedBetaEligible);
  const sampleDone=plan.teacherSample.every(q=>reviewedByHuman(q,overrides));
  const mandatoryDone=plan.mandatoryHuman.every(q=>reviewedByHuman(q,overrides));
  const qaClear=plan.qaBlockers===0;

  return {
    schema:"aplus-hybrid-beta-readiness-v1",
    score:structural.score,
    structural,
    machinePass,
    sampleDone,
    mandatoryDone,
    qaClear,
    canClosedBeta:structural.canClosedBeta&&machinePass&&sampleDone&&mandatoryDone&&qaClear,
    plan,
    reasons:[
      ...(qaClear?[]:[`${plan.qaBlockers} blockers de pré-QA`]),
      ...(machinePass?[]:["nem todos os itens de máquina têm atestação válida"]),
      ...(mandatoryDone?[]:[`${plan.mandatoryRemaining.length} revisões humanas obrigatórias por concluir`]),
      ...(sampleDone?[]:[`${plan.sampleRemaining.length} itens da amostra humana por rever`]),
      ...(structural.canClosedBeta?[]:structural.reasons||[])
    ]
  };
}

export function hybridLaneForItem(item,overrides={}){
  const qa=itemPreReviewQa(item,{overrides});
  const passport=machineValidationPassport(item);
  if(qa.blockerCount>0)return {lane:"blocked",reason:"Pré-QA bloqueado",qa,passport};
  if(passport.closedBetaEligible && !requiresHumanPedagogy(item,{qaStatus:qa.status})){
    return {
      lane:"machine_plus_sample",
      reason:"Item objetivo, pré-QA limpo e oracle determinístico atestado.",
      qa,passport
    };
  }
  return {
    lane:"human_required",
    reason:item.contexts?.includes("diagnostic")
      ?"Diagnóstico: impacto elevado no perfil inicial."
      :qa.status==="warning"
        ?"Pré-QA levantou avisos que exigem julgamento humano."
        :`Tipo cognitivo/risco pedagógico: ${item.cognitive||"não classificado"}.`,
    qa,passport
  };
}

export function hybridValidationSummary(overrides={},reports=[]){
  const readiness=hybridBetaReadiness(overrides,reports);
  const plan=readiness.plan;
  return {
    conservativeTeacherApprovals:plan.conservativeRoadmap.approvalsNeeded,
    hybridTeacherTarget:plan.humanTargetCount,
    savedHumanReviews:Math.max(0,plan.conservativeRoadmap.approvalsNeeded-plan.humanTargetCount),
    savedPct:plan.conservativeRoadmap.approvalsNeeded
      ?Math.round((plan.conservativeRoadmap.approvalsNeeded-plan.humanTargetCount)/plan.conservativeRoadmap.approvalsNeeded*100)
      :0,
    machineCount:plan.machineCount,
    mandatoryHuman:plan.mandatoryHumanCount,
    teacherSample:plan.teacherSampleCount,
    hybridScore:readiness.score,
    canClosedBeta:readiness.canClosedBeta,
    reasons:readiness.reasons
  };
}
