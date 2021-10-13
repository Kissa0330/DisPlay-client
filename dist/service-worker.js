importScripts("/precache-manifest.631792067bfafe3ac3e721c3f20dfc48.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-env browser, serviceworker, es6 */

function cmpNotification(title, options, registration) {
  // titleと通知時間が一緒の通知があるかを確認する
  // let getOptions = {
  //   tags: "something tags",
  // };
  registration.getNotifications().then(function (notifications) {
    console.log(notifications);
  });
  registration.showNotification(title, options);
}

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  console.log(event.data);

  const title = "準備はできていますか？";
  const options = {
    body: event.data.headers.title + "がそろそろ始まります！",
    icon: "img/icons/android-chrome-512x512.png",
    badge: "img/icons/android-chrome-192x192.png",
  };
  const registration = self.registration;
  event.waitUntil(cmpNotification(title, options, registration));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://display-client.herokuapp.com/"));
});

