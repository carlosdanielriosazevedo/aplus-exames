import {describe,it,expect} from 'vitest';
import {criterionPointRows,buildScoreExplainability} from '../../app/lib/scoreExplainability.js';
import {PHYSICS_CHEMISTRY_A_ITEMS} from '../../app/data/physicsChemistryFoundation.js';
import {gradePhysicsChemistryResponse} from '../../app/lib/physicsChemistryEngine.js';
describe('criterion point mapping preserves the grader result',()=>{
 it('does not expose false criterion scores from an unvalidated FQ A open grader',()=>{
  const item=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.id==='FQA-R-ELEM-01');
  const result=gradePhysicsChemistryResponse(item,'Apresento uma ideia inicial, mas ainda não consigo justificar todos os elementos pedidos na questão.');
  expect(result).toMatchObject({status:'ungraded-awaiting-validation',final:false,points:null,provisionalPoints:null,requiresReview:true,automaticScoringSuspended:true});
  expect(result.scoreExplainability).toBeNull();
  expect(result.criteria).toHaveLength(2);
  expect(result.criteria.every(row=>row.awardedPoints===null&&row.lostPoints===null)).toBe(true);
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
