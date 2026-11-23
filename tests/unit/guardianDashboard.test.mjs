import {describe,expect,it} from "vitest";
import {guardianWeek,indexTrend,guardianChildModel,guardianTips,weeklyEmailHtml,weeklyEmailModel,formatMinutes,maskEmail,dayKey} from "../../app/lib/guardianDashboard.js";
import {guardianFixtures} from "../../app/components/guardian/guardianFixtures.js";

// Área do encarregado de educação (decisões do product owner, 2026-11-22/23).
const NOW=new Date(2026,10,23,10,0,0).getTime();
const DAY=24*60*60*1000;
const days=(entries)=>Object.fromEntries(entries.map(([offset,minutes,missions])=>[dayKey(NOW-offset*DAY),{minutes,activities:{mission:missions,training:missions?0:1}}]));

describe("semana do educando",()=>{
  it("conta dias, tempo, missões e compara com a semana anterior",()=>{
    const week=guardianWeek(days([[0,20,1],[1,10,1],[3,15,0],[8,30,1]]),{now:NOW});
    expect(week.days).toHaveLength(7);
    expect(week.days.at(-1).today).toBe(true);
    expect(week.activeDays).toBe(3);
    expect(week.previousActiveDays).toBe(1);
    expect(week.deltaActiveDays).toBe(2);
    expect(week.minutes).toBe(45);
    expect(week.missions).toBe(2);
    expect(week.streak).toBe(2);
  });
  it("a sequência conta a partir de ontem se hoje ainda não estudou",()=>{
    expect(guardianWeek(days([[1,10,1],[2,10,1],[3,10,1]]),{now:NOW}).streak).toBe(3);
    expect(guardianWeek(days([[2,10,1]]),{now:NOW}).streak).toBe(0);
  });
  it("tempo em linguagem simples",()=>{
    expect(formatMinutes(45)).toBe("45 min");
    expect(formatMinutes(95)).toBe("1 h 35 min");
    expect(formatMinutes(120)).toBe("2 h");
  });
});

describe("tendência do índice em palavras",()=>{
  const s=values=>values.map((value,i)=>({key:String(i),label:String(i),value}));
  it("a subir, estável, precisa de atenção, sem tendência",()=>{
    expect(indexTrend(s([50,52,55])).key).toBe("up");
    expect(indexTrend(s([55,56,55])).key).toBe("steady");
    expect(indexTrend(s([48,45,42])).key).toBe("attention");
    expect(indexTrend(s([48])).key).toBe("new");
    expect(indexTrend(s([50,52,55])).words).toBe("a subir");
  });
});

describe("painel e email semanal",()=>{
  const [rui,ana]=guardianFixtures(NOW).map(child=>guardianChildModel(child,{now:NOW}));
  it("modelo do painel com dados de exemplo",()=>{
    expect(rui.subjects.map(subject=>subject.trend.key)).toEqual(["up","steady"]);
    expect(rui.subjects[0].index).toBe(58);
    expect(ana.subjects[1].diagnosticDone).toBe(false);
    expect(ana.subjects[1].index).toBeNull();
  });
  it("no máximo duas sugestões, a mais útil primeiro",()=>{
    expect(ana.tips).toHaveLength(2);
    expect(ana.tips[0]).toMatch(/Ainda falta o diagnóstico de Matemática A/);
    expect(ana.tips[1]).toMatch(/Física e Química A precisa de atenção/);
    expect(ana.tips.join(" ")).not.toMatch(/ a Ana| à Ana| ao Rui/u);
    expect(guardianTips({firstName:"Rui"},{activeDays:5,streak:2},[{name:"X",diagnosticDone:true,trend:{key:"up"}}])).toHaveLength(1);
  });
  it("o email mostra esforço, diagnóstico e índice — nunca respostas, notas, comparações ou rankings",()=>{
    const html=weeklyEmailHtml(rui,{baseUrl:"https://approvamais.pt"});
    expect(weeklyEmailModel(rui).subject).toBe(`Rui: ${rui.week.activeDays} dias de estudo esta semana`);
    expect(html).toContain("Índice de preparação");
    expect(html).toContain("Não é uma previsão da nota do exame");
    expect(html).toContain("https://approvamais.pt/encarregado");
    expect(html).not.toMatch(/ranking|classifica|posição|resposta certa|resposta errada|\/20\b/iu);
    expect(html).not.toMatch(/<script/i);
  });
  it("o nome do educando é escapado no email",()=>{
    const html=weeklyEmailHtml({...rui,firstName:"<b>Rui</b>"});
    expect(html).not.toContain("<b>Rui</b>");
    expect(html).toContain("&lt;b&gt;Rui&lt;/b&gt;");
  });
  it("email mascarado no ecrã do aluno",()=>{
    expect(maskEmail("maria.silva@gmail.com")).toBe("m•••@gmail.com");
    expect(maskEmail("")).toBe("");
  });
});
