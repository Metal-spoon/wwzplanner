module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/wwzplanner/" : "/",
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    },
    404: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: '404.html'
    }
  },
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
