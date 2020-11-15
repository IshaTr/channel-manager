import React from 'react'
import {render, screen} from '@testing-library/react'

import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store'

import ChannelsManager from '../ChannelsManager'
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

const mockStore = configureMockStore()
const store = mockStore({...defaultState})

describe('renders learn react link', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ChannelsManager />
      </Provider>
    )
  })
  it('renders current and favorite channels without crashing', () => {
    expect(screen.getByText('My favorite channels')).toBeInTheDocument()
    expect(screen.getByText('All channels')).toBeInTheDocument()
  })
})
