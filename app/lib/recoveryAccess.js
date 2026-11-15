"use client";
import {openVerifiedAccount,verifyAccountContext,assertAccountContext,assertAccountState,accountRequestHeaders,accountError} from "./cloudAccountSession.js";
import {workspaceAccountId,selectAccountWorkspace} from "./accountWorkspace.js";

// Capabilities cannot be reconstructed from an accountId, JSON or storage.
// The owner comes from the immutable workspace and a fresh server session.
const proofs=new WeakMap();
export async function beginRecoveryAccess({select=false,expected=null}={}){
  let owner=workspaceAccountId();
  if(!owner&&!select)throw accountError("CLOUD_ACCOUNT_UNPROVEN");
  if(expected&&owner&&expected!==owner)throw accountError();
  const context=await openVerifiedAccount({expectedAccountId:owner||expected});
  if(!owner){selectAccountWorkspace(context);owner=workspaceAccountId();}
  if(owner!==context.subject||expected&&expected!==owner)throw accountError();
  const capability=Object.freeze({});proofs.set(capability,{context,owner});
  assertRecoveryAccess(capability);return capability;
}
export function assertRecoveryAccess(capability){
  const proof=proofs.get(capability);
  if(!proof||workspaceAccountId()!==proof.owner)throw accountError("CLOUD_ACCOUNT_UNPROVEN");
  assertAccountContext(proof.context);return proof.owner;
}
export async function revalidateRecoveryAccess(capability){
  assertRecoveryAccess(capability);await verifyAccountContext(proofs.get(capability).context);
  assertRecoveryAccess(capability);return capability;
}
export function assertRecoveryState(state,capability){
  assertRecoveryAccess(capability);assertAccountState(state,proofs.get(capability).context);return state;
}
export function recoveryHeaders(capability,headers={}){
  assertRecoveryAccess(capability);return accountRequestHeaders(proofs.get(capability).context,headers);
}
