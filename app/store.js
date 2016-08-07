/* @flow */

import Router5 from 'router5'
import { applyMiddleware, compose, createStore } from 'redux'
import createLogger from 'redux-logger'
import { router5Middleware } from 'redux-router5'

export const configureStore = ({
  initialState,
  reducer,
  router
}: {
  initialState: {},
  reducer: Function,
  router: Router5
}) => {
  const middleware = [
    router5Middleware(router)
  ]

  let devTools = f => f
  if (process.env.NODE_ENV === 'development' &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined') {
    devTools = window.devToolsExtension()
  }

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger()
    middleware.push(logger)
  }

  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middleware), devTools)
  )
}
