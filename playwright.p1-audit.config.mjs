// Testes Chromium das correções P1 da auditoria independente da #459.
// Separados da suite principal para não aproximar o globalTimeout de 10 min
// da Beta CI (que já usa ~8,4 min). Mesmo servidor e mesmas opções.
import base from "./playwright.config.mjs";

export default {
  ...base,
  testDir:"./tests/browser-p1",
  // Sufixo próprio: o Vitest (tests/**/*.spec|test) não recolhe estes ficheiros.
  testMatch:"**/*.pw.mjs",
  globalTimeout:10*60_000,
  webServer:{...base.webServer,url:process.env.P1_BASE_URL||base.webServer.url,reuseExistingServer:!!process.env.P1_REUSE_SERVER},
  use:{...base.use,baseURL:process.env.P1_BASE_URL||base.use.baseURL,
    ...(process.env.P1_CHROMIUM_PATH?{launchOptions:{executablePath:process.env.P1_CHROMIUM_PATH}}:{})}
};
