import {describe,expect,it} from "vitest";
import {assetLinksFor} from "../../app/.well-known/assetlinks.json/route.js";

const fingerprint=Array.from({length:32},(_,i)=>(i*7%256).toString(16).padStart(2,"0").toUpperCase()).join(":");

describe("/.well-known/assetlinks.json (TWA)",()=>{
  it("sem configuração não publica nada",()=>{
    expect(assetLinksFor({})).toBe(null);
    expect(assetLinksFor({ANDROID_APP_PACKAGE:"pt.approvamais.app"})).toBe(null);
    expect(assetLinksFor({ANDROID_APP_SHA256_FINGERPRINTS:fingerprint})).toBe(null);
  });
  it("recusa valores mal formados em vez de publicar uma associação inválida",()=>{
    expect(assetLinksFor({ANDROID_APP_PACKAGE:"approvamais",ANDROID_APP_SHA256_FINGERPRINTS:fingerprint})).toBe(null);
    expect(assetLinksFor({ANDROID_APP_PACKAGE:"pt.approvamais.app",ANDROID_APP_SHA256_FINGERPRINTS:"AA:BB"})).toBe(null);
  });
  it("publica a associação no formato exigido pelo Android",()=>{
    const links=assetLinksFor({ANDROID_APP_PACKAGE:"pt.approvamais.app",ANDROID_APP_SHA256_FINGERPRINTS:` ${fingerprint.toLowerCase()} , ${fingerprint}`});
    expect(links).toEqual([{relation:["delegate_permission/common.handle_all_urls"],target:{namespace:"android_app",package_name:"pt.approvamais.app",sha256_cert_fingerprints:[fingerprint]}}]);
  });
});
