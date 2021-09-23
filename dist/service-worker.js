importScripts("/precache-manifest.5c9ed1af68425101899aa98bfc9b3944.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-env browser, serviceworker, es6 */
self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: "Push teeeest",
    icon: "img/icons/android-chrome-512x512.png",
    badge: "img/icons/android-chrome-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});

