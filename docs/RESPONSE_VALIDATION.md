# Constructed response validation

## Supported checks

- Exact rational polynomial equivalence in one variable, x: addition, subtraction,
  multiplication, parentheses, division by nonzero constants and bounded powers.
- No sampled equivalence, eval, variable division or unrestricted symbolic algebra.
- Numbers and fractions retain their question-specific deterministic checks.
- Prose receives automatic credit only for a predefined complete formulation;
  keyword presence alone never certifies a justification.
- Common labelled derivative calculations can span lines or use an equality chain.

## Uncertainty and academic state

An unmatched step in free writing is marked `needs_review`, not automatically wrong.
Its points are excluded from confirmed points. The UI shows “Avaliação incompleta”
and confirmed points, never a speculative score range. Legacy upper bounds remain
in stored data for compatibility but are not displayed.
There is no automatic human-review service. The UI must not imply one exists.
Partial or unverified items do not update the binary mastery evidence model.
Old completed exams retain their stored results; this change does not retroactively
regrade or undo past mastery updates.

## Limits

This remains a bounded checkpoint evaluator, not a general proof checker. Alternative
methods and unrestricted prose may need verification. Whole-answer consistency,
contradictory statements, error propagation and arbitrary mathematical notation are
not fully evaluated. Do not describe the app as a reliable examiner for arbitrary work.
The writing toolbar provides input symbols, not automatic support for grading every
expression that can be entered (including roots, pi and infinity).

## Verification

`npm run constructed-response:audit` covers equivalent polynomials, rejected unsafe
and unsupported inputs, cursor insertion, incorrect quantity labels, negated prose,
incomplete score labels and isolation from mastery updates, plus existing sessions.

## Recognition and arithmetic feedback

- Unrecognizable input receives neutral “no recognizable work” feedback, not a
  mathematical declaration of invalidity. It awards no confirmed points.
- Labelled numeric/fraction steps accept bounded constant arithmetic and equality
  chains, including delta labels and equivalent decimal values.
- A labelled chain with an incorrect value fails that numeric checkpoint while
  independently recognized prior checkpoints can retain credit.
- Conflicting evaluable lines for the same numeric quantity require verification;
  the checker does not cherry-pick the correct line or assume the last is a correction.
- A bare, unlabelled line can satisfy only one rubric checkpoint. This prevents a
  single value from earning two steps that happen to share the same result. Labelled
  lines and equality chains can still support related checkpoints when appropriate.
- This is not whole-proof contradiction detection. Unmatched prose and alternative
  methods remain unsupported; the recognition heuristic never awards points.
- Stored completed exams keep their original grades; updated labels apply to them,
  while new grading reasons apply to newly delivered exams.

## Practice outside the mini-exam

Missions select one guided constructed question after three interactions when an
eligible checkpoint exercise matches the assigned focus. Guided practice is excluded
from mastery evidence and causal probing, while counting toward session activity.
The mission assignment and resumed current exercise remain frozen as before.
Free training replaces its last item with a matching constructed exercise (eight
items total), with optional hints and feedback only after Responder. Basic difficulty
is not filled with harder constructed questions. Existing drafts retain their items.
The constructed-response bank now covers twenty-two distinct competencies. Other focuses
retain their existing questions until they receive purpose-built rubrics.
No diagnostic selection changes. No unsupported answer is certified by the UI.
Training with constructed practice does not produce automatic mastery-confirmation
signals in this first release, since hints and partial results need a richer model.
The completed Free Training summary now retains confirmed rubric points and flags
incomplete automatic evaluation, instead of reducing a multi-step answer to a binary
correct/incorrect count. XP remains activity-based and mastery remains unchanged.
