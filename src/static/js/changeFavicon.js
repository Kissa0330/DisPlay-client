const changeFavicon = function () {
  let svg = document.querySelector("svg");

  let svgData = new XMLSerializer().serializeToString(svg);

  let canvas = document.createElement("canvas");

  canvas.width = svg.width.baseVal.value;
  canvas.height = svg.height.baseVal.value;

  let ctx = canvas.getContext("2d");

  let image = new Image();
  // console.log(svgData);

  // svgDataをURIデータに変換後base64データに変換し、imageのsrcの属性値に設定
  image.src =
    "data:image/svg+xml;charset=utf-8;base64," +
    btoa(unescape(encodeURIComponent(svgData)));

  let docHead = document.getElementsByTagName("head")[0];

  function change(iconURL) {
    addLink(iconURL, "icon");
  }

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

  image.onload = function () {
    ctx.drawImage(image, 0, 0); //空要素の作成
    change(image.src);
    
  };
};

export { changeFavicon };
