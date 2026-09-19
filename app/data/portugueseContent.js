import pilot from "../../content/vnext/portuguese/foundation/portuguese-639-pilot.json";
import wave1 from "../../content/vnext/portuguese/foundation/portuguese-639-wave1.json";
import wave2 from "../../content/vnext/portuguese/foundation/portuguese-639-wave2.json";
import wave3 from "../../content/vnext/portuguese/foundation/portuguese-639-wave3.json";
import wave4 from "../../content/vnext/portuguese/foundation/portuguese-639-wave4.json";
import wave5 from "../../content/vnext/portuguese/foundation/portuguese-639-wave5.json";
import wave6 from "../../content/vnext/portuguese/foundation/portuguese-639-wave6.json";
import difficulty from "../../content/vnext/portuguese/foundation/portuguese-639-difficulty.json";
import {applyPortugueseDifficulty} from "../lib/portugueseDifficulty.js";
import {applyPortugueseRubricObservations} from "./portugueseRubrics.js";

// Only content that has completed the full editorial/calibration pipeline is exposed
// to the runtime. Waves 7 and 8 deliberately remain candidate packs until their
// difficulty, rubric and boundary-case gates are green.
export const PORTUGUESE_CONTENT_PACKS=[pilot,wave1,wave2,wave3,wave4,wave5,wave6];
export const PORTUGUESE_DIFFICULTY_MATRIX=difficulty;
export const PORTUGUESE_ITEMS=applyPortugueseRubricObservations(applyPortugueseDifficulty(PORTUGUESE_CONTENT_PACKS.flatMap(pack=>pack.items),difficulty));

export function portugueseItemById(id){
  return PORTUGUESE_ITEMS.find(item=>item.id===id)||null;
}
