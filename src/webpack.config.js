/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const DEV_PORT = 4000;

module.exports = function(env, argv) {
  const isProd = !!env.production;
  const analyzeBundle = isProd && process.env.ANALYZE_BUNDLE === 'true';

  return {
    mode: isProd ? 'production' : 'development',

    devtool: isProd ? 'source-maps' : 'inline-source-map',

    stats: isProd ? 'errors-only' : 'normal',

    entry: ['react-hot-loader/patch', 'index'],

    output: {
      filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },

    resolve: {
      modules: [path.resolve('.'), 'node_modules'],
      extensions: ['.json', '.mjs', '.jsx', '.js', '.ts', '.tsx'],
      alias: {
        // https://github.com/gaearon/react-hot-loader#hot-loaderreact-dom
        'react-dom': '@hot-loader/react-dom',
      },
    },

    plugins: [
      // No need to type check when analyzing the JS bundle
      // NOTE: if type checking fails -> the build will fail
      !analyzeBundle && new ForkTsCheckerWebpackPlugin(),

      new HtmlWebpackPlugin({
        title: 'Instagram',
        template: HtmlWebpackTemplate,
        appMountId: 'root',
        inject: false,
        baseHref: '/',
        links: [
          {
            href: '/assets/favicon.ico',
            rel: 'icon',
          },
        ],
        meta: [
          {
            name: 'viewport',
            content:
              'width=device-width, initial-scale=1 , maximum-scale=1.0, user-scalable=0',
          },
        ],
      }),

      // Extract imported CSS into separate file for caching
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[chunkhash].css' : '[name].css',
      }),

      // Add any moment locales you need here
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),

      // Caching -> vendor hash should stay consistent between prod builds
      isProd && new webpack.HashedModuleIdsPlugin(),

      // Enable HRM for development
      !isProd && new webpack.HotModuleReplacementPlugin(),

      analyzeBundle && new BundleAnalyzerPlugin(),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            quiet: true, // Don't report warnings
          },
        },

        {
          test: /\.(js|tsx?)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },

        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            // Ignore libs that don't have source maps
            // -> they will spit a lot of webpack warnings to the console
          ],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: ['file-loader'],
          exclude: /node_modules/,
        },

        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: ['file-loader'],
          exclude: /node_modules/,
        },

        {
          test: /\.css$/,
          use: [
            // NOTE: don't extract CSS in development
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
                // NOTE: modules true seems to break external styles, for example toastify.
                // modules: true,
              },
            },
          ],
        },
      ],
    },

    optimization: {
      runtimeChunk: true,
      namedModules: true,
      namedChunks: true,
      // Extract third-party libraries (lodash, etc.) to a separate vendor chunks
      // NOTE: remove topcon related libs since they are dynamically loaded!
      splitChunks: {
        name: true,
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          // Separate react-dates into it's own bundle since it is huge
          datepicker: {
            test: /[\\/]node_modules[\\/]react-dates[\\/]/,
            name: 'datepicker',
            chunks: 'all',
            priority: 30,
          },

          vendor: {
            priority: 20,
            test: /[\\/]node_modules[\\/]/,
            name: module => {
              let pkgName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];

              if (pkgName.includes('topcon')) {
                pkgName = undefined;
              } else {
                pkgName = 'vendor';
              }

              return pkgName;
            },
          },

          commons: {
            priority: 10,
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    },

    devServer: isProd
      ? undefined
      : {
          port: DEV_PORT,
          public: 'localhost',
          https: false,
          hot: true,
          historyApiFallback: true,
          stats: 'errors-only',
          open: false,
          lazy: false,
          watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
          },
        },
  };
};
