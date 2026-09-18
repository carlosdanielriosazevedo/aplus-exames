import {describe,it,expect} from "vitest";
import {writingRevisionDelta,writingRevisionNextStep,writingCycleSummary} from "./portugueseWritingCycle.js";

const criteria=[{id:"conteudo",label:"Conteúdo"},{id:"fundamentacao",label:"Fundamentação"}];

describe("Portuguese writing revision cycle",()=>{
  it("descreve evolução autoassinalada sem produzir nota",()=>{
    const before={conteudo:{status:"partial",evidence:""},fundamentacao:{status:"not-yet",evidence:""}};
    const after={conteudo:{status:"met",evidence:"parágrafo 2"},fundamentacao:{status:"partial",evidence:"parágrafo 3"}};
    const delta=writingRevisionDelta(criteria,before,after);
    expect(delta.improved).toHaveLength(2);
    expect(delta.evidenceImproved).toHaveLength(2);
    expect(delta.stillAttention.map(row=>row.criterionId)).toEqual(["fundamentacao"]);
    const summary=writingCycleSummary({criteria,before,after,revisionCount:1});
    expect(summary.message).toContain("não atribui classificação");
  });

  it("prioriza um critério ainda parcial como próximo passo",()=>{
    const before={conteudo:{status:"partial"},fundamentacao:{status:"partial"}};
    const after={conteudo:{status:"met",evidence:"linha 2"},fundamentacao:{status:"partial",evidence:"linha 3"}};
    expect(writingRevisionNextStep(criteria,before,after)).toMatchObject({kind:"attention",criterionId:"fundamentacao"});
  });

  it("pede evidência quando tudo está cumprido mas a decisão não é verificável",()=>{
    const before={conteudo:{status:"partial"},fundamentacao:{status:"partial"}};
    const after={conteudo:{status:"met",evidence:""},fundamentacao:{status:"met",evidence:"linha 3"}};
    expect(writingRevisionNextStep(criteria,before,after)).toMatchObject({kind:"evidence",criterionId:"conteudo"});
  });
});
