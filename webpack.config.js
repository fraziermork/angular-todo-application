const webpack = require('webpack');

let PATHS = {
  entry:  `${__dirname}/app/entry.js`,
  build:  `${__dirname}/build`
};

module.exports = {
  entry: PATHS.entry,
  output: {
    path:     PATHS.build,
    filename: 'bundle.js'
  }, 
  module: {
    loaders: [
      {
        test: /\.js$/, 
        loaders: ['babel'],
        include: `${__dirname}/app`
      }, 
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }, 
  devServer: {
    devtool:            'eval-source-map',
    contentBase:        PATHS.build, 
    historyApiFallback: true,
    hot:                true,
    inline:             true,
    progress:           true,
    stats:              'errors-only'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
