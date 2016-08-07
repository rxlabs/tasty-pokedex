/* @flow */

import Router5 from 'router5'
import historyPlugin from 'router5-history'

import routes from './routes'

export const createRouter = () => {
  const router = new Router5(routes)
    .setOption('useHash', true)
    .usePlugin(historyPlugin())

  return router
}
