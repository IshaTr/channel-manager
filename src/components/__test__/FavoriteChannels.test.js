import React from 'react'
import {render} from '@testing-library/react'
import FavoriteChannels from '../FavoriteChannels'

import sampleChannels from '../../utils/channels'
import {transformData} from '../../utils/helper'

const currentChannels = transformData(sampleChannels.channels)

const defaultState = {
  currentChannels: currentChannels || {},
  favoriteChannels: [],
  activeIndexChannel: 1,
  activeIndexFavorite: null,
  activeRow: 1,
  activeIcon: 'star',
  disableKeys: false
}

describe('renders learn react link', () => {
  const updateFavoriteChannel = jest.fn()
  const updateChannelIndex = jest.fn()

  it('renders without crashing', () => {
    const {getByText} = render(
      <FavoriteChannels
        handleOnClick={updateFavoriteChannel}
        channels={defaultState.currentChannels}
        favoriteChannels={Object.keys(currentChannels)}
        activeIndexChannel={defaultState.activeIndexChannel}
        activeIndexFavorite={defaultState.activeIndexFavorite}
        handleOnKeyUp={updateChannelIndex}
        activeIcon={defaultState.activeIcon}
        disableKeys={defaultState.disableKeys}
      />
    )

    expect(getByText('My favorite channels')).toBeInTheDocument()
  })

  it('renders empty channels when no favorite channels', () => {
    const {getByText} = render(
      <FavoriteChannels
        handleOnClick={updateFavoriteChannel}
        channels={defaultState.currentChannels}
        favoriteChannels={defaultState.favoriteChannels}
        activeIndexChannel={defaultState.activeIndexChannel}
        activeIndexFavorite={defaultState.activeIndexFavorite}
        handleOnKeyUp={updateChannelIndex}
        activeIcon={defaultState.activeIcon}
        disableKeys={defaultState.disableKeys}
      />
    )

    expect(getByText('Select your favorites')).toBeInTheDocument()
  })
})
