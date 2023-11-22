// Paths to files
const paths = require('path');

module.exports = {
  // Where webpack should find source files to build bundle
  src: paths.resolve(__dirname, '../src'),

  // Where webpack should emit bundle
  build: paths.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: paths.resolve(__dirname, '../public'),
};
