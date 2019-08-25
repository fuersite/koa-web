const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcResolve = function (file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function (file) {
  return path.join(__dirname, '..', 'dist', file);
};

module.exports = {
  entry: {
    'index': srcResolve('js/index'),
    'admin' : srcResolve('pages/admin.js'),
    'work' : srcResolve('pages/work.js'),
    'index' : srcResolve('pages/index.js'),
    'error' : srcResolve('pages/error.js'),
  },
  output: {
    path: distResolve(''),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ["react","es2015"] }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [];
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
