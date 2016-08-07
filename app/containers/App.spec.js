/* @flow */

import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import Root from '../routes/Root'

test('renders root route component', t => {
  const wrapper = shallow(<App />)
  t.is(wrapper.find(Root).length, 1)
})
