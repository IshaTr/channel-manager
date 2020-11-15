import React from 'react'
import styled from 'styled-components'
import emptyIcon from '../images/empty-favorites.png'

const EmptyIcon = styled.div`
  background-image: ${(props) => `url(${props.url})`};
  width: 18rem;
  height: 18rem;
  margin: 0rem auto;
  background-repeat: no-repeat;
  background-size: contain;
`

const Header = styled.h2`
  margin-top: 3.5rem;
  color: #fff;
  font-weight: 900;
  font-size: 2.25rem;
`

const Text = styled.p`
  margin-top: 1rem;
  margin-bottom: 3rem;
  font-size: 1.875rem;
`

const EmptyChannel = (props) => (
  <React.Fragment>
    <EmptyIcon url={emptyIcon} />
    <Header>Select your favorites</Header>
    <Text>
      Select a channel from the list on the right to add it to your favorites.
    </Text>
  </React.Fragment>
)

export default EmptyChannel
