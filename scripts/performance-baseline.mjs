import "./fqa-beta-diagnosis.mjs";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const nextRoot=path.join(process.cwd(),".next");
const chunksRoot=path.join(nextRoot,"static","chunks");
const rows=[];

function walk(dir){
  if(!fs.existsSync(dir))return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory())walk(full);
    else if(entry.isFile()&&entry.name.endsWith(".js")){
      const raw=fs.readFileSync(full);
      rows.push({file:path.relative(chunksRoot,full).replaceAll(path.sep,"/"),bytes:raw.length,gzipBytes:zlib.gzipSync(raw,{level:9}).length});
    }
  }
}

function chunkMetrics(files=[]){
  const seen=new Set();let bytes=0,gzipBytes=0;const chunks=[];
  for(const file of files){
    const normalized=String(file).replace(/^\.next\//,"").replace(/^\//,"");
    if(!normalized.endsWith(".js")||seen.has(normalized))continue;
    seen.add(normalized);const full=path.join(nextRoot,normalized);if(!fs.existsSync(full))continue;
    const raw=fs.readFileSync(full);bytes+=raw.length;gzipBytes+=zlib.gzipSync(raw,{level:9}).length;chunks.push({file:normalized,bytes:raw.length});
  }
  return {bytes,gzipBytes,chunks};
}

function routeText(metrics){
  return (metrics?.chunks||[]).map(chunk=>{
    const full=path.join(nextRoot,chunk.file);
    return fs.existsSync(full)?fs.readFileSync(full,"utf8"):"";
  }).join("\n");
}

walk(chunksRoot);rows.sort((a,b)=>b.bytes-a.bytes);
const total=rows.reduce((n,r)=>n+r.bytes,0),totalGzip=rows.reduce((n,r)=>n+r.gzipBytes,0),appPage=rows.filter(r=>/^app\/page-[^/]+\.js$/.test(r.file));
const appManifestPath=path.join(nextRoot,"app-build-manifest.json");
const appManifest=fs.existsSync(appManifestPath)?JSON.parse(fs.readFileSync(appManifestPath,"utf8")):{pages:{}};
const routeKeys={"/":"/page","/portugues-mini-exame":"/portugues-mini-exame/page"};
const routeBundles=Object.fromEntries(Object.entries(routeKeys).map(([route,key])=>[route,chunkMetrics(appManifest.pages?.[key]||[])]));
const routePageChunks={"/":rows.filter(row=>/^app\/page-[^/]+\.js$/.test(row.file)),"/portugues-mini-exame":rows.filter(row=>/^app\/portugues-mini-exame\/page-[^/]+\.js$/.test(row.file))};
const routePageMetrics=Object.fromEntries(Object.entries(routePageChunks).map(([route,chunks])=>[route,{bytes:chunks.reduce((sum,row)=>sum+row.bytes,0),gzipBytes:chunks.reduce((sum,row)=>sum+row.gzipBytes,0),chunks}]));

// Full-route budgets, including shared chunks. Keep Home below 600 KiB so the
// initial shell has real headroom before any new visible feature is allowed in.
const budgets={"/":600*1024,"/portugues-mini-exame":500*1024};

const homeText=routeText(routeBundles["/"]);
const homeSignatures={
  physicsChemistryHeavy:["FQA-R-ELEM-01","PhysicsChemistrySubject","physicsChemistryConstructedItemById"],
  constructedResponseGrader:["final_result_only","wrong_final_rounding","Identificado na tua resolução"],
  constructedResponseBank:["CRV2-10FUN-STEPS-1","CRV2-12FCD-CHAIN-STEPS-1"],
  portugueseHeavy:["PT639-FND-311","PortuguesePassageMiniExamRoute"]
};
const signaturePresence=Object.fromEntries(Object.entries(homeSignatures).map(([group,signatures])=>[group,{
  matches:signatures.filter(signature=>homeText.includes(signature)),
  present:signatures.some(signature=>homeText.includes(signature))
}]));

console.log("\n=== APProva+ PERFORMANCE BASELINE ===");
console.log(`JS chunks: ${rows.length}`);console.log(`Total JS: ${total.toLocaleString("en-US")} B (${(total/1024).toFixed(1)} KiB)`);console.log(`Total gzip: ${totalGzip.toLocaleString("en-US")} B (${(totalGzip/1024).toFixed(1)} KiB)`);
console.log("\nLargest chunks:");for(const row of rows.slice(0,15))console.log(`  ${row.bytes.toString().padStart(10)} B | gzip ${row.gzipBytes.toString().padStart(8)} B | ${row.file}`);
console.log("\nRoute page chunks (diagnostic only):");for(const [route,metrics] of Object.entries(routePageMetrics))console.log(`  ${route.padEnd(24)} ${(metrics.bytes/1024).toFixed(1).padStart(7)} KiB | gzip ${(metrics.gzipBytes/1024).toFixed(1).padStart(6)} KiB`);
console.log("\nRoute client bundles (budgeted, includes shared chunks):");
for(const [route,metrics] of Object.entries(routeBundles)){
  const budget=budgets[route];
  console.log(`  ${route.padEnd(24)} ${(metrics.bytes/1024).toFixed(1).padStart(7)} KiB | gzip ${(metrics.gzipBytes/1024).toFixed(1).padStart(6)} KiB | budget ${(budget/1024).toFixed(0)} KiB`);
  for(const chunk of metrics.chunks)console.log(`    ${(chunk.bytes/1024).toFixed(1).padStart(7)} KiB  ${chunk.file}`);
}
console.log("\nHome bundle signatures (diagnostic):");
for(const [group,result] of Object.entries(signaturePresence))console.log(`  ${group.padEnd(28)} ${result.present?"PRESENT":"absent"}${result.matches.length?` · ${result.matches.join(", ")}`:""}`);

const output={generatedAt:new Date().toISOString(),totalJsBytes:total,totalGzipBytes:totalGzip,chunkCount:rows.length,largestChunks:rows.slice(0,15),routePageChunks:appPage,routePageMetrics,routeBundles,budgets,homeBundleSignatures:signaturePresence};
fs.writeFileSync(path.join(process.cwd(),"performance-baseline.json"),JSON.stringify(output,null,2)+"\n");
if(process.argv.includes("--enforce")){
  const failures=[];
  for(const [route,budget] of Object.entries(budgets)){
    const metrics=routeBundles[route];
    if(!metrics?.chunks?.length)failures.push(`${route}: client bundle not found in .next/app-build-manifest.json`);
    else if(metrics.bytes>budget)failures.push(`${route}: ${(metrics.bytes/1024).toFixed(1)} KiB > budget ${(budget/1024).toFixed(0)} KiB`);
  }
  if(failures.length){console.error("\n✗ PERFORMANCE BUDGET FAILED");failures.forEach(row=>console.error(`  - ${row}`));process.exit(1);}
  console.log("\n✓ performance budgets passed");
}