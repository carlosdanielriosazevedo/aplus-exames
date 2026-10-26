// Closed-answer policy audited against the 79 foundation short-answer items (41 closed / 38 free).
// Conservative: unknown items and changes to prompt or acceptedAnswers require human review.
// FNV-1a fingerprints are content-change tripwires, not security signatures.
const CLOSED_SIGNATURES=Object.freeze({
  "PT639-FND-003":"ae2ce66a",
  "PT639-FND-008":"7827dab5",
  "PT639-FND-009":"445d1ded",
  "PT639-FND-022":"0c5ed6cd",
  "PT639-FND-024":"e9711196",
  "PT639-FND-044":"973531ca",
  "PT639-FND-048":"cb676fcf",
  "PT639-FND-056":"a4d8bb0d",
  "PT639-FND-063":"5ed89691",
  "PT639-FND-070":"9b2ced35",
  "PT639-FND-073":"4d8b33f0",
  "PT639-FND-079":"e196247b",
  "PT639-FND-082":"a5f989ec",
  "PT639-FND-098":"0548a85e",
  "PT639-FND-102":"c9322956",
  "PT639-FND-105":"5f371110",
  "PT639-FND-108":"79b405c1",
  "PT639-FND-115":"4ab90c88",
  "PT639-FND-116":"5f0da42f",
  "PT639-FND-118":"3d9deb23",
  "PT639-FND-119":"ab7acbd0",
  "PT639-FND-129":"485968e4",
  "PT639-FND-141":"99a01e02",
  "PT639-FND-148":"dd9a1286",
  "PT639-FND-151":"223cf9be",
  "PT639-FND-165":"5d5f786a",
  "PT639-FND-176":"46cb70bb",
  "PT639-FND-201":"a8d7d739",
  "PT639-FND-203":"70e034bc",
  "PT639-FND-207":"36b54d51",
  "PT639-FND-219":"ba1d4aea",
  "PT639-FND-220":"35308bd8",
  "PT639-FND-222":"d18f50df",
  "PT639-FND-244":"eb3570b5",
  "PT639-FND-246":"8fe770dd",
  "PT639-FND-269":"7e293f6f",
  "PT639-FND-272":"690f7171",
  "PT639-FND-274":"7e9dcda0",
  "PT639-FND-295":"f07acf78",
  "PT639-FND-316":"b573e0e6",
  "PT639-FND-318":"75ee0e64"
});
export function portugueseShortAnswerFingerprint(item){
  const text=JSON.stringify([item?.id,item?.responseType,item?.prompt,item?.stimulus,item?.acceptedAnswers,item?.gradingMode,item?.maxPoints]);
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
