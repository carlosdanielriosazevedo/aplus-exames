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
      rows.push({
        file:path.relative(chunksRoot,full).replaceAll(path.sep,"/"),
        bytes:raw.length,
        gzipBytes:zlib.gzipSync(raw,{level:9}).length
      });
    }
  }
}

function chunkMetrics(files=[]){
  const seen=new Set();
  let bytes=0;
  let gzipBytes=0;
  const chunks=[];
  for(const file of files){
    const normalized=String(file).replace(/^\.next\//,"").replace(/^\//,"");
    if(!normalized.endsWith(".js")||seen.has(normalized))continue;
    seen.add(normalized);
    const full=path.join(nextRoot,normalized);
    if(!fs.existsSync(full))continue;
    const raw=fs.readFileSync(full);
    bytes+=raw.length;
    gzipBytes+=zlib.gzipSync(raw,{level:9}).length;
    chunks.push({file:normalized,bytes:raw.length});
  }
  return {bytes,gzipBytes,chunks};
}

walk(chunksRoot);
rows.sort((a,b)=>b.bytes-a.bytes);

const total=rows.reduce((n,r)=>n+r.bytes,0);
const totalGzip=rows.reduce((n,r)=>n+r.gzipBytes,0);
const appPage=rows.filter(r=>/^app\/page-[^/]+\.js$/.test(r.file));

const appManifestPath=path.join(nextRoot,"app-build-manifest.json");
const appManifest=fs.existsSync(appManifestPath)?JSON.parse(fs.readFileSync(appManifestPath,"utf8")):{pages:{}};
const routeKeys={
  "/":"/page",
  "/portugues-mini-exame":"/portugues-mini-exame/page"
};
const routeBundles=Object.fromEntries(Object.entries(routeKeys).map(([route,key])=>[
  route,
  chunkMetrics(appManifest.pages?.[key]||[])
]));

const budgets={
  "/":610*1024,
  "/portugues-mini-exame":125*1024
};

console.log("\n=== APProva+ PERFORMANCE BASELINE ===");
console.log(`JS chunks: ${rows.length}`);
console.log(`Total JS: ${total.toLocaleString("en-US")} B (${(total/1024).toFixed(1)} KiB)`);
console.log(`Total gzip: ${totalGzip.toLocaleString("en-US")} B (${(totalGzip/1024).toFixed(1)} KiB)`);
console.log("\nLargest chunks:");
for(const row of rows.slice(0,15)){
  console.log(`  ${row.bytes.toString().padStart(10)} B | gzip ${row.gzipBytes.toString().padStart(8)} B | ${row.file}`);
}
console.log("\nRoute page chunks:");
for(const row of appPage){
  console.log(`  ${row.bytes.toLocaleString("en-US")} B | gzip ${row.gzipBytes.toLocaleString("en-US")} B | ${row.file}`);
}
console.log("\nRoute client bundles:");
for(const [route,metrics] of Object.entries(routeBundles)){
  const budget=budgets[route];
  console.log(`  ${route.padEnd(24)} ${(metrics.bytes/1024).toFixed(1).padStart(7)} KiB | gzip ${(metrics.gzipBytes/1024).toFixed(1).padStart(6)} KiB | budget ${(budget/1024).toFixed(0)} KiB`);
}

const output={
  generatedAt:new Date().toISOString(),
  totalJsBytes:total,
  totalGzipBytes:totalGzip,
  chunkCount:rows.length,
  largestChunks:rows.slice(0,15),
  routePageChunks:appPage,
  routeBundles,
  budgets
};
fs.writeFileSync(path.join(process.cwd(),"performance-baseline.json"),JSON.stringify(output,null,2)+"\n");

if(process.argv.includes("--enforce")){
  const failures=[];
  for(const [route,budget] of Object.entries(budgets)){
    const metrics=routeBundles[route];
    if(!metrics?.chunks?.length)failures.push(`${route}: route bundle not found in app-build-manifest.json`);
    else if(metrics.bytes>budget)failures.push(`${route}: ${(metrics.bytes/1024).toFixed(1)} KiB > budget ${(budget/1024).toFixed(0)} KiB`);
  }
  if(failures.length){
    console.error("\n✗ PERFORMANCE BUDGET FAILED");
    failures.forEach(row=>console.error(`  - ${row}`));
    process.exit(1);
  }
  console.log("\n✓ performance budgets passed");
}
