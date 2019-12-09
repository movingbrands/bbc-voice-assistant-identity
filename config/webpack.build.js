const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const aliases = require("./aliases");

module.exports = {
  entry: {
    index: path.join(__dirname, "../src/index.js"),
    "index.min": path.join(__dirname, "../src/index.js")
  },
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.(glsl|vert|frag)$/,
        use: "raw-loader"
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: aliases,
    extensions: [".js", ".jsx"]
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "prop-types": "prop-types",
    "styled-components": "styled-components"
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/
      })
    ]
  }
};
