/* eslint-disable no-console */
import { register } from "register-service-worker";
import { registerNotification } from "./swModule";

let isSubscribed = false;
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
        isSubscribed = !(subscription == null);
        console.log(subscription);
        if (isSubscribed) {
          console.log("User is subscribed.");
        } else {
          console.log("User is NOT subscribed.");
          swReg.pushManager
            .subscribe({
              userVisibleOnly: true
            })
            .then(function (subscription) {
              console.log("Test");
              console.log("User is subscribed:", subscription);
              registerNotification();
              isSubscribed = true;
            })
            .catch(function (err) {
              console.log("Failed to subscribe the user: ", err);
            });
        }
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
