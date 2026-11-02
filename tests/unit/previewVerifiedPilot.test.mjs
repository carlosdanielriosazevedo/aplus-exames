import {describe,it,expect} from "vitest";
import {PILOT_BANK,PILOT_KEY,pilotEnabled,validatePilotCommand,publicPilotSession}
  from "../../app/lib/server/preview-verified-pilot.js";

const env={
 APPROVA_VERIFIED_PILOT_ENABLED:"YES",
 VERCEL_ENV:"preview",
 VERCEL_PROJECT_ID:"prj_8n5XwTMF651SAfsykIDji93oZp3r",
 DATABASE_URL:"postgresql://synthetic:fake@ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech/neondb"
};
describe("synthetic pilot hard-lock",()=>{
  it("is disabled unless explicit opt-in, exact isolated Preview and approved Neon host",()=>{
    expect(pilotEnabled({...env})).toBe(true);
    const wrong=[
      {...env,APPROVA_VERIFIED_PILOT_ENABLED:""},
      {...env,VERCEL_ENV:"production"},
      {...env,VERCEL_PROJECT_ID:"prj_H0nD83gkRwu7Id05OhzL4CC60s4M"},
      {...env,DATABASE_URL:"postgres://x:secret@unknown.db.example/neondb"},
      {...env,DATABASE_URL:"postgres://x:secret@ep-holy-term-b93irruj.c-7.eu-central-1.aws.neon.tech/prod"},
      {...env,DATABASE_URL:undefined},
      {...env,VERCEL_PROJECT_ID:undefined}
    ];
    for(const candidate of wrong)expect(pilotEnabled(candidate)).toBe(false);
  });
  it("has exactly 7 immutable original synthetic questions with safe client projection",()=>{
    expect(PILOT_KEY).toBe("synthetic-math-seven-v1");
    expect(PILOT_BANK).toHaveLength(7);
    expect(new Set(PILOT_BANK.map(q=>q.id)).size).toBe(7);
    for(const q of PILOT_BANK){
      expect(q.options).toHaveLength(3);
      expect(q).not.toHaveProperty("correct");
      expect(q).not.toHaveProperty("correctIndex");
      expect(Object.isFrozen(q)).toBe(true);
      expect(Object.isFrozen(q.options)).toBe(true);
    }
  });
  it("never accepts client-selected identity, grade, score, retries or unexpected fields",()=>{
    for(const cmd of [
      {action:"start",auth_user_id:"victim"},
      {action:"finish",verifiedXp:500},
      {action:"answer",questionId:"q1",choiceIndex:0,correct:true},
      {action:"answer",questionId:"q0",choiceIndex:0},
      {action:"answer",questionId:"q1",choiceIndex:3},
      {action:"answer",questionId:"q1",choiceIndex:"1"},
      {action:"answer",questionId:"q1",choiceIndex:0.5},
      {action:"reset"}
    ])expect(validatePilotCommand(cmd).ok).toBe(false);
    expect(validatePilotCommand({action:"start"}).ok).toBe(true);
    expect(validatePilotCommand({action:"finish"}).ok).toBe(true);
    expect(validatePilotCommand({action:"answer",questionId:"q7",choiceIndex:0}).ok).toBe(true);
  });
  it("only reveals answered question IDs, not submitted answers or internal SQL grading",()=>{
    const state=publicPilotSession({
      session_id:"synthetic-uuid",completed_at:null,
      answers:{q1:1,q3:2,forgedId:3}
    });
    expect(state.answered).toEqual(["q1","q3"]);
    expect(state.started).toBe(true);
    expect(JSON.stringify(state)).not.toContain("forgedId");
    expect(state).not.toHaveProperty("answers");
  });
});
