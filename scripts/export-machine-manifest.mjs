
import {QUESTION_BANK} from "../app/data/content.js";
import {contentRevisionFingerprint} from "../app/lib/quality.js";
const ids=[
"M10G-1","M11C-2","M11D-1","M12E-1","M11T-5","M11D-4","M12L-5","BG10F-REP-1","BG12FC-ASS-1","BG12E-EXP-1",
"CV51-11CD-TV-1","CV51-11CD-TV-2","CV51-11CD-OPT-2","CV51-12FCD-COMP-1","CV51-12FCD-RC-1","CV51-12FCD-RC-2",
"CV51-12FCD-APL-1","CV51-12FCD-APL-2","CV51-12PROB-LAP-1","CV51-12PROB-LAP-2","CV51-12INT-AREA-1","CV51-10GA-VET-2",
"CV51-11CONT-PM-2","CV51-11TRIG-EQ-2"
];
const out={};
for(const id of ids){
 const q=QUESTION_BANK.find(x=>x.id===id);
 out[id]={fingerprint:contentRevisionFingerprint(q),answer:q.o[q.a],origin:q.origin||"legacy"};
}
console.log(JSON.stringify(out,null,2));
