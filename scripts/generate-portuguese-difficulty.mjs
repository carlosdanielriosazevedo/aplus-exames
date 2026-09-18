import {readFileSync,readdirSync,writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {dirname,join} from "node:path";
import {portugueseDifficultyProfile} from "../app/lib/portugueseDifficulty.js";

const root=dirname(fileURLToPath(import.meta.url));
const contentDir=join(root,"../content/vnext/portuguese/foundation");
const files=readdirSync(contentDir)
  .filter(file=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(file))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const items=files.flatMap(file=>JSON.parse(readFileSync(join(contentDir,file),"utf8")).items);
const matrix={
  modelVersion:1,
  status:"editorial-provisional",
  calibrated:false,
  calibrationNote:"Requer dados de alunos reais; o nível atual usa apenas sinais estruturais observáveis.",
  levels:{1:"Reconhecimento",2:"Interpretação",3:"Raciocínio",4:"Criação"},
  items:items.map(item=>({id:item.id,...portugueseDifficultyProfile(item)}))
};
writeFileSync(join(contentDir,"portuguese-639-difficulty.json"),`${JSON.stringify(matrix,null,2)}\n`);
console.log(`✓ matriz provisória de dificuldade gerada para ${matrix.items.length} itens`);
