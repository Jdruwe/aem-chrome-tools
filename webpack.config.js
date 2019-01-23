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
        "environment-display": "./plugin-src/scripts/content/environment-display.js",
        "options": "./plugin-src/options/options.js"
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
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin([
            {from: "./manifest.json"},
            {from: "./icons"},
            {from: "./plugin-src/options/options.html"},
            {from: "./plugin-src/options/**/*.html", to: 'options', ignore: ['options.html'], flatten: true},
            {from: "./plugin-src/options/**/*.js", to: 'options', ignore: ['options.js'], flatten: true}
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
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            }
        ]
    }
};
