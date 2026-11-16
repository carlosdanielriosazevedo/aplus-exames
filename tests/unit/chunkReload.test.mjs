import {describe,expect,it} from "vitest";
import {isChunkLoadError,reloadOnceForChunkError} from "../../app/lib/chunkReload.js";

const memory=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v))}};

describe("recuperação depois de um deploy (ChunkLoadError)",()=>{
  it("reconhece os erros de carregamento de partes da app",()=>{
    expect(isChunkLoadError({name:"ChunkLoadError",message:"x"})).toBe(true);
    expect(isChunkLoadError(new Error("Loading chunk 2947 failed."))).toBe(true);
    expect(isChunkLoadError(new TypeError("Failed to fetch dynamically imported module: /x.js"))).toBe(true);
    expect(isChunkLoadError(new Error("Cannot read properties of undefined"))).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
  });
  it("recarrega uma vez e nunca entra em ciclo",()=>{
    const storage=memory();let reloads=0;const reload=()=>{reloads++};
    const err={name:"ChunkLoadError"};
    expect(reloadOnceForChunkError(err,{storage,reload,now:1_000_000})).toBe(true);
    expect(reloadOnceForChunkError(err,{storage,reload,now:1_030_000})).toBe(false);
    expect(reloads).toBe(1);
    expect(reloadOnceForChunkError(err,{storage,reload,now:1_100_000})).toBe(true);
    expect(reloads).toBe(2);
  });
  it("outros erros mostram o ecrã de erro normal, sem recarregar",()=>{
    let reloads=0;
    expect(reloadOnceForChunkError(new Error("boom"),{storage:memory(),reload:()=>{reloads++}})).toBe(false);
    expect(reloads).toBe(0);
  });
});
