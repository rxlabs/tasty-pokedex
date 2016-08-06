/* @flow */

import { createStore } from 'redux'

import reducers from './reducers'
import { messages } from './constants'

const initialState = {
  intl: {
    locale: 'en',
    messages: messages.en
  }
}

export default createStore(reducers, initialState)
