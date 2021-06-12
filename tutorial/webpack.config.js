const path = require('path')
const loader = require('sass-loader')
const TerserPlugin=require('terser-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "./dist"),
        publicPath: "dist/"
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition:
                    {
                        maxSize: 100 * 1024 //3 kilobytes
                    }
                }
            },
            {
                test: /\.txt/,
                type: "asset/source"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //env preset compiles ECMAScript 6,7,8,9,10 ... to ecmascript version 5
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    plugins:[new TerserPlugin()]
}