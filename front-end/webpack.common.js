'use strict';

require('dotenv').config();

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    title: 'World Leaders',
  }),
  new MiniCssPlugin({
    filename: '[name].[hash].css',
  }),
  new DefinePlugin({
    REST_API_URL: JSON.stringify(process.env.REST_API_URL),
    GRAPHQL_API_URL: JSON.stringify(process.env.GRAPHQL_API_URL),
    GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
  }),
];

webpackConfig.module = {};

webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader',
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-transform-react-jsx-source'],
        cacheDirectory: true,
      },
    },
  },
];
