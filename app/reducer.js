/* @flow */

import { intlReducer as intl } from 'react-intl-redux'
import { combineReducers } from 'redux'
import { router5Reducer as router } from 'redux-router5'

import * as reducers from './modules'

export const rootReducer = combineReducers({
  intl,
  router,
  ...reducers
})

export default rootReducer
