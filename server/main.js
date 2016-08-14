/* @flow */

import express from 'express'

import render from './render'

export default ({
  port = 3000
}: {
  port?: number
}) => {
  const app = express()

  app.get('*', (req, res) => {
    render(req.originalUrl).then(html => {
      res.send(html)
    })
  })

  app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`)
  })
}
