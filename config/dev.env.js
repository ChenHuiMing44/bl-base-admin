'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  ROUTER_DOC: '"kns-app"',
  DEBUG: true,
  MOCK: true
})
