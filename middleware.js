import {NextResponse} from "next/server";

// Interruptores de emergência da beta pública. Controlados por variáveis de
// ambiente na Vercel (efeito no deploy seguinte, sem alterar código):
//   APPROVA_SIGNUP_ENABLED=0         → recusa criação de contas (login continua)
//   APPROVA_CLOUD_WRITES_ENABLED=0   → recusa gravações de progresso online
//                                      (o progresso fica no dispositivo; leitura continua)
// Qualquer outro valor, ou ausência, mantém o serviço ativo.

const JSON_HEADERS={"Cache-Control":"no-store","Content-Type":"application/json; charset=utf-8"};

export function switchState(env=process.env){
  return {
    signupEnabled:env.APPROVA_SIGNUP_ENABLED!=="0",
    cloudWritesEnabled:env.APPROVA_CLOUD_WRITES_ENABLED!=="0"
  };
}

export function emergencyResponse(method,pathname,env=process.env){
  const state=switchState(env);
  if(!state.signupEnabled&&method==="POST"&&pathname.startsWith("/api/auth/sign-up")){
    return {status:503,body:{ok:false,code:"SIGNUP_DISABLED",message:"A criação de novas contas está temporariamente em pausa. Tenta novamente mais tarde."}};
  }
  if(!state.cloudWritesEnabled&&method==="POST"&&pathname==="/api/cloud/state"){
    return {status:503,body:{ok:false,code:"CLOUD_WRITES_DISABLED",retryable:true,message:"A gravação online está em pausa por manutenção. O progresso continua guardado neste dispositivo."}};
  }
  return null;
}

export function middleware(request){
  const blocked=emergencyResponse(request.method,request.nextUrl.pathname);
  if(!blocked)return NextResponse.next();
  return new NextResponse(JSON.stringify(blocked.body),{status:blocked.status,headers:JSON_HEADERS});
}

export const config={matcher:["/api/auth/sign-up/:path*","/api/cloud/state"]};
