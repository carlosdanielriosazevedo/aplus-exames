import {physicsChemistryItemById} from "../data/physicsChemistryFoundation.js";

// This is a transport projection, never a replacement for the local archive.
// In particular, opaque recovery material has no safe cloud representation.
const object = value => !!value && typeof value === "object" && !Array.isArray(value);
const rows = value => Array.isArray(value) ? value : [];
const finite = value => Number.isFinite(value);
const identifier = value => typeof value === "string" && /^[a-z0-9][a-z0-9:._-]{0,255}$/i.test(value);
const kinds = new Set(["diagnostic", "mission", "training", "mini_exam", "full_exam", "practice_exam"]);
const statuses = new Set(["final", "unanswered", "provisional-review", "auto-assessed-provisional", "correct", "incorrect", "partial", "observed", "not-observed", "needs_review", "alternative-method-review", "pending", "process-missing", "result-missing", "analytical-error", "follow-through", "numeric-error", "unit-error"]);
const modes = new Set(["deterministic", "structured-provisional", "auto-assessed-provisional", "rubric", "restricted-self-assessment"]);
const errors = new Set([1, 2, "units", "sign", "rounding", "type1", "type2", "process-omitted", "calculation_error", "conceptual_error", "missing_required_work", "instruction_violation", "wrong_quantity", "wrong_final_form"]);
const privateFields = ["answers", "answer", "currentAnswer", "responseText", "previousResponseText", "studentEvidence"];

function omissionMask(value) {
  let mask = Number.isInteger(value.integrityPrivacyOmissions) ? value.integrityPrivacyOmissions & 63 : 0;
  privateFields.forEach((field, index) => { if (Object.hasOwn(value, field)) mask |= 1 << index; });
  return mask ? {integrityPrivacyOmissions: mask} : {};
}

function result(value, item) {
  if (!object(value)) return null;
  const out = {...omissionMask(value)};
  if (statuses.has(value.status)) out.status = value.status;
  if (modes.has(value.gradingMode)) out.gradingMode = value.gradingMode;
  for (const field of ["final", "requiresReview"]) if (typeof value[field] === "boolean") out[field] = value[field];
  if (typeof value.correct === "boolean" || value.correct === null) out.correct = value.correct;
  for (const field of ["points", "maxPoints", "provisionalPoints", "penalty", "type1Count", "type2Count", "revisionCount"]) {
    if (finite(value[field]) || value[field] === null) out[field] = value[field];
  }
  if (typeof value.countsForExamScore === "boolean" || value.countsForExamScore === null) out.countsForExamScore = value.countsForExamScore;
  if (value.classificationMode === null) out.classificationMode = null;
  if (Array.isArray(value.steps)) {
    out.steps = value.steps.filter(step => object(step) && item?.steps?.some(source => source.id === step.id)).map(step => {
      const safe = {id: step.id};
      if (statuses.has(step.status)) safe.status = step.status;
      for (const field of ["points", "maxPoints"]) if (finite(step[field]) || step[field] === null) safe[field] = step[field];
      if (errors.has(step.errorType)) safe.errorType = step.errorType;
      else if (step.errorType === null) safe.errorType = null;
      return safe;
    });
  }
  const proof = value.academicProvenance;
  if (object(proof) && proof.policyVersion === 1 && proof.source === "fqa-recorded-engine-v1" &&
      /^fqa1-[a-f0-9]{1,8}$/.test(proof.itemFingerprint) && /^fqa1-[a-f0-9]{1,8}$/.test(proof.resultFingerprint)) {
    out.academicProvenance = {policyVersion: 1, source: proof.source, itemFingerprint: proof.itemFingerprint, resultFingerprint: proof.resultFingerprint};
  }
  return out;
}

function event(value, pending = false) {
  if (!object(value) || !identifier(value.sessionId) || !kinds.has(value.kind) ||
      !Array.isArray(value.itemIds) || !value.itemIds.length || !value.itemIds.every(id => !!physicsChemistryItemById(id))) return null;
  const out = {sessionId: value.sessionId, kind: value.kind, itemIds: [...value.itemIds], ...omissionMask(value)};
  for (const field of ["startedAt", "completedAt", "updatedAt", "lastActivityAt"]) if (finite(value[field])) out[field] = value[field];
  if (Array.isArray(value.results)) out.results = value.results.map((row, index) => result(row, physicsChemistryItemById(value.itemIds[index])));
  if (pending) {
    if (!Number.isInteger(value.current) || value.current < 0 || value.current >= value.itemIds.length || !finite(value.startedAt)) return null;
    out.current = value.current;
    if (value.currentResult === null) out.currentResult = null;
    else if (object(value.currentResult)) out.currentResult = result(value.currentResult, physicsChemistryItemById(value.itemIds[value.current]));
  }
  // Labels, feedback, arbitrary IDs inside recovery blobs and all free-form
  // extensions are deliberately local. No hash of their contents is exported.
  return out;
}

export function fqaProgressForCloud(value) {
  const seen = new WeakSet();
  function progress(source, archive = false) {
    if (!object(source) || seen.has(source)) return null;
    seen.add(source);
    const out = {subjectId: "physics-chemistry-a", competence: {}, errorPatterns: {}};
    if (Number.isInteger(source.version) && source.version >= 1 && source.version <= 4) out.version = source.version;
    for (const field of ["diagnosticDone", "integrityRecoveryBlocked", "integrityPendingConflict"]) if (typeof source[field] === "boolean") out[field] = source[field];
    for (const field of ["diagnosticCompletedAt", "lastActivityAt"]) if (finite(source[field]) || source[field] === null) out[field] = source[field];
    if ([1, 2].includes(source.academicIntegrityPolicy)) out.academicIntegrityPolicy = source.academicIntegrityPolicy;
    if (["semantic-v1", "legacy-unresolved", "privacy-unproven"].includes(source.integrityPendingConflictKind)) out.integrityPendingConflictKind = source.integrityPendingConflictKind;
    for (const field of ["sessions", "missionHistory"]) out[field] = rows(source[field]).map(row => event(row)).filter(Boolean);
    for (const field of ["completedSessionIds", "integrityConflictedSessionIds"]) out[field] = rows(source[field]).filter(identifier);
    out.interruptedTechnicalSessions = rows(source.interruptedTechnicalSessions).filter(row => object(row) && identifier(row.sessionId)).map(row => ({sessionId: row.sessionId, ...(finite(row.at) ? {at: row.at} : {})}));
    out.lastPosition = source.lastPosition == null ? null : event(source.lastPosition, true);
    out.integrityPendingVariants = rows(source.integrityPendingVariants).map(row => event(row, true)).filter(Boolean);
    const droppedEvents = ["sessions", "missionHistory", "completedSessionIds", "integrityConflictedSessionIds", "interruptedTechnicalSessions", "integrityPendingVariants"].some(field => source[field] !== undefined && (!Array.isArray(source[field]) || source[field].length !== out[field].length));
    const malformedGuard = ["integrityPendingConflict", "integrityRecoveryBlocked"].some(field => Object.hasOwn(source, field) && typeof source[field] !== "boolean");
    if (droppedEvents || malformedGuard || (source.lastPosition != null && !out.lastPosition) || Object.hasOwn(source, "integrityRecoveryFields") || Object.hasOwn(source, "integrityMalformedRoot")) {
      out.integrityRecoveryBlocked = true;
      out.integrityCloudOmitted = true;
    }
    if (object(source.integrityRecoveryFields)) {
      const safe = Object.fromEntries(["sessions", "missionHistory", "competence", "errorPatterns", "lastPosition", "completedSessionIds", "interruptedTechnicalSessions"].filter(field => source.integrityRecoveryFields[field] === null).map(field => [field, null]));
      if (Object.keys(safe).length) out.integrityRecoveryFields = safe;
    }
    if (!archive) out.integrityHistory = rows(source.integrityHistory).map(row => progress(row, true)).filter(Boolean);
    if (source.integrityCloudOmitted === true) out.integrityCloudOmitted = true;
    seen.delete(source);
    return out;
  }
  return progress(value) || {subjectId: "physics-chemistry-a", sessions: [], missionHistory: [], competence: {}, errorPatterns: {}, lastPosition: null, integrityRecoveryBlocked: true, integrityCloudOmitted: true};
}
