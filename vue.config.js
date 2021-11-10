// ***THE DEPLOY DIRECTORY***
const publicPath = "/applications/veo/";

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    banner: {
      entry: "public/uswds-banner.js",
      template: "public/uswds-banner.html",
      filename: "uswds-banner.html"
    }
  },
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
  // don't fail the build on eslint, prettier, or vue style failures
  // this is temporary while errors are being addressed
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .tap(opts => ({ ...opts, emitWarning: true }));
  },
  publicPath: publicPath
};
