const { resolve } = require("path");

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://" + require("ip").address() + ":8082",
    "webpack/hot/only-dev-server",
    "./index.js"
  ],

  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: '/'
  },

  context: resolve(__dirname, "app"),

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, "app"),
    historyApiFallback: true,
    /** If you got Error: ENOSPC: System limit for number of file watchers reached error, please run below command to increase file watcher
     * echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
     */
    watchContentBase: true
    // publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { modules: false, useBuiltIns: "usage", corejs: 3 }], "@babel/preset-react"],
          plugins: [
            "react-hot-loader/babel",
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-optional-chaining",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import"
          ]
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/png",
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "application/font-woff",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "application/octet-stream",
              name: "fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/svg+xml",
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [resolve("./app"), "./node_modules"]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/app/index.html`,
      filename: "index.html",
      inject: "body"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    new CopyWebpackPlugin([{ from: "./vendors", to: "vendors" }]),
    new CopyWebpackPlugin([{ from: "./.htaccess", to: "./.htaccess", toType: "file" }])
  ],
};

module.exports = config;
