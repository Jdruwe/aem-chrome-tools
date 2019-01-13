const {resolve} = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");

const mode = process.env.NODE_ENV;
module.exports = {
    mode,
    devtool: "inline-source-map",
    entry: {
        "background": "./plugin-src/scripts/background/background.js",
        "environment-display": "./plugin-src/scripts/content/environment-display.js"
    },
    output: {
        publicPath: ".",
        path: resolve(__dirname, "dist/"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    plugins: [
        new ChromeExtensionReloader({
            entries: {
                contentScript: ['environment-display'],
                background: 'background'
            }
        }),
        new MiniCssExtractPlugin({filename: "style.css"}),
        new CopyWebpackPlugin([
            {from: "./manifest.json"},
            {from: "./icons"}
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [require("@babel/preset-env")]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            }
        ]
    }
};
