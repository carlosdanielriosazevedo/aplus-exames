import {describe,expect,it} from "vitest";
import {buildAdaptivePortugueseMission,portugueseMissionPool} from "../../app/lib/portugueseEngine.js";

function item(id,year,domain="gramatica",competencyId="pt-gramatica-oracoes"){
  return {
    id,
    year,
    domain,
    competencyId,
    responseType:"multiple-choice",
    cognitive:"interpretar",
    difficulty:{level:2,status:"editorial-provisional"}
  };
}

const ITEMS=[
  ...Array.from({length:8},(_,i)=>item(`10-${i+1}`,"10.º")),
  ...Array.from({length:8},(_,i)=>item(`11-${i+1}`,"11.º")),
  ...Array.from({length:8},(_,i)=>item(`12-${i+1}`,"12.º")),
  ...Array.from({length:8},(_,i)=>item(`11-sint-${i+1}`,"11.º","gramatica","pt-gramatica-sintaxe"))
];

describe("Portuguese practice year scope",()=>{
  it("mission pool respects a single selected year",()=>{
    const pool=portugueseMissionPool(ITEMS,{domain:"gramatica",years:["11.º"]});
    expect(pool.ready).toBe(true);
    expect(pool.items).toHaveLength(16);
    expect(pool.items.every(row=>row.year==="11.º")).toBe(true);
  });

  it("adaptive mission never leaks items from other years",()=>{
    const mission=buildAdaptivePortugueseMission(ITEMS,{
      progress:{competence:{},missionHistory:[]},
      domain:"gramatica",
      years:["10.º"],
      size:7
    });
    expect(mission.items).toHaveLength(7);
    expect(mission.items.every(row=>row.year==="10.º")).toBe(true);
  });

  it("different year selections produce different item pools",()=>{
    const ten=buildAdaptivePortugueseMission(ITEMS,{
      progress:{competence:{},missionHistory:[]},
      domain:"gramatica",
      years:["10.º"]
    });
    const eleven=buildAdaptivePortugueseMission(ITEMS,{
      progress:{competence:{},missionHistory:[]},
      domain:"gramatica",
      years:["11.º"]
    });
    expect(new Set(ten.items.map(row=>row.id))).not.toEqual(new Set(eleven.items.map(row=>row.id)));
  });
  it("competency selection narrows the mission inside the chosen year and domain",()=>{
    const mission=buildAdaptivePortugueseMission(ITEMS,{
      progress:{competence:{},missionHistory:[]},
      domain:"gramatica",
      competencyId:"pt-gramatica-sintaxe",
      years:["11.º"]
    });
    expect(mission.items).toHaveLength(7);
    expect(mission.items.every(row=>row.year==="11.º"&&row.domain==="gramatica"&&row.competencyId==="pt-gramatica-sintaxe")).toBe(true);
  });

  it("rejects a competency scope without enough items instead of leaking other competencies",()=>{
    expect(()=>buildAdaptivePortugueseMission(ITEMS.slice(0,24),{
      progress:{competence:{},missionHistory:[]},
      domain:"gramatica",
      competencyId:"pt-gramatica-sintaxe",
      years:["11.º"]
    })).toThrow(/Insufficient adaptive Portuguese mission coverage/u);
  });

});
