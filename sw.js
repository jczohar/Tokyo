const V="tokyo-20261125-01";const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon-64.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("tokyo-")&&k!==V&&k!=="tokyo-rt").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
  if(/tile|cartocdn|wikimedia|wikipedia/.test(u.host)){e.respondWith(caches.open("tokyo-rt").then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==="opaque")c.put(r,x.clone());return x}).catch(()=>m))))}
});