import { register } from "register-service-worker";
import { urlB64ToUint8Array, updateSubscriptionOnServer, registerNotification } from "./swModule";

let isSubscribed = false;
const applicationServerPublicKey =
  "BL-xXV1DPVYJlGjARPuxZ2UHejlCof0egV0BfRcMYFcP1qXhOGExz7V29x5ptgILY0oavnQZ5yroPk2Fq1ppook";
if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered(swReg) {
      console.log("Service Worker is registered", swReg);
      swReg.pushManager.getSubscription().then(function (subscription) {
        isSubscribed = !(subscription === null);

        updateSubscriptionOnServer(subscription);

        if (isSubscribed) {
          console.log("User is subscribed.");
        } else {
          console.log("User is NOT subscribed.");
          const applicationServerKey = urlB64ToUint8Array(
            applicationServerPublicKey
          );
          swReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey,
            })
            .then(function (subscription) {
              console.log("User is subscribed:", subscription);

              updateSubscriptionOnServer(subscription);
              registerNotification();

              isSubscribed = true;
            })
            .catch(function (err) {
              console.log("Failed to subscribe the user: ", err);
            });
        }
        registerNotification();
        swReg.getNotifications().then(function (notifications) {
          console.log("1");
          console.log(notifications);
        });
        swReg
        .showNotification("Test", {
          tag: "test",
          body: "This is test notification.",
          timestamp: 60000,
        })
        .then(() => {
          console.log("created notification");
        });
        swReg.getNotifications().then(function (notifications) {
          console.log("2");
          console.log(notifications);
        });
      });
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}