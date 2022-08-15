module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/wwzplanner/" : "/",
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
