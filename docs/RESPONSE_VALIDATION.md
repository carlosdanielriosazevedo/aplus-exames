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
Its points are excluded from confirmed points and included in the displayed upper bound.
This is an interval of possible rubric points, not a statistical confidence interval.
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
provisional point bounds and isolation from mastery updates, plus existing sessions.
