import {describe,expect,it} from "vitest";
import {PORTUGUESE_ITEMS} from "../../app/data/portugueseContent.js";

// O comprimento das opções não pode denunciar a resposta certa.
// Antes da reescrita (2026-11-16), na literatura a certa era a opção mais longa
// em 85% das perguntas e claramente mais longa (≥1,2×) em 67%.
const choice=PORTUGUESE_ITEMS.filter(item=>item.responseType==="multiple-choice");
function lengthCue(items){
  const correct=item=>item.options[item.answerIndex].length;
  const others=item=>item.options.filter((_,index)=>index!==item.answerIndex).map(option=>option.length);
  return {
    longest:items.filter(item=>correct(item)>Math.max(...others(item))).length/items.length,
    clearlyLongest:items.filter(item=>correct(item)>=1.2*Math.max(...others(item))).length/items.length
  };
}

describe("comprimento das opções em Português",()=>{
  it("literatura: escolher a opção mais longa não compensa",()=>{
    const {longest,clearlyLongest}=lengthCue(choice.filter(item=>item.id.startsWith("PT639-LIT-")));
    expect(longest).toBeLessThanOrEqual(0.35);
    expect(clearlyLongest).toBeLessThanOrEqual(0.05);
  });
  it("perguntas de base: escolher a opção mais longa não compensa",()=>{
    // Antes: 52% / 35%.
    const {longest,clearlyLongest}=lengthCue(choice.filter(item=>item.id.startsWith("PT639-FND-")));
    expect(longest).toBeLessThanOrEqual(0.35);
    expect(clearlyLongest).toBeLessThanOrEqual(0.05);
  });
});
