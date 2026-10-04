// Service Worker lifecycle/response logic without browser registration dependencies.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),base='https://example.test/pocket/';
const handlers={},stores=new Map();let offline=false,broken=false,claimed=false;
const key=value=>new URL(typeof value==='string'?value:value.url,base).href;
const caches={
  async open(name){if(!stores.has(name))stores.set(name,new Map());const data=stores.get(name);return {async match(value){return data.get(key(value))?.clone()},async put(value,response){data.set(key(value),response.clone())}}},
  async match(value){for(const data of stores.values()){const response=data.get(key(value));if(response)return response.clone()}},
  async keys(){return [...stores.keys()]},async delete(name){return stores.delete(name)}
};
async function fetchMock(request){
  if(offline)throw new Error('offline');const url=new URL(typeof request==='string'?request:request.url);
  const pathname=url.pathname.slice('/pocket/'.length)||'index.html';let text=fs.readFileSync(path.join(root,pathname));
  if(broken&&pathname==='tutorial.html')text=Buffer.from(text.toString().replace('PP_RELEASE:2.0-alpha.3d','PP_RELEASE:2.1'));
  return new Response(text);
}
vm.runInNewContext(fs.readFileSync(path.join(root,'service-worker.js'),'utf8'),{
  self:{registration:{scope:base},location:{origin:new URL(base).origin},clients:{async claim(){claimed=true}},async skipWaiting(){},addEventListener(name,fn){handlers[name]=fn}},
  caches,fetch:fetchMock,URL,Request,Response,console
});
async function install(){let done;handlers.install({waitUntil(p){done=p}});await done}
async function get(file,options={}){let response;handlers.fetch({request:new Request(new URL(file,base),options),respondWith(p){response=p}});return await response}
(async()=>{
  broken=true;await assert.rejects(install(),/mismatch/);assert.equal(stores.size,0,'no partial cache installed');broken=false;
  await install();let done;handlers.activate({waitUntil(p){done=p}});await done;assert.ok(claimed);
  offline=true;
  assert.match(await (await get('index.html')).text(),/pp-release/);
  assert.match(await (await get('tutorial.html?v=2.0-alpha.3d')).text(),/PP_RELEASE:2.0-alpha.3d/);
  assert.match(await (await get('manual.html')).text(),/Prompt Pocketの使い方/);
  assert.match(await (await get('index.html')).text(),/pp-release/,'manual did not replace main cache');
  await assert.rejects(get('version.json'),/offline/);
  offline=false;broken=true;assert.match(await (await get('tutorial.html',{cache:'no-store'})).text(),/PP_RELEASE:2.1/);
  assert.match(await (await get('tutorial.html')).text(),/PP_RELEASE:2.0-alpha.3d/,'fresh response cannot contaminate installed cache');
  console.log('PASS SW atomic install, offline coherent shell/tutorial/manual, bypass and navigation isolation');
})().catch(e=>{console.error(e);process.exitCode=1});
