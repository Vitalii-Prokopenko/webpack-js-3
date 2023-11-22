const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require("./paths");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    app: `${paths.src}/index.js`,
  },
  output: {
    path: paths.build,
    filename: isDev
      ? "js/[name].bundle.js"
      : "js/[name].[contenthash].bundle.js",
    publicPath: "/",
    assetModuleFilename: isDev
      ? "assets/[name].[ext][query]"
      : "assets/[name].[contenthash].[ext][query]",
  },
  devtool: isDev ? 'eval' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.public,
            to: 'assets',
            globOptions: {
              ignore: ['*.DS_Store'],
            },
            noErrorOnMissing: true,
          },
        ],
      }),
    new HtmlWebpackPlugin({
      title: "Webpack template",
      template: `${paths.src}/template.html`,
      filename: "index.html",
      favicon: `${paths.public}/favicon/corona.png`,
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev ? true : false, importLoaders: isDev ? 1 : 2, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: isDev ? true : false } },
          { loader: 'sass-loader', options: { sourceMap: isDev ? true : false } },
        ],
      },
    ],
  },
  resolve: {
    modules: [paths.src, "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": paths.src,
      assets: paths.public,
      "@js": `${paths.src}/js`,
      "@scss": `${paths.src}/scss`,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
