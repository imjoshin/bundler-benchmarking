const path = require('path');

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules|scripts/
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
};