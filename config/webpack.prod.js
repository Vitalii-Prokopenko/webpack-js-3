const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
    runtimeChunk: {
      name: "runtime",
    },
  },
});
