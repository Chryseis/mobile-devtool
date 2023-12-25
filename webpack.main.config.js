const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  watch: process.env.NODE_ENV !== 'production',
  mode: process.env.NODE_ENV || 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-source-map',
  entry: './src/electron-main/main.ts',
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/main'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.join(__dirname, './src/electron-main'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.join(__dirname, './src/electron-main/tsconfig.json'), // 指定主进程的 tsconfig.json 文件
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, './src/electron-main/extensions'),
          to: 'extensions',
        },
      ],
    }),
  ],
}
