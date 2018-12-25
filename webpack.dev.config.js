//上帝保佑,永无bug
const path = require("path")
const webpack = require("webpack")
const openBrowserWebpackPlugin = require("open-browser-webpack-plugin")
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const proxyConfig = require('./proxy')
const portfinder = require('portfinder')

const devWebpackConfig = webpackMerge(baseConfig, {
  output: {
    path: path.resolve("./"),
    publicPath: '/',
    filename: "[name].[hash:8].js"
  },
  devServer: {
    disableHostCheck: true,
    hot: false,
    inline: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    contentBase: "./", // 配置文件的根目录
    // publicPath: path.resolve("./static"),
    proxy: proxyConfig
  },
  module: {
    // 配置编译打包规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.scss/,
        exclude: path.resolve(__dirname, "./src/static/scss/app.scss"),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?modules&localIdentName=[local]_[hash:base64:6]",
            "postcss-loader",
            "sass-loader",
            "resolve-url-loader",
            "sass-loader?sourceMap"
          ]
        })
      },
      {
        test: /\.scss/,
        include: path.resolve(__dirname, "./src/static/scss/app.scss"),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader",
            "sass-loader",
            "resolve-url-loader",
            "sass-loader?sourceMap"
          ]
        })
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)(\?t=[\s\S]+)?$/,
        use: ["url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]"]
      },
      {
        test: /\.(jpg|png|gif|swf)$/,
        use: ["url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]&outputPath=img/"]
      },
      {
        test: /\.json$/,
        use: ["json-loader"]
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"],
      minChunks: Infinity,
      filename: "js/[name].js"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new openBrowserWebpackPlugin({ url: `http://localhost:${port}` })
      )

      resolve(devWebpackConfig)
    }
  })
})
