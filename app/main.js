/* @flow */

import React from 'react'

import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'

import { messages } from './constants'
import { initializeRoute } from './modules/router'
import { configureRouter } from './router'
import { configureStore } from './store'
import reducer from './reducer'
import saga from './saga'

import App from './containers/App'

export default ({
  currentRoute,
  state = {},
  useHash = false,
  timeout = 150,
  blockRender = false
}: {
  currentRoute?: string,
  state?: Object,
  useHash?: boolean,
  timeout?: number,
  blockRender?: boolean
}) => (
  new Promise((resolve, reject) => {
    const router = configureRouter({useHash})

    router.start(currentRoute, (err, route) => {
      if (err) reject(err)

      const initialState = {
        intl: {
          locale: 'en',
          messages: messages.en
        },
        router: {
          route
        },
        ...state
      }

      const store = configureStore({
        initialState,
        reducer,
        router,
        saga
      })

      const rootComponent =
        <Provider store={store}>
          <IntlProvider>
            <App />
          </IntlProvider>
        </Provider>

      const resolveRoot = () => {
        if (!blockRender || store.getState().status.ready) {
          resolve({
            router,
            store,
            rootComponent
          })
        }
      }

      if (route) {
        const unsubscribe = store.subscribe(resolveRoot)
        store.dispatch(initializeRoute({
          route,
          timeout,
          unsubscribe
        }))
      }
    })
  })
)
