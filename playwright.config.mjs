import {defineConfig,devices} from "@playwright/test";

export default defineConfig({
  testDir:"./tests/browser",
  fullyParallel:false,
  workers:1,
  timeout:120_000,
  expect:{timeout:10_000},
  reporter:[["list"]],
  use:{
    baseURL:"http://127.0.0.1:3000",
    viewport:{width:390,height:844},
    trace:"retain-on-failure",
    screenshot:"only-on-failure",
    video:"retain-on-failure",
    ...devices["Desktop Chrome"]
  },
  webServer:{
    command:"npm run dev -- --hostname 127.0.0.1",
    url:"http://127.0.0.1:3000",
    reuseExistingServer:false,
    timeout:120_000
  }
});
