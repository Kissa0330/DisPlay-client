async function registerNotification() {
  const reg = await navigator.serviceWorker.getRegistration();
  console.log("creating notification");
  Notification.requestPermission().then((permission) => {
    if (permission !== "granted") {
      // プッシュ通知許可されない場合エラー
      alert("You have to allow push notifications!");
      return;
    }

    // プッシュ通知の登録
    reg
      .showNotification("Test", {
        tag: "test",
        body: "This is test notification.",
        timestamp: "2021/09/24 12:25:22",
      })
      .then(() => {
        console.log("created notification");
      });
  });
}
export { registerNotification };
