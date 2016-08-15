/* @flow */

import { jsdom } from 'jsdom'

import '../app/polyfills'

import { renderToString } from 'react-dom/server'

import main from '../app/main'

export const injectIntoTemplate = ({
  html,
  template,
  state,
  id = 'root'
}: {
  html: string,
  template: string,
  state?: Object,
  id?: string
}) => {
  const document = jsdom(template)
  const subElement = jsdom(html).body.firstChild
  const rootElement = document.getElementById(id)
  document.body.replaceChild(subElement, rootElement)

  if (typeof state !== 'undefined') {
    const scriptElement = document.getElementsByTagName('script')[0]
    const stateElement = document.createElement('script')
    stateElement.id = '__PRELOADED_STATE__'
    stateElement.text = `window.__PRELOADED_STATE__ = ${JSON.stringify(state)}`
    scriptElement.parentElement.insertBefore(stateElement, scriptElement)
  }

  return document.documentElement.outerHTML
}

export default async function (route: string, state: Object = {}) { // eslint-disable-line
  const { router, store, rootComponent } = await main({
    state,
    currentRoute: route,
    blockRender: true
  })

  router.stop()

  return {
    html: renderToString(rootComponent),
    state: store.getState()
  }
}
