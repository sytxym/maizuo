const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  devServer: {//配置反向代理
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true
      },
      // '/ajax': {
      //   target: 'https://i.maoyan.com',
      //   changeOrigin: true
      // }
      '/xym': {//自定义名称
        target: 'https://i.maoyan.com',
        changeOrigin: true,
        pathRewrite:{
          '^/xym':''
        }
      }
    }
  }
})
