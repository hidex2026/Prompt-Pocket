/* PP_RELEASE:2.0-beta.1b */
(()=>{
  if(window.ppVersion&&!window.ppVersion.assert('2.0-beta.1b'))return;
  const dialog=document.getElementById('sessionWaitDialog'),message=document.getElementById('sessionWaitMessage');
  let releaseLock=null;
  const session=window.ppSession={active:false,ready:false};
  const lockName='prompt-pocket-editor:'+new URL('./',location.href).pathname;
  function show(messageText){message.textContent=messageText;if(!dialog.open)dialog.showModal()}
  dialog.addEventListener('cancel',event=>event.preventDefault());
  document.getElementById('sessionRetry').onclick=()=>location.reload();
  if(!navigator.locks){show('このブラウザでは二重起動の保護を利用できません。最新のChrome、Edge、Safariなどで開いてください。');return}
  show('Prompt Pocketは別のタブで開いています。そちらをご利用ください。閉じると、この画面で利用を開始します。');
  navigator.locks.request(lockName,async()=>{
    session.active=true;
    dialog.close();
    const lifetime=new Promise(resolve=>{releaseLock=resolve});
    const script=document.createElement('script');
    script.src=document.getElementById('ppAppScript').dataset.appSrc;
    script.onload=()=>{session.ready=true;window.ppVersion?.checkLatest()};
    script.onerror=()=>show('読み込みに失敗しました。通信環境の良い場所で、もう一度ブラウザを再読み込みしてください。');
    document.head.appendChild(script);
    await lifetime;
  }).catch(()=>show('画面の利用を開始できませんでした。もう一度ブラウザを再読み込みしてください。'));
  window.addEventListener('pagehide',()=>{
    session.active=false;
    document.body.inert=true;
    releaseLock?.();
  });
  window.addEventListener('pageshow',event=>{if(event.persisted)location.reload()});
})();
