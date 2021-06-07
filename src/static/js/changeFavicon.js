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
    addLink(image.src, "icon");
  };

  console.log(imagesSizes.length)
  for (let i = 0; i < imagesSizes.length; i++) {
    let imgSize = imagesSizes[i];
    console.log(i);
    changeSize(image, imgSize, imgSize);
    
    // todo JSONの上書き処理を書き込む
  }
  let docHead = document.getElementsByTagName("head")[0];

  function addLink(iconURL, relValue) {
    let link = document.createElement("link");
    link.type = "image/png";
    link.rel = relValue;
    link.href = iconURL;
    removeLinkIfExists(relValue);
    docHead.appendChild(link);
  }

  function removeLinkIfExists(relValue) {
    let links = docHead.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      if (link.type == "image/png" && link.rel == relValue) {
        docHead.removeChild(link);
        return;
      }
    }
  }

  function changeSize(img, width, height) {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    console.log(canvas);
    ctx.drawImage(img, 0, 0, width, height);
    const imgData = canvas.toDataURL("image/png");
    console.log(imgData);
  }
};
export { changeFavicon };
