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
        "options": "./plugin-src/options/options.js",
        "other": "./plugin-src/options/other.js",
        "content-environment-display": "./plugin-src/scripts/content/environment-display.js",
        "content-component-detail": "./plugin-src/scripts/content/component-detail.js",
        "feature-environment-display": "./plugin-src/options/feature-environment-display.js"
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
                contentScript: ['content-environment-display'],
                background: 'background'
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin([
            {from: "./manifest.json"},
            {from: "./icons"},
            {from: "./plugin-src/options/**/*.css", flatten: true},
            {from: "./plugin-src/options/**/*.html", flatten: true},
            {from: "./plugin-src/images/**/*", flatten: true},
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
