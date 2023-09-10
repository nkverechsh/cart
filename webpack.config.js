const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/main.js",
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [{
        test: /\.scss|css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool: isProduction ? "hidden-source-map" : "source-map",
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/img", to: "static" }],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};