
import {QUESTION_BANK,TAXONOMY} from "../data/content.js";
import {
  applyEditorialDecision,minimumReviewRoadmap,effectiveReviewStatus
} from "./quality.js";

export const REVIEW_CHECKS=[
  ["check_math","Matemática correta"],
  ["check_clarity","Enunciado claro"],
  ["check_unique","Resposta inequívoca"],
  ["check_distractors","Distratores plausíveis"],
  ["check_solution","Resolução suficiente"],
  ["check_taxonomy","Classificação curricular correta"],
  ["check_difficulty","Dificuldade adequada"],
  ["check_hypothesis","Hipótese de erro plausível"]
];

export const TEACHER_REVIEW_SCHEMA="teacher-review-v1";

function csvEscape(value){
  return `"${String(value??"").replace(/"/g,'""')}"`;
}

export function serializeSemicolonCsv(rows){
  if(!rows?.length)return "";
  const headers=Object.keys(rows[0]);
  return [
    headers.map(csvEscape).join(";"),
    ...rows.map(row=>headers.map(h=>csvEscape(row[h])).join(";"))
  ].join("\n");
}

export function parseSemicolonCsv(text){
  const rows=[];
  let row=[],cell="",quoted=false;
  const input=String(text||"").replace(/^\uFEFF/,"");

  for(let i=0;i<input.length;i++){
    const ch=input[i];
    if(quoted){
      if(ch==='"' && input[i+1]==='"'){cell+='"';i++}
      else if(ch==='"'){quoted=false}
      else cell+=ch;
    }else{
      if(ch==='"'){quoted=true}
      else if(ch===';'){row.push(cell);cell=""}
      else if(ch==='\n'){
        row.push(cell);rows.push(row);row=[];cell="";
      }else if(ch!=='\r')cell+=ch;
    }
  }
  if(cell.length||row.length){row.push(cell);rows.push(row)}
  if(!rows.length)return [];

  const headers=rows[0].map(x=>x.trim());
  return rows.slice(1)
    .filter(r=>r.some(x=>String(x).trim()!==""))
    .map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??""])));
}

function yes(value){
  const v=String(value??"").trim().toLowerCase();
  return ["sim","s","yes","y","1","true","x","ok"].includes(v);
}

function decisionValue(value){
  const v=String(value??"").trim().toLowerCase();
  if(["aprovar","approve","approved","revisto","reviewed"].includes(v))return "approve";
  if(["alterar","changes","change","pedir alteração","pending"].includes(v))return "changes";
  if(["bloquear","block","blocked"].includes(v))return "block";
  return null;
}

function currentVersion(overrides,id){
  return Number(overrides?.[id]?.version||1);
}

function checklistFromRow(row){
  const result={};
  REVIEW_CHECKS.forEach(([column])=>{result[column]=yes(row[column])});
  return result;
}

function allChecklistTrue(checklist){
  return REVIEW_CHECKS.every(([column])=>checklist[column]===true);
}

export function buildTeacherReviewPack(overrides={},reports=[],{
  limit=null,
  reviewer="",
  roadmapOnly=true
}={}){
  const roadmap=minimumReviewRoadmap(overrides,reports);
  let items=roadmapOnly
    ?roadmap.selected.map(x=>({item:x.item,reasons:x.reasons,step:x.step}))
    :QUESTION_BANK
      .filter(q=>effectiveReviewStatus(q,overrides)!=="reviewed")
      .map((item,i)=>({item,reasons:[],step:i+1}));

  if(Number.isInteger(limit)&&limit>0)items=items.slice(0,limit);

  return items.map(({item,reasons,step})=>{
    const t=TAXONOMY.find(x=>x.id===item.themeId);
    return {
      schema:TEACHER_REVIEW_SCHEMA,
      priority:step,
      id:item.id,
      version:currentVersion(overrides,item.id),
      year:t?.year||"",
      theme:t?.short||item.themeId,
      focus:item.focus||"",
      contexts:(item.contexts||[]).join(" | "),
      cognitive:item.cognitive||"",
      difficulty:item.difficulty||"",
      question:item.q||"",
      option_A:item.o?.[0]||"",
      option_B:item.o?.[1]||"",
      option_C:item.o?.[2]||"",
      option_D:item.o?.[3]||"",
      correct:["A","B","C","D"][item.a]||"",
      solution:item.sol||"",
      error_hypothesis:item.hyp||"",
      semantic_signature:item.signature||"",
      why_priority:(reasons||[]).join(" · "),
      reviewer,
      decision:"",
      note:"",
      check_math:"",
      check_clarity:"",
      check_unique:"",
      check_distractors:"",
      check_solution:"",
      check_taxonomy:"",
      check_difficulty:"",
      check_hypothesis:""
    };
  });
}

export function teacherReviewInstructions(){
  return [
    "Preencher apenas as colunas reviewer, decision, note e check_*.",
    "decision aceita: APROVAR, ALTERAR ou BLOQUEAR.",
    "Para APROVAR, todos os oito campos check_* devem estar SIM.",
    "ALTERAR e BLOQUEAR podem ser usados sem checklist completa.",
    "Não alterar id, version, pergunta, opções, resposta ou metadados.",
    "Se a versão da questão tiver mudado entretanto, a importação rejeita a decisão para evitar aprovação de conteúdo desatualizado."
  ];
}

export function validateTeacherReviewImport(rows,overrides={}){
  const seen=new Set();
  const valid=[],invalid=[],ignored=[];

  for(const [index,row] of (rows||[]).entries()){
    const rowNumber=index+2;
    if(row.schema!==TEACHER_REVIEW_SCHEMA){
      invalid.push({rowNumber,id:row.id||"",reason:"Schema incompatível."});
      continue;
    }

    const item=QUESTION_BANK.find(q=>q.id===row.id);
    if(!item){
      invalid.push({rowNumber,id:row.id||"",reason:"ID de questão inexistente."});
      continue;
    }

    if(seen.has(row.id)){
      invalid.push({rowNumber,id:row.id,reason:"ID repetido no ficheiro."});
      continue;
    }
    seen.add(row.id);

    const decision=decisionValue(row.decision);
    if(!decision){
      if(!String(row.decision||"").trim()){
        ignored.push({rowNumber,id:row.id,reason:"Sem decisão."});
      }else{
        invalid.push({rowNumber,id:row.id,reason:"Decisão inválida. Usar APROVAR, ALTERAR ou BLOQUEAR."});
      }
      continue;
    }

    const fileVersion=Number(row.version);
    const liveVersion=currentVersion(overrides,row.id);
    if(!Number.isFinite(fileVersion)||fileVersion!==liveVersion){
      invalid.push({
        rowNumber,id:row.id,
        reason:`Versão desatualizada: ficheiro v${row.version||"?"}, app v${liveVersion}.`
      });
      continue;
    }

    const reviewer=String(row.reviewer||"").trim();
    if(!reviewer){
      invalid.push({rowNumber,id:row.id,reason:"Nome do revisor em falta."});
      continue;
    }

    const checklist=checklistFromRow(row);
    if(decision==="approve"&&!allChecklistTrue(checklist)){
      invalid.push({
        rowNumber,id:row.id,
        reason:"Aprovação recusada: os 8 critérios do checklist têm de estar SIM."
      });
      continue;
    }

    valid.push({
      rowNumber,
      id:row.id,
      decision,
      reviewer,
      note:String(row.note||"").trim(),
      checklist,
      fileVersion
    });
  }

  return {
    valid,invalid,ignored,
    total:(rows||[]).length,
    canApply:valid.length>0 && invalid.length===0
  };
}

export function applyTeacherReviewImport(overrides,validation,{
  importId=`import-${Date.now()}`,
  allowPartial=false
}={}){
  if(!validation?.valid?.length)return {
    overrides,
    applied:[],
    importId,
    rejected:true,
    reason:"Nenhuma decisão válida."
  };
  if(validation.invalid?.length&&!allowPartial)return {
    overrides,
    applied:[],
    importId,
    rejected:true,
    reason:"Existem linhas inválidas; importação não aplicada."
  };

  let next={...(overrides||{})};
  const applied=[];
  for(const row of validation.valid){
    next=applyEditorialDecision(next,row.id,row.decision,{
      reviewer:row.reviewer,
      note:row.note,
      checklist:row.checklist,
      source:"external_csv",
      importId
    });
    applied.push({id:row.id,decision:row.decision,reviewer:row.reviewer});
  }

  return {overrides:next,applied,importId,rejected:false,reason:null};
}
