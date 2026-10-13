import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const persistence=readFileSync(new URL("../app/lib/persistence.js",import.meta.url),"utf8");
const pilot=readFileSync(new URL("../app/lib/beta.js",import.meta.url),"utf8");
const ingest=readFileSync(new URL("../app/lib/server/pilot-ingest.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/api/pilot/sync/route.js",import.meta.url),"utf8");
const app=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");

assert.match(app,/function BetaSessionFeedback/u,"A app deve manter feedback contextual após sessões.");
assert.match(app,/betaFeedback:\[\.\.\.\(prev\.betaFeedback\|\|\[\]\),row\]/u,"O feedback submetido deve ficar persistido no estado local.");
assert.match(persistence,/feedback:\(state\.betaFeedback\|\|\[\]\)\.map/u,"O envelope do piloto deve incluir feedback contextual.");
assert.match(ingest,/insert into pilot_feedback/u,"O backend deve persistir feedback do piloto.");
assert.match(ingest,/MAX_COMMENT=2000/u,"O feedback textual deve manter limite explícito.");

for(const event of ["onboarding_started","onboarding_completed","onboarding_abandoned","diagnostic_completed","practice_completed","mission_completed","mini_exam_completed","full_exam_completed"]){
  assert.match(pilot,new RegExp(event,"u"),`O funil do piloto deve proteger o evento ${event}.`);
}
assert.match(persistence,/aggregates:\(state\.pilotAggregates\|\|\[\]\)\.map/u,"A sincronização deve enviar apenas agregados diários do piloto.");
assert.match(persistence,/itemResults:\(state\.pilotItemResults\|\|\[\]\)\.map/u,"A sincronização deve enviar resultados por item sem resposta textual.");
assert.match(ingest,/insert into pilot_event_aggregates/u,"O backend deve persistir agregados do piloto.");
assert.match(ingest,/insert into pilot_item_results/u,"O backend deve persistir resultados por item.");
assert.match(ingest,/greatest\(pilot_event_aggregates\.total_count,excluded\.total_count\)/u,"Agregados têm de usar totais absolutos com GREATEST.");
assert.match(ingest,/MAX_SECONDS_PER_DAY=86_400/u,"Tempo diário precisa de teto de 86 400 segundos.");
assert.match(ingest,/EVENT_COUNT_LIMITS/u,"Cada tipo de evento precisa de teto próprio.");
assert.match(ingest,/ALLOWED_SUBJECTS/u,"Disciplina tem de usar enum fechado.");
assert.match(ingest,/ITEM_ID_RE/u,"itemId tem de ser validado por formato.");
assert.match(ingest,/enforcePilotRateLimit/u,"O sync precisa de rate limit persistente por utilizador.");
assert.doesNotMatch(ingest,/student_answer|response_text|answer_text/iu,"Resultados por item não podem persistir texto de resposta.");

assert.match(route,/requireSession\(\)/u,"O sync do piloto deve permanecer autenticado.");
assert.match(route,/sameOriginRequest\(request\)/u,"O sync do piloto deve rejeitar pedidos cross-site.");
assert.match(ingest,/activePilotConsent/u,"O sync deve exigir consentimento registado.");
assert.match(ingest,/CONSENT_REQUIRED/u,"Ausência de consentimento deve bloquear a recolha.");
assert.match(ingest,/const isTest=Boolean\(user\.is_test_account\)/u,"Conta de teste deve marcar, não saltar, as escritas.");
assert.match(ingest,/is_test=excluded\.is_test/u,"UPSERT deve manter marca de teste.");
assert.doesNotMatch(ingest,/if\(user\.is_test_account\)return/u,"Conta de teste não pode deixar de exercitar INSERT/UPSERT.");

assert.match(persistence,/betaSessions:_betaSessions,betaEvents:_betaEvents/u,"Filas raw antigas devem ser removidas antes de persistir localmente.");
assert.doesNotMatch(persistence,/productAnalytics:state\.productAnalytics/u,"Snapshots genéricos de productAnalytics não devem regressar ao envelope do piloto.");

console.log("✓ pilot feedback + analytics: telemetria mínima, validação defensiva, consentimento, CSRF e contas de teste marcadas protegidos");
