/* @flow */

import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import { Root } from './Root'

test('renders home route', t => {
  const route = {name: 'home'}
  const wrapper = shallow(<Root route={route} />)
  t.is(wrapper.find('FormattedMessage').length, 1)
})
