const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	target: 'web',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',

				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],

				exclude: /node_modules/,
			},
		],
	},
}
