const { defineConfig } = require("@vue/cli-service");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      AMap: "AMap",
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      // "/api": {
      //   target: "https://restapi.amap.com/v3",
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "",
      //   },
      // },
      "/user_api": {
        // target: "http://10.253.191.225:8081",
        target: "http://169.254.82.194:8081",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/user_api": "",
        },
      },
    },
  },
});
