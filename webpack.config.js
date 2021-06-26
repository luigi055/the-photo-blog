const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

// Get All html files from /views
const htmlPages = fs.readdirSync(path.join(__dirname, "src", "views"));

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true,
	},
	module: {
		rules: [
			{
				test: "/.js$/",
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-transform-runtime"],
						},
					},
				], // end use
			}, // end .js rule
			{
				test: /\.(css)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			}, // end scss loader
			// {
			// 	test: "/.html$/",
			// 	use: [
			// 		{
			// 			loader: "html-loader",
			// 		},
			// 	],
			// },
		], // end rules Array
	}, // end module Object
	plugins: htmlPages
		.map(
			(page) =>
				new HtmlWebpackPlugin({
					filename: `${page}`,
					template: `./src/views/${page}`,
				})
		)
		.concat([
			new CleanWebpackPlugin(),
			new Dotenv(),
			new MiniCssExtractPlugin({
				filename: "style.css",
			}),
		]),
	devServer: {
		contentBase: path.join(__dirname, "public"),
		compress: true,
		port: 3000,
		clientLogLevel: "none",
		historyApiFallback: true,
		open: true,
	},
};
