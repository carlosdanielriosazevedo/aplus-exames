import crypto from "node:crypto";

// Emails de autenticação em português (códigos de recuperação, verificação e
// entrada). O Neon Auth chama o webhook /api/auth-email com o código; nós
// enviamos o email pelo Resend com texto nosso. Sem webhook ativo no Neon, o
// Neon continua a enviar o email por omissão (em inglês) e este código não corre.
//
// Privacidade: o email do aluno só é usado para o envio. Nada é guardado.

const MAX_AGE_MS=5*60*1000;
const JWKS_TTL_MS=10*60*1000;
const DEFAULT_FROM="APProva+ <nao-responder@approvamais.pt>";

let jwksCache={url:null,at:0,keys:[]};
export function resetJwksCache(){jwksCache={url:null,at:0,keys:[]}}

function authBaseUrl(env){
  return String(env.NEON_AUTH_URL||env.NEXT_PUBLIC_NEON_AUTH_URL||"").replace(/\/+$/,"");
}

async function findJwk(kid,env,fetchImpl,now){
  const url=`${authBaseUrl(env)}/.well-known/jwks.json`;
  const fresh=jwksCache.url===url&&now-jwksCache.at<JWKS_TTL_MS;
  let key=fresh?jwksCache.keys.find(k=>k.kid===kid):null;
  if(key)return key;
  // Chave desconhecida ou cache antiga: recarrega uma vez (rotação de chaves).
  const res=await fetchImpl(url,{cache:"no-store"});
  if(!res.ok)throw Object.assign(new Error("JWKS_UNAVAILABLE"),{code:"JWKS_UNAVAILABLE",retryable:true});
  const body=await res.json();
  jwksCache={url,at:now,keys:Array.isArray(body?.keys)?body.keys:[]};
  key=jwksCache.keys.find(k=>k.kid===kid);
  if(!key)throw Object.assign(new Error("UNKNOWN_KEY"),{code:"UNKNOWN_KEY"});
  return key;
}

// Verificação da assinatura Ed25519 (JWS destacado), conforme a documentação
// de webhooks do Neon Auth. Devolve o payload já interpretado.
export async function verifyNeonWebhook(rawBody,headers,{env=process.env,fetchImpl=fetch,now=Date.now()}={}){
  const signature=headers.get("x-neon-signature");
  const kid=headers.get("x-neon-signature-kid");
  const timestamp=headers.get("x-neon-timestamp");
  if(!signature||!kid||!timestamp)throw Object.assign(new Error("MISSING_SIGNATURE"),{code:"MISSING_SIGNATURE"});
  if(!authBaseUrl(env))throw Object.assign(new Error("AUTH_NOT_CONFIGURED"),{code:"AUTH_NOT_CONFIGURED",retryable:true});
  const ts=Number.parseInt(timestamp,10);
  if(!Number.isFinite(ts)||Math.abs(now-ts)>MAX_AGE_MS)throw Object.assign(new Error("STALE_TIMESTAMP"),{code:"STALE_TIMESTAMP"});
  const parts=signature.split(".");
  if(parts.length!==3||parts[1]!=="")throw Object.assign(new Error("BAD_SIGNATURE_FORMAT"),{code:"BAD_SIGNATURE_FORMAT"});
  const [headerB64,,signatureB64]=parts;
  const jwk=await findJwk(kid,env,fetchImpl,now);
  const publicKey=crypto.createPublicKey({key:jwk,format:"jwk"});
  const payloadB64=Buffer.from(rawBody,"utf8").toString("base64url");
  const signingInput=`${headerB64}.${Buffer.from(`${timestamp}.${payloadB64}`,"utf8").toString("base64url")}`;
  const valid=crypto.verify(null,Buffer.from(signingInput),publicKey,Buffer.from(signatureB64,"base64url"));
  if(!valid)throw Object.assign(new Error("INVALID_SIGNATURE"),{code:"INVALID_SIGNATURE"});
  return JSON.parse(rawBody);
}

const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const OTP_COPY={
  "forget-password":{
    subject:"O teu código para recuperar a palavra-passe da APProva+",
    intro:"Pediste para recuperar a palavra-passe da tua conta APProva+. Escreve este código na app:",
    outro:"Se não foste tu, ignora este email. A tua palavra-passe não muda."
  },
  "email-verification":{
    subject:"O teu código de confirmação da APProva+",
    intro:"Para confirmar o teu email na APProva+, escreve este código na app:",
    outro:"Se não criaste uma conta na APProva+, ignora este email."
  },
  "sign-in":{
    subject:"O teu código de entrada na APProva+",
    intro:"Para entrares na tua conta APProva+, escreve este código na app:",
    outro:"Se não foste tu, ignora este email. Ninguém entra na tua conta sem este código."
  }
};

const LINK_COPY={
  "forget-password":{subject:"Recupera a palavra-passe da APProva+",intro:"Pediste para recuperar a palavra-passe da tua conta APProva+.",button:"Escolher nova palavra-passe",outro:"Se não foste tu, ignora este email. A tua palavra-passe não muda."},
  "email-verification":{subject:"Confirma o teu email na APProva+",intro:"Falta só confirmar o teu email na APProva+.",button:"Confirmar email",outro:"Se não criaste uma conta na APProva+, ignora este email."},
  "sign-in":{subject:"Entra na APProva+",intro:"Usa o botão abaixo para entrares na tua conta APProva+.",button:"Entrar na APProva+",outro:"Se não foste tu, ignora este email."}
};

function minutesUntil(expiresAt,now){
  const t=Date.parse(expiresAt||"");
  if(!Number.isFinite(t))return null;
  const m=Math.round((t-now)/60000);
  return m>0&&m<=24*60?m:null;
}

function layout({title,bodyHtml,outro}){
  return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f5f8;font-family:Arial,Helvetica,sans-serif;color:#08132e">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f8;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#08132e;padding:18px 24px;font-size:22px;font-weight:bold;color:#ffffff">APProva<span style="color:#ffb13b">+</span></td></tr>
<tr><td style="padding:24px;font-size:16px;line-height:1.5">${bodyHtml}
<p style="margin:24px 0 0;font-size:14px;color:#55607a">${escapeHtml(outro)}</p></td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #e6e8ef;font-size:12px;color:#7a8399">Este email foi enviado automaticamente pela APProva+ (approvamais.pt). Não respondas a este email.</td></tr>
</table></td></tr></table></body></html>`;
}

// Constrói assunto, HTML e texto simples. Devolve null para tipos desconhecidos.
export function buildAuthEmail(payload,now=Date.now()){
  const type=payload?.event_type;
  const data=payload?.event_data||{};
  if(type==="send.otp"){
    const copy=OTP_COPY[data.otp_type];
    const code=String(data.otp_code||"");
    if(!copy||!/^[0-9A-Za-z]{4,12}$/.test(code))return null;
    const mins=minutesUntil(data.expires_at,now);
    const validity=mins?`O código é válido durante ${mins} minuto${mins===1?"":"s"}.`:"O código é válido durante pouco tempo.";
    const html=layout({title:copy.subject,outro:copy.outro,bodyHtml:
      `<p style="margin:0 0 16px">${escapeHtml(copy.intro)}</p>
<p style="margin:0 0 16px;font-size:32px;font-weight:bold;letter-spacing:6px;text-align:center;background:#fff8e8;border-radius:8px;padding:14px 0">${escapeHtml(code)}</p>
<p style="margin:0">${escapeHtml(validity)}</p>`});
    const text=`${copy.intro}\n\n${code}\n\n${validity}\n\n${copy.outro}\n\nAPProva+ (approvamais.pt)`;
    return {subject:copy.subject,html,text};
  }
  if(type==="send.magic_link"){
    const copy=LINK_COPY[data.link_type];
    let url;
    try{url=new URL(String(data.link_url||""))}catch{return null}
    if(!copy||url.protocol!=="https:")return null;
    const href=url.toString();
    const html=layout({title:copy.subject,outro:copy.outro,bodyHtml:
      `<p style="margin:0 0 20px">${escapeHtml(copy.intro)}</p>
<p style="margin:0 0 20px;text-align:center"><a href="${escapeHtml(href)}" style="display:inline-block;background:#ffb13b;color:#08132e;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:8px">${escapeHtml(copy.button)}</a></p>
<p style="margin:0;font-size:13px;color:#55607a;word-break:break-all">Se o botão não funcionar, copia este endereço para o browser:<br>${escapeHtml(href)}</p>`});
    const text=`${copy.intro}\n\n${copy.button}: ${href}\n\n${copy.outro}\n\nAPProva+ (approvamais.pt)`;
    return {subject:copy.subject,html,text};
  }
  return null;
}

export function authEmailConfigured(env=process.env){
  return Boolean(env.RESEND_API_KEY);
}

// Envio pelo Resend (API HTTP; sem dependência nova). Idempotência por
// event_id: os reenvios do Neon usam o mesmo id e o Resend não duplica.
export async function sendAuthEmail({to,subject,html,text,eventId},{env=process.env,fetchImpl=fetch}={}){
  const res=await fetchImpl("https://api.resend.com/emails",{
    method:"POST",
    headers:{
      Authorization:`Bearer ${env.RESEND_API_KEY}`,
      "Content-Type":"application/json",
      ...(eventId?{"Idempotency-Key":`neon-auth-${String(eventId).slice(0,200)}`}:{})
    },
    body:JSON.stringify({from:env.AUTH_EMAIL_FROM||DEFAULT_FROM,to:[to],subject,html,text})
  });
  if(!res.ok){
    const retryable=res.status>=500||res.status===429;
    throw Object.assign(new Error(`EMAIL_SEND_FAILED_${res.status}`),{code:"EMAIL_SEND_FAILED",status:res.status,retryable});
  }
  return true;
}
