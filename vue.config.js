module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      less: {
        additionalData: '@import "@/style/variables";',
      },
    },
  },
  devServer: {
    server: 'https'
  }
};
