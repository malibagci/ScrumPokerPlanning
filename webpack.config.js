var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "./dist/style/[name].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: './dist/js/[name].js'
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(node_modules)/',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015','stage-2']
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractSass
  ]
}