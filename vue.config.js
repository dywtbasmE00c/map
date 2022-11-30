const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      AMap: 'AMap'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://restapi.amap.com/v3',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  }
});
