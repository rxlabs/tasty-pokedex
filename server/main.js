/* @flow */

import fs from 'fs'
import path from 'path'

import express from 'express'

import render, { injectIntoTemplate } from './render'

export default ({
  assets = path.join(__dirname, '..', 'client')
}: {
  assets?: string
}) => {
  const app = express()
  const template = fs.readFileSync(path.join(assets, 'index.html'))

  app.use(express.static(assets, {
    index: false
  }))

  app.get('/*', async (req, res) => {
    try {
      const { html, state } = await render(req.originalUrl)
      const { response } = injectIntoTemplate({
        html,
        state,
        template: template.toString()
      })

      res.send(response)
    } catch (err) {
      console.log(err)
    }
  })

  return {
    app
  }
}
