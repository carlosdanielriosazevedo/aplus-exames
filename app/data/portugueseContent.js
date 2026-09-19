import pilot from "../../content/vnext/portuguese/foundation/portuguese-639-pilot.json";
import wave1 from "../../content/vnext/portuguese/foundation/portuguese-639-wave1.json";
import wave2 from "../../content/vnext/portuguese/foundation/portuguese-639-wave2.json";
import wave3 from "../../content/vnext/portuguese/foundation/portuguese-639-wave3.json";
import wave4 from "../../content/vnext/portuguese/foundation/portuguese-639-wave4.json";
import wave5 from "../../content/vnext/portuguese/foundation/portuguese-639-wave5.json";
import wave6 from "../../content/vnext/portuguese/foundation/portuguese-639-wave6.json";
import wave7 from "../../content/vnext/portuguese/foundation/portuguese-639-wave7.json";
import wave8 from "../../content/vnext/portuguese/foundation/portuguese-639-wave8.json";
import wave9 from "../../content/vnext/portuguese/foundation/portuguese-639-wave9.json";
import wave10 from "../../content/vnext/portuguese/foundation/portuguese-639-wave10.json";
import difficulty from "../../content/vnext/portuguese/foundation/portuguese-639-difficulty.json";
import {applyPortugueseDifficulty} from "../lib/portugueseDifficulty.js";
import {applyPortugueseRubricObservations} from "./portugueseRubrics.js";

export const PORTUGUESE_CONTENT_PACKS=[pilot,wave1,wave2,wave3,wave4,wave5,wave6,wave7,wave8,wave9,wave10];
export const PORTUGUESE_DIFFICULTY_MATRIX=difficulty;
export const PORTUGUESE_ITEMS=applyPortugueseRubricObservations(applyPortugueseDifficulty(PORTUGUESE_CONTENT_PACKS.flatMap(pack=>pack.items),difficulty));

export function portugueseItemById(id){
  return PORTUGUESE_ITEMS.find(item=>item.id===id)||null;
}
