// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: { type: 'module' },
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
     {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              typescript: true,
              ref: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs: '(stroke)'
                    }
                  }
                ]
              }
            }
          }
        ]
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  
experiments: { outputModule: true },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
