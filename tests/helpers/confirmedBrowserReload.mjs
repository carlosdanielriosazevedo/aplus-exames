import assert from "node:assert/strict";

// Arm the MAIN document load before the action. A storage predicate can become
// true in the old document, immediately before location.reload() commits.
export async function confirmedBrowserReload(page,action,ready){
  const previousDocument=await page.evaluate(()=>performance.timeOrigin);
  await Promise.all([page.waitForEvent("load"),action()]);
  await page.waitForFunction(ready);
  const currentDocument=await page.evaluate(()=>performance.timeOrigin);
  assert.notEqual(currentDocument,previousDocument,"Expected a newly loaded main document");
  return {previousDocument,currentDocument};
}
