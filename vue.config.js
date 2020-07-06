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
  // don't fail the build on eslint, prettier, or vue style failures
  // this is temporary while errors are being addressed
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(opts => ({ ...opts, emitWarning: true }));
  },
  publicPath: "/" // also set in src/constants/config
};
