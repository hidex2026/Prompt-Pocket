const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/cooki/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');let future=false,badTutorial=false;
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost'),name=url.pathname==='/'?'/index.html':url.pathname;
  const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}
    const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp'})[ext]||'application/octet-stream');res.setHeader('Cache-Control','no-store');
    if(['.html','.js','.css','.json'].includes(ext)){
      let text=data.toString();if(future)text=text.replaceAll('2.0-alpha.3d','2.1').replaceAll('PP_v2.0_ALPHA3d','Ver.2.1');
      if(badTutorial&&name==='/tutorial.html')text=text.replaceAll('PP_RELEASE:2.1','PP_RELEASE:2.2').replaceAll('PP_RELEASE:2.0-alpha.3d','PP_RELEASE:2.2');
      data=Buffer.from(text);
    }res.end(data);
  });
});
async function seed(page){await page.addInitScript(()=>{
  if(localStorage.getItem('promptPocket.prefs.v1'))return;
  localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,mainScreenColor:'pastel',tagOrder:[]}));
  localStorage.setItem('promptPocket.v2',JSON.stringify([{id:'c1',name:'保持するカード',prompt:'本文',tags:[],created:1}]));localStorage.setItem('promptPocketFolders.v1','[]');
  localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.imagesInIndexedDB.v1','done');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
})}
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    // Mixed tutorial is not inserted into the application.
    const ctx=await browser.newContext({serviceWorkers:'block'}),page=await ctx.newPage();await seed(page);await page.goto(url);await page.waitForFunction(()=>window.ppSession?.ready);
    badTutorial=true;await page.evaluate(()=>showTutorial());await page.waitForSelector('#versionUpdateDialog[open]');
    assert.equal(await page.locator('#tutorialContent .tutorialStep').count(),0);assert.match(await page.locator('#versionUpdateVersions').textContent(),/Ver\.2\.2/);badTutorial=false;
    assert.equal(await page.locator('#versionReload').textContent(),'バージョンを更新する');
    assert.equal(await page.locator('#versionEdit').isVisible(),false);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#versionUpdateDialog').evaluate(e=>e.open),true);
    await page.evaluate(()=>ppVersion.mismatch('2.0-alpha.3e'));
    assert.match(await page.locator('#versionUpdateVersions').textContent(),/Ver\.2\.0 Alpha3d → Ver\.2\.0 Alpha3e/);
    for(const width of [320,390,1280]){
      await page.setViewportSize({width,height:844});
      const layout=await page.evaluate(()=>{
        const dialog=document.querySelector('#versionUpdateDialog'),panel=dialog.querySelector('.managePanel'),button=document.querySelector('#versionReload');
        const d=dialog.getBoundingClientRect(),p=panel.getBoundingClientRect(),b=button.getBoundingClientRect();
        return {width:d.width,rightGap:p.right-b.right,padding:parseFloat(getComputedStyle(panel).paddingRight),height:d.height,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      assert.ok(layout.width<=420);assert.ok(layout.height<350);assert.ok(Math.abs(layout.rightGap-layout.padding)<2);assert.equal(layout.overflow,false);
      await page.screenshot({path:path.join(__dirname,'version-update-'+width+'.png')});
    }
    await ctx.close();console.log('PASS mismatched tutorial blocked');
    // Browser update-flow tests isolate Service Worker registration.
    const live=await browser.newContext({serviceWorkers:'block'}),app=await live.newPage();app.setDefaultTimeout(5000);await seed(app);await app.goto(url);await app.waitForFunction(()=>window.ppSession?.ready);console.log('loaded update fixture');
    await app.evaluate(()=>openEditor(items[0]));await app.locator('#name').fill('編集中');console.log('editor draft ready');
    future=true;await app.evaluate(()=>ppVersion.checkLatest());await app.waitForSelector('#versionUpdateDialog[open]');assert.match(await app.locator('#versionUpdateVersions').textContent(),/Ver\.2\.1/);
    await app.locator('#versionReload').click();assert.match(await app.locator('#versionUpdateMessage').textContent(),/先に編集画面で保存/);assert.match(await app.title(),/ALPHA3d/);
    await app.locator('#versionEdit').click();assert.equal(await app.locator('#name').inputValue(),'編集中');await app.evaluate(()=>document.getElementById('form').requestSubmit());await app.waitForFunction(()=>!document.getElementById('editor').open);
    await app.evaluate(()=>ppVersion.checkLatest());badTutorial=true;await app.evaluate(()=>ppVersion.reloadLatest());console.log('preflight:',await app.locator('#versionUpdateMessage').textContent());assert.match(await app.locator('#versionUpdateMessage').textContent(),/更新に失敗しました/);
    assert.match(await app.title(),/ALPHA3d/);badTutorial=false;console.log('PASS dirty editor protected and incomplete release rejected');
    const before=await app.evaluate(()=>localStorage.getItem('promptPocket.v2'));
    await app.evaluate(async()=>{const cache=await caches.open('unrelated-cache');await cache.put('/unrelated',new Response('keep'))});
    await app.locator('#versionReload').click();await app.waitForURL(/pp-update=2\.1/);await app.waitForSelector('[data-row="c1"]');assert.match(await app.title(),/Ver\.2\.1/);
    assert.equal(await app.evaluate(()=>localStorage.getItem('promptPocket.v2')),before);assert.equal(await app.locator('body').getAttribute('data-main-screen-color'),'pastel');
    assert.ok(await app.evaluate(async()=>await caches.has('unrelated-cache')));assert.equal(await app.locator('#versionUpdateDialog').evaluate(e=>e.open),false);
    console.log('PASS refresh to new release preserves cards/preferences and unrelated caches, no reload loop');
    await live.close();
  }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
