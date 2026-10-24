import config from '../../playwright.config.mjs';
export default {...config,testDir:'.',testMatch:'journey.spec.mjs',outputDir:'../../tmp/release-journey',webServer:{command:'FORMULA_A11Y_FIXTURE=1 npm run start -- --hostname 127.0.0.1 --port 3016',url:'http://127.0.0.1:3016',reuseExistingServer:false},use:{...config.use,actionTimeout:15000,baseURL:'http://127.0.0.1:3016'}};
