import assert from "node:assert/strict";
import {portugueseWordLimitFeedback} from "../app/lib/portugueseWordLimit.js";

const item={wordLimit:{min:40,max:70}};

const empty=portugueseWordLimitFeedback(item,"");
assert.deepEqual({status:empty.status,count:empty.count,delta:empty.delta},{status:"empty",count:0,delta:40});

const below=portugueseWordLimitFeedback(item,Array.from({length:39},()=>"palavra").join(" "));
assert.equal(below.status,"below");
assert.equal(below.delta,1);
assert.match(below.label,/Faltam 1 palavra/);

const min=portugueseWordLimitFeedback(item,Array.from({length:40},()=>"palavra").join(" "));
assert.equal(min.status,"within");
assert.equal(min.delta,0);
assert.match(min.caution,/conteúdo/);

const max=portugueseWordLimitFeedback(item,Array.from({length:70},()=>"palavra").join(" "));
assert.equal(max.status,"within");

const above=portugueseWordLimitFeedback(item,Array.from({length:73},()=>"palavra").join(" "));
assert.equal(above.status,"above");
assert.equal(above.delta,3);
assert.match(above.label,/Excedeste 3 palavras/);

assert.notEqual(min.label,"Resposta correta","cumprir a extensão não pode ser confundido com correção de conteúdo");
console.log("✓ limite de palavras de Português: vazio / abaixo / dentro / acima distinguidos sem confundir extensão com conteúdo");
