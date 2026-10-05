const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/cooki/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..'),release=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data)});
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
 try{
  const fresh=await browser.newContext({viewport:{width:390,height:844}}),page=await fresh.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await page.waitForSelector('#welcomeDialog[open]');assert.equal(await page.evaluate(()=>items.length),0);
  await page.locator('#welcomeStart').click();await page.waitForSelector('#tutorialDialog[open]');
  await page.locator('.tutorialClose').click();await page.locator('#tutorialExitOk').click();await page.waitForSelector('#tutorialSampleDialog[open]');
  assert.ok(await page.evaluate(()=>items.length>0&&folders.length>0));const sampleCount=await page.evaluate(()=>items.length);
  await page.locator('#tutorialSampleClose').click();
  await page.waitForFunction(()=>navigator.serviceWorker.controller);await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.reload();await page.waitForFunction(()=>window.ppSession?.ready);assert.equal(await page.locator('#welcomeDialog').evaluate(e=>e.open),false);assert.equal(await page.evaluate(()=>items.length),sampleCount);
  assert.ok((await page.title()).includes(release.displayVersion));assert.deepEqual(errors,[]);
  console.log('PASS fresh welcome/tutorial/sample creation exactly once and real Service Worker cached reload');
  const manual=await fresh.newPage();await manual.goto(url+'/manual.html');assert.equal(await manual.title(),'Prompt Pocketの使い方');
  assert.ok(await manual.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(a=>document.getElementById(a.hash.slice(1)))));
  await manual.close();await fresh.close();
  for(const mobile of [false,true]){
   const ctx=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:900},hasTouch:mobile,isMobile:mobile,serviceWorkers:'block'});
   await ctx.addInitScript(()=>{
    if(localStorage.getItem('promptPocket.v2'))return;
    localStorage.setItem('promptPocket.v2',JSON.stringify(['a','b','c'].map((id,i)=>({id,name:'カード '+id,prompt:'本文 '+id,created:i+1,tags:['テスト']}))));
    localStorage.setItem('promptPocketFolders.v1','[]');localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,rememberOps:true,manualOrder:['a','b','c'],tagOrder:[]}));
    localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.imagesInIndexedDB.v1','done');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
   });
   const p=await ctx.newPage(),faults=[];p.on('pageerror',e=>faults.push(e.message));await p.goto(url);await p.waitForFunction(()=>window.ppSession?.ready);
   await p.locator('[data-fav="b"]').click();await p.locator('#sort').selectOption('fav');assert.equal(await p.locator('tr[data-row]').first().getAttribute('data-row'),'b');
   await p.locator('#sort').selectOption('manual');await p.evaluate(()=>openSearchKeepingScroll());await p.locator('#search').fill('本文 b');assert.equal(await p.locator('tr[data-row]').count(),1);
   await p.locator('#clearFilters').click();await p.locator('#closeSearch').click();assert.equal(await p.locator('tr[data-row]').count(),3);
   await p.locator('#createFolderBtn').click();await p.locator('#folderNameInput').fill('テストフォルダ');await p.locator('#folderCreateForm button[type="submit"]').click();
   const folderId=await p.evaluate(()=>folders[0].id);await p.locator(`[data-folder-menu-toggle="${folderId}"]`).click();await p.locator('.folderPopupPortal [data-folder-rename]').click();
   await p.locator('#folderRenameInput').fill('名前変更');await p.locator('#folderRenameForm button[type="submit"]').click();assert.equal(await p.evaluate(()=>folders[0].name),'名前変更');
   await p.evaluate(()=>{folders=[];prefs.manualOrder=['a','b','c'];save();render()});
   const source=await p.locator('[data-row="a"] .unifiedDragArea').boundingBox(),target=await p.locator('[data-row="c"]').boundingBox();
   const x=source.x+source.width*.65,y=source.y+source.height/2;
   const sourceRow=await p.locator('[data-row="a"]').boundingBox(),dropY=target.y+target.height+(y-sourceRow.y);
   if(mobile){
    const cdp=await ctx.newCDPSession(p);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await p.waitForTimeout(850);
    await p.waitForSelector('.pp-dnd-ghost');
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:dropY}]});await p.waitForTimeout(80);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   }else{
    await p.mouse.move(x,y);await p.mouse.down();await p.waitForTimeout(850);await p.waitForSelector('.pp-dnd-ghost');
    await p.mouse.move(x,dropY,{steps:12});await p.mouse.up();
   }
   await p.waitForFunction(()=>!document.querySelector('.pp-dnd-ghost'));
   assert.deepEqual(await p.evaluate(()=>prefs.manualOrder),['b','c','a']);
   await p.reload();await p.waitForFunction(()=>window.ppSession?.ready);assert.deepEqual(await p.evaluate(()=>prefs.manualOrder),['b','c','a']);
   assert.deepEqual(faults,[]);console.log('PASS favorites/search/folder create+rename and actual '+(mobile?'touch':'mouse')+' drag persistence');await ctx.close();
  }
  const damaged=await browser.newContext({serviceWorkers:'block'}),broken=await damaged.newPage(),damageErrors=[];
  broken.on('pageerror',e=>damageErrors.push(e.message));
  await broken.addInitScript(()=>{
   localStorage.setItem('promptPocket.v2',JSON.stringify([{id:'bad',name:'破損テスト',prompt:'本文',tags:{invalid:true}}]));
   localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,tagOrder:[]}));localStorage.setItem('promptPocketFolders.v1','[]');
   localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
  });
  await broken.goto(url);await broken.waitForFunction(()=>window.ppSession?.ready);
  console.log('AUDIT damaged-tag storage:',JSON.stringify({errors:damageErrors,rows:await broken.locator('tr[data-row]').count(),recoveryNotice:await broken.locator('#appNoticeDialog').evaluate(e=>e.open)}));
  await damaged.close();
  const malformed=await browser.newContext({serviceWorkers:'block'}),importer=await malformed.newPage();
  await importer.addInitScript(()=>{
   localStorage.setItem('promptPocket.v2',JSON.stringify([{id:'original',name:'残すカード',prompt:'本文',tags:[]}]));
   localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,tagOrder:[]}));localStorage.setItem('promptPocketFolders.v1','[]');
   localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
  });
  await importer.goto(url);await importer.waitForFunction(()=>window.ppSession?.ready);
  await importer.evaluate(async()=>{
   const data={dataVersion:'2.0',items:[{id:'replacement',name:'読み込みカード',prompt:'本文',tags:['42']}],folders:[],customTags:[42]};
   const pending=document.getElementById('importFile').onchange({target:{files:[{text:async()=>JSON.stringify(data)}],value:'test'}});
   await new Promise(resolve=>{const timer=setInterval(()=>{if(document.getElementById('dataConfirmDialog').open){clearInterval(timer);document.getElementById('dataConfirmOk').click();resolve()}},5)});await pending;
  });
  const backupAudit=await importer.evaluate(async()=>{
   let editorError='';try{await openEditor(items[0])}catch(e){editorError=e.message}
   return {stored:JSON.parse(localStorage.getItem('promptPocket.v2')).map(x=>x.id),editorError,notice:document.getElementById('appNoticeMessage').textContent};
  });
  console.log('AUDIT malformed-backup validation:',JSON.stringify(backupAudit));
  await malformed.close();
  assert.deepEqual({damagedStorageErrors:damageErrors,malformedBackupEditorError:backupAudit.editorError},{damagedStorageErrors:[],malformedBackupEditorError:''},'beta gate: malformed data must be rejected safely or normalized without breaking the UI');
 }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
