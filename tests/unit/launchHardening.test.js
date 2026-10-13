import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {loadSessionDraft,restartDiagnosticDraft,saveSessionDraft} from '../../app/lib/sessionDraft.js';
import {loadLocalStateStatus,saveLocalState} from '../../app/lib/persistence.js';

const KEY='a25-active-session-v1';
const FRIENDS_KEY='a25-friends-active-session-v1';
const STATE_KEY='a25';

function diagnosticDraft(overrides={}){
  return {
    version:4,
    kind:'diagnostic',
    phase:'answering',
    sessionId:'launch-hardening',
    responses:[],
    pendingResponse:null,
    current:{id:'q1'},
    ...overrides
  };
}

describe('November launch hardening',()=>{
  let memory,sessionMemory;
  beforeEach(()=>{
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-12T12:00:00Z'));
    memory=new Map();
    sessionMemory=new Map();
    global.localStorage={
      getItem:key=>memory.get(key)??null,
      setItem:(key,value)=>memory.set(key,String(value)),
      removeItem:key=>memory.delete(key)
    };
    global.sessionStorage={
      getItem:key=>sessionMemory.get(key)??null,
      setItem:(key,value)=>sessionMemory.set(key,String(value)),
      removeItem:key=>sessionMemory.delete(key)
    };
  });

  afterEach(()=>{
    vi.useRealTimers();
    delete global.localStorage;
    delete global.sessionStorage;
  });

  it('keeps a fresh empty diagnostic draft during a short accidental refresh',()=>{
    saveSessionDraft(diagnosticDraft());
    vi.advanceTimersByTime(4*60*1000+59*1000);
    expect(loadSessionDraft('internal')).not.toBeNull();
  });

  it('discards an empty diagnostic draft once it is stale',()=>{
    saveSessionDraft(diagnosticDraft());
    vi.advanceTimersByTime(5*60*1000+1000);
    expect(loadSessionDraft('internal')).toBeNull();
    expect(memory.has(KEY)).toBe(false);
  });

  it('preserves real diagnostic progress even after the empty-draft timeout',()=>{
    saveSessionDraft(diagnosticDraft({responses:[{responseId:'r1',itemId:'q1',correct:true}]}));
    vi.advanceTimersByTime(30*60*1000);
    expect(loadSessionDraft('internal')?.responses).toHaveLength(1);
  });

  it('falls back to sessionStorage when localStorage cannot save the diagnostic draft',()=>{
    global.localStorage.setItem=()=>{throw new Error('local storage blocked')};
    expect(saveSessionDraft(diagnosticDraft({sessionId:'fallback'}))).toBe(true);
    expect(sessionMemory.has(KEY)).toBe(true);
    expect(loadSessionDraft('internal')?.sessionId).toBe('fallback');
  });

  it('falls back to sessionStorage when localStorage cannot save app state',()=>{
    global.localStorage.setItem=()=>{throw new Error('local storage blocked')};
    expect(saveLocalState({betaMode:'internal',goal:19,scores:{}})).toBe(true);
    expect(sessionMemory.has(STATE_KEY)).toBe(true);
    const loaded=loadLocalStateStatus({goal:17},()=>({}));
    expect(loaded.error).toBe(false);
    expect(loaded.state?.goal).toBe(19);
  });

  it('prefers the newer session fallback over an older local snapshot',()=>{
    memory.set(STATE_KEY,JSON.stringify({goal:14,_savedAt:1}));
    sessionMemory.set(STATE_KEY,JSON.stringify({goal:18,_savedAt:2}));
    const loaded=loadLocalStateStatus({goal:17},()=>({}));
    expect(loaded.state?.goal).toBe(18);
  });

  it('restarts only the internal diagnostic draft without touching the friends draft',()=>{
    memory.set(KEY,JSON.stringify(diagnosticDraft({sessionId:'internal'})));
    memory.set(FRIENDS_KEY,JSON.stringify(diagnosticDraft({sessionId:'friends',betaMode:'friends_beta'})));
    expect(restartDiagnosticDraft('internal')).toEqual({ok:true,cleared:true});
    expect(memory.has(KEY)).toBe(false);
    expect(memory.has(FRIENDS_KEY)).toBe(true);
  });

  it('restarts only the friends diagnostic draft when beta friends is active',()=>{
    memory.set(KEY,JSON.stringify(diagnosticDraft({sessionId:'internal'})));
    memory.set(FRIENDS_KEY,JSON.stringify(diagnosticDraft({sessionId:'friends',betaMode:'friends_beta'})));
    expect(restartDiagnosticDraft('friends_beta')).toEqual({ok:true,cleared:true});
    expect(memory.has(KEY)).toBe(true);
    expect(memory.has(FRIENDS_KEY)).toBe(false);
  });

  it('fails closed if every available storage refuses to remove an existing diagnostic draft',()=>{
    memory.set(KEY,JSON.stringify(diagnosticDraft({sessionId:'blocked'})));
    sessionMemory.set(KEY,JSON.stringify(diagnosticDraft({sessionId:'blocked',savedAt:2})));
    global.localStorage.removeItem=()=>{throw new Error('storage blocked')};
    global.sessionStorage.removeItem=()=>{throw new Error('storage blocked')};
    expect(restartDiagnosticDraft('internal')).toEqual({ok:false,reason:'storage_clear_failed'});
    expect(memory.has(KEY)).toBe(true);
  });

  it('refuses to erase a non-diagnostic draft',()=>{
    memory.set(KEY,JSON.stringify({kind:'mission',sessionId:'m1'}));
    expect(restartDiagnosticDraft('internal')).toEqual({ok:false,reason:'not_diagnostic'});
    expect(memory.has(KEY)).toBe(true);
  });
});
