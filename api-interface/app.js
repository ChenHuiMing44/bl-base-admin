/**
 * @2019-07-22
 * @author: huimingchen
 * desc: 该文件为mock服务 的根文件
 */
const path = require('path')
const express = require('express')
const expressMock = require('express-mockjs')

const port = 3002
const app = express()
// eslint-disable-next-line no-undef
// const server = http.createServer(app)

app.use('/api', expressMock(path.join(__dirname, 'mock')))

app.listen(port)
// server.on('listening', () => {
//
// })

// eslint-disable-next-line no-console
console.log(`the server http://0.0.0.0:${port}/api is opening`)
