import {describe, expect, test, vi} from "vitest";
import {FQA_SUBJECT as ID, normalizeFqaProgress, prepareFqaAcademicState, academicProgressFor, fqaAssessmentPresentation, restoreFqaResultView} from "../../app/lib/fqaAcademicIntegrity.js";
import {studentStateForCloud, mergeStudentCloudState} from "../../app/lib/cloud.js";
import {PHYSICS_CHEMISTRY_A_ITEMS as items} from "../../app/data/physicsChemistryFoundation.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {beginSubjectSession, advanceSubjectSession, resetSubjectProgress} from "../../app/lib/subjectProgress.js";
import {recordedFqaSession} from "../helpers/fqaRuntimeEvidence.js";
import {saveLocalState} from "../../app/lib/persistence.js";

const objective = items.find(item => item.responseType === "multiple-choice");
const science = items.find(item => item.responseType === "restricted-response");
const grade = gradePhysicsChemistryResponse(objective, objective.answerIndex);
const event = (item = objective, result = grade) => ({sessionId: "synthetic-structural-event", kind: "mission", itemIds: [item.id], results: [result], completedAt: 1000});
const progress = fields => ({subjectId: ID, version: 4, sessions: [], missionHistory: [], competence: {}, errorPatterns: {}, lastPosition: null, ...fields});
const state = fields => ({xp: 430, streak: 3, subjectProgress: {[ID]: progress(fields)}});
const pause = () => ({sessionId: "synthetic-structural-pause", kind: "mission", itemIds: [objective.id], current: 0, results: [], currentAnswer: 0, startedAt: 10, updatedAt: 20});
const PRIVATE = "SYNTHETIC PRIVATE RESPONSE — NEVER EXPORT";

describe("#450 opaque local recovery has no implicit cloud representation", () => {
  test.each(["sessions", "missionHistory", "lastPosition", "competence", "errorPatterns", "integrityHistory", "integrityRecoveryFields", "integrityPendingVariants"])("private scalar in %s remains local", field => {
    const original = state({[field]: PRIVATE}), copy = structuredClone(original);
    const prepared = prepareFqaAcademicState(original);
    expect(JSON.stringify(studentStateForCloud(prepared))).not.toContain(PRIVATE);
    expect(original).toEqual(copy);
    expect(JSON.stringify(prepared)).toContain(PRIVATE);
    const reloaded = mergeStudentCloudState(prepared, studentStateForCloud(prepared));
    expect(JSON.stringify(reloaded)).toContain(PRIVATE);
    expect(reloaded.xp).toBe(430);
  });

  test.each([
    {sessions: [{...event(), unexpected: {deep: [PRIVATE]}, label: PRIVATE, results: [{...grade, errorDiagnosis: {message: PRIVATE}, feedback: PRIVATE, nested: {response: PRIVATE}}]}]},
    {sessions: [{...event(), results: [PRIVATE]}]},
    {integrityHistory: [{...progress({}), integrityRecoveryFields: {sessions: {nested: [PRIVATE]}}}]},
    {integrityRecoveryFields: {sessions: [PRIVATE], lastPosition: {unexpected: {deep: {text: PRIVATE}}}}},
    {integrityHistory: [{...progress({}), sessions: [{...event(), results: [{...grade, steps: [{id: PRIVATE, errorType: PRIVATE}]}]}]}]},
    {lastPosition: {...pause(), currentAnswer: PRIVATE, unknown: {arbitrary: [PRIVATE]}, label: PRIVATE}}
  ])("never serializes unknown/private fields at unexpected depths %#", fields => {
    const original = state(fields), copy = structuredClone(original), payload = studentStateForCloud(original);
    expect(JSON.stringify(payload)).not.toContain(PRIVATE);
    expect(original).toEqual(copy);
    expect(JSON.stringify(prepareFqaAcademicState(original))).toContain(PRIVATE);
  });

  test("only explicit result fields and catalogue step identities cross the boundary", () => {
    const payload = studentStateForCloud(state({sessions: [event(objective, {...grade, criteria: [{id: PRIVATE}], reviewRequired: true, unknown: PRIVATE})]}));
    const result = payload.subjectProgress[ID].sessions[0].results[0];
    expect(result.academicProvenance).toEqual(grade.academicProvenance);
    expect(result.correct).toBe(true);
    expect(result).not.toHaveProperty("criteria");
    expect(result).not.toHaveProperty("reviewRequired");
    expect(payload.subjectProgress[ID]).toMatchObject({competence: {}, errorPatterns: {}});
  });

  test("untransportable identities retain a remote recovery lock", () => {
    const payload = studentStateForCloud(state({sessions: [{...event(), sessionId: PRIVATE}], completedSessionIds: [PRIVATE]}));
    expect(payload.subjectProgress[ID]).toMatchObject({sessions: [], completedSessionIds: [], integrityRecoveryBlocked: true, integrityCloudOmitted: true});
    expect(JSON.stringify(payload)).not.toContain(PRIVATE);
  });

  test.each(["integrityPendingConflict", "integrityRecoveryBlocked"])("malformed %s cannot silently remove a guard during serialization", field => {
    const input=state({[field]:PRIVATE}),payload=studentStateForCloud(input);
    expect(payload.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);
    expect(payload.subjectProgress[ID].integrityCloudOmitted).toBe(true);
    expect(JSON.stringify(payload)).not.toContain(PRIVATE);
    expect(input.subjectProgress[ID][field]).toBe(PRIVATE);
  });

  test("unknown subject-map wrappers cannot bypass the FQA allowlist", () => {
    const original = state({});
    original.subjectProgress["unexpected-subject"] = {subjectId: ID, integrityHistory: [PRIVATE]};
    expect(JSON.stringify(studentStateForCloud(original))).not.toContain(PRIVATE);
    expect(original.subjectProgress["unexpected-subject"].integrityHistory).toEqual([PRIVATE]);
    expect(studentStateForCloud({...original, subjectProgress: PRIVATE}).subjectProgress).toEqual({});
  });

  test.each(["cycle", "bigint"])("%s serialization faults retain the prior durable source", kind => {
    const previous = "{\"synthetic-original\":true}";
    const memory = new Map([["a25", previous]]);
    vi.stubGlobal("localStorage", {getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value), removeItem: key => memory.delete(key)});
    try {
      const input = state({unknown: kind === "bigint" ? 1n : {}});
      if (kind === "cycle") input.subjectProgress[ID].unknown.self = input.subjectProgress[ID].unknown;
      expect(() => saveLocalState(input)).not.toThrow();
      expect(saveLocalState(input)).toBe(false);
      expect(memory.get("a25")).toBe(previous);
    } finally { vi.unstubAllGlobals(); }
  });
});

describe("#450 labels are display metadata, never a recovery bypass", () => {
  test("an explicitly submitted current result is recovered into a contiguous result list without dropping fields", () => {
    const submitted={...grade,responseText:"Synthetic retained submission",legacyEvidence:{preserve:["original"]}};
    const original=progress({lastPosition:{...pause(),currentResult:submitted,results:[]}});
    const normalized=normalizeFqaProgress(original);
    expect(normalized.lastPosition.results).toEqual([submitted]);
    expect(normalized.lastPosition.startedAt).toBe(original.lastPosition.startedAt);
    expect(normalized.integrityHistory.some(row=>row.lastPosition?.results?.length===0&&row.lastPosition?.currentResult?.legacyEvidence)).toBe(true);
    expect(normalized.integrityRecoveryBlocked).not.toBe(true);
    expect(normalizeFqaProgress(normalized)).toEqual(normalized);
  });

  test("a gap before the current question cannot be filled speculatively or rewarded", () => {
    const position={...pause(),itemIds:[objective.id,objective.id],current:1,results:[],currentResult:{...grade,responseText:"Synthetic current only"}};
    const normalized=prepareFqaAcademicState(state({lastPosition:position}));
    expect(normalized.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);
    expect(normalized.subjectProgress[ID].integrityRecoveryFields.lastPosition).toEqual(position);
    expect(normalized.subjectProgress[ID].lastPosition.results).toEqual([]);
    expect(advanceSubjectSession(normalized,ID,{current:1,results:[]})).toBe(normalized);
    expect(normalized.xp).toBe(430);
  });

  test("contradictory submitted-result copies remain separate and block unsafe continuation", () => {
    const a={...grade,responseText:"Synthetic submitted A"},b={...grade,responseText:"Synthetic submitted B"};
    const normalized=prepareFqaAcademicState(state({lastPosition:{...pause(),results:[a],currentResult:b}}));
    expect(normalized.subjectProgress[ID].integrityPendingConflict).toBe(true);
    expect(normalized.subjectProgress[ID].integrityPendingConflictKind).toBe("semantic-v1");
    expect(normalized.subjectProgress[ID].lastPosition.results[0]).toEqual(a);
    expect(normalized.subjectProgress[ID].lastPosition.currentResult).toEqual(b);
    expect(advanceSubjectSession(normalized,ID,{current:0,results:[b]})).toBe(normalized);
    expect(prepareFqaAcademicState(normalized)).toEqual(normalized);
  });
  test.each([undefined, null, 42, ""])("normalizes label %j and preserves its original", label => {
    const original = progress({lastPosition: {...pause(), label}}), copy = structuredClone(original);
    const normalized = normalizeFqaProgress(original);
    expect(normalized.lastPosition.label).toBe("Missão");
    expect(() => normalized.lastPosition.label.toUpperCase()).not.toThrow();
    expect(normalized.lastPosition.integrityOriginalLabel).toBe(label);
    expect(original).toEqual(copy);
    expect(normalized.integrityHistory.some(row => Object.is(row.lastPosition?.label, label))).toBe(true);
    expect(normalizeFqaProgress(normalized)).toEqual(normalized);
    expect(normalized.lastPosition.startedAt).toBe(10);
  });

  test.each(["integrityRecoveryBlocked", "integrityPendingConflict"])("normalization retains the %s guard", field => {
    const original = state({[field]: true, lastPosition: {...pause(), label: null}});
    const normalized = prepareFqaAcademicState(original);
    expect(normalized.subjectProgress[ID][field]).toBe(true);
    expect(beginSubjectSession(normalized, {subjectId: ID, kind: "mission", items: [objective]})).toBe(normalized);
    expect(advanceSubjectSession(normalized, ID, {current: 0, results: []})).toBe(normalized);
    expect(resetSubjectProgress(normalized, ID)).toBe(normalized);
  });

  test.each(["constructor", "__proto__", "unknown"])("unknown kind %s cannot supply a prototype label", kind => {
    const normalized = normalizeFqaProgress(progress({lastPosition: {...pause(), kind}}));
    expect(typeof normalized.lastPosition.label).toBe("string");
    expect(() => normalized.lastPosition.label.toUpperCase()).not.toThrow();
  });
});

describe("#450 all summaries share the academic eligibility boundary", () => {
  test.each([true, false])("scientific final/correct=%s flags never become positive or negative assessment", correct => {
    const raw = {status: "final", final: true, correct, points: correct ? 10 : 0, maxPoints: 10, requiresReview: false};
    for (const result of [raw, restoreFqaResultView(science, raw)]) {
      const summary = fqaAssessmentPresentation(event(science, result));
      expect(summary).toMatchObject({objective: 0, correct: 0, provisional: 0, excluded: 1, objectiveCorrectLabel: "—"});
      expect(summary.summary).toContain("sem avaliação verificável");
      expect(summary.summary).not.toMatch(/correção concluída|respostas com avaliação verificável/);
    }
    expect(academicProgressFor(state({sessions: [event(science, raw)]}), ID).competence).toEqual({});
  });

  test("changed objective result cannot be displayed as a verified correct answer", () => {
    const changed = {...grade, points: 0};
    expect(fqaAssessmentPresentation(event(objective, changed))).toMatchObject({objective: 0, excluded: 1, objectiveCorrectLabel: "—"});
  });

  test("valid objective and unanswered controls retain their separate meanings", () => {
    expect(fqaAssessmentPresentation(recordedFqaSession({sessionId:"synthetic-summary-valid",items:[objective]}))).toMatchObject({objective: 1, correct: 1, excluded: 0, objectiveCorrectLabel: "1/1"});
    expect(fqaAssessmentPresentation(event(objective, {status: "unanswered", final: true, points: 0}))).toMatchObject({objective: 0, excluded: 0, unanswered: 1});
  });
});
