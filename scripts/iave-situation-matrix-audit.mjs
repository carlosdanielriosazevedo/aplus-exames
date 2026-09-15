import assert from "node:assert/strict";
import {
  scoreIaveStep,iaveGlobalPenalty,dependentStepCap,applyIaveGlobalPenalties,
  iaveSituationLabel
} from "../app/lib/iaveScoring.js";

// Matriz normativa: Prova 635, 1.ª Fase 2026 — critérios gerais para itens por etapas.
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"instruction_violation"}),0,"Situação 2");
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"missing_required_work"}),0,"Situação 4");

assert.equal(iaveGlobalPenalty("copied_data_error",{difficultyReduced:false}),1,"Situação 6 sem redução de dificuldade: -1 global");
assert.equal(iaveGlobalPenalty("copied_data_error",{difficultyReduced:true}),0,"Situação 6 com dificuldade reduzida usa teto por etapa, não -1 global");
assert.equal(dependentStepCap(9,{upstreamDifficultyReduced:true}),4,"Parte inteira de metade da cotação");

assert.equal(scoreIaveStep({maxPoints:7,basePoints:7,reason:"copied_number_or_sign_error",difficultyReduced:false}),6,"Situação 7: -1 se não reduzir dificuldade");
assert.equal(scoreIaveStep({maxPoints:7,basePoints:7,reason:"copied_number_or_sign_error",difficultyReduced:true}),3,"Situação 7: metade inteira se reduzir dificuldade");
assert.equal(scoreIaveStep({maxPoints:10,basePoints:10,reason:"occasional_calculation_error"}),9,"Situação 8: -1 na etapa");
assert.equal(scoreIaveStep({maxPoints:9,basePoints:9,reason:"conceptual_error"}),4,"Situação 9: máximo de metade inteira");
assert.equal(scoreIaveStep({maxPoints:9,basePoints:9,reason:"incomplete_step",missingOnlyFinalPassage:true}),8,"Situação 10: falta só passagem final => -1");
assert.equal(scoreIaveStep({maxPoints:9,basePoints:9,reason:"incomplete_step",missingOnlyFinalPassage:false}),4,"Situação 10: restante incompletude => máximo metade inteira");

assert.equal(iaveGlobalPenalty("intermediate_rounding"),1,"Situação 11: -1 global");
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"wrong_final_form"}),7,"Situação 12: -1 na etapa final");
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"approximate_instead_of_exact"}),7,"Situação 13: -1 na etapa final");
assert.equal(scoreIaveStep({maxPoints:9,basePoints:9,reason:"approximate_used_instead_of_exact"}),4,"Situação 14: máximo metade inteira");
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"wrong_final_rounding"}),7,"Situação 15: -1 na etapa final");
assert.equal(scoreIaveStep({maxPoints:8,basePoints:8,reason:"omitted_final_unit"}),8,"Situação 16: sem desvalorização");
assert.equal(iaveGlobalPenalty("excess_elements",{affectsPerformance:false}),0,"Situação 17: excesso neutro não desvaloriza");
assert.equal(iaveGlobalPenalty("excess_elements",{affectsPerformance:true}),2,"Situação 17: excesso que afeta desempenho => -2");
assert.equal(iaveGlobalPenalty("formal_notation_error",{onlyZeroPointSteps:false}),1,"Situação 18: -1 global");
assert.equal(iaveGlobalPenalty("formal_notation_error",{onlyZeroPointSteps:true}),0,"Situação 18: sem penalização se só em etapas a zero");

assert.equal(applyIaveGlobalPenalties(20,[
  {reason:"intermediate_rounding"},
  {reason:"excess_elements",affectsPerformance:true}
]),17,"Penalizações globais acumulam sobre a soma atribuída");
assert.equal(iaveSituationLabel("conceptual_error"),"Situação 9");

console.log("✓ IAVE 2026 situation matrix: situações 2 e 4–18 codificadas e validadas");
