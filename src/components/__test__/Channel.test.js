import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import Channel from '../Channel'

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

const channelData = {
  id: 'itv-1-london',
  title: 'ITV 1 London',
  data: {
    logo_token: '388b306901b101d45b46'
  }
}

describe('renders learn react link', () => {
  const handleOnClick = jest.fn()
  const handleKeyUp = jest.fn()
  const index = 0

  beforeEach(() => {
    render(
      <Channel
        key={channelData.id}
        channelId={channelData.id}
        index={index + 1}
        channel={channelData}
        title={channelData.title}
        logoToken={channelData.data.logo_token}
        width='39%'
        handleOnClick={handleOnClick}
        handleKeyUp={handleKeyUp}
        favoriteChannels={defaultState.favoriteChannels}
        activeIndexChannel={defaultState.activeIndexChannel}
        activeIndexFavorite={defaultState.activeIndexFavorite}
      />
    )
  })
  it('renders title without crashing', () => {
    expect(screen.getByText('ITV 1 London')).toBeInTheDocument()
  })

  it('renders correct serial number for channel', () => {
    expect(screen.getByText('001')).toBeInTheDocument()
  })

  it('checks if click has been called', () => {
    const element = screen.getByTestId('channel-tile')

    fireEvent.click(element)
    expect(handleOnClick).toHaveBeenCalledTimes(1)
  })
})
