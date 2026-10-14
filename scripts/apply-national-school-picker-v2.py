from __future__ import annotations

import html
import importlib.util
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEGACY = ROOT / "scripts" / "apply-national-school-picker.py"
spec = importlib.util.spec_from_file_location("school_picker_base", LEGACY)
base = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(base)


def post(url: str, data: dict[str, str]) -> str:
    req = urllib.request.Request(
        url,
        data=urllib.parse.urlencode(data).encode(),
        headers={"User-Agent": "APProva+ school-catalogue snapshot/2.0"},
    )
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read().decode("iso-8859-1", "replace")


def clean(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def mainland_catalogue() -> list[dict[str, str]]:
    """Use one official DGEEC district result where possible; only fan out by municipality when required."""
    rows: dict[str, dict[str, str]] = {}
    option_re = re.compile(r"<option VALUE='([^']+)'>(.*?)</option>", re.I | re.S)
    tr_re = re.compile(r"<tr\b[^>]*>(.*?)</tr>", re.I | re.S)
    id_re = re.compile(r'pavDet\(form1,"(\d+)"', re.I)
    first_school_cell = re.compile(r"<td\b[^>]*class='pavlstCursos'[^>]*>(.*?)</td>", re.I | re.S)

    def parse_page(page: str, region: str, municipality: str | None = None) -> dict[str, dict[str, str]]:
        found: dict[str, dict[str, str]] = {}
        for tr in tr_re.findall(page):
            school_id = id_re.search(tr)
            cell = first_school_cell.search(tr)
            if not school_id or not cell:
                continue
            parts = re.split(r"<br\s*/?>", cell.group(1), maxsplit=1, flags=re.I)
            name = clean(parts[0]).replace(" ", " ").strip()
            place = municipality or (clean(parts[1]) if len(parts) > 1 else "")
            if not name or not place:
                continue
            sid = school_id.group(1)
            found[sid] = {
                "id": f"dgeec-{sid}",
                "name": name,
                "municipality": place,
                "region": region,
            }
        return found

    for district_code, region in base.DISTRICTS.items():
        district_page = post(base.INFOESCOLAS, {
            "accpav": "31",
            "lstDistrito": district_code,
            "lstNuts3": "0",
            "lstConcelho": "0",
            "pavMais": "0",
            "pavNat": "0",
        })
        district_rows = parse_page(district_page, region)

        # InfoEscolas currently requires municipality fan-out for large districts such as Lisboa/Porto.
        if not district_rows:
            municipality_html = post(f"https://infoescolas.medu.pt/jxConc.asp?id={district_code}", {})
            municipalities = [
                (code, clean(name))
                for code, name in option_re.findall(municipality_html)
                if code != "0"
            ]
            if not municipalities:
                raise RuntimeError(f"InfoEscolas returned no municipalities for {region}")
            for municipality_code, municipality in municipalities:
                municipality_page = post(base.INFOESCOLAS, {
                    "accpav": "31",
                    "lstDistrito": district_code,
                    "lstNuts3": "0",
                    "lstConcelho": municipality_code,
                    "pavMais": "0",
                    "pavNat": "0",
                })
                district_rows.update(parse_page(municipality_page, region, municipality))

        if not district_rows:
            raise RuntimeError(f"InfoEscolas returned no secondary establishments for {region}")
        print(f"DGEEC {region}: {len(district_rows)}")
        rows.update(district_rows)

    result = sorted(rows.values(), key=lambda row: (row["region"], row["municipality"], row["name"]))
    if len(result) != 852:
        raise RuntimeError(f"DGEEC mainland snapshot changed: expected 852, received {len(result)}. Review source before release.")
    return result


def patch_app() -> None:
    base.patch_app()
    path = ROOT / "app" / "components" / "SecondaryScreens.js"
    text = path.read_text(encoding="utf8")

    text = text.replace(
        '  const schoolOptions=schoolsForRegion(region);',
        '  const [municipality,setMunicipality]=useState(()=>schoolsForRegion(profile.region||"").find(row=>row.name===profile.school)?.municipality||"");\n'
        '  const regionSchoolOptions=schoolsForRegion(region);\n'
        '  const municipalityOptions=[...new Set(regionSchoolOptions.map(row=>row.municipality))].sort((a,b)=>a.localeCompare(b,"pt"));\n'
        '  const schoolOptions=municipality?regionSchoolOptions.filter(row=>row.municipality===municipality):[];'
    )
    text = text.replace(
        '<label>Distrito/Região<select value={region} onChange={e=>{const next=e.target.value;setRegion(next);if(!schoolsForRegion(next).some(row=>row.name===school))setSchool("")}}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>',
        '<label>Distrito/Região<select value={region} onChange={e=>{const next=e.target.value;setRegion(next);setMunicipality("");setSchool("")}}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>'
    )
    text = text.replace(
        '<label>Escola<select value={schoolOptions.some(row=>row.name===school)?school:""} disabled={!region} onChange={e=>setSchool(e.target.value)}><option value="">{region?"Não indicar":"Escolhe primeiro o distrito/região"}</option>{schoolOptions.map(row=><option key={row.id} value={row.name}>{row.name}{row.municipality?` — ${row.municipality}`:""}</option>)}</select></label>',
        '<label>Município<select value={municipality} disabled={!region} onChange={e=>{setMunicipality(e.target.value);setSchool("")}}><option value="">{region?"Selecionar município":"Escolhe primeiro o distrito/região"}</option>{municipalityOptions.map(name=><option key={name} value={name}>{name}</option>)}</select></label>\n'
        '      <label>Escola<select value={schoolOptions.some(row=>row.name===school)?school:""} disabled={!municipality} onChange={e=>setSchool(e.target.value)}><option value="">{municipality?"Não indicar":"Escolhe primeiro o município"}</option>{schoolOptions.map(row=><option key={row.id} value={row.name}>{row.name}</option>)}</select></label>'
    )
    path.write_text(text, encoding="utf8")


def write_audits(expected_count: int) -> None:
    base.write_audits(expected_count)
    school_audit = ROOT / "scripts" / "school-catalog-audit.mjs"
    text = school_audit.read_text(encoding="utf8")
    text = text.replace(
        'assert.match(ranking,/schoolOptions=schoolsForRegion\\(region\\)/u,"Ranking deve filtrar escolas pela região");',
        'assert.match(ranking,/regionSchoolOptions=schoolsForRegion\\(region\\)/u,"Ranking deve filtrar escolas pela região");\n'
        'assert.match(ranking,/municipalityOptions=\\[\\.\\.\\.new Set\\(regionSchoolOptions\\.map\\(row=>row\\.municipality\\)\\)\\]/u,"Ranking deve usar município antes da escola");\n'
        'assert.match(ranking,/schoolOptions=municipality\\?regionSchoolOptions\\.filter/u,"a lista de escolas deve ser curta e dependente do município");'
    )
    text = text.replace(
        'assert.match(ranking,/Escolhe primeiro o distrito\\/região/u,"escola deve depender da região");',
        'assert.match(ranking,/Escolhe primeiro o distrito\\/região/u,"município deve depender da região");\n'
        'assert.match(ranking,/Escolhe primeiro o município/u,"escola deve depender do município");'
    )
    school_audit.write_text(text, encoding="utf8")


base.mainland_catalogue = mainland_catalogue
base.patch_app = patch_app
base.write_audits = write_audits
base.main()
