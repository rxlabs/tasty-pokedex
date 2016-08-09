/* @flow */

import { saga as router } from './modules/router'

export function * rootSaga (): Generator<*, *, *> {
  yield [
    router()
  ]
}

export default rootSaga
