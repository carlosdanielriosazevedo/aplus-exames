// 🔒 ÍCONE ANDROID BLOQUEADO — aprovado pelo product owner (Carlos) em 2026-10-31,
// depois de verificado no telemóvel real ("ficou top").
// NÃO ALTERAR estes ficheiros, hashes nem as entradas do manifest sem ordem
// explícita do product owner. Isto vale para qualquer pessoa ou agente
// (Claude, ChatGPT/Codex, outros). Ver secção "Ícone Android bloqueado" no AGENTS.md.
import {test,expect} from "vitest";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";

const root=new URL("../../",import.meta.url);
const sha=path=>createHash("sha256").update(readFileSync(new URL(path,root))).digest("hex");

const LOCKED={
  "assets/brand/icon_1024_fullbleed-20261031.png":"695d5f7def99da1d379c5cb8f67540f2124b6b04185e7a8680c03fc7a91c3916",
  "assets/brand/icon_1024_transparente-20261030.png":"4633bc702311f8c3b9fc21ab02aad686ffff05537487407b8205681a5ee8fb97",
  "public/icons/icon-192.png":"0def2b1481f8f79d134b6d95c7812ee12c5c14d7ad17be607435335dff81b8a8",
  "public/icons/icon-512.png":"3c873a2363f9ec09b09ac2eb798cde54aa5965dc51b8bc8efc7bce5572be5c51",
  "public/icons/maskable-192.png":"843d6d7114798e837f9578e43252ef95931be3d31afaa118e89c9ed1e61f9134",
  "public/icons/maskable-512.png":"4a0f485b1c4c2552111ae8dd813a096769baa4a64bac2f8f29ce6ea909a1cb01"
};

test("🔒 ícone Android aprovado: bytes bloqueados",()=>{
  for(const [path,hash] of Object.entries(LOCKED))expect(sha(path),`${path} foi alterado — ícone bloqueado pelo product owner`).toBe(hash);
});

test("🔒 ícone Android aprovado: entradas do manifest bloqueadas",async()=>{
  const {default:manifest}=await import("../../app/manifest.js");
  const icons=manifest().icons;
  for(const [file,size,purpose] of [["icon-192.png",192,"any"],["icon-512.png",512,"any"],["maskable-192.png",192,"maskable"],["maskable-512.png",512,"maskable"]]){
    const entry=icons.find(item=>item.src.startsWith(`/icons/${file}?`));
    expect(entry,`${file} tem de continuar no manifest`).toBeTruthy();
    expect(entry.sizes).toBe(`${size}x${size}`);
    expect(entry.purpose).toBe(purpose);
  }
  // O launcher Android escolhe o maskable mais pequeno >= ~83dp (228–332 px):
  // tem de continuar a ser o maskable-512. Nenhum outro maskable entre 193 e 1023 px.
  const maskableSizes=icons.filter(item=>item.purpose.split(" ").includes("maskable")).map(item=>parseInt(item.sizes,10));
  expect(maskableSizes.filter(size=>size>192&&size<1024)).toEqual([512]);
  // O ícone de splash (1024) é só maskable, nunca "any".
  expect(icons.filter(item=>item.sizes==="1024x1024").every(item=>item.purpose==="maskable")).toBe(true);
});
