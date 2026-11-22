import {describe,expect,it} from "vitest";
import {authErrorMessage,isEmailInUse} from "../../app/lib/authErrorCopy.js";

describe("mensagens de autenticação",()=>{
  // Decisão do product owner (2026-11-22): ao criar conta com um email que já tem
  // conta, a app diz isso claramente e passa para «Entrar». Entrar e recuperar a
  // palavra-passe continuam a não revelar se um email tem conta.
  it("criar conta com email já registado: diz que já tem conta",()=>{
    const error={code:"USER_ALREADY_EXISTS",message:"User already exists. Use another email.",status:422};
    expect(isEmailInUse(error)).toBe(true);
    expect(isEmailInUse({code:"USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",status:422})).toBe(true);
    expect(authErrorMessage("signup",error)).toBe("Este email já tem conta. Entra com a tua palavra-passe.");
    expect(isEmailInUse({code:"FAILED_TO_CREATE_USER",status:500})).toBe(false);
    expect(authErrorMessage("signup",{code:"FAILED_TO_CREATE_USER",status:500})).toBe("Não foi possível criar a conta. Se já tens conta com este email, usa «Entrar».");
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

describe("recuperação da palavra-passe",()=>{
  it("pedido de código: nunca revela se o email tem conta",()=>{
    expect(authErrorMessage("reset_request",{status:400,code:"USER_NOT_FOUND"})).toBe("Não foi possível enviar o código agora. Tenta novamente daqui a pouco.");
    expect(authErrorMessage("reset_request",{status:404})).toMatch(/ainda não está disponível/);
    expect(authErrorMessage("reset_request",{status:429})).toMatch(/Demasiadas tentativas/);
  });
  it("código inválido, expirado ou com tentativas a mais",()=>{
    expect(authErrorMessage("reset",{code:"INVALID_OTP"})).toMatch(/Código inválido/);
    expect(authErrorMessage("reset",{code:"OTP_EXPIRED"})).toMatch(/expirou/);
    expect(authErrorMessage("reset",{code:"TOO_MANY_ATTEMPTS"})).toMatch(/Pede um código novo/);
    expect(authErrorMessage("reset",{code:"PASSWORD_TOO_SHORT"})).toMatch(/8 caracteres/);
  });
});
