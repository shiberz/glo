const glob = require('glob');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html').map(dir =>
    new HTMLWebpackPlugin({
      filename: path.basename(dir), // Output
      template: dir, // Input
    }));

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: ['./src/js/app.js', './src/style/main.scss', './src/style/expert_page.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'ssi-loader',
            options: {
              locations: {
                "include": "./src/includes",
              }
            }
          }
        ]        
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/static/',
      to: './static/',
    }]),
    ...generateHTMLPlugins(),
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
