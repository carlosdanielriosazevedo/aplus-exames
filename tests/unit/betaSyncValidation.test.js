import {describe,expect,it} from "vitest";
import {validatePilotEnvelope} from "../../app/lib/server/pilot-ingest.js";
import {studentStateForCloud} from "../../app/lib/cloud.js";

const today=()=>new Date().toISOString().slice(0,10);
const basePayload=()=>({schema:"aplus-pilot-v1",aggregates:[],itemResults:[],feedback:[]});

describe("pilot sync validation",()=>{
  it("accepts absolute daily aggregates, item outcomes and feedback",()=>{
    const date=today();
    const payload=basePayload();
    payload.aggregates=[{date,type:"practice_completed",subject:"physics-chemistry-a",totalCount:4,totalSeconds:1320}];
    payload.itemResults=[{id:"item-result-1",itemId:"fqa-wav-001",outcome:"correct",seconds:42,date,subject:"physics-chemistry-a"}];
    payload.feedback=[{id:"feedback-1",type:"difficulty",subject:"physics-chemistry-a",rating:4,comment:"A explicação foi clara.",at:new Date().toISOString()}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:true});
  });

  it("rejects malformed collections before ingest",()=>{
    const payload=basePayload();
    payload.aggregates={not:"an array"};
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_COLLECTION"});
  });

  it("requires absolute non-negative aggregate totals",()=>{
    const payload=basePayload();
    payload.aggregates=[{date:today(),type:"onboarding_started",subject:"all",totalCount:-1,totalSeconds:0}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_AGGREGATE_COUNT"});
  });

  it("caps aggregate rows per request",()=>{
    const payload=basePayload();
    payload.aggregates=Array.from({length:201},()=>({date:today(),type:"practice_completed",subject:"math-a",totalCount:1,totalSeconds:1}));
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"TOO_MANY_AGGREGATES",limit:200});
  });

  it("rejects more than 86400 seconds per day",()=>{
    const payload=basePayload();
    payload.aggregates=[{date:today(),type:"practice_completed",subject:"math-a",totalCount:1,totalSeconds:86401}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_AGGREGATE_SECONDS",limit:86400});
  });

  it("rejects aggregate counts above the event-specific ceiling",()=>{
    const payload=basePayload();
    payload.aggregates=[{date:today(),type:"full_exam_completed",subject:"math-a",totalCount:21,totalSeconds:100}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"AGGREGATE_COUNT_TOO_LARGE",eventType:"full_exam_completed",limit:20});
  });

  it("rejects unknown subjects and malformed item ids",()=>{
    const payload=basePayload();
    payload.itemResults=[{id:"r1",itemId:"bad item id!",outcome:"correct",seconds:10,date:today(),subject:"fqa"}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_ITEM_RESULT"});
  });

  it("rejects dates outside the server ±1 day window",()=>{
    const payload=basePayload();
    payload.aggregates=[{date:"2020-01-01",type:"practice_completed",subject:"math-a",totalCount:1,totalSeconds:10}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"INVALID_AGGREGATE"});
  });

  it("caps item results per request",()=>{
    const payload=basePayload();
    payload.itemResults=Array.from({length:501},(_,index)=>({id:`r-${index}`,itemId:`math-q-${index}`,outcome:"correct",seconds:1,date:today(),subject:"math-a"}));
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"TOO_MANY_ITEM_RESULTS",limit:500});
  });

  it("caps feedback text",()=>{
    const payload=basePayload();
    payload.feedback=[{id:"f1",type:"general",subject:"all",rating:5,comment:"x".repeat(2001),at:new Date().toISOString()}];
    expect(validatePilotEnvelope(payload)).toEqual({ok:false,code:"FEEDBACK_TOO_LONG",limit:2000});
  });
});

describe("cloud response privacy",()=>{
  it("removes answer text recursively before building state_json",()=>{
    const cloud=studentStateForCloud({
      goal:17,profile:{schoolYear:"12.º"},scores:{},xp:0,streak:0,
      diagnosticDone:false,diagnosticAnswers:0,missionHistory:[],freeTrainingSignals:[],
      examHistory:[{answers:["SEGREDO-RESPOSTA"],itemResults:[{responseText:"SEGREDO-TEXTO",previousResponseText:"SEGREDO-ANTERIOR",studentEvidence:["SEGREDO-EVIDENCIA"]}]}],
      lastExam:{answers:{a:"SEGREDO-RASCUNHO"}},lastMission:null,learningHypotheses:[]
    });
    const serialized=JSON.stringify(cloud);
    expect(serialized).not.toContain("SEGREDO-");
    expect(serialized).not.toContain("\"answers\"");
    expect(serialized).not.toContain("responseText");
    expect(serialized).not.toContain("studentEvidence");
  });
});
