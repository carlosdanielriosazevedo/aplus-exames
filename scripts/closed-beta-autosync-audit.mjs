import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const persistence=readFileSync(new URL("../app/lib/persistence.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/api/beta/sync/route.js",import.meta.url),"utf8");
const ingest=readFileSync(new URL("../app/lib/server/beta-ingest.js",import.meta.url),"utf8");

assert.match(persistence,/FRIENDS_SYNC_DEBOUNCE_MS=4_000/u,"closed beta autosync must stay debounced");
assert.match(persistence,/FRIENDS_SYNC_RETRY_MS=60_000/u,"failed autosync must have a retry cooldown");
assert.match(persistence,/state\?\.betaMode!=="friends_beta"/u,"autosync must remain limited to the closed-beta mode");
assert.match(persistence,/friendsSyncInFlight/u,"autosync must prevent concurrent requests");
assert.match(persistence,/friendsBetaSyncSignature/u,"autosync must deduplicate unchanged telemetry");
assert.match(persistence,/scheduleFriendsBetaSync\(state\)/u,"local persistence must schedule closed-beta telemetry sync");
assert.match(persistence,/syncStateToBackend\(state\)/u,"autosync must reuse the authenticated central sync path");
assert.match(persistence,/signature===friendsSyncLastSignature/u,"successful telemetry must not be resent unchanged");

assert.match(route,/requireSession\(\)/u,"beta sync must remain authenticated server-side");
assert.match(route,/MAX_BYTES=1_500_000/u,"beta sync must keep a hard payload-size cap");
assert.match(route,/code:`auth:\$\{authenticated\.authUserId\}`/u,"participant identity must remain bound to the authenticated user");
assert.match(ingest,/MAX_SYNC_WRITE_OPS=2_500/u,"beta ingest must retain a maximum write budget per request");
assert.match(ingest,/SYNC_BATCH_TOO_LARGE/u,"oversized write batches must remain rejected");

console.log("✓ closed beta autosync: debounced, deduplicated, authenticated and bounded by payload/write limits");
