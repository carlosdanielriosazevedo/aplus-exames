import * as accounts from "../../app/lib/cloudAccountSession.js";
import * as workspace from "../../app/lib/accountWorkspace.js";
import * as persistence from "../../app/lib/persistence.js";
import * as drafts from "../../app/lib/sessionDraft.js";
import * as fqa from "../../app/lib/physicsChemistryExamDraft.js";
import * as reliability from "../../app/lib/cloudReliability.js";
import * as cloud from "../../app/lib/cloud.js";
import {createRoot} from "react-dom/client";
import {useState} from "react";
import {AccountCloud} from "../../app/components/AccountCloud.js";
import {useAccountWorkspaceGuard} from "../../app/lib/useAccountWorkspaceGuard.js";

window.f5={accounts,workspace,persistence,drafts,fqa,reliability,cloud};
window.mountAccount=initial=>{
  const container=document.createElement("div");document.body.append(container);
  function Harness(){
    const [state,setState]=useState(initial);window.renderedState=state;
    return <AccountCloud s={state} setS={setState} go={()=>{}}/>;
  }
  const root=createRoot(container);root.render(<Harness/>);
  window.unmountAccount=()=>root.unmount();
};
window.mountStudy=initial=>{
  const container=document.createElement("div");document.body.append(container);
  function Harness(){
    const [state,setState]=useState(initial),guard=useAccountWorkspaceGuard(true);
    window.renderedState=state;
    if(guard.locked)return <button onClick={guard.recheck}>Reverificar conta de origem</button>;
    return <button onClick={()=>setState(current=>{const next={...current,xp:current.xp+1};persistence.saveLocalState(next);return next;})}>Continuar estudo sintético</button>;
  }
  const root=createRoot(container);root.render(<Harness/>);
};
