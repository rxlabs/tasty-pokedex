/* @flow */

import path from 'path'

import main from './main'

const port = parseInt(process.env.PORT) || 3000

const { app } = main({
  assets: process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', 'client')
    : path.join(__dirname, '..', 'public')
})

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}\n`)
})
