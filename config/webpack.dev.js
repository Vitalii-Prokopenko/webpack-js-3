const { merge } = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 7777,
  },
});
