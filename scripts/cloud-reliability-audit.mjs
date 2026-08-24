
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  stateFingerprint,cloudSyncMeta,migrateCloudSync,markCloudLoaded,markCloudSaved,
  cloudConflict,conflictReason,createLocalSnapshot,mergeByStableId,safeCloudMerge
} from "../app/lib/cloudReliability.js";

const evidence=(itemId,at,source="mission")=>({
  itemId,at,source,signature:`sig-${itemId}`,cognitive:"procedure"
});

const base={
  goal:17,
  profile:{schoolYear:"12.º"},
  xp:120,
  scores:{
    t1:{domain:50,conf:30,evidence:[evidence("q1",1000)]}
  },
  missionHistory:[{completionId:"m1",at:1000,themeId:"t1"}],
  examHistory:[],
  freeTrainingSignals:[],
  learningHypotheses:[],
  cloudSync:{
    version:1,
    deviceId:"device-A",
    baseRevision:2,
    baseFingerprint:null,
    lastRemoteRevision:2,
    lastRemoteDeviceId:"device-A",
    lastSyncedAt:1000,
    lastConflict:null,
    pendingCount:0
  }
};

// Fingerprint is deterministic regardless of key insertion order.
assert.equal(
  stateFingerprint({a:1,b:{c:2,d:3}}),
  stateFingerprint({b:{d:3,c:2},a:1})
);

// Migration never discards known revision metadata.
const migrated=migrateCloudSync(base);
assert.equal(migrated.cloudSync.baseRevision,2);
assert.equal(migrated.cloudSync.deviceId,"device-A");
assert.equal(migrated.cloudSyncModelVersion,1);

// A successful save advances the known base revision.
const saved=markCloudSaved(base,{
  revision:3,
  deviceId:"device-A",
  savedState:base,
  at:2000
});
assert.equal(saved.cloudSync.baseRevision,3);
assert.equal(saved.cloudSync.lastRemoteRevision,3);
assert.equal(saved.cloudSync.lastRemoteDeviceId,"device-A");
assert.ok(saved.cloudSync.baseFingerprint);

// A load establishes a new safe base revision.
const remotePayload={schema:"aplus-student-state-v8",xp:180};
const loaded=markCloudLoaded(base,{
  revision:5,
  remoteDeviceId:"device-B",
  remoteState:remotePayload,
  at:3000
});
assert.equal(loaded.cloudSync.baseRevision,5);
assert.equal(loaded.cloudSync.lastRemoteDeviceId,"device-B");

// Remote advance is classified as conflict.
const reason=conflictReason(base,{revision:4});
assert.equal(reason.conflict,true);
assert.equal(reason.reason,"remote_advanced");

const conflicted=cloudConflict(base,{
  remoteRevision:4,
  remoteDeviceId:"device-B",
  remoteUpdatedAt:"2026-08-23T20:00:00Z",
  remoteState:remotePayload,
  at:4000
});
assert.equal(conflicted.cloudSync.lastConflict.remoteRevision,4);
assert.equal(conflicted.cloudSync.lastConflict.localBaseRevision,2);

// Local snapshots are immutable records from the caller perspective.
const snap=createLocalSnapshot(base,{label:"before conflict",at:5000});
assert.equal(snap.label,"before conflict");
assert.equal(snap.at,5000);
assert.ok(snap.fingerprint.startsWith("sf1-"));
assert.deepEqual(snap.state,base);

// Stable ID merge deduplicates and keeps the newest duplicate.
const rows=mergeByStableId(
  [{id:"x",at:10,v:"local-new"},{id:"y",at:5}],
  [{id:"x",at:1,v:"remote-old"},{id:"z",at:6}],
  x=>x.id
);
assert.equal(rows.length,3);
assert.equal(rows.find(x=>x.id==="x").v,"local-new");

// Safe merge preserves independent activity from both devices.
const local={
  ...base,
  xp:200,
  scores:{
    t1:{domain:55,conf:40,evidence:[evidence("q1",1000),evidence("q2",2000)]}
  },
  missionHistory:[{completionId:"m1",at:1000,themeId:"t1"}],
  examHistory:[{completionId:"e-local",id:"e-local",at:2500}],
  dailyMission:{deviceLocal:true},
  identity:{mode:"authenticated",authUserId:"u1"},
  cloudMeta:{local:true}
};
const remote={
  schema:"aplus-student-state-v8",
  goal:15,
  profile:{schoolYear:"11.º"},
  xp:180,
  scores:{
    t1:{domain:70,conf:70,evidence:[evidence("q1",1000),evidence("q3",3000)]},
    t2:{domain:60,conf:50,evidence:[evidence("q4",3500)]}
  },
  missionHistory:[{completionId:"m2",at:3000,themeId:"t2"}],
  examHistory:[{completionId:"e-remote",id:"e-remote",at:3200}],
  freeTrainingSignals:[],
  learningHypotheses:[{key:"h1",lastAt:3100}]
};

const combined=safeCloudMerge(local,remote);
assert.equal(combined.xp,200);
assert.equal(combined.goal,17); // intenção atual permanece local
assert.equal(combined.profile.schoolYear,"12.º");
assert.equal(combined.scores.t1.evidence.length,3);
assert.equal(combined.scores.t2.evidence.length,1);
assert.equal(combined.scores.t1.domain,null); // força recalibração posterior
assert.equal(combined.missionHistory.length,2);
assert.equal(combined.examHistory.length,2);
assert.deepEqual(combined.identity,local.identity);
assert.deepEqual(combined.dailyMission,local.dailyMission);

// No merge function exposes passwords/credentials or silently chooses a remote score.
assert.ok(!JSON.stringify(combined).toLowerCase().includes("password"));
assert.equal(combined.scores.t1.conf,0);

const cloudSource=fs.readFileSync("app/lib/cloud.js","utf8");
assert.ok(cloudSource.includes('.eq("revision",Number(expectedRevision)||0)'),"Save cloud perdeu compare-and-swap por revisão.");
assert.ok(cloudSource.includes("knownRemote"),"Revision 0 deixou de distinguir primeira gravação de base remota conhecida.");
assert.ok(cloudSource.includes("CLOUD_SCHEMA_OUTDATED"),"Cloud deixou de bloquear sync quando a migration de revisões não está aplicada.");

console.log("✓ cloud reliability: revisions, conflict detection, snapshots and safe activity merge validated");
