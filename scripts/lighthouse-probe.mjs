import fs from 'node:fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

const url = process.env.PROBE_URL || 'https://aplus-exames.vercel.app/';
const runs = Number(process.env.PROBE_RUNS || 7);
const scenario = process.env.PROBE_SCENARIO || 'cold';
const outDir = process.env.PROBE_OUT || 'lighthouse-probe';
fs.mkdirSync(outDir,{recursive:true});

const median = values => {
  const xs=[...values].sort((a,b)=>a-b);
  return xs[Math.floor(xs.length/2)];
};

function findNode(audit){
  if(!audit) return null;
  const seen=new Set();
  const walk=v=>{
    if(!v || typeof v!=='object' || seen.has(v)) return null;
    seen.add(v);
    if(v.type==='node' && (v.snippet || v.nodeLabel || v.selector)) return {
      snippet:v.snippet||null,
      selector:v.selector||null,
      nodeLabel:v.nodeLabel||null,
      path:v.path||null,
    };
    for(const value of Object.values(v)){
      const got=walk(value); if(got) return got;
    }
    return null;
  };
  return walk(audit.details);
}

function summarize(lhr){
  const lcp=lhr.audits['largest-contentful-paint']?.numericValue ?? null;
  const tbt=lhr.audits['total-blocking-time']?.numericValue ?? null;
  const tti=lhr.audits['interactive']?.numericValue ?? null;
  const lcpNode=findNode(lhr.audits['largest-contentful-paint-element'])
    || findNode(lhr.audits['lcp-discovery-insight'])
    || findNode(lhr.audits['lcp-breakdown-insight']);
  const reqs=lhr.audits['network-requests']?.details?.items || [];
  const navStart=Math.min(...reqs.map(r=>r.networkRequestTime??r.startTime??Infinity));
  const normalized=reqs.map(r=>{
    const start=((r.networkRequestTime??r.startTime??navStart)-navStart)*1000;
    const end=((r.networkEndTime??r.endTime??r.networkRequestTime??navStart)-navStart)*1000;
    return {
      url:r.url,
      resourceType:r.resourceType,
      statusCode:r.statusCode,
      transferSize:r.transferSize||0,
      startMs:Math.round(start),
      endMs:Math.round(end),
    };
  }).sort((a,b)=>a.startMs-b.startMs);
  const bytesBeforeLcp=normalized.filter(r=>lcp==null || r.endMs<=lcp).reduce((s,r)=>s+r.transferSize,0);
  const totalBytes=normalized.reduce((s,r)=>s+r.transferSize,0);
  return {lcp,tbt,tti,lcpNode,bytesBeforeLcp,totalBytes,network:normalized};
}

async function runOne(i){
  const chrome=await chromeLauncher.launch({
    chromePath:process.env.CHROME_PATH || undefined,
    chromeFlags:['--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--window-size=412,915'],
  });
  let browser;
  try{
    browser=await puppeteer.connect({browserURL:`http://127.0.0.1:${chrome.port}`});
    const page=await browser.newPage();
    await page.setViewport({width:412,height:915,deviceScaleFactor:2,isMobile:true,hasTouch:true});
    await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
    if(scenario==='return'){
      await page.evaluate(()=>localStorage.setItem('a25','{}'));
      await page.reload({waitUntil:'domcontentloaded',timeout:60000});
    }else{
      await page.evaluate(()=>{localStorage.removeItem('a25');localStorage.removeItem('a25-friends-beta');});
    }
    await page.close();

    const result=await lighthouse(url,{
      port:chrome.port,
      logLevel:'error',
      output:'json',
      onlyCategories:['performance'],
      disableStorageReset:scenario==='return',
      throttlingMethod:'simulate',
      throttling:{rttMs:150,throughputKbps:1600,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0,cpuSlowdownMultiplier:4},
      formFactor:'mobile',
      screenEmulation:{mobile:true,width:412,height:915,deviceScaleFactor:2,disabled:false},
    });
    const summary=summarize(result.lhr);
    fs.writeFileSync(`${outDir}/${scenario}-${i}.json`,JSON.stringify(result.lhr,null,2));
    return summary;
  } finally {
    if(browser) await browser.disconnect();
    await chrome.kill();
  }
}

const results=[];
for(let i=1;i<=runs;i++){
  const r=await runOne(i);
  results.push(r);
  console.log(`${scenario} run ${i}: LCP=${Math.round(r.lcp)}ms TBT=${Math.round(r.tbt)}ms TTI=${Math.round(r.tti)}ms bytes<=LCP=${r.bytesBeforeLcp} total=${r.totalBytes}`);
}
const med={
  lcp:median(results.map(r=>r.lcp)),
  tbt:median(results.map(r=>r.tbt)),
  tti:median(results.map(r=>r.tti)),
  bytesBeforeLcp:median(results.map(r=>r.bytesBeforeLcp)),
  totalBytes:median(results.map(r=>r.totalBytes)),
};
const representative=results.reduce((best,r)=>Math.abs(r.lcp-med.lcp)<Math.abs(best.lcp-med.lcp)?r:best,results[0]);
console.log('\nSUMMARY '+JSON.stringify({url,scenario,runs,median:med,lcpNode:representative.lcpNode},null,2));
console.log('\nWATERFALL (representative median-LCP run)');
for(const r of representative.network){
  console.log(`${String(r.startMs).padStart(5)}-${String(r.endMs).padStart(5)}ms ${String(r.transferSize).padStart(8)}B ${String(r.resourceType||'').padEnd(12)} ${r.url}`);
}
fs.writeFileSync(`${outDir}/${scenario}-summary.json`,JSON.stringify({url,scenario,runs,median:med,lcpNode:representative.lcpNode,waterfall:representative.network},null,2));
