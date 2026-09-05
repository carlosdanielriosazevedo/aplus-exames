import {DIAGNOSTIC_BLUEPRINT,TAXONOMY,microcompetencyId} from "../data/content.js";

const YEAR_LEVEL={
  "10.º":10,
  "11.º":11,
  "12.º":12,
  "Já terminei o secundário":99
};

export function schoolYearLevel(profileOrYear){
  const raw=typeof profileOrYear==="string"?profileOrYear:profileOrYear?.schoolYear;
  return YEAR_LEVEL[raw]??null;
}

export function themeYearLevel(theme){
  const year=typeof theme==="string"?theme:theme?.year;
  if(year==="10.º")return 10;
  if(year==="11.º")return 11;
  if(year==="12.º"||year==="12.º opcional")return 12;
  return null;
}

export function isThemeInAcademicScope(theme,profile={}){
  if(!theme)return false;
  const learnerLevel=schoolYearLevel(profile);
  const contentLevel=themeYearLevel(theme);
  if(learnerLevel===null||contentLevel===null)return false;
  if(contentLevel>learnerLevel)return false;

  const optionalTrack=theme.optionalTrack||theme.optionalTopic||null;
  if(optionalTrack && learnerLevel<99){
    const selected=Array.isArray(profile?.optionalTopics)?profile.optionalTopics:[];
    return selected.includes(optionalTrack);
  }

  if(learnerLevel===99||contentLevel<learnerLevel)return true;
  return taughtSubtopicIds(profile).some(id=>id.startsWith(`mc-${contentLevel}-`) &&
    (theme.microcompetencies||[]).some(mc=>mc.id===id));
}

export function taughtSubtopicIds(profile={}){
  return Array.isArray(profile?.taughtSubtopicIds)
    ?[...new Set(profile.taughtSubtopicIds.filter(id=>typeof id==="string"))]
    :[];
}

export function currentYearThemes(profile={}){
  const level=schoolYearLevel(profile);
  if(!level||level===99)return [];
  return TAXONOMY.filter(t=>themeYearLevel(t)===level).filter(t=>{
    const optionalTrack=t.optionalTrack||t.optionalTopic||null;
    return !optionalTrack||(profile.optionalTopics||[]).includes(optionalTrack);
  });
}

export function currentYearSubtopicIds(profile={}){
  return currentYearThemes(profile).flatMap(t=>(t.microcompetencies||[]).map(mc=>mc.id));
}

export function normalizeTaughtSubtopics(profile={}){
  const valid=new Set(currentYearSubtopicIds(profile));
  return taughtSubtopicIds(profile).filter(id=>valid.has(id));
}

export function isSubtopicInAcademicScope(theme,subtopicRef,profile={}){
  const learnerLevel=schoolYearLevel(profile);
  const contentLevel=themeYearLevel(theme);
  if(learnerLevel===null||contentLevel===null||contentLevel>learnerLevel)return false;
  const id=String(subtopicRef||"").startsWith("mc-")
    ?subtopicRef
    :microcompetencyId(theme?.id,subtopicRef);
  if(!id||!(theme?.microcompetencies||[]).some(mc=>mc.id===id))return false;
  if(learnerLevel===99||contentLevel<learnerLevel)return true;
  return !!id&&normalizeTaughtSubtopics(profile).includes(id);
}

export function isQuestionInAcademicScope(item,profile={},context=null){
  if(context==="training")return true;
  const theme=TAXONOMY.find(t=>t.id===item?.themeId);
  if(!theme||!isThemeInAcademicScope(theme,profile))return false;
  return isSubtopicInAcademicScope(theme,item?.microcompetencyId||item?.focus,profile);
}

export function isEvidenceInAcademicScope(evidence,theme,profile={}){
  return isSubtopicInAcademicScope(theme,evidence?.microcompetencyId||evidence?.focus,profile);
}

export function academicScopeThemes(profile={}){
  return TAXONOMY.filter(t=>isThemeInAcademicScope(t,profile));
}

export function academicScopeThemeIds(profile={}){
  return new Set(academicScopeThemes(profile).map(t=>t.id));
}

export function diagnosticBlueprintForProfile(profile={}){
  const allowed=academicScopeThemeIds(profile);
  return DIAGNOSTIC_BLUEPRINT.filter(themeId=>allowed.has(themeId));
}

export function academicScopeSummary(profile={}){
  const themes=academicScopeThemes(profile);
  const years=[...new Set(themes.map(t=>t.year))];
  return {
    schoolYear:profile?.schoolYear||"12.º",
    themeIds:themes.map(t=>t.id),
    years,
    diagnosticBlueprint:diagnosticBlueprintForProfile(profile),
    taughtSubtopicIds:normalizeTaughtSubtopics(profile)
  };
}
