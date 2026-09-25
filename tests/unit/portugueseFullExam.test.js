import {describe,expect,it} from "vitest";
import {PORTUGUESE_FULL_PRACTICE_EXAM,portuguesePassagePrototypeExam} from "../../app/data/portuguesePassagePrototype.js";

describe("Portuguese full practice exam",()=>{
  const exam=PORTUGUESE_FULL_PRACTICE_EXAM;

  it("publishes a complete original 12th-year simulation",()=>{
    expect(portuguesePassagePrototypeExam("full-1")).toBe(exam);
    expect(exam).toMatchObject({kind:"practice-exam",durationMinutes:150,itemCount:17,maxPoints:200});
    expect(exam.description).toContain("Não é uma prova oficial do IAVE");
    expect(new Set(exam.items.map(item=>item.domain))).toEqual(new Set(["leitura","educacao-literaria","gramatica","escrita"]));
    expect(exam.items.every(item=>item.year==="12.º"&&item.sourceOrigin==="original")).toBe(true);
    expect(new Set(exam.items.map(item=>item.id)).size).toBe(17);
  });

  it("keeps objective and open-answer grading boundaries explicit",()=>{
    expect(exam.responseTypes).toEqual({"multiple-choice":12,"restricted-response":4,"extended-writing":1});
    const objective=exam.items.filter(item=>item.responseType==="multiple-choice");
    const open=exam.items.filter(item=>item.responseType!=="multiple-choice");
    expect(objective.every(item=>item.gradingMode==="deterministic"&&Number.isInteger(item.answerIndex))).toBe(true);
    expect(open.every(item=>item.gradingMode!=="deterministic"&&item.rubric?.criteria?.length>0&&item.referenceAnswer)).toBe(true);
    expect(open.reduce((sum,item)=>sum+item.maxPoints,0)).toBe(76);
  });

  it("includes a substantial writing task with a complete 24-point rubric",()=>{
    const writing=exam.items.find(item=>item.responseType==="extended-writing");
    expect(writing.wordLimit).toEqual({min:200,max:350});
    expect(writing.rubric.criteria.reduce((sum,criterion)=>sum+criterion.points,0)).toBe(24);
    expect(writing.prompt).toContain("dois argumentos");
  });
});
