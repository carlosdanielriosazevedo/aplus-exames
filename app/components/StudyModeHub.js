"use client";
import {ApronsoNudge} from "./chrome";
import {STUDY_MODE_COPY,practiceModeCopy} from "../lib/studyModeCopy";

export default function StudyModeHub({subjectId="math-a",go}){
  return <>
    <div className="sectionIntro"><p className="eyebrow">TREINAR</p><h1>O que queres fazer?</h1></div>
    <ApronsoNudge pose="thinking">{STUDY_MODE_COPY.nudge}</ApronsoNudge>
    <div className="trainChoices">
      <button onClick={()=>go("trainingSetup")}><span>🎯</span><div><b>Praticar</b><small>{practiceModeCopy(subjectId)}</small></div><em>→</em></button>
      <button onClick={()=>go("exams")}><span>📝</span><div><b>Mini-exame</b><small>{STUDY_MODE_COPY.miniExam}</small></div><em>→</em></button>
      <button onClick={()=>go("reviewMatter")}><span>📚</span><div><b>Rever matéria</b><small>{STUDY_MODE_COPY.review}</small></div><em>→</em></button>
    </div>
  </>;
}
