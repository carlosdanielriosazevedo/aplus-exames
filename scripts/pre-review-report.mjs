
import {preReviewQaReport} from "../app/lib/preReviewQa.js";
const r=preReviewQaReport();
console.log(JSON.stringify({
  total:r.total,clean:r.clean,warnings:r.withWarnings,blocked:r.blocked,
  answerPositions:r.answerPositions,
  corpusWarnings:r.corpusWarnings,
  byCode:r.byCode
},null,2));
console.log("\nBlocked:");
for(const x of r.rows.filter(x=>x.blockerCount))console.log(x.itemId,x.issues.map(i=>i.code).join(","));
console.log("\nWarnings sample:");
for(const x of r.rows.filter(x=>x.warningCount).slice(0,40))console.log(x.itemId,x.issues.map(i=>i.code).join(","));
