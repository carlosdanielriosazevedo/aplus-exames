import {beforeEach,afterEach,describe,it,expect,vi} from "vitest";
import {syntheticPostgresUrl} from "../helpers/syntheticPostgresUrl.mjs";

const mocks=vi.hoisted(()=>({sql:vi.fn()}));
vi.mock("@neondatabase/serverless",()=>({neon:()=>mocks.sql}));
import {databaseHealth} from "../../app/lib/server/db.js";
const fakeConnection=syntheticPostgresUrl("postgresql://database.example.invalid/neondb",{
  password:"SECRET_DO_NOT_LOG"
});

beforeEach(()=>{
  mocks.sql.mockReset();
  vi.stubEnv("DATABASE_URL",fakeConnection);
});
afterEach(()=>vi.unstubAllEnvs());

describe("database health does not expose driver exceptions",()=>{
  it("returns only allowlisted status when the driver fails with a DSN",async()=>{
    mocks.sql.mockRejectedValue(new Error(
      `connection failed: ${fakeConnection}`
    ));
    const result=await databaseHealth();
    expect(result).toEqual({
      configured:true,reachable:false,provider:"neon-postgres"
    });
    expect(JSON.stringify(result)).not.toContain("SECRET_DO_NOT_LOG");
    expect(mocks.sql).toHaveBeenCalledTimes(1);
  });
});
