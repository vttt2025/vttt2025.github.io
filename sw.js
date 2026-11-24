/* RUSI TRKI — Lightweight Service Worker (Static Assets + Network-First HTML) */
const CACHE_NAME = 'rusi-static-v12.0';
const STATIC_ASSET_RE = /\.(css|js|png|jpg|jpeg|webp|svg|woff2)(\?.*)?$/i;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('rusi-static-') && k !== CACHE_NAME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/admin.html') || url.pathname === '/admin.html' || url.pathname === '/admin' || url.pathname.endsWith('/admin')) return;
  if (url.searchParams.has('code')) return;

  // HTML navigations: Network-First with cache fallback
  if (req.mode === 'navigate' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(url.pathname, copy)).catch(() => {});
        }
        return res;
      }).catch(() => caches.match(url.pathname).then((c) => c || caches.match(req)).then((c) => c || new Response("<!DOCTYPE html><html><body><h1>Offline</h1><p>Vui lòng kiểm tra kết nối mạng.</p></body></html>", { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } })))
    );
    return;
  }

  // Static assets: Cache-First for ?v= versioned URLs, Stale-While-Revalidate otherwise
  if (STATIC_ASSET_RE.test(url.pathname)) {
    const isVersioned = url.searchParams.has('v');
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((cached) => {
          if (cached && isVersioned) return cached;
          const netFetch = fetch(req).then((res) => {
            if (res && res.ok && res.type === 'basic') cache.put(req, res.clone()).catch(() => {});
            return res;
          });
          if (cached) { event.waitUntil(netFetch.catch(() => {})); return cached; }
          return netFetch;
        })
      )
    );
  }
});
