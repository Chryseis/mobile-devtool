const path = require('path')

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appSrc = path.join(__dirname, 'src/electron-renderer')
      paths.appIndexJs = path.join(__dirname, 'src/electron-renderer/index.tsx')
      webpackConfig.entry = path.join(__dirname, './src/electron-renderer/index.tsx')
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.join(__dirname, './src/electron-renderer'),
      }

      const tsLoaderRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && rule.oneOf.some((loader) => loader.loader && loader.loader.includes('ts-loader'))
      )

      if (tsLoaderRule) {
        tsLoaderRule.oneOf.forEach((loader) => {
          if (loader.loader && loader.loader.includes('ts-loader')) {
            loader.options = {
              ...loader.options,
              configFile: path.join(__dirname, './src/electron-renderer/tsconfig.json'),
            }
          }
        })
      }

      return webpackConfig
    },
  },
}
