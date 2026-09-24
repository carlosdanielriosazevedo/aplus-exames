import {describe,expect,it} from "vitest";
import {answerOptionState,conciseMathExplanation} from "../../app/lib/feedbackCopy.js";
import {STUDY_MODE_COPY,practiceModeCopy} from "../../app/lib/studyModeCopy.js";

describe("shared feedback and study copy",()=>{
  it("removes generic maths boilerplate but keeps the useful resolution",()=>{
    const verbose="2³=8. Passo-chave: identifica a propriedade central. A opção obtida deve coincidir com “8”. Porquê: texto genérico.";
    expect(conciseMathExplanation(verbose)).toBe("2³=8.");
  });

  it("leaves genuinely explanatory maths feedback untouched",()=>{
    const useful="Como há 3 posições e 2 escolhas independentes em cada uma, existem 2³=8 possibilidades.";
    expect(conciseMathExplanation(useful)).toBe(useful);
  });

  it("marks the selected option only before submission",()=>{
    expect(answerOptionState({index:2,selectedIndex:2,correctIndex:0,submitted:false})).toBe("selected");
    expect(answerOptionState({index:0,selectedIndex:2,correctIndex:0,submitted:false})).toBe("");
  });

  it("marks the correct option green-state and a wrong selected option red-state after submission",()=>{
    expect(answerOptionState({index:0,selectedIndex:2,correctIndex:0,submitted:true})).toBe("correct");
    expect(answerOptionState({index:2,selectedIndex:2,correctIndex:0,submitted:true})).toBe("wrong");
    expect(answerOptionState({index:1,selectedIndex:2,correctIndex:0,submitted:true})).toBe("");
  });

  it("marks only the correct option when the learner selected it",()=>{
    expect(answerOptionState({index:1,selectedIndex:1,correctIndex:1,submitted:true})).toBe("correct");
  });

  it("keeps common study-mode copy identical across subjects",()=>{
    expect(STUDY_MODE_COPY.nudge).toContain("Mini-exame");
    expect(STUDY_MODE_COPY.review).toBe("Estuda e consolida conteúdos sem perguntas nem avaliação.");
    expect(STUDY_MODE_COPY.miniExam).toBe("Treina num formato próximo do exame e revê as respostas no final.");
    expect(practiceModeCopy("math-a")).toContain("matéria e submatéria");
    expect(practiceModeCopy("portuguese")).toContain("área, obra ou competência");
  });
});
