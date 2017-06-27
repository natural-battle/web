import reducer from './index'

import * as types from '../action-types';

describe('reducers', () => {
  describe('rootReducer', () => {
    it('should provide the initial state', () => {
      expect(reducer(undefined, {}).level).toEqual(0)
    })

    it('should ignore unknown actions', () => {
      expect(reducer({ level: 1 }, { type: 'unknown' })).toEqual({
        level: 1
      })
    })

    it('should handle SAVING_REQUEST', () => {
      const prevState = {
        level: 1
      };

      const freshState = {
        level: 1,
        isSaving: true,
        error: null
      };
      
      expect(reducer(prevState, {
        type: types.SAVING_REQUEST
      })).toEqual(freshState)
    })

    it('should handle SAVING_SUCCESS', () => {
      const prevState = {
        level: 1
      };

      const freshState = {
        level: 1,
        isSaving: false,
        error: null
      };
      
      expect(reducer(prevState, {
        type: types.SAVING_SUCCESS
      })).toEqual(freshState)
    })
  })
})
