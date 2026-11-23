// Digital Asset Links da app Android (TWA) — auditoria externa 2026-11-23, G-01.
// Sem este ficheiro, a app da Google Play abre o site com a barra do Chrome.
// Os valores vêm da Play Console (Configuração → Integridade da app) e entram como
// variáveis de ambiente na Vercel; nada fica no repositório:
//   ANDROID_APP_PACKAGE=pt.approvamais.app
//   ANDROID_APP_SHA256_FINGERPRINTS=AA:BB:...  (vários separados por vírgula)
// Enquanto não estiverem definidas, a rota responde 404, como até aqui.
export const dynamic="force-dynamic";

const PACKAGE_PATTERN=/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
const FINGERPRINT_PATTERN=/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/;

export function assetLinksFor(env=process.env){
  const packageName=String(env.ANDROID_APP_PACKAGE||"").trim();
  const fingerprints=String(env.ANDROID_APP_SHA256_FINGERPRINTS||"")
    .split(",").map(value=>value.trim().toUpperCase()).filter(Boolean);
  if(!PACKAGE_PATTERN.test(packageName))return null;
  if(!fingerprints.length||!fingerprints.every(value=>FINGERPRINT_PATTERN.test(value)))return null;
  return [{
    relation:["delegate_permission/common.handle_all_urls"],
    target:{namespace:"android_app",package_name:packageName,sha256_cert_fingerprints:[...new Set(fingerprints)]}
  }];
}

export function GET(){
  const links=assetLinksFor();
  if(!links)return new Response("Not found",{status:404,headers:{"Cache-Control":"no-store","Content-Type":"text/plain; charset=utf-8"}});
  return new Response(JSON.stringify(links),{status:200,headers:{"Content-Type":"application/json","Cache-Control":"public, max-age=3600"}});
}
