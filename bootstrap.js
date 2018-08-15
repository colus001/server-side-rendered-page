require('file-loader')
require('babel-register')({
  ignore: [/node_modules/],
  presets: ['react-app']
})

require('./static-page-generator')
