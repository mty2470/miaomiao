const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
// vue 项目脚手架执行的配置
module.exports = {
  // publicPath:"/miaomiao",
  devServer: {
    // 配置本地服务器的正向代理（开发环境）
    proxy: {
      "/api": {
        target: "http://39.97.33.178",
        changeOrigin: true
      }
    }
  },

  // 进行 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
    //   .set("API", resolve("src/api"))
    //   .set("fetch", resolve("src/api/fetch"))
      .set("@views", resolve("src/views"))
      .set("@components", resolve("src/components"))
      .set("@assets", resolve("src/assets"));
  }
}
