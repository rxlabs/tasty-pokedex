/* @flow */

import './polyfills'

import { render } from 'react-dom'

import main from './main'

export default async () => {
  try {
    const preloadedState = window.__PRELOADED_STATE__
    const rootElement = document.getElementById('root')
    const stateElement = document.getElementById('__PRELOADED_STATE__')

    const { rootComponent } = await main({
      state: preloadedState || {}
    })

    if (rootElement) {
      render(rootComponent, rootElement)
    }

    if (stateElement && stateElement.parentElement) {
      stateElement.parentElement.removeChild(stateElement)
    }

    delete window.__PRELOADED_STATE__
  } catch (err) {
    console.log(err)
  }
}
