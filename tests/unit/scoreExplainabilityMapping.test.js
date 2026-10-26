import {describe,it,expect} from 'vitest';
import {criterionPointRows,buildScoreExplainability} from '../../app/lib/scoreExplainability.js';
import {PHYSICS_CHEMISTRY_A_ITEMS} from '../../app/data/physicsChemistryFoundation.js';
import {gradePhysicsChemistryResponse} from '../../app/lib/physicsChemistryEngine.js';
describe('criterion point mapping preserves the grader result',()=>{
 it('uses scored maxPoints and awardedPoints without replacing the grade',()=>{
  const item=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.id==='FQA-R-ELEM-01');
  const result=gradePhysicsChemistryResponse(item,'Apresento uma ideia inicial, mas ainda não consigo justificar todos os elementos pedidos na questão.');
  expect(result.provisionalPoints).toBe(1.7);
  expect(result.final).toBe(false);expect(result.requiresReview).toBe(true);
  expect(result.scoreExplainability.rows.map(r=>r.maxPoints)).toEqual([5,5]);
  expect(result.scoreExplainability.rows.map(r=>r.awardedPoints)).toEqual([0,1.7]);
  expect(result.scoreExplainability.awardedPoints).toBe(result.provisionalPoints);
  expect(result.scoreExplainability.maxPoints).toBe(result.maxPoints);
  expect(result.scoreExplainability.explainable).toBe(true);
  expect(result.scoreExplainability.consistencyError).toBeNull();
 });
 it('retains legacy points weights and explicit zero maximum',()=>{
  expect(criterionPointRows([{id:'legacy',points:4,status:'partial'}])[0]).toMatchObject({maxPoints:4,awardedPoints:2,lostPoints:2});
  expect(criterionPointRows([{id:'zero',maxPoints:0,points:4,awardedPoints:0}])[0]).toMatchObject({maxPoints:0,awardedPoints:0,lostPoints:0});
 });
 it('keeps a real unexplained loss flagged after mapping scored criteria',()=>{
  const result=buildScoreExplainability({awardedPoints:1,maxPoints:10,criteria:[{id:'a',maxPoints:5,awardedPoints:5,status:'observed'},{id:'b',maxPoints:5,awardedPoints:5,status:'observed'}]});
  expect(result.explainable).toBe(false);
  expect(result.requiresReview).toBe(true);
  expect(result.consistencyError).toBe('ALL_CRITERIA_SOLID_BUT_SCORE_BELOW_MAX');
 });
});
