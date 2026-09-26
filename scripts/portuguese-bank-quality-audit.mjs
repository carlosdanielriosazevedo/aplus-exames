import {readFileSync,readdirSync} from "node:fs";
import {join} from "node:path";

const root="content/vnext/portuguese/foundation";
const files=readdirSync(root)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });

const normalize=value=>String(value??"")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"")
  .toLowerCase()
  .replace(/[«»“”\"'’.,;:!?()[\]{}—–-]/g," ")
  .replace(/\s+/g," ")
  .trim();

const tokenSet=value=>new Set(normalize(value).split(" ").filter(token=>token.length>=4));
const jaccard=(left,right)=>{
  const a=tokenSet(left),b=tokenSet(right);
  if(!a.size||!b.size)return 0;
  let intersection=0;
  for(const token of a)if(b.has(token))intersection++;
  return intersection/(a.size+b.size-intersection);
};

const packages=files.map(name=>({name,data:JSON.parse(readFileSync(join(root,name),"utf8"))}));
const items=packages.flatMap(({name,data})=>data.items.map(item=>({...item,__file:name})));
const expectedSize=[...packages].reverse().find(({data})=>Number.isInteger(data.bankSizeAfterWave))?.data.bankSizeAfterWave||items.length;
const fail=[];
const assert=(condition,message)=>{if(!condition)fail.push(message);};

assert(packages.length>=1,`Nenhum pacote de Português encontrado.`);
assert(items.length===expectedSize,`O último pacote declara ${expectedSize} itens, encontrados ${items.length}.`);
for(const {name,data} of packages){
  assert(data.subjectId==="portuguese",`${name}: subjectId inválido.`);
  assert(data.examCode==="639",`${name}: examCode inválido.`);
  assert(data.sourcePolicy==="original-only",`${name}: sourcePolicy deve ser original-only.`);
  assert(data.editorialStatus==="prototype",`${name}: editorialStatus deve manter-se prototype.`);
  assert(data.productionEligible===false,`${name}: productionEligible tem de continuar false.`);
}

const ids=new Map();
const prompts=new Map();
const answerPositionCounts=[0,0,0,0];
const answerPositionByFile=new Map();
let currentRun=null;
let currentRunLength=0;
let longestRun=0;
let multipleChoice=0;
let shortAnswer=0;
let openResponse=0;

for(const item of items){
  assert(/^PT639-FND-\d{3}$/.test(item.id),`${item.__file}: ID inválido ${item.id}.`);
  assert(!ids.has(item.id),`ID duplicado: ${item.id} (${ids.get(item.id)} / ${item.__file}).`);
  ids.set(item.id,item.__file);
  assert(item.sourceOrigin==="original",`${item.id}: sourceOrigin tem de ser original.`);
  assert(item.reviewStatus==="prototype",`${item.id}: reviewStatus tem de continuar prototype.`);
  assert(["10.º","11.º","12.º"].includes(item.year),`${item.id}: ano inválido ${item.year}.`);
  assert(typeof item.prompt==="string"&&item.prompt.trim().length>=10,`${item.id}: enunciado demasiado curto/vazio.`);
  assert(typeof item.stimulus==="string"&&item.stimulus.trim().length>=8,`${item.id}: estímulo demasiado curto/vazio.`);

  const promptKey=normalize(item.prompt);
  if(prompts.has(promptKey)) fail.push(`Enunciado duplicado: ${item.id} e ${prompts.get(promptKey)}.`);
  else prompts.set(promptKey,item.id);

  if(item.responseType==="multiple-choice"){
    multipleChoice++;
    assert(typeof item.explanation==="string"&&item.explanation.trim().length>=25,`${item.id}: escolha múltipla sem explicação pedagógica suficiente.`);
    assert(Array.isArray(item.options)&&item.options.length===4,`${item.id}: escolha múltipla deve ter exatamente 4 opções.`);
    assert(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${item.id}: answerIndex inválido.`);
    if(Array.isArray(item.options)){
      const normalized=item.options.map(normalize);
      assert(normalized.every(Boolean),`${item.id}: opção vazia.`);
      assert(new Set(normalized).size===normalized.length,`${item.id}: opções duplicadas após normalização.`);
      assert(!normalized.some(option=>option===promptKey),`${item.id}: uma opção repete integralmente o enunciado.`);
    }
    if(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4){
      answerPositionCounts[item.answerIndex]++;
      const row=answerPositionByFile.get(item.__file)||[0,0,0,0];
      row[item.answerIndex]++;
      answerPositionByFile.set(item.__file,row);
      if(currentRun===item.answerIndex) currentRunLength++;
      else { currentRun=item.answerIndex; currentRunLength=1; }
      longestRun=Math.max(longestRun,currentRunLength);
    }
  }else{
    currentRun=null;
    currentRunLength=0;
    if(item.responseType==="short-answer"){
      shortAnswer++;
      assert(typeof item.explanation==="string"&&item.explanation.trim().length>=25,`${item.id}: resposta curta sem explicação pedagógica suficiente.`);
      assert(Array.isArray(item.acceptedAnswers)&&item.acceptedAnswers.length>=1,`${item.id}: short-answer sem equivalentes aceites.`);
      if(Array.isArray(item.acceptedAnswers)){
        const normalized=item.acceptedAnswers.map(normalize);
        assert(normalized.every(Boolean),`${item.id}: equivalente aceite vazio.`);
        assert(new Set(normalized).size===normalized.length,`${item.id}: equivalentes aceites duplicados após normalização.`);
      }
      assert(item.gradingMode==="deterministic-with-equivalents",`${item.id}: short-answer deve usar deterministic-with-equivalents.`);
    }else if(["restricted-response","extended-writing"].includes(item.responseType)){
      openResponse++;
      assert(item.gradingMode!=="deterministic",`${item.id}: resposta aberta não pode usar correção determinística final.`);
    }else{
      fail.push(`${item.id}: responseType desconhecido ${item.responseType}.`);
    }
  }
}


for(let left=0;left<items.length;left++){
  for(let right=left+1;right<items.length;right++){
    const a=items[left],b=items[right];
    const promptSimilarity=jaccard(a.prompt,b.prompt);
    const stimulusSimilarity=jaccard(a.stimulus,b.stimulus);
    if(promptSimilarity>=0.82&&stimulusSimilarity>=0.72){
      fail.push(`Itens demasiado semelhantes: ${a.id} / ${b.id} (prompt=${promptSimilarity.toFixed(2)}, estímulo=${stimulusSimilarity.toFixed(2)}).`);
    }
  }
}

assert(ids.size===items.length,`IDs únicos: esperados ${items.length}, encontrados ${ids.size}.`);

if(multipleChoice){
  const max=Math.max(...answerPositionCounts);
  const min=Math.min(...answerPositionCounts);
  assert(max/multipleChoice<=0.40,`Posição correta demasiado concentrada no banco: ${answerPositionCounts.join("/")} em ${multipleChoice} escolhas múltiplas.`);
  assert(min/multipleChoice>=0.12,`Há uma posição correta sub-representada no banco: ${answerPositionCounts.join("/")} em ${multipleChoice} escolhas múltiplas.`);
  assert(longestRun<=5,`Sequência demasiado longa da mesma posição correta: ${longestRun} itens consecutivos.`);
}

for(const [file,counts] of answerPositionByFile){
  const total=counts.reduce((a,b)=>a+b,0);
  if(total>=12){
    const max=Math.max(...counts);
    assert(max/total<=0.55,`${file}: posição correta demasiado previsível (${counts.join("/")} em ${total}).`);
  }
}

const years=Object.fromEntries(["10.º","11.º","12.º"].map(year=>[year,items.filter(item=>item.year===year).length]));
const domains=[...new Set(items.map(item=>item.domain))].sort();
const domainCounts=Object.fromEntries(domains.map(domain=>[domain,items.filter(item=>item.domain===domain).length]));

console.log(`Banco: ${items.length} itens · ${multipleChoice} escolha múltipla · ${shortAnswer} resposta curta · ${openResponse} resposta aberta`);
console.log(`Anos: ${Object.entries(years).map(([k,v])=>`${k}=${v}`).join(" · ")}`);
console.log(`Domínios: ${Object.entries(domainCounts).map(([k,v])=>`${k}=${v}`).join(" · ")}`);
console.log(`Posições corretas MC: ${answerPositionCounts.map((v,i)=>`${i}=${v}`).join(" · ")} · maior sequência=${longestRun}`);
for(const [file,counts] of answerPositionByFile) console.log(`${file}: respostas MC ${counts.join("/")}`);

if(fail.length){
  console.error(`\nPortuguese bank quality audit: FAIL (${fail.length})`);
  for(const message of fail) console.error(`- ${message}`);
  process.exit(1);
}
console.log("Portuguese bank quality audit: PASS");
