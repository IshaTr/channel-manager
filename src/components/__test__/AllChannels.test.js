import React from 'react'
import {render} from '@testing-library/react'
import AllChannels from '../AllChannels'

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
  const updateActiveChannelIndex = jest.fn()

  it('renders without crashing', () => {
    const {getByText} = render(
      <AllChannels
        handleOnClick={updateFavoriteChannel}
        channels={defaultState.currentChannels}
        favoriteChannels={Object.keys(currentChannels)}
        activeIndexChannel={defaultState.activeIndexChannel}
        activeIndexFavorite={defaultState.activeIndexFavorite}
        handleOnKeyUp={updateActiveChannelIndex}
        activeIcon={defaultState.activeIcon}
        disableKeys={defaultState.disableKeys}
      />
    )

    expect(getByText('All channels')).toBeInTheDocument()
  })
})
