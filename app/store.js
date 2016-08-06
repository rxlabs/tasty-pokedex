/* @flow */

import { applyMiddleware, compose, createStore } from 'redux'
import createLogger from 'redux-logger'

import reducers from './reducers'
import { messages } from './constants'

const initialState = {
  intl: {
    locale: 'en',
    messages: messages.en
  }
}

const middleware = []

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger()
  middleware.push(logger)
}

export default createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
