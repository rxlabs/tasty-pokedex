/* @flow */

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'

import { messages } from './constants'
import { routerInit } from './modules/router'
import { createRouter } from './router'
import { configureStore } from './store'
import reducer from './reducer'
import saga from './saga'

import App from './containers/App'

export default (
  injectedState: Object = {} // eslint-disable-line space-infix-ops
) => {
  const router = createRouter()

  router.start((err, state) => {
    if (err) console.log(err.stack)

    const initialState = {
      intl: {
        locale: 'en',
        messages: messages.en
      },
      router: {
        route: state
      },
      ...injectedState
    }

    const store = configureStore({
      initialState,
      reducer,
      router,
      saga
    })

    store.dispatch(routerInit({route: state}))

    const rootElement = document.getElementById('root')

    const rootComponent =
      <Provider store={store}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </Provider>

    render(rootComponent, rootElement)
  })
}
