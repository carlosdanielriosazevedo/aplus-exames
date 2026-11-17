import {describe,expect,it} from "vitest";
import {mergeSelectedSubjects,safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
import {validateCloudSnapshot,CLOUD_FIELDS} from "../../app/lib/cloudSnapshotValidation.js";

describe("disciplinas escolhidas viajam com a conta",()=>{
  it("novo dispositivo recebe as disciplinas da conta",()=>{
    expect(mergeSelectedSubjects({selectedSubjectIds:[],activeSubjectId:null},{selectedSubjectIds:["portuguese","math-a"],activeSubjectId:"math-a"}))
      .toEqual({selectedSubjectIds:["portuguese","math-a"],activeSubjectId:"math-a"});
  });
  it("junta sem perder nenhuma e mantém a disciplina ativa deste dispositivo",()=>{
    expect(mergeSelectedSubjects({selectedSubjectIds:["math-a"],activeSubjectId:"math-a"},{selectedSubjectIds:["portuguese"],activeSubjectId:"portuguese"}))
      .toEqual({selectedSubjectIds:["math-a","portuguese"],activeSubjectId:"math-a"});
    const merged=safeCloudMerge({selectedSubjectIds:[],activeSubjectId:null,xp:0},{selectedSubjectIds:["physics-chemistry-a"],activeSubjectId:"physics-chemistry-a",xp:5});
    expect(merged.selectedSubjectIds).toEqual(["physics-chemistry-a"]);
    expect(merged.activeSubjectId).toBe("physics-chemistry-a");
  });
  it("o servidor aceita os novos campos e recusa valores inválidos",()=>{
    expect(CLOUD_FIELDS.has("selectedSubjectIds")).toBe(true);
    const base={schema:"aplus-student-state-v8",xp:0,streak:0,selectedSubjectIds:["math-a"],activeSubjectId:"math-a"};
    expect(validateCloudSnapshot(base).ok).toBe(true);
    expect(validateCloudSnapshot({...base,selectedSubjectIds:[1]}).ok).toBe(false);
  });
});

import {validateCloudWrite} from "../../app/lib/server/cloud-state-validation.js";
describe("gravação presa à conta esperada",()=>{
  const state={schema:"aplus-student-state-v8",xp:0,streak:0};
  it("aceita a conta esperada sem a usar como dono",()=>{
    const ok=validateCloudWrite({operation:"insert",expectedRevision:0,state,expectedOwner:"user-a"});
    expect(ok.ok).toBe(true);
    expect(ok.expectedOwner).toBe("user-a");
  });
  it("recusa valores inválidos e continua a recusar campos de dono",()=>{
    expect(validateCloudWrite({operation:"insert",expectedRevision:0,state,expectedOwner:""}).ok).toBe(false);
    expect(validateCloudWrite({operation:"insert",expectedRevision:0,state,auth_user_id:"x"}).ok).toBe(false);
  });
});
