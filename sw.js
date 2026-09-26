const CACHE_NAME='sekai-in-ishi-v6';
const APP_FILES=['./','./index.html','./sekai-in-ishi-demo.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./爆発1.mp3','./Quo_Vadis.mp3'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match('./sekai-in-ishi-demo.html'))))});
