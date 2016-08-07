/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
import { startsWithSegment } from 'router5.helpers'

import { FormattedMessage } from 'react-intl'

export const Root = ({
  route
}: {
  route: {name: string}
}) => {
  const { name } = route
  const testRoute = startsWithSegment(name)

  if (testRoute('home')) {
    return <FormattedMessage id='app.title' defaultMessage='Pokedéx' />
  } else {
    return <FormattedMessage id='app.404' defaultMessage='404' />
  }
}

export default connect(routeNodeSelector(''))(Root)
