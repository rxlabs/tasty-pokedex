/* @flow */

import path from 'path'

import main from './main'

main({
  port: parseInt(process.env.PORT) || 3000,
  assets: process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '..', 'client')
    : path.join(__dirname, '..', '..', 'public')
})
