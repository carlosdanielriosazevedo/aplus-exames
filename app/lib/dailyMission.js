
import {localDayKey,missionCompletedToday} from "./engagement.js";
import {TAXONOMY} from "../data/content.js";
import {isThemeInAcademicScope,isSubtopicInAcademicScope} from "./curriculumScope.js";

export function emptyDailyMission(){
  return {
    version:1,
    assignment:null,
    prompt:{
      lastShownDay:null,
      lastDismissedDay:null,
      lastStartedDay:null
    }
  };
}

export function normalizeDailyMission(state){
  const raw=state?.dailyMission;
  if(raw?.version===1){
    return {
      ...emptyDailyMission(),
      ...raw,
      prompt:{...emptyDailyMission().prompt,...(raw.prompt||{})}
    };
  }
  return emptyDailyMission();
}

export function ensureDailyMissionAssignment(state,plan,at=Date.now()){
  if(!state || !plan)return state;
  const day=localDayKey(at);
  const dailyMission=normalizeDailyMission(state);

  if(dailyMission.assignment?.day===day && dailyMission.assignment?.plan){
    return {...state,dailyMission};
  }

  return {
    ...state,
    dailyMission:{
      ...dailyMission,
      assignment:{
        day,
        assignedAt:at,
        plan
      }
    }
  };
}

export function missionPlanForToday(state,fallbackPlan,at=Date.now()){
  const dailyMission=normalizeDailyMission(state);
  const day=localDayKey(at);
  return dailyMission.assignment?.day===day && dailyMission.assignment?.plan
    ?dailyMission.assignment.plan
    :fallbackPlan;
}

export function markDailyMissionPromptShown(state,at=Date.now()){
  const day=localDayKey(at);
  const dailyMission=normalizeDailyMission(state);
  return {
    ...state,
    dailyMission:{
      ...dailyMission,
      prompt:{
        ...dailyMission.prompt,
        lastShownDay:day
      }
    }
  };
}

export function dismissDailyMissionPrompt(state,at=Date.now()){
  const day=localDayKey(at);
  const dailyMission=normalizeDailyMission(state);
  return {
    ...state,
    dailyMission:{
      ...dailyMission,
      prompt:{
        ...dailyMission.prompt,
        lastShownDay:day,
        lastDismissedDay:day
      }
    }
  };
}

export function markDailyMissionStarted(state,at=Date.now()){
  const day=localDayKey(at);
  const dailyMission=normalizeDailyMission(state);
  return {
    ...state,
    dailyMission:{
      ...dailyMission,
      prompt:{
        ...dailyMission.prompt,
        lastShownDay:day,
        lastStartedDay:day
      }
    }
  };
}

export function dailyMissionPromptDecision(state,{
  plan=null,
  diagnosticDone=state?.diagnosticDone===true,
  pausedDraft=null,
  at=Date.now()
}={}){
  const day=localDayKey(at);
  const dailyMission=normalizeDailyMission(state);

  if(!diagnosticDone)return {show:false,reason:"diagnostic_not_done"};
  if(missionCompletedToday(state,at))return {show:false,reason:"mission_done"};
  if(pausedDraft && pausedDraft.kind!=="mission")return {show:false,reason:"other_session_paused"};

  if(pausedDraft?.kind==="mission"){
    return {
      show:true,
      mode:"resume",
      reason:"mission_paused",
      day,
      sessionId:pausedDraft.sessionId||null,
      plan:pausedDraft.plan||missionPlanForToday(state,plan,at)
    };
  }

  const currentPlan=missionPlanForToday(state,plan,at);
  if(!currentPlan || currentPlan.type==="blocked"){
    return {show:false,reason:"mission_unavailable"};
  }

  if(dailyMission.prompt?.lastShownDay===day){
    return {show:false,reason:"already_shown_today"};
  }

  return {
    show:true,
    mode:"new",
    reason:"first_home_today",
    day,
    sessionId:null,
    plan:currentPlan
  };
}

export function migrateDailyMission(state){
  if(!state)return state;
  const dailyMission=normalizeDailyMission(state);
  const assignedThemeId=dailyMission.assignment?.plan?.themeId||null;
  const assignedTheme=assignedThemeId?TAXONOMY.find(t=>t.id===assignedThemeId):null;
  const assignedFocus=dailyMission.assignment?.plan?.microcompetencyId||dailyMission.assignment?.plan?.focus||null;
  const assignment=assignedTheme && (!isThemeInAcademicScope(assignedTheme,state.profile)||
    (assignedFocus&&!isSubtopicInAcademicScope(assignedTheme,assignedFocus,state.profile)))
    ?null
    :dailyMission.assignment;
  return {
    ...state,
    dailyMission:{...dailyMission,assignment},
    dailyMissionModelVersion:1
  };
}
