'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//全部接口走代理
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EVN_CONFIG: '"dev"',
  ROUTER_DOC: '"kns-app"',
  DEBUG: true,
  MOCK: false,
  YAPI: false //是否走YAPI
})
