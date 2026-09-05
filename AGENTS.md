# AGENTS.md — APP EXAMES NACIONAIS

Read this file before changing code.

## Product mission
Gamified, adaptive preparation app for Portuguese National Exams. Matemática A (635) is the first MVP subject, not the final product scope.

Core principle:
> O aluno não deve ter de saber o que precisa de estudar. A app deve perceber isso por ele e indicar qual é a melhor próxima ação.

Student experience principles:
> A A+ pensa muito e mostra pouco.

> Cada ecrã do aluno deve ter uma ação visualmente dominante.

Current version: 5.5.0.

## Non-negotiable product rules
- XP/streak/rankings measure effort/activity, never knowledge.
- Domain/competence scores measure learning.
- Never rank students publicly by Domain, Certainty, grades, weaknesses or exam performance.
- One principal Daily Mission per calendar day.
- Daily Mission is frozen once assigned for that day.
- A Daily Mission is a short study session, normally ~3–5 minutes.
- A Daily Mission should normally have at least 3 pedagogically useful interactions.
- Session duration and academic evidence quantity are separate concepts.
- Never create or inflate Domain/Certainty merely to prolong a Daily Mission.
- Repeated or near-equivalent items retain diminishing weight and do not count as independent evidence.
- Streak increments at most once per day from meaningful study, never from opening the app.
- Free Training must not directly change Domain/preparation estimates.
- One correct answer never proves mastery.
- Near-identical variants do not count as independent evidence.
- Diagnostic should use few highly informative questions and remains human-reviewed in the current hybrid policy.
- Preparation Index is not a predicted 0–20 National Exam mark.
- Important pedagogical decisions should have short human-readable explanations.

## Content / IAVE
Until explicit authorization/licensing is resolved:
- Do not copy, reproduce or adapt official IAVE exam questions, figures, tables, texts or correction criteria.
- New content must be original.
- Official exams remain restricted/locked.

Principle:
> IA cria variedade; a matemática determina se está certo.

Do not treat an LLM answer as mathematical certification. Prefer deterministic/local validation, independent checks, automated QA and human pedagogical review where required.

## Hybrid validation v5.5
Current closed-beta plan:
- 40 human-required reviews;
- 5 teacher-sample reviews;
- 24 machine-lane items;
- 45 human reviews total.

Machine-lane eligibility requires the exact current fingerprint and deterministic oracle evidence. Any content edit invalidates the old machine attestation.

Machine-only validation is allowed only for the current closed-beta policy. Keep productionEligible=false unless the product owner explicitly approves a future policy change.

## Teacher/editorial workflow
Editorial states include prototype, pending, reviewed and blocked.
A reviewed question changed later must lose the old approval automatically via version/fingerprint integrity.
Do not silently overwrite contradictory teacher decisions.
Reverting content creates a new version and does not resurrect an old approval automatically.

## Stable pedagogy
Taxonomy:
Tema → Submatéria → Competência → Microcompetência → Tipo cognitivo → Dificuldade → Pré-requisitos.

Stable pedagogical IDs are important. Never casually rename or reuse them.
Prerequisite reasoning is central.

## Privacy
Many users may be minors. Minimize data collection.
Keep product telemetry conceptually separate from academic state.
Do not add names, emails, passwords or concrete student answers to analytics without explicit approval.

## Secrets / external services
Never commit .env, .env.local, API keys, database passwords, auth secrets or private tokens.
.env.example may contain empty placeholders only.
Never activate paid/external services or create costs without explicit approval.

## Repository / deployment
Repository: carlosdanielriosazevedo/aplus-exames
Default branch: main
Existing Vercel project: aplus-exames
Do not create a second Vercel project.
Do not claim something is live merely because code/schema exists.

## Codex decision authority
You may autonomously handle internal engineering decisions such as refactors, bug fixes, tests, reliability, performance, analytics plumbing, internal security and code organization when product behavior is preserved.

Stop and ask before changing:
- final/public branding;
- pricing/business model;
- major student-facing UX or product direction;
- IAVE/legal/licensing policy;
- paid/external services;
- school/B2B direction;
- social-network features;
- native mobile rewrite;
- collection of new personal data from minors;
- hybrid human/machine validation policy materially.

## Operational autonomy
Codex has high autonomy for engineering work inside the `aplus-exames` repository.

For technical, reversible work confined to this repository, act autonomously instead of asking for command-by-command approval.

You may autonomously:
- inspect, create, edit, move and delete project files when required by the task;
- run terminal/PowerShell commands inside the repository;
- install and use declared project dependencies;
- add free/local development dependencies when clearly justified;
- run tests, audits, builds, linters and local development servers;
- clean generated caches/build artefacts;
- create `codex/*` branches;
- use Git normally, including add, commit, fetch, pull/rebase and push on `codex/*` branches;
- create and update Pull Requests;
- inspect CI, GitHub checks and logs;
- autonomously fix bugs, regressions, failing tests, reliability, performance, accessibility, internal security and technical debt;
- repeat implementation → testing → adversarial review → correction until the task is complete.

Do not stop merely because a test fails. Investigate, fix and rerun it.

Do not ask the product owner to manually run commands you can execute yourself.

Stop and ask before:
- merging to `main`, unless the task explicitly authorizes it;
- pushing directly to `main`;
- manually deploying to production;
- materially changing student-facing product direction or UX;
- changing final/public branding;
- changing pricing or business model;
- changing pedagogical policy;
- materially changing hybrid validation policy;
- making IAVE/legal/licensing decisions;
- activating paid/external services or creating costs;
- accessing or modifying real credentials/secrets;
- changing `.env` / `.env.local` with real values;
- collecting new personal data;
- modifying files outside `aplus-exames`;
- performing destructive actions outside the project scope.

Default rule:

**If a decision is technical, reversible and confined to the repository, decide and execute autonomously. If it affects product, pedagogy, legal, costs, personal data or production, ask first.**

## Development workflow
For meaningful work, prefer branch/PR workflow using branches such as codex/<task-name>.

Before coding:
1. Read AGENTS.md.
2. Inspect relevant code/docs.
3. Preserve current architecture unless explicitly asked otherwise.
4. Define acceptance criteria.

Before declaring completion:
1. Run relevant focused audits.
2. Run npm run syntax:audit when JS/JSX changes.
3. Run npm run technical:gate.
4. Expected result: TECHNICAL GATE: GO.
5. Report anything that could not be run; never pretend it passed.

Do not delete valid failing tests merely to get a green gate.

## Current priority
Do not add major features indiscriminately.
Highest priority is a real Beta Candidate for secondary-school students:
- polish existing experience;
- mobile usability;
- onboarding → diagnostic → plan → Daily Mission reliability;
- session/reload recovery;
- hide developer/internal UI from student beta;
- clear provisional-content messaging;
- trustworthy analytics;
- no dead ends;
- no fake production claims.

Do not pivot into schools, payments, full social networking, native mobile or multi-subject expansion unless explicitly requested.

## Completion report
When finishing a task, state:
- what changed;
- files/areas affected;
- important design choices;
- tests/audits and results;
- known limitations;
- whether deployment was performed or only prepared;
- any external/manual steps still required.

Be precise about implemented vs prepared vs simulated vs tested vs live.
