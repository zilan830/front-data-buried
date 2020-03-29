

module.exports = {
	// 解析
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
		//alias: { '@': path.resolve(__dirname, 'src') }
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader'
			},
			{ enforce: 'pre', test: /\.(ts|tsx)$/, loader: 'source-map-loader' },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules)/
			},
			{
				test: /\.(woff|woff2|ttf|eot|png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			}
		]
	}
}
