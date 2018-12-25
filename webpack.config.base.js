const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// const px2rem = require('postcss-plugin-px2rem')
const sourcePath = path.resolve("src")

module.exports =  {
  //设置人口文件的绝对路径
  entry: {
    bundle: ["babel-polyfill", path.resolve("src/index.js")],
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve("./static"),
    filename: "[name].[hash:8].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    alias: {
      'resource': path.resolve("./src/util/resource.js"),
      'static': path.resolve("./src/static"),
      'utils': path.resolve("./src/util/utils.js"),
      'service': path.resolve("./src/service"),
      'components': path.resolve("./src/components"),
      'containers': path.resolve("./src/containers"),
      'constants': path.resolve("./src/constants"),
      'api': path.resolve("./src/api/index.js")
    },
    modules: [sourcePath, "node_modules"]
  },
  plugins: [
      new HtmlWebpackPlugin({
          // title: '贵州省煤矿产业云平',// 标题
          favicon:  path.resolve("./src/static/images/favicon.png"),
          template: './src/index.html', // 模板文件
          filename: './index.html' // 产出后的文件名称
      }),
      new ExtractTextPlugin("bundle.[hash:8].css"),
      // new webpack.LoaderOptionsPlugin({
      //   // test: /\.xxx$/, // may apply this only for some modules
      //   options: {
      //     postcss:  function () {
      //       return [px2rem({rootValue:75})]
      //     }
      //   }
      // })
  ]
};
