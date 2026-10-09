import {recordErrorPatternEvidence} from "./recurringErrorMemory.js";

export function recordRecurringErrorState(state,subjectId,item,result,at=Date.now()){
  if(!state||!subjectId||!item||!result)return state;
  const subjectProgress={...(state.subjectProgress||{})};
  const progress={...(subjectProgress[subjectId]||{}),subjectId};
  subjectProgress[subjectId]={
    ...progress,
    errorPatterns:recordErrorPatternEvidence(progress.errorPatterns,item,result,at),
    errorMemoryVersion:1
  };
  return {...state,subjectProgress};
}
