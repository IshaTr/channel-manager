import sampleChannels from '../utils/channels'
import {transformData} from '../utils/helper'
import * as types from './types'

export const currentChannels = transformData(sampleChannels.channels)

const defaultState = {
  currentChannels: currentChannels || {},
  favoriteChannels: [],
  activeIndexChannel: 1,
  activeIndexFavorite: null,
  activeRow: 1,
  activeIcon: 'star',
  disableKeys: false
}

const moveItem = (from, to, data) => {
  // remove `from` item and store it
  var channel = data.splice(from, 1)[0]
  // insert stored item into position `to`
  data.splice(to, 0, channel)

  return data
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_FAVORITE_CHANNEL:
      if (state.favoriteChannels.includes(action.payload)) {
        const newFavoriteChannels = state.favoriteChannels.filter(
          (channelId) => channelId !== action.payload
        )
        return {...state, favoriteChannels: newFavoriteChannels}
      }
      return {
        ...state,
        favoriteChannels: [action.payload, ...state.favoriteChannels]
      }

    case types.REMOVE_FAVORITE_CHANNEL:
      const newFavoriteChannels = state.favoriteChannels.filter(
        (channelId) => channelId !== action.payload
      )
      const channelIndex = state.favoriteChannels.findIndex(
        (channelId) => channelId === action.payload
      )
      const index = channelIndex === 0 ? 1 : channelIndex
      return {
        ...state,
        favoriteChannels: newFavoriteChannels,
        activeIndexChannel: newFavoriteChannels.length > 0 ? null : 1,
        activeIndexFavorite: newFavoriteChannels.length > 0 ? index : null
      }
    case types.DISABLE_KEYS:
      return {...state, disableKeys: action.payload}

    case types.UPDATE_FAVORITE_SEQUENCE:
      const newFavoriteChannel = moveItem(
        action.payload.from,
        action.payload.to,
        state.favoriteChannels
      )
      return {
        ...state,
        favoriteChannels: [...newFavoriteChannel],
        activeIndexFavorite: action.payload.to + 1
      }

    case types.INCREASE:
      if (state.activeIndexChannel) {
        if (state.activeIndexChannel === 1 || state.activeIndexChannel === 2) {
          return {
            ...state,
            activeRow: 1
          }
        } else {
          const newIndex = state.activeIndexChannel - 2
          const newActiveRow =
            state.activeIndexChannel % 2 === 0
              ? state.activeIndexChannel / 2
              : (state.activeIndexChannel + 1) / 2
          return {
            ...state,
            activeIndexChannel: newIndex,
            activeRow: newActiveRow
          }
        }
      } else if (state.activeIndexFavorite) {
        if (state.activeIndexFavorite === 1) {
          return {
            ...state,
            activeIndexFavorite: 1,
            activeRow: 1
          }
        } else {
          const newIndex = state.activeIndexFavorite - 1
          return {
            ...state,
            activeIndexFavorite: newIndex,
            activeRow: newIndex
          }
        }
      }
      return state

    case types.DECREASE:
      if (state.activeIndexChannel) {
        if (state.activeIndexChannel === state.currentChannels.length) {
          return state
        } else {
          const newIndex = state.activeIndexChannel + 2
          const newActiveRow =
            newIndex % 2 === 0 ? newIndex / 2 : (newIndex + 1) / 2

          return {
            ...state,
            activeIndexChannel: newIndex,
            activeRow: newActiveRow
          }
        }
      } else if (state.activeIndexFavorite) {
        if (state.activeIndexFavorite === state.favoriteChannels.length) {
          return state
        } else {
          const newIndex = state.activeIndexFavorite + 1
          return {
            ...state,
            activeIndexFavorite: newIndex,
            activeRow: newIndex
          }
        }
      }
      return state

    case types.SHIFT_RIGHT:
      if (state.activeIndexChannel) {
        if (state.activeIndexChannel % 2 === 0) {
          return state
        } else {
          const newIndex = state.activeIndexChannel + 1
          return {
            ...state,
            activeIndexChannel: newIndex
          }
        }
      } else if (state.activeIndexFavorite) {
        if (state.activeIcon === 'star') {
          const newIndex = state.activeIndexFavorite * 2 - 1
          return {
            ...state,
            activeIndexFavorite: null,
            activeIndexChannel: newIndex
          }
        }
        return {
          ...state,
          activeIcon: 'star'
        }
      }
      return state

    case types.SHIFT_LEFT:
      if (state.activeIndexChannel) {
        if (state.activeIndexChannel % 2 === 0) {
          const newIndex = state.activeIndexChannel - 1
          return {
            ...state,
            activeIndexChannel: newIndex
          }
        } else if (
          state.favoriteChannels.length > 0 &&
          state.activeIndexChannel % 2 !== 0
        ) {
          const newIndex =
            state.activeRow > state.favoriteChannels.length
              ? state.favoriteChannels.length
              : state.activeRow

          return {
            ...state,
            activeIndexFavorite: newIndex,
            activeIndexChannel: null
          }
        }
      } else if (state.activeIndexFavorite) {
        let newActiveIcon = 'star'
        if (state.activeIcon === 'star') {
          newActiveIcon = 'order'
        }

        return {
          ...state,
          activeIcon: newActiveIcon
        }
      }
      return state

    default:
      return state
  }
}

export default reducer
