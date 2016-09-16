'use strict'

const fs = require('fs')

const main = require('tasty-pokedex').server

const sslPath = '/etc/ssl/private/server'

process.on('SIGINT', () => {
  process.exit()
})

process.on('SIGTERM', () => {
  process.exit()
})

main({
  ssl: true,
  cert: fs.readFileSync(`${sslPath}.crt`),
  key: fs.readFileSync(`${sslPath}.key`),
  port: 443
})
