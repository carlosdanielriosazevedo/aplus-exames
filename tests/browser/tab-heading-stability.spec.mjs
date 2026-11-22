// Pedido do product owner (2026-11-21): mudar entre Aprender, Treinar, Ranking e
// Progresso não pode dar a mínima sensação de movimento. O cabeçalho, a etiqueta,
// o início do título e o Apronso têm de ficar exatamente no mesmo sítio, sem animação,
// com o título na mesma letra (tamanho, peso, espaçamento, cor), um Apronso
// diferente em cada separador e nenhum frame vazio ou fora do sítio logo após o toque.
import {test,expect} from "@playwright/test";
import {emptyScores} from "../../app/lib/engine.js";

const TABS=["Aprender","Treinar","Ranking","Progresso"];
const VIEWS=[[360,780],[390,844],[430,932],[1366,768]];

function state(subjectId){
  const now=Date.now();
  return {goal:17,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),selectedSubjectIds:[subjectId],activeSubjectId:subjectId,firstUseTourCompleted:true,onboardingSharedProfileDone:true,
    subjectSettings:{[subjectId]:{profileConfigured:true,examTiming:"thisYear",goal:17}},
    subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null}},
    subjectProgressModelVersion:4,pedagogicalIdVersion:1,betaMode:"internal",xp:40,
    profile:{schoolYear:"11.º",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:now};
}

// Posições (arredondadas a 0,5 px) de tudo o que fica no topo do separador.
function probe(){
  const R=b=>b?[b.x,b.y].map(v=>Math.round(v*2)/2).join(","):"-";
  const S=b=>b?[b.width,b.height].map(v=>Math.round(v*2)/2).join("x"):"-";
  const vis=el=>el&&el.offsetParent!==null;
  const h1=[...document.querySelectorAll("h1")].find(vis);
  const eyebrow=h1?[...h1.parentElement.children].find(c=>c!==h1&&c.tagName==="P"):null;
  let apronso="-",animated=false;
  const img=[...document.querySelectorAll("img.apronso")].find(i=>vis(i)&&getComputedStyle(i).display!=="none"&&i.getBoundingClientRect().top<420);
  if(img){const b=img.getBoundingClientRect();apronso=R(b)+" "+S(b);animated=getComputedStyle(img).animationName!=="none"}
  else for(const el of document.querySelectorAll("*")){
    const a=getComputedStyle(el,"::after");
    if(a.content==="none"||a.display==="none"||!a.backgroundImage.includes("/mascot/apronso"))continue;
    const e=el.getBoundingClientRect(),w=parseFloat(a.width),hh=parseFloat(a.height),r=parseFloat(a.right)||0,t=parseFloat(a.top),bt=parseFloat(a.bottom);
    const box={x:e.right-r-w,y:Number.isFinite(t)?e.top+t:e.bottom-bt-hh,width:w,height:hh};
    apronso=R(box)+" "+S(box);animated=a.animationName!=="none";break;
  }
  const q=s=>document.querySelector(s)?.getBoundingClientRect();
  const c=h1?getComputedStyle(h1):null;
  const font=c?[c.fontFamily,c.fontSize,c.fontWeight,c.letterSpacing,c.color].join(" "):"-";
  const pose=(img?img.src:[...document.querySelectorAll("*")].map(el=>getComputedStyle(el,"::after").backgroundImage).find(b=>b.includes("/mascot/apronso"))||"").match(/apronso-([a-z]+)/)?.[1]||"-";
  return {logo:R(q(".studentTop .logo")),subject:R(q(".studentTop .subjectSwitcher")),actions:R(q(".studentTopActions")),
    eyebrow:R(eyebrow?.getBoundingClientRect()),title:R(h1?.getBoundingClientRect()),apronso,animated,font,pose};
}

// Grava, frame a frame, o topo do separador logo depois do toque.
function recordFrames(){
  window.__tabFrames=[];
  const vis=el=>el&&el.offsetParent!==null;
  const snap=()=>{
    const h1=[...document.querySelectorAll("h1")].find(vis);
    const eyebrow=h1?[...h1.parentElement.children].find(c=>c!==h1&&c.tagName==="P"):null;
    const top=el=>el?Math.round(el.getBoundingClientRect().top*2)/2:null;
    window.__tabFrames.push({title:h1?.textContent||null,titleTop:top(h1),eyebrowTop:top(eyebrow),scrollY:Math.round(window.scrollY)});
  };
  let n=0;const loop=()=>{snap();if(++n<20)requestAnimationFrame(loop)};
  document.addEventListener("click",()=>requestAnimationFrame(loop),{once:true,capture:true});
}

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
  for(const [width,height] of VIEWS){
    test(`${subjectId} · ${width}px · topo idêntico nos quatro separadores`,async({browser})=>{
      const context=await browser.newContext({viewport:{width,height},isMobile:width<700,hasTouch:width<700});
      const page=await context.newPage();
      await page.addInitScript(s=>localStorage.setItem("a25",JSON.stringify(s)),state(subjectId));
      await page.goto("/");
      await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
      const rows={};
      const frames={};
      for(const tab of TABS){
        await page.evaluate(recordFrames);
        await page.locator(".studentNav button",{hasText:tab}).click();
        await expect(page.locator(".studentNav button",{hasText:tab})).toHaveAttribute("aria-current","page");
        await page.waitForTimeout(400);
        rows[tab]=await page.evaluate(probe);
        frames[tab]=await page.evaluate(()=>window.__tabFrames);
      }
      for(const tab of TABS){
        expect(rows[tab].animated,`${tab}: o Apronso do topo não pode estar animado`).toBe(false);
        expect(rows[tab].apronso,`${tab}: tem de haver Apronso no topo`).not.toBe("-");
        for(const key of ["logo","subject","actions","eyebrow","title","apronso","font"]){
          expect(rows[tab][key],`${tab} vs Aprender: ${key}`).toBe(rows.Aprender[key]);
        }
        // Do primeiro frame depois do toque ao último: o novo topo já lá está
        // (nunca um ecrã vazio) e nada se desloca.
        const last=frames[tab].at(-1);
        expect(frames[tab].length,`${tab}: frames gravados`).toBeGreaterThan(5);
        for(const frame of frames[tab])expect(frame,`${tab}: frame logo após o toque`).toEqual(last);
      }
      expect(new Set(TABS.map(tab=>rows[tab].pose)).size,`um Apronso diferente em cada separador: ${TABS.map(tab=>rows[tab].pose).join(", ")}`).toBe(4);
      await context.close();
    });
  }
}
