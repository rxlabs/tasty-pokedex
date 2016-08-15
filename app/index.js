/* @flow */

import './polyfills'

import { render } from 'react-dom'

import main from './main'

export default async () => {
  try {
    const { rootComponent } = await main({})
    const rootElement = document.getElementById('root')
    render(rootComponent, rootElement)
  } catch (err) {
    console.log(err)
  }
}
