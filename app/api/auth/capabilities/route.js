import {NextResponse} from "next/server";
import {authConfiguration} from "../../../lib/server/identity";

export const runtime="nodejs";

export async function GET(){
  const cfg=authConfiguration();
  return NextResponse.json({
    ok:true,
    provider:cfg.provider,
    architecture:cfg.strategy,
    authProviderConfigured:cfg.authProviderConfigured,
    dataApiConfigured:cfg.dataApiConfigured,
    serverSessionConfigured:cfg.serverSessionConfigured,
    serverSessionEnforced:cfg.serverSessionEnforced,
    rowLevelSecurityExpected:cfg.rowLevelSecurityExpected,
    realUserReady:cfg.realUserReady,
    roles:["student","parent","reviewer","admin"],
    note:cfg.realUserReady
      ?"Autenticação real e fronteiras server-side ativas."
      :"Ainda não é uma fronteira de segurança completa para utilizadores reais: a sessão server-side continua por implementar/ativar."
  },{
    headers:{"Cache-Control":"no-store"}
  });
}
