const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

var htmlWebPackPluginConfig = new htmlWebPackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

var config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve('www'),
		filename: 'index.bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
	plugins: [htmlWebPackPluginConfig]
}

module.exports = config;