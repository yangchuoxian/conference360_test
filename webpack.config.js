var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
	entry: './frontend/main',
	output: {
		path: __dirname,
		filename: './dist/bundle.js',
	},
	watch: false,
	resolve: {
		extensions: ['', '.js', '.ts']
	},
	// Depending on whether PROD_ENV=1 or not when running PROD_ENV=1 webpack, the following setting uses compress webpack plugin to minify the bundled js file
	plugins: PROD ? [
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false }
		})
	] : [],
	// load typescript source files with ts-loade and compiles
	module: {
		loaders: [{
			test: /\.ts/, loaders: ['ts-loader'], exclude: /node_modules/
		}]
	}
};