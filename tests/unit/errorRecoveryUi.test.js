import {readFileSync} from 'node:fs';
import {describe,expect,it} from 'vitest';

const appError=readFileSync(new URL('../../app/error.js',import.meta.url),'utf8');
const globalError=readFileSync(new URL('../../app/global-error.js',import.meta.url),'utf8');
const notFound=readFileSync(new URL('../../app/not-found.js',import.meta.url),'utf8');

describe('public launch recovery screens',()=>{
  it('offers an explicit retry for recoverable route errors',()=>{
    expect(appError).toMatch(/Tentar novamente/u);
    expect(appError).toMatch(/reset\(\)/u);
    expect(appError).toMatch(/progresso guardado não é apagado/u);
  });

  it('has a last-resort retry if the root application fails',()=>{
    expect(globalError).toMatch(/window\.location\.reload\(\)/u);
    expect(globalError).toMatch(/dados que já estavam guardados/u);
  });

  it('does not leak technical exception details to students',()=>{
    for(const source of [appError,globalError]){
      expect(source).not.toMatch(/error\.(?:message|stack|digest)/u);
    }
  });

  it('turns unknown routes into a branded safe exit',()=>{
    expect(notFound).toMatch(/Esta página não existe/u);
    expect(notFound).toMatch(/href="\/"/u);
  });
});
