const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/BC-FSD2-Code_Challenge/' : '/',
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'BC Paint Co. Portal'
    }
  }
})
