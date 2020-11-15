export const transformData = (data) => {
  return data.reduce((acc, channel) => {
    if (acc[channel.id]) {
      return acc
    }

    return {
      ...acc,
      [channel.id]: getMaxQuality(channel)
    }
  }, {})
}

const getMaxQuality = (channel) => {
  const {qualities, ...rest} = channel

  const channelData = qualities.find((quality) => {
    if (quality.level === 'uhd') {
      return quality
    } else if (quality.level === 'hd') {
      return quality
    } else if (quality.level === 'sd') {
      return quality
    }

    return quality
  })

  return {
    ...rest,
    data: channelData
  }
}

export const imageBaseUrl = 'https://images.zattic.com/logos/'

export const imageType = 'black/84x48.png'
