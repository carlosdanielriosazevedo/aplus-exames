import {afterEach, describe, expect, test, vi} from "vitest";
import {FQA_SUBJECT as ID, academicProgressFor, fqaAssessmentPresentation, fqaExamResultPresentation, fqaResultEligibility, fqaResultContractEligibility, stampFqaResult, fqaPendingNotice, prepareFqaAcademicState, compareFqaAttemptVersions} from "../../app/lib/fqaAcademicIntegrity.js";
import {PHYSICS_CHEMISTRY_A_ITEMS as items} from "../../app/data/physicsChemistryFoundation.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {beginSubjectSession, advanceSubjectSession, recordSubjectSession, resetSubjectProgress, quarantineUnrecoverableSubjectSession} from "../../app/lib/subjectProgress.js";
import {studentStateForCloud, mergeStudentCloudState} from "../../app/lib/cloud.js";
import {safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
import {saveLocalState, loadLocalStateStatus} from "../../app/lib/persistence.js";
import {recordedFqaState} from "../helpers/fqaRuntimeEvidence.js";

const item = items.find(row => row.responseType === "multiple-choice");
const other = items.find(row => row.responseType === "multiple-choice" && row.id !== item.id);
const wrap = progress => ({xp: 240, subjectProgress: {[ID]: {subjectId: ID, version: 4, sessions: [], missionHistory: [], competence: {}, errorPatterns: {}, lastPosition: null, ...progress}}});
const pause = answer => ({sessionId: "synthetic-cloud-private-attempt", kind: "mission", label: "Synthetic", itemIds: [item.id], current: 0, startedAt: 100, updatedAt: 200, currentAnswer: answer, results: []});
let sequence = 0;
const live = (kind = "mission") => recordedFqaState({sessionId: "synthetic-context-" + sequence++, kind, items: [item], completedAt: 1000});
afterEach(() => vi.unstubAllGlobals());

describe("policy v2: no academic authority is reconstructed from stored claims", () => {
  test.each(["mission", "diagnostic", "mini_exam", "full_exam", "practice_exam"])("fresh %s context plus actual engine result is a positive control", kind => {
    const state = live(kind), session = state.subjectProgress[ID].sessions[0];
    expect(fqaResultEligibility(item, session.results[0], session).eligible).toBe(true);
    expect(academicProgressFor(state, ID).academicProjection.provenance).toHaveLength(1);
    expect(fqaAssessmentPresentation(session).objectiveCorrectLabel).toBe("1/1");
  });

  test.each(["mission", undefined, "historical-unknown", "diagnostic", "mini_exam"])("changing training kind to %s cannot promote a retained result", kind => {
    const state = live("training"), original = structuredClone(state), session = state.subjectProgress[ID].sessions[0];
    expect(fqaAssessmentPresentation(session).objectiveCorrectLabel).toBe("1/1");
    expect(academicProgressFor(state, ID).competence).toEqual({});
    session.kind = kind;
    const projected = academicProgressFor(state, ID);
    expect(projected.competence).toEqual({});
    expect(projected.errorPatterns).toEqual({});
    expect(projected.academicProjection.insufficient).toBe(true);
    expect(fqaAssessmentPresentation(session)).toMatchObject({objective: 0, correct: 0, excluded: 1});
    expect(session.results).toEqual(original.subjectProgress[ID].sessions[0].results);
    expect(state.xp).toBe(original.xp);
  });

  test.each([
    ["identity", session => { session.sessionId += "-changed"; }],
    ["item", session => { session.itemIds[0] = other.id; }],
    ["date", session => { session.completedAt++; }],
    ["original clock", session => { session.startedAt++; }],
    ["result", session => { session.results[0].correct = false; session.results[0].points = 0; session.results[0] = stampFqaResult(item, session.results[0]); }],
    ["kind", session => { session.kind = "training"; }]
  ])("a changed %s revokes even a coherent persisted result fingerprint", (_, mutate) => {
    const state = live(), session = state.subjectProgress[ID].sessions[0];
    mutate(session);
    expect(academicProgressFor(state, ID).academicProjection.insufficient).toBe(true);
    expect(fqaAssessmentPresentation(session).excluded).toBe(1);
  });

  test("catalogue fingerprints and invented local authority flags never mint a context", () => {
    const result = gradePhysicsChemistryResponse(item, item.answerIndex);
    expect(fqaResultContractEligibility(item, result).eligible).toBe(true);
    const session = {sessionId: "synthetic-claimed-authority", kind: "mission", itemIds: [item.id], results: [result], completedAt: 1000, academicContext: {verified: true, authenticated: true}, validated: true};
    expect(fqaResultEligibility(item, result, session)).toMatchObject({eligible: false, reason: "unverified_session_context"});
    expect(academicProgressFor(wrap({sessions: [session]}), ID).competence).toEqual({});
  });

  test("an engine result observed in training cannot be replayed into a genuine different mission context", () => {
    const training = beginSubjectSession({xp: 0}, {subjectId: ID, kind: "training", items: [item], sessionId: "synthetic-bound-training", startedAt: 10});
    const result = gradePhysicsChemistryResponse(item, item.answerIndex, training.subjectProgress[ID].lastPosition);
    const mission = beginSubjectSession({xp: 0}, {subjectId: ID, kind: "mission", items: [item], sessionId: "synthetic-replay-mission", startedAt: 20});
    const completed = recordSubjectSession(mission, {subjectId: ID, kind: "mission", items: [item], results: [result], sessionId: "synthetic-replay-mission", completedAt: 1000});
    expect(completed.xp).toBe(25);
    expect(academicProgressFor(completed, ID).competence).toEqual({});
    expect(fqaAssessmentPresentation(completed.subjectProgress[ID].sessions[0]).excluded).toBe(1);
  });

  test("a begun context does not certify a manually stamped result", () => {
    const state = beginSubjectSession({xp: 0}, {subjectId: ID, kind: "mission", items: [item], sessionId: "synthetic-manually-stamped", startedAt: 30});
    const result = stampFqaResult(item, {status: "final", final: true, correct: true, points: item.maxPoints || 10, maxPoints: item.maxPoints || 10, gradingMode: "deterministic"});
    const completed = recordSubjectSession(state, {subjectId: ID, kind: "mission", items: [item], results: [result], sessionId: "synthetic-manually-stamped", completedAt: 1000});
    expect(academicProgressFor(completed, ID).academicProjection.insufficient).toBe(true);
  });

  test("conflict and structural guards also constrain presentation of otherwise observed results", () => {
    const state = live(), progress = state.subjectProgress[ID], session = progress.sessions[0];
    expect(fqaAssessmentPresentation(session, {...progress, integrityConflictedSessionIds: [session.sessionId]}).excluded).toBe(1);
    expect(fqaAssessmentPresentation(session, {...progress, integrityRecoveryBlocked: true}).excluded).toBe(1);
  });

  test("a new application runtime excludes retained context claims while preserving every original", async () => {
    const state = live(), retained = JSON.parse(JSON.stringify(state)), before = JSON.stringify(retained);
    vi.resetModules();
    const fresh = await import("../../app/lib/fqaAcademicIntegrity.js");
    const projected = fresh.academicProgressFor(retained, ID);
    expect(projected.academicProjection).toMatchObject({policyVersion: 2, insufficient: true, coverage: "current-runtime-verified-contexts-only"});
    expect(projected.competence).toEqual({});
    expect(projected.errorPatterns).toEqual({});
    expect(JSON.stringify(retained)).toBe(before);
  });
});

describe("policy v2: private cloud absence is uncertainty, never proof of equality", () => {
  test("the shared comparison explicitly distinguishes equality, divergence and unknown private content", () => {
    const a=pause("Synthetic A"),b={...a,updatedAt:999},different={...a,currentAnswer:"Synthetic B"};
    const cloud=studentStateForCloud(wrap({lastPosition:a})).subjectProgress[ID].lastPosition;
    expect(compareFqaAttemptVersions(a,b)).toBe("equal");
    expect(compareFqaAttemptVersions(a,different)).toBe("different");
    expect(compareFqaAttemptVersions(a,cloud)).toBe("unknown");
    expect(compareFqaAttemptVersions(cloud,a)).toBe("unknown");
    expect(compareFqaAttemptVersions(cloud,cloud)).toBe("unknown");
  });

  test.each([0,10])("scientific exam points %s are absent, never zero-substituted, in the shared presenter", points => {
    const science=items.find(row=>row.responseType==="restricted-response");
    const result={status:"final",final:true,correct:true,points,provisionalPoints:points,maxPoints:10};
    const session={sessionId:"synthetic-excluded-exam",kind:"full_exam",itemIds:[science.id],results:[result],completedAt:10};
    expect(fqaExamResultPresentation(science,result,session)).toMatchObject({eligible:false,points:null,pending:true,label:"Sem avaliação verificável"});
  });
  for (const merge of [mergeStudentCloudState, safeCloudMerge]) {
    test(`${merge.name}: both orders block different A/B answers after redaction`, () => {
      const a = wrap({lastPosition: pause("Synthetic A"), lastActivityAt: 200}), b = wrap({lastPosition: pause("Synthetic B"), lastActivityAt: 300});
      for (const [local, remote] of [[a, b], [b, a]]) {
        const merged = merge(local, studentStateForCloud(remote)), p = merged.subjectProgress[ID];
        expect(p).toMatchObject({integrityPendingConflict: true, integrityPendingConflictKind: "privacy-unproven"});
        expect(JSON.stringify(p)).toContain(local.subjectProgress[ID].lastPosition.currentAnswer);
        expect(advanceSubjectSession(merged, ID, {current: 0, results: []})).toBe(merged);
        expect(beginSubjectSession(merged, {subjectId: ID, kind: "mission", items: [item]})).toBe(merged);
        expect(recordSubjectSession(merged, {subjectId: ID, kind: "mission", items: [item], results: []})).toBe(merged);
        expect(resetSubjectProgress(merged, ID)).toBe(merged);
        expect(quarantineUnrecoverableSubjectSession(merged, ID, [])).toBe(merged);
        expect(fqaPendingNotice(p)).toContain("Não foi possível confirmar esta retoma");
        expect(fqaPendingNotice(p)).toContain("respostas locais foram conservadas");
      }
    });
  }

  test("identical cloud-redacted copies also remain unproven rather than silently certified", () => {
    const state = wrap({lastPosition: pause("Synthetic same answer")});
    expect(mergeStudentCloudState(state, studentStateForCloud(state)).subjectProgress[ID].integrityPendingConflictKind).toBe("privacy-unproven");
    const alone = mergeStudentCloudState({xp: 0}, studentStateForCloud(state));
    expect(alone.subjectProgress[ID].integrityPendingConflict).toBe(true);
  });

  test("complete local copies with administrative-only differences resume in both orders and after storage reload", () => {
    const a = wrap({lastPosition: pause(1)}), b = structuredClone(a);
    b.subjectProgress[ID].lastPosition.updatedAt = 900;
    b.subjectProgress[ID].lastActivityAt = 900;
    const memory = new Map();
    vi.stubGlobal("localStorage", {getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: k => memory.delete(k)});
    for (const [left, right] of [[a, b], [b, a]]) {
      const merged = safeCloudMerge(left, right);
      expect(merged.subjectProgress[ID].integrityPendingConflict).toBe(false);
      expect(saveLocalState(merged)).toBe(true);
      const loaded = loadLocalStateStatus({}, () => ({})).state;
      const resumed = advanceSubjectSession(loaded, ID, {sessionId: pause().sessionId, current: 0, results: [], currentAnswer: 1});
      expect(resumed).not.toBe(loaded);
      expect(resumed.subjectProgress[ID].lastPosition.startedAt).toBe(100);
      expect(resumed.xp).toBe(240);
    }
  });

  test("old cloud clients cannot evade the conservative boundary by dropping integrity fields", () => {
    const state = wrap({lastPosition: pause("Synthetic retained")});
    const remote = studentStateForCloud(state);
    delete remote.subjectProgress[ID].lastPosition.integrityPrivacyOmissions;
    delete remote.subjectProgress[ID].integrityPendingConflict;
    delete remote.subjectProgress[ID].integrityPendingConflictKind;
    remote.schema = "aplus-student-state-v1";
    const merged = mergeStudentCloudState(state, remote);
    expect(merged.subjectProgress[ID].integrityPendingConflict).toBe(true);
    expect(JSON.stringify(merged)).toContain("Synthetic retained");
  });

  test("known divergence and an unknown cloud variant stay blocked through permutations and reload", () => {
    const a = wrap({lastPosition: pause("Synthetic A")}), b = wrap({lastPosition: pause("Synthetic B")});
    const unknown = studentStateForCloud(a);
    for (const order of [[a, b, unknown], [a, unknown, b], [unknown, b, a], [b, unknown, a]]) {
      let merged = order.reduce((left, right) => safeCloudMerge(left, right));
      merged = prepareFqaAcademicState(JSON.parse(JSON.stringify(merged)));
      expect(merged.subjectProgress[ID].integrityPendingConflict).toBe(true);
      expect(JSON.stringify(merged)).toContain("Synthetic A");
      expect(JSON.stringify(merged)).toContain("Synthetic B");
    }
  });
});
