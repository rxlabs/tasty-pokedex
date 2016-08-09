/* @flow */

import { createAction } from 'redux-actions'
import { actionTypes as actions } from 'redux-router5'
import { takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

const INIT = 'router/init'

export const routerInit = createAction(INIT)

function * fetchData (action) {
  switch (action.payload.route.name) {
    case 'home':
      yield
  }
}

export function * saga () {
  yield fork(takeEvery, INIT, fetchData)
  yield fork(takeEvery, actions.TRANSITION_SUCCESS, fetchData)
}

export { router5Reducer as default } from 'redux-router5'
