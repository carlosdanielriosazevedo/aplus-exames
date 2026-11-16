import {describe,expect,it} from "vitest";
import {authErrorMessage} from "../../app/lib/authErrorCopy.js";

describe("mensagens de autenticação",()=>{
  it("não revela se o email já tem conta",()=>{
    const exists=authErrorMessage("signup",{code:"USER_ALREADY_EXISTS",message:"User already exists. Use another email.",status:422});
    const other=authErrorMessage("signup",{code:"FAILED_TO_CREATE_USER",status:500});
    expect(exists).toBe(other);
    expect(exists).not.toMatch(/exist|already/i);
  });
  it("login falhado tem a mesma resposta para email inexistente e palavra-passe errada",()=>{
    expect(authErrorMessage("signin",{code:"INVALID_EMAIL_OR_PASSWORD",status:401})).toBe("Email ou palavra-passe incorretos.");
    expect(authErrorMessage("signin",{code:"USER_NOT_FOUND",status:404})).toBe("Email ou palavra-passe incorretos.");
  });
  it("traduz casos úteis sem expor detalhes técnicos",()=>{
    expect(authErrorMessage("signup",{status:429})).toMatch(/Demasiadas tentativas/);
    expect(authErrorMessage("signup",{code:"PASSWORD_TOO_SHORT"})).toMatch(/8 caracteres/);
    expect(authErrorMessage("signup",{code:"SIGNUP_DISABLED",status:503})).toMatch(/em pausa/);
    expect(authErrorMessage("signin",{code:"EMAIL_NOT_VERIFIED"})).toMatch(/Confirma o teu email/);
    expect(authErrorMessage("signin",{message:"Invalid origin"})).not.toMatch(/origin/i);
  });
});
