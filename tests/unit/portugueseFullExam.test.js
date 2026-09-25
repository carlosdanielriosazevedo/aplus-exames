import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_FULL_PRACTICE_EXAM,
  PORTUGUESE_PASSAGE_PROTOTYPE_EXAM,
  PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2,
  classifyPortugueseFullExamResults,
  portuguesePassagePrototypeExam
} from "../../app/data/portuguesePassagePrototype.js";

describe("Portuguese full practice exam",()=>{
  const exam=PORTUGUESE_FULL_PRACTICE_EXAM;

  it("matches the 2026 structural model without reusing mini-exam items",()=>{
    expect(portuguesePassagePrototypeExam("full-1")).toBe(exam);
    expect(exam).toMatchObject({
      kind:"practice-exam",
      durationMinutes:120,
      toleranceMinutes:30,
      itemCount:15,
      maxPoints:200,
      availablePoints:226
    });
    expect(exam.description).toContain("10 obrigatórios");
    expect(exam.description).toContain("3 melhores de 5 opcionais");
    expect(new Set(exam.items.map(item=>item.domain))).toEqual(new Set(["leitura","educacao-literaria","gramatica","escrita"]));
    expect(exam.items.every(item=>item.year==="12.º"&&item.sourceOrigin==="original")).toBe(true);
    expect(new Set(exam.items.map(item=>item.id)).size).toBe(15);

    const miniIds=new Set([...PORTUGUESE_PASSAGE_PROTOTYPE_EXAM.items,...PORTUGUESE_PASSAGE_PROTOTYPE_EXAM_2.items].map(item=>item.id));
    expect(exam.items.some(item=>miniIds.has(item.id))).toBe(false);
  });

  it("encodes 10 mandatory items plus the best 3 of 5 optional items",()=>{
    const mandatory=exam.items.filter(item=>item.classificationMode==="mandatory");
    const optional=exam.items.filter(item=>item.classificationMode==="best-of-five");
    expect(mandatory).toHaveLength(10);
    expect(optional).toHaveLength(5);
    expect(optional.every(item=>item.responseType==="multiple-choice"&&item.maxPoints===13)).toBe(true);
    expect(exam.scoringPolicy).toEqual({
      mandatoryCount:10,
      optionalCount:5,
      optionalBestCount:3,
      itemPoints:13,
      writingPoints:44
    });

    const results=exam.items.map(item=>({
      itemId:item.id,
      points:item.classificationMode==="best-of-five"
        ?({"PT639-FULL-G1-Q3":13,"PT639-FULL-G1-Q6":0,"PT639-FULL-G2-Q3":13,"PT639-FULL-G2-Q4":0,"PT639-FULL-G2-Q5":13}[item.id]??0)
        :item.responseType==="multiple-choice"?13:null
    }));
    const classification=classifyPortugueseFullExamResults(results);
    expect(classification.selectedOptionalItemIds).toEqual(["PT639-FULL-G1-Q3","PT639-FULL-G2-Q3","PT639-FULL-G2-Q5"]);
    expect(classification.excludedOptionalItemIds).toEqual(["PT639-FULL-G1-Q6","PT639-FULL-G2-Q4"]);
    expect(classification.pendingItemIds).toContain("PT639-FULL-G3-Q1");
  });

  it("keeps open-answer grading conservative and gives writing 44 points",()=>{
    expect(exam.responseTypes).toEqual({"restricted-response":4,"multiple-choice":10,"extended-writing":1});
    const objective=exam.items.filter(item=>item.responseType==="multiple-choice");
    const open=exam.items.filter(item=>item.responseType!=="multiple-choice");
    expect(objective.every(item=>item.gradingMode==="deterministic"&&Number.isInteger(item.answerIndex))).toBe(true);
    expect(open.every(item=>item.gradingMode!=="deterministic"&&item.rubric?.criteria?.length>0&&item.referenceAnswer)).toBe(true);
    const writing=exam.items.find(item=>item.responseType==="extended-writing");
    expect(writing.wordLimit).toEqual({min:200,max:350});
    expect(writing.maxPoints).toBe(44);
    expect(writing.rubric.criteria.reduce((sum,criterion)=>sum+criterion.points,0)).toBe(44);
    expect(writing.prompt).toContain("200 a 350 palavras");
  });
});
