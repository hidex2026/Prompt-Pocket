const fs=require('fs');
const path=require('path');
const http=require('http');
const assert=require('assert/strict');
const {chromium}=require('C:/Users/cooki/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(err,body)=>{if(err){res.writeHead(404).end();return}
    const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png'};
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(body);
  });
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',dialog=>dialog.accept().catch(()=>{}));
    await page.addInitScript(()=>{
      localStorage.setItem('promptPocket.v2',JSON.stringify([{id:'c1',name:'テストカード',prompt:'テスト本文',folderId:'f1',image:'',tags:[],created:1}]));
      localStorage.setItem('promptPocketFolders.v1',JSON.stringify([{id:'f1',name:'テストフォルダ',created:1}]));
      localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,rememberOps:true,openFolderIds:['f1'],manualOrder:['folder:f1'],buttonGlowEnabled:true,tagOrder:[]}));
      localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.imagesInIndexedDB.v1','done');
      localStorage.setItem('promptPocket.starterSamples.current.v4','done');
    });
    await page.goto(url);await page.waitForSelector('[data-row="c1"]');
    assert.deepEqual(errors,[],'startup errors');console.log('PASS startup');
    assert.match(await page.locator('label:has(#name)').innerText(),/プロンプト名/);
    assert.equal(await page.locator('#bottomNew').evaluate(el=>getComputedStyle(el).borderTopWidth),'2px');console.log('PASS label and add-button border');
    await page.evaluate(()=>openEditor(items[0]));await page.locator('#cancelBtn').click();
    assert.equal(await page.locator('#editor').evaluate(el=>el.open),false);assert.equal(await page.locator('#dataConfirmDialog').evaluate(el=>el.open),false);console.log('PASS unchanged editor closes without confirmation');
    await page.evaluate(()=>openEditor(items[0]));await page.locator('#name').fill('未保存');await page.locator('#cancelBtn').click();
    await page.waitForSelector('#dataConfirmDialog[open]');assert.match(await page.locator('#dataConfirmMessage').innerText(),/変更を保存せず/);
    await page.locator('#dataConfirmCancel').click();assert.equal(await page.locator('#name').inputValue(),'未保存');
    assert.equal(await page.locator('#editor').evaluate(el=>el.open),true);
    await page.locator('#editorCloseBtn').click();await page.locator('#dataConfirmOk').click();
    assert.equal(await page.locator('#editor').evaluate(el=>el.open),false);assert.equal(await page.evaluate(()=>items[0].name),'テストカード');console.log('PASS edited draft cancel and X confirmation');
    await page.evaluate(()=>openEditor(items[0]));await page.locator('#name').fill('変更');await page.locator('#name').fill('テストカード');await page.locator('#cancelBtn').click();
    assert.equal(await page.locator('#editor').evaluate(el=>el.open),false);console.log('PASS reverted draft closes without confirmation');
    await page.evaluate(async()=>{await openEditor(items[0]);selectedTags.add('テストタグ');$('editorCloseBtn').click()});await page.waitForSelector('#dataConfirmDialog[open]');await page.locator('#dataConfirmOk').click();console.log('PASS tag-only change prompts');
    await page.evaluate(async()=>{await openEditor(items[0]);const canvas=document.createElement('canvas');canvas.width=2;canvas.height=2;const blob=await new Promise(resolve=>canvas.toBlob(resolve));loadImageFile(blob)});
    await page.waitForFunction(()=>imageData==='pending');await page.locator('#cancelBtn').click();await page.waitForSelector('#dataConfirmDialog[open]');await page.locator('#dataConfirmOk').click();console.log('PASS image-only change prompts');
    await page.evaluate(()=>document.querySelector('[data-folder-delete]').click());await page.waitForSelector('#dataConfirmDialog[open]');
    assert.deepEqual(await page.locator('#dataConfirmDialog .sampleActions button').allTextContents(),['OK','キャンセル']);
    await page.locator('#dataConfirmCancel').click();assert.equal(await page.evaluate(()=>folders.length),1);
    await page.evaluate(()=>document.querySelector('[data-folder-delete]').click());await page.locator('#dataConfirmOk').click();
    await page.waitForFunction(()=>folders.length===0);await page.evaluate(()=>$('undoBtn').click());assert.equal(await page.evaluate(()=>folders.length),1);console.log('PASS folder delete ordered buttons, cancel, delete, undo');
    await page.evaluate(async()=>{await openEditor(items[0]);$('name').value='編集後';await $('form').onsubmit({preventDefault(){}})});
    assert.equal(await page.evaluate(()=>items[0].folderId),'f1');console.log('PASS edit preserves folder');
    await page.evaluate(()=>{snapshot('フォルダ変更');folders[0].name='変更';prefs.manualOrder=['c1'];openFolders.clear();save()});
    await page.evaluate(()=>$('undoBtn').click());
    assert.equal(await page.evaluate(()=>folders[0].name),'テストフォルダ');
    assert.deepEqual(await page.evaluate(()=>prefs.manualOrder),['folder:f1']);console.log('PASS full undo');
    await page.evaluate(async()=>{
      await openEditor(items[0]);imageBlob=new Blob(['old-image'],{type:'image/png'});await $('form').onsubmit({preventDefault(){}});
      window.oldImage=items[0].image;
      await openEditor(items[0]);imageBlob=new Blob(['new-image'],{type:'image/png'});await $('form').onsubmit({preventDefault(){}});
      $('undoBtn').click();
    });
    assert.equal(await page.evaluate(()=>items[0].image===window.oldImage),true);
    assert.equal(await page.evaluate(async()=>await (await getImageBlob(imageDbKey(items[0].image))).text()),'old-image');console.log('PASS image undo');
    await page.evaluate(()=>{
      const raw=localStorage.getItem(KEY);window.savedBeforeFailure=raw;
      const original=Storage.prototype.setItem;let failed=false;
      Storage.prototype.setItem=function(k,v){if(k===FOLDER_KEY&&!failed){failed=true;throw new DOMException('test quota','QuotaExceededError')}return original.call(this,k,v)};
      try{snapshot('failure');items[0].name='保存失敗';save()}catch(e){window.failureType=e.constructor.name}finally{Storage.prototype.setItem=original}
    });
    assert.equal(await page.evaluate(()=>localStorage.getItem(KEY)===window.savedBeforeFailure),true);
    assert.notEqual(await page.evaluate(()=>items[0].name),'保存失敗');
    assert.equal(await page.evaluate(()=>window.failureType),'StorageSaveError');console.log('PASS save rollback');
    await page.evaluate(async()=>{
      const original=Storage.prototype.setItem;let failed=false;
      Storage.prototype.setItem=function(k,v){if(k===PREF_KEY&&!failed){failed=true;throw new DOMException('test quota','QuotaExceededError')}return original.call(this,k,v)};
      const backup={items:[{id:'imported',name:'復元カード',prompt:'本文',tags:[],image:''}],folders:[],dataVersion:'2.0'};
      try{await $('importFile').onchange({target:{files:[{text:async()=>JSON.stringify(backup)}],value:'test'}})}finally{Storage.prototype.setItem=original}
    });
    assert.equal(await page.evaluate(()=>items[0].id),'c1');
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY))[0].id),'c1');console.log('PASS failed import preserves original');
    const download=page.waitForEvent('download');await page.evaluate(()=>$('exportBtn').click());
    assert.match((await download).suggestedFilename(),/prompt-pocket-backup/);await page.waitForSelector('#backupNoticeDialog[open]');
    assert.match(await page.locator('#backupNoticeDialog').innerText(),/別の端末やクラウド/);await page.locator('#backupNoticeOk').click();
    assert.equal(await page.locator('#backupNoticeDialog').evaluate(el=>el.open),false);console.log('PASS backup download and storage notice');
    await page.evaluate(async()=>{
      const backup={items:[{id:'imported',name:'復元カード',prompt:'本文',tags:[],image:''}],folders:[],dataVersion:'2.0'};
      await $('importFile').onchange({target:{files:[{text:async()=>JSON.stringify(backup)}],value:'test'}});
      $('undoBtn').click();
    });
    assert.equal(await page.evaluate(()=>items[0].id),'c1');assert.equal(await page.evaluate(()=>folders[0].id),'f1');console.log('PASS successful import can undo');
    await page.evaluate(()=>{localStorage.setItem('otherApp.data','keep');sessionStorage.setItem('otherApp.data','keep');clearAppStorage(localStorage);clearAppStorage(sessionStorage)});
    assert.equal(await page.evaluate(()=>localStorage.getItem('otherApp.data')),'keep');assert.equal(await page.evaluate(()=>sessionStorage.getItem('otherApp.data')),'keep');console.log('PASS scoped clearing');
    await page.evaluate(()=>openMainHelp());
    assert.deepEqual(await page.locator('#simpleHelp .helpTopActions>*').allTextContents(),['チュートリアルを表示','便利機能','バックアップについて','もっと詳しく']);
    assert.equal(await page.locator('#simpleHelp .welcomeSteps').count(),0);
    assert.ok(await page.locator('#helpDialog').evaluate(el=>el.getBoundingClientRect().height<380),'help menu should be compact');await page.screenshot({path:path.join(__dirname,'help-menu-mobile.png')});
    await page.locator('#usefulHelpBtn').click();assert.equal(await page.locator('#usefulHelp').isVisible(),true);await page.locator('#backSimpleHelp').click();
    await page.locator('#moreHelpBtn').click();assert.equal(await page.locator('#helpTitle').innerText(),'バックアップについて');await page.locator('#backSimpleHelp').click();
    const popupPromise=page.waitForEvent('popup');await page.locator('#detailedManualLink').click();const manual=await popupPromise;await manual.waitForLoadState();
    assert.equal(await manual.title(),'Prompt Pocketの使い方');
    for(const href of ['#basics','#cards','#folders','#moving']){await manual.locator('nav a[href="'+href+'"]').click();assert.equal(await manual.evaluate(()=>location.hash),href)}
    await manual.close();console.log('PASS help menu, submenu back links and external HTML anchors');
    await page.evaluate(()=>{items=[];folders=[];save();tutorialShouldSeed=true});
    await page.locator('#tutorialHelpBtn').click();await page.waitForSelector('#tutorialDialog[open]');
    await page.locator('.tutorialClose').click();await page.locator('#tutorialExitOk').click();
    assert.equal(await page.evaluate(()=>items.length),0);assert.equal(await page.evaluate(()=>folders.length),0);
    assert.equal(await page.locator('#tutorialSampleDialog').evaluate(el=>el.open),false);console.log('PASS help tutorial does not seed samples even when empty');
    await page.evaluate(()=>showTutorial());await page.waitForSelector('.tutorialPanel');
    const layouts=[];
    for(let i=0;i<9;i++){
      await page.waitForFunction(()=>[...document.querySelectorAll('.tutorialStep:not([hidden]) img')].every(img=>img.complete));
      layouts.push(await page.evaluate(()=>{const r=$('tutorialDialog').getBoundingClientRect(),b=document.querySelector('.tutorialActions').getBoundingClientRect(),m=document.querySelector('.tutorialStep:not([hidden]) .tutorialMedia').getBoundingClientRect();return {top:r.top,height:r.height,button:b.top,buttonBottom:b.bottom,dialogBottom:r.bottom,image:m.height}}));
      if(i<8)await page.locator('.tutorialNext').click();
    }
    assert.ok(layouts.every(l=>l.top===layouts[0].top&&l.height===layouts[0].height&&l.button===layouts[0].button&&l.image===layouts[0].image&&l.buttonBottom<=l.dialogBottom));
    await page.screenshot({path:path.join(__dirname,'tutorial-mobile.png')});console.log('PASS tutorial fixed layout all 9 slides',layouts[0]);
    await page.setViewportSize({width:844,height:390});
    assert.equal(await page.evaluate(()=>{const d=$('tutorialDialog').getBoundingClientRect(),b=document.querySelector('.tutorialActions').getBoundingClientRect();return b.bottom<=d.bottom}),true);console.log('PASS landscape footer');
    await page.setViewportSize({width:320,height:568});
    assert.equal(await page.evaluate(()=>{const d=$('tutorialDialog').getBoundingClientRect(),b=document.querySelector('.tutorialActions').getBoundingClientRect();return b.bottom<=d.bottom}),true);console.log('PASS small-screen footer');
    await page.evaluate(async()=>{
      window.removedScopes=[];Object.defineProperty(navigator.serviceWorker,'getRegistrations',{value:async()=>[
        {scope:new URL('./',location.href).href,unregister:async()=>window.removedScopes.push('app')},
        {scope:new URL('./another-app/',location.href).href,unregister:async()=>window.removedScopes.push('other')}
      ]});
      localStorage.setItem('otherApp.data','keep');sessionStorage.setItem('otherApp.data','keep');
      const pending=eraseEverything();$('dataConfirmOk').click();await Promise.resolve();$('dataConfirmOk').click();await pending;
    });
    assert.deepEqual(await page.evaluate(()=>window.removedScopes),['app']);
    assert.equal(await page.evaluate(()=>localStorage.getItem('otherApp.data')),'keep');
    assert.equal(await page.evaluate(()=>sessionStorage.getItem('otherApp.data')),'keep');console.log('PASS full erase scoped to this app');
    assert.deepEqual(errors,[],'unexpected page errors');await context.close();
    const recovery=await browser.newContext({serviceWorkers:'block'});const broken=await recovery.newPage();broken.on('dialog',d=>d.accept().catch(()=>{}));
    await broken.addInitScript(()=>{localStorage.setItem('promptPocket.v2','{broken');localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,tagOrder:[]}));localStorage.setItem('promptPocket.dataVersion','2.0')});
    await broken.goto(url);await broken.waitForSelector('.headerVersion');
    assert.equal(await broken.evaluate(()=>localStorage.getItem('promptPocket.v2')),'{broken');
    assert.equal(await broken.evaluate(()=>{try{save();return false}catch(e){return e instanceof StorageSaveError}}),true);console.log('PASS corrupted storage preserved, writes blocked');
    await broken.evaluate(async()=>{
      const data={items:[{id:'recovered',name:'復旧',prompt:'本文'}],dataVersion:'2.0'};
      await $('importFile').onchange({target:{files:[{text:async()=>JSON.stringify(data)}],value:'test'}});
    });
    assert.equal(await broken.evaluate(()=>JSON.parse(localStorage.getItem(KEY))[0].id),'recovered');console.log('PASS corrupt state can recover from backup');
    await recovery.close();
  }finally{await browser.close();server.close()}
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
