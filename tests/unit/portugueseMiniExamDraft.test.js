import {describe,expect,it} from "vitest";
import {
  clearPortugueseMiniExamDraft,
  normalizePortugueseMiniExamDraft,
  portugueseMiniExamDraftSnapshot,
  savePortugueseMiniExamDraft
} from "../../app/lib/portugueseMiniExamDraft.js";

describe("Portuguese mini-exam recovery",()=>{
  const scope={examId:"mini-1",itemIds:["q1","q2","q3"]};

  it("keeps the current question, answers and review evidence",()=>{
    const draft=portugueseMiniExamDraftSnapshot({
      ...scope,index:2,review:true,answers:{q1:1,q2:"resposta"},
      selfAssessment:{q2:{criterion:{status:"partial"}}},
      revisionDrafts:{q2:"nova versão"},revisions:{q2:[{sequence:1}]},
      dismissedWritingFocus:{q2:true},attemptId:"attempt-1",updatedAt:123
    });
    expect(draft).toMatchObject({examId:"mini-1",index:2,review:true,attemptId:"attempt-1",updatedAt:123});
    expect(draft.answers).toEqual({q1:1,q2:"resposta"});
    expect(draft.selfAssessment.q2.criterion.status).toBe("partial");
  });

  it("rejects another exam and removes unknown item data",()=>{
    expect(normalizePortugueseMiniExamDraft({version:1,examId:"mini-2"},scope)).toBeNull();
    const draft=normalizePortugueseMiniExamDraft({version:1,examId:"mini-1",index:99,answers:{q1:2,unknown:3}},scope);
    expect(draft.index).toBe(2);
    expect(draft.answers).toEqual({q1:2});
  });

  it("saves and clears only the Portuguese mini-exam draft",()=>{
    const base={scores:{math:80},subjectSettings:{portuguese:{selectedMiniExamId:"mini-1"}}};
    const draft=portugueseMiniExamDraftSnapshot({...scope,index:1,answers:{q1:0}});
    const saved=savePortugueseMiniExamDraft(base,draft);
    const cleared=clearPortugueseMiniExamDraft(saved);
    expect(saved.subjectSettings.portuguese.miniExamDraft.index).toBe(1);
    expect(cleared.subjectSettings.portuguese.miniExamDraft).toBeUndefined();
    expect(cleared.subjectSettings.portuguese.selectedMiniExamId).toBe("mini-1");
    expect(cleared.scores).toEqual(base.scores);
  });
});
