// Depois de um deploy, um separador aberto com a versão anterior pode pedir uma
// parte da app que já não existe (ChunkLoadError). "Tentar novamente" falha
// sempre nesse caso; só um recarregamento completo resolve. Recarregamos uma
// única vez por janela de tempo, para nunca entrar em ciclo.
const STAMP_KEY="approva-chunk-reload-at";
const WINDOW_MS=60_000;

export function isChunkLoadError(error){
  const name=String(error?.name||"");
  const message=String(error?.message||"");
  return name==="ChunkLoadError"
    ||/Loading (CSS )?chunk [\w-]+ failed/i.test(message)
    ||/Failed to fetch dynamically imported module/i.test(message)
    ||/error loading dynamically imported module/i.test(message)
    ||/Importing a module script failed/i.test(message);
}

export function reloadOnceForChunkError(error,{storage=globalThis.sessionStorage,reload=()=>globalThis.location?.reload(),now=Date.now()}={}){
  if(!isChunkLoadError(error))return false;
  try{
    const last=Number(storage?.getItem(STAMP_KEY))||0;
    if(now-last<WINDOW_MS)return false;
    storage?.setItem(STAMP_KEY,String(now));
  }catch{return false}
  reload();
  return true;
}
