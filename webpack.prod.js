const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  mode: "development",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    libraryExport: "default",
    library: "dist",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    corejs: 3,
                  },
                ],
              ],
            },
          },
          { loader: "ts-loader" },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
}
