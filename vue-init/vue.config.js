
const path = require('path');
const resolve = (dir) => {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath:'./',
  lintOnSave:process.env.NODE_ENV === 'development',
  devServer: {
    host: '0.0.0.0',//对应的主机名
    port: 8084,//端口号
    proxy: {
      '/dev': {
        target:process.env.VUE_APP_BASEURL,//跨域的地址
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            overrideBrowserslist: ["last 20 versions"], // 记得这里要把 browsers 改为 overrideBrowserslist，autoprefixer 新版本的写法有变
          }),
          require('postcss-pxtorem')({
            rootValue :37.5, // 换算的基数 100px /37.5 =  rem
            propList: ['*'],
            exclude: 'node_modules',
          }),
        ]
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule
      .use("vue-svg-loader")
      .loader("raw-loader")
      .tap((options) => {
        // 修改它的选项...
        options = {
          esModule: false,
        };
        return options;
      });
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('api',resolve('src/api'))
      .set('components',resolve('src/components'))
      .set('views',resolve('src/views'))
      .set('styles',resolve('src/styles'))
  }
}