import {readFileSync,writeFileSync} from "node:fs";
const path="app/components/PortugueseLabLazy.js";
let source=readFileSync(path,"utf8");
const from='import {Back,Shell,Logo,StudentNav} from "./chrome";';
const to='import {Apronso,Back,Shell,Logo,StudentNav} from "./chrome";';
if(!source.includes(from))throw new Error("PortugueseLabLazy chrome import anchor missing");
source=source.replace(from,to);
writeFileSync(path,source);
