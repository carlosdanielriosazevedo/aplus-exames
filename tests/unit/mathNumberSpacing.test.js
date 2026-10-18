import fs from "node:fs";
import path from "node:path";
import {describe,expect,it} from "vitest";
import {separateWordsFromNumbers,mathVisibleText} from "../../app/lib/mathVisibleCopy.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../../app/data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../../app/data/vnextMission.js";
import {VNEXT_EXAM_QUESTIONS} from "../../app/data/vnextExam.js";

describe("Matemática A · espaço entre palavras e números",()=>{
  it("separa palavras portuguesas coladas a números",()=>{
    expect(separateWordsFromNumbers("Raiz cúbica de8 é2.")).toBe("Raiz cúbica de 8 é 2.");
    expect(separateWordsFromNumbers("Pode esquecer o fator2 do expoente.")).toBe("Pode esquecer o fator 2 do expoente.");
    expect(separateWordsFromNumbers("Fator1,12 corresponde a112%")).toBe("Fator 1,12 corresponde a 112%");
    expect(separateWordsFromNumbers("−3 e0.")).toBe("−3 e 0.");
    expect(separateWordsFromNumbers("Se arg(z)=0 mod2π")).toBe("Se arg(z)=0 mod 2π");
    expect(separateWordsFromNumbers("logo−2^x+1<1")).toBe("logo −2^x+1<1");
    expect(separateWordsFromNumbers("resíduo observado−previsto?")).toBe("resíduo observado − previsto?");
    expect(separateWordsFromNumbers("Centenas:9, dezenas:10")).toBe("Centenas: 9, dezenas: 10");
  });
  it("não toca em variáveis, siglas, funções nem vetores da base",()=>{
    for(const text of [
      "Se Q1=12 e Q3=20, qual é o IQR?",
      "A=(x1,y1) e B=(x2,y2)",
      "A distância entre z1=1+i e z2=4+5i",
      "Um IC95% aproximado",
      "Pode confundir com sin45°.",
      "Altura=5 sin60°=5√3/2.",
      "vetor unitário e1 mede"
    ])expect(separateWordsFromNumbers(text)).toBe(text);
  });
  it("é idempotente e integrado no normalizador de cópia visível",()=>{
    const once=separateWordsFromNumbers("fator1,05 e de10 e logo−2^x");
    expect(separateWordsFromNumbers(once)).toBe(once);
    expect(mathVisibleText("Derivando a expressão e substituindo de10")).toContain("de 10");
  });
});

const VISIBLE=new Set(["q","sol","hyp","note","focus","subtopic","prompt","explanation","title","subtitle","label","feedback","hint","text","statement","instruction","o","options"]);
function violations(value,where,visible=false,out=[]){
  if(Array.isArray(value)){for(const item of value)violations(item,where,visible,out);return out}
  if(value&&typeof value==="object"){for(const [key,item] of Object.entries(value))violations(item,where,VISIBLE.has(key),out);return out}
  if(typeof value==="string"&&visible&&separateWordsFromNumbers(value)!==value)out.push(`${where}: ${value.slice(0,80)}`);
  return out;
}
describe("Matemática A · fontes versionadas sem palavras coladas a números",()=>{
  it("bancos gerados",()=>{
    const found=[VNEXT_DIAGNOSTIC_QUESTIONS,VNEXT_MISSION_QUESTIONS,VNEXT_EXAM_QUESTIONS].flatMap((bank,index)=>violations(bank,["diagnóstico","missão","exame"][index]));
    expect(found.slice(0,10)).toEqual([]);
  });
  it("JSON de origem",()=>{
    const root="content/vnext/math-a";
    const files=fs.readdirSync(root,{recursive:true}).filter(file=>String(file).endsWith(".json")).map(file=>path.join(root,String(file)));
    const found=files.flatMap(file=>violations(JSON.parse(fs.readFileSync(file,"utf8")),file));
    expect(found.slice(0,10)).toEqual([]);
  });
});
