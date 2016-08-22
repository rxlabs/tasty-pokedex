/* @flow */

import { createAction } from 'redux-actions'
import { actionTypes as actions } from 'redux-router5'
import { delay, takeEvery } from 'redux-saga'
import { call, fork, race, put, take } from 'redux-saga/effects'

import routes from '../routes'
import { setReady } from './status'

const prefix = 'tasty-pokedex/router'
const INITIALIZE = `${prefix}/initialize`

export { router5Reducer as default } from 'redux-router5'
export const initializeRoute = createAction(INITIALIZE)

export function * loadData (action: {
  type: string, payload: any
}): Generator<*, *, *> {
  const name = action.payload.route.name
  const params = action.payload.route.params
  const route = routes.find(r => r.name === name)

  const timeout = action.payload.timeout === undefined
    ? 150
    : action.payload.timeout

  if (typeof route !== 'undefined') {
    if (typeof route.puts !== 'undefined') {
      yield route.puts.map(action => put(action(params)))
    }

    if (typeof route.takes !== 'undefined') {
      yield race({
        loaded: route.takes.map(a => take(a)),
        timeout: call(delay, timeout)
      })
    }
  }

  if (action.type === INITIALIZE) {
    yield put(setReady(true))
    action.payload.unsubscribe()
  }
}

export function * saga (): Generator<*, *, *> {
  yield fork(takeEvery, [
    INITIALIZE,
    actions.TRANSITION_SUCCESS
  ], loadData)
}
