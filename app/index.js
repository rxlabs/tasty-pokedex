/* @flow */

import './polyfills'
import './styles/main.css'

import { render } from 'react-dom'

import main from './main'

export const app = async (
  rootElement: any,
  stateElement: any,
  preloadedState: Object
) => {
  try {
    const { rootComponent } = await main({
      useHash: process.env.NODE_ENV === 'production' &&
               preloadedState === undefined,
      state: preloadedState || {}
    })

    if (rootElement) {
      render(rootComponent, rootElement)
    }

    if (stateElement && stateElement.parentElement) {
      stateElement.parentElement.removeChild(stateElement)
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console.log(err)
    } else {
      throw err
    }
  }
}

export default (document: any, window: any) => {
  app(
    document.getElementById('root'),
    document.getElementById('__PRELOADED_STATE__'),
    window.__PRELOADED_STATE__
  ).then(() => {
    delete window.__PRELOADED_STATE__
  })
}
