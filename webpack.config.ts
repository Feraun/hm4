import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const pkg = require("./package.json");
const commonPaths = require("./build_utils/config/commonPaths");

const isDebug = process.env.NODE_ENV !== "production";

const port: number = Number(process.env.PORT) || 3000;

const config: Configuration & { devServer?: DevServerConfiguration } = {
  entry: commonPaths.entryPath,
  output: {
    uniqueName: pkg.name,
    publicPath: "/",
    path: commonPaths.outputPath,
    filename: `${pkg.version}/js/[name].[chunkhash:8].js`,
    chunkFilename: `${pkg.version}/js/[name].[chunkhash:8].js`,
    assetModuleFilename: isDebug
      ? `images/[path][name].[contenthash:8][ext]`
      : `images/[path][contenthash:8][ext]`,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      minify: !isDebug && {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${pkg.version}/css/[name].[contenthash:8].css`,
      chunkFilename: `${pkg.version}/css/[name].[contenthash:8].css`,
    }),
  ],
  devServer: {
    port: port,
    static: {
      directory: commonPaths.outputPath,
    },
    historyApiFallback: {
      index: "index.html",
    },
    webSocketServer: false,
  },
   module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ] as const,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    minimize: !isDebug,
    minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
  },
  devtool: isDebug ? 'source-map' : false,
  mode: isDebug ? 'development' : 'production',
};

export default config;