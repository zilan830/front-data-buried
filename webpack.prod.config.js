
/* eslint-disable */

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

//开发时启动example的index
module.exports = merge(baseWebpackConfig, {
	entry: {
		bundle: path.resolve(__dirname, 'src/indec.ts')
	},
	output: {
		path: path.resolve(__dirname, 'lib'), // 输出目录
		filename: '[name].js', // 输出文件
		libraryTarget: 'umd', // 采用通用模块定义
		library: 'buried', // 库名称
		libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
		globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
	},
	mode: 'production',
	devtool: '#source-map',
	//插件
	plugins: [
		// 热更新相关
		new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                mangle: true
            },
            sourceMap: true
        })
	],
	optimization: {
		//nodeEnv: JSON.stringify(env)
	}
})
