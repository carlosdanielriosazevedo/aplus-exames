from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]

def req(text, old, new, label):
    if old in text:
        return text.replace(old,new)
    if new in text:
        return text
    raise RuntimeError(f"Missing patch target: {label}")

# Competition profile: keep a human-readable label, but group by the canonical establishment ID.
p=ROOT/'app/lib/competition.js'
s=p.read_text(encoding='utf8')
s=req(s,'      school:null,\n      schoolOptIn:false,','      school:null,\n      schoolId:null,\n      schoolOptIn:false,','schoolId default')
s=req(s,'  const school=patch.school!==undefined\n    ?cleanRankingText(patch.school,80)||null\n    :c.profile.school;\n  const districtOptIn=', '  const school=patch.school!==undefined\n    ?cleanRankingText(patch.school,80)||null\n    :c.profile.school;\n  const schoolId=patch.schoolId!==undefined\n    ?cleanRankingText(patch.schoolId,96)||null\n    :c.profile.schoolId;\n  const districtOptIn=','schoolId normalization')
s=req(s,'        region,\n        school,\n        districtOptIn,','        region,\n        school,\n        schoolId,\n        districtOptIn,','schoolId profile')
s=s.replace('return c.profile.school&&c.profile.schoolOptIn&&schoolYear','return c.profile.school&&c.profile.schoolId&&c.profile.schoolOptIn&&schoolYear')
s=req(s,'    school:c.profile.schoolOptIn?c.profile.school:null,\n    division:', '    school:c.profile.schoolOptIn?c.profile.school:null,\n    schoolId:c.profile.schoolOptIn?c.profile.schoolId:null,\n    division:','schoolId public')
p.write_text(s,encoding='utf8')

# Main Ranking screen: Distrito/Região -> Município -> exact canonical school ID.
p=ROOT/'app/components/SecondaryScreens.js'
s=p.read_text(encoding='utf8')
s=req(s,'  const [school,setSchool]=useState(profile.school||"");\n  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");\n  const [municipality,setMunicipality]=useState(()=>schoolsForRegion(profile.region||"").find(row=>row.name===profile.school)?.municipality||"");', '  const initialSchool=schoolsForRegion(profile.region||"").find(row=>row.id===profile.schoolId||row.name===profile.school);\n  const [schoolId,setSchoolId]=useState(profile.schoolId||initialSchool?.id||"");\n  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");\n  const [municipality,setMunicipality]=useState(initialSchool?.municipality||"");','ranking school state')
s=req(s,'  const schoolOptions=municipality?regionSchoolOptions.filter(row=>row.municipality===municipality):[];\n  const [districtOptIn', '  const schoolOptions=municipality?regionSchoolOptions.filter(row=>row.municipality===municipality):[];\n  const selectedSchool=schoolOptions.find(row=>row.id===schoolId)||null;\n  const [districtOptIn','selected school')
s=req(s,'      school:schoolOptions.some(row=>row.name===school)?school:null,\n      districtOptIn,\n      schoolOptIn:schoolOptions.some(row=>row.name===school)&&schoolOptIn', '      school:selectedSchool?.name||null,\n      schoolId:selectedSchool?.id||null,\n      districtOptIn,\n      schoolOptIn:Boolean(selectedSchool&&schoolOptIn)','ranking canonical save')
s=s.replace('setMunicipality("");setSchool("")','setMunicipality("");setSchoolId("")')
s=s.replace('setMunicipality(e.target.value);setSchool("")','setMunicipality(e.target.value);setSchoolId("")')
s=req(s,'<label>Escola<select value={schoolOptions.some(row=>row.name===school)?school:""} disabled={!municipality} onChange={e=>setSchool(e.target.value)}><option value="">{municipality?"Não indicar":"Escolhe primeiro o município"}</option>{schoolOptions.map(row=><option key={row.id} value={row.name}>{row.name}</option>)}</select></label>', '<label>Escola<select value={schoolId} disabled={!municipality} onChange={e=>setSchoolId(e.target.value)}><option value="">{municipality?"Não indicar":"Escolhe primeiro o município"}</option>{schoolOptions.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>','ranking school select ID')
p.write_text(s,encoding='utf8')

# Account & progress screen must use the exact same canonical picker, never a second free-text path.
p=ROOT/'app/components/AccountCloud.js'
s=p.read_text(encoding='utf8')
s=s.replace('import {migrateCompetition,updateCompetitionProfile} from "../lib/competition";','import {migrateCompetition,updateCompetitionProfile,PORTUGAL_REGIONS} from "../lib/competition";\nimport {schoolsForRegion} from "../data/secondarySchools";')
s=req(s,'  const [rankingSchool,setRankingSchool]=useState(s.competition?.profile?.school||"");\n  const [rankingSchoolOptIn', '  const rankingProfile=s.competition?.profile||{};\n  const initialRankingSchool=schoolsForRegion(rankingProfile.region||"").find(row=>row.id===rankingProfile.schoolId||row.name===rankingProfile.school);\n  const [rankingRegion,setRankingRegion]=useState(rankingProfile.region||"");\n  const [rankingMunicipality,setRankingMunicipality]=useState(initialRankingSchool?.municipality||"");\n  const [rankingSchoolId,setRankingSchoolId]=useState(rankingProfile.schoolId||initialRankingSchool?.id||"");\n  const rankingRegionSchools=schoolsForRegion(rankingRegion);\n  const rankingMunicipalities=[...new Set(rankingRegionSchools.map(row=>row.municipality))].sort((a,b)=>a.localeCompare(b,"pt"));\n  const rankingSchools=rankingMunicipality?rankingRegionSchools.filter(row=>row.municipality===rankingMunicipality):[];\n  const rankingSelectedSchool=rankingSchools.find(row=>row.id===rankingSchoolId)||null;\n  const [rankingSchoolOptIn','account school state')
s=req(s,'      school:rankingSchool.trim()||null,\n      schoolOptIn:rankingSchoolOptIn', '      region:rankingRegion||null,\n      school:rankingSelectedSchool?.name||null,\n      schoolId:rankingSelectedSchool?.id||null,\n      schoolOptIn:Boolean(rankingSelectedSchool&&rankingSchoolOptIn)','account canonical save')
s=req(s,'        <label>Escola<input value={rankingSchool} onChange={e=>setRankingSchool(e.target.value)} placeholder="Nome da escola"/></label>', '        <label>Distrito/Região<select value={rankingRegion} onChange={e=>{setRankingRegion(e.target.value);setRankingMunicipality("");setRankingSchoolId("")}}><option value="">Selecionar distrito/região</option>{PORTUGAL_REGIONS.map(region=><option key={region} value={region}>{region}</option>)}</select></label>\n        <label>Município<select value={rankingMunicipality} disabled={!rankingRegion} onChange={e=>{setRankingMunicipality(e.target.value);setRankingSchoolId("")}}><option value="">{rankingRegion?"Selecionar município":"Escolhe primeiro o distrito/região"}</option>{rankingMunicipalities.map(name=><option key={name} value={name}>{name}</option>)}</select></label>\n        <label>Escola<select value={rankingSchoolId} disabled={!rankingMunicipality} onChange={e=>setRankingSchoolId(e.target.value)}><option value="">{rankingMunicipality?"Selecionar escola":"Escolhe primeiro o município"}</option>{rankingSchools.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>','account school picker')
p.write_text(s,encoding='utf8')

# Catalogue gate: allow same branch name in distinct municipalities, but never collapse physical schools.
p=ROOT/'scripts/school-catalog-audit.mjs'
s=p.read_text(encoding='utf8')
s=s.replace('const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");','const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");\nconst account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");\nconst competition=readFileSync(new URL("../app/lib/competition.js",import.meta.url),"utf8");')
s=s.replace('new Set(SCHOOL_CATALOG.map(x=>`${x.region}|${x.name}`)).size','new Set(SCHOOL_CATALOG.map(x=>`${x.region}|${x.municipality}|${x.name}`)).size')
s=s.replace('"nomes por região devem ser únicos"','"estabelecimentos por região/município/nome devem ser únicos"')
s=s.replace('assert.match(ranking,/schoolOptions=municipality\\?regionSchoolOptions\\.filter/u,"a lista de escolas deve depender do município");','assert.match(ranking,/schoolOptions=municipality\\?regionSchoolOptions\\.filter/u,"a lista de escolas deve depender do município");\nassert.match(ranking,/value=\\{schoolId\\}/u,"Ranking deve guardar seleção por ID canónico");\nassert.match(account,/rankingSchoolId/u,"Conta deve usar a mesma seleção canónica de escola");\nassert.doesNotMatch(account,/placeholder="Nome da escola"/u,"Conta não pode aceitar escola em texto livre");\nassert.match(competition,/schoolId/u,"perfil competitivo deve preservar ID canónico da escola");')
s=s.replace('assert.match(ranking,/schoolOptions\\.some\\(row=>row\\.name===school\\)\\?school:null/u,"apenas escolas canónicas podem ser guardadas");\n','')
p.write_text(s,encoding='utf8')

# Public polish gate covers the account entry point too.
p=ROOT/'scripts/final-public-rc-audit.mjs'
s=p.read_text(encoding='utf8')
s=s.replace('const publicCopy=ranking+"\\n"+main;','const account=readFileSync(new URL("../app/components/AccountCloud.js",import.meta.url),"utf8");\nconst publicCopy=ranking+"\\n"+main+"\\n"+account;')
s=s.replace('assert.match(main,/Certeza do Apronso/u,"métrica pedagógica usa vocabulário consistente");','assert.match(main,/Certeza do Apronso/u,"métrica pedagógica usa vocabulário consistente");\nassert.doesNotMatch(account,/Nome da escola/u,"Conta não deve permitir escola em texto livre");')
p.write_text(s,encoding='utf8')

print('Canonical school identity hardened across Ranking and Account')
