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

const ssl = process.env.SSL === 'true'
const port = parseInt(process.env.PORT) || 80

let cert = ''
let key = ''

if (ssl) {
  cert = fs.readFileSync(`${sslPath}.crt`)
  key = fs.readFileSync(`${sslPath}.key`)
}

main({port, ssl, cert, key})
