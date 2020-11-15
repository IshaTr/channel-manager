import mockStore from '../mockStore'
import reducer from '../reducer'
import * as types from '../types'

const initialState = {...mockStore}

it('should add favorite channel', () => {
  const state = reducer(initialState, {
    type: types.UPDATE_FAVORITE_CHANNEL,
    payload: 'itv-1-london'
  })

  expect(state).toEqual({
    ...initialState,
    favoriteChannels: ['itv-1-london']
  })
})

it('should remove favorite channel', () => {
  let state = reducer(initialState, {
    type: types.UPDATE_FAVORITE_CHANNEL,
    payload: 'itv-1-london'
  })

  state = reducer(initialState, {
    type: types.REMOVE_FAVORITE_CHANNEL,
    payload: 'itv-1-london'
  })

  expect(state).toEqual({
    ...initialState,
    favoriteChannels: [],
    activeIndexChannel: 1,
    activeIndexFavorite: null
  })
})

it('should disable keyboard keys', () => {
  const state = reducer(initialState, {
    type: types.DISABLE_KEYS,
    payload: true
  })

  expect(state).toEqual({
    ...initialState,
    disableKeys: true
  })
})

it('should increase channel index', () => {
  const state = reducer(
    {...initialState, activeIndexChannel: 4},
    {type: types.INCREASE}
  )

  expect(state).toEqual({
    ...initialState,
    activeIndexChannel: 2,
    activeRow: 2
  })
})

it('should decrease channel index', () => {
  const state = reducer(initialState, {type: types.DECREASE})

  expect(state).toEqual({
    ...initialState,
    activeIndexChannel: 3,
    activeRow: 2
  })
})

it('should shift right channel index', () => {
  const state = reducer(initialState, {type: types.SHIFT_RIGHT})

  expect(state).toEqual({
    ...initialState,
    activeIndexChannel: 2,
    activeRow: 1
  })
})

it('should shift left channel index', () => {
  let state = reducer(
    {...initialState, activeIndexChannel: 4, activeRow: 2},
    {type: types.SHIFT_LEFT}
  )

  expect(state).toEqual({
    ...initialState,
    activeIndexChannel: 3,
    activeRow: 2
  })
})
