import pilot from "../../content/vnext/portuguese/foundation/portuguese-639-pilot.json";
import wave1 from "../../content/vnext/portuguese/foundation/portuguese-639-wave1.json";
import wave2 from "../../content/vnext/portuguese/foundation/portuguese-639-wave2.json";
import wave3 from "../../content/vnext/portuguese/foundation/portuguese-639-wave3.json";

export const PORTUGUESE_CONTENT_PACKS=[pilot,wave1,wave2,wave3];
export const PORTUGUESE_ITEMS=PORTUGUESE_CONTENT_PACKS.flatMap(pack=>pack.items);

export function portugueseItemById(id){
  return PORTUGUESE_ITEMS.find(item=>item.id===id)||null;
}
