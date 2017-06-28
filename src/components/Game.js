import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Entry from './Entry'

class Game extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // console.log('game_render');

    const { game,
            onSaveGame,
            onLoadGame,
            onProgressEntry } = this.props

    const hasEntries = game.entries.length > 0;

    const nodes = hasEntries ? (
      game.entries.map(entry =>
        <li className="game__entry"
            key={entry.id.toString()}>
          <Entry
            item={entry}
            onProgress={onProgressEntry}
          />
        </li>
      )
    ) : (
        <li>...</li>
    )

    const isDisabled = game.isSaving || game.isLoading;

    return (
      <div className="game">
        <div className="game__error">{game.error}</div>
        <div className="game__save">
          <button disabled={isDisabled} onClick={() => onSaveGame(game)}>Save game</button>
        </div>
        { game.isSaving ?
          <div className="game__isSaving">saving...</div> : null }
        <div className="game__load">
          <button disabled={isDisabled} onClick={() => onLoadGame()}>Load game</button>
        </div>
        { game.isLoading ?
          <div className="game__isLoading">loading...</div> : null }
        <ul className="game__entries">
          {nodes}
        </ul>
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  onSaveGame: PropTypes.func.isRequired,
  onLoadGame: PropTypes.func.isRequired,
  onProgressEntry: PropTypes.func.isRequired
}

export default Game
