import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {loadSessionDraft,restartDiagnosticDraft,saveSessionDraft} from '../../app/lib/sessionDraft.js';

const KEY='a25-active-session-v1';
const FRIENDS_KEY='a25-friends-active-session-v1';

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
  let memory;
  beforeEach(()=>{
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-12T12:00:00Z'));
    memory=new Map();
    global.localStorage={
      getItem:key=>memory.get(key)??null,
      setItem:(key,value)=>memory.set(key,String(value)),
      removeItem:key=>memory.delete(key)
    };
  });

  afterEach(()=>{
    vi.useRealTimers();
    delete global.localStorage;
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

  it('fails closed if storage refuses to remove an existing diagnostic draft',()=>{
    memory.set(KEY,JSON.stringify(diagnosticDraft({sessionId:'blocked'})));
    global.localStorage.removeItem=()=>{throw new Error('storage blocked')};
    expect(restartDiagnosticDraft('internal')).toEqual({ok:false,reason:'storage_clear_failed'});
    expect(memory.has(KEY)).toBe(true);
  });

  it('refuses to erase a non-diagnostic draft',()=>{
    memory.set(KEY,JSON.stringify({kind:'mission',sessionId:'m1'}));
    expect(restartDiagnosticDraft('internal')).toEqual({ok:false,reason:'not_diagnostic'});
    expect(memory.has(KEY)).toBe(true);
  });
});
