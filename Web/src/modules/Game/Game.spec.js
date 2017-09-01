/* eslint-env mocha */
/* global expect, sinon */
import React from 'react'
import { shallow } from 'enzyme'

import Game from './Game'

describe('<Game />', () => {

  function setup() {
    const wrapper = shallow(<Game />)
    const instance = wrapper.instance()

    return { wrapper, instance }
  }

  it('renders', () => {
    const { wrapper, instance } = setup()

    expect(wrapper).to.be.ok
    expect(instance).to.be.ok
  })
})
