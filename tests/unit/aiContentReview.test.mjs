import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {aiReviewFingerprint,aiReviewStatus} from "../../app/lib/aiContentReview.js";

// Decisão do product owner (2026-11-17): sem professores, a IA revê cada pergunta.
// Uma pergunta alterada depois da revisão deixa de contar como revista.
const registry=file=>JSON.parse(readFileSync(`content/reviews/ai/${file}`,"utf8"));

describe("revisão integral por IA",()=>{
  it("Física e Química A: todas as perguntas ativas revistas na versão atual",()=>{
    const status=aiReviewStatus(PHYSICS_CHEMISTRY_A_ITEMS,registry("physics-chemistry-a.json"));
    expect(status.stale,"alteradas depois da revisão — rever e atualizar o registo").toEqual([]);
    expect(status.missing,"sem revisão").toEqual([]);
  });
  it("a impressão digital muda quando o conteúdo muda",()=>{
    const item={id:"X",prompt:"P",options:["a","b"],answerIndex:0};
    expect(aiReviewFingerprint(item)).not.toBe(aiReviewFingerprint({...item,answerIndex:1}));
    expect(aiReviewFingerprint(item)).toBe(aiReviewFingerprint({...item,year:"10.º"}));
  });
});
