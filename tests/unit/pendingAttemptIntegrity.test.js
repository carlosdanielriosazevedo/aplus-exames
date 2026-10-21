import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {saveSessionDraft,loadSessionDraftStatus} from '../../app/lib/sessionDraft.js';
import {beginSubjectSession,advanceSubjectSession,recordSubjectSession} from '../../app/lib/subjectProgress.js';
import {savePortugueseMiniExamDraft} from '../../app/lib/portugueseMiniExamDraft.js';
import {savePhysicsChemistryExamDraft,loadPhysicsChemistryExamDraft} from '../../app/lib/physicsChemistryExamDraft.js';

describe('pending attempts cannot be replaced',()=>{
  let memory;
  beforeEach(()=>{
    memory=new Map();
    const storage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};
    vi.stubGlobal('localStorage',storage);vi.stubGlobal('window',{localStorage:storage});
  });
  afterEach(()=>vi.unstubAllGlobals());
  for(const kind of ['diagnostic','mission','training','mini_exam'])it(`preserves ${kind} identity and answers against another attempt`,()=>{
    const draft={kind,sessionId:'original',i:2,answers:[1,0],startedAt:123};
    expect(saveSessionDraft(draft)).toBe(true);
    expect(saveSessionDraft({...draft,sessionId:'replacement',i:0,answers:[]})).toBe(false);
    expect(saveSessionDraft({...draft,kind:'other'})).toBe(false);
    expect(loadSessionDraftStatus().draft).toMatchObject(draft);
  });
  it('does not erase or overwrite malformed recovery data',()=>{
    memory.set('a25-active-session-v1','broken');
    expect(loadSessionDraftStatus().error).toBe(true);
    expect(saveSessionDraft({kind:'mission',sessionId:'new'})).toBe(false);
    expect(memory.get('a25-active-session-v1')).toBe('broken');
  });
  for(const subjectId of ['portuguese','physics-chemistry-a'])it(`${subjectId}: preserves active position and prevents replay after history truncation`,()=>{
    const items=[{id:'q',domain:'d',competencyId:'c'}];
    let state=beginSubjectSession({xp:0},{subjectId,kind:'mission',items,sessionId:'first'});
    state=advanceSubjectSession(state,subjectId,{current:0,results:[],currentAnswer:'saved answer'});
    expect(beginSubjectSession(state,{subjectId,kind:'training',items,sessionId:'second'})).toBe(state);
    const completion={subjectId,kind:'mini_exam',items,results:[{final:true,correct:true,points:1,maxPoints:1}],sessionId:'first'};
    state=recordSubjectSession(state,completion);
    const xp=state.xp,competence=state.subjectProgress[subjectId].competence;
    state={...state,subjectProgress:{...state.subjectProgress,[subjectId]:{...state.subjectProgress[subjectId],sessions:[]}}};
    expect(recordSubjectSession(state,completion)).toBe(state);
    expect(state.xp).toBe(xp);expect(state.subjectProgress[subjectId].competence).toEqual(competence);
  });
  it('Portuguese exam refuses another attempt or model',()=>{
    const draft={examId:'mini-1',attemptId:'original',answers:{q:1},startedAt:123};
    const state=savePortugueseMiniExamDraft({},draft);
    expect(savePortugueseMiniExamDraft(state,{...draft,attemptId:'new'})).toBe(state);
    expect(savePortugueseMiniExamDraft(state,{...draft,examId:'full-1'})).toBe(state);
  });
  it('FQA exam preserves original timer and answers',()=>{
    const draft={itemIds:['q'],index:0,answers:{q:1},startedAt:123};
    expect(savePhysicsChemistryExamDraft('fqa-mini-1',draft)).toBe(true);
    expect(savePhysicsChemistryExamDraft('fqa-mini-1',{...draft,startedAt:456})).toBe(true);
    expect(loadPhysicsChemistryExamDraft('fqa-mini-1',['q'])).toMatchObject(draft);
  });
});

describe('math completion claims',()=>{
  afterEach(()=>vi.unstubAllGlobals());
  it('does not award a completion if its durable claim cannot be saved',async()=>{
    const {claimSessionCompletion}=await import('../../app/lib/reliability.js');
    vi.stubGlobal('localStorage',{getItem:()=>null,setItem:()=>{throw Error('full')}});
    expect(claimSessionCompletion('attempt')).toBe(false);
  });
  it('remembers attempts beyond the previous 120-entry limit',async()=>{
    const {claimSessionCompletion}=await import('../../app/lib/reliability.js');
    let data='[]';
    vi.stubGlobal('localStorage',{getItem:()=>data,setItem:(_,value)=>{data=value}});
    for(let i=0;i<125;i++)expect(claimSessionCompletion('attempt-'+i)).toBe(true);
    expect(claimSessionCompletion('attempt-0')).toBe(false);
  });
});

it('ignores callbacks belonging to an older subject attempt',()=>{
  const state=beginSubjectSession({},{subjectId:'portuguese',kind:'training',items:[{id:'q'}],sessionId:'current'});
  expect(advanceSubjectSession(state,'portuguese',{sessionId:'older',current:2,results:[]})).toBe(state);
});
