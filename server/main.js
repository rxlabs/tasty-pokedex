/* @flow */

import { fs } from 'mz'
import path from 'path'

import express from 'express'

import render, { injectIntoTemplate } from './render'

export default ({
  port = 3000,
  assets = path.join(__dirname, '..', 'client')
}: {
  assets: string,
  port?: number
}) => {
  const app = express()

  app.use(express.static(assets, {
    index: false
  }))

  app.get('/', async (req, res) => {
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

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`)
  })
}
