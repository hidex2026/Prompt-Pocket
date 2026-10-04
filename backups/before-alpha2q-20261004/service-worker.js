const CACHE_PREFIX='prompt-pocket-static-';
const CACHE_NAME=CACHE_PREFIX+'2-0-alpha2p-v1';
const APP_SHELL=[
  './',
  './index.html',
  './tutorial.html',
  './manual.html',
  './assets/tutorial/tutorial-cover.webp',
  './assets/tutorial/tutorial-pointer.webp',
  './assets/tutorial/step-01-copy-prompt.webp',
  './assets/tutorial/step-02-add-clean.webp',
  './assets/tutorial/step-03-prompt-input-clean.webp',
  './assets/tutorial/step-04-copy-photo-clean.webp',
  './assets/tutorial/step-05-select-image-clean.webp',
  './assets/tutorial/step-06-save-clean.webp',
  './assets/tutorial/step-07-card-added.webp',
  './assets/css/prompt-pocket.css?v=2.0-alpha2p-v1',
  './assets/js/prompt-pocket.js?v=2.0-alpha2p-v1'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith(CACHE_PREFIX)&&key!==CACHE_NAME).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  event.respondWith((async()=>{
    const cache=await caches.open(CACHE_NAME);
    if(request.mode==='navigate'){
      try{
        const response=await fetch(request);
        if(response.ok)await cache.put('./index.html',response.clone());
        return response;
      }catch{
        const cachedPage=await cache.match('./index.html');
        if(cachedPage)return cachedPage;
        return new Response('Prompt Pocketをオフラインで開けませんでした。オンライン時に一度開いてください。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    }

    if(request.destination==='script'||request.destination==='style'){
      try{
        const response=await fetch(request);
        if(response.ok)await cache.put(request,response.clone());
        return response;
      }catch{
        const cachedAsset=await cache.match(request);
        if(cachedAsset)return cachedAsset;
        throw new Error('Required asset is unavailable.');
      }
    }

    const cached=await cache.match(request);
    if(cached)return cached;
    const response=await fetch(request);
    if(response.ok)await cache.put(request,response.clone());
    return response;
  })());
});
