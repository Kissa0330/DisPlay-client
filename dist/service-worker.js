importScripts("/precache-manifest.5324e102faa6910b27e3ad5689ebc1a4.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-env browser, serviceworker, es6 */
self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "準備はできていますか？";
  const options = {
    body: "あなたが設定した予定や習慣がそろそろ始まります！",
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

