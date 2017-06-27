import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Game from './components/Game'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { loadGame,
         saveGame,
         progressEntry } from './actions'
import { createLogger } from 'redux-logger'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(reducer,
                          applyMiddleware(...middleware));

const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <Game
    game={store.getState()}
    onSaveGame={(game) => store.dispatch(saveGame(game))}
    onLoadGame={() => store.dispatch(loadGame())}
    onProgressEntry={(id, progress) => store.dispatch(progressEntry(id, progress))}
  />,
  rootEl
)

store.dispatch(loadGame());

render()
store.subscribe(render)
