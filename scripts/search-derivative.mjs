
import {QUESTION_BANK} from "../app/data/content.js";
for(const q of QUESTION_BANK.filter(q=>q.themeId==="11-cd"&&q.focus==="Derivadas")){
 console.log(q.id,"::",q.q);
}
