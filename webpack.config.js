const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
	entry: "./app/index.ts",

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/assets/",
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
	],

	devServer: {
		port: 7001,
		open: true,
		contentBase: path.join(__dirname, 'public'),
	},
};
