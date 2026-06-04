/* ========================================================================
 * Maritime Procurement Dashboard — Service Worker
 * Strategia: stale-while-revalidate per la shell e i dati.
 * - La dashboard funziona anche offline mostrando l'ultima copia cachata.
 * - Al ritorno della rete, aggiorna in background.
 * ====================================================================== */

const CACHE_NAME = "mpd-v0.1";
const SHELL_URLS = [
  "./",
  "./index.html"
];

// Install: precache shell minima
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: pulisce cache vecchie
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate per quasi tutto, ignora gli external CDN
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Solo richieste GET dalla stessa origine + raw.githubusercontent.com per i JSON
  if (event.request.method !== "GET") return;
  const sameOrigin = url.origin === location.origin;
  const isDataFile = url.host === "raw.githubusercontent.com" &&
                     url.pathname.includes("/maritime-dashboard/");

  if (!sameOrigin && !isDataFile) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const network = fetch(event.request)
          .then(res => {
            if (res && res.status === 200) {
              cache.put(event.request, res.clone());
            }
            return res;
          })
          .catch(() => cached);  // se la rete fallisce, ritorna cache se c'è
        return cached || network;
      })
    )
  );
});
