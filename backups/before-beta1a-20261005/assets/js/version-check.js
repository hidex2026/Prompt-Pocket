/* PP_RELEASE:2.0-beta.1 */
(()=>{
  const release='2.0-beta.1',main=document.querySelector('meta[name="pp-release"]')?.content;
  const dialog=document.getElementById('versionUpdateDialog'),message=document.getElementById('versionUpdateMessage');
  const reloadButton=document.getElementById('versionReload'),editButton=document.getElementById('versionEdit');
  const versions=document.getElementById('versionUpdateVersions');
  let target=main,busy=false,blocked=false;
  const draft=()=>window.ppUnsavedContext?.()||'';
  const dirty=()=>!!draft();
  function refreshDraftButton(){
    const context=draft();editButton.hidden=!context;
    editButton.textContent=context==='options'?'設定に戻る':'編集に戻る';
    return context;
  }
  const label=v=>String(v||'最新版').replace(/^(\d+\.\d+)-(alpha|beta)\.(\d+[a-z]*)$/,(_,version,stage,number)=>`Ver.${version} ${stage==='beta'?'Beta':'Alpha'}${number}`).replace(/^(\d+(?:\.\d+)+)$/,'Ver.$1');
  const order=v=>{const m=String(v).match(/^(\d+)\.(\d+)(?:-(alpha|beta)\.(\d+)([a-z]*))?$/);return m?[Number(m[1]),Number(m[2]),m[3]==='alpha'?0:m[3]==='beta'?1:2,Number(m[4]||0),[...(m[5]||'')].reduce((n,c)=>n*26+c.charCodeAt(0)-96,0)]:[0]};
  const newer=(a,b)=>{const x=order(a),y=order(b);for(let i=0;i<Math.max(x.length,y.length);i++){if((x[i]||0)!==(y[i]||0))return (x[i]||0)>(y[i]||0)?a:b}return a};
  function mismatch(version){
    target=newer(main,version||main);
    message.textContent='新しいバージョンに更新します。';
    versions.textContent=`${label(main)} → ${label(target)}`;
    refreshDraftButton();
    if(!dialog.open)dialog.showModal();
  }
  function assertVersion(version){if(version&&version===main)return true;blocked=true;mismatch(version);return false}
  async function fresh(path){
    const url=new URL(path,location.href);url.searchParams.set('_pp_refresh',Date.now());
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
    try{const response=await fetch(url,{cache:'no-store',signal:controller.signal});if(!response.ok)throw new Error('更新ファイルを取得できません。');return response}finally{clearTimeout(timer)}
  }
  async function checkLatest(){
    if(window.ppSession&&!window.ppSession.ready)return;
    try{const data=await (await fresh('version.json')).json();if(typeof data.version==='string'&&data.version!==main)mismatch(data.version)}catch{/* Offline: keep a coherent cached release. */}
  }
  async function reloadLatest(){
    if(busy)return;
    if(dirty()){
      const context=refreshDraftButton();
      message.textContent=context==='options'?'設定に未保存の変更があります。保存するか、変更を取り消してから更新してください。':'編集中の変更があります。先に編集画面で保存するか、変更を取り消してから更新してください。';
      return;
    }
    busy=true;reloadButton.disabled=true;
    try{
      const latest=await (await fresh('version.json')).json();
      if(typeof latest.version!=='string')throw new Error('バージョン情報を確認できません。');
      const html=await (await fresh('index.html')).text();
      const doc=new DOMParser().parseFromString(html,'text/html');
      const version=doc.querySelector('meta[name="pp-release"]')?.content;
      if(version!==latest.version)throw new Error('更新ファイルの公開が完了していません。少し待ってから再度お試しください。');
      const files=[...doc.querySelectorAll('script[src],script[data-app-src],link[rel="stylesheet"]')].map(el=>el.getAttribute('src')||el.getAttribute('data-app-src')||el.getAttribute('href')).filter(file=>{
        const url=new URL(file,location.href);return url.origin===location.origin&&url.pathname.startsWith(new URL('assets/',location.href).pathname);
      });
      if(files.length<3)throw new Error('更新対象の構成ファイルを確認できません。');
      files.push('tutorial.html','manual.html');
      for(const file of files){
        const url=new URL(file,location.href);if(url.origin!==location.origin)throw new Error('更新先を確認できません。');
        const text=await (await fresh(url)).text();
        const match=text.match(/PP_RELEASE:([^\s*<>]+)/);
        if(match?.[1]!==version)throw new Error('更新ファイルのバージョンが揃っていません。少し待ってから再度お試しください。');
      }
      if(dirty())throw new Error('編集中の変更があります。先に編集画面で保存してください。');
      // Only application files are cleared. Registered cards, preferences and IDB images remain untouched.
      if('caches'in window){const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('prompt-pocket-static-')).map(k=>caches.delete(k)))}
      if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations();await Promise.all(regs.filter(r=>r.scope===new URL('./',location.href).href).map(r=>r.unregister()))}
      const url=new URL(location.href);url.searchParams.set('pp-update',version);url.searchParams.set('_pp_refresh',Date.now());location.replace(url);
    }catch(error){
      console.error('Prompt Pocket update:',error);
      if(dirty()){
        refreshDraftButton();message.textContent='未保存の変更があります。元の画面で保存するか、変更を取り消してから更新してください。';
      }else{
        message.textContent='更新に失敗しました。通信環境の良い場所で、もう一度ブラウザを再読み込みしてください。解消しない場合は、少し時間をおいてお試しください。';
        reloadButton.textContent='再読み込み';refreshDraftButton();
      }
    }
    finally{busy=false;reloadButton.disabled=false}
  }
  window.ppVersion={assert:assertVersion,mismatch,checkLatest,reloadLatest,get blocked(){return blocked}};
  reloadButton.onclick=reloadLatest;
  editButton.onclick=()=>{if(!busy&&dirty())dialog.close()};
  dialog.addEventListener('cancel',event=>event.preventDefault());
  if(assertVersion(release)){
    const css=getComputedStyle(document.documentElement).getPropertyValue('--pp-release').trim().replaceAll('"','');assertVersion(css);
  }
  window.addEventListener('online',checkLatest);
  window.addEventListener('load',checkLatest);
  if('serviceWorker'in navigator){
    navigator.serviceWorker.addEventListener('controllerchange',checkLatest);
    window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js',{scope:'./',updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}));
  }
})();
