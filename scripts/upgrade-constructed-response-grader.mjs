import fs from "node:fs";

const path=new URL("../app/lib/constructedResponse.js",import.meta.url);
let source=fs.readFileSync(path,"utf8");

const oldNormalizer=`function normalizedWords(value){return String(value??"").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\\s+/g," ").trim()}`;
const newNormalizer=`function normalizedWords(value){
  const base=String(value??"").toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").replace(/[−–—]/g,"-").replace(/\\s+/g," ").trim();
  const numberWords={zero:"0",um:"1",uma:"1",dois:"2",duas:"2",tres:"3",quatro:"4",cinco:"5",seis:"6",sete:"7",oito:"8",nove:"9",dez:"10"};
  return base.replace(/\\b(zero|um|uma|dois|duas|tres|quatro|cinco|seis|sete|oito|nove|dez)\\b/g,word=>numberWords[word]||word);
}
function escapeRegex(value){return String(value).replace(/[.*+?^\\${}()|[\\]\\\\]/g,"\\\\$&")}
function conceptPresent(input,candidate){
  const concept=normalizedWords(candidate);
  if(!concept)return false;
  if(new RegExp(\`(?:^|\\\\b)\${escapeRegex(concept)}(?:\\\\b|$)\`,"u").test(input))return true;
  if(concept.endsWith("r")&&concept.length>=6){
    const stem=concept.slice(0,-1);
    return new RegExp(\`\\\\b\${escapeRegex(stem)}[a-z]*\\\\b\`,"u").test(input);
  }
  return false;
}
function conceptGroupsMatch(spec,input){
  const groups=Array.isArray(spec?.conceptGroups)?spec.conceptGroups:[];
  if(!groups.length||!input)return false;
  const allCandidates=groups.flat().map(normalizedWords).filter(Boolean);
  const explicitNegation=allCandidates.some(candidate=>candidate.includes("nao")&&conceptPresent(input,candidate));
  if(/\\b(?:nao|nunca|jamais)\\b/u.test(input)&&!explicitNegation)return false;
  return groups.every(group=>group.some(candidate=>conceptPresent(input,candidate)));
}`;

if(source.includes(oldNormalizer))source=source.replace(oldNormalizer,newNormalizer);
else if(!source.includes("function conceptGroupsMatch(spec,input)"))throw new Error("constructedResponse normalizer anchor not found");

const oldText=`  if(spec.type==="text"){
    const input=normalizedWords(value);
    // Unrestricted prose is not certified by keyword presence.
    const accepted=[spec.expected,...(spec.accepted||[])].map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!input)reason="empty_justification";
  }`;
const newText=`  if(spec.type==="text"){
    const input=normalizedWords(value);
    const accepted=[spec.expected,...(spec.accepted||[])].map(candidate=>normalizedWords(candidate).replace(/[.!]$/g,""));
    correct=hasText(value)&&accepted.includes(input.replace(/[.!]$/g,""));
    if(!correct&&hasText(value)&&conceptGroupsMatch(spec,input))correct=true;
    if(!input)reason="empty_justification";
  }`;

if(source.includes(oldText))source=source.replace(oldText,newText);
else if(!source.includes("conceptGroupsMatch(spec,input)"))throw new Error("constructedResponse text grading anchor not found");

fs.writeFileSync(path,source);
console.log("✓ constructed-response grader upgraded: conservative concept-group matching enabled");
