/**
 * Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
 */

import gameProvider from '../api/game-provider'
import * as types from '../action-types'

export const loadGame = () => dispatch => {
  dispatch({
    type: types.LOADING_REQUEST
  });

  gameProvider.loadGame()
    .then(game => {
      dispatch({
        type: types.LOADING_SUCCESS,
        game: game
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: types.LOADING_FAILURE
      });
    });
};

export const saveGame = (game) => (dispatch) => {
  dispatch({
    type: types.SAVING_REQUEST
  });

  gameProvider.saveGame(game)
    .then(() => {
      dispatch({
        type: types.SAVING_SUCCESS
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: types.SAVING_FAILURE
      });
    });
};

export const progressEntry = (entryId, progress) => (dispatch, getState) => {
  const gameCurrent = getState();

  const entryCurrent = gameCurrent.entries.filter((item) => item.id === entryId)[0];

  if (!entryCurrent) {
    throw new Error('entry_must_exists_in_store: ' + entryId);
  }

  if (entryCurrent.progress === progress) {
    return;
  }

  dispatch({
    type: types.ENTRY_PROGRESS,
    id: entryId,
    progress: progress
  });
}
