const path = require('path');
var glob = require("glob");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: glob.sync('./www/js/*.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'www/dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]_[hash:base64:8]'
            }
          },
          'postcss-loader',
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}