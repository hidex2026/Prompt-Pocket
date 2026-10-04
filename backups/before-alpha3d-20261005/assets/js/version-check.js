/* PP_RELEASE:2.0-alpha.3c */
(()=>{
  const release='2.0-alpha.3c',main=document.querySelector('meta[name="pp-release"]')?.content;
  const dialog=document.getElementById('versionUpdateDialog'),message=document.getElementById('versionUpdateMessage');
  const reloadButton=document.getElementById('versionReload'),editButton=document.getElementById('versionEdit');
  const versions=document.getElementById('versionUpdateVersions');
  let target=main,busy=false,blocked=false;
  const dirty=()=>{try{return document.getElementById('editor').open&&(editorSaving||editorDraftState()!==editorBaseline)}catch{return false}};
  const label=v=>String(v||'最新版').replace(/^(\d+\.\d+)-alpha\.(\d+[a-z]*)$/,'Ver.$1 Alpha$2').replace(/^(\d+(?:\.\d+)+)$/,'Ver.$1');
  const order=v=>{const m=String(v).match(/^(\d+)\.(\d+)(?:-alpha\.(\d+)([a-z]*))?$/);return m?[Number(m[1]),Number(m[2]),m[3]?0:1,Number(m[3]||0),[...(m[4]||'')].reduce((n,c)=>n*26+c.charCodeAt(0)-96,0)]:[0]};
  const newer=(a,b)=>{const x=order(a),y=order(b);for(let i=0;i<Math.max(x.length,y.length);i++){if((x[i]||0)!==(y[i]||0))return (x[i]||0)>(y[i]||0)?a:b}return a};
  function mismatch(version){
    target=newer(main,version||main);
    message.textContent='新しいバージョンに更新します。';
    versions.textContent=`${label(main)} → ${label(target)}`;
    editButton.hidden=!dirty();
    if(!dialog.open)dialog.showModal();
  }
  function assertVersion(version){if(version&&version===main)return true;blocked=true;mismatch(version);return false}
  async function fresh(path){
    const url=new URL(path,location.href);url.searchParams.set('_pp_refresh',Date.now());
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
    try{const response=await fetch(url,{cache:'no-store',signal:controller.signal});if(!response.ok)throw new Error('更新ファイルを取得できません。');return response}finally{clearTimeout(timer)}
  }
  async function checkLatest(){
    try{const data=await (await fresh('version.json')).json();if(typeof data.version==='string'&&data.version!==main)mismatch(data.version)}catch{/* Offline: keep a coherent cached release. */}
  }
  async function reloadLatest(){
    if(busy)return;
    if(dirty()){message.textContent='編集中の変更があります。先に編集画面で保存してください。保存後、もう一度「更新する」を押してください。';editButton.hidden=false;return}
    busy=true;reloadButton.disabled=true;
    try{
      const latest=await (await fresh('version.json')).json();
      if(typeof latest.version!=='string')throw new Error('バージョン情報を確認できません。');
      const html=await (await fresh('index.html')).text();
      const doc=new DOMParser().parseFromString(html,'text/html');
      const version=doc.querySelector('meta[name="pp-release"]')?.content;
      if(version!==latest.version)throw new Error('更新ファイルの公開が完了していません。少し待ってから再度お試しください。');
      const files=[...doc.querySelectorAll('script[src],link[rel="stylesheet"]')].map(el=>el.getAttribute('src')||el.getAttribute('href')).filter(file=>{
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
    }catch(error){message.textContent=`${error.message}\n登録したデータは削除していません。オンラインで再度お試しください。`}
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
