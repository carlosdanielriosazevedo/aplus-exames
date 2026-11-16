// Regras do convite "Guarda o teu plano" (sem React, testável).
import {cloudSessionHinted} from "./cloudSessionHint.js";
import {isFriendsBeta} from "./friendsBeta.js";

export const ACCOUNT_MODE_KEY="approva-account-mode";

export function accountPromptVisible(s,place){
  if(!s||isFriendsBeta(s))return false;
  if(s.identity?.mode==="authenticated"||cloudSessionHinted())return false;
  const dismissed=Number(s.accountPrompt?.dismissed)||0;
  if(place==="diagResult")return dismissed===0;
  if(place==="home")return dismissed===1&&(s.missionHistory||[]).length>=3;
  return false;
}

