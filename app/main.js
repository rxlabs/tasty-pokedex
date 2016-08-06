/* @flow */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl-redux'

import store from './store'
import App from './containers/App'

export default () => {
  render(
    <Provider store={store}>
      <IntlProvider>
        <App />
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  )
}
