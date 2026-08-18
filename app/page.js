'use client'

import { useMemo, useState } from 'react'

const questions = [
  { id: 1, area: 'Álgebra', text: 'Se 3x − 5 = 16, qual é o valor de x?', options: ['5','6','7','8'], answer: 2, xp: 20 },
  { id: 2, area: 'Probabilidades', text: 'Num saco há 3 bolas vermelhas e 2 azuis. Qual é a probabilidade de sair vermelha?', options: ['2/5','1/2','3/5','3/2'], answer: 2, xp: 20 },
  { id: 3, area: 'Funções', text: "Se f'(x) > 0 num intervalo, o que podemos concluir nesse intervalo?", options: ['f é decrescente','f é constante','f é crescente','f é sempre positiva'], answer: 2, xp: 30 },
  { id: 4, area: 'Geometria', text: 'Qual é a distância entre A(1,2) e B(4,6)?', options: ['3','4','5','7'], answer: 2, xp: 20 },
  { id: 5, area: 'Funções', text: 'Se f(x)=x³−3x, qual é f\'(x)?', options: ['3x²−3','x²−3','3x²−3x','x³−3'], answer: 0, xp: 30 },
  { id: 6, area: 'Números complexos', text: 'No plano complexo, a que ponto corresponde z=3−2i?', options: ['(−2,3)','(3,−2)','(3,2)','(−3,−2)'], answer: 1, xp: 30 }
]

const explanation = {
  1: '3x=21, logo x=7.',
  2: 'Há 3 casos favoráveis em 5 possíveis: 3/5.',
  3: 'Derivada positiva implica que a função é crescente nesse intervalo.',
  4: '√[(4−1)²+(6−2)²]=√25=5.',
  5: 'A derivada de x³ é 3x² e a de −3x é −3.',
  6: 'A parte real é a abcissa e a parte imaginária é a ordenada.'
}

export default function Home() {
  const [step, setStep] = useState('welcome')
  const [goal, setGoal] = useState(17)
  const [minutes, setMinutes] = useState(20)
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(1)

  const correct = useMemo(() => answers.filter(a => a.correct).length, [answers])
  const prep = Math.round(35 + (correct / Math.max(answers.length, 1)) * 45)

  function answerQuestion(idx) {
    setSelected(idx)
    setShowFeedback(true)
  }

  function nextQuestion() {
    const q = questions[qIndex]
    const isCorrect = selected === q.answer
    setAnswers([...answers, { id: q.id, correct: isCorrect, area: q.area }])
    if (isCorrect) setXp(xp + q.xp)
    setSelected(null)
    setShowFeedback(false)
    if (qIndex < questions.length - 1) setQIndex(qIndex + 1)
    else setStep('result')
  }

  function startMission() {
    setStep('mission')
    setQIndex(2)
    setSelected(null)
    setShowFeedback(false)
  }

  return (
    <main className="shell">
      <div className="phone">
        <header className="brand">A<span>+</span> EXAMES</header>

        {step === 'welcome' && <section className="screen center">
          <div className="eyebrow">Matemática A · 635</div>
          <h1>Estuda com um plano feito para a nota que queres.</h1>
          <p>Diagnóstico, missões diárias, progresso e treino para o Exame Nacional.</p>
          <button onClick={() => setStep('goal')}>Começar</button>
        </section>}

        {step === 'goal' && <section className="screen">
          <div className="eyebrow">Passo 1 de 2</div>
          <h2>Que nota queres atingir?</h2>
          <div className="goal">{goal}<small> valores</small></div>
          <input type="range" min="10" max="20" value={goal} onChange={e => setGoal(+e.target.value)} />
          <div className="rangeLabels"><span>10</span><span>20</span></div>
          <h3>Quanto tempo consegues estudar por dia?</h3>
          <div className="chips">{[10,20,30,45].map(m => <button key={m} className={minutes===m?'chip active':'chip'} onClick={() => setMinutes(m)}>{m} min</button>)}</div>
          <button onClick={() => setStep('diagnostic')}>Fazer diagnóstico</button>
        </section>}

        {step === 'diagnostic' && <section className="screen">
          <div className="topline"><span>Diagnóstico</span><span>{qIndex+1}/{questions.length}</span></div>
          <div className="progress"><i style={{width:`${((qIndex+1)/questions.length)*100}%`}} /></div>
          <div className="topic">{questions[qIndex].area}</div>
          <h2>{questions[qIndex].text}</h2>
          <div className="options">{questions[qIndex].options.map((o,i) => <button key={o} className={selected===i?'option selected':'option'} disabled={showFeedback} onClick={() => answerQuestion(i)}><b>{String.fromCharCode(65+i)}</b>{o}</button>)}</div>
          {showFeedback && <div className={selected===questions[qIndex].answer?'feedback ok':'feedback bad'}>
            <strong>{selected===questions[qIndex].answer?'Correto!':'Ainda não.'}</strong>
            <span>{explanation[questions[qIndex].id]}</span>
            <button onClick={nextQuestion}>Continuar</button>
          </div>}
        </section>}

        {step === 'result' && <section className="screen center">
          <div className="eyebrow">Diagnóstico concluído</div>
          <div className="scoreRing">{prep}<small>/100</small></div>
          <h2>Índice de Preparação</h2>
          <p>Objetivo: <b>{goal} valores</b> · Plano diário: <b>{minutes} min</b></p>
          <div className="card left"><b>Prioridade atual</b><span>Funções · monotonia e interpretação da derivada</span></div>
          <button onClick={() => setStep('home')}>Ver o meu plano</button>
        </section>}

        {step === 'home' && <section className="screen">
          <div className="topline"><span>Olá, Diogo 👋</span><span>🔥 {streak} dia</span></div>
          <div className="heroCard">
            <small>MISSÃO DE HOJE</small>
            <h2>Monotonia e derivadas</h2>
            <p>6 questões · ~{minutes} min</p>
            <button onClick={startMission}>Começar missão</button>
          </div>
          <div className="grid2">
            <div className="stat"><small>Objetivo</small><b>{goal} valores</b></div>
            <div className="stat"><small>XP</small><b>{xp}</b></div>
          </div>
          <div className="card left"><small>Preparação</small><b>{prep}/100</b><div className="miniProgress"><i style={{width:`${prep}%`}} /></div></div>
          <div className="card left"><small>Próximo foco</small><b>Probabilidades</b><span>Depois da missão atual.</span></div>
        </section>}

        {step === 'mission' && <section className="screen">
          <div className="topline"><span>Missão diária</span><span>+{xp} XP</span></div>
          <div className="progress"><i style={{width:`${((qIndex-1)/4)*100}%`}} /></div>
          <div className="topic">{questions[qIndex].area}</div>
          <h2>{questions[qIndex].text}</h2>
          <div className="options">{questions[qIndex].options.map((o,i) => <button key={o} className={selected===i?'option selected':'option'} disabled={showFeedback} onClick={() => answerQuestion(i)}><b>{String.fromCharCode(65+i)}</b>{o}</button>)}</div>
          {showFeedback && <div className={selected===questions[qIndex].answer?'feedback ok':'feedback bad'}>
            <strong>{selected===questions[qIndex].answer?'Muito bem!':'Vamos corrigir isto.'}</strong>
            <span>{explanation[questions[qIndex].id]}</span>
            <button onClick={() => {
              const q = questions[qIndex]; const good = selected===q.answer; if(good) setXp(xp+q.xp);
              setSelected(null); setShowFeedback(false);
              if(qIndex < 5) setQIndex(qIndex+1); else { setStreak(streak+1); setStep('done') }
            }}>Continuar</button>
          </div>}
        </section>}

        {step === 'done' && <section className="screen center">
          <div className="celebrate">🔥</div>
          <h1>Missão concluída</h1>
          <p>Ganhaste XP e reforçaste o teu progresso de hoje.</p>
          <div className="grid2"><div className="stat"><small>Streak</small><b>{streak} dias</b></div><div className="stat"><small>XP total</small><b>{xp}</b></div></div>
          <button onClick={() => setStep('home')}>Voltar ao início</button>
        </section>}
      </div>
    </main>
  )
}
