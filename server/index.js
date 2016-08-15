/* @flow */

import main from './main'

main({
  assets: process.env.NODE_ENV === 'production'
    ? './build/client'
    : './public'
})
