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
