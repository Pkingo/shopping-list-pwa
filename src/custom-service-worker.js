workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
  new RegExp("https:.*min.(css|js)"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "cdn-cache",
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
