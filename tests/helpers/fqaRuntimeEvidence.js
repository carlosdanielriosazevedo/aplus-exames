import {beginSubjectSession, advanceSubjectSession, recordSubjectSession} from "../../app/lib/subjectProgress.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {physicsChemistryStepwisePolicyFor} from "../../app/data/physicsChemistryStepwisePolicy.js";

// Positive fixtures exercise the ordinary runtime pipeline, never a test-only
// trust flag, persisted fingerprint or injected authority implementation.
export function recordedFqaSession({sessionId, items, responses, kind = "mission", completedAt = 100}) {
  return recordedFqaState({sessionId, items, responses, kind, completedAt}).subjectProgress["physics-chemistry-a"].sessions.at(-1);
}

export function recordedFqaState({sessionId, items, responses, kind = "mission", completedAt = 100}) {
  const subjectId = "physics-chemistry-a";
  let state = beginSubjectSession({xp: 0}, {subjectId, sessionId, kind, label: "Synthetic runtime", items, startedAt: completedAt - 1});
  const context = state.subjectProgress[subjectId].lastPosition;
  const results = items.map((item, index) => gradePhysicsChemistryResponse(item, responses?.[index] ?? correctFqaResponse(item), {...context, index}));
  state = advanceSubjectSession(state, subjectId, {sessionId, current: items.length - 1, results, updatedAt: completedAt});
  state = recordSubjectSession(state, {subjectId, sessionId, kind, label: "Synthetic runtime", items, results, completedAt});
  return state;
}

export function correctFqaResponse(item) {
  if (item.responseType === "multiple-choice") return item.answerIndex;
  if (item.responseType === "restricted-response") return "Synthetic scientific response";
  const policy = physicsChemistryStepwisePolicyFor(item);
  return {steps: Object.fromEntries(item.steps.map(step => [step.id, {
    work: policy.steps[step.id]?.acceptedRelations?.[0] || step.accepted?.[0] || step.expected,
    result: String(step.value ?? step.expected), unit: step.unit || ""
  }]))};
}
