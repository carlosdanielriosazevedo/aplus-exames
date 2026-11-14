const {mkdirSync,readFileSync,writeFileSync}=require('node:fs');
const {join}=require('node:path');
const {validateMatrix}=require('./workspace-matrix-contract.cjs');
class WorkspaceMatrixReporter{
  onBegin(config){this.config=config;this.cases=[]}
  onTestEnd(test,result){
    for(const attachment of result.attachments)if(attachment.name==='workspace-raw'&&attachment.path){
      this.cases.push(JSON.parse(readFileSync(attachment.path,'utf8')));
    }
  }
  onEnd(result){
    // CI lists discovered tests before executing them. Discovery has no
    // measurements; the subsequent execution still requires all 48 cases.
    if(process.argv.includes('--list'))return;
    const dir=join(this.config.projects[0].outputDir,'workspace-matrix');mkdirSync(dir,{recursive:true});
    writeFileSync(join(dir,'raw-cases.json'),JSON.stringify(this.cases,null,2));
    // A focused run or a local shard is explicitly partial. Full CI must have
    // every seed at every viewport/motion; missing data fails the whole run.
    const partial=!!this.config.shard||this.cases.length<48&&!!process.env.WORKSPACE_FOCUSED;
    if(partial&&!this.cases.length){writeFileSync(join(dir,'cross-state-comparison.json'),JSON.stringify({status:'PARTIAL',reason:'No matrix tests selected in this local run'}));return}
    try{
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
