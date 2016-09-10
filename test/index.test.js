/* eslint-env mocha */
/* global fixture, expect */

import { app } from 'index.js'

describe('app', () => {
  before(function () {
    fixture.setBase('test/fixtures')
  })

  beforeEach(function () {
    this.result = fixture.load('index.html')
  })

  afterEach(function () {
    fixture.cleanup()
  })

  it('should render', () => {
    app(fixture.el).then(() => {
      expect(fixture.el.firstChild.children.length).to.be.above(0)
    })
  })
})
