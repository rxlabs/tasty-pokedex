/* @flow */

import { intlReducer } from 'react-intl-redux'
import { combineReducers } from 'redux'
import { router5Reducer } from 'redux-router5'

export default combineReducers({
  intl: intlReducer,
  router: router5Reducer
})
