const CACHE_PREFIX='prompt-pocket-static-';
const CACHE_NAME=CACHE_PREFIX+'test107-v1';
const APP_SHELL=[
  './',
  './index.html',
  './assets/css/prompt-pocket.css',
  './assets/js/prompt-pocket.js'
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

    const cached=await cache.match(request);
    if(cached)return cached;
    const response=await fetch(request);
    if(response.ok)await cache.put(request,response.clone());
    return response;
  })());
});
