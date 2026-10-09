import {describe,expect,it} from "vitest";
import {validateSyncEnvelope} from "../../app/lib/server/beta-ingest.js";

const basePayload=()=>({
  schema:"aplus-sync-v1",
  participant:{code:"local-test"},
  beta:{sessions:[],events:[],feedback:[]},
  contentReports:[],
  examHistory:[],
  missionHistory:[],
  editorial:{overrides:{},batches:[]}
});

describe("beta sync validation",()=>{
  it("accepts a normal sync envelope",()=>{
    const payload=basePayload();
    payload.beta.events=[{id:"evt-1",at:"2026-10-09T10:00:00Z"}];
    payload.examHistory=[{id:"exam-1",at:"2026-10-09T10:05:00Z"}];
    expect(validateSyncEnvelope(payload)).toEqual({ok:true});
  });

  it("rejects malformed collections before ingest",()=>{
    const payload=basePayload();
    payload.beta.events={not:"an array"};
    expect(validateSyncEnvelope(payload)).toEqual({ok:false,code:"INVALID_BETA_EVENTS"});
  });

  it("caps the total number of database writes a single request can trigger",()=>{
    const payload=basePayload();
    payload.beta.events=Array.from({length:2499},(_,index)=>({id:`evt-${index}`,at:"2026-10-09T10:00:00Z"}));
    expect(validateSyncEnvelope(payload)).toMatchObject({
      ok:false,
      code:"SYNC_BATCH_TOO_LARGE",
      limit:2500
    });
  });

  it("caps nested editorial history",()=>{
    const payload=basePayload();
    payload.editorial.overrides.itemA={
      history:Array.from({length:101},()=>({at:"2026-10-09T10:00:00Z"}))
    };
    expect(validateSyncEnvelope(payload)).toEqual({
      ok:false,
      code:"EDITORIAL_HISTORY_TOO_LARGE",
      limit:100
    });
  });

  it("caps item ids stored in a single editorial batch",()=>{
    const payload=basePayload();
    payload.editorial.batches=[{
      id:"batch-1",
      itemIds:Array.from({length:1001},(_,index)=>`item-${index}`)
    }];
    expect(validateSyncEnvelope(payload)).toEqual({
      ok:false,
      code:"BATCH_ITEM_IDS_TOO_LARGE",
      limit:1000
    });
  });
});
