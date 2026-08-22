
import assert from "node:assert/strict";
import {dataIntegrityAudit} from "../app/lib/reliability.js";

let state={
  betaSessions:[
    {id:"s1",kind:"mission",startedAt:1,finishedAt:2},
    {id:"s2",kind:"training",startedAt:3,finishedAt:4}
  ],
  betaEvents:[
    {id:"e1",type:"mission_started"},
    {id:"e2",type:"mission_finished"},
    {id:"e3",type:"training_started"},
    {id:"e4",type:"training_finished"}
  ],
  missionHistory:[{completionId:"s1"}],
  examHistory:[]
};

let a=dataIntegrityAudit(state);
assert.equal(a.status,"healthy");
assert.equal(a.duplicateCompletions,0);

state={
  ...state,
  missionHistory:[{completionId:"s1"},{completionId:"s1"}]
};
a=dataIntegrityAudit(state);
assert.equal(a.status,"attention");
assert.equal(a.duplicateCompletions,1);

state={
  ...state,
  missionHistory:[{completionId:"s1"}],
  betaSessions:[
    {id:"same",kind:"mission",startedAt:1,finishedAt:null},
    {id:"same",kind:"mission",startedAt:2,finishedAt:null}
  ]
};
a=dataIntegrityAudit(state);
assert.equal(a.status,"attention");
assert.equal(a.duplicateSessionIds,1);

console.log("✓ reliability audit: integrity rules passed");
