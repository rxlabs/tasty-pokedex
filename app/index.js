/* @flow */

import './polyfills'

import { render } from 'react-dom'

import main from './main'

export default () => {
  main({
    render,
    rootElement: document.getElementById('root')
  })
}
