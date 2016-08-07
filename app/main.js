/* @flow */

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'

import { messages } from './constants'
import { createRouter } from './router'
import { configureStore } from './store'

import App from './containers/App'

const router = createRouter()

export default () => {
  router.start((err, state) => {
    if (err) console.log(err.stack)

    const initialState = {
      intl: {
        locale: 'en',
        messages: messages.en
      },
      router: {route: state}
    }

    const store = configureStore({initialState, router})

    render(
      <Provider store={store}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </Provider>,
      document.getElementById('root')
    )
  })
}
