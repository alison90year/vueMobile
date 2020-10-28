const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath:'./',
  lintOnSave:process.env.NODE_ENV === 'development',
  devServer: {
    host: '0.0.0.0',//对应的主机名
    port: 8084,//端口号
    proxy: {
      // //配置跨域
      '/api': {//配置跨域的名字
        target:process.env.VUE_APP_SELF_API,//跨域的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
      config.resolve.alias
        .set('@', resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('api',resolve('src/api'))
        .set('components',resolve('src/components'))
        .set('views',resolve('src/views'))
        .set('styles',resolve('src/styles'))
  }
}