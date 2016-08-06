import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'

test('includes app title', t => {
  const wrapper = shallow(<App />)
  t.is(wrapper.find('FormattedMessage').length, 1)
})
