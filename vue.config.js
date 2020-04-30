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
  transpileDependencies: [
    "vuetify",
    /\/node_modules\/d3-array\//,
    /\/node_modules\/d3-scale\//
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  },
  publicPath: "/" // also set in src/constants/config
};
