/* @flow */

import Router5 from 'router5'
import { applyMiddleware, compose, createStore } from 'redux'
import createLogger from 'redux-logger'
import { router5Middleware } from 'redux-router5'

import reducers from './reducers'

export const configureStore = ({
  initialState,
  router
}: {
  initialState: {},
  router: Router5
}) => {
  const middleware = [
    router5Middleware(router)
  ]

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger()
    middleware.push(logger)
  }

  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      typeof (window) !== 'undefined' && window.devToolsExtension
        ? window.devToolsExtension() : f => f
    )
  )
}
