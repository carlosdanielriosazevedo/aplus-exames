import pilot from "../../content/vnext/portuguese/foundation/portuguese-639-pilot.json";
import wave1 from "../../content/vnext/portuguese/foundation/portuguese-639-wave1.json";
import wave2 from "../../content/vnext/portuguese/foundation/portuguese-639-wave2.json";
import wave3 from "../../content/vnext/portuguese/foundation/portuguese-639-wave3.json";
import difficulty from "../../content/vnext/portuguese/foundation/portuguese-639-difficulty.json";
import {applyPortugueseDifficulty} from "../lib/portugueseDifficulty.js";

export const PORTUGUESE_CONTENT_PACKS=[pilot,wave1,wave2,wave3];
export const PORTUGUESE_DIFFICULTY_MATRIX=difficulty;
export const PORTUGUESE_ITEMS=applyPortugueseDifficulty(PORTUGUESE_CONTENT_PACKS.flatMap(pack=>pack.items),difficulty);

export function portugueseItemById(id){
  return PORTUGUESE_ITEMS.find(item=>item.id===id)||null;
}
