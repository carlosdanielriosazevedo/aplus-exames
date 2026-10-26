import {test,expect} from "vitest";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../../app/data/physicsChemistryConstructed.js";
import {restorePhysicsChemistrySubmittedResponse} from "../../app/lib/physicsChemistrySubmittedRecovery.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";

const item=PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.find(row=>row.id==="FQA-R-ENE-01");
if(!item)throw Error("Missing physics chemistry fixture");

test("restoring a legacy 9.2/12 false-positive does not restore the score or confidence",()=>{
  const response="A energia conserva-se sempre, basta medir massa e altura.";
  const unsafe={status:"auto-assessed-provisional",final:false,correct:true,
    points:9.2,provisionalPoints:9.2,autoAssessmentConfidence:98,
    rubricCompleted:true,responseText:response,
    feedbackSummary:{strengths:[{label:"Correto"}]},
    scoreExplainability:{rows:[{awardedPoints:9.2}]}};
  const recovered=restorePhysicsChemistrySubmittedResponse(item,unsafe);
  expect(recovered).toMatchObject({
    status:"ungraded-awaiting-validation",final:false,correct:null,
    points:null,provisionalPoints:null,autoAssessmentConfidence:null,
    automaticScoringSuspended:true,rubricCompleted:true,requiresReview:true,
    feedbackSummary:null,scoreExplainability:null,responseText:response
  });
  expect(recovered.criteria.length).toBeGreaterThan(0);
  expect(recovered.criteria.every(row=>row.status==="pending"&&row.awardedPoints===null)).toBe(true);
});

test("current safe submission stays locked and regains its reference criteria after compacting",()=>{
  const original=gradePhysicsChemistryResponse(item,
    "A energia mecânica inicial e a final podem ser comparadas com a incerteza.");
  const compact={
    status:original.status,final:false,responseText:original.responseText,
    automaticScoringSuspended:true,requiresReview:true,provisionalPoints:null
  };
  const restored=restorePhysicsChemistrySubmittedResponse(item,compact);
  expect(restored.automaticScoringSuspended).toBe(true);
  expect(restored.responseText).toBe(original.responseText);
  expect(restored.criteria.length).toBeGreaterThan(0);
  expect(restored.provisionalPoints).toBeNull();
});

test("historical submission without responseText remains locked even if storage is incomplete",()=>{
  const unsafe={status:"auto-assessed-provisional",provisionalPoints:9.2};
  const recovered=restorePhysicsChemistrySubmittedResponse(item,unsafe);
  expect(recovered).toMatchObject({
    status:"ungraded-awaiting-validation",final:false,points:null,
    provisionalPoints:null,requiresReview:true,
    automaticScoringSuspended:true,responseText:""
  });
  expect(recovered.note).toMatch(/não pôde ser recuperado/u);
  const withSavedAnswer=restorePhysicsChemistrySubmittedResponse(item,unsafe,"Resposta antiga submetida");
  expect(withSavedAnswer.responseText).toBe("Resposta antiga submetida");
});

test("not-submitted and non-open items do not receive fabricated review markers",()=>{
  expect(restorePhysicsChemistrySubmittedResponse(item,null)).toBeNull();
  const unanswered={status:"unanswered",final:false};
  expect(restorePhysicsChemistrySubmittedResponse(item,unanswered)).toBe(unanswered);
  const choice={responseType:"multiple-choice"};
  const original={status:"final",final:true,points:10};
  expect(restorePhysicsChemistrySubmittedResponse(choice,original)).toBe(original);
});
