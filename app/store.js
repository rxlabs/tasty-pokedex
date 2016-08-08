/* @flow */

import Router5 from 'router5'
import { applyMiddleware, compose, createStore } from 'redux'
import createLoggerMiddleware from 'redux-logger'
import { router5Middleware as createRouter5Middleware } from 'redux-router5'

export const configureStore = ({
  initialState,
  reducer,
  router
}: {
  initialState: {},
  reducer: Function,
  router: Router5
}) => {
  const middleware = []

  const router5Middleware = createRouter5Middleware(router)
  middleware.push(router5Middleware)

  if (process.env.NODE_ENV === 'development') {
    const loggerMiddleware = createLoggerMiddleware()
    middleware.push(loggerMiddleware)
  }

  let devTools = f => f
  if (process.env.NODE_ENV === 'development' &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined') {
    devTools = window.devToolsExtension()
  }

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middleware), devTools)
  )

  return store
}
