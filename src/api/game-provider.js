/**
 * Load a full game data instead array of entries
 *   the target object instead of array
 */

const API_ENDPOINT = 'http://127.0.0.1:10010/game';

const send = (url, opts) => {
  if (fetch) {
    return fetch(url, opts)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      });
  } else {
    throw new Error('API requests are not supported by this browser');
  }
};

export default {
  loadGame: () => {
    // setTimeout(() => cb(gameCache || _gameData
    // , TIMEOUT))
    // cb(gameCache || _gameData);
    return send(API_ENDPOINT);
  },
  saveGame: (game, cb) => {
    // const data = new FormData();
    // data.append('json', JSON.stringify(game));

    return send(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    });
  }
}
