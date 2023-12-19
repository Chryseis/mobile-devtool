const path = require('path')

module.exports = {
  watch: process.env.NODE_ENV !== 'production',
  mode: process.env.NODE_ENV || 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-source-map',
  entry: {
    preload: path.join(__dirname, './src/electron-main/preload.ts'),
    'preload-simulator': path.join(__dirname, './src/electron-main/preload-simulator.ts'),
  },
  target: 'electron-preload',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/main'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
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
}
