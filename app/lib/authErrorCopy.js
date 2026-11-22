// Mensagens de autenticação em português. Só ao criar conta se diz que um email
// já tem conta (decisão do product owner, 2026-11-22); ao entrar e ao recuperar a
// palavra-passe a resposta continua a não revelar se um email tem conta.
// Recebe o erro devolvido pelo serviço de autenticação (code/status/message).
const GENERIC_SIGNUP="Não foi possível criar a conta. Se já tens conta com este email, usa «Entrar».";
const GENERIC_SIGNIN="Email ou palavra-passe incorretos.";
const TOO_MANY="Demasiadas tentativas. Espera alguns minutos e tenta novamente.";

// Criar conta com um email que já tem conta (decisão do product owner,
// 2026-11-22): dizer claramente, para o aluno passar a «Entrar».
export function isEmailInUse(error){
  const code=String(error?.code||"").toUpperCase();
  return /USER_ALREADY_EXISTS|EMAIL_ALREADY|ALREADY_REGISTERED|EMAIL_EXISTS/.test(code)||/already (exists|registered|in use)/i.test(String(error?.message||""));
}
export const EMAIL_IN_USE_MESSAGE="Este email já tem conta. Entra com a tua palavra-passe.";

export function authErrorMessage(kind,error){
  const code=String(error?.code||"").toUpperCase();
  const status=Number(error?.status)||0;
  const text=String(error?.message||"");
  if(kind==="reset"&&/TOO_MANY_ATTEMPTS/.test(code))return "Demasiadas tentativas com este código. Pede um código novo.";
  if(status===429||/TOO_MANY|RATE/.test(code))return TOO_MANY;
  if(kind==="signup"&&isEmailInUse(error))return EMAIL_IN_USE_MESSAGE;
  if(code==="SIGNUP_DISABLED")return "A criação de novas contas está temporariamente em pausa. Tenta novamente mais tarde.";
  if(/PASSWORD_TOO_SHORT/.test(code)||/password.*(short|least)/i.test(text))return "A palavra-passe deve ter pelo menos 8 caracteres.";
  if(/PASSWORD_TOO_LONG/.test(code))return "A palavra-passe é demasiado longa.";
  if(code==="INVALID_EMAIL"||/invalid email(?! or)/i.test(text))return "Confirma se o endereço de email está correto.";
  if(/EMAIL_NOT_VERIFIED/.test(code)||/not verified/i.test(text))return "Confirma o teu email antes de entrar. Procura a mensagem na tua caixa de correio.";
  if(/ORIGIN/.test(code)||/invalid origin/i.test(text))return "Não foi possível ligar ao serviço de contas a partir deste endereço. Tenta mais tarde.";
  if(kind==="reset_request"){
    // 404 sem código = funcionalidade não ativa no serviço (USER_NOT_FOUND é tratado como sucesso em cloud.js).
    if((status===404&&!code)||/NOT_ENABLED|PLUGIN|ENDPOINT/.test(code))return "A recuperação da palavra-passe ainda não está disponível. Contacta-nos se precisares de ajuda.";
    return "Não foi possível enviar o código agora. Tenta novamente daqui a pouco.";
  }
  if(kind==="reset"){
    if(/OTP_EXPIRED|EXPIRED/.test(code)||/expired/i.test(text))return "O código expirou. Pede um código novo.";
    return "Código inválido. Confirma os 6 dígitos que recebeste por email.";
  }
  // Conta existente, credenciais erradas ou qualquer outra falha: resposta genérica.
  return kind==="signup"?GENERIC_SIGNUP:GENERIC_SIGNIN;
}
