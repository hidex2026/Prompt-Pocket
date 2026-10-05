/* PP_RELEASE:2.0-alpha.3e */
const RELEASE='2.0-alpha.3e',CACHE_PREFIX='prompt-pocket-static-';
const CACHE_NAME=CACHE_PREFIX+'2-0-alpha3e-v1';
const APP_SHELL=['./','./index.html','./tutorial.html','./manual.html','./assets/help/main-screen.png','./assets/help/drag-and-drop.png',
  './assets/tutorial/tutorial-cover.webp','./assets/tutorial/tutorial-pointer.webp',
  './assets/tutorial/step-01-copy-prompt.webp','./assets/tutorial/step-02-add-clean.webp',
  './assets/tutorial/step-03-prompt-input-clean.webp','./assets/tutorial/step-04-copy-photo-clean.webp',
  './assets/tutorial/step-05-select-image-clean.webp','./assets/tutorial/step-06-save-clean.webp','./assets/tutorial/step-07-card-added.webp',
  './assets/css/prompt-pocket.css?v=2.0-alpha3e-v1',
  './assets/js/session-gate.js?v=2.0-alpha3e-v1','./assets/js/version-check.js?v=2.0-alpha3e-v1','./assets/js/prompt-pocket.js?v=2.0-alpha3e-v1'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  // Validate every text component before installing the offline shell.
  const files=await Promise.all(APP_SHELL.map(async path=>{
    const response=await fetch(new Request(new URL(path,self.registration.scope),{cache:'no-store'}));
    if(!response.ok)throw new Error('Incomplete release: '+path);
    if(!/\.(?:webp|png)(?:\?|$)/.test(path)){
      const text=await response.clone().text();
      if(text.match(/PP_RELEASE:([^\s*<>]+)/)?.[1]!==RELEASE)throw new Error('Release mismatch: '+path);
    }
    return [path,response];
  }));
  const cache=await caches.open(CACHE_NAME);
  await Promise.all(files.map(([path,response])=>cache.put(path,response)));
  await self.skipWaiting();
})().catch(error=>{console.error('Prompt Pocket install:',error.message);throw error})));
// Keep old version caches for open tabs; explicit refresh clears them.
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
  if(request.cache==='no-store'||url.pathname.endsWith('/version.json')||url.searchParams.has('_pp_refresh')){
    event.respondWith(fetch(request));return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    const isMain=url.pathname===new URL(self.registration.scope).pathname||url.pathname===new URL('index.html',self.registration.scope).pathname;
    const tutorial=url.pathname===new URL('tutorial.html',self.registration.scope).pathname;
    const cached=await cache.match(isMain?'./index.html':tutorial?'./tutorial.html':request);
    if(cached)return cached;
    if(request.destination==='script'||request.destination==='style'){
      const previous=await caches.match(request);if(previous)return previous;
    }
    try{return await fetch(request)}catch{
      return new Response('オンラインで再度読み込んでください。登録データは保持されています。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});
