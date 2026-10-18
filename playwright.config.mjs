import {defineConfig,devices} from "@playwright/test";

export default defineConfig({
  testDir:"./tests/browser",
  fullyParallel:false,
  workers:1,
  timeout:120_000,
  globalTimeout:10*60_000,
  expect:{timeout:10_000},
  reporter:[["list"],["./tests/browser/test-begin-reporter.cjs"]],
  use:{
    ...devices["Desktop Chrome"],
    baseURL:"http://127.0.0.1:3000",
    viewport:{width:390,height:844},
    trace:"retain-on-failure",
    screenshot:"only-on-failure",
    video:"retain-on-failure"
  },
  webServer:{
    command:"DATABASE_URL='' NEXT_PUBLIC_NEON_AUTH_URL='' NEXT_PUBLIC_NEON_DATA_API_URL='' npm run build && npm run start -- --hostname 127.0.0.1",
    url:"http://127.0.0.1:3000",
    reuseExistingServer:false,
    timeout:240_000
  }
});
