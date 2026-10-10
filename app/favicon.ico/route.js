const ICON=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#111827"/><text x="8" y="43" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#fff">A</text><text x="38" y="35" font-family="Arial,sans-serif" font-size="24" font-weight="700" fill="#f59e0b">+</text></svg>`;

export const dynamic="force-static";

export function GET(){
  return new Response(ICON,{headers:{"Content-Type":"image/svg+xml; charset=utf-8","Cache-Control":"public, max-age=86400, immutable"}});
}
