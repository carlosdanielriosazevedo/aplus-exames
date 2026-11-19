import {describe,expect,it,vi} from "vitest";
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200})}}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:()=>fakeSql,databaseConfigured:()=>true}));
import {summarize,evaluateAlarms,renderReport,addDays,lisbonDay} from "../../app/lib/server/weekly-report.js";
import {GET} from "../../app/api/cron/weekly-report/route.js";

let fakeRows={funnel:[],reports:[]};
const fakeSql=(strings)=>Promise.resolve(strings.join("").includes("funnel_daily")?fakeRows.funnel:fakeRows.reports);

const today="2026-11-23"; // segunda-feira
const row=(dayOffset,step,count,source="direto")=>({day:addDays(today,dayOffset),step,source,count});
function weekOf({opened=100,started=80,completed=60,mission=40,account=30,nextDay=30,source="instagram"}={}){
  const rows=[];
  for(let d=-7;d<=-1;d++){
    rows.push(row(d,"app_opened",opened/7,source),row(d,"diagnostic_started",started/7,source),row(d,"diagnostic_completed",completed/7,source),
      row(d,"first_session_completed",mission/7,source),row(d,"account_linked",account/7,source),row(d,"returned_next_day",nextDay/7,source));
  }
  return rows;
}
const base=(funnelRows,reportRows=[])=>({today,start:addDays(today,-7),prevStart:addDays(today,-14),funnelRows,reportRows});

describe("resumo semanal e alarmes",()=>{
  it("semana saudável: sem alarmes, taxas e origens corretas",()=>{
    const s=summarize(base(weekOf()));
    expect(s.steps.app_opened).toBeCloseTo(100);
    expect(s.rates.diagnosticCompletion.value).toBeCloseTo(0.75);
    expect(s.sources.instagram.diagnostic_completed).toBeCloseTo(60);
    expect(evaluateAlarms(s)).toEqual([]);
    const {subject,text}=renderReport(s,[],{kind:"weekly"});
    expect(subject).toMatch(/resumo semanal \(16\/11 a 22\/11\)/);
    expect(text).toContain("Nenhum alarme");
    expect(text).toContain("instagram:");
    expect(text).toContain("Onde mais desistem");
  });
  it("menos de 50% acaba o diagnóstico → alarme (só com amostra ≥ 30)",()=>{
    const s=summarize(base(weekOf({started:80,completed:30})));
    expect(evaluateAlarms(s).map(a=>a.id)).toContain("diagnostic_completion");
    const small=summarize(base(weekOf({opened:14,started:14,completed:7,nextDay:0,mission:0,account:0})));
    expect(evaluateAlarms(small).map(a=>a.id)).not.toContain("diagnostic_completion");
    expect(renderReport(small,[],{}).text).toMatch(/menos de 30 alunos/);
  });
  it("menos de 20% volta no dia seguinte → alarme",()=>{
    const s=summarize(base(weekOf({nextDay:7})));
    expect(evaluateAlarms(s).map(a=>a.id)).toContain("next_day_return");
  });
  it("mesma pergunta reportada 3 vezes → alarme e instrução pronta a colar",()=>{
    const reports=[{item_id:"VN11PE-AN-016",subject_id:"math-a",category:"wrong",reports:2},{item_id:"VN11PE-AN-016",subject_id:"math-a",category:"typo",reports:1},{item_id:"PT-1",subject_id:"portuguese",category:"unclear",reports:1}];
    const s=summarize(base(weekOf(),reports));
    const alarms=evaluateAlarms(s);
    expect(alarms.map(a=>a.id)).toEqual(["report:VN11PE-AN-016"]);
    const {text,subject}=renderReport(s,alarms,{kind:"weekly"});
    expect(subject).toMatch(/1 alarme/);
    expect(text).toContain("resposta errada ×2, gralha ×1");
    expect(text).toContain("«Revê e corrige as perguntas reportadas: VN11PE-AN-016, PT-1»");
  });
  it("recolha parada há 2 dias depois de ter havido dados → alarme",()=>{
    const rows=weekOf().filter(r=>r.day<addDays(today,-2));
    expect(evaluateAlarms(summarize(base(rows))).map(a=>a.id)).toContain("silent_funnel");
    expect(evaluateAlarms(summarize(base([]))).map(a=>a.id)).not.toContain("silent_funnel");
  });
  it("dia de Lisboa",()=>{
    expect(lisbonDay(new Date("2026-11-22T23:30:00Z"))).toBe("2026-11-22");
    expect(lisbonDay(new Date("2026-07-22T23:30:00Z"))).toBe("2026-07-23");
  });
});

describe("rota do cron",()=>{
  const env={CRON_SECRET:"s3cret",RESEND_API_KEY:"re_dummy",REPORT_EMAIL_TO:"dono@exemplo.pt"};
  const req=(auth="Bearer s3cret",q="")=>new Request(`https://approvamais.pt/api/cron/weekly-report${q}`,{headers:auth?{authorization:auth}:{}});
  it("sem segredo certo → 401, sem consultar nem enviar",async()=>{
    const fetchImpl=vi.fn();
    expect((await GET(req("Bearer errado"),{env,fetchImpl})).status).toBe(401);
    expect((await GET(req(null),{env,fetchImpl})).status).toBe(401);
    expect((await GET(req(),{env:{...env,CRON_SECRET:""},fetchImpl})).status).toBe(401);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
  it("segunda-feira → envia resumo; outro dia sem alarmes → não envia",async()=>{
    fakeRows={funnel:weekOf(),reports:[]};
    const fetchImpl=vi.fn(async()=>new Response("{}",{status:200}));
    const monday=await GET(req(),{env,fetchImpl,now:new Date("2026-11-23T07:00:00Z")});
    expect(monday.body).toMatchObject({sent:true,kind:"weekly"});
    const body=JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(body.to).toEqual(["dono@exemplo.pt"]);expect(body.subject).toMatch(/resumo semanal/);
    fetchImpl.mockClear();
    fakeRows={funnel:weekOf().map(r=>({...r,day:addDays(r.day,1)})),reports:[]};
    const tuesday=await GET(req(),{env,fetchImpl,now:new Date("2026-11-24T07:00:00Z")});
    expect(tuesday.body).toMatchObject({sent:false,kind:"alarm"});
    expect(fetchImpl).not.toHaveBeenCalled();
  });
  it("?modo=resumo força o resumo em qualquer dia",async()=>{
    const fetchImpl=vi.fn(async()=>new Response("{}",{status:200}));
    const r=await GET(req("Bearer s3cret","?modo=resumo"),{env,fetchImpl,now:new Date("2026-11-25T07:00:00Z")});
    expect(r.body.kind).toBe("weekly");
  });
  it("sem destinatário ou sem Resend → 503",async()=>{
    expect((await GET(req(),{env:{...env,REPORT_EMAIL_TO:""}})).status).toBe(503);
    expect((await GET(req(),{env:{...env,RESEND_API_KEY:""}})).status).toBe(503);
  });
});
