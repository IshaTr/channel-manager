import * as types from './types'

export const updateFavoriteChannel = (id) => ({
  type: types.UPDATE_FAVORITE_CHANNEL,
  payload: id
})

export const increaseActiveChannelRank = () => ({
  type: types.INCREASE
})

export const updateActiveChannelIndex = (operation) => ({
  type: types.UPDATE_ACTIVE_INDEX,
  payload: operation
})

export const decreaseActiveChannelRank = () => ({
  type: types.DECREASE
})

export const shiftActiveChannelRight = () => ({
  type: types.SHIFT_RIGHT
})

export const shiftActiveChannelLeft = () => ({
  type: types.SHIFT_LEFT
})

export const disableArrowKeys = (isDisabled) => ({
  type: types.DISABLE_KEYS,
  payload: isDisabled
})

export const updateSequence = (from, to) => ({
  type: types.UPDATE_FAVORITE_SEQUENCE,
  payload: {from, to}
})

export const removeFavoriteChannel = (id) => ({
  type: 'REMOVE_FAVORITE_CHANNEL',
  payload: id
})
