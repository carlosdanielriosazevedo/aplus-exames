// Série 01 de conteúdo para Instagram/TikTok: 9 posts sem rosto, com o Apronso e o
// visual da própria app. Gera PNG (1080×1350) e um vídeo vertical (1080×1920).
// Uso: node marketing/serie-01.mjs   (precisa de playwright e ffmpeg)
// Regras: conteúdo original (nada do IAVE), sem estatísticas inventadas, sem imagens de terceiros.
import {chromium} from "@playwright/test";
import {mkdirSync,writeFileSync,rmSync,readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const out=path.join(root,"marketing/out/serie-01");
const mascot=pose=>`data:image/webp;base64,${readFileSync(path.join(root,`marketing/apronso/${pose}.webp`)).toString("base64")}`;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");

const css=`
*{box-sizing:border-box;margin:0}
body{width:1080px;height:var(--h);font-family:Inter,system-ui,sans-serif;background:radial-gradient(120% 80% at 50% 0%,#173d5b 0%,#0a2033 55%,#081a2a 100%);color:#fff;position:relative;overflow:hidden}
.hook{position:absolute;left:72px;right:72px;top:var(--hookTop);font-weight:900;font-size:74px;line-height:1.08;letter-spacing:-1.5px}
.hook em{font-style:normal;color:#ffb224}
.sub{margin-top:22px;font-weight:700;font-size:38px;line-height:1.3;color:#c9d6e2;letter-spacing:0}
.card{position:absolute;left:72px;right:72px;top:var(--cardTop);background:#fff9f1;color:#13263a;border-radius:44px;padding:44px 46px 48px;box-shadow:0 30px 80px rgba(0,0,0,.35)}
.label{font-size:24px;font-weight:800;letter-spacing:2px;color:#a85d00;text-transform:uppercase}
.bar{height:16px;border-radius:99px;background:#eadfce;margin:22px 0 30px;overflow:hidden}.bar i{display:block;height:100%;width:var(--p,40%);background:#f59e0b;border-radius:99px}
.prompt{font-size:40px;font-weight:800;line-height:1.22}
.sentence{margin-top:26px;background:#fff;border:3px solid #efd7a6;border-radius:26px;padding:26px 30px;font-size:36px;font-weight:600;line-height:1.35}
.tiles{display:flex;flex-wrap:wrap;gap:16px;margin-top:30px}
.tile{background:#fff;border:3px solid #d9cdb8;border-bottom-width:7px;border-radius:20px;padding:16px 26px;font-size:34px;font-weight:700}
.tile.on{background:#fff1d6;border-color:#f59e0b}
.opts{display:grid;gap:16px;margin-top:30px}
.opt{display:flex;gap:20px;align-items:center;background:#fff;border:3px solid #d9cdb8;border-bottom-width:7px;border-radius:22px;padding:18px 24px;font-size:34px;font-weight:700}
.opt b{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:14px;background:#f5f7f8;color:#687489;font-size:28px}
.opt.ok{background:#edf8f2;border-color:#27835d}.opt.ok b{background:#27835d;color:#fff}
.opt.bad{background:#fff1f1;border-color:#b34f4f}.opt.bad b{background:#b34f4f;color:#fff}
.fb{margin-top:30px;border-radius:24px;padding:24px 28px;font-size:31px;line-height:1.3;font-weight:600}
.fb strong{display:block;font-size:34px;font-weight:900;margin-bottom:6px}
.fb.ok{background:#edf8f2;color:#1d6b4b}.fb.bad{background:#fff1f1;color:#8f3a3a}.fb.warn{background:#fff6e5;color:#8a5a0a}
.mascot{position:absolute;right:var(--mr,30px);bottom:var(--mb,96px);height:var(--mh,600px);width:auto;filter:drop-shadow(0 18px 30px rgba(0,0,0,.35))}
.foot{position:absolute;left:72px;bottom:44px;display:flex;gap:22px;align-items:baseline;font-size:28px;color:#9fb3c6;font-weight:600}
.mascot.corner{top:auto;right:-10px;bottom:30px;width:auto;height:var(--mh,560px);z-index:2}
body.corner .hook{right:60px;font-size:68px}
body.corner .card{right:300px}
body.corner .card .prompt{font-size:38px}
body.reel .card{zoom:1.12;left:44px;right:300px}
body.reel.corner .hook{font-size:76px;right:60px}
body.reel .mascot.corner{height:560px;bottom:330px;right:-30px}
body.reel .foot{bottom:300px}
.word{font-weight:900;font-size:42px;color:#fff;letter-spacing:-.5px}.word span{color:#ffb224}
.steps{position:absolute;left:72px;right:72px;top:var(--cardTop);display:grid;gap:26px}
.step{display:flex;gap:28px;align-items:center;background:#0f3047;border:2px solid #1f4a6b;border-radius:30px;padding:30px 34px}
.step b{flex:none;display:grid;place-items:center;width:84px;height:84px;border-radius:24px;background:#f59e0b;color:#081a2a;font-size:44px;font-weight:900}
.step div{font-size:34px;font-weight:700;line-height:1.25}.step small{display:block;font-size:27px;font-weight:500;color:#9fb3c6;margin-top:6px}
.small{position:absolute;left:72px;right:470px;bottom:150px;font-size:28px;line-height:1.35;color:#9fb3c6;font-weight:600}
`;
const foot=`<div class="foot"><div class="word">APP<span>rova+</span></div><div>approvamais.pt</div></div>`;
function page({h=1350,hook="",sub="",hookTop=90,cardTop=330,card="",extra="",pose="bracos-cruzados",mh=600,mr=30,mb=96,showMascot=true,corner=Boolean(card),mw}){
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body class="${corner?"corner":""} ${h>1350?"reel":""}" style="--h:${h}px;--hookTop:${hookTop}px;--cardTop:${cardTop}px;--mh:${mh}px;--mr:${mr}px;--mb:${mb}px">
  ${hook?`<div class="hook">${hook}${sub?`<div class="sub">${sub}</div>`:""}</div>`:""}
  ${card}${extra}${showMascot?`<img class="mascot${corner?" corner":""}" src="${mascot(pose)}">`:""}${foot}</body></html>`;
}
const card=({label,progress="45%",prompt,sentence,tiles,opts,fb})=>`<div class="card" style="--p:${progress}">
  <div class="label">${label}</div><div class="bar"><i></i></div>
  <div class="prompt">${prompt}</div>${sentence?`<div class="sentence">${sentence}</div>`:""}
  ${tiles?`<div class="tiles">${tiles.map(t=>`<span class="tile${t.on?" on":""}">${esc(t.t)}</span>`).join("")}</div>`:""}
  ${opts?`<div class="opts">${opts.map((o,i)=>`<div class="opt ${o.s||""}"><b>${"ABCD"[i]}</b>${o.t}</div>`).join("")}</div>`:""}
  ${fb?`<div class="fb ${fb.k}"><strong>${fb.title}</strong>${fb.text}</div>`:""}</div>`;

// ---------- Série 01 ----------
const gram={label:"Português · Gramática",prompt:"Indica a função sintática de «o meu fim de semana».",sentence:"O teste de Física comeu <u>o meu fim de semana</u>."};
const fqOpts=["4 J","16 J","32 J","8 J"];
const posts=[
  {file:"01-apresentacao",html:page({hook:"Já sobrevivi<br>ao exame nacional.",sub:"Agora ajudo-te a sobreviver ao teu.<br><span style=\"color:#ffb224\">Matemática A · Português · Física e Química A</span>",pose:"encostado",mh:820,mr:120,mb:110})},
  {file:"02-gramatica-fim-de-semana",html:page({hook:"Pelo menos a <em>gramática</em> está certa.",card:card({...gram,tiles:[{t:"complemento direto",on:true}],fb:{k:"ok",title:"Correto!",text:"Na passiva: «O meu fim de semana foi comido pelo teste.» Passa a sujeito: é complemento direto."}}),cardTop:290,pose:"a-dormir",mh:430})},
  {file:"03-desafio-20s-1",html:page({hook:"Consegues em <em>20 segundos?</em>",sub:"Responde nos comentários. Solução no slide seguinte →",card:card({label:"Física e Química A · 10.º ano",prompt:"Um corpo de 4,0 kg move-se a 2,0 m s⁻¹. A energia cinética é:",opts:fqOpts.map(t=>({t}))}),cardTop:390,pose:"bracos-cruzados",mh:560})},
  {file:"03-desafio-20s-2",html:page({hook:"<em>D.</em> 8 J",sub:"E<sub>c</sub> = ½ m v² = ½ × 4,0 × 2,0² = 8,0 J<br>Armadilha: esquecer o quadrado (4 J) ou o ½ (16 J).",card:card({label:"Física e Química A · 10.º ano",progress:"100%",prompt:"Um corpo de 4,0 kg move-se a 2,0 m s⁻¹. A energia cinética é:",opts:fqOpts.map((t,i)=>({t,s:i===3?"ok":""}))}),cardTop:390,pose:"celebrar",mh:560})},
  {file:"04-erro-classico-concessiva",html:page({hook:"Erro clássico: <em>«embora»</em> não é causa.",card:card({label:"Português · Gramática",prompt:"«Embora estivesse cansada» é subordinada adverbial…",sentence:"Embora estivesse cansada, a aluna concluiu o trabalho.",opts:[{t:"causal",s:"bad"},{t:"concessiva",s:"ok"}],fb:{k:"bad",title:"Incorreto",text:"O cansaço não impediu o trabalho: é concessão. Causa seria «porque estava cansada»."}}),cardTop:290,pose:"facepalm",mh:540})},
  {file:"05-os-maias-4-palavras",html:page({hook:"Tecnicamente não está errado.",card:card({label:"Português · Educação literária",prompt:"Resume <i>Os Maias</i> em 4 palavras.",tiles:[{t:"família",on:true},{t:"rica",on:true},{t:"amor",on:true},{t:"complicado",on:true}],fb:{k:"warn",title:"Hmm…",text:"No exame, isto vale zero. Na app explicamos porque é que «complicado» é pouco."}}),cardTop:290,pose:"sentado-livros",mh:520})},
  {file:"06-matematica-minimo",html:page({hook:"Só peço o mínimo. <em>Até isso tem condições.</em>",card:card({label:"Matemática A · Derivadas",prompt:"Traduz para Matemática A:",sentence:"«O mínimo de que preciso para passar»",tiles:[{t:"f′(a) = 0",on:true}],fb:{k:"warn",title:"Ainda não chega.",text:"Se f′ passa de negativa a positiva em a, f tem mínimo local em a."}}),cardTop:290,pose:"bracos-cruzados",mh:560})},
  {file:"07-le-chatelier",html:page({hook:"Le Châtelier<br>explica a tua vida.",sub:"<span style=\"font-size:48px;color:#fff\">Quando te tiram o telemóvel, o sistema evolui no sentido de contrariar a perturbação.</span>",extra:`<div class="small">No exame, isto aplica-se a equilíbrios químicos. Não a pais. (Infelizmente.)</div>`,hookTop:110,pose:"panico",mh:640,mr:30,mb:100})},
  {file:"08-como-funciona",html:page({hook:"Não sabes por onde começar? <em>Eu sei.</em>",extra:`<div class="steps" style="right:330px">
    <div class="step"><b>1</b><div>Diagnóstico curto<small>Vejo o que já sabes e o que falta.</small></div></div>
    <div class="step"><b>2</b><div>Plano para ti<small>Digo-te a melhor próxima ação.</small></div></div>
    <div class="step"><b>3</b><div>Missão diária<small>3 a 5 minutos por dia. Sem drama.</small></div></div></div>`,cardTop:330,pose:"apontar",mh:520,mr:-40,mb:120,corner:false})},
  {file:"09-camoes-crush",html:page({hook:"Camões a descrever o teu <em>crush</em>. Em 1595.",card:card({label:"Português · Educação literária",prompt:"Que recurso expressivo domina?",sentence:"«Amor é fogo que arde sem se ver»",opts:[{t:"Comparação"},{t:"Metáfora"},{t:"Hipérbole"},{t:"Onomatopeia"}]}),cardTop:290,pose:"telemovel",mh:560})},
];

// Vídeo vertical (Reels/TikTok) do post 02: 4 momentos com transições.
const reel=[
  page({h:1920,hook:"O teste de Física<br>comeu o meu<br><em>fim de semana.</em>",hookTop:300,pose:"a-dormir",mh:700,mr:100,mb:420,corner:false}),
  page({h:1920,hook:"Português · 12.º ano",hookTop:200,card:card({...gram}),cardTop:380,pose:"bracos-cruzados"}),
  page({h:1920,hook:"Português · 12.º ano",hookTop:200,card:card({...gram,tiles:[{t:"complemento direto",on:true}]}),cardTop:380,pose:"a-escrever"}),
  page({h:1920,hook:"Pelo menos a <em>gramática</em> está certa.",hookTop:160,card:card({...gram,tiles:[{t:"complemento direto",on:true}],fb:{k:"ok",title:"Correto!",text:"Na passiva: «O meu fim de semana foi comido pelo teste.» Passa a sujeito: é complemento direto."}}),cardTop:380,pose:"celebrar"}),
];

rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1080,height:1350},deviceScaleFactor:1});
const pg=await ctx.newPage();
for(const post of posts){await pg.setContent(post.html,{waitUntil:"load"});await pg.screenshot({path:path.join(out,`${post.file}.png`)});}
await pg.setViewportSize({width:1080,height:1920});
const frames=[];
for(const [i,html] of reel.entries()){await pg.setContent(html,{waitUntil:"load"});const f=path.join(out,`reel-frame-${i}.png`);await pg.screenshot({path:f});frames.push(f);}
await browser.close();

// Cada momento 2,2 s, transição de 0,4 s; último fica 3 s.
const durations=[2.2,2.2,2.2,3];
const args=["-y"];frames.forEach((f,i)=>args.push("-loop","1","-t",String(durations[i]),"-i",f));
let filter="",last="[0:v]",offset=0;
for(let i=1;i<frames.length;i++){offset+=durations[i-1]-0.4;filter+=`${last}[${i}:v]xfade=transition=fade:duration=0.4:offset=${offset.toFixed(2)}[v${i}];`;last=`[v${i}]`;}
args.push("-filter_complex",filter+`${last}format=yuv420p[out]`,"-map","[out]","-r","30","-c:v","libx264","-preset","medium","-crf","20","-movflags","+faststart",path.join(out,"02-reel-gramatica.mp4"));
execFileSync("ffmpeg",args,{stdio:"ignore"});
frames.forEach(f=>rmSync(f));
writeFileSync(path.join(out,"README.txt"),"Gerado por marketing/serie-01.mjs. Legendas em marketing/serie-01-legendas.md.\n");
console.log(`✓ ${posts.length} imagens + 1 vídeo em ${path.relative(root,out)}`);
