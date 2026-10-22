import test from "node:test";
import assert from "node:assert/strict";
import {inspectRecoveryEntries,RECOVERY_KEYS} from "../../app/lib/recoveryReadOnly.js";

test("read-only recovery inventory captures raw aged/corrupt drafts and never mutates storage",()=>{
  const data=new Map([
    ["a25-active-session-v1",'{broken JSON raw'],
    ["applus:fqa-exam-draft:v1:fqa-mini-2",JSON.stringify({startedAt:1,answers:{q:"partial"}})],
    ["auth-token","SECRET"]
  ]);
  let writes=0;
  const result=inspectRecoveryEntries([{label:"local",getItem:k=>data.get(k)??null,setItem:()=>{writes++},removeItem:()=>{writes++}}]);
  assert.equal(result.complete,true);
  assert.equal(result.entries.length,2);
  assert.equal(result.entries[0].raw,"{broken JSON raw");
  assert.equal(result.entries.some(x=>x.key==="auth-token"),false);
  assert.equal(writes,0);
  assert.equal(data.size,3);
});
test("unreadable stores fail closed without erasing available entries",()=>{
  const result=inspectRecoveryEntries([
    {label:"local",getItem:k=>k===RECOVERY_KEYS[0]?"old attempt":null},
    {label:"session",getItem:()=>{throw Error("denied")}}
  ]);
  assert.equal(result.complete,false);
  assert.equal(result.failures.length,RECOVERY_KEYS.length);
  assert.equal(result.entries[0].raw,"old attempt");
});
test("snapshot is opt-in and requires explicit stores",()=>assert.throws(()=>inspectRecoveryEntries(),TypeError));
