/* @flow */

import { intlReducer as intl } from 'react-intl-redux'
import { combineReducers } from 'redux'

import * as reducers from './modules'

export const rootReducer = combineReducers({
  intl,
  ...reducers
})

export default rootReducer
