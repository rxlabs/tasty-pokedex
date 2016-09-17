'use strict'

const fs = require('fs')
const https = require('https')

const main = require('tasty-pokedex').server

process.on('SIGINT', () => {
  process.exit()
})

process.on('SIGTERM', () => {
  process.exit()
})

const port = parseInt(process.env.PORT) || 80
const ssl = process.env.SSL === 'true'

const { app } = main({})

if (ssl) {
  const sslPath = process.env.SSL_PATH || '/etc/ssl/private/server'
  const cert = fs.readFileSync(`${sslPath}.crt`)
  const key = fs.readFileSync(`${sslPath}.key`)

  https.createServer({
    cert,
    key
  }, app).listen(port)

  console.log(`Running on https://localhost:${port}\n`)
} else {
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}\n`)
  })
}
