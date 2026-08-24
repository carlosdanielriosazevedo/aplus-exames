
import {buildTeacherReviewPack} from "./teacherReview.js";
import {hybridValidationPlan,hybridLaneForItem} from "./hybridValidation.js";
import {contentRevisionFingerprint} from "./quality.js";
import {validationHash} from "./validationFingerprint.js";

export function hybridTeacherPackId(items=[]){
  const payload=(items||[])
    .map(item=>`${item.id}:${contentRevisionFingerprint(item)}`)
    .join("|");
  return `hyb1-${validationHash(payload)}`;
}

export function buildHybridTeacherBatches(overrides={},reports=[],{
  batchSize=8,
  reviewer="",
  sampleRate=0.20
}={}){
  const plan=hybridValidationPlan(overrides,reports,{sampleRate});
  const sampleIds=new Set(plan.teacherSample.map(x=>x.id));
  const mandatoryIds=new Set(plan.mandatoryHuman.map(x=>x.id));

  const remaining=[
    ...plan.mandatoryRemaining,
    ...plan.sampleRemaining.filter(x=>!plan.mandatoryRemaining.some(y=>y.id===x.id))
  ];

  const packId=hybridTeacherPackId(remaining);
  const batches=[];

  for(let offset=0;offset<remaining.length;offset+=batchSize){
    const items=remaining.slice(offset,offset+batchSize);
    const index=Math.floor(offset/batchSize)+1;
    const batchId=`${packId}-B${String(index).padStart(2,"0")}`;
    let rows=buildTeacherReviewPack(overrides,reports,{
      reviewer,
      roadmapOnly:false,
      itemIds:items.map(x=>x.id),
      packId,
      batchId
    });

    rows=rows.map(row=>{
      const item=items.find(x=>x.id===row.id);
      const lane=hybridLaneForItem(item,overrides);
      const sampled=sampleIds.has(row.id);
      return {
        ...row,
        hybrid_lane:sampled?"teacher_sample":"human_required",
        hybrid_reason:sampled
          ?"Amostra de controlo do lane validado por máquina."
          :lane.reason,
        teacher_sample:sampled?"SIM":"NÃO"
      };
    });

    batches.push({
      id:batchId,
      packId,
      index,
      count:rows.length,
      itemIds:rows.map(x=>x.id),
      estimatedMinutes:rows.length*5,
      mandatoryCount:rows.filter(x=>x.hybrid_lane==="human_required").length,
      sampleCount:rows.filter(x=>x.hybrid_lane==="teacher_sample").length,
      rows
    });
  }

  return {
    schema:"teacher-review-hybrid-operations-v1",
    packId,
    batchSize,
    sampleRate,
    conservativeApprovals:plan.conservativeRoadmap.approvalsNeeded,
    hybridTarget:plan.humanTargetCount,
    remaining:remaining.length,
    machineLane:plan.machineCount,
    mandatoryHuman:plan.mandatoryHumanCount,
    teacherSample:plan.teacherSampleCount,
    savedReviews:Math.max(0,plan.conservativeRoadmap.approvalsNeeded-plan.humanTargetCount),
    savedPct:plan.conservativeRoadmap.approvalsNeeded
      ?Math.round((plan.conservativeRoadmap.approvalsNeeded-plan.humanTargetCount)/plan.conservativeRoadmap.approvalsNeeded*100)
      :0,
    estimatedMinutes:remaining.length*5,
    estimatedHours:Math.round(remaining.length*5/60*10)/10,
    batches
  };
}
