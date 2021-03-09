const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, "src/index.tsx"),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        esModule: false,
                        minimize: true,
                    }
                }
            },

        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html"
        }),
    ]
}

