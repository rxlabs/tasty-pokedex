/* @flow */

import React from 'react'

import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'

import { messages } from './constants'
import { initializeRoute } from './modules/router'
import { createRouter } from './router'
import { configureStore } from './store'
import reducer from './reducer'
import saga from './saga'

import App from './containers/App'

export default ({
  render,
  rootElement,
  resolve,
  injectedRoute,
  blockRender = false,
  injectedState = {}
}: {
  render: Function,
  rootElement?: Object,
  resolve?: Function,
  blockRender?: boolean,
  injectedState?: Object
}) => {
  if (typeof rootElement !== 'undefined' && typeof resolve !== 'undefined') {
    throw Error('Cannot set both rootElement and resolve')
  }

  const router = createRouter()

  router.start(injectedRoute, (err, state) => {
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

    const rootComponent =
      <Provider store={store}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </Provider>

    const renderRoot = () => {
      if (!blockRender || store.getState().status.ready) {
        if (typeof rootElement !== 'undefined') {
          return render(rootComponent, rootElement)
        }

        if (typeof resolve !== 'undefined') {
          return resolve(render(rootComponent))
        }
      }
    }

    const unsubscribe = store.subscribe(renderRoot)
    store.dispatch(initializeRoute({
      route: state,
      unsubscribe
    }))
  })

  return {
    router
  }
}
