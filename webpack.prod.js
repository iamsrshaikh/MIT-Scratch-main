const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

process.env["NODE_ENV"] = "production";

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      // Uncomment this line if you're using terser-webpack-plugin for JS minification
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"), // Set the output directory
    filename: "bundle.js", // Name of the generated bundle
    publicPath: "/", // Base path for your application
  },
});
