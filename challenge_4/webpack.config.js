const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/client/app.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: __dirname + '/client/index.html',
      filename: __dirname + '/public/index.html'
    })
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  }
};