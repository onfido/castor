/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');

module.exports = {
  devtool: 'source-map',

  entry: resolve('src/index.html'),

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          // Make sure you pass the config file, if you're using one.
          // Otherwise specify similar options inline here.
          options: { configFile: resolve('.babelrc') },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            // webpack CSS modules are really finnicky, you've been warned:
            // https://github.com/webpack-contrib/css-loader#auto
            loader: 'css-loader',
            options: {
              // Enables CSS modules for .scss files only.
              // If you can't use this option, see `README.md`.
              modules: { auto: /\.scss$/ },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/i,
        use: 'file-loader',
      },
    ],
  },

  plugins: [new WebpackIndexHTMLPlugin()],
};
