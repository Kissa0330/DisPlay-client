let key = process.env.NODE_ENV;
console.log(key);
if (process.env.NODE_ENV === "production") {
  navigator.serviceWorker
    .register(`${process.env.BASE_URL}registerSW.js`)
    .catch(console.error.bind(console));
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.pushManager.subscribe({ userVisibleOnly: true });
    })
    .then((subscription) => {
      console.log(`GCM EndPoint is: ${subscription.endpoint}`);
      let mySubscription = subscription.toJSON();
      console.log(`subscription is: ${mySubscription}`);
    })
    .catch(console.error.bind(console));
  self.addEventListener("push", (event) => {
    console.info("push", event);

    const message = event.data ? event.data.text() : "予定が始まる時間です！";

    event.waitUntil(
      self.registration.showNotification("Push Notification Title", {
        body: message,
        icon: "https://display-client.herokuapp.com/image/android-chrome-512x512.png",
        tag: "reminder",
      })
    );
  });
}
