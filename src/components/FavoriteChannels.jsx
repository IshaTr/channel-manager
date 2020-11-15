import React from 'react'
import styled from 'styled-components'
import Channel from './Channel'
import Flex from './common/Flex'
import EmptyChannel from './EmptyChannel'

export const Header = styled.h1`
  padding-left: 1.5rem;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 4rem;
`

const Wrapper = styled.div`
  padding-right: 2.6rem;
  padding-left: 5.2rem;
  text-align: center;
`

const FavoriteChannels = ({
  favoriteChannels,
  channels,
  handleOnClick,
  activeIndexChannel,
  activeIndexFavorite,
  handleKeyUp,
  activeIcon
}) => {
  return (
    <Flex direction='column' width='34%'>
      <Flex justify='center'>
        <Header>My favorite channels</Header>
      </Flex>
      <Wrapper>
        {favoriteChannels.length > 0 ? (
          <React.Fragment>
            {favoriteChannels.map((channelId, index) => (
              <Channel
                key={channelId}
                channelId={channelId}
                index={index + 1}
                channel={channels[channelId]}
                title={channels[channelId].title}
                logoToken={channels[channelId].data.logo_token}
                width='unset'
                handleOnClick={handleOnClick}
                handleKeyUp={handleKeyUp}
                favoriteChannels={favoriteChannels}
                activeIndexChannel={activeIndexChannel}
                activeIndexFavorite={activeIndexFavorite}
                isFavoriteChannel
                activeIcon={activeIcon}
              />
            ))}
          </React.Fragment>
        ) : (
          <EmptyChannel />
        )}
      </Wrapper>
    </Flex>
  )
}

export default FavoriteChannels
