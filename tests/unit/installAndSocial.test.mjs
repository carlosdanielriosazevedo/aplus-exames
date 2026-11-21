import {describe,expect,it,vi} from "vitest";
import {installPlatform,installPromptVisible,installCopy} from "../../app/lib/installPlatform.js";
import {enabledSocialProviders,markSocialSignInPending,completeSocialSignIn,SOCIAL_PENDING_KEY} from "../../app/lib/socialSignIn.js";

const UA={
  iphoneSafari:"Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  iphoneChrome:"Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0 Mobile/15E148 Safari/604.1",
  iphoneInstagram:"Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0",
  androidChrome:"Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36",
  androidTikTok:"Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/131.0 Mobile Safari/537.36 musical_ly_2023",
  desktop:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
  ipadDesktopMode:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15"
};
const memory=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};

describe("cartão «Instala a APProva+»",()=>{
  it("escolhe as instruções certas para cada telemóvel e browser",()=>{
    expect(installPlatform({userAgent:UA.iphoneSafari})).toBe("ios-safari");
    expect(installPlatform({userAgent:UA.iphoneChrome})).toBe("ios-other-browser");
    expect(installPlatform({userAgent:UA.iphoneInstagram})).toBe("ios-in-app");
    expect(installPlatform({userAgent:UA.androidChrome,hasInstallEvent:true})).toBe("android-prompt");
    expect(installPlatform({userAgent:UA.androidChrome})).toBe("android-menu");
    expect(installPlatform({userAgent:UA.androidTikTok})).toBe("android-in-app");
    expect(installPlatform({userAgent:UA.desktop})).toBe("desktop");
    expect(installPlatform({userAgent:UA.ipadDesktopMode,maxTouchPoints:5})).toBe("ios-safari");
    expect(installPlatform({userAgent:UA.iphoneSafari,standalone:true})).toBe("installed");
  });
  it("só aparece no telemóvel, depois do diagnóstico, se não estiver instalada; «Agora não» = 14 dias",()=>{
    const now=Date.now();
    expect(installPromptVisible({platform:"ios-safari",now})).toBe(true);
    expect(installPromptVisible({platform:"ios-safari",eligible:false,now})).toBe(false);
    expect(installPromptVisible({platform:"installed",now})).toBe(false);
    expect(installPromptVisible({platform:"desktop",now})).toBe(false);
    expect(installPromptVisible({platform:"ios-safari",dismissedAt:now-86400000,now})).toBe(false);
    expect(installPromptVisible({platform:"ios-safari",dismissedAt:now-15*86400000,now})).toBe(true);
  });
  it("no iPhone explica Partilhar → Adicionar ao ecrã principal; no Instagram manda abrir no browser",()=>{
    expect(installCopy("ios-safari").steps.join(" ")).toMatch(/Partilhar.*Adicionar ao ecrã principal/);
    expect(installCopy("ios-in-app").title).toMatch(/Safari/);
    expect(installCopy("android-prompt").action).toBe("Instalar");
  });
});

describe("entrar com Google/Microsoft",()=>{
  it("sem variável não mostra botões; só aceita fornecedores conhecidos",()=>{
    expect(enabledSocialProviders("")).toEqual([]);
    expect(enabledSocialProviders("google, microsoft,facebook,google").map(p=>p.id)).toEqual(["google","microsoft"]);
  });
  it("no regresso regista o consentimento (pelo email da sessão) e separa o progresso por conta",async()=>{
    const storage=memory();
    markSocialSignInPending("google",{storage});
    const queue=vi.fn(async()=>({})),flush=vi.fn(async()=>"sent"),switchDevice=vi.fn(()=>({ok:true,reload:false}));
    const r=await completeSocialSignIn({id:"u1",email:"aluno@exemplo.pt"},{storage,queue,flush,switchDevice});
    expect(r).toEqual({handled:true,reload:false});
    expect(queue).toHaveBeenCalledWith("aluno@exemplo.pt",{storage});
    expect(switchDevice).toHaveBeenCalledWith("u1");
    expect(storage.getItem(SOCIAL_PENDING_KEY)).toBeNull();
  });
  it("sem pedido pendente, ou pedido com mais de 1 hora, não regista consentimento",async()=>{
    const storage=memory(),queue=vi.fn(),switchDevice=vi.fn(()=>({ok:true}));
    expect((await completeSocialSignIn({id:"u1",email:"a@b.pt"},{storage,queue,switchDevice})).handled).toBe(false);
    markSocialSignInPending("microsoft",{storage,now:Date.now()-2*3600000});
    expect((await completeSocialSignIn({id:"u1",email:"a@b.pt"},{storage,queue,switchDevice})).handled).toBe(false);
    expect(queue).not.toHaveBeenCalled();
    expect(storage.getItem(SOCIAL_PENDING_KEY)).toBeNull();
  });
});
