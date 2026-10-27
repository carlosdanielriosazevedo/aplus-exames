# FQ A contextual pilot — verified model shortlist (27 October 2026)

Source checked live in isolated Vercel Sandbox: https://ai-gateway.vercel.sh/v1/models. Prices are **catalogue USD per million tokens**, not actual billing evidence.

| Model ID | Input USD / 1M | Output USD / 1M | Role |
| --- | ---: | ---: | --- |
| openai/gpt-5.6-luna | 0.20 | 1.20 | First economical research candidate |
| openai/gpt-5.4-mini | 0.75 | 4.50 | Independent comparison candidate |
| openai/gpt-5.6-terra | 2.00 | 12.00 | Stronger fallback to examine if justified |
| openai/gpt-5.5 | 5.00 | 30.00 | Expensive comparator only with quality justification |

No claims of Portuguese FQ A grading quality follow from these prices. Model catalogue may change; re-read pricing immediately before any execution.

## Actual next gate
1. Create an isolated AI Gateway key with account-side budget and short validity; do not reuse production credentials.
2. Confirm model ID and current price in live catalogue and provider compatibility with the current OpenAI-style chat-completion endpoint.
3. Supply those verified values to the opt-in synthetic executor (never student responses); maximum 7 requests, one per item.
4. Compare evidence fidelity, scientific contradictions, abstention, latency and actual token usage. Budget is a **soft financial control**, not a guaranteed hard billing stop.
5. Do not enable real-world scoring, merge to main or publish until independent teacher holdout and safety gates pass.

**Current status: NO API key configured in isolated test project. No paid pilot run. PR #420 remains NO-GO.**
