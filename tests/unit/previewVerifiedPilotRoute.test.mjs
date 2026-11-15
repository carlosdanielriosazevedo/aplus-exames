import {beforeEach,afterEach,describe,expect,it,vi} from "vitest";
import {syntheticPostgresUrl} from "../helpers/syntheticPostgresUrl.mjs";
const mocks=vi.hoisted(()=>({
 requireSession:vi.fn(),ensureAppUser:vi.fn(),getSql:vi.fn(),
 read:vi.fn(),start:vi.fn(),answer:vi.fn(),finish:vi.fn()
}));
vi.mock("next/server",()=>({
 NextResponse:{json:(body,options={})=>({
  body,status:options.status??200,headers:options.headers||{}
 })}
}));
vi.mock("../../app/lib/server/identity.js",()=>({
 requireSession:mocks.requireSession,
 ensureAppUser:mocks.ensureAppUser,
 authErrorResponse:(e)=>({status:e.status||401,body:{ok:false,error:e.code||"UNAUTHORIZED"}})
}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:mocks.getSql}));
vi.mock("../../app/lib/server/preview-verified-pilot-store.js",()=>({
 readPreviewPilot:mocks.read,
 startPreviewPilot:mocks.start,
 recordPreviewAnswer:mocks.answer,
 finishPreviewPilot:mocks.finish
}));

import {GET,POST} from "../../app/api/internal/verified-pilot/route.js";

const root="https://isolated-preview.example.test";
function post(body,origin=root){
 return new Request(root+"/api/internal/verified-pilot",{
   method:"POST",headers:{"Content-Type":"application/json",Origin:origin},
   body:JSON.stringify(body)
 });
}
beforeEach(()=>{
 vi.clearAllMocks();
 vi.stubEnv("APPROVA_VERIFIED_PILOT_ENABLED","YES");
 vi.stubEnv("VERCEL_ENV","preview");
 vi.stubEnv("VERCEL_PROJECT_ID","prj_8n5XwTMF651SAfsykIDji93oZp3r");
 vi.stubEnv("DATABASE_URL",syntheticPostgresUrl("postgres://ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech/neondb"));
 mocks.requireSession.mockResolvedValue({authUserId:"synthetic-student-a"});
 mocks.getSql.mockReturnValue({fake:true});
 mocks.read.mockResolvedValue(null);
 mocks.start.mockResolvedValue({started:true,completed:false,answered:[],sessionId:"id1"});
 mocks.answer.mockResolvedValue({started:true,completed:false,answered:["q1"],accepted:true});
 mocks.finish.mockResolvedValue({started:true,completed:true,verifiedXp:35,authority:"synthetic-preview-only"});
});
afterEach(()=>vi.unstubAllEnvs());

describe("synthetic pilot route is server-owned and fail-closed",()=>{
 it("is entirely disabled outside the isolated Preview before reading session",async()=>{
  vi.stubEnv("VERCEL_ENV","production");
  const out=await POST(post({action:"start"}));
  expect(out.status).toBe(404);
  expect(mocks.requireSession).not.toHaveBeenCalled();
  expect(mocks.getSql).not.toHaveBeenCalled();
 });
 it("requires same-origin POST before invoking any session or DB call",async()=>{
  const out=await POST(post({action:"start"},"https://evil.example"));
  expect(out.status).toBe(403);
  expect(mocks.requireSession).not.toHaveBeenCalled();
  expect(mocks.start).not.toHaveBeenCalled();
 });
 it("requires verified session before any create/read",async()=>{
  mocks.requireSession.mockRejectedValue(Object.assign(new Error("missing"),{
    status:401,code:"UNAUTHORIZED"
  }));
  const out=await GET();
  expect(out.status).toBe(401);
  expect(mocks.ensureAppUser).not.toHaveBeenCalled();
  expect(mocks.read).not.toHaveBeenCalled();
 });
 it("always starts/reads one subject from the authenticated session",async()=>{
  const result=await POST(post({action:"start"}));
  expect(result.status).toBe(200);
  expect(mocks.ensureAppUser).toHaveBeenCalledTimes(1);
  expect(mocks.start).toHaveBeenCalledWith({fake:true},"synthetic-student-a");
  expect(result.body.authority).toBe("synthetic-preview-only");
 });
 it("rejects attempts to choose other accounts, rewards, or arbitrary items",async()=>{
  const malicious=[
    {action:"start",auth_user_id:"victim"},
    {action:"finish",verified_xp:500},
    {action:"answer",questionId:"q1",choiceIndex:1,auth_user_id:"victim"},
    {action:"answer",questionId:"q8",choiceIndex:1}
  ];
  for(const cmd of malicious){
    const result=await POST(post(cmd));
    expect(result.status).toBe(400);
  }
  expect(mocks.requireSession).not.toHaveBeenCalled();
 });
 it("records only the submitted choice for the validated question",async()=>{
  const result=await POST(post({action:"answer",questionId:"q1",choiceIndex:1}));
  expect(result.status).toBe(200);
  expect(mocks.answer).toHaveBeenCalledWith({fake:true},"synthetic-student-a","q1",1);
  expect(result.body).not.toHaveProperty("correct");
 });
 it("finalizes using server-only SQL (no client score)",async()=>{
  const result=await POST(post({action:"finish"}));
  expect(result.status).toBe(200);
  expect(result.body.verifiedXp).toBe(35);
  expect(mocks.finish).toHaveBeenCalledWith({fake:true},"synthetic-student-a");
 });
 it("cannot disclose a driver exception containing credentials",async()=>{
  mocks.finish.mockRejectedValue(new Error(syntheticPostgresUrl("postgres://database.example.invalid/neondb",{password:"SECRET"})));
  const result=await POST(post({action:"finish"}));
  expect(result.status).toBe(503);
  expect(JSON.stringify(result.body)).not.toContain("SECRET");
 });
 it("does not recreate attempts during GET",async()=>{
  const result=await GET();
  expect(result.status).toBe(200);
  expect(result.body.started).toBe(false);
  expect(mocks.ensureAppUser).not.toHaveBeenCalled();
  expect(mocks.start).not.toHaveBeenCalled();
 });
});
