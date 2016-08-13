/* @flow */

import { createAction, handleActions } from 'redux-actions'

const prefix = 'tasty-pokedex/status'
export const READY = `${prefix}/ready`

export const setReady = createAction(READY)

const initialState = {
  ready: false
}

const reducer = handleActions({
  [setReady]: (state, action) => ({
    ...state,
    ready: action.payload
  })
}, initialState)

export default reducer
