from pathlib import Path

root=Path(__file__).resolve().parents[1]
path=root/'scripts/competition-audit.mjs'
text=path.read_text(encoding='utf8')
old='  school:"Escola Demo",\n  districtOptIn:true,'
new='  school:"Escola Demo",\n  schoolId:"dgeec-demo",\n  districtOptIn:true,'
if old in text:
    text=text.replace(old,new)
elif new not in text:
    raise RuntimeError('competition audit school fixture not found')
path.write_text(text,encoding='utf8')
print('Competition audit fixture aligned with canonical school ID contract')
