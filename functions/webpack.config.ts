import { Configuration } from 'webpack';

import webpackNodeExternals from 'webpack-node-externals';

const config: Configuration = {
  mode: 'production',
  target: 'node',
  devtool: 'source-map',

  externals: [webpackNodeExternals()],

  entry: {
    'hello-function': './hello-function/src/app.ts',
    'goodbye-function': './goodbye-function/src/app.ts',
  },

  output: {
    filename: '[name]/dist/webpack/app.js',
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
