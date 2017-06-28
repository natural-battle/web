/**
 * Load a full game data instead array of entries
 *   the target object instead of array
 */

// relative to the index page

// const API_ENDPOINT = 'http://localhost:10010/game';
const API_ENDPOINT = './game';

const DEMO_TIMEOUT = 1200;

const send = (url, opts) => {
  if (fetch) {
    return new Promise(function (resolve, reject) { 
      fetch(url, opts)
        .then(response => {
          if (!response.ok) {
            reject(new Error(response.statusText));
            return;
          }
          return response.json();
        })
        .then(result => {
          setTimeout(function () { 
            resolve(result);
          }, DEMO_TIMEOUT);
        });
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
