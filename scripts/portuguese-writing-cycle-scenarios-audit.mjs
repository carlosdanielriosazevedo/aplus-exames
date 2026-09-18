import assert from "node:assert/strict";
import {auditPortugueseWritingCycleScenarios} from "../app/lib/portugueseWritingCycleScenarios.js";

const results=auditPortugueseWritingCycleScenarios();
assert.ok(results.length>=3,"deve existir cobertura de cenários distintos");
assert.deepEqual(results.filter(result=>!result.pass),[],"todos os cenários pedagógicos devem cumprir o próximo passo esperado");
console.log(`Portuguese writing cycle scenarios audit: OK (${results.length})`);
