const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TenserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  }
  if(isProd){
    config.minimizer = [
      new TenserWebpackPlugin(),
      new CssMinimizerPlugin()
    ]
  }
  return config
}

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js"
  },
  optimization: optimization(),
  devServer: {
    port: 3800,
    hot: isDev
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", '.css']
  },
  devtool: 'source-map',
  plugins:[
    new HTMLWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from:path.resolve(__dirname, "public", "assets", "images", "static"), to: "./assets/images/"}
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          'css-loader']
      },
      {
        test: /\.(jpeg|jpg|png|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            rootMode: "upward"
          }
        }]
      }
    ]
  }
};
