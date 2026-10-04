import fs from "node:fs";

function rewrite(path, changes){
  let source=fs.readFileSync(path,"utf8");
  for(const [from,to] of changes){
    if(!source.includes(from))throw new Error(`${path}: expected text not found: ${from.slice(0,90)}`);
    source=source.replace(from,to);
  }
  fs.writeFileSync(path,source);
}

rewrite("app/page.js",[
  ["Cada disciplina usa o mesmo workspace e mantém progresso próprio. O conteúdo e os motores de resposta são validados separadamente antes de cada disciplina sair da fase foundation.","Cada disciplina usa o mesmo espaço de estudo e mantém progresso próprio. O conteúdo e os motores de resposta são validados separadamente antes de ficarem disponíveis para todos os alunos."],
  ["Diagnóstico bloqueado pelo gate editorial","Ainda não há perguntas suficientes para este diagnóstico"],
  ["Este modo só permite conteúdo revisto e ainda não existem perguntas elegíveis suficientes. Volta ao modo Interno ou valida conteúdo no painel de revisão.","Para não te avaliar com perguntas que ainda não passaram pela nossa revisão, este diagnóstico fica temporariamente indisponível com a matéria selecionada. Podes atualizar a matéria dada e tentar novamente."],
  ["Prova completa · disponível quando o motor de exame estiver validado.","Prova completa · ainda não disponível nesta versão de teste."],
  ["🔒 A aguardar esclarecimento sobre utilização dos conteúdos oficiais","🔒 Ainda não disponível nesta versão de teste"]
]);

rewrite("app/components/chrome.js",[
  ["export function StudentNav({active, go}){\n  return (\n    <nav className=\"studentNav\" aria-label=\"Navegação principal\">\n      {STUDENT_NAV.map(([id,label]) => (","export function StudentNav({active, go, s=null}){\n  const rows=s&&isFriendsBeta(s)?STUDENT_NAV.filter(([id])=>id!==\"ranking\"):STUDENT_NAV;\n  return (\n    <nav className=\"studentNav\" aria-label=\"Navegação principal\">\n      {rows.map(([id,label]) => ("],
  ["<button type=\"button\" onClick={()=>go(\"home\")} aria-label={`Sequência: ${daily.streak} dias`}>🔥 <b>{daily.streak}</b></button><button type=\"button\" onClick={()=>go(\"ranking\")} aria-label={`${s.xp} XP`}>🏆 <b>{s.xp}</b></button>{children}","<button type=\"button\" onClick={()=>go(\"home\")} aria-label={`Sequência: ${daily.streak} dias`}>🔥 <b>{daily.streak}</b></button>{!isFriendsBeta(s)&&<button type=\"button\" onClick={()=>go(\"ranking\")} aria-label={`${s.xp} XP`}>🏆 <b>{s.xp}</b></button>}{children}"]
]);

rewrite("app/components/PhysicsChemistrySubject.js",[
  ["const sharedNav=<StudentNav active={view===\"home\"?\"home\":view===\"progress\"?\"progress\":\"train\"} go={go}/>;","const sharedNav=<StudentNav active={view===\"home\"?\"home\":view===\"progress\"?\"progress\":\"train\"} go={go} s={s}/>;"]
]);

rewrite("app/components/SecondaryScreens.js",[
  ["<div className=\"demoRankingWarning\"><b>DEMONSTRAÇÃO LOCAL</b><span>Os outros nomes e XP desta versão são simulados para testarmos a experiência. O ranking real só será ligado quando existir backend multiutilizador.</span></div>","<div className=\"demoRankingWarning\"><b>PRÉ-VISUALIZAÇÃO DO RANKING</b><span>Esta área usa participantes simulados e não faz parte do teste privado atual. Nenhum resultado aqui representa outros alunos reais.</span></div>"]
]);

console.log("Closed-beta surface polished: internal wording removed and ranking hidden from FQ A friends beta navigation.");
