const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
// vue 项目脚手架执行的配置
module.exports = {
  devServer: {
    // 配置本地服务器的正向代理（开发环境）
    proxy: {
      "/api": {
        target: "http://39.97.33.178",
        // target: "http://192.168.137.1:9090",
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
