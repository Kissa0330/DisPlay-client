const changeManifest = function (icons) {
  // console.log(icons)
  document.querySelector("#my-manifest").setAttribute("href", "/manifest.json");

  let manifest = {
    name: "DisPlay-週間管理ツール",
    short_name: "DisPlay",
    background_color: "#f4f6fc",
    display: "standalone",
    start_url: "/",
    icons
  };
  // console.log(manifest)
  const stringManifest = JSON.stringify(manifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  // console.log(manifestURL)
  document.querySelector("#my-manifest").setAttribute("href", manifestURL);
};
export { changeManifest };
