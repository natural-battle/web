import React from 'react'
import { shallow } from 'enzyme'
import Game from './Game'

function setup(level = 0) {
  const actions = {
    onSaveGame: jest.fn(),
    onLoadGame: jest.fn(),
    onProgressEntry: jest.fn()
  }

  const game = {
    level: level,
    isLoading: false,
    isSaving: false,
    entries: []
  };

  const component = shallow(
    <Game game={game} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    p: component.find('.game__error')
  }
}

describe('Game component', () => {
  it('should display', () => {
    const { p } = setup()
    expect(p.text()).toMatch(/^$/)
  })

  it('first button should call onSaveGame', () => {
    const { buttons, actions } = setup()
    buttons.at(0).simulate('click')
    expect(actions.onSaveGame).toBeCalled()
  })

  it('second button should call onLoadGame', () => {
    const { buttons, actions } = setup()
    buttons.at(1).simulate('click')
    expect(actions.onLoadGame).toBeCalled()
  })
})
