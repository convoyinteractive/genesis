const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

let views = fs.readdirSync('./src/views/').filter(function(file) {
    return file.match(/.*\.html$/);
}).map(function(view) {
    return './src/views/' + view;
});

module.exports = {
    entry: [
        './src/main.js',
        './src/assets/sass/app.scss',
        ...views
    ],

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/app.js'
    },

    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3000,
        open: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /.scss$/,
                use: [
                    {
                        loader:ExtractCssChunks.loader,
                        options: {
                            hot: true,
                            reloadAll: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /index\.html/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                return file.split('/').slice(-1).pop().replace(':', '/').replace('.html', '/') + 'index.html';
                            }
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader?interpolate'
                    }
                ]
            },
            {
                test: /index\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'index.html',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader?interpolate'
                    }
                ]
            },
            {
                test: /\.htm$/, 
                use: [
                    {
                        loader: 'html-loader?interpolate'
                    }
                ]
            },
        ],
    },

    plugins: [
        new ExtractCssChunks(
            {
              filename: "css/app.css",
              chunkFilename: "css/[id].css",
              orderWarning: true,
            }
        ),

        new CopyPlugin([
            { from: 'src/static' },
        ]),
    ]
};