import {describe,expect,it} from "vitest";
import {emergencyResponse,switchState,config} from "../../middleware.js";

describe("interruptores de emergência",()=>{
  it("por omissão tudo ativo",()=>{
    expect(switchState({})).toEqual({signupEnabled:true,cloudWritesEnabled:true});
    expect(emergencyResponse("POST","/api/auth/sign-up/email",{})).toBeNull();
    expect(emergencyResponse("POST","/api/cloud/state",{})).toBeNull();
  });
  it("registo desligado recusa só a criação de contas; login e sessão continuam",()=>{
    const env={APPROVA_SIGNUP_ENABLED:"0"};
    expect(emergencyResponse("POST","/api/auth/sign-up/email",env)).toMatchObject({status:503,body:{code:"SIGNUP_DISABLED"}});
    expect(emergencyResponse("POST","/api/auth/sign-in/email",env)).toBeNull();
    expect(emergencyResponse("GET","/api/auth/get-session",env)).toBeNull();
  });
  it("gravação online desligada recusa POST mas deixa ler o progresso",()=>{
    const env={APPROVA_CLOUD_WRITES_ENABLED:"0"};
    expect(emergencyResponse("POST","/api/cloud/state",env)).toMatchObject({status:503,body:{code:"CLOUD_WRITES_DISABLED",retryable:true}});
    expect(emergencyResponse("GET","/api/cloud/state",env)).toBeNull();
  });
  it("só valores explícitos '0' desligam",()=>{
    expect(switchState({APPROVA_SIGNUP_ENABLED:"false",APPROVA_CLOUD_WRITES_ENABLED:""})).toEqual({signupEnabled:true,cloudWritesEnabled:true});
  });
  it("o middleware só intercepta as rotas protegidas",()=>{
    expect(config.matcher).toEqual(["/api/auth/sign-up/:path*","/api/cloud/state"]);
  });
});
