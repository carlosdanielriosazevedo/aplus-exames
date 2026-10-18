import {describe,it,expect} from "vitest";
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {mathVisibleText} from "../../app/lib/mathVisibleCopy.js";

const BAD_PATTERNS=[
  ["expressao",/\bexpressao(?:es)?\b/iu],
  ["obtem-se",/\bobtem-se\b/iu],
  ["funcao",/\bfuncao(?:es)?\b/iu],
  ["taxa media de variacao",/\btaxa media de variacao\b/iu],
  ["nao",/\bnao\b/iu],
  ["situacao",/\bsituacao(?:es)?\b/iu],
  ["posicao",/\bposicao(?:es)?\b/iu],
  ["grafico",/\bgrafico(?:s)?\b/iu],
  ["equacao",/\bequacao(?:es)?\b/iu],
  ["Qual e",/\bQual e\b/u],
  ["area e",/\barea e\b/iu],
  ["potênciação",/\bpotênciação\b/iu]
];
const VISIBLE=new Set(["q","sol","hyp","note","focus","subtopic","prompt","explanation","title","subtitle","label","feedback","hint","text","statement","instruction","o","options"]);
function collect(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const p=path.join(dir,e.name);
    return e.isDirectory()?collect(p):e.name.endsWith(".json")?[p]:[];
  });
}
function examine(value,file,key,violations){
  if(Array.isArray(value)){for(const v of value)examine(v,file,key,violations);return}
  if(value&&typeof value==="object"){
    for(const [k,v] of Object.entries(value))if(VISIBLE.has(k)||v&&typeof v==="object")examine(v,file,k,violations);
    return;
  }
  if(typeof value!=="string"||!VISIBLE.has(key))return;
  for(const [name,re] of BAD_PATTERNS)if(re.test(value))violations.push(file+":"+key+" ["+name+"] "+value.slice(0,100));
}

describe("Matemática A · conteúdo versionado",()=>{
  it("não contém formas visíveis sem acentuação",()=>{
    const files=["app/data/vnextDiagnostic.js","app/data/vnextMission.js","app/data/vnextExam.js",...collect("content/vnext/math-a/11")];
    const violations=[];
    for(const file of files){
      const source=fs.readFileSync(file,"utf8");
      const data=JSON.parse(file.endsWith(".json")?source:source.slice(source.indexOf("=[")+1).trim().replace(/;$/u,""));
      if(file.endsWith(".json")){
        if(data.subtopicId!==path.basename(file,".json"))violations.push(file+": subtopicId difere do nome");
        for(const q of data.questions||[])if(q.subtopicId!==data.subtopicId)violations.push(file+": question subtopicId diverge");
      }else for(const q of data)if(/[áéíóúâêôãõç]/iu.test(q.subtopicId||""))violations.push(file+": ID com acentos");
      examine(data,file,"root",violations);
    }
    expect(violations).toEqual([]);
  });
  it("preserva conjunções e normaliza rótulos após regeneração",()=>{
    expect(mathVisibleText("Derivando a expressão e substituindo x=0")).toBe("Derivando a expressão e substituindo x=0");
    expect(mathVisibleText("decrescente em ]-inf,0[ e crescente em ]0,+inf[")).toBe("decrescente em ]-inf,0[ e crescente em ]0,+inf[");
    expect(mathVisibleText("f e crescente")).toBe("f é crescente");
    expect(mathVisibleText("potênciação")).toBe("potenciação");
    expect(mathVisibleText("Aplicacao")).toBe("Aplicação");
    expect(mathVisibleText("Compreensao")).toBe("Compreensão");
  });
  it("mantém sincronizados os três ficheiros gerados",()=>{
    const violations=[];
    for(const name of ["diagnostic","mission","exam"]){
      const x=spawnSync(process.execPath,["scripts/generate-vnext-"+name+".mjs","--check"],{encoding:"utf8",timeout:60_000});
      if(x.status!==0)violations.push(name+": "+(x.stderr||x.stdout).slice(0,1000));
    }
    expect(violations).toEqual([]);
  });
});
