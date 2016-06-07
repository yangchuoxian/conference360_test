var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
	entry: './frontend/main',
	output: {
		path: __dirname,
		filename: './dist/bundle.js',
	},
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	] : [],
	module: {
		loaders: [{
			test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
		}]
	}
};