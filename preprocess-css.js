'use strict'

const postcss = require('postcss')
const processors = require('./brunch-config').config.plugins.postcss.processors

module.exports = (css, from) => (
  postcss(processors).process(css, {from}).css
)
