const {mkdirSync,readFileSync,writeFileSync,existsSync,statSync}=require('node:fs');
const {join,relative}=require('node:path');
const assert=require('node:assert/strict');
const {validateMatrix}=require('./workspace-matrix-contract.cjs');
function requirePng(images,name,label){
  const file=images.find(image=>image.name===name);
  assert.ok(file&&existsSync(file.path),`Missing persistent PNG: ${label}/${name}`);
  assert.ok(readFileSync(file.path).subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),`Invalid PNG: ${file.path}`);
}
class WorkspaceMatrixReporter{
  onBegin(config){this.config=config;this.cases=[];this.artifacts=[];this.recoveries=[];this.surfaces=[]}
  onTestEnd(test,result){
    for(const attachment of result.attachments)if(attachment.path&&existsSync(attachment.path)){
      this.artifacts.push({test:test.title,name:attachment.name,contentType:attachment.contentType,path:relative(this.config.projects[0].outputDir,attachment.path),bytes:statSync(attachment.path).size});
    }
    for(const attachment of result.attachments)if(attachment.name==='workspace-raw'&&attachment.path){
      this.cases.push({...JSON.parse(readFileSync(attachment.path,'utf8')),images:result.attachments.filter(a=>a.contentType==='image/png'&&a.path).map(a=>({name:a.name,path:a.path}))});
    }
    for(const attachment of result.attachments)if(attachment.path&&['recovery-raw','shell-surfaces-raw'].includes(attachment.name)){
      (attachment.name==='recovery-raw'?this.recoveries:this.surfaces).push({...JSON.parse(readFileSync(attachment.path,'utf8')),images:result.attachments.filter(a=>a.contentType==='image/png'&&a.path).map(a=>({name:a.name,path:a.path}))});
    }
  }
  onEnd(result){
    // CI lists discovered tests before executing them. Discovery has no
    // measurements; the subsequent execution still requires all 48 cases.
    if(process.argv.includes('--list'))return;
    const dir=join(this.config.projects[0].outputDir,'workspace-matrix');mkdirSync(dir,{recursive:true});
    writeFileSync(join(dir,'raw-cases.json'),JSON.stringify(this.cases,null,2));
    writeFileSync(join(dir,'artifacts.json'),JSON.stringify({files:this.artifacts,recoveryCases:this.recoveries,shellCases:this.surfaces},null,2));
    // A focused run or a local shard is explicitly partial. Full CI must have
    // every seed at every viewport/motion; missing data fails the whole run.
    const partial=!!this.config.shard||this.cases.length<48&&!!process.env.WORKSPACE_FOCUSED;
    if(partial&&!this.cases.length){writeFileSync(join(dir,'cross-state-comparison.json'),JSON.stringify({status:'PARTIAL',reason:'No matrix tests selected in this local run'}));return}
    try{
      for(const c of this.cases)for(const subject of ['math-a','portuguese','physics-chemistry-a'])for(const tab of ['Aprender','Treinar']){
        const names=[`${subject}-${tab}`];
        if(c.xp===123456&&c.reducedMotion==='reduce')names.push(`${subject}-${tab}-long`);
        for(const name of names)requirePng(c.images,name,`${c.width}/${c.beta}`);
      }
      if(!partial){assert.equal(this.recoveries.length,24,'All recovery raw JSONs required');assert.equal(this.surfaces.length,12,'All auxiliary raw JSONs required')}
      for(const c of this.recoveries)for(const subject of ['portuguese','physics-chemistry-a']){
        for(const tab of ['Aprender','Treinar']){
          assert.equal(c.rows.filter(r=>r.subject===subject&&r.tab===tab).length,1,'Recovery menu coverage');
          requirePng(c.images,`${subject}-${tab}-recovery`,`${c.width}/${c.beta}`);
        }
        assert.equal(c.rows.filter(r=>r.subject===subject&&r.phase==='recovered').length,1,'Confirmed recovery coverage');
      }
      for(const c of this.surfaces)for(const subject of ['math-a','portuguese','physics-chemistry-a'])for(const name of ['progress','ranking','practice-setup','exams','review','subject-manager']){
        assert.equal(c.rows.filter(r=>r.subject===subject&&r.name===name).length,1,'Auxiliary route coverage');
        requirePng(c.images,`${subject}-${name}`,`${c.width}/${c.beta}`);
      }
      const summary=validateMatrix(this.cases,{partial});
      writeFileSync(join(dir,'cross-state-comparison.json'),JSON.stringify(summary,null,2));
      console.log(`WORKSPACE MATRIX: PASS (${this.cases.length} raw cases; ${partial?'partial':'complete'})`);
    }catch(error){
      writeFileSync(join(dir,'cross-state-comparison.json'),JSON.stringify({status:'FAIL',error:String(error),partial},null,2));
      console.error(`WORKSPACE MATRIX: FAIL ${error}`);
      return {status:'failed'};
    }
  }
}
module.exports=WorkspaceMatrixReporter;
