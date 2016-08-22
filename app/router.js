/* @flow */

import Router5 from 'router5'
import historyPlugin from 'router5-history'

import routes from './routes'

export const createRouter = ({
  useHash = false
}: {
  useHash?: boolean
}) => {
  return new Router5(routes)
    .setOption('useHash', useHash)
    .usePlugin(historyPlugin())
}
