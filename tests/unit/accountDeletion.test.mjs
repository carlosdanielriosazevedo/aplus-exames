import {describe,expect,it} from "vitest";
import {validateDeletionRequest,verifyAccountPassword,deletionStatements,deleteAccountData,DELETION_CONFIRMATION} from "../../app/lib/server/account-deletion.js";

const ALL=new Set([
  "public.student_cloud_state","public.student_cloud_state_history","public.ranking_profiles",
  "public.ranking_xp_events","public.ranking_weekly_totals","public.ranking_league_memberships",
  "public.account_consents","public.app_users",
  "neon_auth.session","neon_auth.account","neon_auth.member","neon_auth.user"
]);

function fakeSql(present){
  const calls={transactions:[]};
  const sql=async(strings,...values)=>{const [schema,quoted]=String(values[0]).split(".");const name=`${schema}.${quoted.replaceAll('"',"")}`;return [{present:present.has(name)}]};
  sql.query=(text,params)=>({text,params});
  sql.transaction=async queries=>{calls.transactions.push(queries);return queries.map(()=>[])};
  return {sql,calls};
}

describe("eliminação de conta",()=>{
  it("exige palavra-passe e a palavra ELIMINAR",()=>{
    expect(validateDeletionRequest({password:"x"}).code).toBe("CONFIRMATION_REQUIRED");
    expect(validateDeletionRequest({confirmation:"eliminar"}).code).toBe("PASSWORD_REQUIRED");
    expect(validateDeletionRequest({password:"x",confirmation:" eliminar "})).toEqual({ok:true,password:"x"});
    expect(DELETION_CONFIRMATION).toBe("ELIMINAR");
  });

  it("apaga dados da app antes da identidade e só tabelas que existem",()=>{
    const statements=deletionStatements("user-1",ALL);
    const texts=statements.map(row=>row.text);
    expect(texts.indexOf('delete from public."app_users" where auth_user_id = $1')).toBeGreaterThan(texts.indexOf('delete from public."student_cloud_state" where auth_user_id = $1'));
    expect(texts.at(-1)).toBe('delete from neon_auth."user" where "id"::text = $1');
    expect(statements.every(row=>row.params[0]==="user-1")).toBe(true);
    const partial=deletionStatements("user-1",new Set(["public.student_cloud_state","neon_auth.user"]));
    expect(partial).toHaveLength(2);
  });

  it("tudo numa única transação; recusa sem a tabela de identidade",async()=>{
    const ok=fakeSql(ALL);
    expect(await deleteAccountData(ok.sql,"user-1")).toEqual({ok:true,tables:12});
    expect(ok.calls.transactions).toHaveLength(1);
    const missing=fakeSql(new Set(["public.student_cloud_state"]));
    expect(await deleteAccountData(missing.sql,"user-1")).toEqual({ok:false,code:"AUTH_IDENTITY_TABLE_UNAVAILABLE"});
    expect(missing.calls.transactions).toHaveLength(0);
  });

  it("confirma a palavra-passe no Neon Auth sem usar cookies",async()=>{
    let request=null;
    const fetchImpl=async(url,init)=>{request={url,init};return {ok:false,status:401}};
    const result=await verifyAccountPassword({baseUrl:"https://auth.example.invalid/neondb/auth",email:"a@example.invalid",password:"p",origin:"https://approvamais.pt",fetchImpl});
    expect(result).toEqual({ok:false,code:"INVALID_PASSWORD"});
    expect(request.url).toBe("https://auth.example.invalid/neondb/auth/sign-in/email");
    expect(request.init.headers.Cookie).toBeUndefined();
    expect(JSON.parse(request.init.body)).toMatchObject({email:"a@example.invalid",password:"p"});
    expect(await verifyAccountPassword({baseUrl:"https://x.invalid",email:"a",password:"p",origin:"o",fetchImpl:async()=>({ok:true,status:200})})).toEqual({ok:true});
    expect((await verifyAccountPassword({baseUrl:"https://x.invalid",email:"a",password:"p",origin:"o",fetchImpl:async()=>{throw new Error("down")}})).code).toBe("PASSWORD_CHECK_UNAVAILABLE");
  });
});
