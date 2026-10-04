const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
const {execFileSync,spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),fixture=fs.mkdtempSync(path.join(os.tmpdir(),'prompt-pocket-release-test-'));
const files=['version.json','index.html','tutorial.html','manual.html','service-worker.js','assets/js/prompt-pocket.js','assets/js/version-check.js','assets/js/session-gate.js','assets/css/prompt-pocket.css','scripts/release.cjs'];
try{
  for(const file of files){fs.mkdirSync(path.dirname(path.join(fixture,file)),{recursive:true});fs.copyFileSync(path.join(root,file),path.join(fixture,file))}
  const run=arg=>execFileSync(process.execPath,['scripts/release.cjs',arg],{cwd:fixture,encoding:'utf8'});
  for(const version of ['2.0-alpha.3e','2.1','2.1-alpha.1']){
    run(version);run('--check');
    assert.equal(JSON.parse(fs.readFileSync(path.join(fixture,'version.json'),'utf8')).version,version);
    for(const file of ['assets/js/prompt-pocket.js','assets/js/version-check.js','assets/js/session-gate.js','service-worker.js']){
      execFileSync(process.execPath,['--check',file],{cwd:fixture});
      assert.ok(fs.readFileSync(path.join(fixture,file),'utf8').includes('PP_RELEASE:'+version));
    }
  }
  const cssPath=path.join(fixture,'assets/css/prompt-pocket.css');
  fs.writeFileSync(cssPath,fs.readFileSync(cssPath,'utf8').replace('PP_RELEASE:2.1-alpha.1','PP_RELEASE:2.0-alpha.3d'));
  assert.equal(spawnSync(process.execPath,['scripts/release.cjs','--check'],{cwd:fixture}).status,1);
  console.log('PASS release propagation, stable/alpha transitions, syntax and mismatch detection');
}finally{
  const expected=path.resolve(os.tmpdir())+path.sep+'prompt-pocket-release-test-';
  if(!path.resolve(fixture).startsWith(expected))throw new Error('Invalid fixture cleanup path');
  fs.rmSync(fixture,{recursive:true,force:true});
}
