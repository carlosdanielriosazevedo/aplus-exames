import {describe,expect,it} from "vitest";
import {PORTUGUESE_LITERARY_ITEMS,portugueseLiteraryItemsForWork} from "../../app/data/portugueseLiteraryQuestions.js";
import {PORTUGUESE_LITERARY_WORKS,portugueseLiteraryWorkById,portugueseLiteraryWorksForYear} from "../../app/data/portugueseLiteraryWorks.js";
import {buildAdaptivePortugueseMission} from "../../app/lib/portugueseEngine.js";

const COMPETENCIES=[
  "pt-literatura-temas",
  "pt-literatura-voz",
  "pt-literatura-forma",
  "pt-literatura-recursos"
];

describe("Portuguese work-specific literary bank",()=>{
  it("has two explicitly mapped literary works",()=>{
    expect(PORTUGUESE_LITERARY_WORKS.map(work=>work.id)).toEqual(["frei-luis-de-sousa","mensagem"]);
    expect(portugueseLiteraryWorkById("frei-luis-de-sousa")).toMatchObject({year:"11.º",author:"Almeida Garrett"});
    expect(portugueseLiteraryWorkById("mensagem")).toMatchObject({year:"12.º",author:"Fernando Pessoa"});
    expect(portugueseLiteraryWorksForYear("10.º")).toEqual([]);
  });

  it("contains 28 original items per work and 56 overall",()=>{
    expect(PORTUGUESE_LITERARY_ITEMS).toHaveLength(56);
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const items=portugueseLiteraryItemsForWork(work.id);
      expect(items).toHaveLength(28);
      expect(items.every(item=>item.literaryWorkId===work.id&&item.year===work.year&&item.domain==="educacao-literaria")).toBe(true);
    }
  });

  it("provides a seven-item training floor for every literary competency in each work",()=>{
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const items=portugueseLiteraryItemsForWork(work.id);
      for(const competencyId of COMPETENCIES){
        expect(items.filter(item=>item.competencyId===competencyId)).toHaveLength(7);
      }
    }
  });

  it("keeps every item deterministic, original and self-explaining",()=>{
    for(const item of PORTUGUESE_LITERARY_ITEMS){
      expect(item.sourceOrigin).toBe("original");
      expect(item.responseType).toBe("multiple-choice");
      expect(item.gradingMode).toBe("deterministic");
      expect(item.options).toHaveLength(4);
      expect(new Set(item.options).size).toBe(4);
      expect([0,1,2,3]).toContain(item.answerIndex);
      expect(item.explanation.length).toBeGreaterThan(45);
      expect(item.stimulus.length).toBeGreaterThan(70);
      expect(item.prompt.length).toBeGreaterThan(20);
    }
  });

  it("adaptive practice can stay inside one work and one competency",()=>{
    const items=PORTUGUESE_LITERARY_ITEMS;
    const mission=buildAdaptivePortugueseMission(items,{
      progress:{competence:{},missionHistory:[]},
      domain:"educacao-literaria",
      literaryWorkId:"frei-luis-de-sousa",
      competencyId:"pt-literatura-temas",
      years:["11.º"]
    });
    expect(mission.items).toHaveLength(7);
    expect(mission.items.every(item=>
      item.literaryWorkId==="frei-luis-de-sousa"&&
      item.competencyId==="pt-literatura-temas"&&
      item.year==="11.º"
    )).toBe(true);
  });

  it("never fills a work-specific mission with generic or another-work items",()=>{
    const mixed=[
      ...PORTUGUESE_LITERARY_ITEMS,
      ...Array.from({length:20},(_,index)=>({
        id:`GEN-${index}`,
        year:"11.º",
        domain:"educacao-literaria",
        competencyId:"pt-literatura-temas",
        responseType:"multiple-choice",
        cognitive:"interpretar",
        difficulty:{level:2,status:"editorial-provisional"}
      }))
    ];
    const mission=buildAdaptivePortugueseMission(mixed,{
      progress:{competence:{},missionHistory:[]},
      domain:"educacao-literaria",
      literaryWorkId:"frei-luis-de-sousa",
      years:["11.º"]
    });
    expect(mission.items.every(item=>item.literaryWorkId==="frei-luis-de-sousa")).toBe(true);
  });

  it("uses unique IDs and unique stimuli",()=>{
    expect(new Set(PORTUGUESE_LITERARY_ITEMS.map(item=>item.id)).size).toBe(56);
    expect(new Set(PORTUGUESE_LITERARY_ITEMS.map(item=>item.stimulus)).size).toBe(56);
  });
});
