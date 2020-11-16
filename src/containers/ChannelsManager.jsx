import React, {useEffect, useCallback} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import AllChannels from '../components/AllChannels'
import FavoriteChannels from '../components/FavoriteChannels'
import Flex from '../components/common/Flex'
import * as actions from '../store/actions'

const Wrapper = styled.div`
  padding-top: 3.75rem;
`

const ChannelsManager = (props) => {
  const channelEl = document.getElementById('channel-container')

  const logKey = useCallback(
    (e) => {
      // Move down
      if (props && e.keyCode === 40) {
        if (!props.disableKeys) {
          props.decreaseActiveChannelRank()
        } else {
          props.updateSequence(
            props.activeIndexFavorite - 1,
            props.activeIndexFavorite
          )
        }

        if (props.activeRow >= 4) {
          channelEl.scrollTop = 32 * props.activeIndexChannel
        }
      }
      // Move up
      else if (props && e.keyCode === 38) {
        if (!props.disableKeys) {
          props.increaseActiveChannelRank()
        } else {
          props.updateSequence(
            props.activeIndexFavorite - 1,
            props.activeIndexFavorite - 2
          )
        }

        if (channelEl.scrollTop > 56) {
          channelEl.scrollTop = channelEl.scrollTop - 56
        } else {
          channelEl.scrollTop = 0
        }
      }
      // Move left
      else if (props && e.keyCode === 37 && !props.disableKeys) {
        props.shiftActiveChannelLeft()
      }
      // Move right
      else if (props && e.keyCode === 39 && !props.disableKeys) {
        props.shiftActiveChannelRight()
      } else if (props && e.keyCode === 13) {
        if (props.activeIndexFavorite && props.activeIcon === 'star') {
          const channelIds = props.favoriteChannels || []

          props.removeFavoriteChannel(channelIds[props.activeIndexFavorite - 1])
        } else if (props.activeIndexFavorite && props.activeIcon === 'order') {
          props.disableArrowKeys(!props.disableKeys)
        } else if (props.activeIndexChannel) {
          const channelIds = Object.keys(props.currentChannels)
          props.updateFavoriteChannel(channelIds[props.activeIndexChannel - 1])
        }
      }
    },
    [props, channelEl]
  )

  useEffect(() => {
    window.addEventListener('keydown', logKey)

    return () => {
      window.removeEventListener('keydown', logKey)
    }
  }, [logKey])

  return (
    <Wrapper>
      <Flex width='100%'>
        <FavoriteChannels
          data-testid='favorite-channels'
          handleOnClick={props.updateFavoriteChannel}
          channels={props.currentChannels}
          favoriteChannels={props.favoriteChannels}
          activeIndexChannel={props.activeIndexChannel}
          activeIndexFavorite={props.activeIndexFavorite}
          handleOnKeyUp={props.updateChannelIndex}
          activeIcon={props.activeIcon}
          disableKeys={props.disableKeys}
        />
        <AllChannels
          data-testid='all-channels'
          handleOnClick={props.updateFavoriteChannel}
          channels={props.currentChannels}
          favoriteChannels={props.favoriteChannels}
          activeIndexChannel={props.activeIndexChannel}
          activeIndexFavorite={props.activeIndexFavorite}
          handleOnKeyUp={props.updateActiveChannelIndex}
          activeIcon={props.activeIcon}
          disableKeys={props.disableKeys}
        />
      </Flex>
    </Wrapper>
  )
}

const mapStateToProps = (state) => ({
  currentChannels: state.currentChannels,
  favoriteChannels: state.favoriteChannels,
  activeIndexChannel: state.activeIndexChannel,
  activeIndexFavorite: state.activeIndexFavorite,
  activeIcon: state.activeIcon,
  disableKeys: state.disableKeys,
  activeRow: state.activeRow
})

const mapDispatchToProps = (dispatch) => ({
  updateFavoriteChannel: (id) => dispatch(actions.updateFavoriteChannel(id)),
  updateActiveChannelIndex: (operation) =>
    dispatch(actions.updateActiveChannelIndex(operation)),
  increaseActiveChannelRank: () =>
    dispatch(actions.increaseActiveChannelRank()),
  decreaseActiveChannelRank: () =>
    dispatch(actions.decreaseActiveChannelRank()),
  shiftActiveChannelRight: () => dispatch(actions.shiftActiveChannelRight()),
  shiftActiveChannelLeft: () => dispatch(actions.shiftActiveChannelLeft()),
  disableArrowKeys: (isDisabled) =>
    dispatch(actions.disableArrowKeys(isDisabled)),
  updateSequence: (from, to) => dispatch(actions.updateSequence(from, to)),
  removeFavoriteChannel: (id) => dispatch(actions.removeFavoriteChannel(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsManager)
