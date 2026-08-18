"use client";

import { useState } from "react";

const goals = ["10–12", "13–15", "16–17", "18–20"];

export default function Page() {
  const [screen, setScreen] = useState("welcome");
  const [goal, setGoal] = useState("");
  const [daily, setDaily] = useState("15 min");

  if (screen === "goal") {
    return (
      <main className="shell light">
        <section className="onboarding">
          <div className="topline"><span className="brand darkBrand">A<span>+</span> EXAMES</span><span className="step">1 de 2</span></div>
          <div className="progress"><i /></div>
          <div className="questionWrap">
            <p className="eyebrow violet">O TEU OBJETIVO</p>
            <h1>Que nota queres alcançar a Matemática A?</h1>
            <p className="muted">Não é um compromisso. Serve para ajustarmos a dificuldade e o ritmo do teu plano.</p>
            <div className="goalGrid">
              {goals.map(g => <button key={g} onClick={()=>setGoal(g)} className={goal===g ? "goal selected":"goal"}><strong>{g}</strong><span>valores</span></button>)}
            </div>
            <button disabled={!goal} className="primary wide" onClick={()=>setScreen("time")}>Continuar</button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "time") {
    return (
      <main className="shell light">
        <section className="onboarding">
          <div className="topline"><span className="brand darkBrand">A<span>+</span> EXAMES</span><span className="step">2 de 2</span></div>
          <div className="progress full"><i /></div>
          <div className="questionWrap">
            <p className="eyebrow violet">RITMO DE ESTUDO</p>
            <h1>Quanto tempo consegues dedicar por dia?</h1>
            <p className="muted">Vamos construir missões suficientemente curtas para caberem na tua rotina.</p>
            <div className="timeList">
              {["10 min","15 min","20 min","30 min"].map(t => <button key={t} onClick={()=>setDaily(t)} className={daily===t ? "time selected":"time"}><span>⚡</span><strong>{t}</strong><small>por dia</small></button>)}
            </div>
            <button className="primary wide" onClick={()=>setScreen("diagnostic")}>Começar diagnóstico</button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "diagnostic") {
    return (
      <main className="shell light">
        <section className="result">
          <div className="brand darkBrand">A<span>+</span> EXAMES</div>
          <div className="resultCard">
            <div className="pulse">A+</div>
            <p className="eyebrow violet">PRONTO PARA COMEÇAR</p>
            <h1>Vamos descobrir onde podes ganhar mais pontos.</h1>
            <p className="muted">O diagnóstico adapta-se às tuas respostas e demora cerca de 10 minutos. No fim, recebes as tuas primeiras prioridades.</p>
            <div className="summary">
              <div><span>🎯</span><b>Objetivo</b><strong>{goal} valores</strong></div>
              <div><span>⏱</span><b>Ritmo</b><strong>{daily}/dia</strong></div>
              <div><span>🧠</span><b>Diagnóstico</b><strong>Adaptativo</strong></div>
            </div>
            <button className="primary wide" onClick={()=>alert("Aqui entra o diagnóstico adaptativo da próxima versão.")}>Começar agora</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <section className="hero">
        <nav>
          <div className="brand">A<span>+</span> EXAMES</div>
          <div className="subject">MATEMÁTICA A <b>·</b> 635</div>
        </nav>

        <div className="heroCopy">
          <div className="badge">PREPARAÇÃO PARA O EXAME NACIONAL</div>
          <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
          <p>Descobre onde estás a perder pontos e recebe um plano de treino que evolui contigo.</p>
          <button className="primary heroButton" onClick={()=>setScreen("goal")}>Descobrir o meu nível <span>→</span></button>
          <div className="micro">
            <span>⚡ 10–20 min/dia</span><span>🎯 Personalizado</span><span>📈 Progresso real</span>
          </div>
        </div>

        <div className="productPreview">
          <div className="floatCard streak"><span className="icon">🔥</span><div><small>SEQUÊNCIA</small><strong>12 dias</strong></div></div>
          <div className="phoneCard">
            <div className="phoneTop"><span>Bom trabalho, Marta 👋</span><b>1 240 XP</b></div>
            <div className="today"><small>MISSÃO DE HOJE</small><h3>Domina a monotonia</h3><p>Funções · 12 min · +80 XP</p><button>Começar missão →</button></div>
            <div className="scoreRow"><div><small>PREPARAÇÃO</small><strong>74<span>/100</span></strong></div><div className="chart"><i/><i/><i/><i/><i/><i/><i/></div></div>
            <div className="weak"><span>🎯</span><div><small>PRIORIDADE</small><b>Probabilidades</b></div><strong>58%</strong></div>
          </div>
          <div className="floatCard exam"><span className="icon">⏳</span><div><small>EXAME NACIONAL</small><strong>43 dias</strong></div></div>
          <div className="floatCard growth"><small>PREPARAÇÃO</small><strong>68 <span>→</span> 74</strong><b>+6 esta semana</b></div>
        </div>

        <div className="trust">Sem cartão · Experimenta primeiro · O teu plano só é criado depois do diagnóstico</div>
      </section>
    </main>
  );
}
