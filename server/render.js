/* @flow */

import '../app/polyfills'

import cheerio from 'cheerio'
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
  const $ = cheerio.load(template)

  $(`#${id}`).replaceWith(html)

  if (typeof state !== 'undefined') {
    const script = `window.__PRELOADED_STATE__ = ${JSON.stringify(state)}`
    $('script').before(
      `<script id="__PRELOADED_STATE__" defer>${script}</script>`
    )
  }

  return $.html()
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
