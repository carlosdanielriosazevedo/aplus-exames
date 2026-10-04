import fs from "node:fs";

const pagePath="app/page.js";
const outputPath="app/components/SecondaryScreens.js";
let source=fs.readFileSync(pagePath,"utf8");

if(source.includes('const Ranking=dynamic(()=>import("./components/SecondaryScreens")')){
  console.log("Secondary screens already split.");
  process.exit(0);
}

function rangeBetween(startMarker,endMarker){
  const start=source.indexOf(startMarker);
  const end=source.indexOf(endMarker,start);
  if(start<0||end<0)throw new Error(`Could not locate ${startMarker}`);
  return {start,end,text:source.slice(start,end).trim(),startMarker,endMarker};
}

const ranges=[
  rangeBetween("function Ranking({s,setS,go}){","function TrainHub({s,go}){"),
  rangeBetween("function IdentityLab({s,setS,go}){","function Parent({s,setS,go}){"),
  rangeBetween("function Parent({s,setS,go}){","function BetaSessionFeedback(")
];

let ranking=ranges[0].text.replace("function Ranking({s,setS,go}){","export function Ranking({s,setS,go}){");
let identity=ranges[1].text.replace("function IdentityLab({s,setS,go}){","export function IdentityLab({s,setS,go}){");
let parent=ranges[2].text.replace("function Parent({s,setS,go}){","export function Parent({s,setS,go,prepIndex,measuredThemes}){");

const moduleSource=`"use client";\nimport {useEffect,useState} from "react";\nimport {ApronsoNudge,Back,BrandName,Shell,StudentNav,StudentTop} from "./chrome";\nimport {AVAILABLE_SUBJECT_IDS,SECONDARY_EXAM_SUBJECTS,examCodesLabel} from "../data/subjects";\nimport {subjectProgressFor} from "../lib/subjectProgress";\nimport {subjectGoal,uniqueSubjectIds} from "../lib/subjectWorkspace";\nimport {ROLES,normalizeIdentity,can,defaultScreenForRole,createParentInvite,activeParentLink,requestLinkRemoval,confirmLinkRemoval,demoIdentity} from "../lib/identity";\nimport {engagementSummary} from "../lib/engagement";\nimport {examScoreLabel} from "../lib/constructedResponseView";\nimport {competitionSummary,latestCompetitiveActivity,demoLeaderboard,leaderboardAroundUser,leagueProjection,updateCompetitionProfile,scopeAvailability,PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS} from "../lib/competition";\n\nconst DEFAULT_SUBJECT_ID="math-a";\nfunction subjectById(id){return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);}\n\n${ranking}\n\n${identity}\n\n${parent}\n`;

// Remove using the original offsets, from the end of the file backwards.
for(const range of [...ranges].sort((a,b)=>b.start-a.start)){
  source=source.slice(0,range.start)+source.slice(range.end);
}

const dynamicAnchor='const PhysicsChemistryMiniExam=dynamic(()=>import("./components/PhysicsChemistryMiniExam"),{ssr:false});';
if(!source.includes(dynamicAnchor))throw new Error("Dynamic import anchor not found");
source=source.replace(dynamicAnchor,`${dynamicAnchor}\nconst Ranking=dynamic(()=>import("./components/SecondaryScreens").then(module=>module.Ranking),{ssr:false});\nconst IdentityLab=dynamic(()=>import("./components/SecondaryScreens").then(module=>module.IdentityLab),{ssr:false});\nconst Parent=dynamic(()=>import("./components/SecondaryScreens").then(module=>module.Parent),{ssr:false});`);

const parentRoute='if(screen==="parent")return <Parent s={s} setS={setS} go={go}/>;';
if(!source.includes(parentRoute))throw new Error("Parent route not found");
source=source.replace(parentRoute,'if(screen==="parent")return <Parent s={s} setS={setS} go={go} prepIndex={prepIndex} measuredThemes={measuredThemes}/>;');

fs.writeFileSync(outputPath,moduleSource);
fs.writeFileSync(pagePath,source);
console.log("Split Ranking, IdentityLab and Parent out of the initial page chunk.");
