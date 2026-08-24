
import {QUESTION_BANK} from "../app/data/content.js";
for(const id of ["D11D-P","M11D-4"]){
 console.log(JSON.stringify(QUESTION_BANK.find(q=>q.id===id),null,2));
}
