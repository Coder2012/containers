const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const fontsInput = 'fonts'
const fontsOutput = 'fonts'
const imagesInput = 'images'
const imagesOutput = 'images'

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: "dist",
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["env"]]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "Containers",
      filename: "index.html"
    }),
    new CopyWebpackPlugin([
      { from: `${imagesInput}`, to: `${imagesOutput}` },
      { from: `${fontsInput}`, to: `${fontsOutput}` }
    ]),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/sw.js",
      globPatterns: ["/**/*.{js,json,css}"]
    })
  ]
};
