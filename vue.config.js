module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/scss/_variables.scss";
        `
      }
    }
  },
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  baseUrl: "./"
};
