import {build} from "esbuild";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join,resolve} from "node:path";
import {createRequire} from "node:module";

// Compile the installed SDK and the actual application together. Only Next's
// request context and SQL transport are replaced; Neon Auth is never mocked.
export async function realNeonAuthFixture(){
  const dir=mkdtempSync(join(tmpdir(),"approva-f6-sdk-")),file=join(dir,"fixture.cjs");
  const result=await build({stdin:{contents:`
    export * as auth from "./app/lib/server/auth.js";
    export * as identity from "./app/lib/server/identity.js";
    export * as route from "./app/api/auth/[...path]/route.js";
    export * as cloud from "./app/api/cloud/state/route.js";
    export * as rewards from "./app/api/cloud/rewards/route.js";
    export {createNeonAuth} from "@neondatabase/neon-js/auth/next/server";
    export {NEON_AUTH_SESSION_DATA_COOKIE_NAME as cacheName,NEON_AUTH_SESSION_COOKIE_NAME as tokenName} from "@neondatabase/neon-js/auth/server";
    export {SignJWT,decodeJwt} from "jose";
  `,resolveDir:process.cwd(),sourcefile:"f6-sdk-fixture.js"},bundle:true,write:false,platform:"node",format:"cjs",logLevel:"silent",
  plugins:[{name:"synthetic-context-and-sql",setup(builder){
    builder.onResolve({filter:/^next\/(headers|server)$/},args=>({path:args.path,namespace:"f6"}));
    builder.onResolve({filter:/db(?:\.js)?$/},args=>{
      const target=resolve(args.resolveDir,args.path);
      if(target===resolve("app/lib/server/db")||target===resolve("app/lib/server/db.js"))return {path:"sql",namespace:"f6"};
    });
    builder.onLoad({filter:/.*/,namespace:"f6"},args=>({loader:"js",contents:args.path==="next/headers"
      ?`export const headers=async()=>globalThis.__f6Fixture.headers;
         export const cookies=async()=>({set:(name,value,options)=>globalThis.__f6Fixture.cookieWrites.push({name,value,options})});`
      :args.path==="sql"?`export const databaseConfigured=()=>true;
         export const getSql=()=>async(strings,...values)=>{const f=globalThis.__f6Fixture,sql=strings.join("?");f.sqlCalls.push({sql,values});return f.sqlReply?f.sqlReply(sql,values):[];};`
      :`export const NextRequest=Request; export const NextResponse={json:(...args)=>Response.json(...args)};`}));
  }}]});
  writeFileSync(file,result.outputFiles[0].contents);
  const require=createRequire(import.meta.url);
  return {load(){delete require.cache[file];return require(file);},close(){delete require.cache[file];rmSync(dir,{recursive:true,force:true});}};
}
