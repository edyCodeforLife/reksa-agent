const merge = require('webpack-merge');
const common = require('../webpack.common.js');

module.exports = merge(common, {
  watch: true,
  // devtool: 'inline-source-map',
  // module: {
  //     rules: [{
  //         test: /\.less$/,
  //         use: [{
  //             loader: "style-loader"
  //         }, {
  //             loader: "css-loader"
  //         }, {
  //             loader: "less-loader", options: {
  //                 strictMath: true,
  //                 noIeCompat: true
  //             }
  //         }]
  //     }]
  // },
  devServer: {
    contentBase: './dist'
  }
});
