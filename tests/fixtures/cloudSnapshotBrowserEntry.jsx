import {createClient} from "@neondatabase/neon-js";
import {useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {AccountCloud} from "../../app/components/AccountCloud.js";
import LocalSnapshotRecovery from "../../app/components/LocalSnapshotRecovery.js";
import * as recovery from "../../app/lib/cloudRecovery.js";
import * as persistence from "../../app/lib/persistence.js";
import * as f5Accounts from "f5:app/lib/cloudAccountSession.js";
import * as f5Workspace from "f5:app/lib/accountWorkspace.js";
import * as f5Cloud from "f5:app/lib/cloud.js";
import * as f5Reliability from "f5:app/lib/cloudReliability.js";
import * as f5Persistence from "f5:app/lib/persistence.js";

window.f7={probeDataApiFallback:()=>createClient(),recovery,persistence,f5Accounts,f5Workspace,f5Cloud,f5Reliability,f5Persistence};
window.mountAccount=initial=>{
  const container=document.createElement("main");document.body.append(container);
  function Harness(){
    const [state,setState]=useState(initial);window.studyState=state;window.updateStudy=setState;
    useEffect(()=>{persistence.saveLocalState(state);},[state]);
    return <AccountCloud s={state} setS={setState} go={()=>{}}/>;
  }
  createRoot(container).render(<Harness/>);
};
window.mountLocalRecovery=(storageKey="a25")=>{
  const container=document.createElement("main");document.body.append(container);createRoot(container).render(<LocalSnapshotRecovery storageKey={storageKey}/>);
};
