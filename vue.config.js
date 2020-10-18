module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = 'Noiser - Free white noise generator';
          return args
        })
  }
};
