// EXPERIMENTAL: original seven-question synthetic pilot, never a national-exam
// question bank or production-grading authority. Answer keys live only in
// database migration 010; never in this browser-facing presentation.
export const PILOT_KEY="synthetic-math-seven-v1";
export const PILOT_BANK=Object.freeze([
  {id:"q1",prompt:"Resolve 2x + 1 = 7.",options:["x = 2","x = 3","x = 4"]},
  {id:"q2",prompt:"Qual é a raiz quadrada principal de 9?",options:["3","6","9"]},
  {id:"q3",prompt:"Quanto é 4/5 em notação decimal?",options:["0,4","0,6","0,8"]},
  {id:"q4",prompt:"Se f(x) = 2x − 1, quanto é f(3)?",options:["5","6","7"]},
  {id:"q5",prompt:"Qual é o valor de 3²?",options:["6","8","9"]},
  {id:"q6",prompt:"Quanto é 15% de 200?",options:["25","30","35"]},
  {id:"q7",prompt:"Resolve a desigualdade 2x + 4 > 10.",options:["x > 3","x < 3","x > 7"]}
].map(x=>Object.freeze({...x,options:Object.freeze(x.options)})));
const ids=new Set(PILOT_BANK.map(x=>x.id));
const PROJECT="prj_8n5XwTMF651SAfsykIDji93oZp3r";
const HOSTS=new Set([
 "ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech",
 "ep-holy-term-b93irruj-pooler.c-7.eu-central-1.aws.neon.tech"
]);

export function pilotEnabled(env=process.env){
  if(env.APPROVA_VERIFIED_PILOT_ENABLED!=="YES"
     ||env.VERCEL_ENV!=="preview"
     ||env.VERCEL_PROJECT_ID!==PROJECT)return false;
  try{
    const u=new URL(env.DATABASE_URL||"");
    return ["postgres:","postgresql:"].includes(u.protocol)
      && HOSTS.has(u.hostname)&&u.pathname==="/neondb";
  }catch{return false;}
}

export function validatePilotCommand(body){
  if(!body||typeof body!=="object"||Array.isArray(body))
    return {ok:false,code:"INVALID_BODY"};
  if(!["start","answer","finish"].includes(body.action))
    return {ok:false,code:"INVALID_ACTION"};
  const keys=Object.keys(body).sort();
  if(body.action==="answer"){
    if(keys.join(",")!=="action,choiceIndex,questionId"
       ||!ids.has(body.questionId)
       ||!Number.isInteger(body.choiceIndex)
       ||body.choiceIndex<0||body.choiceIndex>=3)
      return {ok:false,code:"INVALID_ANSWER"};
    return {ok:true,action:"answer",questionId:body.questionId,choiceIndex:body.choiceIndex};
  }
  if(keys.join(",")!=="action")return {ok:false,code:"UNEXPECTED_FIELDS"};
  return {ok:true,action:body.action};
}

export function publicPilotSession(row){
  if(!row)return {started:false,completed:false,answered:[],questions:PILOT_BANK};
  const answers=row.answers||{};
  const completed=Boolean(row.completed_at);
  if(completed&&(!Number.isInteger(Number(row.verified_xp))||row.verified_xp===null||
    Number(row.verified_xp)<0))
    throw Error("Completed synthetic pilot has no trusted award");
  return {
    started:true,completed,
    sessionId:row.session_id,
    answered:Object.keys(answers).filter(x=>ids.has(x)).sort(),
    ...(completed?{verifiedXp:Number(row.verified_xp)}:{}),
    questions:PILOT_BANK
  };
}
