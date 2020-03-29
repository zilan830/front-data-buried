const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.config')
const env = process.env.NODE_ENV

//开发时启动example的index
module.exports = merge(baseWebpackConfig, {
	entry: {
        bundle: path.resolve(__dirname, 'examples/index.tsx'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'examples/dist'),
        filename: '[name].js'
      },
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: false, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
		historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		compress: true, // 启用gzip压缩
		inline: true, // 设置为true，当源文件改变时会自动刷新页面
		hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
		host: 'localhost', // 设置默认监听域名，如果省略，默认为“localhost”
		//host:"192.168.11.39",
		port: 8186 // 设置默认监听端口，如果省略，默认为“8080”
	},
	module: {
		rules: [
			{
				test: /\.css|less$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader', // compiles Less to CSS
						options: { javascriptEnabled: true }
					}
				]
			}
		]
	},
	//插件
	plugins: [
		// 热更新相关
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: '运营平台',
			filename: './index.html', // 生成的html文件存放的地址和文件名
			template: './examples/index.html', // 基于index.html模板进行生成html文件
            inject: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		})
	]
})
