const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('C:/Users/cooki/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':decodeURIComponent(new URL(req.url,'http://localhost').pathname)));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png'})[path.extname(file)]||'application/octet-stream');res.end(data)});
});
async function startMove(page,kind,id){
  await page.locator(kind==='folder'?`#cards [data-folder-menu-toggle="${id}"]`:`#cards [data-menu-toggle="${id}"]`).click();
  await page.locator(kind==='folder'?`.folderPopupPortal [data-tap-move-folder="${id}"]`:`.cardPopupFloating [data-tap-move-card="${id}"]`).click();
  assert.equal(await page.locator('#cards .tapMoveSource').count(),1);
}
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    for(const mobile of [false,true]){
      const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1280,height:900},hasTouch:mobile,isMobile:mobile,serviceWorkers:'block'});
      await context.addInitScript(()=>{
        if(localStorage.getItem('promptPocket.v2'))return;
        const card=(id,folderId)=>({id,name:id,prompt:'本文 '+id,image:'assets/media/prompt-pocket-03.webp',tags:[],created:1,...(folderId?{folderId}:{})});
        localStorage.setItem('promptPocket.v2',JSON.stringify([card('c1'),card('c2'),card('k1','f1'),card('k2','f1')]));
        localStorage.setItem('promptPocketFolders.v1',JSON.stringify([{id:'f1',name:'実用',created:1},{id:'f2',name:'見本',created:2}]));
        localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,rememberOps:true,openFolderIds:['f1'],manualOrder:['c1','folder:f1','c2','folder:f2'],tagOrder:[]}));
        localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.imagesInIndexedDB.v1','done');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
      });
      const errors=[],a=await context.newPage();a.on('pageerror',e=>errors.push(e.message));
      await a.goto(url);await a.waitForFunction(()=>window.ppSession?.ready);
      const before=await a.evaluate(()=>localStorage.getItem('promptPocket.v2'));
      const b=await context.newPage();b.on('pageerror',e=>errors.push(e.message));await b.goto(url);
      await b.waitForFunction(async()=>{const state=await navigator.locks.query();return state.pending.length===1});
      assert.equal(await b.locator('#sessionWaitDialog').evaluate(el=>el.open),true);
      assert.equal(await b.evaluate(()=>window.ppSession.ready),false);
      assert.equal(await b.evaluate(()=>typeof window.openEditor),'undefined');
      assert.equal(await b.evaluate(()=>localStorage.getItem('promptPocket.v2')),before);
      await a.locator('[data-menu-toggle="c1"]').click();await a.locator('[data-edit="c1"]').first().click();
      await a.locator('#name').fill('先に開いた画面で保存');await a.locator('#form button[type="submit"]').click();
      await a.waitForFunction(()=>!document.getElementById('editor').open);
      await a.close();await b.waitForFunction(()=>window.ppSession?.ready);
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c1').name),'先に開いた画面で保存');
      assert.equal(await b.locator('#sessionWaitDialog').evaluate(el=>el.open),false);
      console.log('PASS single-tab lock and latest-data handoff',mobile?'mobile':'desktop');
      await b.locator('[data-menu-toggle="c2"]').click();
      assert.equal(await b.locator('#detailMenu-c2').evaluate(menu=>getComputedStyle(menu).position),'fixed');
      assert.ok(await b.locator('#detailMenu-c2 button').evaluateAll(buttons=>buttons.every(button=>{const r=button.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&button.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))})), 'all card menu actions are visible and not clipped by the list');
      await b.screenshot({path:path.join(__dirname,`card-menu-${mobile?'mobile':'desktop'}.png`)});
      await b.locator('[data-menu-toggle="c2"]').click();

      await startMove(b,'card','c1');
      assert.ok(await b.evaluate(()=>document.getElementById('tapMoveNotice').getBoundingClientRect().bottom<=document.getElementById('cards').getBoundingClientRect().top),'move hint stays above the list');
      await b.screenshot({path:path.join(__dirname,`tap-move-${mobile?'mobile':'desktop'}.png`)});
      await b.locator('[data-row="c2"] [data-copy]').first().click();
      assert.deepEqual(await b.evaluate(()=>prefs.manualOrder.slice(0,3)),['folder:f1','c2','c1']);
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c2').useCount||0),0,'destination button does not copy');
      assert.equal(await b.locator('#rowDetail-c2').isVisible(),false);
      assert.equal(await b.locator('#tapMoveNotice').isVisible(),false);
      const order=await b.evaluate(()=>JSON.stringify(prefs.manualOrder));
      await startMove(b,'card','c1');await b.locator('#viewOptionBtn').click();
      assert.equal(await b.evaluate(()=>JSON.stringify(prefs.manualOrder)),order);
      assert.equal(await b.locator('#optionDialog').evaluate(el=>el.open),false,'outside tap only cancels');
      await startMove(b,'card','c1');await b.locator('[data-folder="f1"] .nameCell').click();
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c1').folderId),'f1');
      assert.deepEqual(await b.evaluate(()=>items.filter(x=>x.folderId==='f1').map(x=>x.id)),['c1','k1','k2']);
      await startMove(b,'card','k2');await b.locator('[data-row="c1"] .nameCell').click();
      assert.deepEqual(await b.evaluate(()=>items.filter(x=>x.folderId==='f1').map(x=>x.id)),['c1','k2','k1']);
      await startMove(b,'card','k2');await b.locator('[data-row="c2"] .nameCell').click();
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='k2').folderId||null),null);
      assert.deepEqual(await b.evaluate(()=>prefs.manualOrder.slice(0,3)),['folder:f1','c2','k2']);
      await startMove(b,'card','c1');assert.equal(await b.locator('#ppFolderExitSlot').isVisible(),true);
      await b.locator('#ppFolderExitSlot').click();
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c1').folderId||null),null);
      assert.deepEqual(await b.evaluate(()=>prefs.manualOrder.slice(0,2)),['folder:f1','c1']);
      await b.locator('#undoBtn').click();await b.locator('#dataConfirmOk').click();
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c1').folderId),'f1');
      await startMove(b,'folder','f2');await b.locator('[data-folder="f1"] .nameCell').click();
      assert.deepEqual(await b.evaluate(()=>prefs.manualOrder.slice(0,2)),['folder:f1','folder:f2']);
      await b.locator('[data-folder="f1"] .nameCell').click();
      await startMove(b,'folder','f2');
      assert.equal(await b.evaluate(()=>openFolders.size),0,'folder tap move collapses every folder');
      assert.equal(await b.locator('.folderChildRow').count(),0);
      await b.locator('[data-row="c2"] .nameCell').click();
      assert.equal(await b.evaluate(()=>folders.find(x=>x.id==='f2').folderId||null),null);
      await b.locator('#undoBtn').click();await b.locator('#dataConfirmCancel').click();
      await b.reload();await b.waitForFunction(()=>window.ppSession?.ready);
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c1').folderId),'f1');
      await b.locator('[data-row="c2"] .cardThumbDeadZone').click();
      assert.equal(await b.locator('#rowDetail-c2').isVisible(),false,'thumbnail dead-zone retained');
      console.log('PASS tap move, folder membership, cancel, persistence and dead-zone');

      await b.locator('#viewOptionBtn').click();await b.locator('.optionDataFold summary').click();
      assert.match(await b.locator('#backupStatus').innerText(),/まだ書き出されていません/);
      const download=b.waitForEvent('download');await b.locator('#exportBtn').click();await download;
      await b.waitForFunction(()=>document.getElementById('backupStatus').textContent.includes('書き出し後の変更はありません'));
      await b.locator('#backupNoticeOk').click();await b.locator('#optionCancel').click();
      await b.locator('[data-menu-toggle="c2"]').click();await b.locator('[data-edit="c2"]').first().click();
      await b.locator('#name').fill('バックアップ後の変更');await b.locator('#form button[type="submit"]').click();
      await b.waitForFunction(()=>!document.getElementById('editor').open);
      await b.locator('#viewOptionBtn').click();await b.locator('.optionDataFold summary').click();
      await b.waitForFunction(()=>document.getElementById('backupStatus').textContent.includes('その後にデータが変更されています'));
      await b.screenshot({path:path.join(__dirname,`backup-status-${mobile?'mobile':'desktop'}.png`)});
      await b.locator('.optionMainScreenFold summary').click();await b.locator('#mainScreenColor').selectOption('aqua');
      await b.evaluate(()=>ppVersion.mismatch('2.1'));await b.locator('#versionReload').click();
      assert.match(await b.locator('#versionUpdateMessage').innerText(),/設定に未保存/);
      assert.equal(await b.locator('#versionEdit').innerText(),'設定に戻る');await b.locator('#versionEdit').click();
      assert.equal(await b.locator('#mainScreenColor').inputValue(),'aqua');
      await b.locator('#optionCancel').click();
      await b.route('**/version.json*',route=>route.abort());
      await b.evaluate(()=>ppVersion.mismatch('2.1'));await b.locator('#versionReload').click();
      await b.waitForFunction(()=>document.getElementById('versionReload').textContent==='再読み込み');
      assert.match(await b.locator('#versionUpdateMessage').innerText(),/通信環境の良い場所/);
      const failed=b.evaluate(()=>localStorage.getItem('promptPocket.v2'));assert.match(await failed,/バックアップ後の変更/);
      await b.unroute('**/version.json*');await b.locator('#versionReload').click();await b.waitForURL(/pp-update=/);await b.waitForFunction(()=>window.ppSession?.ready);
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c2').name),'バックアップ後の変更');
      console.log('PASS backup status, unsaved settings protection, update failure/retry');
      const waiting=await context.newPage();await waiting.goto(url);
      await waiting.waitForFunction(async()=>{const state=await navigator.locks.query();return state.pending.length===1});
      await b.goto(url+'/manual.html');await waiting.waitForFunction(()=>window.ppSession?.ready);
      await b.goBack();await b.waitForFunction(()=>window.ppSession&&document.getElementById('sessionWaitDialog').open);
      assert.equal(await b.evaluate(()=>window.ppSession.active),false);
      await waiting.close();await b.waitForFunction(()=>window.ppSession?.ready);
      assert.equal(await b.evaluate(()=>items.find(x=>x.id==='c2').name),'バックアップ後の変更');
      console.log('PASS navigation back reacquires lock and reloads current data');
      assert.deepEqual(errors,[],'no browser runtime errors');await context.close();
    }
  }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(error=>{console.error(error);process.exitCode=1;server.close()});
