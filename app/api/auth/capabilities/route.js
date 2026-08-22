import {NextResponse} from "next/server";
import {authConfiguration} from "../../../lib/server/identity";

export async function GET(){
  const cfg=authConfiguration();
  return NextResponse.json({
    ok:true,
    authConfigured:cfg.configured,
    provider:cfg.provider,
    architecture:cfg.strategy,
    roles:["student","parent","reviewer","admin"],
    note:cfg.configured
      ?"Neon Auth configurado no ambiente. A ligação de sessão real é a etapa seguinte."
      :"Modo demo/local. Não existem passwords geridas pela A+."
  });
}
