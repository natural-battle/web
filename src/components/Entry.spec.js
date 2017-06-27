import React from 'react'
import { shallow } from 'enzyme'
import Cmp from './Entry'

function setup(level = 0) {
  const actions = {
    onProgress: jest.fn()
  }

  const entryData = {
    id: 123,
    progress: 0
  };

  const component = shallow(
    <Cmp item={entryData} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    buttons: component.find('.entry'),
    p: component.find('.entry__id')
  }
}

describe('Entry component', () => {
  it('should display id', () => {
    const { p } = setup()
    expect(p.text()).toMatch(/^123/)
  })

  it('first button should call onProgress', (done) => {
    const { buttons, actions } = setup()
    buttons.at(0).simulate('click')
    expect(actions.onProgress).toBeCalledWith(123, 100)

    setTimeout(() => {
      expect(actions.onProgress).toBeCalledWith(123, 75)
      done();
      // setTimeout(() => {
      //   expect(actions.onProgress).toBeCalledWith(123, 50)
      //   done()
      // }, 1500)
    }, 1500)
  })
})
