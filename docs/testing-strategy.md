# Automated testing strategy

This document defines the staged move from custom repository audits to a conventional automated test stack.

## Goal

Keep the existing audits where they are useful, but add standard test layers with clear ownership:

- **Vitest** for deterministic unit tests and fast regression tests;
- **React Testing Library** for component behaviour that does not need a real browser;
- **Playwright** for critical student and authentication journeys;
- **database/security integration tests** for Neon/Postgres RLS and authenticated data boundaries.

The audits remain useful as architecture/content invariants. They should not be the only executable safety net.

## Phase 1 — deterministic engines first

Introduce Vitest with no product behaviour changes.

First targets:

1. Mathematics constructed-response grading:
   - equivalent answers;
   - rounding/tolerance boundaries;
   - partial-credit checkpoints;
   - propagation of earlier arithmetic errors;
   - adversarial malformed input.

2. Portuguese deterministic correction helpers:
   - objective-response grading;
   - word-limit handling;
   - rubric observation state transitions;
   - revision/evidence persistence;
   - no accidental automatic final grade for open responses.

3. Reliability/state helpers:
   - diagnostic recovery;
   - session draft recovery;
   - daily mission assignment/idempotency;
   - subject-progress isolation.

Success criterion: critical engine code can be refactored with fast tests that assert outputs, not source-code regexes.

## Phase 2 — component behaviour

Add React Testing Library on top of Vitest.

Priority surfaces:

- “Responder” gates feedback correctly;
- mini-exam completion locks answers and opens review;
- Portuguese/Matemática A subject switching preserves the shared shell;
- “Praticar” and “Rever matéria” remain separate behaviours;
- diagnostic feedback reveals the correct answer only after submission.

These tests replace fragile UI-source assertions where behaviour can be exercised directly.

## Phase 3 — Playwright smoke/E2E

Add a small Playwright suite, intentionally narrow.

Required journeys:

1. first entry → subject selection → profile → diagnostic → result → home;
2. Daily Mission can complete and recover after reload;
3. free practice answer flow;
4. mini-exam finish → review;
5. switch Matemática A ↔ Português without layout/runtime failure;
6. “Rever matéria” contains no question-answer workflow.

Run a small smoke set on every PR and a larger set on main/nightly if runtime becomes expensive.

## Phase 4 — authentication and RLS

This is security-critical and should not be mocked only at the UI layer.

Create an isolated test database/branch and test with separate identities/roles:

- student A cannot read/write student B academic state;
- parent/guardian linkage only exposes authorised child data;
- unauthenticated requests cannot access private academic rows;
- role escalation cannot be achieved by client-supplied identifiers;
- inserts/updates are rejected when ownership predicates fail;
- service/server paths that intentionally bypass RLS are tested separately and kept minimal.

Prefer SQL/integration tests against a disposable Neon branch or equivalent isolated Postgres instance. Never run destructive RLS tests against production.

## CI rollout

Suggested sequence:

- `test:unit` — Vitest, every PR;
- `test:components` — Vitest + RTL, every PR;
- `test:e2e:smoke` — Playwright, every PR once stable;
- `test:security` — isolated DB/RLS suite on security/auth changes and main;
- keep `technical:gate` while migrating invariants out of regex/source audits.

A test should move from an audit into Vitest/Playwright when it is validating behaviour rather than repository shape.

## First implementation slice

When we start this work, do not attempt a big-bang conversion. Add Vitest and migrate 10–20 high-value deterministic cases from the correction engines first. That provides immediate regression value without blocking product work.
