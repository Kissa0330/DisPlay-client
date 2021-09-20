module.exports = {
  devServer: {
    port: 8081,
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    name: "DisPlay-週間管理ツール",
    themeColor: "#f4f6fc",
    msTileColor: "#000001",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestCrossorigin: "use-credentials",
    iconPaths: {
      appleTouchIcon: "imgs/icons/apple-touch-icon.png",
    },
    workboxOptions: {
      swSrc: "src/registerSW.js",
    },
    manifestPath: "https://display-client.herokuapp.com/manifest.json"
  },
};
