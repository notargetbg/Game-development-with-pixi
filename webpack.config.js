const path = require('path');
const path_DIR = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path_DIR
    },
    module: {
        rules: [
            // {
            //     test: /\.txt$/,
            //     use: 'raw-loader'
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }            
        ]   
    },
    mode: 'development',
    devServer: {
        contentBase: path_DIR,
        hot: true
    },
    plugins: [
    //    new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: path_DIR
        }])
    ]
};

module.exports = config;