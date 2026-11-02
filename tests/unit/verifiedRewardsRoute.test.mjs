import {beforeEach,describe,expect,it,vi} from "vitest";
import {readVerifiedRewardTotals} from "../../app/lib/server/verified-rewards.js";
import {validateCloudWrite} from "../../app/lib/server/cloud-state-validation.js";

const mocks=vi.hoisted(()=>({
  requireSession:vi.fn(),
  getSql:vi.fn(),
  readTotals:vi.fn()
}));
vi.mock("next/server",()=>({
  NextResponse:{
    json:(body,options={})=>({
      body,status:options.status??200,headers:options.headers||{}
    })
  }
}));
vi.mock("../../app/lib/server/identity.js",()=>({
  requireSession:mocks.requireSession,
  authErrorResponse:(error)=>({
    status:error.status||401,body:{ok:false,error:error.code||"UNAUTHORIZED"}
  })
}));
vi.mock("../../app/lib/server/db.js",()=>({
  databaseConfigured:()=>true,
  getSql:mocks.getSql
}));
vi.mock("../../app/lib/server/verified-rewards.js",async importOriginal=>{
  const module=await importOriginal();
  return {...module,readVerifiedRewardTotals:mocks.readTotals};
});
import {GET} from "../../app/api/cloud/rewards/route.js";

beforeEach(()=>{
  vi.clearAllMocks();
  mocks.requireSession.mockResolvedValue({authUserId:"signed-student-a"});
  mocks.getSql.mockReturnValue({serverOnly:true});
  mocks.readTotals.mockResolvedValue({verifiedXp:0,receiptCount:0});
});

describe("verified reward read boundary",()=>{
  it("never returns unverified client-reported XP",async()=>{
    const res=await GET();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok:true,authority:"server-verified-receipts",
      verifiedXp:0,receiptCount:0
    });
    expect(res.headers["Cache-Control"]).toBe("no-store");
    expect(mocks.readTotals).toHaveBeenCalledWith(
      {serverOnly:true},"signed-student-a"
    );
  });

  it("rejects unauthenticated access before querying any data",async()=>{
    mocks.requireSession.mockRejectedValue(Object.assign(new Error("No session"),{
      status:401,code:"UNAUTHORIZED"
    }));
    const res=await GET();
    expect(res.status).toBe(401);
    expect(mocks.readTotals).not.toHaveBeenCalled();
  });

  it("redacts SQL failures and does not expose sensitive connection details",async()=>{
    mocks.readTotals.mockRejectedValue(new Error("secret://credential"));
    const res=await GET();
    expect(res.status).toBe(503);
    expect(JSON.stringify(res.body)).not.toContain("credential");
  });
});

describe("ledger summation does not trust student_cloud_state",()=>{
  it("filters by the verified session and reads only the immutable receipt table",async()=>{
    const recorded=[];
    const sql=async(parts,...values)=>{
      recorded.push({query:parts.join("?"),values});
      return [{verified_xp:"120",receipt_count:"2"}];
    };
    const totals=await readVerifiedRewardTotals(sql,"signed-student-a");
    expect(totals).toEqual({verifiedXp:120,receiptCount:2});
    expect(recorded).toHaveLength(1);
    expect(recorded[0].query).toContain("verified_completion_receipts");
    expect(recorded[0].query).not.toContain("student_cloud_state");
    expect(recorded[0].query).toContain("where auth_user_id=?");
    expect(recorded[0].values).toEqual(["signed-student-a"]);
  });

  it("does not accept forged authority fields in a cloud snapshot",()=>{
    const base={schema:"aplus-student-state-v8",xp:99999};
    expect(validateCloudWrite({operation:"insert",expectedRevision:0,state:base}).ok)
      .toBe(true); // Still unverified local progress; not an official award.
    const spoofed=[
      {...base,verifiedXp:99999},
      {...base,rewardReceipts:[{xp:99999}]},
      {...base,competition:{weeks:{"test":{rewardAuthority:"server-verified"}}}}
    ];
    for(const state of spoofed){
      expect(validateCloudWrite({operation:"insert",expectedRevision:0,state}).ok)
        .toBe(false);
    }
  });
});
