import {build} from "esbuild";
import {readFileSync,existsSync} from "node:fs";
import {execFileSync} from "node:child_process";
import path from "node:path";

export const MAIN_REFERENCE="118021d48ae354ec28b029c132d943d5a20b1c4f";
export const PR453_REFERENCE="cfdc051a1f4300cecaac46e146a9646c4c781aeb";
export const gitFile=(sha,file)=>execFileSync("git",["show",`${sha}:${file}`],{encoding:"utf8"});

// Resolve unmodified repository modules and explicit test doubles. No product
// source is rewritten, and no fixture can connect to an external service.
export async function bundleFixture(entry,{overrides={},platform="node"}={}){
  const result=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:"f5-fixture.js"},
    bundle:true,write:false,format:"esm",platform,logLevel:"silent",
    define:{"process.env.NEXT_PUBLIC_NEON_AUTH_URL":'"https://auth.example.invalid"',
      "process.env.NEXT_PUBLIC_NEON_DATA_API_URL":'"https://data.example.invalid"'},
    plugins:[{name:"isolated-f5-fixture",setup(builder){
      builder.onResolve({filter:/.*/},args=>{
        let file=args.path;
        if(file.startsWith("fixture:"))file=file.slice(8);
        else if(args.namespace==="f5"&&file.startsWith("."))file=path.posix.normalize(path.posix.join(path.posix.dirname(args.importer),file));
        if(!(file in overrides)&&file+".js" in overrides)file+=".js";
        if(file in overrides)return {path:file,namespace:"f5"};
        if(file.startsWith("app/")){
          if(!existsSync(file)&&existsSync(file+".js"))file+=".js";
          return {path:file,namespace:"f5"};
        }
        throw Error("Unexpected fixture dependency: "+file);
      });
      builder.onLoad({filter:/.*/,namespace:"f5"},args=>({contents:overrides[args.path]??readFileSync(args.path,"utf8"),loader:"js"}));
    }}]});
  return result.outputFiles[0].text;
}
export async function importFixture(entry,options){
  const source=await bundleFixture(entry,options);
  return import("data:text/javascript;base64,"+Buffer.from(source).toString("base64"));
}

export const clientDoubles={
  "@neondatabase/neon-js":"export const createClient=(...args)=>globalThis.__f5Fixture.createClient(...args);",
  "@neondatabase/neon-js/auth":"export const createInternalNeonAuth=()=>({adapter:globalThis.__f5Fixture.adapter});",
  "@neondatabase/neon-js/auth/react/adapters":"export const BetterAuthReactAdapter=()=>({});"
};
