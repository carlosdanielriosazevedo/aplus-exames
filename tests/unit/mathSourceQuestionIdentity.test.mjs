import {describe,expect,it} from "vitest";
import {
  RUNTIME_QUESTION_BANK,applyEvidence,buildMiniExam,emptyScores,
  isUsefulMissionInteraction,questionById,selectMissionQuestion,summarizeEvidence,trainingQuestions
} from "../../app/lib/engine.js";

const missionPilot=questionById("VN10GA-VET-017");
const missionCopy=questionById("MS-VN10GA-VET-017");
const examPilot=questionById("VN10GA-VET-009");
const examCopy=questionById("EX-VN10GA-VET-009");

function stateWithQuestions(available){
  const allowed=new Set(available.map(item=>item.id));
  return {
    betaMode:"friends_beta",
    profile:{schoolYear:"10.º",taughtSubtopicIds:["10-ga-vetores"]},
    goal:16,
    scores:emptyScores(),
    editorialOverrides:Object.fromEntries(RUNTIME_QUESTION_BANK
      .filter(item=>!allowed.has(item.id))
      .map(item=>[item.id,{status:"blocked"}]))
  };
}

describe("reutilização da fonte das perguntas vNext",()=>{
  it("a Missão exclui a outra versão de uma pergunta já usada",()=>{
    const state=stateWithQuestions([missionPilot,missionCopy,examPilot]);
    expect(isUsefulMissionInteraction(missionCopy,[missionPilot.id])).toBe(false);
    expect(isUsefulMissionInteraction(missionPilot,[missionCopy.id])).toBe(false);
    expect(selectMissionQuestion(state,"10-ga",[missionPilot.id])?.id).toBe(examPilot.id);
  });

  it("o Treino Livre apresenta uma vez cada fonte entre treino e missão",()=>{
    const state=stateWithQuestions([missionPilot,missionCopy,examPilot]);
    const training=trainingQuestions(state,{themeId:"10-ga",focus:null,level:"auto"});
    expect(training.map(item=>item.id).sort()).toEqual([examPilot.id,missionPilot.id]);
  });

  it("o Mini-exame apresenta uma vez cada fonte e aceita as duas versões elegíveis",()=>{
    const state=stateWithQuestions([examPilot,examCopy,missionPilot]);
    const exam=buildMiniExam(state);
    expect(exam).toHaveLength(2);
    expect(exam.some(item=>item.id===missionPilot.id)).toBe(true);
    expect(exam.filter(item=>[examPilot.id,examCopy.id].includes(item.id))).toHaveLength(1);
    expect(buildMiniExam(stateWithQuestions([examCopy])).map(item=>item.id)).toEqual([examCopy.id]);
  });

  it("a cópia tem o desconto normal da pergunta repetida e mantém a assinatura guardada",()=>{
    const first=applyEvidence(null,missionPilot,true,"mission");
    const repeated=applyEvidence(first,missionCopy,false,"mission");
    expect(repeated.evidence.map(row=>row.signature)).toEqual([missionPilot.signature,missionCopy.signature]);
    expect(repeated.evidence[1].strength).toBe(.55);
    expect(repeated.diagnostics.independentSignatures).toBe(1);
    expect(repeated.diagnostics.contradictory).toBe(false);
    expect(repeated.domain).toBe(applyEvidence(first,missionPilot,false,"mission").domain);
  });

  it("reconhece um ID histórico de contexto mesmo quando saiu do banco",()=>{
    const historicalId="DG-VN10GA-VET-017";
    const historicalSignature="diagnostic:10-ga-vetores:probe:10-ga-vetores:vetores-proporcionais";
    expect(questionById(historicalId)).toBeNull();
    expect(isUsefulMissionInteraction(missionCopy,[historicalId])).toBe(false);
    const first=applyEvidence(null,missionPilot,true,"mission").evidence[0];
    const old={...first,itemId:historicalId,signature:historicalSignature,source:"diagnostic"};
    const existing=summarizeEvidence([old,first]);
    expect(existing.diagnostics.independentSignatures).toBe(1);
    expect(applyEvidence(existing,missionCopy,true,"mission").evidence.at(-1).strength).toBe(.55);
  });

  it("conserva o desconto de variantes da mesma família",()=>{
    const first=applyEvidence(null,questionById("VN10GA-VET-006"),true,"mission");
    const repeated=applyEvidence(first,questionById("VN10GA-VET-007"),true,"mission");
    expect(repeated.evidence[1].strength).toBe(.55);
    expect(repeated.diagnostics.independentSignatures).toBe(1);
  });
});
