/* @flow */

import { intlReducer } from 'react-intl-redux'
import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

import * as reducers from './modules'

export const rootReducer = combineReducers({
  intl: intlReducer,
  router: router5Reducer,
  ...reducers
})

export default rootReducer
