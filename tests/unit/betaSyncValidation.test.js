import {describe,expect,it} from "vitest";
import {validatePilotEnvelope} from "../../app/lib/server/pilot-ingest.js";

const basePayload=()=>({
  schema:"aplus-pilot-v1",
  aggregates:[],
  itemResults:[],
  feedback:[]
});

describe("pilot sync validation",()=>{
  it("accepts absolute daily aggregates, item outcomes and feedback",()=>{
    const payload=basePayload();
    payload.aggregates=[{
      date:"2026-10-10",type:"practice_completed",subject:"fqa",
      totalCount:4,totalSeconds:1320
    }];
    payload.itemResults=[{
      id:"item-result-1",itemId:"fqa-wav-001",outcome:"correct",
      seconds:42,date:"2026-10-10",subject:"fqa"
    }];
    payload.feedback=[{
      id:"feedback-1",type:"difficulty",subject:"fqa",rating:4,
      comment:"A explicação foi clara.",at:"2026-10-10T10:00:00Z"
    }];
    expect(validatePilotEnvelope(payload)).toEqual({ok:true});
  });

  it("rejects malformed collections before ingest",()=>{
    const payload=basePayload();
    payload.aggregates={not:"an array"};
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_COLLECTION"});
  });

  it("requires absolute non-negative aggregate totals",()=>{
    const payload=basePayload();
    payload.aggregates=[{
      date:"2026-10-10",type:"onboarding_started",subject:"all",
      totalCount:-1,totalSeconds:0
    }];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_AGGREGATE_COUNT"});
  });

  it("caps aggregate rows per request",()=>{
    const payload=basePayload();
    payload.aggregates=Array.from({length:201},(_,index)=>({
      date:"2026-10-10",type:"practice_completed",subject:`s${index}`,
      totalCount:1,totalSeconds:1
    }));
    expect(validatePilotEnvelope(payload)).toEqual({
      ok:false,code:"TOO_MANY_AGGREGATES",limit:200
    });
  });

  it("rejects answer text by contract shape and validates item outcomes",()=>{
    const payload=basePayload();
    payload.itemResults=[{
      id:"r1",itemId:"q1",outcome:"not-an-outcome",seconds:10,
      date:"2026-10-10",subject:"math"
    }];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_ITEM_RESULT"});
  });

  it("caps feedback text",()=>{
    const payload=basePayload();
    payload.feedback=[{
      id:"f1",type:"general",rating:5,comment:"x".repeat(2001),
      at:"2026-10-10T10:00:00Z"
    }];
    expect(validatePilotEnvelope(payload)).toEqual({
      ok:false,code:"FEEDBACK_TOO_LONG",limit:2000
    });
  });
});
