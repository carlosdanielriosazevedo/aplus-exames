import {writingCycleSummary} from "./portugueseWritingCycle.js";

export const PORTUGUESE_WRITING_CYCLE_SCENARIOS=[
  {
    id:"improve-and-focus",
    criteria:[{id:"conteudo",label:"Conteúdo"},{id:"fundamentacao",label:"Fundamentação"}],
    before:{conteudo:{status:"partial",evidence:""},fundamentacao:{status:"not-yet",evidence:""}},
    after:{conteudo:{status:"met",evidence:"parágrafo 2"},fundamentacao:{status:"partial",evidence:"parágrafo 3"}},
    expected:{kind:"attention",criterionId:"fundamentacao"}
  },
  {
    id:"met-without-evidence",
    criteria:[{id:"conteudo",label:"Conteúdo"}],
    before:{conteudo:{status:"partial",evidence:""}},
    after:{conteudo:{status:"met",evidence:""}},
    expected:{kind:"evidence",criterionId:"conteudo"}
  },
  {
    id:"consolidated",
    criteria:[{id:"conteudo",label:"Conteúdo"}],
    before:{conteudo:{status:"partial",evidence:"rascunho"}},
    after:{conteudo:{status:"met",evidence:"parágrafo 2"}},
    expected:{kind:"consolidate",criterionId:null}
  }
];

export function auditPortugueseWritingCycleScenarios(){
  return PORTUGUESE_WRITING_CYCLE_SCENARIOS.map(scenario=>{
    const summary=writingCycleSummary({...scenario,revisionCount:1});
    return {
      id:scenario.id,
      pass:summary.nextStep.kind===scenario.expected.kind&&summary.nextStep.criterionId===scenario.expected.criterionId,
      nextStep:summary.nextStep
    };
  });
}
