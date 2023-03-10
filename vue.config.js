const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //Gzip
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 混淆代码 去掉注释
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const isProd = process.env.NODE_ENV === "production";

// 这里的webpack配置会和公共的webpack.config.js进行合并
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  lintOnSave: true, //设置是否在开发环境下每次保存代码时都启用eslint验证
  productionSourceMap: false,
  //对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"));
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    // config.plugins.delete('prefetch');
  },
  //调整 webpack 配置
  configureWebpack: (config) => {
    //生产and测试环境
    let pluginsPro = [
      new CompressionWebpackPlugin({
        //文件开启Gzip，也可以通过服务端(如：nginx)
        filename: "[path][name].gz",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8,
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false, // 去掉注释
          },
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ["console.log"], //移除console
          },
        },
      }),
    ];

    if (isProd) {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      config.plugins = [...config.plugins, ...pluginsPro];
    }

    // 取消webpack警告的性能提示
    config.performance = {
      hints: "warning",
      //入口起点的最大体积
      maxEntrypointSize: 1000 * 500,
      //生成文件的最大体积
      maxAssetSize: 1000 * 1000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js");
      },
    };
  },
  css: {
    // 是否使用css分离插件
    extract: isProd,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/var.scss";`,
      },
    },
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: {
    //   //配置自动启动浏览器
    //   "^/api": {
    //     target: "",
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //   },
    // },
  },
});
