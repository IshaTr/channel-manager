import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {imageBaseUrl, imageType} from '../utils/helper'
import StarIcon from '../Icons/StarIcon'
import StarIconFilled from '../Icons/StarIconFilled'
import ArrowIcon from '../Icons/ArrowIcon'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 6.67rem;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  padding-right: ${(props) =>
    props.isActive && props.isFavoriteChannel ? '13.125rem' : '6rem'};
  padding-left: 1.5rem;
  color: #fff;
  line-height: 6.67rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.isActive ? '#383838' : '#232323')};
  outline: ${(props) =>
    props.isActive ? '0.1rem solid rgba(255, 255, 255, 0.9)' : 'unset'};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.8rem;
  width: ${(props) => props.width || 'unset'};
  text-align: left;
`

const Logo = styled.img`
  position: absolute;
  left: 8.1rem;
  max-height: 3.33rem;
  top: 50%;
  transform: translateY(-50%);
`

const Title = styled.span`
  margin-left: 14.6rem;
  color: #ebebeb;
  font-weight: 700;
  font-size: 1.8rem;
  text-transform: uppercase;
  white-space: nowrap;
`

const Number = styled.span`
  position: absolute;
  top: 50%;
  left: 1.8rem;
  height: 2.8rem;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
  color: #717171;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 2.8rem;
  background-color: #1a1a1a;
  border-radius: 0.4rem;
  transform: translateY(-50%);
`

const IconWrapper = styled.span`
  position: absolute;
  top: 50%;
  right: ${(props) => props.right};
  color: #ebebeb;
  font-size: 1.8rem;
  transform: translateY(-50%);
  display: flex;
`

const Section = styled.span`
  background: ${(props) =>
    props.isActive
      ? 'linear-gradient(to right, #f96522 0, #f96522 100%)'
      : '#2d2d2d'};
  width: 4rem;
  height: 4rem;
  font-size: 1.4rem;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  color: #9b9b9b;
  vertical-align: top;
  border: none;
  border-radius: 0.5rem;
`

const IconSection = styled.span`
  right: 0.5rem;
  display: flex;
`

const Channel = ({
  channelId,
  title,
  width,
  logoToken,
  index,
  handleOnClick,
  favoriteChannels,
  isFavoriteChannel,
  activeIndexChannel,
  activeIndexFavorite,
  handleKeyUp,
  activeIcon
}) => {
  const isActive = isFavoriteChannel
    ? activeIndexFavorite === index
    : activeIndexChannel === index

  return (
    <Container
      width={width}
      onClick={() => handleOnClick(channelId)}
      isActive={isActive}
      isFavoriteChannel={isFavoriteChannel}
      data-testid='channel-tile'
    >
      <Number>
        {index < 10 ? '00' : '0'}
        {index}
      </Number>
      <Logo src={`${imageBaseUrl}${logoToken}/${imageType}`} alt='' />
      <Title>{title}</Title>
      {isFavoriteChannel && isActive ? (
        <IconWrapper right='0.5rem'>
          <IconSection>
            <Section isActive={activeIcon === 'order'}>
              <ArrowIcon />
            </Section>
            <Section isActive={activeIcon === 'star'}>
              <StarIconFilled />
            </Section>
          </IconSection>
        </IconWrapper>
      ) : (
        <IconWrapper right='2.5rem'>
          {favoriteChannels.includes(channelId) ? (
            <StarIconFilled />
          ) : (
            <StarIcon />
          )}
        </IconWrapper>
      )}
    </Container>
  )
}

Channel.propTypes = {
  channelId: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string,
  logoToken: PropTypes.string,
  index: PropTypes.number,
  handleOnClick: PropTypes.func,
  favoriteChannels: PropTypes.array,
  isFavoriteChannel: PropTypes.bool
}

Channel.defaultProps = {
  favoriteChannels: [],
  isFavoriteChannel: false
}

export default Channel
