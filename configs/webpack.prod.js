const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const common = require('../webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack')

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


module.exports = merge(common, {
  externals: {
    "pdfjs-dist": "pdfjsDistWebPdfViewer",
    "pdfjs-dist/lib/web/pdf_link_service": "pdfjsDistWebPdfViewer.PDFJS"
  },
  entry: {
    index: ['./src/index.tsx'],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'aphrodite',
      'axios',
      'react-router-dom',
      'react-grid-system',
      'pikaday',
      'lodash',
      'react-responsive-modal',
      'mousetrap',
      'mousetrap-global-bind',
      'local-storage',
      'svg.js',
      'signature_pad',
      'simple-crypto-js',
      'number-formatter',
      'google-charts'
    ]
  },
  // module: {
  //   rules: [
  //     {
  //         test: /\.less$/,
  //         use: extractLess.extract({
  //             use: [{
  //                 loader: "css-loader"
  //             }, {
  //                 loader: "less-loader"
  //             }],
  //             // use style-loader in development
  //             fallback: "style-loader"
  //         })
  //     }
  //   ]
  // },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'meta',
      chunks: ['vendor'],
      filename: 'meta.[hash].js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
          comments: false,
          compress: {
              // warnings: false,
              // drop_console: true,
         },
      }
    }),
    // extractLess,
    new CompressionPlugin({
      test: /\.js/
    }),
    new webpack.IgnorePlugin(/moment/)
  ]
});
