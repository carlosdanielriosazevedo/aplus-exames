import {afterEach,beforeEach,expect,it,vi} from "vitest";
import {hasPendingAssessment,preservePendingAssessment} from "../../app/lib/pendingAssessment.js";
let entries;
beforeEach(()=>{
 entries=new Map();const storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value),removeItem:key=>entries.delete(key)};
 vi.stubGlobal("localStorage",storage);vi.stubGlobal("window",{localStorage:storage});
});
afterEach(()=>vi.unstubAllGlobals());
for(const subjectId of ["portuguese","physics-chemistry-a"]){
 for(const kind of ["diagnostic","mission","training"]){
  it(`incoming progress preserves the pending ${subjectId} ${kind}`,()=>{
   const state={xp:100,subjectProgress:{[subjectId]:{lastPosition:{sessionId:"pending",kind,current:2,results:[{correct:true}],currentAnswer:"saved"}}}};
   expect(hasPendingAssessment(state)).toBe(true);
   expect(preservePendingAssessment(state,{xp:999,subjectProgress:{}})).toBe(state);
  });
 }
}
for(const kind of ["diagnostic","mission","training","mini_exam"]){
 it(`incoming progress cannot replace a Math ${kind} academic baseline`,()=>{
  entries.set("a25-active-session-v1",JSON.stringify({kind,sessionId:"pending",answers:[0,1]}));
  const state={xp:100,scores:{old:true}};
  expect(preservePendingAssessment(state,{xp:999,scores:{new:true}})).toBe(state);
 });
}
for(const examId of ["fqa-mini-1","fqa-mini-2","fqa-full-715"]){
 it(`incoming progress respects ${examId} even if its draft is malformed`,()=>{
  entries.set("applus:fqa-exam-draft:v1:"+examId,"{invalid");
  const state={xp:100};expect(preservePendingAssessment(state,{xp:999})).toBe(state);
 });
}
it("incoming progress respects a Portuguese exam",()=>{
 const state={subjectSettings:{portuguese:{miniExamDraft:{attemptId:"pending",answers:{q:1}}}}};
 expect(preservePendingAssessment(state,{})).toBe(state);
});
it("a late cloud response checks the current attempt at application time",()=>{
 const initial={xp:100},incoming={xp:999};
 expect(preservePendingAssessment(initial,incoming)).toBe(incoming);
 const current={...initial,subjectProgress:{portuguese:{lastPosition:{sessionId:"started-during-request"}}}};
 expect(preservePendingAssessment(current,incoming)).toBe(current);
});
it("a corrupt Math draft blocks replacement without deleting data",()=>{
 entries.set("a25-active-session-v1","{invalid");const state={xp:100};
 expect(preservePendingAssessment(state,{})).toBe(state);
 expect(entries.get("a25-active-session-v1")).toBe("{invalid");
});
