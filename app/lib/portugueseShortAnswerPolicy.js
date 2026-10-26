// Closed-answer policy audited against the 79 foundation short-answer items (41 closed / 38 free).
// Conservative: unknown items and changes to prompt or acceptedAnswers require human review.
// FNV-1a fingerprints are content-change tripwires, not security signatures.
const CLOSED_SIGNATURES=Object.freeze({
  "PT639-FND-003":"064c41f3",
  "PT639-FND-008":"c2f48ae0",
  "PT639-FND-009":"d0b50169",
  "PT639-FND-022":"4b0f235c",
  "PT639-FND-024":"d39b88e2",
  "PT639-FND-044":"7caf8920",
  "PT639-FND-048":"4343f724",
  "PT639-FND-056":"6457fff5",
  "PT639-FND-063":"89bee7cf",
  "PT639-FND-070":"dcd85403",
  "PT639-FND-073":"ced988ac",
  "PT639-FND-079":"902d585c",
  "PT639-FND-082":"166f31ff",
  "PT639-FND-098":"e41033b9",
  "PT639-FND-102":"7dfd1b5c",
  "PT639-FND-105":"35d2e04d",
  "PT639-FND-108":"f8d8df14",
  "PT639-FND-115":"82818e6c",
  "PT639-FND-116":"74e939b4",
  "PT639-FND-118":"3b06d64f",
  "PT639-FND-119":"45182e04",
  "PT639-FND-129":"ecfefa7f",
  "PT639-FND-141":"e5d95af1",
  "PT639-FND-148":"38596135",
  "PT639-FND-151":"4efe6536",
  "PT639-FND-165":"97e4718e",
  "PT639-FND-176":"50d0cc9b",
  "PT639-FND-201":"31d24ec9",
  "PT639-FND-203":"8cefc2f6",
  "PT639-FND-207":"ec98dbde",
  "PT639-FND-219":"1b5355f5",
  "PT639-FND-220":"4f4b9304",
  "PT639-FND-222":"e2754ce6",
  "PT639-FND-244":"fdbc5336",
  "PT639-FND-246":"52214628",
  "PT639-FND-269":"9a4e2d5f",
  "PT639-FND-272":"f642f960",
  "PT639-FND-274":"ca93dc1f",
  "PT639-FND-295":"de96a58a",
  "PT639-FND-316":"94e0d7a5",
  "PT639-FND-318":"8c4b6f2d"
});
export function portugueseShortAnswerFingerprint(item){
  const text=JSON.stringify([item?.id,item?.prompt,item?.acceptedAnswers]);
  let hash=2166136261;
  for(let index=0;index<text.length;index++){
    hash^=text.charCodeAt(index);
    hash=Math.imul(hash,16777619);
  }
  return (hash>>>0).toString(16).padStart(8,"0");
}
export function isPortugueseClosedShortAnswer(item){
  return item?.responseType==="short-answer"&&
    Object.prototype.hasOwnProperty.call(CLOSED_SIGNATURES,item.id)&&
    CLOSED_SIGNATURES[item.id]===portugueseShortAnswerFingerprint(item);
}
export function portugueseShortAnswerReviewRequired(item){
  return item?.responseType==="short-answer"&&!isPortugueseClosedShortAnswer(item);
}
