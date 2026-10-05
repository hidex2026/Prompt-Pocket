const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const configured=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
const checking=process.argv[2]==='--check';
const release=checking?configured.version:process.argv[2]||configured.version;
if(!/^\d+\.\d+(?:-alpha\.\d+[a-z]*)?$/.test(release))throw new Error('例: node scripts/release.cjs 2.0-alpha.3d');
const display='PP_v'+release.replace('-alpha.','_ALPHA');
const query=release.replace('-alpha.','-alpha')+'-v1',cache=release.replaceAll('.','-').replace('-alpha-','-alpha')+'-v1';
const files=['index.html','tutorial.html','manual.html','assets/js/prompt-pocket.js','assets/js/version-check.js','assets/js/session-gate.js','assets/css/prompt-pocket.css','service-worker.js'];
let failed=false;
for(const file of files){
  const absolute=path.join(root,file),original=fs.readFileSync(absolute,'utf8');
  const next=original.replace(/PP_RELEASE:\d+\.\d+(?:-alpha\.\d+[a-z]*)?/g,'PP_RELEASE:'+release)
    .replace(/(name="pp-release" content=")[^"]+/g,'$1'+release)
    .replace(/PP_v\d+\.\d+(?:_ALPHA\d+[a-z]*)?/g,display)
    .replace(/((?:APP_VERSION|RELEASE|release)=')[^']+/g,'$1'+release)
    .replace(/(\.assert\(')[^']+/g,'$1'+release)
    .replace(/(--pp-release:")[^"]+/g,'$1'+release)
    .replace(/(\?v=)\d+\.\d+(?:-alpha\d+[a-z]*)?-v\d+/g,'$1'+query)
    .replace(/(CACHE_PREFIX\+')\d+-\d+(?:-alpha\d+[a-z]*)?-v\d+/g,'$1'+cache);
  if(checking){if(next!==original){console.error('不一致: '+file);failed=true}}
  else if(next!==original)fs.writeFileSync(absolute,next);
  if(!next.includes('PP_RELEASE:'+release)){console.error('マーカーなし: '+file);failed=true}
}
if(checking){if(configured.displayVersion!==display){console.error('不一致: version.json');failed=true}}
else fs.writeFileSync(path.join(root,'version.json'),JSON.stringify({version:release,displayVersion:display})+'\n');
if(failed)process.exitCode=1;else console.log((checking?'バージョン一致: ':'バージョン更新: ')+display);
