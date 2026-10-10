import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const persistence=readFileSync(new URL("../app/lib/persistence.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/api/pilot/sync/route.js",import.meta.url),"utf8");
const ingest=readFileSync(new URL("../app/lib/server/pilot-ingest.js",import.meta.url),"utf8");

assert.match(persistence,/PILOT_SYNC_DEBOUNCE_MS=4_000/u,"pilot autosync must stay debounced");
assert.match(persistence,/PILOT_SYNC_RETRY_MS=60_000/u,"failed pilot autosync must have a retry cooldown");
assert.match(persistence,/state\?\.betaMode!=="friends_beta"/u,"pilot autosync must remain limited to the closed-beta mode");
assert.match(persistence,/pilotSyncInFlight/u,"pilot autosync must prevent concurrent requests");
assert.match(persistence,/pilotSyncSignature/u,"pilot autosync must deduplicate unchanged telemetry");
assert.match(persistence,/schedulePilotSync\(clean\)/u,"local persistence must schedule pilot sync");
assert.match(persistence,/fetch\("\/api\/pilot\/sync"/u,"client must use the pilot sync endpoint");
assert.match(persistence,/betaSessions:_betaSessions,betaEvents:_betaEvents/u,"legacy raw beta queues must be stripped before local persistence");
assert.match(persistence,/schema:"aplus-pilot-v1"/u,"pilot envelope must be explicitly versioned");

assert.match(route,/requireSession\(\)/u,"pilot sync must remain authenticated server-side");
assert.match(route,/MAX_BYTES=250_000/u,"pilot sync must keep a tight payload-size cap");
assert.match(ingest,/activePilotConsent/u,"pilot ingest must require registered consent");
assert.match(ingest,/CONSENT_REQUIRED/u,"missing consent must block telemetry");
assert.match(ingest,/is_test_account/u,"marked test accounts must be excluded from metrics");
assert.match(ingest,/greatest\(pilot_event_aggregates\.total_count,excluded\.total_count\)/u,"aggregate sync must use absolute totals");
assert.match(ingest,/MAX_AGGREGATES=200/u,"pilot ingest must cap aggregate rows per request");
assert.match(ingest,/MAX_ITEM_RESULTS=500/u,"pilot ingest must cap item-result rows per request");
assert.match(ingest,/MAX_FEEDBACK=50/u,"pilot ingest must cap feedback rows per request");

console.log("✓ pilot autosync: minimal, consent-gated, debounced, deduplicated, test-account excluded and absolute-total based");
