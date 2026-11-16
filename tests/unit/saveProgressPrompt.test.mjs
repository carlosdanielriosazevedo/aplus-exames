import {describe,expect,it} from "vitest";
import {accountPromptVisible} from "../../app/lib/accountPrompt.js";

const base={xp:40,diagnosticDone:true,missionHistory:[]};
describe("convite \"Guarda o teu plano\" (modelo Duolingo, sem insistência)",()=>{
  it("aparece no resultado do diagnóstico a quem não tem conta",()=>{
    expect(accountPromptVisible(base,"diagResult")).toBe(true);
    expect(accountPromptVisible(base,"home")).toBe(false);
  });
  it("depois de \"Agora não\" só volta uma vez, após 3 missões",()=>{
    const once={...base,accountPrompt:{dismissed:1}};
    expect(accountPromptVisible(once,"diagResult")).toBe(false);
    expect(accountPromptVisible({...once,missionHistory:[{},{}]},"home")).toBe(false);
    expect(accountPromptVisible({...once,missionHistory:[{},{},{}]},"home")).toBe(true);
    const twice={...base,missionHistory:[{},{},{}],accountPrompt:{dismissed:2}};
    expect(accountPromptVisible(twice,"home")).toBe(false);
    expect(accountPromptVisible(twice,"diagResult")).toBe(false);
  });
  it("nunca aparece a quem já entrou na conta nem na beta privada",()=>{
    expect(accountPromptVisible({...base,identity:{mode:"authenticated"}},"diagResult")).toBe(false);
    expect(accountPromptVisible({...base,betaMode:"friends_beta"},"diagResult")).toBe(false);
  });
});
