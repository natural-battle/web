import * as types from '../action-types';

const initialState = {
  level: 0,
  isLoading: false,
  isSaving: false,
  // universal error per game
  error: null,
  entries: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        entries: []
      };
    case types.LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        entries: action.game.entries
      };
    case types.LOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'LOADING_FAILURE', // TODO: from action.error
        entries: []
      };

    case types.SAVING_REQUEST:
      return {
        ...state,
        isSaving: true,
        error: null
      };

    case types.SAVING_SUCCESS:
      return {
        ...state,
        isSaving: false,
        error: null
      };

    case types.SAVING_FAILURE:
      return {
        ...state,
        isSaving: false,
        error: 'SAVING_FAILURE' // TODO: from action.error
      };

    case types.ENTRY_PROGRESS:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id !== action.id) {
            return entry;
          }

          return {
            ...entry,
            progress: action.progress
          };
        })
      };

    default:
      return state;
  }
};
