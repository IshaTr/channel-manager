import React from 'react'
import styled from 'styled-components'

import Channel from './Channel'
import Flex from './common/Flex'

export const Header = styled.h1`
  padding-left: 1.5rem;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 2.2rem;
  margin-bottom: 4rem;
  text-align: center;
`

const Wrapper = styled.div`
  padding-right: 3rem;
  padding-left: 2.6rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 14rem;
  position: relative;

  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.1rem;
    height: 100%;
    background-color: #383838;
    content: '';
  }
`

const Container = styled(Flex)`
  position: fixed;
  height: 720px;
  overflow-y: scroll;
`

const AllChannels = ({
  channels,
  handleOnClick,
  favoriteChannels,
  activeIndexChannel,
  activeIndexFavorite,
  handleKeyUp
}) => (
  <Flex direction='column' width='66%' position='relative'>
    <Container direction='column' position='fixed' id='channel-container'>
      <Header>All channels</Header>
      <Wrapper>
        {Object.entries(channels).map(([channelId, channel], index) => (
          <Channel
            key={channelId}
            channelId={channelId}
            index={index + 1}
            channel={channel}
            title={channel.title}
            logoToken={channel.data.logo_token}
            width='39%'
            handleOnClick={handleOnClick}
            handleKeyUp={handleKeyUp}
            favoriteChannels={favoriteChannels}
            activeIndexChannel={activeIndexChannel}
            activeIndexFavorite={activeIndexFavorite}
          />
        ))}
      </Wrapper>
    </Container>
  </Flex>
)

export default AllChannels
