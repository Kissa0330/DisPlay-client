const changeFavicon = function () {
  let svg = document.querySelector("svg");
  let svgData = new XMLSerializer().serializeToString(svg);

  let image;
  const images = {
    "android-chrome-192x192": 192,
    "android-chrome-512x512": 512,
  };
  const imagesSizes = Object.values(images);
  image = new Image();

  image.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(unescape(encodeURIComponent(svgData)));
  image.onload = function () {
    addLink(image.src, "icon", 307);
    for (let i = 0; i < imagesSizes.length; i++) {
      let imgSize = imagesSizes[i];
      console.log(i,imgSize+"pxのfaviconを更新中");
      changeFavicons(image, imgSize);
    }
  };

  let docHead = document.getElementsByTagName("head")[0];

  function addLink(iconURL, relValue, size) {
    let link = document.createElement("link");
    link.type = "image/png";
    link.rel = relValue;
    link.href = iconURL;
    link.sizes = size + "×" + size;
    removeLinkIfExists(relValue, size);
    docHead.appendChild(link);
  }

  function removeLinkIfExists(relValue, size) {
    let links = docHead.getElementsByTagName("link");
    let comparisonSize = size + "×" + size
    for (let i = 0; i < links.length; i++) {
      console.log(links.length)
      let link = links[i];
      console.log(i,link.href)
      if (
        link.rel == relValue &&
        link.sizes == comparisonSize
      ) {
        console.log(relValue,link.rel,link.sizes,comparisonSize)
        console.log("faviconをupdateしました");
        docHead.removeChild(link);
      }
    }
  }

  function changeSize(img, width, height) {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    const imgData = canvas.toDataURL("image/png");
    return imgData;
  }

  function changeFavicons(img, size) {
    const width = size;
    const height = size;
    const imgData = changeSize(img, width, height);
    addLink(imgData, "icon", size);
  }
};
export { changeFavicon };
