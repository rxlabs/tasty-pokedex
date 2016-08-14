/* @flow */

import '../app/polyfills'

import { renderToString as render } from 'react-dom/server'

import main from '../app/main'

export default (route: string, state = {}) => {
  return new Promise((resolve) => {
    const { router } = main({
      render,
      resolve,
      injectedRoute: route,
      injectedState: state,
      blockRender: true
    })
  })
}
