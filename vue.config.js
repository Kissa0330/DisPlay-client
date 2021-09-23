module.exports = {
  devServer: {
    port: 8081,
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    name: "DisPlay-週間管理ツール",
    themeColor: "#f4f6fc",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestCrossorigin: "use-credentials",
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon.png",
    },
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
  },
};
