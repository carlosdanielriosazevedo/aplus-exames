import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT=path.resolve("content/vnext/math-a");
const EXPECTED_FILES={10:31,11:35,12:47};
const EXPECTED_QUESTIONS={10:1550,11:1750,12:2350};
const REQUIRED_FIELDS=[
  "id","themeId","subtopicId","year","difficulty","cognitive",
  "q","o","a","sol","hyp","contexts","signature","reviewStatus","origin"
];
const REQUIRED_CONTEXTS=["mission","training","exam"];

// These phrases indicate that a question may depend on another question having
// been shown immediately before it. vNext items must be selectable independently
// by the adaptive engine, so these are blockers unless the wording itself embeds
// the complete referenced data.
const CONTEXT_DEPENDENCY_PATTERNS=[
  /\bitem anterior(?:es)?\b/i,
  /\bquest[aã]o anterior(?:es)?\b/i,
  /\bcaso anterior(?:es)?\b/i,
  /\bproblema anterior(?:es)?\b/i,
  /\bmodelo anterior(?:es)?\b/i,
  /\btabela anterior(?:es)?\b/i,
  /\bestudo anterior(?:es)?\b/i,
  /\bpopula[cç][aã]o anterior(?:es)?\b/i,
  /\bconjunto anterior(?:es)?\b/i,
  /\bfun[cç][aã]o anterior(?:es)?\b/i,
  /\breta anterior(?:es)?\b/i,
  /\btri[aâ]ngulo anterior(?:es)?\b/i,
  /\bintervalo anterior(?:es)?\b/i,
  /\bmatriz anterior(?:es)?\b/i,
  /\bdistribui[cç][aã]o anterior(?:es)?\b/i,
  /\bno mesmo caso\b/i,
  /\bna mesma fun[cç][aã]o\b/i,
  /\bno mesmo modelo\b/i,
  /\bna mesma distribui[cç][aã]o\b/i,
  /\bna mesma matriz\b/i,
  /\bna mesma sucess[aã]o\b/i,
  /\bna mesma PA\b/i,
  /\bna mesma PG\b/i,
  /\bpara o mesmo P\b/i,
  /\bo mesmo polin[oó]mio\b/i,
  /\bna mesma configura[cç][aã]o\b/i,
  /\bno caso das urnas\b/i,
  /\bnos itens anteriores\b/i,
  /\bos dois itens anteriores\b/i,
  /\bas duas equa[cç][oõ]es anteriores\b/i
];

function jsonFiles(dir){
  return fs.readdirSync(dir,{withFileTypes:true})
    .flatMap(entry=>{
      const full=path.join(dir,entry.name);
      if(entry.isDirectory()) return jsonFiles(full);
      return entry.isFile()&&entry.name.endsWith(".json")?[full]:[];
    })
    .sort();
}
function duplicateValues(values){
  const seen=new Set(),dups=new Set();
  for(const v of values){
    if(seen.has(v))dups.add(v);
    else seen.add(v);
  }
  return [...dups];
}
function dependencyFlags(text){
  return CONTEXT_DEPENDENCY_PATTERNS
    .filter(re=>re.test(String(text||"")))
    .map(re=>String(re));
}

assert.ok(fs.existsSync(ROOT),"content/vnext/math-a não existe.");

const files=jsonFiles(ROOT);
const blockers=[];
const warnings=[];
const allIds=[];
const allQuestions=[];
const yearStats={10:{files:0,questions:0},11:{files:0,questions:0},12:{files:0,questions:0}};

for(const file of files){
  const rel=path.relative(process.cwd(),file);
  const year=rel.split(path.sep).at(-2);
  let data;
  try{
    data=JSON.parse(fs.readFileSync(file,"utf8"));
  }catch(err){
    blockers.push({file:rel,code:"invalid_json",detail:err.message});
    continue;
  }
  if(!yearStats[year]){
    blockers.push({file:rel,code:"unexpected_year_folder",detail:year});
    continue;
  }
  yearStats[year].files++;

  const qs=Array.isArray(data.questions)?data.questions:[];
  yearStats[year].questions+=qs.length;

  if(qs.length!==50) blockers.push({file:rel,code:"question_count",detail:qs.length});

  const localIds=qs.map(q=>q.id);
  const localTexts=qs.map(q=>q.q);
  for(const id of duplicateValues(localIds))blockers.push({file:rel,code:"duplicate_id_local",detail:id});
  for(const text of duplicateValues(localTexts))blockers.push({file:rel,code:"duplicate_question_local",detail:text});

  const answerCounts=[0,1,2,3].map(i=>qs.filter(q=>q.a===i).length);
  if(answerCounts.join(",")!=="13,13,12,12"){
    blockers.push({file:rel,code:"answer_position_balance",detail:answerCounts});
  }

  for(const q of qs){
    allIds.push(q.id);
    allQuestions.push({id:q.id,file:rel,text:q.q});

    const missing=REQUIRED_FIELDS.filter(k=>q[k]===undefined||q[k]===null||q[k]==="");
    if(missing.length)blockers.push({file:rel,id:q.id,code:"missing_fields",detail:missing});

    if(!Array.isArray(q.o)||q.o.length!==4){
      blockers.push({file:rel,id:q.id,code:"option_count",detail:Array.isArray(q.o)?q.o.length:"not_array"});
    }else if(new Set(q.o.map(String)).size!==4){
      blockers.push({file:rel,id:q.id,code:"duplicate_options"});
    }

    if(![0,1,2,3].includes(q.a))blockers.push({file:rel,id:q.id,code:"answer_index",detail:q.a});

    if(!Array.isArray(q.contexts)||!REQUIRED_CONTEXTS.every(c=>q.contexts.includes(c))){
      blockers.push({file:rel,id:q.id,code:"contexts",detail:q.contexts});
    }
    if(q.reviewStatus!=="prototype")blockers.push({file:rel,id:q.id,code:"review_status",detail:q.reviewStatus});
    if(q.origin!=="original_vnext_2026")blockers.push({file:rel,id:q.id,code:"origin",detail:q.origin});

    if(data.themeId&&q.themeId!==data.themeId)blockers.push({file:rel,id:q.id,code:"theme_mismatch",detail:[data.themeId,q.themeId]});
    if(data.subtopicId&&q.subtopicId!==data.subtopicId)blockers.push({file:rel,id:q.id,code:"subtopic_mismatch",detail:[data.subtopicId,q.subtopicId]});
    if(data.year&&q.year!==data.year)blockers.push({file:rel,id:q.id,code:"year_mismatch",detail:[data.year,q.year]});

    const dependencies=dependencyFlags(q.q);
    if(dependencies.length){
      blockers.push({file:rel,id:q.id,code:"context_dependency",detail:{question:q.q,patterns:dependencies}});
    }

    if(String(q.q||"").trim().length<8)warnings.push({file:rel,id:q.id,code:"very_short_question"});
    if(String(q.sol||"").trim().length<5)warnings.push({file:rel,id:q.id,code:"very_short_solution"});
  }
}

for(const [year,expected] of Object.entries(EXPECTED_FILES)){
  if(yearStats[year].files!==expected)blockers.push({code:"year_file_count",year,detail:[yearStats[year].files,expected]});
}
for(const [year,expected] of Object.entries(EXPECTED_QUESTIONS)){
  if(yearStats[year].questions!==expected)blockers.push({code:"year_question_count",year,detail:[yearStats[year].questions,expected]});
}
if(files.length!==113)blockers.push({code:"total_file_count",detail:[files.length,113]});
if(allQuestions.length!==5650)blockers.push({code:"total_question_count",detail:[allQuestions.length,5650]});

for(const id of duplicateValues(allIds))blockers.push({code:"duplicate_id_global",detail:id});

const normalized=new Map();
for(const q of allQuestions){
  const key=String(q.text||"").trim().replace(/\s+/g," ").toLocaleLowerCase("pt-PT");
  if(!key)continue;
  if(normalized.has(key)){
    warnings.push({code:"duplicate_question_global",detail:[normalized.get(key),q]});
  }else{
    normalized.set(key,q);
  }
}

console.log("vNext content audit");
console.log("-------------------");
console.log(`Ficheiros: ${files.length}/113`);
console.log(`Perguntas: ${allQuestions.length}/5650`);
for(const year of ["10","11","12"]){
  console.log(`${year}.º: ${yearStats[year].files} ficheiros · ${yearStats[year].questions} perguntas`);
}
console.log(`Blockers: ${blockers.length}`);
console.log(`Warnings: ${warnings.length}`);

if(warnings.length){
  console.log("\nWarnings:");
  for(const x of warnings.slice(0,50))console.log("-",JSON.stringify(x));
  if(warnings.length>50)console.log(`... +${warnings.length-50} warnings`);
}
if(blockers.length){
  console.error("\nBlockers:");
  for(const x of blockers.slice(0,100))console.error("-",JSON.stringify(x));
  if(blockers.length>100)console.error(`... +${blockers.length-100} blockers`);
  process.exitCode=1;
}else{
  console.log("✓ vNext estruturalmente consistente e sem dependências contextuais detetadas.");
}
