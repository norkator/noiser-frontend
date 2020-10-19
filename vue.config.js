module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = 'Noiser - Free white noise generator';
          return args
        })
  },
  pwa: {
    themeColor: "#DE6262",
    msTileColor: "#DE6262",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#DE6262"
    }
  }
};
