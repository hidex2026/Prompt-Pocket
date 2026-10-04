const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('C:/Users/cooki/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+(new URL(req.url,'http://localhost').pathname==='/'?'/index.html':new URL(req.url,'http://localhost').pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp'})[path.extname(file)]||'application/octet-stream');res.end(data)});
});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  try{
    const ctx=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'}),page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('dialog',dialog=>dialog.accept().catch(()=>{}));
    await page.addInitScript(()=>{
      if(localStorage.getItem('promptPocket.prefs.v1'))return;
      localStorage.setItem('promptPocket.prefs.v1',JSON.stringify({welcomed:true,tagOrder:[]}));
      localStorage.setItem('promptPocket.v2',JSON.stringify([{id:'c1',name:'幻想アート',prompt:'テスト',tags:[],created:1}]));
      localStorage.setItem('promptPocketFolders.v1','[]');
      localStorage.setItem('promptPocket.dataVersion','2.0');localStorage.setItem('promptPocket.imagesInIndexedDB.v1','done');localStorage.setItem('promptPocket.starterSamples.current.v4','done');
    });
    await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForSelector('[data-row="c1"]');
    const bg=()=>page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor);
    const original=await bg();
    assert.equal(await page.locator('body').getAttribute('data-main-screen-color'),'default');
    for(const [theme,color] of [['aqua','rgb(234, 243, 250)'],['red','rgb(255, 241, 240)'],['pastel','rgb(237, 247, 240)'],['yellow','rgb(255, 248, 223)'],['multicolor','rgb(255, 247, 223)']]){
      await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();
      assert.equal(await page.locator('#mainScreenColor option').count(),6);
      const before=await bg();await page.locator('#mainScreenColor').selectOption(theme);assert.equal(await bg(),before);
      assert.equal(await page.locator('#optionDialog').evaluate(e=>getComputedStyle(e).backgroundColor),color);
      await page.screenshot({path:path.join(__dirname,'theme-preview-'+theme+'.png')});
      await page.locator('#optionCancel').click();assert.equal(await bg(),before);
      await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();await page.locator('#mainScreenColor').selectOption(theme);await page.locator('#optionSave').click();
      assert.equal(await bg(),color);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('promptPocket.prefs.v1')).mainScreenColor),theme);
      await page.reload();await page.waitForSelector('[data-row="c1"]');assert.equal(await bg(),color);
      await page.evaluate(()=>openOptions());assert.equal(await page.locator('#mainScreenColor').inputValue(),theme);await page.locator('#optionCancel').click();
      await page.screenshot({path:path.join(__dirname,'theme-'+theme+'.png')});console.log('PASS '+theme+' save, cancel, reload');
    }
    for(const close of ['#optionClose','Escape']){
      await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();await page.locator('#mainScreenColor').selectOption('yellow');
      if(close==='Escape')await page.keyboard.press('Escape');else await page.locator(close).click();
      assert.equal(await page.locator('body').getAttribute('data-main-screen-color'),'multicolor');
      await page.evaluate(()=>openOptions());assert.equal(await page.locator('#mainScreenColor').inputValue(),'multicolor');await page.locator('#optionCancel').click();
    }
    await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();await page.locator('#mainScreenColor').selectOption('default');
    assert.equal(await page.locator('#optionDialog').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');
    await page.locator('#optionSave').click();assert.equal(await bg(),original);console.log('PASS preview background, X/Escape cancel and default restoration');
    await page.evaluate(()=>{prefs.mainScreenColor='invalid';applyPreferences()});assert.equal(await bg(),original);
    await page.evaluate(()=>{prefs.mainScreenColor='aqua';applyPreferences();snapshot('theme-test');prefs.mainScreenColor='red';savePrefs();applyPreferences()});
    await page.locator('#undoBtn').click();assert.equal(await page.locator('body').getAttribute('data-main-screen-color'),'aqua');
    await page.setViewportSize({width:1280,height:800});await page.screenshot({path:path.join(__dirname,'theme-desktop.png')});
    assert.deepEqual(errors,[]);assert.match(await page.title(),/ALPHA2s/);assert.equal(await page.locator('#mainScreenColor option[value="pastel"]').textContent(),'ミントグリーン');console.log('PASS invalid value fallback, undo, desktop, version, renamed label');
    await ctx.close();
  }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
