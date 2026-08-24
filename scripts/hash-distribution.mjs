
import {QUESTION_BANK} from "../app/data/content.js";
function h(s){let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
const d=[0,0,0,0];
QUESTION_BANK.forEach(q=>d[h(q.id)%4]++);
console.log(d);
