const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules|scripts/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUNDLER_NAME: JSON.stringify('webpack'),
      }
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
}