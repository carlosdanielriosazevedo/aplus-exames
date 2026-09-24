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
  it("maps literary practice across 10th, 11th and 12th year",()=>{
    expect(PORTUGUESE_LITERARY_WORKS.map(work=>work.id)).toEqual([
      "poesia-trovadoresca","fernao-lopes-djoao-i","gil-vicente-teatro","camoes-rimas","os-lusiadas-reflexoes",
      "sermao-santo-antonio","frei-luis-de-sousa","os-maias","ilustre-casa-ramires","antero-sonetos","cesario-ocidental",
      "pessoa-ortonimo","pessoa-heteronimos","mensagem","ano-morte-ricardo-reis","memorial-do-convento"
    ]);
    expect(portugueseLiteraryWorkById("frei-luis-de-sousa")).toMatchObject({year:"11.º",author:"Almeida Garrett"});
    expect(portugueseLiteraryWorkById("mensagem")).toMatchObject({year:"12.º",author:"Fernando Pessoa"});
    expect(portugueseLiteraryWorksForYear("10.º").map(work=>work.id)).toEqual(["poesia-trovadoresca","fernao-lopes-djoao-i","gil-vicente-teatro","camoes-rimas","os-lusiadas-reflexoes"]);
    expect(portugueseLiteraryWorksForYear("11.º").map(work=>work.id)).toEqual(["sermao-santo-antonio","frei-luis-de-sousa","os-maias","ilustre-casa-ramires","antero-sonetos","cesario-ocidental"]);
    expect(portugueseLiteraryWorksForYear("12.º")).toHaveLength(5);
  });

  it("contains explicit original banks for every listed work",()=>{
    expect(PORTUGUESE_LITERARY_ITEMS).toHaveLength(252);
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const items=portugueseLiteraryItemsForWork(work.id);
      expect(items).toHaveLength(work.readyCompetencyIds.length*7);
      expect(items.every(item=>item.literaryWorkId===work.id&&item.year===work.year&&item.domain==="educacao-literaria")).toBe(true);
    }
  });

  it("provides a seven-item training floor for every competency declared ready in each work",()=>{
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const items=portugueseLiteraryItemsForWork(work.id);
      for(const competencyId of work.readyCompetencyIds){
        expect(items.filter(item=>item.competencyId===competencyId)).toHaveLength(7);
      }
      for(const competencyId of COMPETENCIES.filter(id=>!work.readyCompetencyIds.includes(id))){
        expect(items.filter(item=>item.competencyId===competencyId)).toHaveLength(0);
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
      expect(item.stimulus.length).toBeGreaterThan(55);
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
    expect(new Set(PORTUGUESE_LITERARY_ITEMS.map(item=>item.id)).size).toBe(252);
    expect(new Set(PORTUGUESE_LITERARY_ITEMS.map(item=>item.stimulus)).size).toBe(252);
  });
});
