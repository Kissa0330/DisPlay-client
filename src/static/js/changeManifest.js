import { store } from "../../store/store";
function overWriteHref(relValue, href) {
  console.log("remove check...");
  const links = document
    .getElementsByTagName("head")[0]
    .getElementsByTagName("link");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.rel == relValue) {
      link.href = href;
    }
  }
}
let manifest;
const changeManifest = function () {
  console.log("changing manifest...");
  let icons;
  // console.log(Boolean(store.icons.length))
  if (!store.icons.length) {
    console.log("store.icons is not exist");
    icons = [
      {
        src: "https://display-client.herokuapp.com/img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://display-client.herokuapp.com/img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ];
  } else {
    console.log("store.icons is exist");
    for (let i = 0; i < store.icons.length; i++) {
      // console.log(i);
      let element = store.icons[i];
      // console.log(Boolean(element.src.match(/http:/)));
      if (element.src.match(/https:/)) {
        console.log("element.src already execute toBlob function");
      } else {
        const imageURL = toBlob(element.src);
        element.src = imageURL;
        console.log(
          "element.src is changed. New element.src is " + element.src
        );
        console.log("element.src execute toBlob function");
      }
    }
    icons = store.icons;
  }
  manifest = {
    name: "DisPlay-週間管理ツール",
    short_name: "DisPlay",
    background_color: "#f4f6fc",
    theme_color: "#f4f6fc",
    display: "standalone",
    start_url: "https://display-client.herokuapp.com/",
    icons,
    manifestCrossrigin: "use-credentials",
    gcm_sender_id: "319496590898",
  };
  console.table(manifest);
  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  console.log("manifestURL is " + manifestURL);
  overWriteHref("manifest", manifestURL);

  function toBlob(base64) {
    const bin = atob(base64.replace(/^.*,/, ""));
    let buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const blob = new Blob([buffer.buffer], {
      type: "image/png",
    });
    const iconURL = URL.createObjectURL(blob);
    return iconURL;
  }
};
export { changeManifest, manifest };
