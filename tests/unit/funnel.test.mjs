import {beforeEach,describe,expect,it,vi} from "vitest";
const mocks=vi.hoisted(()=>({getSql:vi.fn(),inc:vi.fn()}));
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200})}}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:mocks.getSql,databaseConfigured:()=>true}));
vi.mock("../../app/lib/server/funnel.js",async original=>{const real=await original();return {...real,incrementFunnel:mocks.inc}});
import {POST} from "../../app/api/funnel/route.js";
import {resetFunnelRateLimit} from "../../app/lib/server/funnel.js";
import {funnelStepsReached,pendingFunnelSteps,FUNNEL_SENT_KEY,FUNNEL_SOURCE_KEY,normalizeFunnelSource,sourceFromUrl} from "../../app/lib/funnel.js";
import {flushFunnel,captureFunnelSource} from "../../app/lib/funnelClient.js";

const origin="https://approva.test";
const post=(body,headers={origin})=>new Request(origin+"/api/funnel",{method:"POST",headers:{"Content-Type":"application/json",...headers},body:JSON.stringify(body)});
const memory=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}};
beforeEach(()=>{vi.clearAllMocks();resetFunnelRateLimit();mocks.getSql.mockReturnValue({});mocks.inc.mockResolvedValue()});

describe("funil anónimo",()=>{
  it("conta só passos conhecidos e não aceita identificadores",async()=>{
    expect((await POST(post({step:"diagnostic_completed"}))).status).toBe(201);
    expect(mocks.inc.mock.calls[0][1]).toBe("diagnostic_completed");
    for(const extra of [{userId:"u"},{deviceId:"d"},{email:"a@b.c"}])
      expect((await POST(post({step:"app_opened",...extra}))).body.code).toBe("UNKNOWN_FUNNEL_FIELD");
    expect((await POST(post({step:"nota_do_exame"}))).status).toBe(400);
    const foreign=await POST(post({step:"app_opened"},{origin:"https://evil.test"}));
    expect(foreign.status).toBe(202);expect(foreign.body.recorded).toBe(false);
  });
  it("limita abuso por origem (60 por hora)",async()=>{
    for(let i=0;i<60;i++)expect((await POST(post({step:"app_opened"}))).status).toBe(201);
    expect((await POST(post({step:"app_opened"}))).status).toBe(429);
  });
  it("deriva os passos do estado do aluno",()=>{
    const s={productAnalytics:{appOpenCount:3,firstSeenDay:"2026-11-10",activeDays:["2026-11-10","2026-11-11"]},selectedSubjectIds:["portuguese"],
      subjectProgress:{portuguese:{diagnosticDone:true,sessions:[{kind:"diagnostic"},{kind:"mission"}]}},identity:{mode:"authenticated"}};
    expect(funnelStepsReached(s)).toEqual(["app_opened","subjects_selected","diagnostic_started","diagnostic_completed","first_session_completed","returned_next_day","account_linked"]);
    expect(funnelStepsReached({productAnalytics:{firstSeenDay:"2026-11-10",activeDays:["2026-11-10","2026-11-12"]}})).toEqual([]);
    expect(pendingFunnelSteps(s,["app_opened","subjects_selected"])).toHaveLength(5);
  });
  it("sem rede não tenta enviar",async()=>{
    const original=Object.getOwnPropertyDescriptor(globalThis,"navigator");
    Object.defineProperty(globalThis,"navigator",{value:{onLine:false},configurable:true});
    try{
      const fetchImpl=vi.fn();
      expect(await flushFunnel({productAnalytics:{appOpenCount:1}},{storage:memory(),fetchImpl})).toBe(0);
      expect(fetchImpl).not.toHaveBeenCalled();
    }finally{
      if(original)Object.defineProperty(globalThis,"navigator",original);else delete globalThis.navigator;
    }
  });
  it("cada dispositivo envia cada passo uma única vez; falhas ficam para depois",async()=>{
    const s={productAnalytics:{appOpenCount:1},selectedSubjectIds:["math-a"]};
    const storage=memory();
    const fail=vi.fn().mockRejectedValue(new Error("offline"));
    expect(await flushFunnel(s,{storage,fetchImpl:fail})).toBe(0);
    const notRecorded=vi.fn().mockResolvedValue({ok:true,status:202,json:async()=>({recorded:false})});
    expect(await flushFunnel(s,{storage,fetchImpl:notRecorded})).toBe(0);
    const ok=vi.fn().mockResolvedValue({ok:true,status:201,json:async()=>({ok:true,recorded:true})});
    expect(await flushFunnel(s,{storage,fetchImpl:ok})).toBe(2);
    expect(await flushFunnel(s,{storage,fetchImpl:ok})).toBe(0);
    expect(JSON.parse(storage.getItem(FUNNEL_SENT_KEY))).toEqual(["app_opened","subjects_selected"]);
    expect(JSON.parse(ok.mock.calls[0][1].body)).toEqual({step:"app_opened",source:"direto"});
  });
  it("origem: lista fechada, primeiro contacto, nunca o endereço",async()=>{
    expect(normalizeFunnelSource("IG")).toBe("instagram");
    expect(normalizeFunnelSource("tiktok_ads_nov")).toBe("tiktok");
    expect(normalizeFunnelSource("http://evil.test/?x=1")).toBe("outro");
    expect(normalizeFunnelSource("")).toBe("direto");
    expect(sourceFromUrl("https://approvamais.pt/?utm_source=instagram&utm_campaign=lancamento")).toBe("instagram");
    expect(sourceFromUrl("https://approvamais.pt/?origem=prof")).toBe("escola");
    expect(sourceFromUrl("https://approvamais.pt/")).toBeNull();
    const storage=memory();
    captureFunnelSource({storage,href:"https://approvamais.pt/?utm_source=tiktok"});
    captureFunnelSource({storage,href:"https://approvamais.pt/?utm_source=instagram"});
    expect(storage.getItem(FUNNEL_SOURCE_KEY)).toBe("tiktok");
    const ok=vi.fn(async()=>new Response(JSON.stringify({ok:true,recorded:true}),{status:201}));
    await flushFunnel({productAnalytics:{appOpenCount:1}},{storage,fetchImpl:ok});
    expect(JSON.parse(ok.mock.calls[0][1].body)).toEqual({step:"app_opened",source:"tiktok"});
  });
  it("servidor: aceita origem da lista, recusa o resto; clientes antigos contam como direto",async()=>{
    expect((await POST(post({step:"app_opened",source:"instagram"}))).status).toBe(201);
    expect(mocks.inc.mock.calls.at(-1).slice(1)).toEqual(["app_opened","instagram"]);
    expect((await POST(post({step:"app_opened"}))).status).toBe(201);
    expect(mocks.inc.mock.calls.at(-1).slice(1)).toEqual(["app_opened","direto"]);
    expect((await POST(post({step:"app_opened",source:"https://x.test/campanha?id=1"}))).body.code).toBe("INVALID_FUNNEL_SOURCE");
  });
  it("diagnóstico começado e regresso na semana seguinte",()=>{
    expect(funnelStepsReached({productAnalytics:{milestones:{diagnostic_started:{at:1}}}})).toEqual(["diagnostic_started"]);
    const a=d=>({productAnalytics:{firstSeenDay:"2026-11-10",activeDays:["2026-11-10",d]}});
    expect(funnelStepsReached(a("2026-11-17"))).toContain("returned_week_after");
    expect(funnelStepsReached(a("2026-11-23"))).toContain("returned_week_after");
    expect(funnelStepsReached(a("2026-11-16"))).not.toContain("returned_week_after");
    expect(funnelStepsReached(a("2026-11-24"))).not.toContain("returned_week_after");
  });
});
