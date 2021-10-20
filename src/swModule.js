/* eslint-disable */
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(unescape(encodeURIComponent(base64)));
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function updateSubscriptionOnServer(subscription) {
  //todo serverにsubscriptionを登録する
}
async function registerNotification() {
  const reg = await navigator.serviceWorker.getRegistration();
  console.log("creating notification");
  Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
      // プッシュ通知許可されない場合エラー
      alert("If you want to use push notifications, you have to allow push notifications!");
      return;
    }

    // プッシュ通知の登録
    reg
      .showNotification("Test", {
        tag: "test",
        body: "This is test notification.",
        timestamp: 100000,
      })
      .then(() => {
        console.log("created notification");
      });
  });
}
export { urlB64ToUint8Array, updateSubscriptionOnServer, registerNotification };
