const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.193:80',
        changeOrigin: true
      }
    }
  }
})
