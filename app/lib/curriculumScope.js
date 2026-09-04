import {DIAGNOSTIC_BLUEPRINT,TAXONOMY} from "../data/content.js";

const YEAR_LEVEL={
  "10.º":10,
  "11.º":11,
  "12.º":12,
  "Já terminei o secundário":99
};

export function schoolYearLevel(profileOrYear){
  const raw=typeof profileOrYear==="string"?profileOrYear:profileOrYear?.schoolYear;
  return YEAR_LEVEL[raw]??12;
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
  if(contentLevel===null)return true;
  if(contentLevel>learnerLevel)return false;

  const optionalTrack=theme.optionalTrack||theme.optionalTopic||null;
  if(optionalTrack && learnerLevel<99){
    const selected=Array.isArray(profile?.optionalTopics)?profile.optionalTopics:[];
    return selected.includes(optionalTrack);
  }

  return true;
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
    diagnosticBlueprint:diagnosticBlueprintForProfile(profile)
  };
}
