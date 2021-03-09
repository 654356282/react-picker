const path = require("path")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    entry: [
        'react-hot-loader/patch',
        path.resolve(__dirname, "src/index.tsx"),
        path.resolve(__dirname, "public/index.html")
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    output: {
        filename: "[name].[contenthash:5].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: [
                    {loader: "babel-loader"},
                    {loader: "ts-loader"}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    "@teamsupercell/typings-for-css-modules-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ]
            }
        ]
    }
}

