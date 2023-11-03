const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appSrc = path.join(__dirname, 'src/electron-renderer')
      paths.appIndexJs = path.join(__dirname, 'src/electron-renderer/index.tsx')
      webpackConfig.entry = path.join(__dirname, './src/electron-renderer/index.tsx')
      return webpackConfig
    },
  },
}
