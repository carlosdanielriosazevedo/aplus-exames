import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
import {
  loadPhysicsChemistryExamDraft,
  savePhysicsChemistryExamDraft,
  clearPhysicsChemistryExamDraft
} from "../../app/lib/physicsChemistryExamDraft.js";

describe("FQ A · persistência das provas em curso",()=>{
  let entries;
  beforeEach(()=>{
    entries=new Map();
    vi.stubGlobal("window",{localStorage:{
      getItem:key=>entries.get(key)??null,
      setItem:(key,value)=>entries.set(key,value),
      removeItem:key=>entries.delete(key)
    }});
  });
  afterEach(()=>vi.unstubAllGlobals());

  for(const examId of ["fqa-mini-1","fqa-full-715"]){
    it(`${examId} · mantém respostas, pergunta, relógio e revisão na retoma`,()=>{
      const itemIds=["a","b","c","d"];
      const startedAt=123456;
      savePhysicsChemistryExamDraft(examId,{
        itemIds,index:2,answers:{a:1,b:{steps:{formula:"F=ma"}}},
        startedAt,review:false,rubricAssessments:{b:{criterion:"partial"}},
        markedForReview:["b","b","x"]
      });
      const resumed=loadPhysicsChemistryExamDraft(examId,itemIds);
      expect(resumed).toMatchObject({
        version:1,examId,itemIds,index:2,startedAt,review:false,
        answers:{a:1,b:{steps:{formula:"F=ma"}}},
        rubricAssessments:{b:{criterion:"partial"}}
      });
      expect(resumed.markedForReview).toEqual(["b"]);
      expect(resumed.updatedAt).toEqual(expect.any(Number));
      expect(loadPhysicsChemistryExamDraft(examId,["a","b"])).toBeNull();
      expect(loadPhysicsChemistryExamDraft("outra-prova",itemIds)).toBeNull();
    });
  }

  it("limpar uma prova não apaga a outra",()=>{
    const itemIds=["a","b"];
    const make=(startedAt)=>({itemIds,index:1,answers:{a:0},startedAt});
    savePhysicsChemistryExamDraft("fqa-mini-1",make(111));
    savePhysicsChemistryExamDraft("fqa-full-715",make(222));
    clearPhysicsChemistryExamDraft("fqa-mini-1");
    expect(loadPhysicsChemistryExamDraft("fqa-mini-1",itemIds)).toBeNull();
    expect(loadPhysicsChemistryExamDraft("fqa-full-715",itemIds)).toMatchObject({startedAt:222,answers:{a:0}});
  });

  it("um draft malformado não é interpretado como tentativa válida",()=>{
    entries.set("applus:fqa-exam-draft:v1:fqa-mini-1","{invalid");
    expect(loadPhysicsChemistryExamDraft("fqa-mini-1",["a"])).toBeNull();
  });
});
