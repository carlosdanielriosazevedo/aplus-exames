import {useState} from 'react';
import CloudRecovery from '../../app/components/CloudSnapshotRecovery.js';
import GraderConsent from '../../app/components/GraderValidationConsent.js';
import * as validation from '../../app/lib/graderValidationDataset.js';
import {createRoot} from 'react-dom/client';
import App from '../../app/clientApp.js';
import LocalRecovery from '../../app/components/LocalSnapshotRecovery.js';
import * as accounts from '../../app/lib/cloudAccountSession.js';
import * as workspace from '../../app/lib/accountWorkspace.js';
import * as f5Cloud from '../../app/lib/cloud.js';
import * as recovery from '../../app/lib/cloudRecovery.js';
import * as access from '../../app/lib/recoveryAccess.js';
window.probe={accounts,workspace,f5Cloud,recovery,access,validation};
window.mountActualApp=()=>{const root=document.createElement('div');document.body.append(root);createRoot(root).render(<App/>);};
window.mountLocalRecovery=()=>{const root=document.createElement('div');document.body.append(root);createRoot(root).render(<LocalRecovery/>);};
window.mountGraderConsent=()=>{const root=document.createElement('div');document.body.append(root);createRoot(root).render(<GraderConsent/>);};

window.mountCloudRecovery=initial=>{const node=document.createElement('div');document.body.append(node);function Harness(){const [s,setS]=useState(initial);window.cloudRecovered=s;return <CloudRecovery s={s} setS={setS} accountId={s.cloudAccount.accountId} normalizeAfterCloud={x=>x}/>;}createRoot(node).render(<Harness/>);};

if(new URLSearchParams(location.search).get('case')==='auth-reentry'){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',window.mountActualApp,{once:true});
  else window.mountActualApp();
}
