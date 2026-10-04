import fs from "node:fs";

const source=fs.readFileSync("app/page.js","utf8");
const lines=source.split("\n");
const starts=[];
for(let i=0;i<lines.length;i++){
  const match=lines[i].match(/^function\s+([A-Za-z0-9_$]+)\s*\(/);
  if(match)starts.push({name:match[1],line:i});
}
const rows=starts.map((entry,index)=>{
  const end=index+1<starts.length?starts[index+1].line:lines.length;
  const text=lines.slice(entry.line,end).join("\n");
  return {name:entry.name,start:entry.line+1,end,bytes:Buffer.byteLength(text)};
}).sort((a,b)=>b.bytes-a.bytes);
console.log("Largest top-level app/page.js function regions:");
for(const row of rows.slice(0,30))console.log(`${String(row.bytes).padStart(7)} B  L${row.start}-${row.end}  ${row.name}`);
