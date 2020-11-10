import { Configuration, Entry } from 'webpack';

import fs from 'fs-extra';
import webpackNodeExternals from 'webpack-node-externals';

const apps: Entry = {};
fs.readdirSync('./')
  .filter((file) => file.endsWith('-function'))
  .forEach(function (app) {
    console.log(app + ' found !');
    apps[app] = './' + app + '/src/app.ts';
  });

const config: Configuration = {
  mode: 'production',
  target: 'node',
  devtool: 'source-map',

  externals: [webpackNodeExternals()],

  entry: apps,

  output: {
    filename: '[name]/dist/app.js',
    path: __dirname,
    libraryTarget: 'commonjs',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
      },
    ],
  },
};

export default config;
