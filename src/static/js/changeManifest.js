// import { store } from "../../store/store";
const changeManifest = function () {
  console.log("changing manifest...");
  // let icons;
  // console.log(Boolean(store.icons.length))
  document.querySelector("#my-manifest").setAttribute("href", "/manifest.json");
  // if (!store.icons.length) {
  //   console.log("true");
  //   icons = [
  //     {
  //       src: "http://localhost:8081/defaultIcons/android-chrome-192x192.png",
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //     {
  //       src: "http://localhost:8081/defaultIcons/android-chrome-512x512.png",
  //       sizes: "512x512",
  //       type: "image/png",
  //     },
  //   ];
  // } else {
  //   console.log("false");
  //   icons = store.icons;
  // }
  // icons = [
  //   {
  //     src: "http://localhost:8081/defaultIcons/android-chrome-192x192.png",
  //     sizes: "192x192",
  //     type: "image/png",
  //   },
  //   {
  //     src: "http://localhost:8081/defaultIcons/android-chrome-512x512.png",
  //     sizes: "512x512",
  //     type: "image/png",
  //   },
  // ];
  let manifest = {
    name: "DisPlay-週間管理ツール",
    short_name: "DisPlay",
    background_color: "#f4f6fc",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "http://localhost:8081/defaultIcons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "http://localhost:8081/defaultIcons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
  console.log(manifest);
  // console.log(manifest)
  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  // console.log(manifestURL)
  document.querySelector("#my-manifest").setAttribute("href", manifestURL);
};
export { changeManifest };
