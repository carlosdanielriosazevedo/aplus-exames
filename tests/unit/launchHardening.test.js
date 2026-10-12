import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {loadSessionDraft,saveSessionDraft} from '../../app/lib/sessionDraft.js';

const KEY='a25-active-session-v1';

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
});
