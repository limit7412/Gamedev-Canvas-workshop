const path = require('path');

// NOTE: 下記を参考にした
// https://qiita.com/EBIHARA_kenji/items/31b7c1c62426bdabd263
module.exports = {
  mode: 'development',

  entry: './ts/index.ts',

  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: 'ts-loader'
    }]
  },
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [
      '.ts',
      '.js'
    ]
  }
};