import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
const isDevelopment = process.env.NODE_ENV !== "production";

const config: Configuration = {
  name: "blog",
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "src"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@typings": path.resolve(__dirname, "src/typings"),
      //두번째 앞에 /src하지 말것.., 슬래쉬 꼭 빼주세욤..!
    },
  },
  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: isDevelopment ? "index.js" : "index.js",
  },

  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["IE 10"] },
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          env: {
            development: {
              plugins: [
                ["@emotion/babel-plugin", { sourceMap: true }],
                ["@babel/plugin-transform-runtime", { regenerator: true }],
                require.resolve("react-refresh/babel"),
              ],
            },
            production: {
              plugins: [
                "@emotion/babel-plugin",
                ["@babel/plugin-transform-runtime", { regenerator: true }],
              ],
            },
          },
        },
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? "development" : "production",
    }),
  ],

  devServer: {
    port: 4000,
    historyApiFallback: { disableDotRule: true, index: "/" },
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: ["/"],
      watch: { ignored: "/Users/jh/Desktop/PROJECT/blog/node_modules/" },
    },
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
    client: {
      logging: "log",
      progress: true,
    },
    devMiddleware: { publicPath: "" },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

if (isDevelopment && config.plugins) {
  console.log("DEVELOPMENT");
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: false })
  );
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
      title: "DEVELOPMENT",
    })
  );
}

if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: "static", openAnalyzer: false })
  );
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public", globOptions: { ignore: ["**/index.html"] } },
      ],
    })
  );
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
      minify: true,
    })
  );
}

export default config;
