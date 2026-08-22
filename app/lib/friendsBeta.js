
import {betaSummary,exportBetaPayload} from "./beta.js";

export const FRIENDS_BETA_MODE="friends_beta";
export const FRIENDS_BETA_COHORT="Amigos · teste de experiência";

export function friendsBetaRequested(search=""){
  try{
    return new URLSearchParams(String(search||"")).get("beta")==="friends";
  }catch{return false}
}

function randomPart(){
  return Math.random().toString(36).replace(/[^a-z0-9]/gi,"").slice(2,8).toUpperCase().padEnd(6,"X");
}

export function createFriendsBetaCode(){
  return `AMG-${randomPart()}`;
}

export function activateFriendsBeta(state,now=Date.now()){
  const current=state?.betaParticipant?.code||"";
  const keepCode=state?.betaMode===FRIENDS_BETA_MODE && /^AMG-[A-Z0-9]{6}$/.test(current);
  const code=keepCode?current:createFriendsBetaCode();

  return {
    ...(state||{}),
    betaMode:FRIENDS_BETA_MODE,
    betaParticipant:{
      ...(state?.betaParticipant||{}),
      code,
      cohort:FRIENDS_BETA_COHORT
    },
    betaTesterMeta:{
      ...(state?.betaTesterMeta||{}),
      mode:FRIENDS_BETA_MODE,
      startedAt:state?.betaTesterMeta?.startedAt||now,
      purpose:"ux_experience",
      contentStatus:"unreviewed_provisional"
    }
  };
}

export function markFriendsBetaConsent(state,now=Date.now()){
  const active=activateFriendsBeta(state,now);
  return {
    ...active,
    betaTesterMeta:{
      ...(active.betaTesterMeta||{}),
      consentAt:active.betaTesterMeta?.consentAt||now
    }
  };
}

export function isFriendsBeta(state){
  return state?.betaMode===FRIENDS_BETA_MODE;
}

export function friendsBetaReport(state){
  const payload=exportBetaPayload(state);
  return {
    ...payload,
    schema:"aplus-friends-beta-v1",
    mode:FRIENDS_BETA_MODE,
    disclaimer:"Teste de experiência. Conteúdo ainda em revisão pedagógica; índices e níveis são provisórios.",
    summary:betaSummary(state),
    testerMeta:{
      startedAt:state?.betaTesterMeta?.startedAt||null,
      consentAt:state?.betaTesterMeta?.consentAt||null,
      appVersion:"4.2.0"
    }
  };
}
