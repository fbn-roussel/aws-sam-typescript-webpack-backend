const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  devtool: 'source-map',

  externals: [nodeExternals()],

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
