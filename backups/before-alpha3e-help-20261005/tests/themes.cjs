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
    await page.evaluate(()=>{
      folders=[{id:'f1',name:'実用',created:2},{id:'f2',name:'アレンジ',created:3},{id:'f3',name:'見本',created:4},{id:'f4',name:'その他',created:5}];
      items.push({id:'child',name:'フォルダ内カード',prompt:'テスト',folderId:'f1',tags:[],created:2});save();render();
    });
    const bg=()=>page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor);
    const original=await bg();
    await page.evaluate(()=>openOptions());
    const optionLayout=await page.evaluate(()=>{
      const dialog=document.querySelector('#optionDialog'),actions=dialog.querySelector('.optionFixedActions'),version=dialog.querySelector('.appVersion');
      return {gap:actions.getBoundingClientRect().top-version.getBoundingClientRect().bottom,visible:actions.getBoundingClientRect().bottom<=innerHeight,position:getComputedStyle(actions).position};
    });
    assert.ok(optionLayout.gap<=16,'no empty spacer below version');assert.ok(optionLayout.visible);assert.equal(optionLayout.position,'sticky');
    await page.screenshot({path:path.join(__dirname,'options-compact.png')});
    assert.equal(await page.locator('#toast').evaluate(e=>getComputedStyle(e).color),'rgb(255, 255, 255)');
    const headingColor=await page.locator('.optionMainScreenFold summary').evaluate(e=>getComputedStyle(e).backgroundColor);
    await page.locator('#optionCancel').click();
    const looseColors={aqua:'rgb(228, 240, 250)',red:'rgb(252, 228, 229)',pastel:'rgb(226, 241, 231)',yellow:'rgb(255, 241, 199)',multicolor:'rgb(228, 239, 250)'};
    const accentColors={aqua:'rgb(168, 207, 238)',red:'rgb(250, 200, 185)',pastel:'rgb(168, 219, 192)',yellow:'rgb(255, 223, 131)',multicolor:'rgb(255, 224, 140)'};
    const folderBottomColors={aqua:'rgb(133, 183, 218)',red:'rgb(229, 167, 135)',pastel:'rgb(134, 191, 159)',yellow:'rgb(220, 178, 78)',multicolor:'rgb(229, 167, 135)'};
    assert.equal(await page.locator('body').getAttribute('data-main-screen-color'),'default');
    for(const [theme,color] of [['aqua','rgb(234, 243, 250)'],['red','rgb(255, 241, 240)'],['pastel','rgb(237, 247, 240)'],['yellow','rgb(255, 248, 223)'],['multicolor','rgb(255, 247, 223)']]){
      await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();
      assert.equal(await page.locator('#mainScreenColor option').count(),6);
      const before=await bg();await page.locator('#mainScreenColor').selectOption(theme);assert.equal(await bg(),before);
      assert.equal(await page.locator('#optionDialog').evaluate(e=>getComputedStyle(e).backgroundColor),color);
      assert.equal(await page.locator('.optionMainScreenFold summary').evaluate(e=>getComputedStyle(e).backgroundColor),headingColor);
      await page.screenshot({path:path.join(__dirname,'theme-preview-'+theme+'.png')});
      await page.locator('#optionCancel').click();assert.equal(await bg(),before);
      await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();await page.locator('#mainScreenColor').selectOption(theme);await page.locator('#optionSave').click();
      assert.equal(await bg(),color);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('promptPocket.prefs.v1')).mainScreenColor),theme);
      await page.reload();await page.waitForSelector('[data-row="c1"]');assert.equal(await bg(),color);
      assert.equal(await page.locator('[data-row="c1"] td').first().evaluate(e=>getComputedStyle(e).backgroundColor),theme==='red'?'rgb(255, 254, 250)':theme==='multicolor'?'rgb(255, 254, 250)':'rgb(255, 254, 248)');
      assert.equal(await page.locator('#bottomNew').evaluate(e=>getComputedStyle(e).backgroundColor),accentColors[theme]);
      assert.equal(await page.locator('#createFolderBtn').evaluate(e=>getComputedStyle(e).backgroundColor),theme==='multicolor'?'rgb(168, 219, 192)':accentColors[theme]);
      if(theme==='pastel'){
        for(const selector of ['#count','#viewOptionBtn','#closeAllBtn','#undoBtn','[data-copy="c1"]'])assert.equal(await page.locator(selector).first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(228, 243, 233)');
        assert.equal(await page.locator('.detailTable th').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(220, 238, 226)');
        assert.ok(await page.locator('#undoBtn').evaluate(e=>e.disabled&&Number(getComputedStyle(e).opacity)<0.6),'disabled button remains visually muted');
      }
      await page.evaluate(()=>openOptions());assert.equal(await page.locator('#mainScreenColor').inputValue(),theme);await page.locator('#optionCancel').click();
      await page.screenshot({path:path.join(__dirname,'theme-'+theme+'.png')});console.log('PASS '+theme+' save, cancel, reload');
      const folder=page.locator('.folderRow').first();
      const raised=await folder.locator('td').first().evaluate(e=>{const s=getComputedStyle(e);return {image:s.backgroundImage,shadow:s.boxShadow}});
      assert.match(raised.image,/linear-gradient/);assert.match(raised.shadow,/inset/);
      if(theme==='multicolor'){
        const gradients=await page.locator('.folderRow td:first-child').evaluateAll(cells=>cells.map(e=>getComputedStyle(e).backgroundImage));
        assert.equal(new Set(gradients).size,4,'pastel folders use four colors');
      }else assert.ok(raised.image.includes(folderBottomColors[theme]),'folder gradient follows theme');
      assert.equal(await folder.locator('td').last().evaluate(e=>getComputedStyle(e).boxShadow),raised.shadow,'same shadow across cells, no side seams');
      await page.evaluate(()=>{openFolders.add('f1');render()});
      const openCell=page.locator('.folderRow.folderOpen td').first();
      assert.equal(await page.locator('[data-row="child"] td').first().evaluate(e=>getComputedStyle(e).backgroundColor),looseColors[theme]);
      assert.equal(await openCell.evaluate(e=>getComputedStyle(e).borderLeftWidth),'2px');
      await page.screenshot({path:path.join(__dirname,'folder-'+theme+'.png')});
      await page.evaluate(()=>document.querySelector('.folderRow').classList.add('folderDropTarget'));
      assert.equal(await page.locator('.folderDropTarget td').first().evaluate(e=>getComputedStyle(e).borderColor),'rgb(169, 109, 0)');
      await page.evaluate(()=>{openFolders.clear();render()});
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
    await page.locator('#undoBtn').click();await page.locator('#dataConfirmOk').click();assert.equal(await page.locator('body').getAttribute('data-main-screen-color'),'aqua');
    await page.setViewportSize({width:1280,height:800});await page.screenshot({path:path.join(__dirname,'theme-desktop.png')});
    await page.evaluate(()=>openOptions());await page.locator('.optionMainScreenFold summary').click();
    await page.locator('#optionDialog').evaluate(e=>{e.scrollTop=e.scrollHeight});
    assert.ok(await page.locator('#optionSave').isVisible());await page.locator('#optionCancel').click();
    assert.deepEqual(errors,[]);assert.match(await page.title(),/ALPHA3d/);assert.equal(await page.locator('#mainScreenColor option[value="pastel"]').textContent(),'ミントグリーン');console.log('PASS invalid value fallback, undo, desktop, version, renamed label');
    await ctx.close();
  }finally{await browser.close();await new Promise(r=>server.close(r))}
})().catch(e=>{console.error(e);process.exitCode=1;server.close()});
