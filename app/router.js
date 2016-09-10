/* @flow */

import createRouter from 'router5'
import browserPlugin from 'router5/plugins/browser'

import routes from './routes'

export const configureRouter = ({
  defaultRoute = 'home',
  useHash = false
}: {
  defaultRoute: string,
  useHash?: boolean
}) => (
  createRouter(routes, {
    defaultRoute
  })
    .usePlugin(browserPlugin({
      useHash
    }))
)

export default configureRouter
