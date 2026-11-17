// APProva+ — service worker mínimo (Android/TWA).
// Só faz uma coisa: se uma navegação falhar por falta de rede, mostra uma página
// offline em português. Não guarda em cache páginas, dados da API nem progresso.
const CACHE="approva-offline-v1";
const OFFLINE_URL="/offline.html";

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.add(new Request(OFFLINE_URL,{cache:"reload"}))));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    for(const key of await caches.keys()){if(key!==CACHE)await caches.delete(key)}
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  if(event.request.mode!=="navigate")return;
  event.respondWith(fetch(event.request).catch(async()=>{
    const cache=await caches.open(CACHE);
    return (await cache.match(OFFLINE_URL))||Response.error();
  }));
});
