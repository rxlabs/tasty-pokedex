/* @flow */

import https from 'https'
import { fs } from 'mz'
import path from 'path'

import express from 'express'

import render, { injectIntoTemplate } from './render'

export default ({
  key,
  cert,
  ssl = false,
  port = 3000,
  assets = path.join(__dirname, '..', 'client')
}: {
  cert?: string,
  key?: string,
  ssl?: boolean,
  assets?: string,
  port?: number
}) => {
  const app = express()

  app.use(express.static(assets, {
    index: false
  }))

  app.get('/*', async (req, res) => {
    try {
      const { html, state } = await render(req.originalUrl)
      const template = await fs.readFile(path.join(assets, 'index.html'))
      const response = injectIntoTemplate({
        html,
        state,
        template: template.toString()
      })

      res.send(response)
    } catch (err) {
      console.log(err)
    }
  })

  if (ssl) {
    https.createServer({
      key: key,
      cert: cert
    }, app).listen(port)
    console.log(`Running on https://localhost:${port}\n`)
  } else {
    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}\n`)
    })
  }
}
