import {describe,expect,it} from "vitest";
import {gradePortugueseResponse,shortAnswerCore} from "../../app/lib/portugueseEngine.js";

const item={id:"T",responseType:"short-answer",acceptedAnswers:["complemento indireto","a Marta"],maxPoints:13,gradingMode:"deterministic-with-equivalents"};
const grade=response=>gradePortugueseResponse(item,response).correct;

describe("respostas curtas: formulações completas equivalentes",()=>{
  it("aceita a resposta com enquadramento",()=>{
    for(const response of ["complemento indireto","Complemento indireto.","É complemento indireto.","O complemento indireto","Desempenha a função de complemento indireto.","A função sintática é complemento indireto","Marta","É a Marta."])expect(grade(response),response).toBe(true);
  });
  it("continua a rejeitar respostas erradas",()=>{
    for(const response of ["complemento direto","Não é complemento indireto","indireto","a Leonor","é"])expect(grade(response),response).toBe(false);
  });
  it("não apaga uma resposta que é só o enquadramento",()=>{
    expect(shortAnswerCore("é")).toBe("e");
  });
});
