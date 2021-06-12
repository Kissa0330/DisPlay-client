import iconBase from "./iconBase.json";
const changeFavicon = function () {
  let svg = document.querySelector("svg");
  let svgData = new XMLSerializer().serializeToString(svg);
  const images = {
    "android-chrome-192x192": 192,
    "android-chrome-512x512": 512,
    icon: 307,
  };
  const imagesSizes = Object.values(images);
  let baseImage = new Image();
  baseImage.src = Object.values(iconBase);
  // console.log(baseImage.src)
  let image = new Image();
  image.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(unescape(encodeURIComponent(svgData)));
  // 実行部分
  // image.onload = function () {
  //   console.log(baseImage.src)
  //   for (let i = 0; i < imagesSizes.length; i++) {
  //     const imgSize = imagesSizes[i];
  //     console.log(i, imgSize + "pxのfaviconを更新中");
  //     changeFavicons(baseImage, image, imgSize);
  //   }
  // };
  baseImage.onload = () => {
    // console.log("test");
    image.onload = () => {
      for (let i = 0; i < imagesSizes.length; i++) {
        const imgSize = imagesSizes[i];
        console.log(i, imgSize + "pxのfaviconを更新中");
        changeFavicons(baseImage, image, imgSize);
      }
    };
    async function changeFavicons(baseimg, img, size) {
      console.log("I am async changeFavicons");
      const width = size;
      const height = size;
      const imgData = await changeSize(baseimg, img, width, height);
      console.log("I am await changesizes");
      console.log(imgData);
      addLink(imgData, "icon", size);
    }
  };
  const docHead = document.getElementsByTagName("head")[0];

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
    const links = docHead.getElementsByTagName("link");
    const comparisonSize = size + "×" + size;
    for (let i = 0; i < links.length; i++) {
      // console.log(links.length)
      const link = links[i];
      // console.log(i,link.href)
      if (link.rel == relValue && link.sizes == comparisonSize) {
        // console.log(relValue,link.rel,link.sizes,comparisonSize)
        console.log("faviconをupdateしました");
        docHead.removeChild(link);
      }
    }
  }

  async function changeSize(baseimg, img, width, height) {
    console.log("I am async changeSize");
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = width * 0.7;
    canvas.height = height * 0.7;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let image = new Image();
    image.src = canvas.toDataURL("image/png");
    // console.log(img.src);
    // console.log(image.src);
    // console.log(canvas.toDataURL("image/png"))
    let baseCanvas = document.createElement("canvas");
    document.body.appendChild(baseCanvas);
    baseCanvas.width = width;
    baseCanvas.height = height;
    let baseCtx = baseCanvas.getContext("2d");
    baseCtx.drawImage(baseimg, 0, 0, baseCanvas.width, baseCanvas.height);
    const imgData = await concatCanvas(baseCanvas, image);
    console.log("I am await concatCanvas");
    return imgData;
  }

  async function concatCanvas(baseCanvas, img) {
    // console.log(img.src);
    const ctx = baseCanvas.getContext("2d");
    // console.log(baseCanvas.toDataURL("image/png"))
    // console.log(img, 0, 0, baseCanvas.width, baseCanvas.height);
    const res = await loadImage(img.src);
    console.log("I am img.onload");
    ctx.drawImage(res, 0, 0, baseCanvas.width, baseCanvas.height);
    let imgData = baseCanvas.toDataURL("image/png");
    // console.log(imgData);
    console.log("return");
    return imgData;
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }
};
export { changeFavicon };
