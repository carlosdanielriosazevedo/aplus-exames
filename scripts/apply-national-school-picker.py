from __future__ import annotations

import html
import json
import re
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT_DATE = "2026-10-14"
INFOESCOLAS = "https://infoescolas.medu.pt/Secundario/"
DISTRICTS = {
    "01": "Aveiro", "02": "Beja", "03": "Braga", "04": "Bragança",
    "05": "Castelo Branco", "06": "Coimbra", "07": "Évora", "08": "Faro",
    "09": "Guarda", "10": "Leiria", "11": "Lisboa", "12": "Portalegre",
    "13": "Porto", "14": "Santarém", "15": "Setúbal", "16": "Viana do Castelo",
    "17": "Vila Real", "18": "Viseu",
}

AZORES = [
    ("Conservatório Regional de Ponta Delgada", "Ponta Delgada"),
    ("Escola Básica e Secundária da Calheta", "Calheta"),
    ("Escola Básica e Secundária da Graciosa", "Santa Cruz da Graciosa"),
    ("Escola Básica e Secundária da Madalena", "Madalena"),
    ("Escola Básica e Secundária da Povoação", "Povoação"),
    ("Escola Básica e Secundária das Flores", "Santa Cruz das Flores"),
    ("Escola Básica e Secundária das Lajes do Pico", "Lajes do Pico"),
    ("Escola Básica e Secundária de Santa Maria", "Vila do Porto"),
    ("Escola Básica e Secundária de São Roque do Pico", "São Roque do Pico"),
    ("Escola Básica e Secundária de Velas", "Velas"),
    ("Escola Básica e Secundária de Vila Franca do Campo", "Vila Franca do Campo"),
    ("Escola Básica e Secundária do Nordeste", "Nordeste"),
    ("Escola Básica e Secundária Mouzinho da Silveira", "Vila do Corvo"),
    ("Escola Básica e Secundária Tomás de Borba", "Angra do Heroísmo"),
    ("Escola Secundária Antero Quental", "Ponta Delgada"),
    ("Escola Secundária da Ribeira Grande", "Ribeira Grande"),
    ("Escola Secundária das Laranjeiras", "Ponta Delgada"),
    ("Escola Secundária de Lagoa", "Lagoa"),
    ("Escola Secundária Domingos Rebelo", "Ponta Delgada"),
    ("Escola Secundária Jerónimo Emiliano de Andrade", "Angra do Heroísmo"),
    ("Escola Secundária Manuel de Arriaga", "Horta"),
    ("Escola Secundária Vitorino Nemésio", "Praia da Vitória"),
    ("APRODAZ – Associação para a Promoção do Desenvolvimento dos Açores", "Ponta Delgada"),
    ("EP da Câmara de Comércio e Industria de Ponta Delgada", "Ponta Delgada"),
    ("EP da Horta", "Horta"),
    ("EP da Praia da Vitória", "Praia da Vitória"),
    ("EP da Ribeira Grande", "Ribeira Grande"),
    ("EP da Santa Casa da Misericórdia de Angra do Heroísmo", "Angra do Heroísmo"),
    ("EP da Santa Casa da Misericórdia de Ponta Delgada – MEP", "Ponta Delgada"),
    ("EP de Nordeste", "Nordeste"),
    ("EP de São Jorge", "Velas"),
    ("EP de Vila Franca do Campo", "Vila Franca do Campo"),
    ("EP do Pico", "Madalena"),
    ("EP do Sindicato de Escritório e Comércio da RAA (EPROSEC)", "Ponta Delgada"),
    ("EP Monsenhor João Mauricio de Amaral Ferreira", "Povoação"),
    ("Escola de Formação Turistica e Hoteleira", "Ponta Delgada"),
    ("Escola de Novas Tecnologias dos Açores (ENTA)", "Ponta Delgada"),
    ("Inetese-Instituto de Educação Técnica Açores", "Ponta Delgada"),
    ("Colégio do Castanheiro – JI, 1º, 2º,3º Ciclo e Ens.Sec.", "Ponta Delgada"),
]

MADEIRA = [
    ("Escola Básica e Secundária com Pré-escolar da Calheta", "Calheta"),
    ("Escola Básica e Secundária Dr. Luís Maurílio da Silva Dantas", "Câmara de Lobos"),
    ("Escola Profissional Dr. Sérgio Teixeira", "Câmara de Lobos"),
    ("Conservatório - Escola Profissional das Artes da Madeira, Eng.º Luiz Peter Clode", "Funchal"),
    ("Escola Básica e Secundária Dr. Ângelo Augusto da Silva", "Funchal"),
    ("Escola Básica e Secundária Gonçalves Zarco", "Funchal"),
    ("Escola da APEL", "Funchal"),
    ("Escola de Hotelaria e Turismo da Madeira", "Funchal"),
    ("Escola Profissional Atlântico", "Funchal"),
    ("Escola Profissional CELFF", "Funchal"),
    ("Escola Profissional Cristóvão Colombo", "Funchal"),
    ("Escola Secundária Francisco Franco", "Funchal"),
    ("Escola Secundária Jaime Moniz", "Funchal"),
    ("Instituto para a Qualificação IP-RAM - Centro de Formação Profissional da Madeira", "Funchal"),
    ("Instituto para a Qualificação IP-RAM - Escola Profissional Dr. Francisco Fernandes", "Funchal"),
    ("Instituto Profissional de Transportes e Logística da Madeira", "Funchal"),
    ("Serviço Técnico de Formação Profissional", "Funchal"),
    ("International Sharing School - Madeira", "Funchal"),
    ("Escola Básica e Secundária de Machico", "Machico"),
    ("Escola Básica e Secundária da Ponta do Sol", "Ponta do Sol"),
    ("Escola Básica e Secundária com Pré-escolar e Creche do Porto Moniz", "Porto Moniz"),
    ("Escola Básica e Secundária com Pré-escolar e Creche Professor Dr. Francisco Freitas Branco", "Porto Santo"),
    ("Escola Básica e Secundária Padre Manuel Álvares", "Ribeira Brava"),
    ("Escola Básica e Secundária de Santa Cruz", "Santa Cruz"),
    ("Escola Básica e Secundária com Pré-escolar e Creche Bispo D. Manuel Ferreira Cabral", "Santana"),
    ("Escola Básica e Secundária com Pré-Escolar e Creche D. Lucinda Andrade", "São Vicente"),
]


def post(url: str, data: dict[str, str]) -> str:
    req = urllib.request.Request(
        url,
        data=urllib.parse.urlencode(data).encode(),
        headers={"User-Agent": "APProva+ school-catalogue snapshot/1.0"},
    )
    with urllib.request.urlopen(req, timeout=45) as response:
        raw = response.read()
    return raw.decode("iso-8859-1", "replace")


def clean_markup(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def slug(value: str) -> str:
    plain = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", plain).strip("-")


def mainland_catalogue() -> list[dict[str, str]]:
    rows: dict[str, dict[str, str]] = {}
    option_re = re.compile(r"<option VALUE='([^']+)'>(.*?)</option>", re.I | re.S)
    tr_re = re.compile(r"<tr\b[^>]*>(.*?)</tr>", re.I | re.S)
    id_re = re.compile(r'pavDet\(form1,\\?"(\d+)\\?"', re.I)
    first_school_cell = re.compile(r"<td\b[^>]*class='pavlstCursos'[^>]*>(.*?)</td>", re.I | re.S)

    for district_code, region in DISTRICTS.items():
        municipality_html = post(f"https://infoescolas.medu.pt/jxConc.asp?id={district_code}", {})
        municipalities = [
            (code, clean_markup(name))
            for code, name in option_re.findall(municipality_html)
            if code != "0"
        ]
        if not municipalities:
            raise RuntimeError(f"InfoEscolas returned no municipalities for {region}")

        for municipality_code, municipality in municipalities:
            page = post(INFOESCOLAS, {
                "accpav": "31",
                "lstDistrito": district_code,
                "lstNuts3": "0",
                "lstConcelho": municipality_code,
                "pavMais": "0",
                "pavNat": "0",
            })
            for tr in tr_re.findall(page):
                school_id = id_re.search(tr)
                cell = first_school_cell.search(tr)
                if not school_id or not cell:
                    continue
                name = clean_markup(cell.group(1)).replace(" ", " ").strip()
                if not name:
                    continue
                sid = school_id.group(1)
                rows[sid] = {
                    "id": f"dgeec-{sid}",
                    "name": name,
                    "municipality": municipality,
                    "region": region,
                }

    result = sorted(rows.values(), key=lambda row: (row["region"], row["municipality"], row["name"]))
    if len(result) < 840:
        raise RuntimeError(f"Mainland catalogue unexpectedly small: {len(result)}")
    return result


def island_rows(items: list[tuple[str, str]], region: str, prefix: str) -> list[dict[str, str]]:
    return [
        {
            "id": f"{prefix}-{slug(name)}",
            "name": name,
            "municipality": municipality,
            "region": region,
        }
        for name, municipality in items
    ]


def write_catalogue(rows: list[dict[str, str]]) -> None:
    school_dir = ROOT / "app" / "data" / "schools"
    school_dir.mkdir(parents=True, exist_ok=True)
    for existing in school_dir.glob("*.js"):
        existing.unlink()

    grouped: dict[str, list[dict[str, str]]] = {}
    for row in rows:
        grouped.setdefault(row["region"], []).append(row)

    modules = []
    for region in [*DISTRICTS.values(), "Açores", "Madeira"]:
        region_rows = sorted(grouped[region], key=lambda row: (row["municipality"], row["name"]))
        filename = slug(region) + ".js"
        compact = [{"id": r["id"], "name": r["name"], "municipality": r["municipality"]} for r in region_rows]
        (school_dir / filename).write_text(
            f"// APProva+ canonical school snapshot · {SNAPSHOT_DATE} · {region}\n"
            f"export default {json.dumps(compact, ensure_ascii=False, separators=(',', ':'))};\n",
            encoding="utf8",
        )
        modules.append((region, filename[:-3], f"schools{len(modules)}"))

    lines = [
        f"// Canonical APProva+ school catalogue snapshot · {SNAPSHOT_DATE}.",
        "// Mainland: DGEEC InfoEscolas (Ensino Secundário). Açores: official regional public/professional/private directories.",
        "// Madeira: official regional secondary/professional network, current PLACE directory and 2025/26 education statistics.",
    ]
    for _, module, variable in modules:
        lines.append(f'import {variable} from "./schools/{module}.js";')
    lines += [
        "",
        "export const SCHOOL_CATALOG=[",
    ]
    for region, _, variable in modules:
        lines.append(f'  ...{variable}.map(row=>({{...row,region:{json.dumps(region, ensure_ascii=False)}}})),')
    lines += [
        "];",
        "",
        "const SCHOOL_BY_REGION=new Map();",
        "for(const school of SCHOOL_CATALOG){",
        "  const rows=SCHOOL_BY_REGION.get(school.region)||[];",
        "  rows.push(school);",
        "  SCHOOL_BY_REGION.set(school.region,rows);",
        "}",
        "for(const rows of SCHOOL_BY_REGION.values())rows.sort((a,b)=>a.municipality.localeCompare(b.municipality,\"pt\")||a.name.localeCompare(b.name,\"pt\"));",
        "",
        "export function schoolsForRegion(region){return SCHOOL_BY_REGION.get(region)||[];}",
        "export function isCanonicalSchool(region,name){return schoolsForRegion(region).some(row=>row.name===name);}",
        "",
    ]
    (ROOT / "app" / "data" / "secondarySchools.js").write_text("\n".join(lines), encoding="utf8")


def replace_required(text: str, old: str, new: str, label: str) -> str:
    if old in text:
        return text.replace(old, new)
    if new in text:
        return text
    raise RuntimeError(f"Could not patch {label}")


def patch_app() -> None:
    secondary = ROOT / "app" / "components" / "SecondaryScreens.js"
    text = secondary.read_text(encoding="utf8")
    text = replace_required(
        text,
        'import {competitionSummary,latestCompetitiveActivity,demoLeaderboard,leaderboardAroundUser,leagueProjection,updateCompetitionProfile,scopeAvailability,PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS} from "../lib/competition";\n',
        'import {competitionSummary,latestCompetitiveActivity,demoLeaderboard,leaderboardAroundUser,leagueProjection,updateCompetitionProfile,scopeAvailability,PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS} from "../lib/competition";\nimport {schoolsForRegion} from "../data/secondarySchools";\n',
        "Ranking school catalogue import",
    )
    text = replace_required(
        text,
        '  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");\n',
        '  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");\n  const schoolOptions=schoolsForRegion(region);\n',
        "Ranking school options",
    )
    text = replace_required(
        text,
        '      school:school.trim()||null,\n      districtOptIn,\n      schoolOptIn\n',
        '      school:schoolOptions.some(row=>row.name===school)?school:null,\n      districtOptIn,\n      schoolOptIn:schoolOptions.some(row=>row.name===school)&&schoolOptIn\n',
        "Ranking canonical school save",
    )
    text = replace_required(
        text,
        '<label>Distrito/Região<select value={region} onChange={e=>setRegion(e.target.value)}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>',
        '<label>Distrito/Região<select value={region} onChange={e=>{const next=e.target.value;setRegion(next);if(!schoolsForRegion(next).some(row=>row.name===school))setSchool("")}}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>',
        "Ranking region selector",
    )
    text = replace_required(
        text,
        '<label>Escola<input value={school} onChange={e=>setSchool(e.target.value)} placeholder="Nome da escola (opcional)"/></label>',
        '<label>Escola<select value={schoolOptions.some(row=>row.name===school)?school:""} disabled={!region} onChange={e=>setSchool(e.target.value)}><option value="">{region?"Não indicar":"Escolhe primeiro o distrito/região"}</option>{schoolOptions.map(row=><option key={row.id} value={row.name}>{row.name}{row.municipality?` — ${row.municipality}`:""}</option>)}</select></label>',
        "Ranking school selector",
    )
    for old, new in {
        "Ranking de distrito/região ainda não ativo": "Ranking de distrito/região indisponível",
        "Ranking de escola ainda não ativo": "Ranking de escola indisponível",
        "tester simulado": "participante simulado",
        "Em rankings muito grandes, a experiência deverá privilegiar a tua posição e quem está imediatamente acima/abaixo — não uma lista infinita.": "Em rankings grandes mostramos a tua posição e os participantes mais próximos.",
        "Mais estudo útil, menos farming.": "Mais estudo útil, menos repetição.",
        "Em produção, cada liga terá um pequeno grupo de alunos com atividade comparável. No final da semana, os primeiros sobem e os últimos podem descer.": "Cada liga junta um pequeno grupo de alunos. No fim da semana, os primeiros sobem e os últimos podem descer.",
    }.items():
        text = text.replace(old, new)
    secondary.write_text(text, encoding="utf8")

    client = ROOT / "app" / "clientApp.js"
    client_text = client.read_text(encoding="utf8").replace("Certeza da app", "Certeza do Apronso")
    client.write_text(client_text, encoding="utf8")

    student_audit = ROOT / "scripts" / "student-experience-audit.mjs"
    student_audit.write_text(student_audit.read_text(encoding="utf8").replace("Certeza da app", "Certeza do Apronso"), encoding="utf8")

    curriculum_audit = ROOT / "scripts" / "curriculum-picker-home-contrast-audit.mjs"
    audit_text = curriculum_audit.read_text(encoding="utf8")
    if 'const setup=readFileSync(new URL("../app/components/SetupScreens.js"' not in audit_text:
        audit_text = audit_text.replace(
            'const math=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");',
            'const math=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");\nconst setup=readFileSync(new URL("../app/components/SetupScreens.js",import.meta.url),"utf8");',
        )
    audit_text = audit_text.replace(
        'assert.match(math,/className="curriculumPicker"/u,"Matemática A mantém o seletor matéria → submatéria.");',
        'assert.match(setup,/className="curriculumPicker"/u,"Matemática A mantém o seletor matéria → submatéria no componente partilhado de configuração.");',
    )
    curriculum_audit.write_text(audit_text, encoding="utf8")


def write_audits(expected_count: int) -> None:
    school_audit = ROOT / "scripts" / "school-catalog-audit.mjs"
    school_audit.write_text(f'''import assert from "node:assert/strict";
import {{readFileSync}} from "node:fs";
import {{SCHOOL_CATALOG,schoolsForRegion}} from "../app/data/secondarySchools.js";
import {{PORTUGAL_REGIONS}} from "../app/lib/competition.js";

const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");
assert.equal(SCHOOL_CATALOG.length,{expected_count},"o snapshot nacional deve manter a contagem validada");
assert.equal(new Set(SCHOOL_CATALOG.map(x=>x.id)).size,SCHOOL_CATALOG.length,"IDs de escola devem ser únicos");
assert.equal(new Set(SCHOOL_CATALOG.map(x=>`${{x.region}}|${{x.name}}`)).size,SCHOOL_CATALOG.length,"nomes por região devem ser únicos");
for(const region of PORTUGAL_REGIONS)assert.ok(schoolsForRegion(region).length>0,`catálogo sem escolas para ${{region}}`);
assert.equal(schoolsForRegion("Açores").length,39,"Açores: 22 públicas com secundário + 16 profissionais + 1 particular com secundário");
assert.equal(schoolsForRegion("Madeira").length,26,"Madeira: deve acompanhar os 26 estabelecimentos com secundário reportados em 2025/26");
assert.ok(SCHOOL_CATALOG.filter(x=>!["Açores","Madeira"].includes(x.region)).length>=840,"Continente: snapshot DGEEC inesperadamente pequeno");
for(const school of SCHOOL_CATALOG){{
  assert.ok(school.name?.trim(),`escola sem nome: ${{school.id}}`);
  assert.ok(school.municipality?.trim(),`escola sem município: ${{school.id}}`);
}}
assert.doesNotMatch(ranking,/Nome da escola \(opcional\)/u,"Ranking não pode regressar a escola em texto livre");
assert.match(ranking,/schoolOptions=schoolsForRegion\(region\)/u,"Ranking deve filtrar escolas pela região");
assert.match(ranking,/schoolOptions\.some\(row=>row\.name===school\)\?school:null/u,"apenas escolas canónicas podem ser guardadas");
assert.match(ranking,/Escolhe primeiro o distrito\/região/u,"escola deve depender da região");
console.log(`✓ School catalogue audit passed: ${{SCHOOL_CATALOG.length}} establishments across ${{PORTUGAL_REGIONS.length}} regions`);
''', encoding="utf8")

    final_audit = ROOT / "scripts" / "final-public-rc-audit.mjs"
    final_audit.write_text('''import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const ranking=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");
const main=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");
const publicCopy=ranking+"\\n"+main;
assert.doesNotMatch(publicCopy,/Certeza da app/u,"copy deve usar a personagem: Certeza do Apronso");
assert.doesNotMatch(ranking,/tester simulado|menos farming|Em produção, cada liga|experiência deverá/u,"Ranking não deve expor copy de protótipo/técnica");
assert.match(ranking,/participante simulado/u,"modo de demonstração continua transparente");
assert.match(ranking,/Certeza/u,"Ranking mantém a fronteira entre atividade e conhecimento");
assert.match(main,/Certeza do Apronso/u,"métrica pedagógica usa vocabulário consistente");
console.log("✓ final public RC copy/polish audit passed");
''', encoding="utf8")

    technical = ROOT / "scripts" / "technical-gate.mjs"
    technical_text = technical.read_text(encoding="utf8")
    marker = '  ["Higiene do source","npm",["run","source:hygiene"]]'
    additions = '  ["Catálogo nacional de escolas","node",["scripts/school-catalog-audit.mjs"]],\n  ["Polish final do RC público","node",["scripts/final-public-rc-audit.mjs"]],\n'
    if "Catálogo nacional de escolas" not in technical_text:
        technical_text = technical_text.replace(marker, additions + marker)
    elif "Polish final do RC público" not in technical_text:
        technical_text = technical_text.replace(marker, '  ["Polish final do RC público","node",["scripts/final-public-rc-audit.mjs"]],\n' + marker)
    technical.write_text(technical_text, encoding="utf8")


def main() -> None:
    mainland = mainland_catalogue()
    rows = mainland + island_rows(AZORES, "Açores", "az") + island_rows(MADEIRA, "Madeira", "mad")
    ids = [row["id"] for row in rows]
    if len(ids) != len(set(ids)):
        raise RuntimeError("Duplicate school IDs in national catalogue")
    write_catalogue(rows)
    patch_app()
    write_audits(len(rows))
    print(f"APProva+ school catalogue generated: mainland={len(mainland)} Açores={len(AZORES)} Madeira={len(MADEIRA)} total={len(rows)}")


if __name__ == "__main__":
    main()
