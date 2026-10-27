# FQA contextual pilot — execution without deploying or exporting a secret

## Verified workflow (Vercel CLI, October 2026)
Official Vercel CLI documentation: https://vercel.com/docs/cli/env
The command `vercel env run -e preview -- <command>` fetches Preview environment variables from the **linked** project and passes them to the command without writing a .env file. It does **not** perform deployment. The working directory must be linked to **applus-beta-synthetic-isolated**, NOT aplus-exames.

This is a local, manually initiated test on synthetic fixture data only. No real users, grade writes, XP or production updates.

### Prerequisites
- On an isolated local checkout, ensure Git HEAD is the tested PR #424 SHA, not the production main checkout.
- Authenticate CLI with the correct Vercel team; run `npx vercel@latest whoami`.
- Verify `.vercel/project.json` identifies **prj_8n5XwTMF651SAfsykIDji93oZp3r**. Linking should never select the production project.
- Confirm the dedicated `AI_GATEWAY_API_KEY` exists only on Preview, was created with $1 USD *soft* budget, never refresh, 7-day expiration. Even a $1 budget is **not** a hard cost ceiling.
- Confirm prices from `https://ai-gateway.vercel.sh/v1/models` immediately before a run.
- Use an isolated PowerShell window; never enter the key in the terminal, code, issue or chat.

### Free preflight
```powershell
npx vercel@latest env run -e preview -- node scripts/fqa-context-pilot.mjs --dry-run
```
The output must report `DRY_RUN`, seven responses, and zero reserved amount. This verifies that the command runs, but **does not prove** the API key was accepted by the provider.

### Explicit paid pilot (only following user approval, no automation)
PowerShell variables apply to the current window only. These are model identifiers/prices/approval flags, not secrets:
```powershell
$env:MODEL_ID = "openai/gpt-5.6-luna"
$env:PRICE_INPUT_PER_MILLION = "0.20"
$env:PRICE_OUTPUT_PER_MILLION = "1.20"
$env:PILOT_APPROVED = "YES"
$env:GATEWAY_KEY_BUDGET_CONFIRMED = "YES"
npx vercel@latest env run -e preview -- node scripts/fqa-context-pilot.mjs --live
```
The script reconfirms prices against the live catalogue. **Caution:** CLI environment composition/overriding must be confirmed before use because the command may replace inherited variables. Abort if the guard flags are not present or the isolated project identity cannot be proven.

### Results and restrictions
- Seven developer-written synthetic cases (one per scientific response item); neither accuracy nor holdout adjudication.
- Per-item structured verdicts, measured latency, token counts and an estimated USD spend are printed (not stored).
- Noncompliant output, timeouts, malformed JSON and unknown prices **never** award points.
- No production commit, deploy, merge or rollback.
- If the CLI is unavailable in this assistant's execution environment, the user must run the command in a local isolated working copy; do not retrieve the secret via Vercel API just to bridge tools.

**Status of actual provider experiment: NOT RUN.**
