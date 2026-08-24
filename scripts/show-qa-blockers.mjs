
import {QUESTION_BANK} from "../app/data/content.js";
for(const id of ["D11D-P","D11D-E","BG12FC-DER-1"]){
 const q=QUESTION_BANK.find(x=>x.id===id);
 console.log("\n",id,JSON.stringify(q,null,2));
}
